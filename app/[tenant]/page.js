'use client';

import { Suspense, useEffect } from 'react';
import { QuoteProvider, useQuote } from '../context/QuoteContext';
import { QuoteTabs } from '../components/quote/QuoteTabs';
import { QuoteForm } from '../components/quote/QuoteForm';
import { QuoteSidebar } from '../components/quote/QuoteSidebar';

import { useSearchParams } from 'next/navigation';

function QuoteBuilderContent() {
    const { loading, tenant } = useQuote();
    const searchParams = useSearchParams();
    const isSuccess = searchParams?.get('success') === 'true';
    const isCanceled = searchParams?.get('canceled') === 'true';

    // Apply tenant background color to body for white-themed tenants
    useEffect(() => {
        if (tenant?.colorBg) {
            const originalBg = document.body.style.background;
            document.body.style.background = tenant.colorBg;
            return () => { document.body.style.background = originalBg; };
        }
    }, [tenant]);

    if (loading) {
        return (
            <div className="quote-builder-container">
                <header className="tenant-header">
                    <div className="loading">Loading Rate Cards...</div>
                </header>
            </div>
        );
    }

    if (!tenant) {
        return (
            <div className="quote-builder-container">
                <header className="tenant-header">
                    <div className="tenant-warning">⚠️ Service Unavailable</div>
                </header>
            </div>
        );
    }

    return (
        <div className="quote-builder-container" style={{
            '--color-primary': tenant.colorPrimary,
            '--color-bg': tenant.colorBg,
            '--font-family': tenant.fontFamily
        }}>
            <header className="tenant-header">
                {tenant.logoUrl ? (
                    <img src={tenant.logoUrl} alt={tenant.name} className="tenant-logo" />
                ) : (
                    <h1 className="tenant-name">{tenant.name}</h1>
                )}
            </header>

            {isSuccess && (
                <div className="payment-alert success">
                    <span className="alert-icon">🎉</span>
                    <div>
                        <strong>Payment Successful!</strong>
                        <p>Your deposit has been secured. We will be in touch shortly.</p>
                    </div>
                </div>
            )}

            {isCanceled && (
                <div className="payment-alert canceled">
                    <span className="alert-icon">⚠️</span>
                    <div>
                        <strong>Payment Canceled</strong>
                        <p>Your checkout session was canceled. Your quote is still saved.</p>
                    </div>
                </div>
            )}

            <QuoteTabs />

            <main className="quote-main">
                <QuoteForm />
                <QuoteSidebar />
            </main>

            <footer className="site-footer">
                <p>© {new Date().getFullYear()} {tenant.name} — Powered by VideoQuoter</p>
            </footer>
        </div>
    );
}

export default function TenantQuotePage() {
    return (
        <Suspense fallback={<div className="loading">Loading...</div>}>
            <QuoteProvider>
                <QuoteBuilderContent />
            </QuoteProvider>
        </Suspense>
    );
}
