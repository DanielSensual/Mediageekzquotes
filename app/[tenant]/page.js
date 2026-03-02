'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

// ─── Helpers ─────────────────────────────────────────────────────

function fmt(n) {
    return '$' + (n || 0).toLocaleString('en-US');
}

function getLocalDateString(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const TURNAROUND_SHORT = {
    standard: '2 Weeks', expedited: '1 Week', rush: '48 Hours', nextDay: 'Next-Day', sameDay: 'Same-Day',
};

const TURNAROUND_OPTIONS = [
    { value: 'standard', label: 'Standard — 2 weeks (no surcharge)' },
    { value: 'expedited', label: 'Expedited — 1 week (+20%)' },
    { value: 'rush', label: 'Rush — 48 hours (+35%)' },
    { value: 'nextDay', label: 'Next-Day — 24 hours (+60%)' },
    { value: 'sameDay', label: 'Same-Day delivery (+100%)' },
];

// ─── Slug mapping (URL slugs → DB vertical slugs) ───────────────
const SLUG_MAP = {
    'conventions': 'conventions',
    'convention-videography': 'conventions',
    'weddings': 'weddings',
    'wedding-films': 'weddings',
    'social-media': 'social-media',
    'social-media-content': 'social-media',
    'restaurants': 'restaurants',
    'restaurant-video': 'restaurants',
};

// ─── Component ───────────────────────────────────────────────────

function TenantQuotePageInner() {
    const params = useParams();
    const searchParams = useSearchParams();
    const tenantSlug = params.tenant;
    const requestedVertical = searchParams.get('v');

    const [loading, setLoading] = useState(true);
    const [tenant, setTenant] = useState(null);
    const [rateCards, setRateCards] = useState({});
    const [activeVertical, setActiveVertical] = useState('');

    // Form State
    const [clientName, setClientName] = useState('');
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [editorTier, setEditorTier] = useState('standard');
    const [turnaround, setTurnaround] = useState('standard');
    const [days, setDays] = useState([{ date: getLocalDateString(0), hours: 8, operators: 2 }]);
    const [deliverables, setDeliverables] = useState({});
    const [addOns, setAddOns] = useState({});
    const [parking, setParking] = useState(true);
    const [coi, setCoi] = useState(true);
    const [travelFee, setTravelFee] = useState(false);

    // Quote result
    const [quoteResult, setQuoteResult] = useState(null);
    const [generating, setGenerating] = useState(false);

    // ─── Load Rates ──────────────────────────────────────────────
    useEffect(() => {
        fetch(`/api/${tenantSlug}/rates`)
            .then(r => r.json())
            .then(data => {
                setTenant(data.tenant);
                setRateCards(data.rateCards || {});
                const verticals = Object.keys(data.rateCards || {});

                // Match ?v= param to a vertical slug
                if (requestedVertical && verticals.length > 0) {
                    const mapped = SLUG_MAP[requestedVertical] || requestedVertical;
                    const match = verticals.find(v =>
                        v === mapped ||
                        v.toLowerCase().includes(mapped.toLowerCase()) ||
                        mapped.toLowerCase().includes(v.toLowerCase())
                    );
                    setActiveVertical(match || verticals[0]);
                } else if (verticals.length > 0) {
                    setActiveVertical(verticals[0]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [tenantSlug, requestedVertical]);

    const rc = rateCards[activeVertical] || {};
    const services = rc.services || [];
    const rcAddOns = rc.addOns || [];
    const editorRates = (svc) => editorTier === 'senior' ? svc.senior : svc.standard;

    // ─── Day Management ──────────────────────────────────────────
    const addDay = () => {
        setDays(prev => [...prev, { date: getLocalDateString(prev.length), hours: 8, operators: 2 }]);
    };
    const removeDay = (idx) => {
        setDays(prev => prev.filter((_, i) => i !== idx));
    };
    const updateDay = (idx, field, value) => {
        setDays(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));
    };

    // ─── Deliverable Management ──────────────────────────────────
    const toggleDeliverable = (slug) => {
        setDeliverables(prev => ({ ...prev, [slug]: !prev[slug] }));
    };
    const setDeliverableQty = (slug, qty) => {
        setDeliverables(prev => ({ ...prev, [slug]: Math.max(0, qty) }));
    };

    // ─── Add-On Management ───────────────────────────────────────
    const toggleAddOn = (slug) => {
        setAddOns(prev => ({ ...prev, [slug]: !prev[slug] }));
    };
    const setAddOnQty = (slug, qty) => {
        setAddOns(prev => ({ ...prev, [slug]: Math.max(0, qty) }));
    };

    // ─── Local Calculation ───────────────────────────────────────
    const localCalc = useCallback(() => {
        if (!rc.coverage) return { lineItems: [], coverageTotal: 0, deliverablesTotal: 0, turnaroundFee: 0, addOnsTotal: 0, logisticsTotal: 0, total: 0 };

        const lineItems = [];
        let coverageTotal = 0, deliverablesTotal = 0, turnaroundFee = 0, addOnsTotal = 0, logisticsTotal = 0;

        // Coverage
        days.forEach((day, i) => {
            const hours = day.hours || 8;
            const operators = day.operators || 1;
            let unitPrice;
            if (hours <= 4) unitPrice = rc.coverage.halfDay;
            else if (hours <= 8) unitPrice = rc.coverage.fullDay;
            else unitPrice = rc.coverage.fullDay + (hours - 8) * rc.coverage.overtime;
            const total = unitPrice * operators;
            coverageTotal += total;
            let tier = hours <= 4 ? 'Half-Day' : 'Full-Day';
            let desc = `Day ${i + 1}`;
            if (day.date) desc += ` (${day.date})`;
            desc += ` — ${tier}, ${hours}h`;
            if (hours > 8) desc += ` (incl. ${hours - 8}h OT)`;
            lineItems.push({ category: 'Coverage', description: desc, qty: operators, total });
        });

        // Deliverables
        services.forEach(svc => {
            const val = deliverables[svc.slug];
            const price = editorRates(svc);

            if (svc.mode === 'boolean' && val) {
                lineItems.push({ category: 'Editing', description: `${svc.name} [${editorTier === 'senior' ? 'Senior' : 'Standard'}]`, qty: 1, total: price });
                deliverablesTotal += price;

                const mult = (rc.turnaround?.[turnaround] || 0) / 100;
                if (mult > 0) {
                    const fee = Math.round(price * mult);
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[turnaround]} — ${svc.name.split(' (')[0]} (+${Math.round(mult * 100)}%)`, qty: 1, total: fee });
                    turnaroundFee += fee;
                }
            } else if (svc.mode === 'quantity' && typeof val === 'number' && val > 0) {
                const total = price * val;
                lineItems.push({ category: 'Editing', description: `${svc.name} [${editorTier === 'senior' ? 'Senior' : 'Standard'}]`, qty: val, total });
                deliverablesTotal += total;

                const mult = (rc.turnaround?.[turnaround] || 0) / 100;
                if (mult > 0) {
                    const fee = Math.round(total * mult);
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[turnaround]} — ${svc.name.split(' (')[0]}`, qty: 1, total: fee });
                    turnaroundFee += fee;
                }
            }
        });

        // Add-Ons
        rcAddOns.forEach(addon => {
            const val = addOns[addon.slug];
            let count = 0;
            if (addon.unitType === 'hour' && typeof val === 'number') count = val;
            else if (val === true) count = days.length;
            if (count > 0) {
                const t = addon.pricePerUnit * count;
                lineItems.push({ category: 'Add-On', description: addon.name, qty: count, total: t });
                addOnsTotal += t;
            }
        });

        // Logistics
        const dayCount = days.length || 1;
        if (parking && rc.logistics?.parking) {
            const t = rc.logistics.parking * dayCount;
            lineItems.push({ category: 'Logistics', description: 'Venue Parking', qty: dayCount, total: t });
            logisticsTotal += t;
        }
        if (coi && rc.logistics?.coi) {
            lineItems.push({ category: 'Logistics', description: 'COI Admin Fee', qty: 1, total: rc.logistics.coi });
            logisticsTotal += rc.logistics.coi;
        }
        if (travelFee && rc.logistics?.travel) {
            lineItems.push({ category: 'Logistics', description: 'Travel Fee', qty: 1, total: rc.logistics.travel });
            logisticsTotal += rc.logistics.travel;
        }

        const total = coverageTotal + deliverablesTotal + turnaroundFee + addOnsTotal + logisticsTotal;
        return { lineItems, coverageTotal, deliverablesTotal, turnaroundFee, addOnsTotal, logisticsTotal, total };
    }, [rc, days, deliverables, addOns, editorTier, turnaround, parking, coi, travelFee, services, rcAddOns]);

    const calc = localCalc();

    // ─── Generate Quote (API) ────────────────────────────────────
    const handleGenerate = async () => {
        setGenerating(true);
        const requestBody = {
            vertical: activeVertical,
            clientName, eventName, location, editorTier, turnaround, days,
            deliverables: buildDeliverablesPayload(),
            addOns: buildAddOnsPayload(),
            parking, coi, travelFee,
        };

        try {
            const res = await fetch(`/api/${tenantSlug}/quote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            const data = await res.json();
            setQuoteResult(data);
        } catch (err) {
            console.error('Quote error:', err);
        }
        setGenerating(false);
    };

    const handleDownloadPDF = async () => {
        const requestBody = {
            vertical: activeVertical,
            clientName, eventName, location, editorTier, turnaround, days,
            deliverables: buildDeliverablesPayload(),
            addOns: buildAddOnsPayload(),
            parking, coi, travelFee,
        };

        try {
            const res = await fetch(`/api/${tenantSlug}/quote/pdf`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Quote-${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF error:', err);
        }
    };

    function buildDeliverablesPayload() {
        const out = {};
        services.forEach(svc => {
            const val = deliverables[svc.slug];
            if (svc.mode === 'boolean') out[svc.slug] = !!val;
            else if (svc.mode === 'quantity') out[svc.slug] = typeof val === 'number' ? val : 0;
        });
        return out;
    }

    function buildAddOnsPayload() {
        const out = {};
        rcAddOns.forEach(addon => {
            const val = addOns[addon.slug];
            if (addon.unitType === 'hour') out[addon.slug] = typeof val === 'number' ? val : 0;
            else out[addon.slug] = !!val;
        });
        return out;
    }

    // ─── Render ──────────────────────────────────────────────────

    if (loading) return <div className="loading">Loading...</div>;
    if (!tenant) return <div className="loading">Tenant not found</div>;

    const verticalSlugs = Object.keys(rateCards);

    return (
        <div className="app-root" style={{ '--brand': tenant.colorPrimary }}>

            {/* Header */}
            <header className="site-header">
                <div className="header-inner">
                    <a href="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="brand-icon">🎬</span>
                        <span className="brand-name">{tenant.name}</span>
                    </a>
                    <span className="header-tagline">Quote Builder</span>
                </div>
            </header>

            {/* Vertical Tabs */}
            {verticalSlugs.length > 1 && (
                <nav className="vertical-tabs">
                    {verticalSlugs.map(slug => (
                        <button
                            key={slug}
                            className={`vtab ${slug === activeVertical ? 'vtab-active' : ''}`}
                            onClick={() => { setActiveVertical(slug); setDeliverables({}); setAddOns({}); }}
                        >
                            <span className="vtab-icon">{rateCards[slug].icon}</span>
                            <span className="vtab-name">{rateCards[slug].name}</span>
                        </button>
                    ))}
                </nav>
            )}

            <main className="layout">

                {/* ─── Form Panel ─── */}
                <section className="form-panel">

                    {/* Step 1: Client Details */}
                    <div className="card">
                        <div className="step-indicator">
                            <span className="step-number">1</span>
                            <div><h2 className="card-title">Client Details</h2><p className="card-subtitle">Who is this quote for?</p></div>
                        </div>
                        <div className="field-group">
                            <div className="field-row-2">
                                <div className="field">
                                    <label>Company Name</label>
                                    <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Acme Corp" />
                                </div>
                                <div className="field">
                                    <label>Event Name</label>
                                    <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="e.g. TechConnect 2026" />
                                </div>
                            </div>
                            <div className="field">
                                <label>Location</label>
                                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Convention Center" />
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Coverage Days */}
                    <div className="card">
                        <div className="step-indicator">
                            <span className="step-number">2</span>
                            <div className="step-header-content"><h2 className="card-title">Coverage Days</h2><p className="card-subtitle">How many days of filming?</p></div>
                            <button type="button" className="btn-sm" onClick={addDay}>+ Add Day</button>
                        </div>
                        {days.map((day, idx) => (
                            <div key={idx} className="day-row">
                                <div className="field">
                                    <span className="day-label">Day {idx + 1}</span>
                                    <label>Date</label>
                                    <input type="date" value={day.date} onChange={e => updateDay(idx, 'date', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Hours</label>
                                    <select value={day.hours} onChange={e => updateDay(idx, 'hours', parseInt(e.target.value))}>
                                        {[2, 4, 6, 8, 10, 12, 14].map(h => <option key={h} value={h}>{h}h</option>)}
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Operators</label>
                                    <select value={day.operators} onChange={e => updateDay(idx, 'operators', parseInt(e.target.value))}>
                                        {[1, 2, 3, 4, 5, 6].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                </div>
                                <button type="button" className="remove-day" onClick={() => removeDay(idx)}>×</button>
                            </div>
                        ))}
                    </div>

                    {/* Step 3: Editing & Deliverables */}
                    <div className="card card-editing">
                        <div className="step-indicator">
                            <span className="step-number step-number-editing">3</span>
                            <div><h2 className="card-title">Editing & Post-Production</h2><p className="card-subtitle">Choose your editor level and deliverables</p></div>
                        </div>

                        <div className="tier-selector">
                            <div className="tier-option">
                                <input type="radio" name="editorTier" id="tierStandard" value="standard" checked={editorTier === 'standard'} onChange={() => setEditorTier('standard')} />
                                <label htmlFor="tierStandard" className="tier-label">
                                    <span className="tier-icon">🎞️</span>
                                    <span className="tier-name">Standard Editor</span>
                                    <span className="tier-desc">~5 yrs experience</span>
                                </label>
                            </div>
                            <div className="tier-option">
                                <input type="radio" name="editorTier" id="tierSenior" value="senior" checked={editorTier === 'senior'} onChange={() => setEditorTier('senior')} />
                                <label htmlFor="tierSenior" className="tier-label">
                                    <span className="tier-icon">🎬</span>
                                    <span className="tier-name">Senior Editor</span>
                                    <span className="tier-desc">10+ yrs experience</span>
                                </label>
                            </div>
                        </div>

                        <div className="field turnaround-field">
                            <label>⏱ Turnaround Speed</label>
                            <select value={turnaround} onChange={e => setTurnaround(e.target.value)}>
                                {TURNAROUND_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>

                        <div className="deliverables-section">
                            {services.filter(s => s.category === 'deliverable').map(svc => (
                                <div key={svc.slug} className="toggle-row">
                                    <div className="toggle-info">
                                        <span className="toggle-label">{svc.name}</span>
                                        <span className="toggle-price">{fmt(editorRates(svc))}</span>
                                    </div>
                                    {svc.mode === 'boolean' ? (
                                        <label className="switch">
                                            <input type="checkbox" checked={!!deliverables[svc.slug]} onChange={() => toggleDeliverable(svc.slug)} />
                                            <span className="slider"></span>
                                        </label>
                                    ) : (
                                        <div className="stepper">
                                            <button type="button" className="stepper-btn" onClick={() => setDeliverableQty(svc.slug, (deliverables[svc.slug] || 0) - 1)}>−</button>
                                            <span className="stepper-value">{deliverables[svc.slug] || 0}</span>
                                            <button type="button" className="stepper-btn" onClick={() => setDeliverableQty(svc.slug, (deliverables[svc.slug] || 0) + 1)}>+</button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {services.filter(s => s.category === 'footage').length > 0 && (
                                <h3 className="section-subtitle">📂 Footage</h3>
                            )}
                            {services.filter(s => s.category === 'footage').map(svc => (
                                <div key={svc.slug} className="toggle-row">
                                    <div className="toggle-info">
                                        <span className="toggle-label">{svc.name}</span>
                                        <span className="toggle-price">{fmt(editorRates(svc))}{svc.mode === 'quantity' ? ' / session' : ''}</span>
                                    </div>
                                    {svc.mode === 'boolean' ? (
                                        <label className="switch">
                                            <input type="checkbox" checked={!!deliverables[svc.slug]} onChange={() => toggleDeliverable(svc.slug)} />
                                            <span className="slider"></span>
                                        </label>
                                    ) : (
                                        <div className="stepper">
                                            <button type="button" className="stepper-btn" onClick={() => setDeliverableQty(svc.slug, (deliverables[svc.slug] || 0) - 1)}>−</button>
                                            <span className="stepper-value">{deliverables[svc.slug] || 0}</span>
                                            <button type="button" className="stepper-btn" onClick={() => setDeliverableQty(svc.slug, (deliverables[svc.slug] || 0) + 1)}>+</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 4: Add-Ons */}
                    <div className="card card-premium">
                        <div className="step-indicator">
                            <span className="step-number step-number-premium">4</span>
                            <div><h2 className="card-title">Premium Add-Ons</h2><p className="card-subtitle">Enhance your production</p></div>
                        </div>
                        {rcAddOns.map(addon => (
                            <div key={addon.slug} className="toggle-row">
                                <div className="toggle-info">
                                    <span className="toggle-label">{addon.name}</span>
                                    <span className="toggle-price">{fmt(addon.pricePerUnit)} / {addon.unitType}</span>
                                </div>
                                {addon.unitType === 'hour' ? (
                                    <div className="stepper">
                                        <button type="button" className="stepper-btn" onClick={() => setAddOnQty(addon.slug, (addOns[addon.slug] || 0) - 1)}>−</button>
                                        <span className="stepper-value">{addOns[addon.slug] || 0}</span>
                                        <button type="button" className="stepper-btn" onClick={() => setAddOnQty(addon.slug, (addOns[addon.slug] || 0) + 1)}>+</button>
                                    </div>
                                ) : (
                                    <label className="switch">
                                        <input type="checkbox" checked={!!addOns[addon.slug]} onChange={() => toggleAddOn(addon.slug)} />
                                        <span className="slider"></span>
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 5: Logistics */}
                    <div className="card">
                        <div className="step-indicator">
                            <span className="step-number">5</span>
                            <div><h2 className="card-title">Logistics & Extras</h2><p className="card-subtitle">Fees and on-site requirements</p></div>
                        </div>
                        <div className="toggle-row">
                            <div className="toggle-info"><span className="toggle-label">Venue Load-in & Parking</span><span className="toggle-price">{fmt(rc.logistics?.parking)} / day</span></div>
                            <label className="switch"><input type="checkbox" checked={parking} onChange={() => setParking(!parking)} /><span className="slider"></span></label>
                        </div>
                        <div className="toggle-row">
                            <div className="toggle-info"><span className="toggle-label">Certificate of Insurance (COI)</span><span className="toggle-price">{fmt(rc.logistics?.coi)} / quote</span></div>
                            <label className="switch"><input type="checkbox" checked={coi} onChange={() => setCoi(!coi)} /><span className="slider"></span></label>
                        </div>
                        <div className="toggle-row">
                            <div className="toggle-info"><span className="toggle-label">🚗 Travel Fee (Outside Metro)</span><span className="toggle-price">{fmt(rc.logistics?.travel)} / trip</span></div>
                            <label className="switch"><input type="checkbox" checked={travelFee} onChange={() => setTravelFee(!travelFee)} /><span className="slider"></span></label>
                        </div>
                    </div>
                </section>

                {/* ─── Quote Panel (Sticky) ─── */}
                <aside className="quote-panel">
                    <div className="quote-card">
                        <h2 className="quote-title">Quote Summary</h2>

                        <div className="quote-badges">
                            <span className={`badge badge-editor ${editorTier === 'senior' ? 'badge-senior' : ''}`}>{editorTier === 'senior' ? 'Senior Editor' : 'Standard Editor'}</span>
                            <span className={`badge badge-turnaround ${turnaround !== 'standard' ? 'badge-active' : ''}`}>{TURNAROUND_SHORT[turnaround]}</span>
                        </div>

                        <div className="quote-lines">
                            {calc.lineItems.length === 0 ? (
                                <p className="empty-state">Configure your project to see the breakdown.</p>
                            ) : (
                                calc.lineItems.map((item, i) => (
                                    <div key={i} className="line-item">
                                        <div className="line-desc">
                                            <span className="line-cat">{item.category}</span><br />
                                            {item.description}
                                            {item.qty > 1 && <span style={{ opacity: 0.5 }}> ×{item.qty}</span>}
                                        </div>
                                        <span className="line-amount">{fmt(item.total)}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="quote-totals">
                            <div className="total-row"><span>Coverage</span><span>{fmt(calc.coverageTotal)}</span></div>
                            <div className="total-row"><span>Editing</span><span>{fmt(calc.deliverablesTotal)}</span></div>
                            {calc.turnaroundFee > 0 && <div className="total-row turnaround-total"><span>Turnaround Fees</span><span>{fmt(calc.turnaroundFee)}</span></div>}
                            {calc.addOnsTotal > 0 && <div className="total-row addon-total"><span>Add-Ons</span><span>{fmt(calc.addOnsTotal)}</span></div>}
                            <div className="total-row"><span>Logistics</span><span>{fmt(calc.logisticsTotal)}</span></div>
                            <div className="total-row grand-total"><span>Total</span><span>{fmt(calc.total)}</span></div>
                        </div>

                        <button type="button" className="btn-primary" onClick={handleGenerate} disabled={generating}>
                            <span className="btn-icon">{generating ? '⏳' : '⚡'}</span> {generating ? 'Generating...' : 'Generate Quote'}
                        </button>

                        {quoteResult && (
                            <>
                                <button type="button" className="btn-pdf" onClick={handleDownloadPDF}>
                                    <span className="btn-icon">📄</span> Download PDF Quote
                                </button>
                                <div className="quote-result">
                                    <div className="result-header">
                                        <span className="result-badge">Quote Generated</span>
                                        <span className="quote-id">{quoteResult.quoteId}</span>
                                    </div>
                                    <pre className="quote-json">{JSON.stringify(quoteResult, null, 2)}</pre>
                                </div>
                            </>
                        )}
                    </div>
                </aside>
            </main>

            <footer className="site-footer">
                <p>© 2026 {tenant.name} — Powered by VideoQuoter</p>
            </footer>
        </div>
    );
}

// Wrap in Suspense for useSearchParams
export default function TenantQuotePage() {
    return (
        <Suspense fallback={<div className="loading">Loading...</div>}>
            <TenantQuotePageInner />
        </Suspense>
    );
}
