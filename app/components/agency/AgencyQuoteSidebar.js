'use client';

import { useAgencyQuote } from '../../context/AgencyQuoteContext';

const fmt = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function AgencyQuoteSidebar() {
    const {
        calc, markupType, markupValue, clientName, businessType
    } = useAgencyQuote();

    const hasItems = (calc.subtotal || 0) > 0;

    const copyToClipboard = () => {
        const lines = [];
        if (clientName) lines.push(`Client: ${clientName}`);
        if (businessType) lines.push(`Business: ${businessType}`);
        lines.push('');
        lines.push('--- Line Items ---');
        calc.lineItems.forEach(item => {
            lines.push(`${item.description}: ${fmt(item.total)}${item.qty > 1 ? ` (×${item.qty})` : ''}`);
        });
        lines.push('');
        lines.push(`Production Subtotal: ${fmt(calc.subtotal)}`);
        if (calc.markupAmount > 0) {
            const label = markupType === 'percentage' ? `Markup (${markupValue}%)` : 'Markup (Fixed)';
            lines.push(`${label}: ${fmt(calc.markupAmount)}`);
        }
        lines.push(`Client Total: ${fmt(calc.clientTotal)}`);
        lines.push('');
        lines.push('* This is a rough estimate. Final pricing may vary based on project scope and requirements.');

        navigator.clipboard.writeText(lines.join('\n')).then(() => {
            // Brief visual feedback
            const btn = document.getElementById('agency-copy-btn');
            if (btn) {
                const original = btn.textContent;
                btn.textContent = '✓ Copied!';
                setTimeout(() => { btn.textContent = original; }, 1500);
            }
        });
    };

    return (
        <aside className="quote-panel agency-quote-panel">
            <div className="quote-card agency-quote-card">
                <div className="agency-sidebar-badge">
                    <span className="agency-badge-icon">🔒</span>
                    <span>Agency View</span>
                </div>

                <h2 className="quote-title">Quote Estimate</h2>

                {!hasItems ? (
                    <div className="empty-quote-state">
                        <div className="empty-icon">🤝</div>
                        <p className="empty-heading">Build your estimate</p>
                        <p className="empty-sub">Add production days, select deliverables, and choose crew to start building the quote.</p>
                    </div>
                ) : (
                    <>
                        {/* Line item breakdown */}
                        <div className="agency-line-items">
                            {calc.lineItems.map((item, idx) => (
                                <div key={idx} className={`agency-line-row ${item.category === 'Turnaround' ? 'agency-line-turnaround' : ''}`}>
                                    <div className="agency-line-desc">
                                        <span className="agency-line-category">{item.category}</span>
                                        <span className="agency-line-name">{item.description}</span>
                                    </div>
                                    <div className="agency-line-numbers">
                                        {item.qty > 1 && <span className="agency-line-qty">×{item.qty}</span>}
                                        <span className="agency-line-total">{fmt(item.total)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Subtotals */}
                        <div className="agency-subtotals">
                            {calc.coverageTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">📹 Coverage & Crew</span>
                                    <span className="summary-value">{fmt(calc.coverageTotal)}</span>
                                </div>
                            )}
                            {calc.deliverablesTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">🎬 Deliverables & Post</span>
                                    <span className="summary-value">{fmt(calc.deliverablesTotal)}</span>
                                </div>
                            )}
                            {calc.addOnsTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">👥 Crew & Equipment</span>
                                    <span className="summary-value">{fmt(calc.addOnsTotal)}</span>
                                </div>
                            )}
                            {calc.logisticsTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">🚗 Logistics</span>
                                    <span className="summary-value">{fmt(calc.logisticsTotal)}</span>
                                </div>
                            )}
                            {calc.turnaroundFee > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">⚡ Rush Delivery</span>
                                    <span className="summary-value">{fmt(calc.turnaroundFee)}</span>
                                </div>
                            )}
                        </div>

                        {/* Production subtotal */}
                        <div className="agency-subtotal-row">
                            <span>Production Subtotal</span>
                            <span className="agency-subtotal-amount">{fmt(calc.subtotal)}</span>
                        </div>

                        {/* Markup */}
                        {calc.markupAmount > 0 && (
                            <div className="agency-markup-row">
                                <span>
                                    {markupType === 'percentage'
                                        ? `Agency Markup (${markupValue}%)`
                                        : 'Agency Markup (Fixed)'}
                                </span>
                                <span className="agency-markup-amount">+{fmt(calc.markupAmount)}</span>
                            </div>
                        )}

                        {/* Client-facing total */}
                        <div className="grand-total-box agency-grand-total">
                            <span className="grand-total-label">Client-Facing Total</span>
                            <span className="grand-total-amount">{fmt(calc.clientTotal)}</span>
                        </div>


                        {/* Copy to clipboard */}
                        <button type="button" id="agency-copy-btn" className="btn-primary agency-copy-btn" onClick={copyToClipboard}>
                            <span className="btn-icon">📋</span> Copy Quote to Clipboard
                        </button>

                        {/* Disclaimer */}
                        <p className="agency-disclaimer">
                            * This is a rough estimate based on selected parameters. Final pricing may vary based on project scope, location, and specific client requirements. All rates are MediaGeekz internal production costs.
                        </p>
                    </>
                )}
            </div>
        </aside>
    );
}
