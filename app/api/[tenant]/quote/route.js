/**
 * POST /api/[tenant]/quote — Calculate a quote for a tenant + vertical
 */

import { prisma } from '@/lib/prisma';
import { calculateQuote, verticalToRateCard } from '@/lib/engine';
import { getFallbackVertical, isRecoverableDatabaseError } from '@/lib/fallback-data';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    const { tenant: tenantSlug } = await params;

    try {
        const body = await request.json();
        const verticalSlug = body.vertical;

        if (!verticalSlug) {
            return NextResponse.json({ error: '"vertical" is required in the request body.' }, { status: 400 });
        }

        let tenant = null;
        let vertical = null;
        let rateCard = null;
        let usingFallback = false;

        try {
            tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

            if (tenant) {
                vertical = await prisma.vertical.findUnique({
                    where: { tenantId_slug: { tenantId: tenant.id, slug: verticalSlug } },
                    include: {
                        services: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
                        addOns: { where: { enabled: true }, orderBy: { sortOrder: 'asc' } },
                    },
                });
            }
        } catch (err) {
            console.error('Quote lookup error:', err);
            if (!isRecoverableDatabaseError(err)) {
                return NextResponse.json({ error: 'Internal server error during quote calculation.' }, { status: 500 });
            }
        }

        if (tenant && vertical?.enabled) {
            rateCard = verticalToRateCard(vertical);
        } else {
            const fallback = getFallbackVertical(tenantSlug, verticalSlug);
            if (!fallback) {
                return NextResponse.json(
                    { error: tenant ? `Vertical "${verticalSlug}" not found or disabled.` : 'Tenant not found' },
                    { status: 404 }
                );
            }

            tenant = fallback.tenant;
            vertical = fallback.vertical;
            rateCard = fallback.rateCard;
            usingFallback = true;
        }

        const quote = calculateQuote(body, rateCard);
        quote.tenantSlug = tenantSlug;
        quote.vertical = verticalSlug;
        quote.persistence = 'ephemeral';
        quote.checkoutAvailable = false;

        if (!usingFallback && tenant.id && vertical.id) {
            try {
                await prisma.quote.create({
                    data: {
                        quoteId: quote.quoteId,
                        tenantId: tenant.id,
                        verticalId: vertical.id,
                        clientName: quote.clientName || null,
                        email: quote.email || null,
                        eventName: quote.eventName || null,
                        location: quote.location || null,
                        requestJson: body,
                        resultJson: quote,
                        total: quote.total,
                        status: 'draft',
                    },
                });

                quote.persistence = 'stored';
                quote.checkoutAvailable = Boolean(process.env.STRIPE_SECRET_KEY);
                if (!quote.checkoutAvailable) {
                    quote.notice = 'Checkout is temporarily disabled until Stripe is configured.';
                }
            } catch (err) {
                console.error('Quote persistence error:', err);
                if (!isRecoverableDatabaseError(err)) {
                    return NextResponse.json({ error: 'Internal server error during quote calculation.' }, { status: 500 });
                }

                quote.notice = 'Quote generated successfully, but checkout is temporarily disabled because the database is unavailable.';
            }
        } else {
            quote.notice = 'Quote generated from built-in rate cards while the database is unavailable. PDF download works, but checkout is temporarily disabled.';
        }

        // ──── HYDRA CRM Integration ──────────────────────────────────
        // If a HYDRA webhook is configured, asynchronously push the lead data
        const hydraUrl = process.env.HYDRA_WEBHOOK_URL;
        if (hydraUrl && quote.email) {
            fetch(hydraUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'VideoQuoter',
                    tenantSlug,
                    vertical: quote.vertical,
                    quoteId: quote.quoteId,
                    email: quote.email,
                    clientName: quote.clientName,
                    eventName: quote.eventName,
                    total: quote.total,
                }),
            }).catch(e => console.error('Failed to ping HYDRA:', e));
        }

        return NextResponse.json(quote);
    } catch (err) {
        console.error('Quote error:', err);
        return NextResponse.json({ error: 'Internal server error during quote calculation.' }, { status: 500 });
    }
}
