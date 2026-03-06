import { SignJWT, jwtVerify } from 'jose';
import bcryptModule from 'bcryptjs';

// Handle ESM/CJS interop — bcryptjs is CJS, bundler may wrap it
const bcrypt = bcryptModule.default || bcryptModule;

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_insecure_secret_for_development_only_12345'
);

// ──── Password Hashing ──────────────────────────────────────────

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// ──── JWT Token Management ──────────────────────────────────────

export async function createSession(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);
}

export async function verifySession(token) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (err) {
        return null;
    }
}
