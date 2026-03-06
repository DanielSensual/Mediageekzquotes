---
description: Organize ADTV footage from SD card into A-roll/B-roll and upload to Google Drive
---

# Organize American Dream TV Footage

// turbo-all

## Prerequisites
- SD card mounted (typically at `/Volumes/Untitled`)
- Extreme SSD mounted (at `/Volumes/Extreme SSD`)
- Ask user for the **realtor/host name** (e.g., "Bent Danholm") and **location** (e.g., "Winter Park")

## Steps

### 1. Identify today's footage on the SD card
Find all MP4 clips from today's date in `/Volumes/Untitled/M4ROOT/CLIP/`:
```bash
ls -la "/Volumes/Untitled/M4ROOT/CLIP/DANIEL$(date +%Y%m%d)_"*.MP4 | head -5
```
The clips follow the naming pattern `DANIEL[YYYYMMDD]_[CLIP#].MP4`.

### 2. Create organized folders on Extreme SSD
Use the ADTV naming convention: `[Host] [A/B] Roll [Location]`
```bash
mkdir -p "/Volumes/Extreme SSD/Bent/[Host] A Roll [Location]"
mkdir -p "/Volumes/Extreme SSD/Bent/[Host] B Roll [Location]"
```
Note: All ADTV Bent footage goes under `/Volumes/Extreme SSD/Bent/`.

### 3. Scan clips and sort by frame rate
- **30fps (30000/1001)** = **A-roll** (interviews, main camera)
- **60fps (60000/1001)** = **B-roll** (cutaways, establishing shots)

Use `ffprobe` to detect frame rate:
```bash
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "[clip].MP4"
```

### 4. Copy clips to Extreme SSD sorted by frame rate
Loop through all today's clips, check fps, copy to appropriate folder:
```bash
for f in /Volumes/Untitled/M4ROOT/CLIP/DANIEL[DATE]_*.MP4; do
    fps=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$f")
    if echo "$fps" | grep -q "^30"; then
        cp "$f" "[A Roll folder]/"
    else
        cp "$f" "[B Roll folder]/"
    fi
done
```

### 5. Upload to Google Drive via rclone
The ADTV shared folder is in **Shared with me** on the `danielcastillo@mediageekz.com` Google account.

> **One-time setup required:** Run `rclone config` to authorize Google Drive access (creates an `adtv` remote).

Find the target folder name from the email ADTV sends (e.g., `4 Mar 2026-Bent Danholm-27929`).

```bash
# Upload both folders in parallel
rclone copy "[A Roll folder]" "adtv:[folder name]/[A Roll folder name]" --progress &
rclone copy "[B Roll folder]" "adtv:[folder name]/[B Roll folder name]" --progress &
wait
echo "Upload complete!"
```

### 6. Invoice (via Admin Page or Script)
**Option A — Admin Page (recommended):**
Go to the deployed site at `/admin/adtv` (behind login). Pre-filled with $400/Net 30 defaults.
Just enter the host name, location, date, and click **Send to ADTV**.

**Option B — Manual Script:**
Generate using the script pattern in `/tmp/generate-adtv-bent-march.js`.
Submit invoice PDF to **AP@adtvmedia.com**.

ADTV pays **$400 flat** for a 4-hour half-day shoot. Terms are **Net 30**.

## Key Details
- **SD Card mount:** `/Volumes/Untitled` (Sony camera, M4ROOT/CLIP structure)
- **Extreme SSD mount:** `/Volumes/Extreme SSD`
- **Google account:** danielcastillo@mediageekz.com
- **Google Drive remote:** `adtv` (configured via `rclone config`)
- **ADTV invoice email:** AP@adtvmedia.com
- **Rate:** $400 / 4 hours
- **Payment Terms:** Net 30
- **Invoices processed:** Every Thursday
- **Admin Invoice Page:** `/admin/adtv` (pre-filled form)
