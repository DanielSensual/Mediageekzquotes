import { NextResponse } from 'next/server';
import crypto from 'crypto';

/* ═══════════════════════════════════════════════════════════════
   Square Webhook — Payment Notifications
   Receives payment.completed events from Square and sends
   email notifications via Resend.
   ═══════════════════════════════════════════════════════════════ */

const SQUARE_WEBHOOK_SIGNATURE_KEY = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'danielcastillo@mediageekz.com';
const WEBHOOK_URL = process.env.SQUARE_WEBHOOK_URL || 'https://mediageekz-quotes.vercel.app/api/webhooks/square';

function verifySignature(body, signature) {
    if (!SQUARE_WEBHOOK_SIGNATURE_KEY) return true; // skip verification if key not set (dev mode)
    const hmac = crypto.createHmac('sha256', SQUARE_WEBHOOK_SIGNATURE_KEY);
    hmac.update(WEBHOOK_URL + body);
    const expectedSignature = hmac.digest('base64');
    return signature === expectedSignature;
}

async function sendNotification(payment) {
    if (!RESEND_API_KEY) {
        console.log('[Webhook] Resend not configured — skipping email notification');
        console.log('[Webhook] Payment received:', JSON.stringify(payment, null, 2));
        return;
    }

    const amount = (payment.amount_money?.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const card = payment.card_details?.card;
    const cardInfo = card ? `${card.card_brand} ****${card.last_4}` : 'Unknown';
    const note = payment.note || 'No description';
    const date = new Date(payment.created_at).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' });
    const receiptUrl = payment.receipt_url || '#';

    const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #0f1729; border-radius: 16px; overflow: hidden; border: 1px solid rgba(232, 98, 44, 0.3);">
            <div style="padding: 32px 28px; background: linear-gradient(135deg, rgba(232, 98, 44, 0.15), transparent);">
                <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #e8622c; margin-bottom: 8px;">💰 Payment Received</div>
                <div style="font-size: 36px; font-weight: 800; color: #f1f5f9; font-family: system-ui;">${amount}</div>
            </div>
            <div style="padding: 28px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #94a3b8;">
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(100,116,139,0.15); font-weight: 600; color: #e2e8f0;">Description</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(100,116,139,0.15); text-align: right;">${note}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(100,116,139,0.15); font-weight: 600; color: #e2e8f0;">Card</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(100,116,139,0.15); text-align: right;">${cardInfo}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(100,116,139,0.15); font-weight: 600; color: #e2e8f0;">Date</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(100,116,139,0.15); text-align: right;">${date}</td></tr>
                    <tr><td style="padding: 10px 0; font-weight: 600; color: #e2e8f0;">Status</td><td style="padding: 10px 0; text-align: right; color: #2dd4bf; font-weight: 700;">✓ COMPLETED</td></tr>
                </table>
                <a href="${receiptUrl}" style="display: block; margin-top: 24px; padding: 14px 24px; background: linear-gradient(135deg, #e8622c, #f59e0b); color: white; text-align: center; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">View Receipt →</a>
            </div>
            <div style="padding: 16px 28px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid rgba(100,116,139,0.1);">
                MediaGeekz Payment Notifications
            </div>
        </div>
    `;

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: 'MediaGeekz Payments <payments@mediageekz.com>',
                to: NOTIFICATION_EMAIL,
                subject: `💰 Payment Received: ${amount} — ${note}`,
                html,
            }),
        });
        const result = await res.json();
        console.log('[Webhook] Email sent:', result);
    } catch (err) {
        console.error('[Webhook] Email send error:', err);
    }
}

export async function POST(request) {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get('x-square-hmacsha256-signature');

        // Verify signature
        if (SQUARE_WEBHOOK_SIGNATURE_KEY && !verifySignature(rawBody, signature)) {
            console.warn('[Webhook] Invalid signature — rejecting');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(rawBody);
        console.log(`[Webhook] Received event: ${event.type}`);

        if (event.type === 'payment.completed') {
            const payment = event.data?.object?.payment;
            if (payment) {
                await sendNotification(payment);
                await notifyHydra(payment);
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('[Webhook] Handler error:', err);
        return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
    }
}

async function notifyHydra(payment) {
    const hydraUrl = process.env.HYDRA_WEBHOOK_URL;
    if (!hydraUrl) return;

    try {
        const amount = (payment.amount_money?.amount / 100).toFixed(2);
        const note = payment.note || 'No description';

        await fetch(hydraUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: 'SquarePaymentWebhook',
                event: 'payment.completed',
                amount: amount,
                note: note,
                receiptUrl: payment.receipt_url || '#',
            }),
        });
        console.log('[Webhook] Successfully pinged HYDRA with payment update.');
    } catch (err) {
        console.error('[Webhook] Failed to ping HYDRA:', err);
    }
}

// Square sends a GET to verify all webhook endpoints
export async function GET() {
    return NextResponse.json({ status: 'ok', service: 'MediaGeekz Square Webhook' });
}
