/**
 * POST /api/auth/login
 */

import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // 1. Find user by email
        const user = await prisma.tenantUser.findUnique({
            where: { email },
            include: { tenant: true },
        });

        if (!user || !user.passwordHash) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // 2. Verify password
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // 3. Create JWT payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
            tenantSlug: user.tenant.slug,
        };

        const token = await createSession(payload);

        // 4. Set cookie via NextResponse
        const response = NextResponse.json({ success: true, redirect: '/admin' });

        response.cookies.set({
            name: 'admin_session',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
