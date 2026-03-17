import { NextResponse } from 'next/server';

/* ═══════════════════════════════════════════════════════════════
   Square Process Payment — MediaGeekz
   Takes a payment token (from Web Payments SDK) and charges it.
   Supports: Card, Apple Pay, Google Pay, ACH Bank Transfer
   ═══════════════════════════════════════════════════════════════ */

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const LOCATION_ID = process.env.SQUARE_LOCATION_ID || 'L819F9XH8VT84';
const SQUARE_PAYMENTS_API = 'https://connect.squareup.com/v2/payments';

export async function POST(request) {
    try {
        const { sourceId, amount, description, verificationToken } = await request.json();

        if (!sourceId) {
            return NextResponse.json({ error: "Missing payment source token." }, { status: 400 });
        }
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
            source_id: sourceId,
            amount_money: {
                amount: cents,
                currency: 'USD',
            },
            location_id: LOCATION_ID,
            note: description || 'MediaGeekz — Video Production',
            autocomplete: true,
        };

        // If SCA verification token is provided (for strong customer auth)
        if (verificationToken) {
            body.verification_token = verificationToken;
        }

        const response = await fetch(SQUARE_PAYMENTS_API, {
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
            console.error('Square Payments API error:', JSON.stringify(data));
            return NextResponse.json(
                { error: 'Payment failed', details: data.errors || data },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            paymentId: data.payment?.id,
            status: data.payment?.status,
            receiptUrl: data.payment?.receipt_url,
        });
    } catch (err) {
        console.error('Square process-payment error:', err);
        return NextResponse.json(
            { error: 'Server error', details: err.message },
            { status: 500 }
        );
    }
}
