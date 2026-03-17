'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   MediaGeekz Sales — Internal Proposal Builder
   /sales
   ═══════════════════════════════════════════════════════════════ */

const SERVICE_CATALOG = [
    { id: 'lead-dp', category: 'Crew', label: 'Lead Cinematographer — Full Day', detail: 'Primary camera, lighting, audio setup', defaultPrice: 1800 },
    { id: 'camera-op-b', category: 'Crew', label: 'Camera Operator B — Full Day', detail: '2nd angle coverage', defaultPrice: 1200 },
    { id: 'camera-op-c', category: 'Crew', label: 'Camera Operator C — Full Day', detail: '3rd angle / B-roll dedicated', defaultPrice: 1200 },
    { id: 'audio-tech', category: 'Crew', label: 'Audio Technician', detail: 'Dedicated sound engineer + wireless lavs', defaultPrice: 800 },
    { id: 'producer', category: 'Crew', label: 'On-Set Producer / Director', detail: 'Creative direction, talent coaching', defaultPrice: 1500 },
    { id: 'interview-edit', category: 'Post-Production', label: 'Multi-Cam Interview Edit', detail: '15–20 min each · synced, color graded', defaultPrice: 2500, perUnit: '/episode' },
    { id: 'short-form-edit', category: 'Post-Production', label: 'Short-Form Edit (Reel/TikTok)', detail: '60-sec vertical cuts (9:16)', defaultPrice: 250, perUnit: '/clip' },
    { id: 'long-form-edit', category: 'Post-Production', label: 'Long-Form Video Edit', detail: '5–15 min · full edit, color, sound design', defaultPrice: 3500, perUnit: '/video' },
    { id: 'commercial-edit', category: 'Post-Production', label: 'Commercial / Promo Edit', detail: '30–90 sec · premium grade, motion graphics', defaultPrice: 3000, perUnit: '/spot' },
    { id: 'color-grade', category: 'Post-Production', label: 'Color Grading (Standalone)', detail: 'DaVinci Resolve cinematic grade', defaultPrice: 500, perUnit: '/video' },
    { id: 'sound-design', category: 'Post-Production', label: 'Sound Design & Mix', detail: 'Audio cleanup, music bed, SFX', defaultPrice: 500, perUnit: '/video' },
    { id: 'bts-photo-cellphone', category: 'Photography', label: 'BTS Photography — Cellphone', detail: 'Behind-the-scenes photos shot on phone', defaultPrice: 500 },
    { id: 'bts-photo-pro', category: 'Photography', label: 'BTS Photography — Pro + Editing', detail: 'DSLR/mirrorless BTS photos, professionally edited', defaultPrice: 900 },
    { id: 'headshots', category: 'Photography', label: 'Professional Headshots', detail: 'Studio-quality portraits, retouched', defaultPrice: 350, perUnit: '/person' },
    { id: 'licensed-music', category: 'Add-On', label: 'Licensed Music', detail: 'Premium royalty-free track', defaultPrice: 150, perUnit: '/track' },
    { id: 'motion-graphics', category: 'Add-On', label: 'Custom Motion Graphics', detail: 'Animated titles, logos, transitions', defaultPrice: 1000 },
    { id: 'teleprompter', category: 'Add-On', label: 'Teleprompter + Operator', detail: 'On-set teleprompter with operator', defaultPrice: 400 },
    { id: 'drone', category: 'Add-On', label: 'Drone Footage', detail: 'FAA-licensed aerial cinematography', defaultPrice: 800 },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

function generateInvoiceId() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `MGZ-${d.getFullYear()}-${m}${day}`;
}

export default function SalesBuilder() {
    const [client, setClient] = useState({ name: '', company: '', email: '' });
    const [project, setProject] = useState({ name: '', shootDate: '', location: '', notes: '' });
    const [lineItems, setLineItems] = useState([]);
    const [copied, setCopied] = useState(false);

    const subtotal = lineItems.reduce((s, i) => s + (i.price * (i.qty || 1)), 0);
    const deposit = Math.round(subtotal * 0.5);

    const addService = (svc) => {
        if (lineItems.find(i => i.id === svc.id)) return;
        setLineItems(prev => [...prev, {
            id: svc.id,
            label: svc.label,
            detail: svc.detail,
            price: svc.defaultPrice,
            qty: 1,
            perUnit: svc.perUnit || '',
        }]);
    };

    const removeItem = (id) => {
        setLineItems(prev => prev.filter(i => i.id !== id));
    };

    const updateItem = (id, field, value) => {
        setLineItems(prev => prev.map(i =>
            i.id === id ? { ...i, [field]: (field === 'price' || field === 'qty') ? Number(value) || 0 : value } : i
        ));
    };

    const generateLink = useCallback(() => {
        const data = {
            c: client,
            p: project,
            inv: generateInvoiceId(),
            items: lineItems.map(i => ({
                l: i.label,
                d: i.detail,
                p: i.price,
                q: i.qty,
                u: i.perUnit,
            })),
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        const url = `${window.location.origin}/sales/preview?d=${encoded}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
        return url;
    }, [client, project, lineItems]);

    const categories = [...new Set(SERVICE_CATALOG.map(s => s.category))];

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');

                :root {
                    --bg: #060a14;
                    --card: #0f1729;
                    --card-border: rgba(100, 116, 139, 0.15);
                    --white: #f1f5f9;
                    --cream: #e2e8f0;
                    --muted: #94a3b8;
                    --orange: #e8622c;
                    --teal: #2dd4bf;
                    --green: #22c55e;
                    --red: #ef4444;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { background: var(--bg); color: var(--white); font-family: 'Inter', sans-serif; overflow-x: hidden; }

                /* Luxury Layout */
                .sales-layout {
                    max-width: 1400px; margin: 0 auto;
                    padding: 40px 24px 80px;
                    display: grid; grid-template-columns: 1fr 400px; gap: 40px;
                    align-items: start;
                }

                @media (max-width: 1024px) {
                    .sales-layout { grid-template-columns: 1fr; }
                }

                /* Header */
                .sales-header { margin-bottom: 40px; }
                .sales-title {
                    font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 800;
                    color: var(--white); letter-spacing: -0.02em;
                    background: linear-gradient(135deg, #fff, #a5b4fc);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                .sales-subtitle {
                    font-size: 13px; color: var(--orange); margin-top: 6px;
                    letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700;
                }

                /* Panels */
                .editor-col { display: flex; flex-direction: column; gap: 24px; }
                
                .panel {
                    background: var(--card); border: 1px solid var(--card-border);
                    border-radius: 20px; padding: 32px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .panel-title {
                    font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700;
                    color: var(--white); margin-bottom: 24px;
                    display: flex; align-items: center; gap: 12px;
                }

                .panel-title::before {
                    content: ''; display: block; width: 4px; height: 18px;
                    background: var(--orange); border-radius: 4px;
                }

                /* Grid inputs */
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
                .form-grid.single { grid-template-columns: 1fr; }

                .field-group { display: flex; flex-direction: column; gap: 8px; }
                .field-label {
                    font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted);
                }

                .field-input {
                    width: 100%; padding: 12px 16px; border-radius: 12px;
                    border: 1px solid rgba(100, 116, 139, 0.2);
                    background: rgba(15, 23, 42, 0.8); color: var(--white);
                    font-family: 'Inter', sans-serif; font-size: 14px;
                    transition: all 0.2s ease;
                }
                .field-input:focus {
                    outline: none; border-color: var(--orange);
                    box-shadow: 0 0 0 3px rgba(232, 98, 44, 0.15);
                }

                /* Catalog */
                .cat-label {
                    font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--teal); margin: 32px 0 16px;
                    border-bottom: 1px solid rgba(45, 212, 191, 0.2); padding-bottom: 8px;
                }
                .cat-label:first-child { margin-top: 0; }

                .svc-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 12px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.1);
                    gap: 16px; transition: background 0.2s; border-radius: 8px;
                }
                .svc-row:hover { background: rgba(255, 255, 255, 0.02); padding-left: 12px; padding-right: 12px; margin: 0 -12px; }
                .svc-row:last-child { border-bottom: none; }

                .svc-info { flex: 1; min-width: 0; }
                .svc-name { font-size: 14px; font-weight: 600; color: var(--white); }
                .svc-detail { font-size: 12px; color: var(--muted); margin-top: 4px; }
                .svc-price { font-size: 14px; font-weight: 500; color: var(--cream); white-space: nowrap; margin-right: 16px; font-family: 'Outfit', sans-serif; }

                .add-btn {
                    padding: 8px 16px; border: 1px solid rgba(232, 98, 44, 0.4);
                    border-radius: 8px; background: rgba(232, 98, 44, 0.1);
                    color: var(--orange); font-size: 12px; font-weight: 700;
                    cursor: pointer; transition: all 0.2s; white-space: nowrap;
                }
                .add-btn:hover { background: rgba(232, 98, 44, 0.2); transform: scale(1.02); }
                .add-btn.added {
                    border-color: rgba(34, 197, 94, 0.4); background: rgba(34, 197, 94, 0.1);
                    color: var(--green); cursor: default; transform: none;
                }

                /* Sidebar Preview */
                .preview-col {
                    position: sticky; top: 40px;
                    display: flex; flex-direction: column; gap: 24px;
                }

                .invoice-preview-card {
                    background: linear-gradient(180deg, #111827, #0f1729);
                    border: 1px solid var(--card-border); border-radius: 20px;
                    padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                    position: relative; overflow: hidden;
                }

                .invoice-preview-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
                    background: linear-gradient(90deg, var(--orange), var(--teal));
                }

                .pv-header { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .pv-title { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .pv-client { font-size: 24px; font-weight: 700; color: var(--white); margin-top: 8px; }
                .pv-project { font-size: 14px; color: var(--orange); margin-top: 4px; }

                .pv-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; min-height: 100px; }
                
                .li-card {
                    display: grid; grid-template-columns: auto 1fr auto; gap: 12px;
                    align-items: center; padding: 12px; border-radius: 12px;
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                }
                
                .li-actions { display: flex; flex-direction: column; gap: 8px; }
                .li-remove {
                    width: 24px; height: 24px; border: none; border-radius: 6px;
                    background: rgba(239, 68, 68, 0.1); color: var(--red);
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                }
                .li-remove:hover { background: rgba(239, 68, 68, 0.3); }

                .li-inputs { display: flex; gap: 8px; }
                .li-input {
                    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
                    color: var(--white); border-radius: 6px; padding: 6px;
                    font-size: 12px; text-align: center;
                }
                .li-input.qty { width: 40px; }
                .li-input.price { width: 70px; }
                .li-input:focus { outline: none; border-color: var(--teal); }

                .li-info { min-width: 0; }
                .li-name { font-size: 13px; font-weight: 600; color: var(--cream); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.4; }
                .li-total { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: var(--white); text-align: right; }

                .pv-totals {
                    padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05);
                }

                .pv-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .pv-total-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .pv-total-val { font-family: 'Outfit', sans-serif; font-size: 16px; color: var(--white); }
                
                .pv-total-row.deposit { margin-top: 16px; padding-top: 16px; border-top: 1px dashed rgba(255,255,255,0.1); }
                .pv-total-row.deposit .pv-total-label { color: var(--orange); font-weight: 700; }
                .pv-total-row.deposit .pv-total-val { font-size: 24px; font-weight: 800; color: var(--orange); }

                .generate-btn {
                    width: 100%; padding: 18px; border: none; border-radius: 12px;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 15px; font-weight: 800; cursor: pointer;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    transition: all 0.2s; box-shadow: 0 10px 30px rgba(232, 98, 44, 0.3);
                    margin-top: 24px;
                }
                .generate-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(232, 98, 44, 0.4); }
                .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
                .generate-btn.copied {
                    background: linear-gradient(135deg, var(--green), var(--teal));
                    box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
                }

                .empty-items { text-align: center; padding: 40px 0; color: rgba(255,255,255,0.2); font-size: 13px; }
            `}</style>

            <div className="sales-layout">
                {/* LEFT COL: Editor */}
                <div className="editor-col">
                    <div className="sales-header">
                        <div className="sales-title">MediaGeekz Sales 💎</div>
                        <div className="sales-subtitle">Premium Proposal Engine</div>
                    </div>

                    <div className="panel">
                        <div className="panel-title">1. Client Details</div>
                        <div className="form-grid">
                            <div className="field-group">
                                <label className="field-label">Client Name</label>
                                <input className="field-input" placeholder="e.g. Tommy Bliven" value={client.name} onChange={e => setClient(p => ({ ...p, name: e.target.value }))} />
                            </div>
                            <div className="field-group">
                                <label className="field-label">Company</label>
                                <input className="field-input" placeholder="e.g. 66 Degrees" value={client.company} onChange={e => setClient(p => ({ ...p, company: e.target.value }))} />
                            </div>
                            <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                                <label className="field-label">Email Address</label>
                                <input className="field-input" type="email" placeholder="client@company.com" value={client.email} onChange={e => setClient(p => ({ ...p, email: e.target.value }))} />
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-title">2. Project Details</div>
                        <div className="form-grid">
                            <div className="field-group">
                                <label className="field-label">Project Name</label>
                                <input className="field-input" placeholder="e.g. Leadership Interviews" value={project.name} onChange={e => setProject(p => ({ ...p, name: e.target.value }))} />
                            </div>
                            <div className="field-group">
                                <label className="field-label">Shoot Date</label>
                                <input className="field-input" type="date" value={project.shootDate} onChange={e => setProject(p => ({ ...p, shootDate: e.target.value }))} />
                            </div>
                            <div className="field-group">
                                <label className="field-label">Location</label>
                                <input className="field-input" placeholder="Orlando, FL" value={project.location} onChange={e => setProject(p => ({ ...p, location: e.target.value }))} />
                            </div>
                            <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                                <label className="field-label">Internal/Contract Notes (optional)</label>
                                <input className="field-input" placeholder="Special deliverables or instructions..." value={project.notes} onChange={e => setProject(p => ({ ...p, notes: e.target.value }))} />
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-title">3. Service Catalog</div>
                        {categories.map(cat => (
                            <div key={cat} style={{ marginBottom: 24 }}>
                                <div className="cat-label">{cat}</div>
                                {SERVICE_CATALOG.filter(s => s.category === cat).map(svc => {
                                    const added = lineItems.find(i => i.id === svc.id);
                                    return (
                                        <div className="svc-row" key={svc.id}>
                                            <div className="svc-info">
                                                <div className="svc-name">{svc.label}</div>
                                                <div className="svc-detail">{svc.detail}</div>
                                            </div>
                                            <div className="svc-price">
                                                {fmt(svc.defaultPrice)}{svc.perUnit || ''}
                                            </div>
                                            <button className={`add-btn ${added ? 'added' : ''}`} onClick={() => addService(svc)}>
                                                {added ? '✓ Active' : '+ Add Item'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COL: Sticky Preview */}
                <div className="preview-col">
                    <div className="invoice-preview-card">
                        <div className="pv-header">
                            <div className="pv-title">Live Preview</div>
                            <div className="pv-client">{client.name || 'Client Name'}</div>
                            <div className="pv-project">{project.name || 'Project Name'}</div>
                        </div>

                        <div className="pv-items">
                            <AnimatePresence>
                                {lineItems.length === 0 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="empty-items">
                                        No line items added yet.
                                    </motion.div>
                                )}
                                {lineItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, overflow: 'hidden' }}
                                        transition={{ duration: 0.2 }}
                                        className="li-card"
                                    >
                                        <button className="li-remove" onClick={() => removeItem(item.id)} title="Remove">✕</button>
                                        <div className="li-info">
                                            <div className="li-name" title={item.label}>{item.label}</div>
                                            <div className="li-inputs" style={{ marginTop: 8 }}>
                                                <input className="li-input qty" type="number" min="1" value={item.qty} onChange={e => updateItem(item.id, 'qty', e.target.value)} title="Qty" />
                                                <span style={{color: 'rgba(255,255,255,0.3)', fontSize: 10, alignSelf: 'center'}}>×</span>
                                                <input className="li-input price" type="number" value={item.price} onChange={e => updateItem(item.id, 'price', e.target.value)} title="Price" />
                                            </div>
                                        </div>
                                        <div className="li-total">{fmt(item.price * item.qty)}</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="pv-totals">
                            <div className="pv-total-row">
                                <span className="pv-total-label">Subtotal</span>
                                <span className="pv-total-val">{fmt(subtotal)}</span>
                            </div>
                            <div className="pv-total-row deposit">
                                <span className="pv-total-label">50% Deposit</span>
                                <span className="pv-total-val">{fmt(deposit)}</span>
                            </div>
                        </div>

                        <button
                            className={`generate-btn ${copied ? 'copied' : ''}`}
                            onClick={generateLink}
                            disabled={lineItems.length === 0}
                        >
                            {copied ? '✓ Link Copied' : 'Generate Secure Link'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
