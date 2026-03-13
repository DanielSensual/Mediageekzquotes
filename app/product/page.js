'use client';

import { useEffect, useState, useRef } from 'react';

const VERTICALS = [
    { icon: '💒', name: 'Weddings' },
    { icon: '🏢', name: 'Corporate' },
    { icon: '🏠', name: 'Real Estate' },
    { icon: '🎵', name: 'Music Videos' },
    { icon: '📱', name: 'Social Media' },
    { icon: '🎤', name: 'Conventions' },
    { icon: '🍽️', name: 'Restaurants' },
    { icon: '🎙️', name: 'Podcasts' },
    { icon: '💪', name: 'Fitness' },
    { icon: '🌃', name: 'Nightlife' },
    { icon: '🏥', name: 'Medical' },
    { icon: '🎓', name: 'Education' },
];

const PAIN_POINTS = [
    {
        emoji: '💸',
        title: 'You\'re guessing your rates',
        desc: 'And leaving thousands of dollars on the table with every project you underprice.',
    },
    {
        emoji: '⏳',
        title: 'Prospects are booking someone else',
        desc: 'While you\'re still fighting with a Canva PDF or a messy spreadsheet.',
    },
    {
        emoji: '🎭',
        title: 'You suffer from Imposter Pricing',
        desc: 'Changing your rates based on how confident you feel that day instead of what the work is worth.',
    },
];

const STEPS = [
    { num: '01', title: 'Sign Up in 30 Seconds', desc: 'Pick your verticals. Wedding films? Corporate gigs? All 12 are pre-loaded with real-world rates.' },
    { num: '02', title: 'Set Your Rates', desc: 'Customize day rates, deliverables, add-ons, and turnaround fees to match your market and skill level.' },
    { num: '03', title: 'Send Polished Quotes', desc: 'Generate a beautiful, branded PDF quote in 60 seconds. Clients can pay deposits right from the quote.' },
];

const TIERS = [
    {
        slug: 'founding',
        name: 'Founding',
        badge: 'First 50 Only',
        price: 19,
        period: '/mo',
        features: [
            '1 vertical',
            'Unlimited quotes',
            'PDF quote generation',
            'Basic branding',
            'Email support',
        ],
        cta: 'Claim Founding Price',
        highlight: false,
    },
    {
        slug: 'pro',
        name: 'Pro',
        badge: 'Most Popular',
        price: 29,
        period: '/mo',
        features: [
            'Unlimited verticals',
            'Unlimited quotes',
            'PDF quotes + client checkout',
            'Custom branding & colors',
            'Quote history dashboard',
            'Priority support',
        ],
        cta: 'Start Free Trial',
        highlight: true,
    },
    {
        slug: 'agency',
        name: 'Agency',
        badge: null,
        price: 49,
        period: '/mo',
        features: [
            'Everything in Pro',
            'Team seats (3 users)',
            'Agency markup tool',
            'White-label quotes',
            'Client approval workflows',
            'Dedicated support',
        ],
        cta: 'Start Free Trial',
        highlight: false,
    },
];

// Animated quote demo values
const DEMO_ITEMS = [
    { label: 'Full-Day Coverage (2 operators)', value: 3200 },
    { label: 'Cinematic Highlights Edit', value: 1800 },
    { label: 'Social Media Trailer', value: 550 },
    { label: 'Drone Coverage', value: 450 },
];

export default function ProductPage() {
    const [mounted, setMounted] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef({});

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animate demo quote items appearing one by one
    useEffect(() => {
        if (!mounted) return;
        const interval = setInterval(() => {
            setDemoStep(prev => {
                if (prev >= DEMO_ITEMS.length) {
                    // Reset after showing total
                    setTimeout(() => setDemoStep(0), 2000);
                    return prev;
                }
                return prev + 1;
            });
        }, 900);
        return () => clearInterval(interval);
    }, [mounted]);

    // Intersection observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.15 }
        );

        Object.values(sectionRefs.current).forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [mounted]);

    const registerRef = (id) => (el) => {
        sectionRefs.current[id] = el;
    };

    const demoTotal = DEMO_ITEMS.slice(0, demoStep).reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="pdp">
            {/* ─── Particle Background ─── */}
            <div className="pdp-particles" aria-hidden="true">
                {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} className="pdp-particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                    }} />
                ))}
            </div>

            {/* ─── Nav ─── */}
            <nav className="pdp-nav">
                <div className="pdp-nav-inner">
                    <a href="/product" className="pdp-logo">
                        <span className="pdp-logo-icon">🎬</span>
                        <span className="pdp-logo-text">Video<span className="pdp-accent">Quoter</span></span>
                    </a>
                    <div className="pdp-nav-links">
                        <a href="#pricing" className="pdp-nav-link">Pricing</a>
                        <a href="#how-it-works" className="pdp-nav-link">How It Works</a>
                        <a href="/signup" className="pdp-nav-cta">Get Started</a>
                    </div>
                </div>
            </nav>

            {/* ─── Hero ─── */}
            <section className="pdp-hero">
                <div className="pdp-hero-content">
                    <div className="pdp-hero-text">
                        <span className={`pdp-hero-badge ${mounted ? 'pdp-visible' : ''}`}>
                            Built by a 5-Year Production Veteran
                        </span>
                        <h1 className={`pdp-hero-title ${mounted ? 'pdp-visible' : ''}`}>
                            Stop Undercharging.<br />
                            <span className="pdp-accent pdp-shimmer">Start Quoting Like a Pro.</span>
                        </h1>
                        <p className={`pdp-hero-sub ${mounted ? 'pdp-visible' : ''}`}>
                            Video Quoter is the pricing engine that bakes in real-world production logic.
                            You plug in the project specs — it spits out a polished, profitable quote in 60 seconds.
                        </p>
                        <div className={`pdp-hero-ctas ${mounted ? 'pdp-visible' : ''}`}>
                            <a href="/signup" className="pdp-btn-primary">
                                <span>⚡</span> Start Free — Send Your First Quote Today
                            </a>
                            <a href="#demo" className="pdp-btn-ghost">
                                <span>▶</span> Watch Demo
                            </a>
                        </div>
                    </div>

                    {/* ─── Interactive Quote Demo ─── */}
                    <div className={`pdp-demo ${mounted ? 'pdp-visible' : ''}`} id="demo">
                        <div className="pdp-demo-header">
                            <span className="pdp-demo-dot pdp-demo-dot-red" />
                            <span className="pdp-demo-dot pdp-demo-dot-yellow" />
                            <span className="pdp-demo-dot pdp-demo-dot-green" />
                            <span className="pdp-demo-title">Quote Preview — Wedding Film</span>
                        </div>
                        <div className="pdp-demo-body">
                            <div className="pdp-demo-badge">⭐ Senior Editor</div>
                            {DEMO_ITEMS.map((item, i) => (
                                <div
                                    key={item.label}
                                    className={`pdp-demo-line ${i < demoStep ? 'pdp-demo-line-visible' : ''}`}
                                >
                                    <span className="pdp-demo-line-label">{item.label}</span>
                                    <span className="pdp-demo-line-price">
                                        ${item.value.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                            <div className={`pdp-demo-total ${demoStep >= DEMO_ITEMS.length ? 'pdp-demo-total-visible' : ''}`}>
                                <span>Total Investment</span>
                                <span className="pdp-demo-total-amount">
                                    ${demoTotal.toLocaleString()}.00
                                </span>
                            </div>
                            <div className={`pdp-demo-btn ${demoStep >= DEMO_ITEMS.length ? 'pdp-demo-btn-visible' : ''}`}>
                                ⚡ Generate Quote
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Pain Points ─── */}
            <section
                className={`pdp-section pdp-pain ${visibleSections['pain'] ? 'pdp-section-visible' : ''}`}
                id="pain"
                ref={registerRef('pain')}
            >
                <h2 className="pdp-section-title">Sound Familiar?</h2>
                <p className="pdp-section-sub">Every videographer hits these walls. Most never fix them.</p>
                <div className="pdp-pain-grid">
                    {PAIN_POINTS.map((p, i) => (
                        <div key={i} className="pdp-pain-card" style={{ animationDelay: `${i * 150}ms` }}>
                            <span className="pdp-pain-emoji">{p.emoji}</span>
                            <h3 className="pdp-pain-title">{p.title}</h3>
                            <p className="pdp-pain-desc">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Verticals Strip ─── */}
            <section
                className={`pdp-section pdp-verticals-section ${visibleSections['verticals'] ? 'pdp-section-visible' : ''}`}
                id="verticals"
                ref={registerRef('verticals')}
            >
                <h2 className="pdp-section-title">12 Industry Verticals. Pre-Loaded.</h2>
                <p className="pdp-section-sub">Real-world rate cards for every type of production. Not templates — actual pricing logic.</p>
                <div className="pdp-verticals-strip">
                    {VERTICALS.map((v, i) => (
                        <div key={v.name} className="pdp-vertical-chip" style={{ animationDelay: `${i * 80}ms` }}>
                            <span className="pdp-vc-icon">{v.icon}</span>
                            <span className="pdp-vc-name">{v.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── How It Works ─── */}
            <section
                className={`pdp-section ${visibleSections['how-it-works'] ? 'pdp-section-visible' : ''}`}
                id="how-it-works"
                ref={registerRef('how-it-works')}
            >
                <h2 className="pdp-section-title">Your First Quote in 3 Minutes</h2>
                <p className="pdp-section-sub">Not 3 hours. Not 3 days. Three minutes.</p>
                <div className="pdp-steps-grid">
                    {STEPS.map((s, i) => (
                        <div key={i} className="pdp-step-card" style={{ animationDelay: `${i * 150}ms` }}>
                            <span className="pdp-step-num">{s.num}</span>
                            <h3 className="pdp-step-title">{s.title}</h3>
                            <p className="pdp-step-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Pricing ─── */}
            <section
                className={`pdp-section pdp-pricing ${visibleSections['pricing'] ? 'pdp-section-visible' : ''}`}
                id="pricing"
                ref={registerRef('pricing')}
            >
                <h2 className="pdp-section-title">One Underpriced Gig Costs More Than a Year of Video Quoter</h2>
                <p className="pdp-section-sub">If it stops you from leaving $500 on the table just once, it pays for itself.</p>
                <div className="pdp-pricing-grid">
                    {TIERS.map((tier, i) => (
                        <div
                            key={tier.slug}
                            className={`pdp-pricing-card ${tier.highlight ? 'pdp-pricing-featured' : ''}`}
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {tier.badge && <span className="pdp-pricing-badge">{tier.badge}</span>}
                            <h3 className="pdp-pricing-name">{tier.name}</h3>
                            <div className="pdp-pricing-price">
                                <span className="pdp-pricing-dollar">$</span>
                                <span className="pdp-pricing-amount">{tier.price}</span>
                                <span className="pdp-pricing-period">{tier.period}</span>
                            </div>
                            <ul className="pdp-pricing-features">
                                {tier.features.map((f, fi) => (
                                    <li key={fi}><span className="pdp-check">✓</span> {f}</li>
                                ))}
                            </ul>
                            <a
                                href="/signup"
                                className={`pdp-pricing-cta ${tier.highlight ? 'pdp-pricing-cta-primary' : ''}`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Social Proof ─── */}
            <section
                className={`pdp-section pdp-proof ${visibleSections['proof'] ? 'pdp-section-visible' : ''}`}
                id="proof"
                ref={registerRef('proof')}
            >
                <div className="pdp-proof-grid">
                    <div className="pdp-proof-stat">
                        <span className="pdp-proof-number">12</span>
                        <span className="pdp-proof-label">Industry Verticals</span>
                    </div>
                    <div className="pdp-proof-stat">
                        <span className="pdp-proof-number">60s</span>
                        <span className="pdp-proof-label">Quote Generation</span>
                    </div>
                    <div className="pdp-proof-stat">
                        <span className="pdp-proof-number">5+</span>
                        <span className="pdp-proof-label">Years of Real-World Rates</span>
                    </div>
                    <div className="pdp-proof-stat">
                        <span className="pdp-proof-number">PDF</span>
                        <span className="pdp-proof-label">Branded Proposals</span>
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="pdp-section pdp-final-cta">
                <h2 className="pdp-final-title">
                    Your competitors are sending polished proposals.<br />
                    <span className="pdp-accent">Are you?</span>
                </h2>
                <p className="pdp-final-sub">
                    Stop sending quotes in Word docs. Stop guessing your rates.
                    Stop leaving money on the table.
                </p>
                <a href="/signup" className="pdp-btn-primary pdp-btn-lg">
                    <span>⚡</span> Get Started — Free Trial
                </a>
            </section>

            {/* ─── Footer ─── */}
            <footer className="pdp-footer">
                <div className="pdp-footer-inner">
                    <span className="pdp-footer-brand">
                        🎬 Video<span className="pdp-accent">Quoter</span>
                    </span>
                    <span className="pdp-footer-copy">
                        © {new Date().getFullYear()} Ghost AI Systems. All rights reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
}
