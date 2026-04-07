import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(req) {
    try {
        const { section, reaction, comment, timestamp } = await req.json();

        if (!section) {
            return NextResponse.json({ error: 'Missing section' }, { status: 400 });
        }

        const reactionEmoji = reaction === 'love' ? '❤️' : reaction === 'like' ? '👍' : reaction === 'change' ? '✏️' : '💬';
        const subject = `ThreadLink Feedback: ${reactionEmoji} ${section}`;

        const htmlBody = `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #e8e4d9; padding: 32px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #e8764a;">ThreadLink Proposal Feedback</div>
                <div style="font-size: 24px; margin-top: 8px;">${reactionEmoji}</div>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.06);">Section</td>
                    <td style="padding: 10px 0; color: #fff; font-size: 14px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">${section}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.06);">Reaction</td>
                    <td style="padding: 10px 0; color: #fff; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.06);">${reactionEmoji} ${reaction || 'comment'}</td>
                </tr>
                ${comment ? `
                <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.06);">Comment</td>
                    <td style="padding: 10px 0; color: #e8e4d9; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(255,255,255,0.06);">${comment}</td>
                </tr>
                ` : ''}
                <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 13px;">Sent</td>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 12px;">${timestamp || new Date().toISOString()}</td>
                </tr>
            </table>
        </div>`;

        if (RESEND_API_KEY) {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: 'MediaGeekz Proposals <proposals@mediageekz.com>',
                    to: ['danielcastillowild@gmail.com'],
                    subject,
                    html: htmlBody,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                console.error('[ThreadLink Feedback] Resend error:', err);
                // Still return success to client — we can check logs
            }
        } else {
            console.log('[ThreadLink Feedback]', { section, reaction, comment });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('[ThreadLink Feedback] Error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
