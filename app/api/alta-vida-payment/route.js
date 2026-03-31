import { NextResponse } from 'next/server';

/* ═══════════════════════════════════════════════════════════════
   Square Process Payment — Alta Vida (Jesse Kader)
   Dedicated payment route using client's Square account.
   ═══════════════════════════════════════════════════════════════ */

const SQUARE_ACCESS_TOKEN = 'EAAAlwcdWzePJ1huCMQib8GPpVCCh2TH64QX8JxVjw67YrpFGZl1ihdjT-C1kimY';
const LOCATION_ID = '5BF9GG8J1JQNH';
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
            note: description || 'MediaGeekz — Alta Vida Event Coverage',
            autocomplete: true,
        };

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
            console.error('Square Alta Vida payment error:', JSON.stringify(data));
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
        console.error('Alta Vida payment error:', err);
        return NextResponse.json(
            { error: 'Server error', details: err.message },
            { status: 500 }
        );
    }
}
