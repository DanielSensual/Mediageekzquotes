import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';

/* ═══════════════════════════════════════════════════════════════
   Admin Payments API — Pulls live data from Square Payments API
   ═══════════════════════════════════════════════════════════════ */

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

export async function GET(request) {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const session = await verifySession(token);
    if (!session) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

    if (!SQUARE_ACCESS_TOKEN) {
        return NextResponse.json({ error: 'Square not configured' }, { status: 500 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '25';

        const res = await fetch(`https://connect.squareup.com/v2/payments?sort_order=DESC&limit=${limit}`, {
            headers: {
                'Square-Version': '2024-03-20',
                Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json({ error: 'Square API error', details: err }, { status: res.status });
        }

        const data = await res.json();
        const payments = (data.payments || []).map(p => ({
            id: p.id,
            date: p.created_at,
            amount: p.amount_money?.amount / 100,
            currency: p.amount_money?.currency || 'USD',
            status: p.status,
            note: p.note || null,
            cardBrand: p.card_details?.card?.card_brand || null,
            cardLast4: p.card_details?.card?.last_4 || null,
            receiptUrl: p.receipt_url || null,
            processingFee: p.processing_fee?.[0]?.amount_money?.amount / 100 || 0,
            netAmount: (p.amount_money?.amount - (p.processing_fee?.[0]?.amount_money?.amount || 0)) / 100,
            riskLevel: p.risk_evaluation?.risk_level || 'UNKNOWN',
            orderId: p.order_id || null,
        }));

        return NextResponse.json({
            payments,
            totalCount: payments.length,
            cursor: data.cursor || null,
        });
    } catch (err) {
        console.error('Payments API error:', err);
        return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
    }
}
