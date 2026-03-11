'use client';

import { useAgencyQuote } from '../../context/AgencyQuoteContext';

const fmt = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TURNAROUND_OPTIONS = [
    { value: 'standard', label: 'Standard — 2 weeks (no surcharge)' },
    { value: 'expedited', label: 'Expedited — 1 week (+20%)' },
    { value: 'rush', label: 'Rush — 48 hours (+35%)' },
    { value: 'nextDay', label: 'Next-Day — 24 hours (+60%)' },
    { value: 'sameDay', label: 'Same-Day delivery (+100%)' },
];

const BUSINESS_TYPES = [
    'Restaurant / Hospitality', 'Medical / Health & Wellness', 'Real Estate',
    'E-Commerce / Retail', 'Professional Services', 'Tech / SaaS',
    'Fitness / Gym', 'Nonprofit', 'Education', 'Other'
];

export function AgencyQuoteForm() {
    const {
        clientName, setClientName, businessType, setBusinessType,
        projectDescription, setProjectDescription,
        days, addDay, updateDay, removeDay,
        turnaround, setTurnaround,
        services, deliverables, toggleDeliverable, setDeliverableQty, editorRates,
        rcAddOns, addOns, toggleAddOn, setAddOnQty,
        parking, setParking, coi, setCoi, travelFee, setTravelFee,
        markupType, setMarkupType, markupValue, setMarkupValue,
        rc, progressPct,
    } = useAgencyQuote();

    return (
        <section className="form-panel agency-form-panel">
            {/* Progress Bar */}
            <div className="progress-bar agency-progress">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>

            {/* Step 1: Project Info */}
            <div className="card">
                <div className="step-indicator">
                    <span className="step-number">1</span>
                    <div>
                        <h2 className="card-title">Project Info</h2>
                        <p className="card-subtitle">Client details & project scope</p>
                    </div>
                </div>
                <div className="field-group">
                    <div className="field-row-2">
                        <div className="field">
                            <label>Client / Business Name</label>
                            <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Acme Corp" />
                        </div>
                        <div className="field">
                            <label>Business Type</label>
                            <select value={businessType} onChange={e => setBusinessType(e.target.value)}>
                                <option value="">Select…</option>
                                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label>Project Description <span className="field-hint">(optional)</span></label>
                        <textarea value={projectDescription} onChange={e => setProjectDescription(e.target.value)} placeholder="Brief scope — e.g. 'Brand launch video + 5 social cuts for Q2 campaign'" rows={2} />
                    </div>
                </div>
            </div>

            {/* Step 2: Coverage Days */}
            <div className="card">
                <div className="step-indicator">
                    <span className="step-number">2</span>
                    <div className="step-header-content">
                        <h2 className="card-title">Base Production Days</h2>
                        <p className="card-subtitle">Includes 1 Lead Cinematographer (DP) to shoot the project</p>
                    </div>
                    <button type="button" className="btn-sm" onClick={addDay}>+ Add Day</button>
                </div>
                
                <div className="coverage-hint" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', padding: '0 5px' }}>
                    <strong>Base Rate:</strong> {fmt(rc.coverage?.fullDay)}/full day (8h), {fmt(rc.coverage?.halfDay)}/half day (4h). <br/>
                    <em>Note: This is the required base coverage. You can add a dedicated Creative Director or extra crew in Step 4.</em>
                </div>

                {days.length === 0 && (
                    <p className="empty-hint">No shoot days added. Click "+ Add Day" to start.</p>
                )}
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
                                {[2, 4, 6, 8, 10, 12, 14].map(h => <option key={h} value={h}>{h}h{h <= 4 ? ' (half)' : h <= 8 ? ' (full)' : ' (OT)'}</option>)}
                            </select>
                        </div>
                        <button type="button" className="remove-day" onClick={() => removeDay(idx)}>×</button>
                    </div>
                ))}
            </div>

            {/* Step 3: Deliverables */}
            <div className="card card-editing">
                <div className="step-indicator">
                    <span className="step-number step-number-editing">3</span>
                    <div>
                        <h2 className="card-title">Deliverables & Post-Production</h2>
                        <p className="card-subtitle">Select project types and editing services</p>
                    </div>
                </div>

                <div className="field turnaround-field">
                    <label>⏱ Turnaround Speed</label>
                    <select value={turnaround} onChange={e => setTurnaround(e.target.value)}>
                        {TURNAROUND_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>

                <div className="deliverables-section">
                    <h3 className="section-subtitle">🎬 Project Types</h3>
                    {services.filter(s => s.category === 'deliverable').map(svc => (
                        <div key={svc.slug} className="toggle-row">
                            <div className="toggle-info">
                                <span className="toggle-label">{svc.name}</span>
                                <span className="toggle-price">{fmt(editorRates(svc))}{svc.mode === 'quantity' ? ' each' : ''}</span>
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
                                <span className="toggle-price">flat {fmt(editorRates(svc))}</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={!!deliverables[svc.slug]} onChange={() => toggleDeliverable(svc.slug)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    ))}

                    {services.filter(s => s.category === 'post').length > 0 && (
                        <h3 className="section-subtitle">🎨 Post-Production Extras</h3>
                    )}
                    {services.filter(s => s.category === 'post').map(svc => (
                        <div key={svc.slug} className="toggle-row">
                            <div className="toggle-info">
                                <span className="toggle-label">{svc.name}</span>
                                <span className="toggle-price">{fmt(editorRates(svc))}{svc.mode === 'quantity' ? ' each' : ''}</span>
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

            {/* Step 4: Crew & Equipment */}
            <div className="card card-premium">
                <div className="step-indicator">
                    <span className="step-number step-number-premium">4</span>
                    <div>
                        <h2 className="card-title">Crew & Equipment</h2>
                        <p className="card-subtitle">Additional crew roles and gear</p>
                    </div>
                </div>

                <h3 className="section-subtitle" style={{ marginBottom: '12px' }}>👥 Additional Crew</h3>
                {rcAddOns.filter(a => a.unitType !== 'hour').map(addon => (
                    <div key={addon.slug} className="toggle-row toggle-row-detailed">
                        <div className="toggle-info">
                            <span className="toggle-label">{addon.name}</span>
                            {addon.desc && <span className="toggle-desc">{addon.desc}</span>}
                            <span className="toggle-price">{fmt(addon.pricePerUnit)} / {addon.unitType}</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={!!addOns[addon.slug]} onChange={() => toggleAddOn(addon.slug)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}

                <h3 className="section-subtitle" style={{ marginTop: '20px', marginBottom: '12px' }}>📷 Equipment</h3>
                {rcAddOns.filter(a => a.unitType === 'hour').map(addon => (
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
                    <div>
                        <h2 className="card-title">Logistics & Extras</h2>
                        <p className="card-subtitle">Fees and on-site requirements</p>
                    </div>
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

            {/* Step 6: Agency Markup */}
            <div className="card agency-markup-card">
                <div className="step-indicator">
                    <span className="step-number agency-step-markup">6</span>
                    <div>
                        <h2 className="card-title agency-markup-title">Client Markup</h2>
                        <p className="card-subtitle">Add your agency margin to the client-facing price</p>
                    </div>
                </div>

                <div className="markup-controls">
                    <div className="markup-type-toggle">
                        <button type="button" className={`markup-type-btn ${markupType === 'percentage' ? 'markup-type-active' : ''}`} onClick={() => setMarkupType('percentage')}>
                            % Percentage
                        </button>
                        <button type="button" className={`markup-type-btn ${markupType === 'fixed' ? 'markup-type-active' : ''}`} onClick={() => setMarkupType('fixed')}>
                            $ Fixed
                        </button>
                    </div>

                    {markupType === 'percentage' && (
                        <div className="markup-presets">
                            {[
                                { label: 'Pass-Through', value: 10, desc: 'minimal handling' },
                                { label: 'Managed', value: 20, desc: 'vendor management' },
                                { label: 'White-Label', value: 25, desc: 'fully managed' },
                                { label: 'Strategy-Led', value: 35, desc: 'strategy + risk' },
                            ].map(preset => (
                                <button
                                    key={preset.value}
                                    type="button"
                                    className={`markup-preset-btn ${markupValue === preset.value ? 'markup-preset-active' : ''}`}
                                    onClick={() => setMarkupValue(preset.value)}
                                >
                                    <span className="preset-pct">{preset.value}%</span>
                                    <span className="preset-label">{preset.label}</span>
                                    <span className="preset-desc">{preset.desc}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="markup-input-row">
                        <div className="markup-slider-group">
                            {markupType === 'percentage' ? (
                                <>
                                    <input type="range" min="0" max="100" step="5" value={markupValue} onChange={e => setMarkupValue(parseInt(e.target.value))} className="markup-range" />
                                    <div className="markup-display">{markupValue}%</div>
                                </>
                            ) : (
                                <div className="field" style={{ margin: 0, flex: 1 }}>
                                    <input type="number" min="0" step="100" value={markupValue} onChange={e => setMarkupValue(parseInt(e.target.value) || 0)} placeholder="e.g. 1500" className="markup-fixed-input" />
                                </div>
                            )}
                        </div>
                    </div>

                    {markupType === 'percentage' && markupValue > 0 && (
                        <div className="markup-margin-note">
                            Effective margin: {(markupValue / (100 + markupValue) * 100).toFixed(1)}%
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
