/**
 * POST /api/[tenant]/checkout — Generate a Stripe Checkout Session for a Quote Deposit
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isRecoverableDatabaseError } from '@/lib/fallback-data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

export async function POST(request, { params }) {
    const { tenant: tenantSlug } = await params;

    try {
        const body = await request.json();
        const { quoteId } = body;

        if (!quoteId) {
            return NextResponse.json({ error: '"quoteId" is required.' }, { status: 400 });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json({ error: 'Checkout is not configured.' }, { status: 503 });
        }

        // Look up quote
        const quote = await prisma.quote.findUnique({
            where: { quoteId },
            include: { tenant: true }
        });

        if (!quote) {
            return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
        }

        if (quote.tenant.slug !== tenantSlug) {
            return NextResponse.json({ error: 'Tenant mismatch.' }, { status: 403 });
        }

        // Calculate a 50% deposit (or customize as needed)
        // Since the UI says $total, let's use Stripe minimums or defaults
        // amount in cents
        const depositAmountCents = Math.round((quote.total * 100) / 2);

        // Build the session
        const sessionPayload = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `50% Deposit for Quote: ${quote.quoteId}`,
                            description: `Project: ${quote.eventName || 'Video Production'}`,
                        },
                        unit_amount: depositAmountCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${tenantSlug}?success=true&quote=${quote.quoteId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${tenantSlug}?canceled=true`,
            metadata: {
                quoteId: quote.quoteId,
                tenantId: quote.tenantId,
            }
        };

        const session = await stripe.checkout.sessions.create(sessionPayload);

        return NextResponse.json({ url: session.url, sessionId: session.id });
    } catch (err) {
        console.error('Stripe Checkout error:', err);
        if (isRecoverableDatabaseError(err)) {
            return NextResponse.json({ error: 'Checkout is temporarily unavailable because the database is unavailable.' }, { status: 503 });
        }
        return NextResponse.json({ error: 'Internal server error generating checkout session.' }, { status: 500 });
    }
}
