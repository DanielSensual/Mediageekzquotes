'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Custom Square Checkout — MediaGeekz
   Supports: Credit/Debit Card, Apple Pay
   ═══════════════════════════════════════════════════════════════ */

const APP_ID = 'sq0idp-jfkRHmpqFrCxDYy1_Yv53A';
const LOCATION_ID = 'L819F9XH8VT84';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const amount = parseFloat(searchParams.get('amount') || '0');
    const desc = searchParams.get('desc') || 'MediaGeekz — Video Production';
    const type = searchParams.get('type') || 'deposit';

    const cardRef = useRef(null);
    const applePayRef = useRef(null);
    const paymentsRef = useRef(null);
    const cardInstanceRef = useRef(null);

    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [activeTab, setActiveTab] = useState('card');
    const [applePayAvailable, setApplePayAvailable] = useState(false);

    const fmt = (n) => '$' + n.toLocaleString('en-US');

    // Load Square Web Payments SDK
    useEffect(() => {
        if (document.getElementById('square-web-sdk')) {
            setSdkLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.id = 'square-web-sdk';
        script.src = 'https://web.squarecdn.com/v1/square.js';
        script.onload = () => setSdkLoaded(true);
        script.onerror = () => setError('Failed to load Square payments SDK.');
        document.head.appendChild(script);
    }, []);

    // Initialize payment methods once SDK loads
    useEffect(() => {
        if (!sdkLoaded || !window.Square) return;

        const init = async () => {
            try {
                const payments = window.Square.payments(APP_ID, LOCATION_ID);
                paymentsRef.current = payments;

                // Card
                const card = await payments.card();
                await card.attach(cardRef.current);
                cardInstanceRef.current = card;

                // Apple Pay
                try {
                    const paymentRequest = payments.paymentRequest({
                        countryCode: 'US',
                        currencyCode: 'USD',
                        total: {
                            amount: amount.toFixed(2),
                            label: desc,
                        },
                    });
                    const applePay = await payments.applePay(paymentRequest);
                    applePayRef.current = applePay;
                    setApplePayAvailable(true);
                } catch {
                    // Apple Pay not available on this device/browser
                    setApplePayAvailable(false);
                }


            } catch (e) {
                setError('Failed to initialize payment form: ' + e.message);
            }
        };

        init();
    }, [sdkLoaded, amount, desc]);

    const processPayment = async (sourceId) => {
        setProcessing(true);
        setError(null);

        try {
            const res = await fetch('/api/square-process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sourceId,
                    amount,
                    description: desc,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.details?.[0]?.detail || data.error || 'Payment failed');
            }

            setSuccess({
                id: data.paymentId,
                receipt: data.receiptUrl,
            });
        } catch (e) {
            setError(e.message);
        } finally {
            setProcessing(false);
        }
    };

    const handleCardPayment = async () => {
        if (!cardInstanceRef.current) return;
        setProcessing(true);
        setError(null);
        try {
            const result = await cardInstanceRef.current.tokenize();
            if (result.status === 'OK') {
                await processPayment(result.token);
            } else {
                setError(result.errors?.[0]?.message || 'Card tokenization failed.');
                setProcessing(false);
            }
        } catch (e) {
            setError(e.message);
            setProcessing(false);
        }
    };



    if (amount <= 0) {
        return (
            <div className="checkout-shell">
                <div className="checkout-card">
                    <div className="checkout-error-state">Invalid payment amount.</div>
                </div>
            </div>
        );
    }

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
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { background: var(--bg); color: var(--white); font-family: 'Inter', sans-serif; }

                .checkout-shell {
                    min-height: 100vh; display: flex; align-items: center; justify-content: center;
                    padding: 40px 20px;
                    background: radial-gradient(ellipse at 50% 20%, rgba(232, 98, 44, 0.06), transparent 60%);
                }

                .checkout-card {
                    width: 100%; max-width: 480px;
                    background: var(--card); border: 1px solid var(--card-border);
                    border-radius: 20px; padding: 40px 32px;
                    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
                }

                .checkout-brand {
                    font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800;
                    letter-spacing: -0.02em; color: var(--white); text-align: center;
                }

                .checkout-sub {
                    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
                    color: var(--muted); text-align: center; margin-top: 4px;
                }

                .checkout-amount-box {
                    margin: 28px 0; padding: 20px; border-radius: 14px;
                    background: rgba(232, 98, 44, 0.04); border: 1px solid rgba(232, 98, 44, 0.12);
                    text-align: center;
                }

                .checkout-desc {
                    font-size: 12px; color: var(--muted); margin-bottom: 8px;
                }

                .checkout-amount {
                    font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 800;
                    color: var(--white);
                }

                .checkout-tabs {
                    display: flex; gap: 4px; margin-bottom: 24px;
                    background: rgba(15, 23, 42, 0.5); border-radius: 12px; padding: 4px;
                }

                .checkout-tab {
                    flex: 1; padding: 10px 12px; border: none; border-radius: 10px;
                    background: transparent; color: var(--muted); cursor: pointer;
                    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
                    transition: all 0.2s; text-align: center;
                }

                .checkout-tab.active {
                    background: rgba(232, 98, 44, 0.12); color: var(--orange);
                }

                .checkout-tab:hover:not(.active) {
                    color: var(--white);
                }

                .tab-content { min-height: 180px; }

                .sq-card-container {
                    min-height: 120px; margin-bottom: 20px;
                }

                .pay-action-btn {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    width: 100%; padding: 16px; border: none; border-radius: 14px;
                    cursor: pointer; font-family: 'Outfit', sans-serif;
                    font-size: 15px; font-weight: 700; letter-spacing: 0.05em;
                    text-transform: uppercase; transition: all 0.2s;
                }

                .pay-action-btn.primary {
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white);
                    box-shadow: 0 8px 28px rgba(232, 98, 44, 0.35);
                }

                .pay-action-btn.primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 36px rgba(232, 98, 44, 0.45);
                }



                .pay-action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .checkout-error {
                    margin-top: 16px; padding: 12px 16px; border-radius: 10px;
                    background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2);
                    color: #f87171; font-size: 13px; text-align: center;
                }

                .checkout-success {
                    text-align: center; padding: 40px 20px;
                }

                .success-icon {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 64px; height: 64px; border-radius: 50%;
                    background: rgba(34, 197, 94, 0.1); border: 2px solid rgba(34, 197, 94, 0.3);
                    font-size: 28px; margin-bottom: 20px;
                }

                .success-title {
                    font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700;
                    color: var(--green); margin-bottom: 8px;
                }

                .success-desc { font-size: 14px; color: var(--muted); margin-bottom: 20px; }

                .success-id { font-size: 11px; color: var(--muted); font-family: monospace; }

                .success-link {
                    display: inline-block; margin-top: 20px; padding: 12px 24px;
                    border-radius: 10px; background: rgba(34, 197, 94, 0.08);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                    color: var(--green); text-decoration: none; font-size: 13px; font-weight: 600;
                    transition: all 0.2s;
                }

                .success-link:hover { background: rgba(34, 197, 94, 0.15); }

                .secure-note {
                    margin-top: 20px; text-align: center;
                    font-size: 11px; color: rgba(148, 163, 184, 0.6);
                }



                .loading-state {
                    display: flex; align-items: center; justify-content: center;
                    min-height: 200px; color: var(--muted); font-size: 14px;
                }

                .spinner {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: white; border-radius: 50%;
                    animation: spin 0.6s linear infinite; margin-right: 10px;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .back-link {
                    display: block; text-align: center; margin-top: 20px;
                    color: var(--muted); font-size: 12px; text-decoration: none;
                    transition: color 0.2s;
                }
                .back-link:hover { color: var(--white); }
            `}</style>

            <div className="checkout-shell">
                <div className="checkout-card">
                    <div className="checkout-brand">MediaGeekz</div>
                    <div className="checkout-sub">Secure Payment</div>

                    <div className="checkout-amount-box">
                        <div className="checkout-desc">{desc}</div>
                        <div className="checkout-amount">{fmt(amount)}</div>
                    </div>

                    {success ? (
                        <div className="checkout-success">
                            <div className="success-icon">✓</div>
                            <div className="success-title">Payment Successful</div>
                            <div className="success-desc">Thank you! Your payment has been processed.</div>
                            <div className="success-id">Payment ID: {success.id}</div>
                            {success.receipt && (
                                <a href={success.receipt} className="success-link" target="_blank" rel="noopener noreferrer">
                                    View Receipt →
                                </a>
                            )}
                            <a href="/proposals/leadership-interviews/invoice" className="back-link">
                                ← Return to Invoice
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="checkout-tabs">
                                <button
                                    className={`checkout-tab ${activeTab === 'card' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('card')}
                                >
                                    💳 Card
                                </button>
                                {applePayAvailable && (
                                    <button
                                        className={`checkout-tab ${activeTab === 'apple' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('apple')}
                                    >
                                         Apple Pay
                                    </button>
                                )}

                            </div>

                            <div className="tab-content">
                                {activeTab === 'card' && (
                                    <>
                                        {!sdkLoaded ? (
                                            <div className="loading-state">
                                                <span className="spinner" />Loading payment form...
                                            </div>
                                        ) : (
                                            <>
                                                <div ref={cardRef} className="sq-card-container" />
                                                <button
                                                    className="pay-action-btn primary"
                                                    onClick={handleCardPayment}
                                                    disabled={processing}
                                                >
                                                    {processing ? (
                                                        <><span className="spinner" /> Processing...</>
                                                    ) : (
                                                        <>Pay {fmt(amount)}</>
                                                    )}
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}

                                {activeTab === 'apple' && applePayAvailable && (
                                    <>
                                        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--muted)', fontSize: 13 }}>
                                            Click below to pay with Apple Pay
                                        </div>
                                        <div id="apple-pay-button" />
                                    </>
                                )}


                            </div>

                            {error && <div className="checkout-error">{error}</div>}
                            <div className="secure-note">🔒 Payments processed securely via Square</div>
                            <a href="/proposals/leadership-interviews/invoice" className="back-link">
                                ← Back to Invoice
                            </a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f1a', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                Loading checkout...
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
