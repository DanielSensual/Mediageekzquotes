import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_MAP = {
    founding: process.env.STRIPE_PRICE_FOUNDING,
    pro: process.env.STRIPE_PRICE_PRO,
    agency: process.env.STRIPE_PRICE_AGENCY,
};

export async function POST(request) {
    try {
        const { plan, tenantId, email } = await request.json();

        if (!plan || !tenantId) {
            return NextResponse.json({ error: 'Missing plan or tenantId' }, { status: 400 });
        }

        const priceId = PRICE_MAP[plan];
        if (!priceId) {
            return NextResponse.json({ error: `Unknown plan: ${plan}` }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer_email: email || undefined,
            line_items: [{ price: priceId, quantity: 1 }],
            metadata: { tenantId, plan },
            success_url: `${process.env.NEXT_PUBLIC_URL || request.headers.get('origin')}/dashboard?subscribed=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || request.headers.get('origin')}/product#pricing`,
            subscription_data: {
                metadata: { tenantId, plan },
                trial_period_days: 7,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('[Subscribe] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
