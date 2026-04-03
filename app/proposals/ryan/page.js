'use client';

import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Pricing Data — Midnight Creative / Danny Elfman Doc-Series
   ═══════════════════════════════════════════════════════════════ */

const ADDONS = [
    { id: 'creative-edits', label: 'Additional Creative Video Edits', detail: 'Social teasers, high-concept cuts, or alternative versions.', price: 750 },
    { id: 'raw-footage', label: 'RAW Footage Transfer', detail: 'Delivery of all unedited source files via external drive or cloud transfer.', price: 250 },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function RyanProposal() {
    const [addons, setAddons] = useState({});
    const [sigName, setSigName] = useState('');
    const [signed, setSigned] = useState(false);
    const [signedAt, setSignedAt] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
    }, []);

    const toggleAddon = (id) => {
        setAddons(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSign = () => {
        if (!sigName.trim()) return;
        const now = new Date();
        setSignedAt(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        setSigned(true);
    };

    const handlePrint = () => {
        window.print();
    };

    const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.price : 0), 0);
    const baseTotal = 4500;
    const companyFee = (baseTotal + addonTotal) * 0.05;
    const finalTotal = baseTotal + addonTotal + companyFee;

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

                :root {
                    --shadow: #040508;
                    --navy: #0a0d14;
                    --panel: rgba(10, 13, 20, 0.88);
                    --border: rgba(220, 165, 80, 0.16);
                    --gold: #dca550;
                    --gold-soft: rgba(220, 165, 80, 0.12);
                    --sky: #4a8bcc;
                    --cream: #e2e8f0;
                    --white: #f1f5f9;
                    --muted: #8b96a5;
                    --muted-2: #5b677a;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    color: var(--cream) !important;
                    background:
                        radial-gradient(circle at 10% 20%, rgba(220, 165, 80, 0.05), transparent 40%),
                        radial-gradient(circle at 90% 80%, rgba(74, 139, 204, 0.04), transparent 40%),
                        linear-gradient(180deg, #0a0d14 0%, #06080c 50%, #040508 100%) !important;
                    line-height: 1.6;
                    overflow-x: hidden;
                }

                body::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 0;
                    background: linear-gradient(90deg, rgba(220,165,80,0.015) 1px, transparent 1px),
                                linear-gradient(0deg, rgba(74,139,204,0.01) 1px, transparent 1px);
                    background-size: 100px 100px; opacity: 0.5;
                    mask-image: radial-gradient(circle at center, black 20%, transparent 75%);
                }

                ::selection { background: rgba(220, 165, 80, 0.3); color: var(--white); }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: var(--shadow); }
                ::-webkit-scrollbar-thumb { background: rgba(220, 165, 80, 0.4); border-radius: 999px; }

                .page-shell { position: relative; z-index: 1; }

                /* ── Hero ── */
                .ed-hero {
                    min-height: 90vh;
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: center;
                    text-align: center; padding: 80px 24px 60px;
                    position: relative; overflow: hidden;
                }

                .ed-hero-bg {
                    position: absolute; inset: 0; z-index: 0;
                    background: url('/proposals/ryan/hero.png') center/cover no-repeat;
                    filter: brightness(0.35) saturate(0.85);
                    transform: scale(1.1);
                    transition: transform 0.05s linear;
                }

                .ed-hero-overlay {
                    position: absolute; inset: 0; z-index: 1;
                    background:
                        linear-gradient(180deg, rgba(4, 5, 8, 0.6) 0%, rgba(4, 5, 8, 0.3) 40%, rgba(4, 5, 8, 0.9) 100%),
                        radial-gradient(ellipse at 50% 20%, rgba(220, 165, 80, 0.1) 0%, transparent 50%);
                }

                .hero-badge {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 10px 16px; border: 1px solid rgba(220, 165, 80, 0.25);
                    border-radius: 999px; background: rgba(10, 13, 20, 0.7);
                    color: var(--gold); font-size: 11px; font-weight: 600;
                    letter-spacing: 0.3em; text-transform: uppercase;
                    backdrop-filter: blur(12px); margin-bottom: 32px;
                    position: relative; z-index: 1;
                }

                .hero-badge::before {
                    content: ""; width: 7px; height: 7px; border-radius: 50%;
                    background: var(--gold); box-shadow: 0 0 0 7px rgba(220, 165, 80, 0.15);
                    animation: pulse-dot 2s ease-in-out infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { box-shadow: 0 0 0 7px rgba(220, 165, 80, 0.15); }
                    50% { box-shadow: 0 0 0 12px rgba(220, 165, 80, 0.06); }
                }

                .hero-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(48px, 8vw, 90px);
                    font-weight: 700; line-height: 0.96; letter-spacing: -0.02em;
                    color: var(--white); margin-bottom: 24px;
                    position: relative; z-index: 1;
                }

                .hero-title em {
                    color: var(--gold); font-style: normal; font-weight: 800;
                    background: linear-gradient(135deg, #dca550, #f59e0b);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-subtitle {
                    max-width: 620px; color: var(--cream);
                    font-size: 17px; line-height: 1.7;
                    position: relative; z-index: 1; margin-bottom: 48px;
                    opacity: 0.9;
                }

                .hero-meta {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
                    width: min(100%, 900px); position: relative; z-index: 1;
                }

                .hero-stat {
                    padding: 20px 16px; border: 1px solid rgba(220, 165, 80, 0.12);
                    border-radius: 16px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), rgba(10, 13, 20, 0.7);
                    backdrop-filter: blur(12px);
                    transition: border-color 0.3s ease;
                }

                .hero-stat:hover { border-color: rgba(220, 165, 80, 0.3); }

                .hero-stat-label {
                    color: var(--sky); font-size: 9px; font-weight: 700;
                    letter-spacing: 0.24em; text-transform: uppercase;
                }

                .hero-stat-value {
                    margin-top: 10px; color: var(--white);
                    font-family: 'Outfit', sans-serif;
                    font-size: 17px; font-weight: 600; line-height: 1.2;
                }

                .hero-stat-detail { margin-top: 6px; color: var(--muted); font-size: 12px; }

                @media (max-width: 640px) {
                    .hero-meta { grid-template-columns: repeat(2, 1fr); }
                }

                /* ── Divider ── */
                .divider {
                    width: min(100%, 900px); height: 1px; margin: 0 auto;
                    background: linear-gradient(90deg, transparent, rgba(220, 165, 80, 0.3), rgba(74, 139, 204, 0.2), transparent);
                    opacity: 0.72;
                }

                /* ── Sections ── */
                .ed-section {
                    max-width: 1100px; margin: 0 auto;
                    padding: 80px 24px;
                }

                .section-header { display: grid; gap: 14px; margin-bottom: 40px; max-width: 740px; }
                .section-label { color: var(--gold); font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; }
                .section-question { color: var(--muted-2); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }

                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(36px, 5vw, 54px);
                    font-weight: 600; line-height: 1.05; color: var(--white);
                }

                .section-desc { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 640px; }

                .scope-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px; margin-top: 40px;
                }

                .scope-card {
                    padding: 28px 24px; border: 1px solid rgba(74, 139, 204, 0.12);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .scope-card:hover { border-color: rgba(74, 139, 204, 0.3); transform: translateY(-2px); }
                
                .scope-card-img {
                    width: calc(100% + 48px); height: 160px; object-fit: cover;
                    border-radius: 12px 12px 0 0; margin: -24px -24px 16px -24px;
                    filter: brightness(0.7) saturate(0.9);
                    transition: filter 0.4s ease, transform 0.5s ease;
                }

                .scope-card:hover .scope-card-img {
                    filter: brightness(0.85) saturate(1.1);
                    transform: scale(1.02);
                }

                .scope-card h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 20px; font-weight: 600; color: var(--white); margin-bottom: 8px;
                }

                .scope-card p { font-size: 13px; color: var(--muted-2); line-height: 1.7; }

                /* ── Image Panels (Parallax Breaks) ── */
                .img-panel {
                    position: relative; height: 50vh; overflow: hidden;
                    display: flex; align-items: center; justify-content: center;
                }

                .img-panel-bg {
                    position: absolute; inset: -20% 0; z-index: 0;
                    background-size: cover; background-position: center;
                    filter: brightness(0.4) saturate(0.9);
                }

                .img-panel-overlay {
                    position: absolute; inset: 0; z-index: 1;
                    background: linear-gradient(180deg, var(--shadow) 0%, transparent 30%, transparent 70%, var(--shadow) 100%);
                }

                .img-panel-content {
                    position: relative; z-index: 2; text-align: center;
                    padding: 24px;
                }

                .img-label {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(20px, 4vw, 36px);
                    font-weight: 300; color: rgba(241, 245, 249, 0.9);
                    letter-spacing: 0.08em;
                }

                .img-label span { color: var(--gold); font-weight: 600; }

                .img-sub {
                    font-size: 12px; color: rgba(148, 163, 184, 0.6);
                    letter-spacing: 0.2em; text-transform: uppercase;
                    margin-top: 8px;
                }

                /* ── Add-Ons ── */
                .addon-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 18px 20px; margin-bottom: 12px;
                    border: 1px solid rgba(100, 116, 139, 0.15); border-radius: 14px;
                    background: var(--panel); cursor: pointer;
                    transition: border-color 0.25s ease, background 0.25s ease;
                }

                .addon-row:hover { border-color: rgba(220, 165, 80, 0.3); }
                .addon-row.active { border-color: var(--gold); background: rgba(220, 165, 80, 0.06); }

                .addon-left { display: flex; align-items: center; gap: 14px; }

                .addon-switch {
                    width: 40px; height: 22px; border-radius: 999px;
                    background: rgba(100, 116, 139, 0.3); position: relative;
                    transition: background 0.3s ease; flex-shrink: 0;
                }
                .addon-switch.on { background: var(--gold); }

                .addon-knob {
                    position: absolute; top: 2px; left: 2px;
                    width: 18px; height: 18px; border-radius: 50%;
                    background: var(--white); transition: left 0.3s ease;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
                }
                .addon-switch.on .addon-knob { left: 20px; }

                .addon-name { color: var(--cream); font-size: 14px; font-weight: 500; }
                .addon-detail { color: var(--muted-2); font-size: 11px; margin-top: 2px; }
                .addon-price { color: var(--gold); font-size: 15px; font-weight: 700; white-space: nowrap; }

                /* ── Signature Block ── */
                .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(100, 116, 139, 0.12); }
                .sig-label { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 32px; }
                .sig-preview { min-height: 52px; padding: 10px 16px; border-bottom: 2px solid rgba(100, 116, 139, 0.3); margin-bottom: 6px; display: flex; align-items: flex-end; }
                .sig-cursive { font-family: 'Dancing Script', cursive; font-size: 28px; font-weight: 700; color: var(--white); line-height: 1.2; }
                .sig-field { font-size: 11px; color: var(--muted-2); margin-bottom: 18px; }
                .sig-line { border-bottom: 1px solid rgba(100, 116, 139, 0.3); padding-bottom: 6px; margin-bottom: 6px; min-height: 28px; }
                .sig-input { width: 100%; padding: 12px 16px; border: 1px solid rgba(100, 116, 139, 0.2); border-radius: 10px; background: rgba(10, 13, 20, 0.6); color: var(--white); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
                .sig-input:focus { border-color: var(--gold); }
                
                .sign-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 16px; border: none; border-radius: 12px; cursor: pointer; background: linear-gradient(135deg, var(--gold), #f59e0b); color: var(--white); font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 16px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 6px 24px rgba(220, 165, 80, 0.3); }
                .sign-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(220, 165, 80, 0.4); }
                .sign-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                
                .signed-badge { display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-radius: 12px; background: rgba(74, 139, 204, 0.08); border: 1px solid rgba(74, 139, 204, 0.25); margin-top: 16px; }
                .signed-badge-icon { font-size: 20px; }
                .signed-badge-text { font-size: 12px; color: var(--sky); font-weight: 600; }
                .signed-badge-time { font-size: 11px; color: var(--muted-2); margin-top: 2px; }
                
                .print-contract-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; margin-top: 12px; border: 1px solid rgba(100, 116, 139, 0.3); border-radius: 10px; background: transparent; color: var(--white); font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                .print-contract-btn:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(100, 116, 139, 0.5); }
                
                @media (max-width: 640px) { .sig-grid { grid-template-columns: 1fr; gap: 28px; } .sig-cursive { font-size: 24px; } }
                @media print {
                    .no-print { display: none !important; }
                    .sign-btn, .print-contract-btn, .sig-input { display: none !important; }
                    body { background: white !important; color: #1a1a1a !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }

                /* ── Reveal ── */
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }
            `}</style>



            <div className="page-shell">
                {/* ── HERO ── */}
                <div className="ed-hero">
                    <div className="ed-hero-bg" style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
                    <div className="ed-hero-overlay" />
                    <div className="hero-badge">Midnight Creative × MediaGeekz</div>
                    <h1 className="hero-title">
                        Danny Elfman<br /><em>Doc-Series</em>
                    </h1>
                    <p className="hero-subtitle">
                        High-end cinematic production capturing the essence of a legendary composer. Professional on-location cinematography, B-roll, and editorial deliverables in Los Angeles.
                    </p>

                    <div className="hero-meta">
                        <div className="hero-stat">
                            <div className="hero-stat-label">Client</div>
                            <div className="hero-stat-value">Midnight Creative</div>
                            <div className="hero-stat-detail">Ryan</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Location</div>
                            <div className="hero-stat-value">Los Angeles, CA</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Schedule</div>
                            <div className="hero-stat-value">April 9th</div>
                            <div className="hero-stat-detail">Travel: April 8th</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Crew</div>
                            <div className="hero-stat-value">2-Person Crew</div>
                            <div className="hero-stat-detail">Director + Second Shooter</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── PROJECT OVERVIEW ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Project Overview</div>
                        <h2 className="section-title">Cinematic impact.</h2>
                        <p className="section-desc">
                            This proposal covers the production services for the upcoming documentary series featuring Danny Elfman. We are providing a two-person crew to capture high-end cinematic content and photography on-location in Los Angeles.
                        </p>
                    </div>

                    <div className="scope-grid">
                        <div className="scope-card" style={{ overflow: 'hidden' }}>
                            <img className="scope-card-img" src="/proposals/ryan/bts-production.png" alt="A-Cam Operation" />
                            <h3>🎥 Lead Cinematography</h3>
                            <p>Primary creative direction and A-cam operation. Focused on narrative storytelling, high-end interview setups, and the overarching visual aesthetic of the doc-series.</p>
                        </div>
                        <div className="scope-card" style={{ overflow: 'hidden' }}>
                            <img className="scope-card-img" src="/proposals/ryan/interview-setup.png" alt="Detail B-Roll" />
                            <h3>🔍 Macro & B-Roll</h3>
                            <p>Pro-Tip for the Shoot: Our Second Shooter will prioritize tight "detail" shots—hands on instruments, eyes, micro-expressions. That's where the magic is for a doc-series like this.</p>
                        </div>
                        <div className="scope-card" style={{ overflow: 'hidden' }}>
                            <img className="scope-card-img" src="/proposals/ryan/social-content.png" alt="Post-Production" />
                            <h3>🎬 Full Edit + Stills</h3>
                            <p>Complete post-production workflow including the full doc-series edit and professionally edited high-res stills for promotional and editorial usage.</p>
                        </div>
                    </div>
                </section>

                {/* ═══ CINEMATIC IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/proposals/ryan/studio-session.png')", transform: `translateY(${(scrollY - 1200) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">The <span>Magic</span> is in the Details</div>
                        <div className="img-sub">Los Angeles Production · Danny Elfman Doc-Series</div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── INVESTMENT / PRICING ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment Summary</div>
                        <h2 className="section-title">Production Scope</h2>
                        <p className="section-desc">
                            Comprehensive baseline for L.A. production, including core crew, travel logistics, and final deliverables.
                        </p>
                    </div>

                    {/* ── Itemized Pricing Card ── */}
                    <div style={{ maxWidth: 740, border: '1px solid rgba(220, 165, 80, 0.25)', borderRadius: 20, background: 'radial-gradient(circle at top right, rgba(220, 165, 80, 0.08), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent), var(--panel)', padding: '36px 28px', boxShadow: '0 0 40px rgba(220, 165, 80, 0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 42, fontWeight: 700, color: 'var(--gold)' }}>$4,725</span>
                            <span style={{ fontSize: 13, color: 'var(--muted-2)', fontWeight: 500 }}>total base investment</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(100, 116, 139, 0.15)' }}>
                            Director + Second Shooter · Los Angeles Production · Film & Photo Deliverables
                        </div>

                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sky)', marginBottom: 14 }}>Cost Breakdown</div>
                        
                        <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(74, 139, 204, 0.1)', borderRadius: 12, background: 'rgba(74, 139, 204, 0.03)' }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>Director / DP</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>Lead creative and primary camera operation.</div>
                                </div>
                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>$1,500</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(74, 139, 204, 0.1)', borderRadius: 12, background: 'rgba(74, 139, 204, 0.03)' }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>Second Shooter</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>Additional angles, B-roll, details, and production support.</div>
                                </div>
                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>$1,000</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(74, 139, 204, 0.1)', borderRadius: 12, background: 'rgba(74, 139, 204, 0.03)' }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>Travel & Logistics</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>Round-trip travel overhead for 2 crew members.</div>
                                </div>
                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>$500</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(74, 139, 204, 0.1)', borderRadius: 12, background: 'rgba(74, 139, 204, 0.03)' }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>Video Deliverables</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>Full edit of the Video Doc Series.</div>
                                </div>
                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>$1,000</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(74, 139, 204, 0.1)', borderRadius: 12, background: 'rgba(74, 139, 204, 0.03)' }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>Photo Deliverables</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>Professionally edited high-res stills.</div>
                                </div>
                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>$500</div>
                            </div>
                        </div>

                        {/* Subtotal + Production Fee */}
                        <div style={{ borderTop: '1px solid rgba(100, 116, 139, 0.15)', paddingTop: 14, display: 'grid', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                                <span style={{ color: 'var(--muted)', fontWeight: 500 }}>$4,500</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: 'var(--muted)' }}>Company Fee (5%)</span>
                                <span style={{ color: 'var(--muted)', fontWeight: 500 }}>$225</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, borderTop: '1px solid rgba(220, 165, 80, 0.25)', paddingTop: 12, marginTop: 6 }}>
                                <span style={{ color: 'var(--white)', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Base Total</span>
                                <span style={{ color: 'var(--gold)', fontWeight: 700, fontFamily: "'Outfit', sans-serif", fontSize: 20 }}>$4,725</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ maxWidth: 740, marginTop: 48 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sky)', marginBottom: 16 }}>Optional Add-Ons</div>
                        
                        {ADDONS.map(addon => (
                            <div 
                                key={addon.id} 
                                className={`addon-row ${addons[addon.id] ? 'active' : ''}`}
                                onClick={() => toggleAddon(addon.id)}
                            >
                                <div className="addon-left">
                                    <div className={`addon-switch ${addons[addon.id] ? 'on' : ''}`}>
                                        <div className="addon-knob" />
                                    </div>
                                    <div>
                                        <div className="addon-name">{addon.label}</div>
                                        <div className="addon-detail">{addon.detail}</div>
                                    </div>
                                </div>
                                <div className="addon-price">+{fmt(addon.price)}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ── SIGNATURE / AGREEMENT ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Next Steps</div>
                        <h2 className="section-title">Review & Approve</h2>
                        <p className="section-desc">
                            Ryan, once you’ve reviewed the breakdown, let me know if you’d like to lock in the "Additional Edits" or "RAW Footage" options now, and I’ll get the final contract sent over. Looking forward to capturing something incredible in L.A.
                        </p>
                    </div>

                    <div style={{ maxWidth: 740, border: '1px solid rgba(100, 116, 139, 0.15)', borderRadius: 20, background: 'var(--panel)', padding: '32px 28px' }}>
                        {/* Summary */}
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 14 }}>Engagement Summary</div>
                        <div style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: 'var(--cream)' }}>Base Investment (inc. 5% fee)</span>
                                <span style={{ color: 'var(--muted)', fontWeight: 500 }}>$4,725</span>
                            </div>
                            {ADDONS.map(addon => addons[addon.id] && (
                                <div key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                    <span style={{ color: 'var(--cream)' }}>{addon.label}</span>
                                    <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{fmt(addon.price)}</span>
                                </div>
                            ))}
                            {addonTotal > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                    <span style={{ color: 'var(--muted-2)' }}>Add-on Fee (5%)</span>
                                    <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{fmt(addonTotal * 0.05)}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px solid rgba(220, 165, 80, 0.2)', paddingTop: 12, marginTop: 8 }}>
                                <span style={{ color: 'var(--white)', fontWeight: 600 }}>Final Total</span>
                                <span style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--gold)', fontWeight: 700, fontSize: 18 }}>{fmt(finalTotal)}</span>
                            </div>
                        </div>

                        <div className="sig-grid">
                            {/* Producer — MediaGeekz */}
                            <div>
                                <div className="sig-label">Producer — MediaGeekz</div>
                                <div style={{ marginBottom: 24 }}>
                                    <div className="sig-preview">
                                        <span className="sig-cursive">Daniel Castillo</span>
                                    </div>
                                    <div className="sig-field">Signature</div>
                                    <div className="sig-line">
                                        <span style={{ fontSize: 13, color: 'var(--cream)' }}>Daniel Castillo</span>
                                    </div>
                                    <div className="sig-field">Printed Name</div>
                                    <div className="sig-line">
                                        <span style={{ fontSize: 13, color: 'var(--cream)' }}>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="sig-field">Date</div>
                                </div>
                            </div>

                            {/* Client — Midnight Creative */}
                            <div>
                                <div className="sig-label">Client — Midnight Creative</div>
                                {signed ? (
                                    <>
                                        <div className="sig-preview">
                                            <span className="sig-cursive">{sigName}</span>
                                        </div>
                                        <div className="sig-field">Signature</div>
                                        <div className="sig-line">
                                            <span style={{ fontSize: 13, color: 'var(--cream)' }}>{sigName}</span>
                                        </div>
                                        <div className="sig-field">Printed Name</div>
                                        <div className="sig-line">
                                            <span style={{ fontSize: 13, color: 'var(--cream)' }}>{signedAt}</span>
                                        </div>
                                        <div className="sig-field">Date</div>
                                        <div className="signed-badge">
                                            <span className="signed-badge-icon">✓</span>
                                            <div>
                                                <div className="signed-badge-text">Proposal Approved</div>
                                                <div className="signed-badge-time">{signedAt}</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: 16 }}>
                                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 8 }}>Type your full name to sign</div>
                                            <input
                                                type="text"
                                                className="sig-input"
                                                placeholder="Ryan"
                                                value={sigName}
                                                onChange={(e) => setSigName(e.target.value)}
                                            />
                                        </div>
                                        {sigName.trim() && (
                                            <div className="sig-preview">
                                                <span className="sig-cursive">{sigName}</span>
                                            </div>
                                        )}
                                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        <button
                                            className="sign-btn"
                                            onClick={handleSign}
                                            disabled={!sigName.trim()}
                                        >
                                            ✍️ Approve Proposal
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── FOOTER ── */}
                <footer className="ed-footer" style={{ textAlign: 'center', padding: '80px 24px 40px', borderTop: '1px solid rgba(100, 116, 139, 0.1)' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 10 }}>MediaGeekz</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 300, fontStyle: 'italic', color: 'rgba(139, 150, 165, 0.4)' }}>Cinematic stories. Elevated brands.</div>
                </footer>
            </div>
        </>
    );
}
