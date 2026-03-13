import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Lazy-load Prisma to avoid build-time errors
let _prisma;
function getPrisma() {
    if (!_prisma) {
        const { PrismaClient } = require('@prisma/client');
        _prisma = new PrismaClient();
    }
    return _prisma;
}

export async function POST(request) {
    const sig = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
        return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    let event;
    try {
        const body = await request.text();
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const prisma = getPrisma();

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                if (session.mode !== 'subscription') break;

                const tenantId = session.metadata?.tenantId;
                const plan = session.metadata?.plan || 'pro';

                if (tenantId) {
                    await prisma.tenant.update({
                        where: { id: tenantId },
                        data: {
                            stripeCustomerId: session.customer,
                            subscriptionId: session.subscription,
                            subscriptionStatus: 'active',
                            subscriptionPlan: plan,
                            plan: plan,
                        },
                    });
                    console.log(`[Stripe] Tenant ${tenantId} subscribed to ${plan}`);
                }
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                const tenantId = subscription.metadata?.tenantId;

                if (tenantId) {
                    await prisma.tenant.update({
                        where: { id: tenantId },
                        data: {
                            subscriptionStatus: subscription.status,
                        },
                    });
                    console.log(`[Stripe] Tenant ${tenantId} subscription updated: ${subscription.status}`);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const tenantId = subscription.metadata?.tenantId;

                if (tenantId) {
                    await prisma.tenant.update({
                        where: { id: tenantId },
                        data: {
                            subscriptionStatus: 'canceled',
                            subscriptionPlan: 'none',
                        },
                    });
                    console.log(`[Stripe] Tenant ${tenantId} subscription canceled`);
                }
                break;
            }

            default:
                console.log(`[Stripe] Unhandled event type: ${event.type}`);
        }
    } catch (err) {
        console.error('[Stripe Webhook] Processing error:', err);
        // Still return 200 to prevent Stripe retries on processing errors
    }

    return NextResponse.json({ received: true });
}
