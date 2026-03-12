'use client';

import { useState, useEffect } from 'react';
import { useQuote } from '../../context/QuoteContext';
import { AnimatedNumber } from './AnimatedNumber';

const fmt = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function QuoteSidebar() {
    const {
        editorTier, calc, generating, handleGenerate,
        quoteResult, quoteError, handleDownloadPDF, handleCheckout, checkoutLoading,
        selectedPackage, activeVertical, mobileInputActive
    } = useQuote();

    const [isDismissed, setIsDismissed] = useState(false);

    // Re-show sidebar when a new quote is being generated or result changes
    useEffect(() => {
        if (generating || quoteResult) {
            setIsDismissed(false);
        }
    }, [generating, quoteResult]);

    const hasItems = calc.total > 0;
    const mobileDockHidden = (activeVertical === 'weddings' && mobileInputActive) || isDismissed;
    const canCheckout = Boolean(quoteResult?.quoteId) && quoteResult?.checkoutAvailable !== false;

    return (
        <aside className={`quote-panel ${mobileDockHidden ? 'quote-panel-mobile-hidden' : ''}`}>
            <div className="quote-card">
                {/* Close Button (X) */}
                <button 
                    type="button" 
                    className="quote-card-close" 
                    onClick={() => setIsDismissed(true)}
                    aria-label="Close Summary"
                >
                    ×
                </button>

                <h2 className="quote-title">Your Investment</h2>

                {/* Package badge when a quick-pick is selected */}
                {selectedPackage && (
                    <div className="package-badge-container">
                        <span className="package-badge-name">{selectedPackage.name} Package</span>
                    </div>
                )}

                {!hasItems ? (
                    <div className="empty-quote-state">
                        <div className="empty-icon">💍</div>
                        <p className="empty-heading">Choose a package above</p>
                        <p className="empty-sub">Select a quick-pick package or customize your own to see your investment.</p>
                    </div>
                ) : (
                    <>
                        {/* Clean category summary — just 3-4 rows max */}
                        <div className="quote-summary-rows">
                            {calc.coverageTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">📹 Coverage & Crew</span>
                                    <span className="summary-value">{fmt(calc.coverageTotal)}</span>
                                </div>
                            )}
                            {calc.deliverablesTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">🎬 Editing & Deliverables</span>
                                    <span className="summary-value">{fmt(calc.deliverablesTotal)}</span>
                                </div>
                            )}
                            {calc.addOnsTotal > 0 && (
                                <div className="summary-row">
                                    <span className="summary-label">✨ Premium Add-Ons</span>
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

                        {/* Grand total — big and prominent */}
                        <div className="grand-total-box">
                            <span className="grand-total-label">Total Investment</span>
                            <span className="grand-total-amount"><AnimatedNumber value={calc.total} /></span>
                        </div>

                        {/* Editor tier badge */}
                        <div className="quote-badges">
                            <span className={`badge badge-editor ${editorTier === 'senior' ? 'badge-senior' : ''}`}>
                                {editorTier === 'senior' ? '⭐ Senior Editor' : 'Standard Editor'}
                            </span>
                        </div>
                    </>
                )}

                <button type="button" className="btn-primary" onClick={handleGenerate} disabled={generating || !hasItems}>
                    <span className="btn-icon">{generating ? '⏳' : '⚡'}</span> {generating ? 'Generating...' : 'Generate Quote'}
                </button>

                {quoteError && (
                    <p className="quote-status-error">{quoteError}</p>
                )}

                {quoteResult && (
                    <>
                        {quoteResult.notice && (
                            <p className="quote-status-note">{quoteResult.notice}</p>
                        )}
                        {canCheckout && (
                            <button type="button" className="btn-primary" style={{ marginTop: '12px', background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={() => handleCheckout(quoteResult.quoteId)} disabled={checkoutLoading}>
                                <span className="btn-icon">{checkoutLoading ? '💳' : '🔒'}</span> {checkoutLoading ? 'Loading Checkout...' : 'Secure Your Date (Pay Deposit)'}
                            </button>
                        )}
                        <button type="button" className="btn-pdf" onClick={handleDownloadPDF}>
                            <span className="btn-icon">📄</span> Download PDF Quote
                        </button>
                    </>
                )}
            </div>
            
            {/* Re-open Button when dismissed */}
            {isDismissed && (
                <button 
                    type="button" 
                    className="quote-reopen-btn" 
                    onClick={() => setIsDismissed(false)}
                >
                    <span className="btn-icon">💰</span> Show Investment
                </button>
            )}
        </aside>
    );
}
