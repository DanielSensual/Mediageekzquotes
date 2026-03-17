'use client';

import { useState, useCallback } from 'react';

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
            i.id === id ? { ...i, [field]: field === 'price' || field === 'qty' ? Number(value) || 0 : value } : i
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
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap');

                :root {
                    --bg: #0b0f1a;
                    --card: #111827;
                    --card-border: rgba(100, 116, 139, 0.12);
                    --white: #f1f5f9;
                    --cream: #e2e8f0;
                    --muted: #94a3b8;
                    --orange: #e8622c;
                    --teal: #2dd4bf;
                    --green: #22c55e;
                    --red: #ef4444;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { background: var(--bg); color: var(--white); font-family: 'Inter', sans-serif; }

                .sales-shell {
                    max-width: 1100px; margin: 0 auto;
                    padding: 40px 24px 80px;
                }

                .sales-header {
                    text-align: center; margin-bottom: 48px;
                }

                .sales-title {
                    font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800;
                    color: var(--orange); letter-spacing: -0.02em;
                }

                .sales-subtitle {
                    font-size: 13px; color: var(--muted); margin-top: 6px;
                    letter-spacing: 0.1em; text-transform: uppercase;
                }

                .sales-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
                }

                @media (max-width: 768px) { .sales-grid { grid-template-columns: 1fr; } }

                .panel {
                    background: var(--card); border: 1px solid var(--card-border);
                    border-radius: 16px; padding: 28px 24px;
                }

                .panel-title {
                    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
                    color: var(--white); margin-bottom: 20px;
                    letter-spacing: 0.03em;
                }

                .field-group { margin-bottom: 16px; }
                .field-label {
                    display: block; font-size: 10px; font-weight: 700;
                    letter-spacing: 0.2em; text-transform: uppercase;
                    color: var(--muted); margin-bottom: 6px;
                }

                .field-input {
                    width: 100%; padding: 10px 14px; border-radius: 10px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    background: rgba(15, 23, 42, 0.6); color: var(--white);
                    font-family: 'Inter', sans-serif; font-size: 14px;
                    transition: border-color 0.2s;
                }

                .field-input:focus {
                    outline: none; border-color: var(--orange);
                }

                .field-input::placeholder { color: rgba(148, 163, 184, 0.4); }

                /* Service catalog */
                .catalog-section { margin-top: 32px; }
                .catalog-section .panel { margin-bottom: 16px; }

                .cat-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--teal); margin-bottom: 12px;
                }

                .svc-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 10px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.06);
                    gap: 12px;
                }

                .svc-row:last-child { border-bottom: none; }

                .svc-info { flex: 1; min-width: 0; }
                .svc-name { font-size: 13px; font-weight: 600; color: var(--cream); }
                .svc-detail { font-size: 11px; color: var(--muted); margin-top: 2px; }
                .svc-price { font-size: 13px; color: var(--muted); white-space: nowrap; margin-right: 12px; }

                .add-btn {
                    padding: 6px 14px; border: 1px solid rgba(232, 98, 44, 0.3);
                    border-radius: 8px; background: rgba(232, 98, 44, 0.08);
                    color: var(--orange); font-size: 11px; font-weight: 700;
                    cursor: pointer; white-space: nowrap; transition: all 0.2s;
                    letter-spacing: 0.05em;
                }
                .add-btn:hover { background: rgba(232, 98, 44, 0.16); }
                .add-btn.added {
                    border-color: rgba(34, 197, 94, 0.3); background: rgba(34, 197, 94, 0.08);
                    color: var(--green); cursor: default;
                }

                /* Line items editor */
                .line-items-section { margin-top: 32px; }
                .li-card {
                    background: var(--card); border: 1px solid var(--card-border);
                    border-radius: 14px; padding: 16px 20px; margin-bottom: 10px;
                    display: flex; align-items: center; gap: 12px;
                }

                .li-info { flex: 1; min-width: 0; }
                .li-label { font-size: 13px; font-weight: 600; color: var(--cream); }
                .li-detail { font-size: 10px; color: var(--muted); margin-top: 2px; }

                .li-input {
                    width: 80px; padding: 8px 10px; border-radius: 8px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    background: rgba(15, 23, 42, 0.6); color: var(--white);
                    font-family: 'Inter', sans-serif; font-size: 13px;
                    text-align: right;
                }
                .li-input:focus { outline: none; border-color: var(--orange); }

                .li-qty { width: 50px; }

                .li-total {
                    font-size: 14px; font-weight: 700; color: var(--white);
                    min-width: 80px; text-align: right;
                }

                .li-remove {
                    width: 28px; height: 28px; border: none; border-radius: 6px;
                    background: rgba(239, 68, 68, 0.08); color: var(--red);
                    cursor: pointer; font-size: 16px; display: flex;
                    align-items: center; justify-content: center; transition: all 0.2s;
                }
                .li-remove:hover { background: rgba(239, 68, 68, 0.2); }

                /* Totals */
                .totals-bar {
                    margin-top: 24px; padding: 24px; border-radius: 14px;
                    background: linear-gradient(135deg, rgba(232, 98, 44, 0.08), rgba(45, 212, 191, 0.04));
                    border: 1px solid rgba(232, 98, 44, 0.15);
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 16px;
                }

                .totals-left { display: flex; gap: 32px; flex-wrap: wrap; }

                .total-block {}
                .total-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
                .total-value { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: var(--white); margin-top: 4px; }
                .total-value.orange { color: var(--orange); }

                .generate-btn {
                    padding: 14px 32px; border: none; border-radius: 12px;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700; cursor: pointer;
                    letter-spacing: 0.06em; text-transform: uppercase;
                    transition: all 0.2s;
                    box-shadow: 0 8px 28px rgba(232, 98, 44, 0.3);
                }
                .generate-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(232, 98, 44, 0.4); }
                .generate-btn.copied {
                    background: linear-gradient(135deg, var(--green), var(--teal));
                    box-shadow: 0 8px 28px rgba(34, 197, 94, 0.3);
                }

                .empty-state {
                    text-align: center; padding: 40px 20px; color: var(--muted);
                    font-size: 13px;
                }
            `}</style>

            <div className="sales-shell">
                <div className="sales-header">
                    <div className="sales-title">MediaGeekz Sales</div>
                    <div className="sales-subtitle">Proposal Builder</div>
                </div>

                {/* Client & Project Info */}
                <div className="sales-grid">
                    <div className="panel">
                        <div className="panel-title">Client Details</div>
                        <div className="field-group">
                            <label className="field-label">Client Name</label>
                            <input className="field-input" placeholder="Tommy Bliven" value={client.name} onChange={e => setClient(p => ({ ...p, name: e.target.value }))} />
                        </div>
                        <div className="field-group">
                            <label className="field-label">Company</label>
                            <input className="field-input" placeholder="66 Degrees" value={client.company} onChange={e => setClient(p => ({ ...p, company: e.target.value }))} />
                        </div>
                        <div className="field-group">
                            <label className="field-label">Email</label>
                            <input className="field-input" type="email" placeholder="client@company.com" value={client.email} onChange={e => setClient(p => ({ ...p, email: e.target.value }))} />
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-title">Project Details</div>
                        <div className="field-group">
                            <label className="field-label">Project Name</label>
                            <input className="field-input" placeholder="Leadership Interviews" value={project.name} onChange={e => setProject(p => ({ ...p, name: e.target.value }))} />
                        </div>
                        <div className="field-group">
                            <label className="field-label">Shoot Date</label>
                            <input className="field-input" type="date" value={project.shootDate} onChange={e => setProject(p => ({ ...p, shootDate: e.target.value }))} />
                        </div>
                        <div className="field-group">
                            <label className="field-label">Location</label>
                            <input className="field-input" placeholder="Orlando, FL" value={project.location} onChange={e => setProject(p => ({ ...p, location: e.target.value }))} />
                        </div>
                        <div className="field-group">
                            <label className="field-label">Notes (optional)</label>
                            <input className="field-input" placeholder="Special instructions..." value={project.notes} onChange={e => setProject(p => ({ ...p, notes: e.target.value }))} />
                        </div>
                    </div>
                </div>

                {/* Service Catalog */}
                <div className="catalog-section">
                    <div className="panel-title" style={{ marginTop: 32, marginBottom: 16, fontSize: 18 }}>Service Catalog</div>
                    {categories.map(cat => (
                        <div className="panel" key={cat}>
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
                                        <button
                                            className={`add-btn ${added ? 'added' : ''}`}
                                            onClick={() => addService(svc)}
                                        >
                                            {added ? '✓ Added' : '+ Add'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Line Items Editor */}
                <div className="line-items-section">
                    <div className="panel-title" style={{ marginTop: 32, marginBottom: 16, fontSize: 18 }}>
                        Line Items ({lineItems.length})
                    </div>

                    {lineItems.length === 0 ? (
                        <div className="panel">
                            <div className="empty-state">
                                Add services from the catalog above to build the proposal.
                            </div>
                        </div>
                    ) : (
                        <>
                            {lineItems.map(item => (
                                <div className="li-card" key={item.id}>
                                    <div className="li-info">
                                        <div className="li-label">{item.label}</div>
                                        <div className="li-detail">{item.detail}</div>
                                    </div>
                                    <input
                                        className="li-input li-qty"
                                        type="number"
                                        min="1"
                                        value={item.qty}
                                        onChange={e => updateItem(item.id, 'qty', e.target.value)}
                                        title="Quantity"
                                    />
                                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>×</span>
                                    <input
                                        className="li-input"
                                        type="number"
                                        value={item.price}
                                        onChange={e => updateItem(item.id, 'price', e.target.value)}
                                        title="Unit price"
                                    />
                                    <div className="li-total">{fmt(item.price * item.qty)}</div>
                                    <button className="li-remove" onClick={() => removeItem(item.id)} title="Remove">×</button>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Totals & Generate */}
                {lineItems.length > 0 && (
                    <div className="totals-bar">
                        <div className="totals-left">
                            <div className="total-block">
                                <div className="total-label">Subtotal</div>
                                <div className="total-value">{fmt(subtotal)}</div>
                            </div>
                            <div className="total-block">
                                <div className="total-label">50% Deposit</div>
                                <div className="total-value orange">{fmt(deposit)}</div>
                            </div>
                        </div>
                        <button
                            className={`generate-btn ${copied ? 'copied' : ''}`}
                            onClick={generateLink}
                        >
                            {copied ? '✓ Link Copied!' : 'Generate & Copy Link'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
