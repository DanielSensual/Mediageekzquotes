'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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

            <nav className="pdp-nav">
                <div className="pdp-nav-inner">
                    <a href="/product" className="pdp-logo">
                        <span className="pdp-logo-icon">🎬</span>
                        <span className="pdp-logo-text">Video<span className="pdp-accent">Quoter</span></span>
                    </a>
                    <div className="pdp-nav-links">
                        <a href="/signup" className="pdp-nav-cta">Sign Up Free</a>
                    </div>
                </div>
            </nav>

            <div className="signup-container">
                <div className="signup-card">
                    <h1 className="signup-title">Welcome Back</h1>
                    <p className="signup-sub">Log in to manage your quotes and rates.</p>

                    {error && <div className="signup-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="signup-field">
                            <label className="signup-label">Email</label>
                            <input
                                type="email"
                                className="signup-input"
                                placeholder="you@yourcompany.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <div className="signup-field">
                            <label className="signup-label">Password</label>
                            <input
                                type="password"
                                className="signup-input"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="pdp-btn-primary signup-btn" disabled={loading}>
                            {loading ? '⏳ Logging in...' : '⚡ Log In'}
                        </button>
                    </form>

                    <p className="signup-footer">
                        Don't have an account? <a href="/signup" className="signup-link">Sign up free</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
