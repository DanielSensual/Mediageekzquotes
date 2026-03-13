import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
        const { tenantId } = await request.json();

        if (!tenantId) {
            return NextResponse.json({ error: 'Missing tenantId' }, { status: 400 });
        }

        const prisma = getPrisma();
        const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

        if (!tenant?.stripeCustomerId) {
            return NextResponse.json({ error: 'No billing account found. Please subscribe first.' }, { status: 400 });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: tenant.stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_URL || request.headers.get('origin')}/dashboard`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('[Billing Portal] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
