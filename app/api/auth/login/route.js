import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_insecure_secret_for_development_only_12345'
);

let _prisma;
function getPrisma() {
    if (!_prisma) {
        const { PrismaClient } = require('@prisma/client');
        _prisma = new PrismaClient();
    }
    return _prisma;
}

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const prisma = getPrisma();

        const user = await prisma.tenantUser.findUnique({
            where: { email: email.toLowerCase() },
            include: { tenant: true },
        });

        if (!user || !user.passwordHash) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = await new SignJWT({
            userId: user.id,
            tenantId: user.tenantId,
            role: user.role,
            email: user.email,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('30d')
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            tenant: {
                id: user.tenant.id,
                slug: user.tenant.slug,
                name: user.tenant.name,
            },
        });

        response.cookies.set('vq_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (err) {
        console.error('[Login] Error:', err);
        return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
    }
}
