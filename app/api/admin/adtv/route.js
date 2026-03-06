/**
 * POST /api/admin/adtv — Generate or email ADTV invoices
 * Body: { action: 'pdf' | 'email', host, location, date, time?, amount? }
 */

import { generateADTVInvoice } from '@/lib/adtv-pdf';
import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_3Mq5M6aG_PZsbYABfBEMsJ4NzrkGv72bL';

export async function POST(request) {
    try {
        const body = await request.json();
        const { action, host, location, date, time, amount } = body;

        if (!host || !location || !date) {
            return NextResponse.json(
                { error: 'host, location, and date are required.' },
                { status: 400 }
            );
        }

        const invoiceOpts = {
            host,
            location,
            date,
            time: time || '8:30 AM – 12:30 PM',
            amount: Number(amount) || 400,
        };

        const pdfBuffer = await generateADTVInvoice(invoiceOpts);

        if (action === 'email') {
            // Send via Resend
            const pdfBase64 = pdfBuffer.toString('base64');
            const dateSlug = date.replace(/[^a-zA-Z0-9]/g, '-');
            const filename = `Invoice – American Dream TV ${host} ${dateSlug}.pdf`;

            const emailRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Daniel Castillo <danielcastillo@mediageekz.com>',
                    to: ['AP@adtvmedia.com'],
                    subject: `Invoice – Jose Daniel Castillo – ${host} – ${location} – ${date}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                            <p>Hi,</p>
                            <p>Please find attached my invoice for filming services rendered on <strong>${date}</strong> for the American Dream TV segment featuring <strong>${host}</strong> in <strong>${location}</strong>.</p>
                            <p><strong>Invoice Details:</strong></p>
                            <ul>
                                <li><strong>Shoot Date:</strong> ${date}</li>
                                <li><strong>Host/Segment:</strong> ${host} – ${location}</li>
                                <li><strong>Amount Due:</strong> $${invoiceOpts.amount.toFixed(2)} USD</li>
                                <li><strong>Payment Terms:</strong> Net 30</li>
                            </ul>
                            <p>Thank you,<br/><strong>Jose Daniel Castillo</strong><br/>321-666-5228<br/>danielcastillo@mediageekz.com</p>
                        </div>
                    `,
                    attachments: [{
                        filename,
                        content: pdfBase64,
                    }],
                }),
            });

            const emailResult = await emailRes.json();

            if (!emailRes.ok) {
                return NextResponse.json(
                    { error: 'Failed to send email', details: emailResult },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Invoice emailed to AP@adtvmedia.com',
                emailId: emailResult.id,
            });
        }

        // Default: return PDF
        const safeName = `Invoice-ADTV-${host.replace(/\s+/g, '-')}-${date.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
        return new Response(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${safeName}"`,
                'Content-Length': pdfBuffer.length.toString(),
            },
        });
    } catch (err) {
        console.error('ADTV invoice error:', err);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
