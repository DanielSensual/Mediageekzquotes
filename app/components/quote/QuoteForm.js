'use client';

import { useEffect } from 'react';
import { useQuote } from '../../context/QuoteContext';
import { WeddingPackageSelector } from './WeddingPackageSelector';

const fmt = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TURNAROUND_OPTIONS = [
    { value: 'standard', label: 'Standard — 2 weeks (no surcharge)' },
    { value: 'expedited', label: 'Expedited — 1 week (+20%)' },
    { value: 'rush', label: 'Rush — 48 hours (+35%)' },
    { value: 'nextDay', label: 'Next-Day — 24 hours (+60%)' },
    { value: 'sameDay', label: 'Same-Day delivery (+100%)' },
];

import { motion, AnimatePresence } from 'framer-motion';

export function QuoteForm() {
    const {
        progressPct, activeVertical,
        clientName, setClientName, email, setEmail, eventName, setEventName, location, setLocation,
        days, addDay, updateDay, removeDay,
        editorTier, setEditorTier, turnaround, setTurnaround,
        services, deliverables, toggleDeliverable, setDeliverableQty, editorRates,
        rcAddOns, addOns, toggleAddOn, setAddOnQty,
        parking, setParking, coi, setCoi, travelFee, setTravelFee, rc,
        setMobileInputActive
    } = useQuote();

    useEffect(() => {
        if (activeVertical !== 'weddings') {
            setMobileInputActive(false);
        }

        return () => setMobileInputActive(false);
    }, [activeVertical, setMobileInputActive]);

    const syncMobileInputState = () => {
        if (typeof window === 'undefined') return;

        if (window.innerWidth > 900 || activeVertical !== 'weddings') {
            setMobileInputActive(false);
            return;
        }

        const activeEl = document.activeElement;
        const tag = activeEl?.tagName;
        const type = activeEl?.getAttribute?.('type');
        const isEditableField = tag === 'TEXTAREA'
            || tag === 'SELECT'
            || (tag === 'INPUT' && !['checkbox', 'radio', 'range', 'button', 'submit'].includes(type || 'text'));

        setMobileInputActive(!!isEditableField);
    };

    return (
        <section
            className="form-panel"
            onFocusCapture={syncMobileInputState}
            onBlurCapture={() => requestAnimationFrame(syncMobileInputState)}
        >
            {/* Progress Bar */}
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeVertical}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="form-content-wrapper"
                >
                    {/* Quick-Pick Packages (wedding only) */}
                    <WeddingPackageSelector />

                    {/* Step 1: Client Details */}
                    <div className="card">
                        <div className="step-indicator">
                            <span className="step-number">1</span>
                            <div><h2 className="card-title">{activeVertical === 'weddings' ? 'Couple Details' : 'Client Details'}</h2><p className="card-subtitle">{activeVertical === 'weddings' ? 'Tell us about the happy couple' : 'Who is this quote for?'}</p></div>
                        </div>
                        <div className="field-group">
                            <div className="field-row-2">
                                <div className="field">
                                    <label>{activeVertical === 'weddings' ? "Bride's Name" : 'Company/Client Name'}</label>
                                    <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder={activeVertical === 'weddings' ? 'e.g. Sarah' : 'e.g. Acme Corp'} />
                                </div>
                                <div className="field">
                                    <label>{activeVertical === 'weddings' ? "Groom's Name" : 'Email Address'}</label>
                                    <input type={activeVertical === 'weddings' ? 'text' : 'email'} value={activeVertical === 'weddings' ? eventName : email} onChange={e => activeVertical === 'weddings' ? setEventName(e.target.value) : setEmail(e.target.value)} placeholder={activeVertical === 'weddings' ? 'e.g. Michael' : 'e.g. hello@example.com'} />
                                </div>
                            </div>
                            <div className="field-row-2">
                                <div className="field">
                                    <label>{activeVertical === 'weddings' ? 'Email Address' : 'Event Name'}</label>
                                    <input type={activeVertical === 'weddings' ? 'email' : 'text'} value={activeVertical === 'weddings' ? email : eventName} onChange={e => activeVertical === 'weddings' ? setEmail(e.target.value) : setEventName(e.target.value)} placeholder={activeVertical === 'weddings' ? 'e.g. sarah@email.com' : 'e.g. TechConnect 2026'} />
                                </div>
                                <div className="field">
                                    <label>{activeVertical === 'weddings' ? 'Venue' : 'Location'}</label>
                                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder={activeVertical === 'weddings' ? 'e.g. The Grand Ballroom, Orlando' : 'e.g. Convention Center'} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Coverage Days */}
                    <div className="card">
                        <div className="step-indicator">
                            <span className="step-number">2</span>
                            <div className="step-header-content">
                                <h2 className="card-title">Coverage Days</h2>
                                <p className="card-subtitle">How many days of filming?</p>
                            </div>
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
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
