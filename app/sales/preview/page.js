'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/* ═══════════════════════════════════════════════════════════════
   MediaGeekz Sales — Client-Facing Preview
   /sales/preview?d=<encoded>
   Invoice + Contract + Checkout
   ═══════════════════════════════════════════════════════════════ */

const CONTRACT_CLAUSES = [
    { num: '01', title: 'Scope of Work', text: 'Producer agrees to provide video production services as described in the line items above, including all listed crew, equipment, and post-production deliverables.' },
    { num: '02', title: 'Shoot Date & Location', text: 'The shoot date and location are as specified above. Producer will confirm call time and logistics at least 48 hours prior to the shoot. Any changes must be agreed upon in writing.' },
    { num: '03', title: 'Payment Terms', text: 'A 50% deposit is required to secure the production date. The remaining balance is due upon delivery of the first completed deliverable. All payments are processed securely via Square.' },
    { num: '04', title: 'Deliverables & Timeline', text: 'First deliverable will be provided within 7–10 business days of the shoot date. Remaining deliverables follow within 14 business days. Two (2) rounds of revisions are included per deliverable.' },
    { num: '05', title: 'Cancellation & Rescheduling', text: 'Cancellations made more than 7 days before the shoot date receive a full deposit refund. Cancellations within 7 days forfeit the deposit. Rescheduling within 48 hours incurs a $500 rebooking fee.' },
    { num: '06', title: 'Usage Rights', text: 'Client receives a perpetual, non-exclusive license to use all final deliverables for commercial and promotional purposes. Producer retains the right to use footage for portfolio and marketing.' },
    { num: '07', title: 'Acceptance', text: 'By signing below, the parties agree to the scope of work, deliverables, and payment terms outlined in this agreement.' },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

function formatDate(str) {
    if (!str) return '';
    const d = new Date(str + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function PreviewContent() {
    const searchParams = useSearchParams();
    const printRef = useRef(null);
    const [data, setData] = useState(null);
    const [sigName, setSigName] = useState('');
    const [signed, setSigned] = useState(false);
    const [signedAt, setSignedAt] = useState(null);

    useEffect(() => {
        try {
            const encoded = searchParams.get('d');
            if (!encoded) return;
            const json = decodeURIComponent(atob(encoded));
            setData(JSON.parse(json));
        } catch (e) {
            console.error('Failed to decode proposal data:', e);
        }
    }, [searchParams]);

    if (!data) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f1a', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                Invalid or missing proposal link.
            </div>
        );
    }

    const { c: client, p: project, inv: invoiceId, items } = data;
    const lineItems = items.map(i => ({ label: i.l, detail: i.d, price: i.p, qty: i.q, perUnit: i.u || '' }));
    const subtotal = lineItems.reduce((s, i) => s + (i.price * i.qty), 0);
    const deposit = Math.round(subtotal * 0.5);
    const invoiceDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const handlePayment = (type) => {
        const amount = type === 'deposit' ? deposit : subtotal;
        const description = type === 'deposit'
            ? `MediaGeekz — ${project.name || 'Video Production'} (50% Deposit)`
            : `MediaGeekz — ${project.name || 'Video Production'} (Full Payment)`;
        const params = new URLSearchParams({ amount: amount.toString(), desc: description, type });
        window.location.href = `/checkout?${params.toString()}`;
    };

    const handleSign = () => {
        if (!sigName.trim()) return;
        const now = new Date();
        setSignedAt(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        setSigned(true);
    };

    const handlePrint = () => window.print();

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Dancing+Script:wght@700&display=swap');

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
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    background: var(--shadow);
                    color: var(--cream);
                    font-family: 'Inter', sans-serif;
                    line-height: 1.6;
                    -webkit-font-smoothing: antialiased;
                }

                @media print {
                    body { background: white; color: #1a1a2e; }
                    .no-print { display: none !important; }
                    .invoice-card { box-shadow: none; border: 1px solid #ddd; background: white; }
                }

                .inv-shell {
                    max-width: 820px; margin: 0 auto;
                    padding: 48px 24px 80px;
                }

                .invoice-card {
                    background: var(--navy);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 48px 40px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
                }

                @media (max-width: 640px) {
                    .invoice-card { padding: 28px 18px; border-radius: 16px; }
                }

                /* Header */
                .inv-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 36px; gap: 24px;
                }

                @media (max-width: 640px) {
                    .inv-header { flex-direction: column; }
                }

                .inv-brand {
                    font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800;
                    color: var(--white); letter-spacing: -0.02em;
                }

                .inv-label {
                    font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--orange); margin-top: 4px;
                }

                .inv-meta { text-align: right; font-size: 12px; color: var(--muted); }
                @media (max-width: 640px) { .inv-meta { text-align: left; } }
                .inv-meta strong { color: var(--cream); font-weight: 600; }

                /* Parties */
                .inv-parties {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 24px; margin-bottom: 32px;
                    padding: 20px; border-radius: 14px;
                    background: rgba(232, 98, 44, 0.03);
                    border: 1px solid rgba(232, 98, 44, 0.08);
                }

                @media (max-width: 640px) {
                    .inv-parties { grid-template-columns: 1fr; gap: 16px; }
                }

                .party-title {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--teal); margin-bottom: 8px;
                }

                .party-name { font-size: 15px; font-weight: 700; color: var(--white); }
                .party-detail { font-size: 12px; color: var(--muted); margin-top: 2px; }

                /* Line Items */
                .line-header {
                    display: grid; grid-template-columns: 1fr 90px 100px;
                    padding: 12px 0; border-bottom: 1px solid rgba(232, 98, 44, 0.1);
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-2);
                }

                .line-row {
                    display: grid; grid-template-columns: 1fr 90px 100px;
                    padding: 14px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.06);
                    align-items: center;
                }

                @media (max-width: 640px) {
                    .line-header { grid-template-columns: 1fr 70px 80px; }
                    .line-row { grid-template-columns: 1fr 70px 80px; }
                }

                .line-desc { font-size: 13px; font-weight: 600; color: var(--cream); }
                .line-detail { font-size: 11px; color: var(--muted); margin-top: 2px; }
                .line-per { font-size: 11px; color: var(--muted-2); text-align: right; }
                .line-amount { font-size: 14px; font-weight: 700; color: var(--white); text-align: right; }

                /* Totals */
                .totals-section {
                    margin-top: 24px; padding-top: 20px;
                    border-top: 2px solid rgba(232, 98, 44, 0.12);
                }

                .total-row {
                    display: flex; justify-content: space-between;
                    padding: 8px 0; font-size: 14px;
                }

                .total-row.sub { color: var(--muted); }
                .total-row.deposit {
                    font-size: 16px; font-weight: 700; color: var(--orange);
                    margin-top: 8px; padding-top: 12px;
                    border-top: 1px solid rgba(232, 98, 44, 0.12);
                }

                /* Payment */
                .pay-section {
                    margin-top: 32px; display: grid;
                    grid-template-columns: 1fr 1fr; gap: 12px;
                }

                @media (max-width: 640px) {
                    .pay-section { grid-template-columns: 1fr; }
                }

                .pay-btn {
                    padding: 16px; border: none; border-radius: 14px;
                    cursor: pointer; font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700; letter-spacing: 0.05em;
                    text-transform: uppercase; transition: all 0.2s;
                    text-align: center;
                }

                .pay-btn.deposit {
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white);
                    box-shadow: 0 8px 28px rgba(232, 98, 44, 0.35);
                }

                .pay-btn.full {
                    background: rgba(45, 212, 191, 0.08);
                    border: 1px solid rgba(45, 212, 191, 0.2);
                    color: var(--teal);
                }

                .pay-btn:hover { transform: translateY(-2px); }

                /* Contract */
                .contract-section { margin-top: 48px; }

                .contract-title {
                    font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700;
                    color: var(--white); margin-bottom: 24px;
                    padding-bottom: 12px; border-bottom: 1px solid rgba(232, 98, 44, 0.1);
                }

                .clause { margin-bottom: 20px; }
                .clause-num {
                    font-size: 10px; font-weight: 700; color: var(--orange);
                    letter-spacing: 0.15em; margin-bottom: 4px;
                }
                .clause-title { font-size: 14px; font-weight: 700; color: var(--cream); margin-bottom: 4px; }
                .clause-text { font-size: 12px; color: var(--muted); line-height: 1.7; }

                /* Signatures */
                .sig-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 24px; margin-top: 32px;
                }

                @media (max-width: 640px) {
                    .sig-grid { grid-template-columns: 1fr; }
                }

                .sig-block {
                    padding: 20px; border-radius: 14px;
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(100, 116, 139, 0.1);
                }

                .sig-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--teal); margin-bottom: 12px;
                }

                .sig-cursive {
                    font-family: 'Dancing Script', cursive; font-size: 22px;
                    color: var(--white); margin-bottom: 6px;
                }

                .sig-name { font-size: 12px; color: var(--cream); font-weight: 600; }
                .sig-email { font-size: 11px; color: var(--muted); margin-top: 2px; }
                .sig-date { font-size: 11px; color: var(--muted-2); margin-top: 4px; }

                .sig-input-group { margin-top: 4px; display: flex; gap: 8px; }
                .sig-input {
                    flex: 1; padding: 10px 14px; border-radius: 10px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    background: rgba(15, 23, 42, 0.6); color: var(--white);
                    font-family: 'Inter', sans-serif; font-size: 14px;
                }
                .sig-input:focus { outline: none; border-color: var(--orange); }

                .sig-btn {
                    padding: 10px 20px; border: none; border-radius: 10px;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 12px; font-weight: 700; cursor: pointer;
                    letter-spacing: 0.06em;
                }

                .print-btn {
                    display: block; margin: 32px auto 0; padding: 12px 28px;
                    border: 1px solid rgba(100, 116, 139, 0.15); border-radius: 10px;
                    background: transparent; color: var(--muted); font-size: 12px;
                    cursor: pointer; transition: all 0.2s;
                }

                .print-btn:hover { color: var(--white); border-color: rgba(100, 116, 139, 0.3); }
            `}</style>

            <div className="inv-shell" ref={printRef}>
                <div className="invoice-card">
                    {/* Header */}
                    <div className="inv-header">
                        <div>
                            <div className="inv-brand">MediaGeekz</div>
                            <div className="inv-label">Production Invoice</div>
                        </div>
                        <div className="inv-meta">
                            <div><strong>{invoiceId}</strong></div>
                            <div>{invoiceDate}</div>
                            {project.shootDate && <div>Shoot: <strong>{formatDate(project.shootDate)}</strong></div>}
                            {project.location && <div>{project.location}</div>}
                        </div>
                    </div>

                    {/* Parties */}
                    <div className="inv-parties">
                        <div>
                            <div className="party-title">Bill To</div>
                            <div className="party-name">{client.name || 'Client'}</div>
                            {client.company && <div className="party-detail">{client.company}</div>}
                            {client.email && <div className="party-detail">{client.email}</div>}
                        </div>
                        <div>
                            <div className="party-title">From</div>
                            <div className="party-name">MediaGeekz LLC</div>
                            <div className="party-detail">Orlando, FL</div>
                            <div className="party-detail">info@mediageekz.com</div>
                        </div>
                    </div>

                    {/* Project Title */}
                    {project.name && (
                        <div style={{ marginBottom: 24, padding: '14px 18px', borderRadius: 12, background: 'rgba(232, 98, 44, 0.04)', border: '1px solid rgba(232, 98, 44, 0.1)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 4 }}>Project</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>{project.name}</div>
                            {project.notes && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{project.notes}</div>}
                        </div>
                    )}

                    {/* Line Items */}
                    <div className="line-header">
                        <div>Description</div>
                        <div style={{ textAlign: 'right' }}>Rate</div>
                        <div style={{ textAlign: 'right' }}>Amount</div>
                    </div>

                    {lineItems.map((item, idx) => (
                        <div className="line-row" key={idx}>
                            <div>
                                <div className="line-desc">{item.label}</div>
                                <div className="line-detail">{item.detail}</div>
                            </div>
                            <div className="line-per">
                                {item.qty > 1 ? `${fmt(item.price)}${item.perUnit}` : ''}
                            </div>
                            <div className="line-amount">{fmt(item.price * item.qty)}</div>
                        </div>
                    ))}

                    {/* Totals */}
                    <div className="totals-section">
                        <div className="total-row sub">
                            <span>Subtotal</span>
                            <span>{fmt(subtotal)}</span>
                        </div>
                        <div className="total-row deposit">
                            <span>50% Deposit Due</span>
                            <span>{fmt(deposit)}</span>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="pay-section no-print">
                        <button className="pay-btn deposit" onClick={() => handlePayment('deposit')}>
                            Pay Deposit — {fmt(deposit)}
                        </button>
                        <button className="pay-btn full" onClick={() => handlePayment('full')}>
                            Pay Full — {fmt(subtotal)}
                        </button>
                    </div>

                    {/* Contract */}
                    <div className="contract-section">
                        <div className="contract-title">Production Agreement</div>
                        {CONTRACT_CLAUSES.map(clause => (
                            <div className="clause" key={clause.num}>
                                <div className="clause-num">§ {clause.num}</div>
                                <div className="clause-title">{clause.title}</div>
                                <div className="clause-text">{clause.text}</div>
                            </div>
                        ))}
                    </div>

                    {/* Signatures */}
                    <div className="sig-grid">
                        <div className="sig-block">
                            <div className="sig-label">Producer</div>
                            <div className="sig-cursive">Matt Workman</div>
                            <div className="sig-name">Matt Workman</div>
                            <div className="sig-email">mattworkman@mediageekz.com</div>
                            <div style={{ marginTop: 12, borderTop: '1px solid rgba(100,116,139,0.1)', paddingTop: 10 }}>
                                <div className="sig-cursive">Daniel Castillo</div>
                                <div className="sig-name">Daniel Castillo</div>
                                <div className="sig-email">danielcastillo@mediageekz.com</div>
                            </div>
                            <div className="sig-date">{invoiceDate}</div>
                        </div>

                        <div className="sig-block">
                            <div className="sig-label">Client</div>
                            {signed ? (
                                <>
                                    <div className="sig-cursive">{sigName}</div>
                                    <div className="sig-name">{sigName}</div>
                                    {client.email && <div className="sig-email">{client.email}</div>}
                                    <div className="sig-date">{signedAt}</div>
                                </>
                            ) : (
                                <div className="no-print">
                                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
                                        Type your full name to sign this agreement:
                                    </div>
                                    <div className="sig-input-group">
                                        <input
                                            className="sig-input"
                                            placeholder="Full Name"
                                            value={sigName}
                                            onChange={e => setSigName(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleSign()}
                                        />
                                        <button className="sig-btn" onClick={handleSign}>Sign</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Print */}
                    <button className="print-btn no-print" onClick={handlePrint}>
                        🖨 Print / Save PDF
                    </button>
                </div>
            </div>
        </>
    );
}

export default function SalesPreview() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f1a', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                Loading proposal...
            </div>
        }>
            <PreviewContent />
        </Suspense>
    );
}
