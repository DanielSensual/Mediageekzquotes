/**
 * GET /api/[tenant]/rates — Returns all rate cards for a tenant
 * GET /api/[tenant]/rates?vertical=conventions — Returns a specific vertical's rate card
 */

import { prisma } from '@/lib/prisma';
import { verticalToRateCard } from '@/lib/engine';
import { getFallbackRateCards, isRecoverableDatabaseError } from '@/lib/fallback-data';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { tenant: tenantSlug } = await params;
    const { searchParams } = new URL(request.url);
    const verticalSlug = searchParams.get('vertical');

    try {
        const tenant = await prisma.tenant.findUnique({
            where: { slug: tenantSlug },
        });

        if (tenant) {
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

            if (verticals.length > 0) {
                const rateCards = {};
                for (const v of verticals) {
                    rateCards[v.slug] = {
                        name: v.name,
                        icon: v.icon,
                        ...verticalToRateCard(v),
                    };
                }

                return NextResponse.json({
                    tenant: {
                        slug: tenant.slug,
                        name: tenant.name,
                        colorPrimary: tenant.colorPrimary,
                        colorBg: tenant.colorBg,
                        fontFamily: tenant.fontFamily,
                        logoUrl: tenant.logoUrl,
                    },
                    rateCards,
                });
            }
        }
    } catch (err) {
        console.error('Rates error:', err);
        if (!isRecoverableDatabaseError(err)) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }

    const fallback = getFallbackRateCards(tenantSlug, verticalSlug);
    if (!fallback) {
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({
        tenant: {
            slug: fallback.tenant.slug,
            name: fallback.tenant.name,
            colorPrimary: fallback.tenant.colorPrimary,
            colorBg: fallback.tenant.colorBg,
            fontFamily: fallback.tenant.fontFamily,
            logoUrl: fallback.tenant.logoUrl,
        },
        rateCards: fallback.rateCards,
        source: 'fallback',
    });
}
