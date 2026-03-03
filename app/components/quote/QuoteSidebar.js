'use client';

import { useQuote } from '../../context/QuoteContext';
import { AnimatedNumber } from './AnimatedNumber';

const fmt = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const TURNAROUND_SHORT = {
    standard: '2 Weeks', expedited: '1 Week', rush: '48 Hours', nextDay: 'Next-Day', sameDay: 'Same-Day',
};

export function QuoteSidebar() {
    const {
        editorTier, turnaround, calc, generating, handleGenerate, quoteResult, handleDownloadPDF, handleCheckout, checkoutLoading
    } = useQuote();

    return (
        <aside className="quote-panel">
            <div className="quote-card">
                <h2 className="quote-title">Quote Summary</h2>

                <div className="quote-badges">
                    <span className={`badge badge-editor ${editorTier === 'senior' ? 'badge-senior' : ''}`}>
                        {editorTier === 'senior' ? 'Senior Editor' : 'Standard Editor'}
                    </span>
                    <span className={`badge badge-turnaround ${turnaround !== 'standard' ? 'badge-active' : ''}`}>
                        {TURNAROUND_SHORT[turnaround]}
                    </span>
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
                    <div className="total-row"><span>Coverage</span><AnimatedNumber value={calc.coverageTotal} /></div>
                    <div className="total-row"><span>Editing</span><AnimatedNumber value={calc.deliverablesTotal} /></div>
                    {calc.turnaroundFee > 0 && <div className="total-row turnaround-total"><span>Turnaround Fees</span><AnimatedNumber value={calc.turnaroundFee} /></div>}
                    {calc.addOnsTotal > 0 && <div className="total-row addon-total"><span>Add-Ons</span><AnimatedNumber value={calc.addOnsTotal} /></div>}
                    <div className="total-row"><span>Logistics</span><AnimatedNumber value={calc.logisticsTotal} /></div>
                    <div className="total-row grand-total"><span>Total</span><AnimatedNumber value={calc.total} /></div>
                </div>

                <button type="button" className="btn-primary" onClick={handleGenerate} disabled={generating}>
                    <span className="btn-icon">{generating ? '⏳' : '⚡'}</span> {generating ? 'Generating...' : 'Generate Quote'}
                </button>

                {quoteResult && (
                    <>
                        <button type="button" className="btn-primary" style={{ marginTop: '12px', background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={() => handleCheckout(quoteResult.quoteId)} disabled={checkoutLoading}>
                            <span className="btn-icon">{checkoutLoading ? '💳' : '🔒'}</span> {checkoutLoading ? 'Loading Checkout...' : 'Secure Your Date (Pay Deposit)'}
                        </button>
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
    );
}
