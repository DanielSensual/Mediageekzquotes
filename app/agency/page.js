'use client';

import { Suspense } from 'react';
import { AgencyQuoteProvider } from '../context/AgencyQuoteContext';
import { AgencyQuoteForm } from '../components/agency/AgencyQuoteForm';
import { AgencyQuoteSidebar } from '../components/agency/AgencyQuoteSidebar';

function AgencyBuilderContent() {
    return (
        <div className="agency-container">
            <header className="agency-header">
                <div className="agency-brand">
                    <span className="agency-brand-icon">🎬</span>
                    <div>
                        <h1 className="agency-brand-name">
                            Media<span className="accent">Geekz</span>
                        </h1>
                        <span className="agency-header-badge">Agency Pricing Tool</span>
                    </div>
                </div>
                <div className="agency-lock-badge">
                    <span>🔒</span> Private — Internal Use Only
                </div>
            </header>

            <main className="quote-main agency-main">
                <AgencyQuoteForm />
                <AgencyQuoteSidebar />
            </main>

            <footer className="agency-footer">
                <p>© {new Date().getFullYear()} MediaGeekz — Internal Agency Pricing Tool</p>
                <p className="agency-footer-sub">All rates are confidential. Not for client distribution without markup applied.</p>
            </footer>
        </div>
    );
}

export default function AgencyPage() {
    return (
        <Suspense fallback={<div className="loading">Loading Agency Tool…</div>}>
            <AgencyQuoteProvider>
                <AgencyBuilderContent />
            </AgencyQuoteProvider>
        </Suspense>
    );
}
