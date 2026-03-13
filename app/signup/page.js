'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const VERTICALS = [
    { slug: 'weddings', icon: '💒', name: 'Weddings' },
    { slug: 'corporate', icon: '🏢', name: 'Corporate' },
    { slug: 'real-estate', icon: '🏠', name: 'Real Estate' },
    { slug: 'music-videos', icon: '🎵', name: 'Music Videos' },
    { slug: 'social-media', icon: '📱', name: 'Social Media' },
    { slug: 'conventions', icon: '🎤', name: 'Conventions' },
    { slug: 'restaurants', icon: '🍽️', name: 'Restaurants' },
    { slug: 'podcasts', icon: '🎙️', name: 'Podcasts' },
    { slug: 'fitness', icon: '💪', name: 'Fitness' },
    { slug: 'nightlife', icon: '🌃', name: 'Nightlife' },
    { slug: 'medical', icon: '🏥', name: 'Medical' },
    { slug: 'education', icon: '🎓', name: 'Education' },
];

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedVerticals, setSelectedVerticals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleVertical = (slug) => {
        setSelectedVerticals(prev =>
            prev.includes(slug)
                ? prev.filter(s => s !== slug)
                : prev.length < 12 ? [...prev, slug] : prev
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    companyName,
                    email,
                    password,
                    verticals: selectedVerticals.length > 0 ? selectedVerticals : undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Redirect to their new quote page
            router.push(`/${data.tenant.slug}?welcome=true`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pdp">
            <div className="pdp-particles" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => (
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
                        <a href="/login" className="pdp-nav-link">Log In</a>
                    </div>
                </div>
            </nav>

            <div className="signup-container">
                <div className="signup-card">
                    <h1 className="signup-title">
                        {step === 1 ? 'Create Your Account' : 'Pick Your Verticals'}
                    </h1>
                    <p className="signup-sub">
                        {step === 1
                            ? 'Set up in 30 seconds. 7-day free trial, no card required.'
                            : 'Select the industries you serve. You can always add more later.'}
                    </p>

                    {error && <div className="signup-error">{error}</div>}

                    {step === 1 ? (
                        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="signup-form">
                            <div className="signup-field">
                                <label className="signup-label">Company Name</label>
                                <input
                                    type="text"
                                    className="signup-input"
                                    placeholder="e.g. Sunshine Films"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="signup-field">
                                <label className="signup-label">Email</label>
                                <input
                                    type="email"
                                    className="signup-input"
                                    placeholder="you@yourcompany.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="signup-field">
                                <label className="signup-label">Password</label>
                                <input
                                    type="password"
                                    className="signup-input"
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button type="submit" className="pdp-btn-primary signup-btn">
                                Continue → Pick Verticals
                            </button>
                        </form>
                    ) : (
                        <>
                            <div className="signup-verticals-grid">
                                {VERTICALS.map(v => (
                                    <button
                                        key={v.slug}
                                        type="button"
                                        className={`signup-vertical-chip ${selectedVerticals.includes(v.slug) ? 'signup-vertical-active' : ''}`}
                                        onClick={() => toggleVertical(v.slug)}
                                    >
                                        <span className="signup-vc-icon">{v.icon}</span>
                                        <span className="signup-vc-name">{v.name}</span>
                                        {selectedVerticals.includes(v.slug) && <span className="signup-vc-check">✓</span>}
                                    </button>
                                ))}
                            </div>
                            <p className="signup-hint">
                                {selectedVerticals.length === 0
                                    ? 'Skip to use defaults (Weddings, Corporate, Social Media)'
                                    : `${selectedVerticals.length} selected`}
                            </p>
                            <div className="signup-actions">
                                <button
                                    type="button"
                                    className="pdp-btn-ghost signup-back"
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    className="pdp-btn-primary signup-btn"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? '⏳ Creating...' : '⚡ Launch My Quoter'}
                                </button>
                            </div>
                        </>
                    )}

                    <p className="signup-footer">
                        Already have an account? <a href="/login" className="signup-link">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
