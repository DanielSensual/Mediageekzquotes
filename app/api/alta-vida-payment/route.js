import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend instance - lazy init to prevent build-time crashes when env var is missing
let _resend;
function getResend() {
    if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
    return _resend;
}

/* ═══════════════════════════════════════════════════════════════
   Square Process Payment — Alta Vida (Jesse Kader)
   Dedicated payment route using client's Square account.
   ═══════════════════════════════════════════════════════════════ */

const SQUARE_ACCESS_TOKEN = process.env.ALTA_VIDA_SQUARE_ACCESS_TOKEN;
const LOCATION_ID = process.env.ALTA_VIDA_SQUARE_LOCATION_ID || '5BF9GG8J1JQNH';
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

        // Send confirmation email
        try {
            await getResend().emails.send({
                from: 'MediaGeekz Notifications <notifications@ghostaisystems.com>',
                to: 'reelestateorlando@gmail.com',
                subject: `New Payment Received: Alta Vida Pool Party - $${(cents / 100).toFixed(2)}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #e8622c;">Payment Successful!</h2>
                        <p>A new payment was received for the Alta Vida Event Coverage via the invoice portal.</p>
                        <ul style="background: #f1f5f9; padding: 20px; border-radius: 10px; list-style-type: none;">
                            <li style="margin-bottom: 8px;"><strong>Amount:</strong> $${(cents / 100).toFixed(2)}</li>
                            <li style="margin-bottom: 8px;"><strong>Payment ID:</strong> ${data.payment?.id || 'N/A'}</li>
                            <li style="margin-bottom: 8px;"><strong>Status:</strong> ${data.payment?.status || 'COMPLETED'}</li>
                            <li><strong>Description:</strong> ${body.note || 'N/A'}</li>
                        </ul>
                        <p>You can review this transaction in your Square Dashboard.</p>
                        ${data.payment?.receipt_url ? `<p><a href="${data.payment.receipt_url}" style="color: #e8622c; text-decoration: none; font-weight: bold;">View Square Receipt →</a></p>` : ''}
                    </div>
                `
            });
            console.log('Notification email sent for payment:', data.payment?.id);
        } catch (emailErr) {
            console.error('Email notification failed for Alta Vida payment:', emailErr);
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
