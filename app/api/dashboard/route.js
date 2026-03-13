import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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

export async function GET(request) {
    try {
        const cookie = request.cookies.get('vq_session')?.value;
        if (!cookie) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { payload } = await jwtVerify(cookie, JWT_SECRET);
        const prisma = getPrisma();

        const tenant = await prisma.tenant.findUnique({
            where: { id: payload.tenantId },
            include: {
                verticals: { select: { id: true, slug: true, name: true, icon: true } },
                _count: { select: { quotes: true } },
            },
        });

        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
        }

        const user = await prisma.tenantUser.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, name: true, role: true },
        });

        return NextResponse.json({
            tenant: {
                id: tenant.id,
                slug: tenant.slug,
                name: tenant.name,
                plan: tenant.plan,
                subscriptionStatus: tenant.subscriptionStatus,
                subscriptionPlan: tenant.subscriptionPlan,
                trialEndsAt: tenant.trialEndsAt,
                colorPrimary: tenant.colorPrimary,
                colorBg: tenant.colorBg,
                logoUrl: tenant.logoUrl,
                verticals: tenant.verticals,
                quoteCount: tenant._count.quotes,
            },
            user,
        });
    } catch (err) {
        console.error('[Dashboard API] Error:', err);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
}
