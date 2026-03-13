'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isNewSubscriber = searchParams?.get('subscribed') === 'true';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/dashboard')
            .then(res => {
                if (res.status === 401) {
                    router.push('/login');
                    return null;
                }
                return res.json();
            })
            .then(d => {
                if (d) setData(d);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load dashboard');
                setLoading(false);
            });
    }, [router]);

    const handleBilling = async () => {
        if (!data?.tenant?.id) return;
        try {
            const res = await fetch('/api/billing-portal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tenantId: data.tenant.id }),
            });
            const result = await res.json();
            if (result.url) window.location.href = result.url;
        } catch (err) {
            console.error('Billing portal error:', err);
        }
    };

    const handleLogout = async () => {
        document.cookie = 'vq_session=; path=/; max-age=0';
        router.push('/product');
    };

    if (loading) {
        return (
            <div className="pdp">
                <div className="dash-loading">
                    <div className="dash-spinner" />
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="pdp">
                <div className="dash-loading">
                    <p style={{ color: '#f87171' }}>{error || 'Could not load dashboard'}</p>
                    <a href="/login" className="pdp-btn-primary" style={{ marginTop: 16 }}>Log In Again</a>
                </div>
            </div>
        );
    }

    const { tenant, user } = data;
    const statusColor = {
        active: '#22c55e',
        trialing: '#eab308',
        canceled: '#ef4444',
        none: '#6B7280',
    }[tenant.subscriptionStatus] || '#6B7280';

    const statusLabel = {
        active: 'Active',
        trialing: 'Free Trial',
        canceled: 'Canceled',
        none: 'No Subscription',
    }[tenant.subscriptionStatus] || tenant.subscriptionStatus;

    return (
        <div className="pdp">
            <div className="pdp-particles" aria-hidden="true">
                {Array.from({ length: 15 }).map((_, i) => (
                    <span key={i} className="pdp-particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                    }} />
                ))}
            </div>

            {/* Nav */}
            <nav className="pdp-nav">
                <div className="pdp-nav-inner">
                    <a href="/product" className="pdp-logo">
                        <span className="pdp-logo-icon">🎬</span>
                        <span className="pdp-logo-text">Video<span className="pdp-accent">Quoter</span></span>
                    </a>
                    <div className="pdp-nav-links">
                        <a href={`/${tenant.slug}`} className="pdp-nav-link">My Quote Page</a>
                        <button onClick={handleLogout} className="pdp-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="dash-container">
                {/* Welcome Banner */}
                {isNewSubscriber && (
                    <div className="dash-welcome">
                        <span>🎉</span>
                        <div>
                            <strong>Subscription Activated!</strong>
                            <p>You're all set. Your quote page is live.</p>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="dash-header">
                    <div>
                        <h1 className="dash-title">{tenant.name}</h1>
                        <p className="dash-slug">videoquoter.com/{tenant.slug}</p>
                    </div>
                    <div className="dash-header-actions">
                        <span className="dash-status" style={{ borderColor: statusColor, color: statusColor }}>
                            ● {statusLabel}
                        </span>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="dash-stats">
                    <div className="dash-stat-card">
                        <span className="dash-stat-icon">📊</span>
                        <div className="dash-stat-value">{tenant.quoteCount}</div>
                        <div className="dash-stat-label">Total Quotes</div>
                    </div>
                    <div className="dash-stat-card">
                        <span className="dash-stat-icon">📂</span>
                        <div className="dash-stat-value">{tenant.verticals.length}</div>
                        <div className="dash-stat-label">Active Verticals</div>
                    </div>
                    <div className="dash-stat-card">
                        <span className="dash-stat-icon">👤</span>
                        <div className="dash-stat-value">{tenant.subscriptionPlan || 'Trial'}</div>
                        <div className="dash-stat-label">Current Plan</div>
                    </div>
                    {tenant.trialEndsAt && tenant.subscriptionStatus === 'trialing' && (
                        <div className="dash-stat-card">
                            <span className="dash-stat-icon">⏰</span>
                            <div className="dash-stat-value">
                                {Math.max(0, Math.ceil((new Date(tenant.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24)))}d
                            </div>
                            <div className="dash-stat-label">Trial Remaining</div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="dash-section">
                    <h2 className="dash-section-title">Quick Actions</h2>
                    <div className="dash-actions-grid">
                        <a href={`/${tenant.slug}`} className="dash-action-card">
                            <span className="dash-action-icon">⚡</span>
                            <h3>Generate Quote</h3>
                            <p>Open your quote builder and create a new client quote.</p>
                        </a>
                        <a href={`/${tenant.slug}`} className="dash-action-card" target="_blank" rel="noopener">
                            <span className="dash-action-icon">🔗</span>
                            <h3>Share Quote Page</h3>
                            <p>Send your branded quote page URL to clients.</p>
                        </a>
                        {tenant.subscriptionStatus === 'none' || tenant.subscriptionStatus === 'trialing' ? (
                            <a href="/product#pricing" className="dash-action-card dash-action-upgrade">
                                <span className="dash-action-icon">🚀</span>
                                <h3>Upgrade Plan</h3>
                                <p>Unlock unlimited verticals, custom branding, and more.</p>
                            </a>
                        ) : (
                            <button onClick={handleBilling} className="dash-action-card" style={{ textAlign: 'left' }}>
                                <span className="dash-action-icon">💳</span>
                                <h3>Manage Billing</h3>
                                <p>Update payment method, view invoices, or change plan.</p>
                            </button>
                        )}
                    </div>
                </div>

                {/* Verticals */}
                <div className="dash-section">
                    <h2 className="dash-section-title">Your Verticals</h2>
                    <div className="dash-verticals-list">
                        {tenant.verticals.map(v => (
                            <a key={v.id} href={`/${tenant.slug}?v=${v.slug}`} className="dash-vertical-row">
                                <span className="dash-vertical-icon">{v.icon}</span>
                                <span className="dash-vertical-name">{v.name}</span>
                                <span className="dash-vertical-arrow">→</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Account Info */}
                <div className="dash-section">
                    <h2 className="dash-section-title">Account</h2>
                    <div className="dash-info-grid">
                        <div className="dash-info-item">
                            <span className="dash-info-label">Email</span>
                            <span className="dash-info-value">{user?.email}</span>
                        </div>
                        <div className="dash-info-item">
                            <span className="dash-info-label">Role</span>
                            <span className="dash-info-value" style={{ textTransform: 'capitalize' }}>{user?.role}</span>
                        </div>
                        <div className="dash-info-item">
                            <span className="dash-info-label">Brand Color</span>
                            <span className="dash-info-value" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 16, height: 16, background: tenant.colorPrimary, borderRadius: 4, display: 'inline-block' }} />
                                {tenant.colorPrimary}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="pdp"><div className="dash-loading"><p>Loading...</p></div></div>}>
            <DashboardContent />
        </Suspense>
    );
}
