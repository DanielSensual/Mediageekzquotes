'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tenants')
            .then(r => r.json())
            .then(data => { setTenants(data.tenants || []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="landing">
            <header className="landing-header">
                <div className="landing-brand">
                    <span className="landing-icon">🎬</span>
                    <h1>Video<span className="accent">Quoter</span></h1>
                </div>
                <p className="landing-tagline">Professional video production quoting for every vertical</p>
            </header>

            <main className="landing-main">
                <section className="landing-hero">
                    <h2>Build quotes in minutes.</h2>
                    <p>Conventions · Weddings · Social Media · Restaurants</p>
                    <div className="vertical-grid">
                        {['🎤 Conventions', '💒 Weddings', '📱 Social Media', '🍽️ Restaurants'].map((v, i) => (
                            <div key={i} className="vertical-card-preview">
                                <span className="vc-icon">{v.split(' ')[0]}</span>
                                <span className="vc-name">{v.split(' ').slice(1).join(' ')}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {!loading && tenants.length > 0 && (
                    <section className="tenant-list">
                        <h3>Active Companies</h3>
                        <div className="tenant-grid">
                            {tenants.map(t => (
                                <a key={t.slug} href={`/${t.slug}`} className="tenant-card">
                                    <span className="tc-name">{t.name}</span>
                                    <span className="tc-verticals">{t.verticalCount} vertical{t.verticalCount !== 1 ? 's' : ''}</span>
                                    <span className="tc-arrow">→</span>
                                </a>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className="landing-footer">
                <p>© 2026 VideoQuoter — A Ghost AI Systems Product</p>
            </footer>
        </div>
    );
}
