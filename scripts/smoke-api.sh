#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3050}"
SERVER_PID=""

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if command -v lsof >/dev/null 2>&1; then
  EXISTING_PIDS="$(lsof -ti :"$PORT" || true)"
  if [[ -n "$EXISTING_PIDS" ]]; then
    echo "Stopping process(es) on port $PORT: $EXISTING_PIDS"
    kill $EXISTING_PIDS 2>/dev/null || true
    sleep 1
  fi
fi

cd "$ROOT_DIR"
node server.js >/tmp/mediageekz-smoke-server.log 2>&1 &
SERVER_PID=$!

for _ in {1..30}; do
  if curl -sS --max-time 1 "http://localhost:$PORT/api/rates" >/dev/null 2>&1; then
    break
  fi
  sleep 0.25
done

if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "Server failed to start. Check /tmp/mediageekz-smoke-server.log"
  exit 1
fi

run_test() {
  local name="$1"
  local expected_code="$2"
  local payload="$3"

  echo "=== $name ==="
  local response
  response="$(curl -sS --connect-timeout 2 --max-time 8 \
    -w $'\nHTTP %{http_code}\n' \
    -X POST "http://localhost:$PORT/api/quote" \
    -H 'Content-Type: application/json' \
    -d "$payload")"

  printf '%s\n' "$response"
  local status
  status="$(printf '%s\n' "$response" | awk '/^HTTP / {print $2}' | tail -n1)"

  if [[ "$status" != "$expected_code" ]]; then
    echo "Expected HTTP $expected_code, got HTTP $status"
    exit 1
  fi
}

run_test "Test 1: Valid request" "200" '{"days":[{"hours":8,"operators":2}],"deliverables":{"socialTeaser":true}}'
run_test "Test 2: Empty body" "400" '{}'
run_test "Test 3: Invalid hours" "400" '{"days":[{"hours":99}]}'
run_test "Test 4: Invalid tier" "400" '{"days":[{"hours":8}],"editorTier":"legendary"}'

echo "Smoke tests passed."
