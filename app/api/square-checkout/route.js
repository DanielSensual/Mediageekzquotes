import { NextResponse } from 'next/server';

/* ═══════════════════════════════════════════════════════════════
   Square Checkout — MediaGeekz
   Creates a payment link via Square REST API (no SDK).
   
   Location: MediaGeekz (L819F9XH8VT84)
   ═══════════════════════════════════════════════════════════════ */

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const LOCATION_ID = process.env.SQUARE_LOCATION_ID || 'L819F9XH8VT84';
const SQUARE_API = 'https://connect.squareup.com/v2/online-checkout/payment-links';

export async function POST(request) {
    try {
        const { amount, description, redirectUrl } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid or missing 'amount'." }, { status: 400 });
        }

        if (!SQUARE_ACCESS_TOKEN) {
            return NextResponse.json({ error: 'Square credentials not configured.' }, { status: 500 });
        }

        const cents = Math.round(parseFloat(amount) * 100);
        const idempotencyKey = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);

        const body = {
            idempotency_key: idempotencyKey,
            quick_pay: {
                name: description || 'MediaGeekz — Video Production',
                price_money: {
                    amount: cents,
                    currency: 'USD',
                },
                location_id: LOCATION_ID,
            },
            checkout_options: {
                redirect_url: redirectUrl || 'https://mediageekz-quotes.vercel.app/',
                accepted_payment_methods: {
                    apple_pay: true,
                },
            },
        };

        const response = await fetch(SQUARE_API, {
            method: 'POST',
            headers: {
                'Square-Version': '2024-03-20',
                Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Square API error:', JSON.stringify(data));
            return NextResponse.json(
                { error: 'Square API error', details: data.errors || data },
                { status: response.status }
            );
        }

        const url = data.payment_link?.url;
        const id = data.payment_link?.id;

        return NextResponse.json({ success: true, url, id });
    } catch (err) {
        console.error('Square checkout handler error:', err);
        return NextResponse.json(
            { error: 'Server error', details: err.message },
            { status: 500 }
        );
    }
}
