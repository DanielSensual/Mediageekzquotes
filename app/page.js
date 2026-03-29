'use client';

import { useEffect, useState, useRef } from 'react';

const VERTICALS = [
    { slug: 'conventions', icon: '🎤', name: 'Conventions', desc: 'Trade shows, expos & conference coverage' },
    { slug: 'weddings', icon: '💒', name: 'Weddings', desc: 'Cinematic films & highlight reels' },
    { slug: 'social-media', icon: '📱', name: 'Social Media', desc: 'Reels, TikToks & digital content' },
    { slug: 'restaurants', icon: '🍽️', name: 'Restaurants', desc: 'Menu showcases & ambiance films' },
    { slug: 'real-estate', icon: '🏠', name: 'Real Estate', desc: 'Walkthroughs, drones & listing videos' },
    { slug: 'music-videos', icon: '🎵', name: 'Music Videos', desc: 'Cinematic performances & narrative films' },
    { slug: 'podcasts', icon: '🎙️', name: 'Podcasts', desc: 'Multi-cam recording & social clips' },
    { slug: 'fitness', icon: '💪', name: 'Fitness & Gym', desc: 'High-energy promos & trainer spotlights' },
    { slug: 'nightlife', icon: '🌃', name: 'Nightlife', desc: 'Clubs, events & highlight reels' },
    { slug: 'corporate', icon: '🏢', name: 'Corporate', desc: 'Interviews, training & brand films' },
    { slug: 'medical', icon: '🏥', name: 'Medical / MedSpa', desc: 'Procedure explainers & testimonials' },
    { slug: 'education', icon: '🎓', name: 'Education', desc: 'Campus tours & course promos' },
];

export default function HomePage() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const heroRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        fetch('/api/tenants')
            .then(r => r.json())
            .then(data => { setTenants(data.tenants || []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    // Determine the default tenant slug (first tenant returned from API)
    const defaultTenant = tenants.length > 0 ? tenants[0].slug : 'mediageekz';

    return (
        <div className="landing">
            {/* Particle background */}
            <div className="particle-field" aria-hidden="true">
                {Array.from({ length: 30 }).map((_, i) => (
                    <span key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${4 + Math.random() * 4}s`,
                    }} />
                ))}
            </div>

            <header className="landing-header" ref={heroRef}>
                <div className="landing-brand">
                    <span className="landing-icon">🎬</span>
                    <h1 className={`hero-title ${mounted ? 'hero-title-visible' : ''}`}>
                        Video<span className="accent shimmer">Quoter</span>
                    </h1>
                </div>
                <p className={`landing-tagline ${mounted ? 'tagline-visible' : ''}`}>
                    Professional video production quoting for every vertical
                </p>
            </header>

            <main className="landing-main">
                <section className="landing-hero">
                    <h2 className={`hero-cta ${mounted ? 'hero-cta-visible' : ''}`}>
                        Select your project type.
                    </h2>
                    <p className={`hero-sub ${mounted ? 'hero-sub-visible' : ''}`}>
                        Choose a vertical to start building your quote instantly.
                    </p>

                    <div className="vertical-grid">
                        {VERTICALS.map((v, i) => (
                            <a
                                key={v.slug}
                                href={`/${defaultTenant}?v=${v.slug}`}
                                className={`vertical-card-preview ${mounted ? 'card-visible' : ''} ${hoveredIdx === i ? 'card-glow' : ''}`}
                                style={{ animationDelay: `${150 + i * 100}ms` }}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                id={`vertical-${v.slug}`}
                            >
                                <span className="vc-icon">{v.icon}</span>
                                <span className="vc-name">{v.name}</span>
                                <span className="vc-desc">{v.desc}</span>
                                <span className="vc-arrow">→</span>
                            </a>
                        ))}
                    </div>
                </section>

                {!loading && tenants.length > 0 && (
                    <section className={`tenant-list ${mounted ? 'tenant-visible' : ''}`}>
                        <h3>Active Companies</h3>
                        <div className="tenant-grid">
                            {tenants.map(t => (
                                <a key={t.slug} href={`/${t.slug}`} className="tenant-card">
                                    <span className="tc-name">{t.name}</span>
                                    <span className="tc-verticals">
                                        <CountUp target={t.verticalCount} /> vertical{t.verticalCount !== 1 ? 's' : ''}
                                    </span>
                                    <span className="tc-arrow">→</span>
                                </a>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* ═══ CLIENT PROPOSALS ═══ */}
                <section className={`tenant-list ${mounted ? 'tenant-visible' : ''}`} style={{ marginTop: 24 }}>
                    <h3>Client Proposals</h3>
                    <div className="vertical-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {[
                            { href: '/thread', icon: '🧵', name: 'ThreadLink', desc: 'Brand story + community video production', status: 'Active', total: 12000, paid: 6000 },
                            { href: '/proposals/easy-denture', icon: '🦷', name: 'Easy Denture', desc: 'Mobile dentistry — raw footage package', status: 'Active', total: 4070, paid: 2035 },
                            { href: '/proposals/eventive', icon: '🎪', name: 'Eventive', desc: 'Awards dinner + highlight video', status: 'Active', total: 2250, paid: 1125 },
                            { href: '/proposals/leadership-interviews', icon: '🎙️', name: 'Leadership Interviews', desc: 'Interview series — multi-cam production', status: 'Active', total: 0, paid: 0 },
                            { href: '/proposals/veronica-ellyn', icon: '✨', name: 'Veronica Ellyn', desc: 'Creative portrait + brand content', status: 'Active', total: 0, paid: 0 },
                            { href: '/proposals/convention-event', icon: '🎪', name: 'Convention Event', desc: 'Event coverage + highlight reels', status: 'Active', total: 0, paid: 0 },
                            { href: '/proposals/wedding-basic', icon: '💒', name: 'Wedding Basic', desc: 'Wedding day cinematic package', status: 'Active', total: 0, paid: 0 },
                        ].map((p, i) => (
                            <a
                                key={p.href}
                                href={p.href}
                                className={`vertical-card-preview ${mounted ? 'card-visible' : ''}`}
                                style={{ animationDelay: `${150 + i * 100}ms`, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                            >
                                <span className="vc-icon">{p.icon}</span>
                                <span className="vc-name">{p.name}</span>
                                <span className="vc-desc" style={{ flexGrow: 1 }}>{p.desc}</span>
                                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '3px 10px', borderRadius: 20, marginTop: 12 }}>{p.status}</span>
                                
                                <div style={{ display: 'flex', gap: 12, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-3)', fontWeight: 700, marginBottom: 2 }}>Charged</span>
                                        <span style={{ fontSize: 13, color: 'var(--cream)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>${p.total ? p.total.toLocaleString() : '0'}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                                        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-3)', fontWeight: 700, marginBottom: 2 }}>Paid</span>
                                        <span style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>${p.paid ? p.paid.toLocaleString() : '0'}</span>
                                    </div>
                                </div>
                                <span className="vc-arrow">→</span>
                            </a>
                        ))}
                    </div>
                </section>

            <footer className="landing-footer">
                <p>© 2026 VideoQuoter — A Ghost AI Systems Product</p>
            </footer>
        </div>
    );
}

// ─── Animated Count-Up Component ─────────────────────────────────
function CountUp({ target }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let current = 0;
                const step = () => {
                    current++;
                    setCount(current);
                    if (current < target) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(el);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count}</span>;
}
