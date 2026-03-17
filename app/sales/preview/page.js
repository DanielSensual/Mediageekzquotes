'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

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
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060a14', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    Invalid or missing proposal link.
                </motion.div>
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
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Dancing+Script:wght@700&display=swap');

                :root {
                    --bg-dark: #03050a;
                    --navy: rgba(10, 15, 28, 0.85);
                    --orange: #e8622c;
                    --teal: #2dd4bf;
                    --cream: #e2e8f0;
                    --white: #ffffff;
                    --muted: #94a3b8;
                    --muted-2: #64748b;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    background: var(--bg-dark);
                    background-image: 
                        radial-gradient(circle at 15% 50%, rgba(232, 98, 44, 0.05), transparent 25%),
                        radial-gradient(circle at 85% 30%, rgba(45, 212, 191, 0.05), transparent 25%);
                    color: var(--cream);
                    font-family: 'Inter', sans-serif;
                    line-height: 1.6;
                    -webkit-font-smoothing: antialiased;
                }

                @media print {
                    body { background: white; color: #111; background-image: none; }
                    .no-print { display: none !important; }
                    .invoice-card { box-shadow: none !important; border: 1px solid #ccc !important; background: white !important; padding: 0 !important; }
                }

                .inv-shell {
                    max-width: 860px; margin: 0 auto;
                    padding: 64px 24px 100px;
                    position: relative;
                }

                /* Glassmorphic Card */
                .invoice-card {
                    background: var(--navy);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 56px;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
                    position: relative;
                    overflow: hidden;
                }

                .invoice-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px;
                    background: linear-gradient(90deg, var(--orange), #f59e0b, var(--teal));
                }

                @media (max-width: 640px) {
                    .inv-shell { padding: 32px 16px 60px; }
                    .invoice-card { padding: 32px 24px; border-radius: 20px; }
                }

                /* Header */
                .inv-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 48px; gap: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 32px;
                }

                @media (max-width: 640px) {
                    .inv-header { flex-direction: column; }
                }

                .inv-brand {
                    font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 900;
                    color: var(--white); letter-spacing: -0.02em;
                    display: flex; align-items: center; gap: 10px;
                }

                .badge {
                    display: inline-block; padding: 4px 10px; border-radius: 6px;
                    background: rgba(232, 98, 44, 0.1); border: 1px solid rgba(232, 98, 44, 0.3);
                    color: var(--orange); font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
                    margin-top: 8px;
                }

                .inv-meta { text-align: right; font-size: 13px; color: var(--muted); }
                @media (max-width: 640px) { .inv-meta { text-align: left; } }
                .inv-meta strong { color: var(--white); font-weight: 600; }
                .meta-row { margin-bottom: 2px; }

                /* Parties */
                .inv-parties {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 32px; margin-bottom: 40px;
                }

                @media (max-width: 640px) {
                    .inv-parties { grid-template-columns: 1fr; gap: 24px; }
                }

                .party-title {
                    font-size: 10px; font-weight: 800; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-2); margin-bottom: 12px;
                }

                .party-name { font-size: 18px; font-weight: 700; color: var(--white); font-family: 'Outfit', sans-serif; }
                .party-detail { font-size: 13px; color: var(--muted); margin-top: 4px; }

                /* Project Title */
                .project-banner {
                    margin-bottom: 32px; padding: 24px; border-radius: 16px;
                    background: linear-gradient(135deg, rgba(232, 98, 44, 0.05), rgba(0,0,0,0));
                    border: 1px solid rgba(232, 98, 44, 0.15);
                }
                .pb-label { font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; }
                .pb-title { font-size: 20px; font-weight: 700; color: var(--white); font-family: 'Outfit', sans-serif;}
                .pb-notes { font-size: 14px; color: var(--cream); margin-top: 8px; opacity: 0.8; }

                /* Line Items */
                .line-header {
                    display: grid; grid-template-columns: 1fr 100px 120px;
                    padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-2);
                }

                .line-row {
                    display: grid; grid-template-columns: 1fr 100px 120px;
                    padding: 20px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.1);
                    align-items: center; transition: background 0.2s;
                }

                .line-row:hover { background: rgba(255, 255, 255, 0.02); }

                @media (max-width: 640px) {
                    .line-header { grid-template-columns: 1fr 80px 90px; }
                    .line-row { grid-template-columns: 1fr 80px 90px; }
                }

                .line-desc { font-size: 15px; font-weight: 600; color: var(--white); }
                .line-detail { font-size: 12px; color: var(--muted); margin-top: 4px; }
                .line-per { font-size: 13px; color: var(--muted-2); text-align: right; }
                .line-amount { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: var(--white); text-align: right; }

                /* Totals */
                .totals-section {
                    margin-top: 0; padding-top: 24px; padding-bottom: 12px;
                }

                .total-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 10px 0; font-size: 15px;
                }

                .total-row.sub { color: var(--muted); }
                .total-row.sub span:last-child { color: var(--white); font-family: 'Outfit', sans-serif; }

                .total-row.deposit {
                    margin-top: 16px; padding: 20px 0 0;
                    border-top: 1px dashed rgba(255, 255, 255, 0.15);
                }
                
                .deposit-label {
                    font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 800; color: var(--orange);
                    text-transform: uppercase; letter-spacing: 0.05em;
                }
                
                .deposit-val {
                    font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 900; color: var(--white);
                    text-shadow: 0 0 20px rgba(232, 98, 44, 0.4);
                }

                /* Payment CTA */
                .pay-section {
                    margin-top: 32px; display: grid;
                    grid-template-columns: 1fr 1fr; gap: 16px;
                }

                @media (max-width: 640px) {
                    .pay-section { grid-template-columns: 1fr; }
                }

                .pay-btn {
                    position: relative; padding: 18px; border: none; border-radius: 14px;
                    cursor: pointer; font-family: 'Outfit', sans-serif;
                    font-size: 15px; font-weight: 800; letter-spacing: 0.05em;
                    text-transform: uppercase; text-align: center;
                    overflow: hidden; z-index: 1; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .pay-btn-glow {
                    position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
                    background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent 30%);
                    animation: spin 4s linear infinite; z-index: -1; opacity: 0; transition: opacity 0.3s;
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }

                .pay-btn.deposit {
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white);
                    box-shadow: 0 10px 30px rgba(232, 98, 44, 0.35);
                }
                .pay-btn.deposit:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(232, 98, 44, 0.5); }
                .pay-btn.deposit:hover .pay-btn-glow { opacity: 1; }

                .pay-btn.full {
                    background: rgba(45, 212, 191, 0.05);
                    border: 1px solid rgba(45, 212, 191, 0.2);
                    color: var(--teal);
                }
                .pay-btn.full:hover { background: rgba(45, 212, 191, 0.1); border-color: rgba(45, 212, 191, 0.4); transform: translateY(-2px); }

                /* Contract */
                .contract-section { margin-top: 56px; }

                .contract-title {
                    font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800;
                    color: var(--white); margin-bottom: 32px;
                    display: flex; align-items: center; gap: 12px;
                }
                .contract-title::before { content: ''; display: block; width: 6px; height: 20px; background: var(--teal); border-radius: 4px; }

                .clause { margin-bottom: 24px; padding-left: 16px; border-left: 2px solid rgba(255,255,255,0.05); }
                .clause-num { font-size: 11px; font-weight: 800; color: var(--teal); letter-spacing: 0.15em; margin-bottom: 6px; }
                .clause-title { font-size: 15px; font-weight: 700; color: var(--cream); margin-bottom: 6px; font-family: 'Outfit', sans-serif;}
                .clause-text { font-size: 13px; color: var(--muted); line-height: 1.7; }

                /* Signatures */
                .sig-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 24px; margin-top: 48px;
                }

                @media (max-width: 640px) {
                    .sig-grid { grid-template-columns: 1fr; }
                }

                .sig-block {
                    padding: 24px; border-radius: 16px;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    position: relative; overflow: hidden;
                }

                .sig-label {
                    font-size: 10px; font-weight: 800; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-2); margin-bottom: 16px;
                }

                .sig-cursive {
                    font-family: 'Dancing Script', cursive; font-size: 28px;
                    color: var(--white); margin-bottom: 8px; text-shadow: 0 0 10px rgba(255,255,255,0.1);
                }

                .sig-name { font-size: 13px; color: var(--cream); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                .sig-email { font-size: 12px; color: var(--muted); margin-top: 2px; }
                .sig-date { font-size: 12px; color: var(--muted-2); margin-top: 6px; }

                .sig-input-group { margin-top: 12px; display: flex; gap: 8px; flex-direction: column; }
                .sig-input {
                    padding: 12px 16px; border-radius: 10px;
                    border: 1px solid rgba(100, 116, 139, 0.3);
                    background: rgba(15, 23, 42, 0.8); color: var(--white);
                    font-family: 'Inter', sans-serif; font-size: 15px;
                    transition: border-color 0.2s;
                }
                .sig-input:focus { outline: none; border-color: var(--orange); }

                .sig-btn {
                    padding: 12px 24px; border: none; border-radius: 10px;
                    background: var(--white); color: var(--navy); font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 800; cursor: pointer;
                    letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.2s;
                }
                .sig-btn:hover { background: var(--cream); transform: translateY(-1px); }

                .print-btn {
                    display: block; margin: 40px auto 0; padding: 12px 28px;
                    border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px;
                    background: transparent; color: var(--muted); font-size: 13px; font-weight: 600;
                    cursor: pointer; transition: all 0.2s;
                }

                .print-btn:hover { color: var(--white); border-color: rgba(255, 255, 255, 0.3); background: rgba(255,255,255,0.05); }
            `}</style>

            <motion.div 
                className="inv-shell" ref={printRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="invoice-card">
                    {/* Header */}
                    <div className="inv-header">
                        <div>
                            <div className="inv-brand">MediaGeekz 💎</div>
                            <div className="badge">Production Proposal</div>
                        </div>
                        <div className="inv-meta">
                            <div className="meta-row">Inv # <strong>{invoiceId}</strong></div>
                            <div className="meta-row">Date: <strong>{invoiceDate}</strong></div>
                            {project.shootDate && <div className="meta-row" style={{ marginTop: 6, color: 'var(--orange)' }}>Shoot Date: <strong>{formatDate(project.shootDate)}</strong></div>}
                            {project.location && <div className="meta-row">Location: <strong>{project.location}</strong></div>}
                        </div>
                    </div>

                    {/* Parties */}
                    <div className="inv-parties">
                        <div>
                            <div className="party-title">Prepared For</div>
                            <div className="party-name">{client.name || 'Client'}</div>
                            {client.company && <div className="party-detail">{client.company}</div>}
                            {client.email && <div className="party-detail">{client.email}</div>}
                        </div>
                        <div>
                            <div className="party-title">Prepared By</div>
                            <div className="party-name">MediaGeekz LLC</div>
                            <div className="party-detail">Orlando, FL</div>
                            <div className="party-detail">hello@mediageekz.com</div>
                            <div className="party-detail">mediageekz.com</div>
                        </div>
                    </div>

                    {/* Project Title */}
                    {project.name && (
                        <motion.div 
                            className="project-banner"
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        >
                            <div className="pb-label">Project Overview</div>
                            <div className="pb-title">{project.name}</div>
                            {project.notes && <div className="pb-notes">{project.notes}</div>}
                        </motion.div>
                    )}

                    {/* Line Items */}
                    <div className="line-header">
                        <div>Service Breakdown</div>
                        <div style={{ textAlign: 'right' }}>Rate</div>
                        <div style={{ textAlign: 'right' }}>Amount</div>
                    </div>

                    {lineItems.map((item, idx) => (
                        <motion.div 
                            className="line-row" key={idx}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (idx * 0.05) }}
                        >
                            <div>
                                <div className="line-desc">{item.label}</div>
                                <div className="line-detail">{item.detail}</div>
                            </div>
                            <div className="line-per">
                                {item.qty > 1 ? <><dt style={{color:'var(--white)'}}>{item.qty}×</dt> {fmt(item.price)}{item.perUnit}</> : ''}
                            </div>
                            <div className="line-amount">{fmt(item.price * item.qty)}</div>
                        </motion.div>
                    ))}

                    {/* Totals */}
                    <motion.div className="totals-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <div className="total-row sub">
                            <span>Project Subtotal</span>
                            <span>{fmt(subtotal)}</span>
                        </div>
                        <div className="total-row deposit">
                            <span className="deposit-label">Project Retainer (50%)</span>
                            <span className="deposit-val">{fmt(deposit)}</span>
                        </div>
                    </motion.div>

                    {/* Payment */}
                    <motion.div className="pay-section no-print" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
                        <button className="pay-btn deposit" onClick={() => handlePayment('deposit')}>
                            <div className="pay-btn-glow"></div>
                            Secure Date — Pay {fmt(deposit)}
                        </button>
                        <button className="pay-btn full" onClick={() => handlePayment('full')}>
                            Pay Full Amount — {fmt(subtotal)}
                        </button>
                    </motion.div>

                    {/* Contract */}
                    <motion.div className="contract-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <div className="contract-title">Master Services Agreement</div>
                        {CONTRACT_CLAUSES.map(clause => (
                            <div className="clause" key={clause.num}>
                                <div className="clause-num">§ {clause.num}</div>
                                <div className="clause-title">{clause.title}</div>
                                <div className="clause-text">{clause.text}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Signatures */}
                    <motion.div className="sig-grid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <div className="sig-block">
                            <div className="sig-label">Authorized Producer</div>
                            <div className="sig-cursive">Matt Workman</div>
                            <div className="sig-name">Matt Workman</div>
                            <div className="sig-email">Producer, MediaGeekz</div>
                            <div style={{ marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                                <div className="sig-cursive">Daniel Castillo</div>
                                <div className="sig-name">Daniel Castillo</div>
                                <div className="sig-email">Director, MediaGeekz</div>
                            </div>
                            <div className="sig-date">Issued: {invoiceDate}</div>
                        </div>

                        <div className="sig-block" style={{ background: signed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(0,0,0,0.2)', borderColor: signed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)' }}>
                            <div className="sig-label">Client Approval</div>
                            {signed ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                    <div className="sig-cursive" style={{ color: 'var(--teal)' }}>{sigName}</div>
                                    <div className="sig-name">{sigName}</div>
                                    {client.email && <div className="sig-email">{client.email}</div>}
                                    <div className="sig-date">Digitally Signed: {signedAt}</div>
                                    <div style={{ marginTop: 16, fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 800 }}>✓ Agreement Bound</div>
                                </motion.div>
                            ) : (
                                <div className="no-print">
                                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
                                        Type your full legal name below to execute this agreement and proceed to payment:
                                    </div>
                                    <div className="sig-input-group">
                                        <input
                                            className="sig-input"
                                            placeholder="Full Legal Name"
                                            value={sigName}
                                            onChange={e => setSigName(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleSign()}
                                        />
                                        <button className="sig-btn" onClick={handleSign}>Sign & Accept</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Print */}
                    <button className="print-btn no-print" onClick={handlePrint}>
                        🖨 Download PDF / Print
                    </button>
                </div>
            </motion.div>
        </>
    );
}

export default function SalesPreview() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03050a', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    Loading Proposal...
                </motion.div>
            </div>
        }>
            <PreviewContent />
        </Suspense>
    );
}
