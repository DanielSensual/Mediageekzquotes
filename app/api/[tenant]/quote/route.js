/**
 * POST /api/[tenant]/quote — Calculate a quote for a tenant + vertical
 */

import { prisma } from '@/lib/prisma';
import { calculateQuote, verticalToRateCard } from '@/lib/engine';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    const { tenant: tenantSlug } = await params;

    try {
        const body = await request.json();
        const verticalSlug = body.vertical;

        if (!verticalSlug) {
            return NextResponse.json({ error: '"vertical" is required in the request body.' }, { status: 400 });
        }

        // Look up tenant
        const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
        }

        // Look up vertical with services + addons
        const vertical = await prisma.vertical.findUnique({
            where: { tenantId_slug: { tenantId: tenant.id, slug: verticalSlug } },
            include: {
                services: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
                addOns: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
            },
        });

        if (!vertical || !vertical.enabled) {
            return NextResponse.json({ error: `Vertical "${verticalSlug}" not found or disabled.` }, { status: 404 });
        }

        // Build rate card from DB
        const rateCard = verticalToRateCard(vertical);

        // Calculate
        const quote = calculateQuote(body, rateCard);
        quote.tenantSlug = tenantSlug;
        quote.vertical = verticalSlug;

        // Save to DB
        await prisma.quote.create({
            data: {
                quoteId: quote.quoteId,
                tenantId: tenant.id,
                verticalId: vertical.id,
                clientName: quote.clientName || null,
                eventName: quote.eventName || null,
                location: quote.location || null,
                requestJson: body,
                resultJson: quote,
                total: quote.total,
                status: 'draft',
            },
        });

        return NextResponse.json(quote);
    } catch (err) {
        console.error('Quote error:', err);
        return NextResponse.json({ error: 'Internal server error during quote calculation.' }, { status: 500 });
    }
}
