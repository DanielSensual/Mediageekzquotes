'use client';

import { useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Invoice + Contract — Leadership Interviews
   MediaGeekz × Tommy Bliven / 66 Degrees
   ═══════════════════════════════════════════════════════════════ */

const INVOICE_NUMBER = 'MGZ-2026-0326';
const INVOICE_DATE = 'March 17, 2026';
const DUE_DATE = 'March 24, 2026';
const SHOOT_DATE = 'March 26, 2026';

const CLIENT = {
    name: 'Tommy Bliven',
    company: '66 Degrees',
    email: '',
};

const LINE_ITEMS = [
    { description: 'Lead Cinematographer — Full Day', detail: 'Setup 9:30 AM · Record 11:30 AM – 5:00 PM', amount: 1200 },
    { description: 'Camera Operator B — Full Day', detail: '2nd angle coverage', amount: 750 },
    { description: '3× Multi-Cam Interview Edits', detail: '15–20 min each · synced, color graded, lower thirds', amount: 4500, per: '$1,500/ep' },
    { description: '6× Mobile-Ready Clips', detail: '60-sec vertical cuts from interviews (9:16)', amount: 900, per: '$150/clip' },
];

const SUBTOTAL = LINE_ITEMS.reduce((s, i) => s + i.amount, 0);
const DEPOSIT_PERCENT = 50;
const DEPOSIT = Math.round(SUBTOTAL * DEPOSIT_PERCENT / 100);

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function InvoicePage() {
    const printRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');

                :root {
                    --shadow: #060a14;
                    --navy: #0f1729;
                    --panel: rgba(15, 23, 42, 0.88);
                    --border: rgba(232, 98, 44, 0.16);
                    --orange: #e8622c;
                    --teal: #2dd4bf;
                    --cream: #e2e8f0;
                    --white: #f1f5f9;
                    --muted: #94a3b8;
                    --muted-2: #64748b;
                    --muted-3: #475569;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    color: var(--cream) !important;
                    background: linear-gradient(180deg, #0d1220 0%, #080c16 50%, #060a14 100%) !important;
                    line-height: 1.6;
                }

                @media print {
                    body { background: #fff !important; color: #1a1a1a !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .invoice-shell { max-width: 100%; padding: 0; }
                    .invoice-card { border: none; background: #fff !important; box-shadow: none; }
                    .invoice-card * { color: #1a1a1a !important; }
                    .line-header, .line-row { border-color: #ddd !important; }
                    .total-row { background: #f5f5f5 !important; }
                    .brand-mark { color: #e8622c !important; }
                    .contract-section { page-break-before: always; }
                }

                .invoice-shell {
                    max-width: 860px; margin: 0 auto;
                    padding: 60px 24px 80px;
                }

                .print-bar {
                    display: flex; justify-content: flex-end; gap: 12px;
                    margin-bottom: 32px;
                }

                .print-btn {
                    padding: 10px 24px; border: 1px solid rgba(232, 98, 44, 0.3);
                    border-radius: 8px; background: rgba(232, 98, 44, 0.08);
                    color: var(--orange); font-family: 'Inter', sans-serif;
                    font-size: 13px; font-weight: 600; cursor: pointer;
                    letter-spacing: 0.06em; transition: all 0.2s;
                }
                .print-btn:hover { background: rgba(232, 98, 44, 0.16); border-color: var(--orange); }

                .invoice-card {
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 20px; background: var(--panel);
                    padding: 48px 40px; position: relative;
                    backdrop-filter: blur(12px);
                }

                .invoice-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 40px; padding-bottom: 32px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.12);
                }

                .brand-mark {
                    font-family: 'Outfit', sans-serif;
                    font-size: 22px; font-weight: 700; color: var(--orange);
                    letter-spacing: 0.06em;
                }

                .brand-sub {
                    font-size: 11px; color: var(--muted-2); margin-top: 4px;
                    letter-spacing: 0.1em; text-transform: uppercase;
                }

                .invoice-meta { text-align: right; }

                .invoice-id {
                    font-family: 'Outfit', sans-serif;
                    font-size: 11px; font-weight: 700; color: var(--teal);
                    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px;
                }

                .meta-row { font-size: 12px; color: var(--muted); margin-bottom: 3px; }
                .meta-row strong { color: var(--cream); font-weight: 600; }

                .parties {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
                    margin-bottom: 40px;
                }

                .party-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.24em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 10px;
                }

                .party-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 600; color: var(--white); margin-bottom: 2px;
                }

                .party-detail { font-size: 12px; color: var(--muted-2); }

                /* Line items */
                .line-header {
                    display: grid; grid-template-columns: 1fr 100px 100px;
                    padding: 10px 0; border-bottom: 1px solid rgba(232, 98, 44, 0.2);
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-3);
                }

                .line-row {
                    display: grid; grid-template-columns: 1fr 100px 100px;
                    padding: 14px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.08);
                    align-items: center;
                }

                .line-desc { font-size: 14px; color: var(--cream); font-weight: 500; }
                .line-detail { font-size: 11px; color: var(--muted-2); margin-top: 2px; }
                .line-per { font-size: 12px; color: var(--muted); text-align: right; }
                .line-amount { font-size: 14px; color: var(--white); font-weight: 600; text-align: right; }

                .total-section { margin-top: 24px; }

                .total-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 10px 0; font-size: 13px;
                }

                .total-row.highlight {
                    padding: 16px 20px; margin-top: 8px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, rgba(232, 98, 44, 0.1), rgba(45, 212, 191, 0.05));
                    border: 1px solid rgba(232, 98, 44, 0.2);
                }

                .total-label { color: var(--muted); }
                .total-label.strong { color: var(--white); font-weight: 700; font-size: 15px; }
                .total-value { color: var(--cream); font-weight: 600; }
                .total-value.big { color: var(--orange); font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 700; }

                .deposit-note {
                    margin-top: 16px; padding: 16px 20px;
                    border-radius: 10px; background: rgba(45, 212, 191, 0.06);
                    border: 1px solid rgba(45, 212, 191, 0.15);
                    font-size: 12px; color: var(--teal); line-height: 1.7;
                }

                .deposit-note strong { color: var(--white); }

                /* ── Contract Section ── */
                .contract-section {
                    margin-top: 48px; padding-top: 40px;
                    border-top: 1px solid rgba(100, 116, 139, 0.12);
                }

                .contract-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 24px;
                }

                .clause {
                    margin-bottom: 20px;
                }

                .clause-num {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--orange); margin-bottom: 4px;
                }

                .clause-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 4px;
                }

                .clause-text {
                    font-size: 12px; color: var(--muted); line-height: 1.8;
                }

                .sig-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
                    margin-top: 48px; padding-top: 32px;
                    border-top: 1px solid rgba(100, 116, 139, 0.12);
                }

                .sig-block {}

                .sig-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 40px;
                }

                .sig-line {
                    border-bottom: 1px solid rgba(100, 116, 139, 0.3);
                    padding-bottom: 8px; margin-bottom: 8px;
                    min-height: 32px;
                }

                .sig-field {
                    font-size: 11px; color: var(--muted-2); margin-bottom: 20px;
                }

                .back-link {
                    display: inline-flex; align-items: center; gap: 8px;
                    margin-bottom: 20px; font-size: 12px; color: var(--muted);
                    text-decoration: none; transition: color 0.2s;
                }
                .back-link:hover { color: var(--orange); }
            `}</style>

            <div className="invoice-shell" ref={printRef}>
                <a href="/proposals/leadership-interviews" className="back-link no-print">← Back to Proposal</a>

                <div className="print-bar no-print">
                    <button className="print-btn" onClick={handlePrint}>
                        🖨️ Print / Save PDF
                    </button>
                </div>

                <div className="invoice-card">
                    {/* ── Header ── */}
                    <div className="invoice-header">
                        <div>
                            <div className="brand-mark">MediaGeekz</div>
                            <div className="brand-sub">Cinematic Video Production</div>
                            <div style={{ marginTop: 12, fontSize: 11, color: '#64748b', lineHeight: 1.8 }}>
                                Orlando, FL<br />
                                mattworkman@mediageekz.com<br />
                                danielcastillo@mediageekz.com
                            </div>
                        </div>
                        <div className="invoice-meta">
                            <div className="invoice-id">Invoice {INVOICE_NUMBER}</div>
                            <div className="meta-row"><strong>Issued:</strong> {INVOICE_DATE}</div>
                            <div className="meta-row"><strong>Due:</strong> {DUE_DATE}</div>
                            <div className="meta-row"><strong>Shoot Date:</strong> {SHOOT_DATE}</div>
                        </div>
                    </div>

                    {/* ── Parties ── */}
                    <div className="parties">
                        <div>
                            <div className="party-label">From</div>
                            <div className="party-name">MediaGeekz LLC</div>
                            <div className="party-detail">Matt Workman & Daniel Castillo</div>
                            <div className="party-detail">Orlando, FL</div>
                        </div>
                        <div>
                            <div className="party-label">Bill To</div>
                            <div className="party-name">{CLIENT.name}</div>
                            <div className="party-detail">{CLIENT.company}</div>
                        </div>
                    </div>

                    {/* ── Project ── */}
                    <div style={{ marginBottom: 32, padding: '16px 20px', borderRadius: 12, background: 'rgba(232,98,44,0.04)', border: '1px solid rgba(232,98,44,0.12)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8622c', marginBottom: 6 }}>Project</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: '#f1f5f9' }}>
                            Executive Leadership Interview Series — Professional Package
                        </div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                            3 multi-cam interviews · Winter Garden, FL · March 26, 2026
                        </div>
                    </div>

                    {/* ── Line Items ── */}
                    <div className="line-header">
                        <div>Description</div>
                        <div style={{ textAlign: 'right' }}>Rate</div>
                        <div style={{ textAlign: 'right' }}>Amount</div>
                    </div>

                    {LINE_ITEMS.map((item, i) => (
                        <div className="line-row" key={i}>
                            <div>
                                <div className="line-desc">{item.description}</div>
                                <div className="line-detail">{item.detail}</div>
                            </div>
                            <div className="line-per">{item.per || '—'}</div>
                            <div className="line-amount">{fmt(item.amount)}</div>
                        </div>
                    ))}

                    {/* ── Totals ── */}
                    <div className="total-section">
                        <div className="total-row">
                            <span className="total-label">Subtotal</span>
                            <span className="total-value">{fmt(SUBTOTAL)}</span>
                        </div>
                        <div className="total-row highlight">
                            <span className="total-label strong">Total Due</span>
                            <span className="total-value big">{fmt(SUBTOTAL)}</span>
                        </div>
                    </div>

                    <div className="deposit-note">
                        <strong>Payment Terms:</strong> A {DEPOSIT_PERCENT}% reservation fee of <strong>{fmt(DEPOSIT)}</strong> is due upon signing to secure the March 26 date. The remaining balance of <strong>{fmt(SUBTOTAL - DEPOSIT)}</strong> is due within 3 business days of final delivery.<br /><br />
                        <strong>Rush Delivery:</strong> Interview 1 (CEO + CIO) will be delivered within approximately 1 week. Remaining edits delivered within 7–14 business days.
                    </div>

                    {/* ═══════════════════════════════════════════════
                        CONTRACT / AGREEMENT
                    ═══════════════════════════════════════════════ */}
                    <div className="contract-section">
                        <div className="contract-title">Production Services Agreement</div>

                        <div className="clause">
                            <div className="clause-num">1. Scope of Work</div>
                            <div className="clause-text">
                                MediaGeekz LLC (&ldquo;Producer&rdquo;) agrees to provide video production services for {CLIENT.company} (&ldquo;Client&rdquo;) as outlined in this invoice. Services include: on-site multi-camera recording of three (3) executive leadership interviews, professional post-production editing, color grading, sound design, and delivery of nine (9) total video assets (3 long-form episodes + 6 mobile-ready clips).
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">2. Shoot Date & Location</div>
                            <div className="clause-text">
                                Production is scheduled for <strong>March 26, 2026</strong> at the Client&rsquo;s designated venue in Winter Garden, FL. Crew setup begins at 9:30 AM. Recording begins at approximately 11:30 AM and concludes by approximately 5:00 PM.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">3. Payment</div>
                            <div className="clause-text">
                                Total project cost is <strong>{fmt(SUBTOTAL)}</strong>. A 50% reservation fee of <strong>{fmt(DEPOSIT)}</strong> is due upon execution of this agreement. The remaining balance of <strong>{fmt(SUBTOTAL - DEPOSIT)}</strong> is due within three (3) business days of final asset delivery. Payments may be made via bank transfer, credit card, or check.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">4. Deliverables & Timeline</div>
                            <div className="clause-text">
                                Producer will deliver three (3) multi-cam interview edits (15–20 min each) and six (6) mobile-ready 60-second clips. Interview 1 (CEO + CIO) will receive priority editing and be delivered within approximately one (1) week. Remaining deliverables will be available within 7–14 business days of the shoot date. Each edit includes simple lower-third graphics (name/title). Two (2) rounds of revisions are included.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">5. Additional Services</div>
                            <div className="clause-text">
                                Any additional videos recorded on shoot day will be billed at the agreed per-episode rate. Add-on services (boom operator, drone footage, BTS photography, dynamic captions, licensed music, additional clips) are available and priced separately as outlined on the proposal page.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">6. Cancellation & Rescheduling</div>
                            <div className="clause-text">
                                Client may reschedule the shoot date with at least seven (7) days&rsquo; notice at no additional charge, subject to Producer availability. Cancellations made more than 7 days prior to the shoot date will receive a full refund of the reservation fee. Cancellations within 7 days of the shoot date will forfeit the reservation fee to cover crew booking and preparation costs.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">7. Usage Rights</div>
                            <div className="clause-text">
                                Upon full payment, Client receives unlimited usage rights to all delivered video assets for internal and external marketing, social media, and promotional purposes. Producer retains the right to use footage in its portfolio and promotional materials unless otherwise agreed in writing.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">8. Acceptance</div>
                            <div className="clause-text">
                                By signing below, both parties agree to the terms outlined in this agreement and the attached invoice.
                            </div>
                        </div>

                        {/* ── Signature Block ── */}
                        <div className="sig-grid">
                            <div className="sig-block">
                                <div className="sig-label">Producer — MediaGeekz</div>
                                <div className="sig-line" />
                                <div className="sig-field">Signature</div>
                                <div className="sig-line" />
                                <div className="sig-field">Printed Name</div>
                                <div className="sig-line" />
                                <div className="sig-field">Date</div>
                            </div>
                            <div className="sig-block">
                                <div className="sig-label">Client — {CLIENT.company}</div>
                                <div className="sig-line" />
                                <div className="sig-field">Signature</div>
                                <div className="sig-line" />
                                <div className="sig-field">Printed Name</div>
                                <div className="sig-line" />
                                <div className="sig-field">Date</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
