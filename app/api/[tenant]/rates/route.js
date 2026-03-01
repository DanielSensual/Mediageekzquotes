/**
 * GET /api/[tenant]/rates — Returns all rate cards for a tenant
 * GET /api/[tenant]/rates?vertical=conventions — Returns a specific vertical's rate card
 */

import { prisma } from '@/lib/prisma';
import { verticalToRateCard } from '@/lib/engine';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { tenant: tenantSlug } = await params;
    const { searchParams } = new URL(request.url);
    const verticalSlug = searchParams.get('vertical');

    try {
        const tenant = await prisma.tenant.findUnique({
            where: { slug: tenantSlug },
        });

        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
        }

        const where = { tenantId: tenant.id, enabled: true };
        if (verticalSlug) where.slug = verticalSlug;

        const verticals = await prisma.vertical.findMany({
            where,
            include: {
                services: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
                addOns: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
            },
            orderBy: { slug: 'asc' },
        });

        const rateCards = {};
        for (const v of verticals) {
            rateCards[v.slug] = {
                name: v.name,
                icon: v.icon,
                ...verticalToRateCard(v),
            };
        }

        return NextResponse.json({
            tenant: { slug: tenant.slug, name: tenant.name, colorPrimary: tenant.colorPrimary },
            rateCards,
        });
    } catch (err) {
        console.error('Rates error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
