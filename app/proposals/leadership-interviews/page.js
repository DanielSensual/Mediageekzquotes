'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Pricing Data (from Podcast Production vertical)
   ═══════════════════════════════════════════════════════════════ */
const PACKAGES = [
    {
        id: 'professional',
        name: 'Professional',
        tagline: 'Full package',
        recommended: true,
        base: 7350,
        crew: [
            { label: 'Lead Cinematographer', detail: 'Full day (9:30 AM–5:00 PM)', amount: 1200 },
            { label: 'Camera Operator B', detail: 'Full day — 2nd angle', amount: 750 },
        ],
        post: [
            { label: '3× Multi-Cam Interview Edits', detail: '15–20 min each, synced + color graded', amount: 4500, per: '$1,500/ep' },
            { label: '6× Mobile-Ready Clips', detail: '60-sec vertical cuts from interviews', amount: 900, per: '$150/clip' },
        ],
        included: [
            'Full-day on-location recording',
            '2-man crew + locked-off C-cam (Lead DP + Camera Op)',
            '3 multi-cam synced interview edits (15–20 min)',
            '6 mobile-ready 60-sec clips (9:16)',
            'Professional audio (dual wireless lavs)',
            'Simple lower-third graphics (name/title)',
            'Color grading + sound design',
            '2 revision rounds',
            'Priority delivery: Interview 1 within ~1 week',
        ],
        excluded: [],
    },
];

const ADDONS = [
    { id: 'bts-photos', label: 'BTS Photography', detail: 'Behind-the-scenes photos — up to 100 edited images from shoot day', price: 400 },
    { id: 'extra-interview', label: 'Extra Long-Form Interview Edit', detail: 'Additional 15–20 min multi-cam interview edit — recorded on shoot day', price: 1500 },
    { id: 'licensed-music', label: 'Licensed Music', detail: 'Premium royalty-free track per episode — curated to match your brand', price: 100, per: '~$100/ep' },
];

/* ═══════════════════════════════════════════════════════════════ */

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function LeadershipInterviewsProposal() {
    const [addons, setAddons] = useState({});
    const [expandedPkg, setExpandedPkg] = useState('professional');

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
        return () => observer.disconnect();
    }, []);

    const toggleAddon = (id) => {
        setAddons(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.price : 0), 0);

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

                :root {
                    --shadow: #060a14;
                    --shadow-2: #0a0f1a;
                    --navy: #0f1729;
                    --navy-light: #162033;
                    --panel: rgba(15, 23, 42, 0.88);
                    --panel-strong: rgba(18, 28, 50, 0.94);
                    --border: rgba(232, 98, 44, 0.16);
                    --border-strong: rgba(232, 98, 44, 0.35);
                    --orange: #e8622c;
                    --orange-soft: rgba(232, 98, 44, 0.12);
                    --orange-glow: rgba(232, 98, 44, 0.22);
                    --teal: #2dd4bf;
                    --teal-soft: rgba(45, 212, 191, 0.12);
                    --cream: #e2e8f0;
                    --white: #f1f5f9;
                    --muted: #94a3b8;
                    --muted-2: #64748b;
                    --muted-3: #475569;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    color: var(--cream) !important;
                    background:
                        radial-gradient(circle at 30% 10%, rgba(232, 98, 44, 0.06), transparent 40%),
                        radial-gradient(circle at 70% 80%, rgba(45, 212, 191, 0.04), transparent 40%),
                        linear-gradient(180deg, #0d1220 0%, #080c16 50%, #060a14 100%) !important;
                    line-height: 1.6;
                    overflow-x: hidden;
                }

                body::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 0;
                    background: linear-gradient(90deg, rgba(232,98,44,0.015) 1px, transparent 1px),
                                linear-gradient(0deg, rgba(45,212,191,0.01) 1px, transparent 1px);
                    background-size: 100px 100px; opacity: 0.5;
                    mask-image: radial-gradient(circle at center, black 20%, transparent 75%);
                }

                ::selection { background: rgba(232, 98, 44, 0.3); color: var(--white); }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: var(--shadow); }
                ::-webkit-scrollbar-thumb { background: rgba(232, 98, 44, 0.4); border-radius: 999px; }

                .page-shell { position: relative; z-index: 1; }

                /* ── Hero ── */
                .li-hero {
                    min-height: 80vh;
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: center;
                    text-align: center; padding: 80px 24px 60px;
                    position: relative;
                    background:
                        radial-gradient(ellipse at 50% 20%, rgba(232, 98, 44, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 60%, rgba(45, 212, 191, 0.04) 0%, transparent 40%);
                }

                .li-hero::after {
                    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 200px;
                    background: linear-gradient(transparent, var(--shadow));
                    pointer-events: none;
                }

                .hero-badge {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 10px 16px; border: 1px solid rgba(232, 98, 44, 0.25);
                    border-radius: 999px; background: rgba(15, 23, 42, 0.7);
                    color: var(--orange); font-size: 11px; font-weight: 600;
                    letter-spacing: 0.3em; text-transform: uppercase;
                    backdrop-filter: blur(12px); margin-bottom: 32px;
                    position: relative; z-index: 1;
                }

                .hero-badge::before {
                    content: ""; width: 7px; height: 7px; border-radius: 50%;
                    background: var(--orange); box-shadow: 0 0 0 7px rgba(232, 98, 44, 0.15);
                    animation: pulse-dot 2s ease-in-out infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { box-shadow: 0 0 0 7px rgba(232, 98, 44, 0.15); }
                    50% { box-shadow: 0 0 0 12px rgba(232, 98, 44, 0.06); }
                }

                .hero-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(48px, 8vw, 96px);
                    font-weight: 700; line-height: 0.96; letter-spacing: -0.03em;
                    color: var(--white); margin-bottom: 24px;
                    position: relative; z-index: 1;
                }

                .hero-title em {
                    color: var(--orange); font-style: normal; font-weight: 800;
                    background: linear-gradient(135deg, #e8622c, #f59e0b);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-subtitle {
                    max-width: 600px; color: var(--muted);
                    font-size: 17px; line-height: 1.7;
                    position: relative; z-index: 1; margin-bottom: 48px;
                }

                .hero-meta {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
                    width: min(100%, 800px); position: relative; z-index: 1;
                }

                .hero-stat {
                    padding: 20px 16px; border: 1px solid rgba(232, 98, 44, 0.12);
                    border-radius: 16px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), rgba(15, 23, 42, 0.7);
                    backdrop-filter: blur(12px);
                    transition: border-color 0.3s ease;
                }

                .hero-stat:hover { border-color: rgba(232, 98, 44, 0.3); }

                .hero-stat-label {
                    color: var(--teal); font-size: 9px; font-weight: 700;
                    letter-spacing: 0.24em; text-transform: uppercase;
                }

                .hero-stat-value {
                    margin-top: 10px; color: var(--white);
                    font-family: 'Outfit', sans-serif;
                    font-size: 18px; font-weight: 600; line-height: 1.2;
                }

                .hero-stat-detail { margin-top: 6px; color: var(--muted); font-size: 12px; }

                @media (max-width: 640px) {
                    .hero-meta { grid-template-columns: repeat(2, 1fr); }
                }

                /* ── Divider ── */
                .divider {
                    width: min(100%, 900px); height: 1px; margin: 0 auto;
                    background: linear-gradient(90deg, transparent, rgba(232, 98, 44, 0.3), rgba(45, 212, 191, 0.2), transparent);
                    opacity: 0.72;
                }

                /* ── Sections ── */
                .li-section {
                    max-width: 1100px; margin: 0 auto;
                    padding: 80px 24px;
                }

                .section-header { display: grid; gap: 14px; margin-bottom: 40px; max-width: 740px; }
                .section-label { color: var(--orange); font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; }
                .section-question { color: var(--muted-2); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }

                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(36px, 5vw, 54px);
                    font-weight: 600; line-height: 1.05; color: var(--white);
                }

                .section-desc { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 640px; }

                /* ── Timeline ── */
                .timeline { position: relative; padding-left: 36px; }
                .timeline::before {
                    content: ''; position: absolute; left: 8px; top: 0; bottom: 0;
                    width: 1px; background: linear-gradient(180deg, var(--orange), var(--teal), transparent);
                }

                .timeline-block { position: relative; margin-bottom: 28px; }
                .timeline-block::before {
                    content: ''; position: absolute; left: -32px; top: 6px;
                    width: 10px; height: 10px; border-radius: 50%;
                    background: var(--orange); border: 2px solid var(--shadow);
                    box-shadow: 0 0 0 4px rgba(232, 98, 44, 0.15);
                }

                .timeline-time {
                    color: var(--teal); font-size: 10px; font-weight: 700;
                    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px;
                }

                .timeline-label {
                    color: var(--cream); font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 600; margin-bottom: 3px;
                }
                .timeline-desc { color: var(--muted-2); font-size: 12px; line-height: 1.6; }

                /* ── Equipment Grid ── */
                .equip-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 20px; margin-top: 40px;
                }

                .equip-card {
                    padding: 24px 20px; border: 1px solid rgba(45, 212, 191, 0.12);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .equip-card:hover { border-color: rgba(45, 212, 191, 0.3); transform: translateY(-2px); }
                .equip-icon { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; }

                .equip-card h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 20px; font-weight: 600; color: var(--white); margin-bottom: 8px;
                }

                .equip-card p { font-size: 12px; color: var(--muted-2); line-height: 1.7; }
                .equip-card ul { list-style: none; margin-top: 10px; }
                .equip-card ul li {
                    font-size: 11px; color: var(--muted-2); padding: 3px 0 3px 18px;
                    position: relative; line-height: 1.5;
                }
                .equip-card ul li::before {
                    content: '→'; position: absolute; left: 0; color: var(--teal); font-size: 10px;
                }

                /* ── Packages ── */
                .packages-grid {
                    display: grid; grid-template-columns: 1fr;
                    max-width: 600px;
                    gap: 24px; margin-top: 48px;
                }

                @media (max-width: 960px) { .packages-grid { grid-template-columns: 1fr; } }

                .pkg-card {
                    padding: 36px 28px; border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 20px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), var(--panel);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                    position: relative; cursor: pointer;
                }

                .pkg-card:hover { border-color: rgba(232, 98, 44, 0.3); transform: translateY(-4px); }

                .pkg-card.recommended {
                    border-color: var(--orange);
                    background:
                        radial-gradient(circle at top right, rgba(232, 98, 44, 0.1), transparent 50%),
                        linear-gradient(180deg, rgba(255,255,255,0.03), transparent),
                        rgba(15, 23, 42, 0.94);
                    box-shadow: 0 0 40px rgba(232, 98, 44, 0.08);
                }

                .pkg-badge {
                    position: absolute; top: -12px; left: 28px;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--shadow); font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; padding: 4px 14px; border-radius: 999px;
                }

                .pkg-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 28px; font-weight: 700; color: var(--white); margin-bottom: 4px;
                }

                .pkg-tagline { color: var(--muted-2); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }

                .pkg-price-row {
                    display: flex; align-items: baseline; gap: 8px;
                    padding-bottom: 20px; margin-bottom: 20px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.15);
                }

                .pkg-amount {
                    font-family: 'Outfit', sans-serif;
                    font-size: 40px; font-weight: 700; color: var(--orange);
                    transition: all 0.3s ease;
                }

                .pkg-note { color: var(--muted-2); font-size: 11px; }

                .pkg-features { list-style: none; }
                .pkg-features li {
                    font-size: 13px; color: var(--muted); padding: 7px 0 7px 22px;
                    position: relative; line-height: 1.5;
                }

                .pkg-features li::before {
                    content: '✓'; position: absolute; left: 0; color: var(--teal); font-size: 12px;
                }

                .pkg-features li.excluded { opacity: 0.3; }
                .pkg-features li.excluded::before { content: '—'; color: var(--muted-3); }

                .pkg-features li.bonus { color: var(--orange); font-weight: 500; }
                .pkg-features li.bonus::before { content: '★'; color: var(--orange); }

                /* ── Cost Breakdown ── */
                .cost-toggle {
                    display: flex; align-items: center; gap: 8px;
                    margin-top: 20px; padding: 10px 0;
                    border: none; background: none; cursor: pointer;
                    color: var(--teal); font-size: 11px; font-weight: 600;
                    letter-spacing: 0.18em; text-transform: uppercase;
                    transition: color 0.2s ease;
                }

                .cost-toggle:hover { color: var(--white); }

                .cost-toggle-arrow {
                    display: inline-block; transition: transform 0.3s ease;
                    font-size: 10px;
                }

                .cost-toggle-arrow.open { transform: rotate(90deg); }

                .cost-breakdown {
                    overflow: hidden; max-height: 0; opacity: 0;
                    transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
                    margin-top: 0;
                }

                .cost-breakdown.open { max-height: 600px; opacity: 1; margin-top: 16px; }

                .cost-section { margin-bottom: 18px; }

                .cost-section-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-3);
                    margin-bottom: 10px; padding-bottom: 6px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.1);
                }

                .cost-row {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    padding: 6px 0; font-size: 13px;
                }

                .cost-item { color: var(--cream); flex: 1; }
                .cost-detail { display: block; font-size: 11px; color: var(--muted-3); margin-top: 2px; }
                .cost-amount { color: var(--muted); font-weight: 500; white-space: nowrap; margin-left: 16px; }
                .cost-amount.free { color: var(--teal); font-weight: 600; }

                .cost-row.total { border-top: 1px solid rgba(232, 98, 44, 0.25); padding-top: 12px; margin-top: 8px; }
                .cost-row.total .cost-item { color: var(--white); font-weight: 600; }
                .cost-row.total .cost-amount { color: var(--orange); font-weight: 700; font-size: 15px; }

                /* ── Add-Ons ── */
                .addons-section { margin-top: 48px; }

                .addon-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 18px 20px; margin-bottom: 12px;
                    border: 1px solid rgba(100, 116, 139, 0.15); border-radius: 14px;
                    background: var(--panel); cursor: pointer;
                    transition: border-color 0.25s ease, background 0.25s ease;
                }

                .addon-row:hover { border-color: rgba(232, 98, 44, 0.3); }
                .addon-row.active { border-color: var(--orange); background: rgba(232, 98, 44, 0.06); }

                .addon-left { display: flex; align-items: center; gap: 14px; }

                .addon-switch {
                    width: 40px; height: 22px; border-radius: 999px;
                    background: rgba(100, 116, 139, 0.3); position: relative;
                    transition: background 0.3s ease;
                }

                .addon-switch.on { background: var(--orange); }

                .addon-knob {
                    position: absolute; top: 2px; left: 2px;
                    width: 18px; height: 18px; border-radius: 50%;
                    background: var(--white); transition: left 0.3s ease;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
                }

                .addon-switch.on .addon-knob { left: 20px; }

                .addon-name { color: var(--cream); font-size: 14px; font-weight: 500; }
                .addon-detail { color: var(--muted-2); font-size: 11px; margin-top: 2px; }
                .addon-price { color: var(--orange); font-size: 15px; font-weight: 700; white-space: nowrap; }

                /* ── Next Steps ── */
                .next-steps {
                    margin-top: 60px; padding: 32px 28px; border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 20px; background: var(--panel);
                }

                .next-steps-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 24px; font-weight: 700; color: var(--white); margin-bottom: 20px;
                }

                .next-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                @media (max-width: 640px) { .next-steps-grid { grid-template-columns: 1fr; } }

                .next-step strong {
                    display: block; font-size: 12px; color: var(--orange);
                    letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px;
                }

                .next-step span { font-size: 13px; color: var(--muted); line-height: 1.6; }

                /* ── Reference Section ── */
                .reference-section {
                    max-width: 900px; margin: 0 auto; padding: 60px 24px;
                }

                .reference-card {
                    position: relative; border-radius: 20px; overflow: hidden;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                }

                .reference-card img {
                    width: 100%; display: block;
                    aspect-ratio: 16/9; object-fit: cover;
                }

                .reference-overlay {
                    position: absolute; bottom: 0; left: 0; right: 0;
                    padding: 32px 28px 24px;
                    background: linear-gradient(transparent, rgba(6, 10, 20, 0.92));
                }

                .reference-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.24em;
                    text-transform: uppercase; color: var(--orange); margin-bottom: 8px;
                }

                .reference-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 18px; font-weight: 600; color: var(--white);
                }

                .reference-desc {
                    margin-top: 6px; font-size: 13px; color: var(--muted);
                }

                /* ── CTA Row ── */
                .cta-row {
                    display: flex; gap: 16px; margin-top: 28px; flex-wrap: wrap;
                }

                .cta-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 16px 32px;
                    border: none; border-radius: 999px; cursor: pointer;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 8px 30px rgba(232, 98, 44, 0.3);
                    text-decoration: none;
                }

                .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(232, 98, 44, 0.4); }

                .meeting-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 16px 32px;
                    border: 1px solid var(--teal); border-radius: 999px; cursor: pointer;
                    background: rgba(45, 212, 191, 0.08);
                    color: var(--teal); font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                    text-decoration: none;
                }

                .meeting-btn:hover {
                    transform: translateY(-2px);
                    background: rgba(45, 212, 191, 0.14);
                    box-shadow: 0 8px 30px rgba(45, 212, 191, 0.2);
                }

                /* ── Footer ── */
                .li-footer {
                    text-align: center; padding: 80px 24px 40px;
                    border-top: 1px solid rgba(100, 116, 139, 0.1);
                }

                .footer-logo {
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700; letter-spacing: 0.4em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 10px;
                }

                .footer-tagline {
                    font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 300; font-style: italic;
                    color: rgba(100, 116, 139, 0.4);
                }

                /* ── Reveal ── */
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }
            `}</style>



            <div className="page-shell">
                {/* ── HERO ── */}
                <div className="li-hero">
                    <div className="hero-badge">MediaGeekz — Leadership Interviews</div>
                    <h1 className="hero-title">
                        Record.<br /><em>Refine.</em><br />Amplify.
                    </h1>
                    <p className="hero-subtitle">
                        Three executive leadership interviews captured with cinematic multi-cam production — delivered as polished long-form episodes and mobile-ready social clips.
                    </p>

                    <div className="hero-meta">
                        <div className="hero-stat">
                            <div className="hero-stat-label">Client</div>
                            <div className="hero-stat-value">Tommy</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Shoot Date</div>
                            <div className="hero-stat-value">March 26</div>
                            <div className="hero-stat-detail">Setup 9:30 AM · Record 11:30 AM</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Format</div>
                            <div className="hero-stat-value">3-Cam</div>
                            <div className="hero-stat-detail">2-person interviews</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Location</div>
                            <div className="hero-stat-value">Winter Garden</div>
                            <div className="hero-stat-detail">Venue near theme parks</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── REFERENCE IMAGE ── */}
                <div className="reference-section reveal">
                    <div className="section-header" style={{ marginBottom: 24, textAlign: 'center', maxWidth: '100%' }}>
                        <div className="section-label">Current Production</div>
                        <h2 className="section-title" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
                            Where we&apos;re starting
                        </h2>
                        <p className="section-desc" style={{ margin: '0 auto' }}>
                            This is the existing interview format. We&apos;re upgrading everything — camera work, lighting, audio, and post-production — to cinematic quality.
                        </p>
                    </div>
                    <div className="reference-card">
                        <img src="/proposals/leadership-interviews/current-production.jpg" alt="Current leadership interview production" />
                        <div className="reference-overlay">
                            <div className="reference-label">66 Degrees — CEO &amp; CTO Interview</div>
                            <div className="reference-title">Current Format</div>
                            <div className="reference-desc">3-cam interview setup — we&apos;re upgrading the cinematic quality with professional lighting, audio, and post-production</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── PRODUCTION SCHEDULE ── */}
                <section className="li-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Schedule</div>
                        <div className="section-question">March 26, 2026</div>
                        <h2 className="section-title">One day. Three stories.</h2>
                        <p className="section-desc">
                            Every hour is structured to maximize quality and minimize downtime between interviews. We arrive early to dial in lighting and audio so your talent can focus on the conversation.
                        </p>
                    </div>

                    <div className="timeline">
                        <div className="timeline-block">
                            <div className="timeline-time">9:30 – 11:00 AM</div>
                            <div className="timeline-label">Arrive + Setup</div>
                            <div className="timeline-desc">Scout room lighting, position cameras for dual angles, set up lighting kit and black curtains as needed, test wireless lavs and audio levels. Dress the set while executives finish morning call.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">11:00 – 11:30 AM</div>
                            <div className="timeline-label">Talent Walkthrough</div>
                            <div className="timeline-desc">Quick on-camera test with interviewees. Set framing, confirm eyeline, mic check, and make them comfortable.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">11:30 AM – 12:30 PM</div>
                            <div className="timeline-label">Interview 1 — CEO + CIO</div>
                            <div className="timeline-desc">First leadership sit-down. Multi-cam coverage with A-cam on hero angle and B-cam on reaction/wide. 15–20 min runtime. Priority edit — delivered within ~1 week.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">12:30 – 1:30 PM</div>
                            <div className="timeline-label">Lunch + Reset</div>
                            <div className="timeline-desc">Card swap, battery rotation, review hero shots on monitor. Reset lighting if interview 2 uses a different backdrop.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">1:30 – 2:30 PM</div>
                            <div className="timeline-label">Interview 2 — Recording</div>
                            <div className="timeline-desc">Second leadership interview with fresh interviewees. Same multi-cam setup, adjusted framing as needed.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">2:30 – 3:00 PM</div>
                            <div className="timeline-label">Break + B-Roll</div>
                            <div className="timeline-desc">Capture branded detail shots — name tags, meeting space ambiance, handshake candids, architectural establishing shots.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">3:00 – 4:00 PM</div>
                            <div className="timeline-label">Interview 3 — Recording</div>
                            <div className="timeline-desc">Final leadership interview. Full multi-cam setup with any lessons learned from the earlier sessions applied.</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">4:00 – 5:00 PM</div>
                            <div className="timeline-label">Wrap + BTS Photography</div>
                            <div className="timeline-desc">Behind-the-scenes photography, pickup shots, pack gear, offload media to backup drive. Confirm all files are verified.</div>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── EQUIPMENT ── */}
                <section className="li-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Kit</div>
                        <h2 className="section-title">The gear behind the look</h2>
                        <p className="section-desc">
                            Professional cinema equipment tuned for controlled interview environments — clean audio, flattering light, and multiple angles.
                        </p>
                    </div>

                    <div className="equip-grid">
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--orange)' }}>✦ Camera A — Hero</div>
                            <h3>Sony FX3</h3>
                            <p>Full-frame cinema body. Locked on hero interview angle — chest-up MCU.</p>
                            <ul><li>85mm f/1.4 GM</li><li>S-Log3 / S-Gamut3.Cine</li><li>4K 24fps interview standard</li><li>XAVC-S 4:2:2 10-bit</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--teal)' }}>✦ Camera B — 2nd Angle</div>
                            <h3>Sony A7S III</h3>
                            <p>B-cam on complementary angle — captures the second subject&apos;s reactions and close-ups.</p>
                            <ul><li>24-70mm f/2.8 GM</li><li>Matched to A-cam color science</li><li>Low-light capable</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#A78BFA' }}>✦ Camera C — Locked Wide</div>
                            <h3>Sony A7S III</h3>
                            <p>Locked-off wide establishing shot — captures the full scene and both speakers for editor&apos;s cut-aways.</p>
                            <ul><li>16-35mm f/2.8 GM</li><li>Static tripod mount</li><li>Full room coverage</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                            <h3>Dual Wireless Lavs</h3>
                            <p>One lav per participant. Clean, isolated audio tracks for each speaker.</p>
                            <ul><li>Sennheiser EW-D ×2</li><li>Rode NTG5 boom backup</li><li>Zoom F6 32-bit float recorder</li><li>Synced timecode</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#FBBF24' }}>✦ Lighting</div>
                            <h3>Interview Kit</h3>
                            <p>Soft, flattering key light with controlled fill and separation.</p>
                            <ul><li>300W LED + 47&quot; Softbox (key)</li><li>Aputure MC RGB fill ×2</li><li>4×4 neg fill flag</li><li>LED hair light / edge</li></ul>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── PACKAGES ── */}
                <section className="li-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment</div>
                        <div className="section-question">What are the options?</div>
                        <h2 className="section-title">Choose your coverage scope</h2>
                        <p className="section-desc">
                            All tiers include professional cinema equipment, multi-cam recording, and wireless lav audio. Light and airy, organic visual style — click the package to see the full cost breakdown.
                        </p>
                    </div>

                    <div className="packages-grid">
                        {PACKAGES.map((pkg) => {
                            const total = pkg.base + addonTotal;
                            const isExpanded = expandedPkg === pkg.id;
                            const crewTotal = pkg.crew.reduce((s, c) => s + c.amount, 0);
                            const postTotal = pkg.post.reduce((s, p) => s + (p.free ? 0 : p.amount), 0);

                            return (
                                <div
                                    key={pkg.id}
                                    className={`pkg-card ${pkg.recommended ? 'recommended' : ''}`}
                                    onClick={() => setExpandedPkg(isExpanded ? null : pkg.id)}
                                >
                                    {pkg.recommended && <div className="pkg-badge">Recommended</div>}
                                    <div className="pkg-name">{pkg.name}</div>
                                    <div className="pkg-tagline">{pkg.tagline}</div>

                                    <div className="pkg-price-row">
                                        <span className="pkg-amount">{fmt(total)}</span>
                                        {addonTotal > 0 && <span className="pkg-note">incl. add-ons</span>}
                                    </div>

                                    <ul className="pkg-features">
                                        {pkg.included.map((f, i) => <li key={i}>{f}</li>)}
                                        {(pkg.bonuses || []).map((b, i) => (
                                            <li key={`b${i}`} className="bonus">{b.label} — {b.detail}</li>
                                        ))}
                                        {pkg.excluded.map((f, i) => <li key={`x${i}`} className="excluded">{f}</li>)}
                                    </ul>

                                    {/* Cost Breakdown Toggle */}
                                    <button
                                        type="button"
                                        className="cost-toggle"
                                        onClick={(e) => { e.stopPropagation(); setExpandedPkg(isExpanded ? null : pkg.id); }}
                                    >
                                        <span className={`cost-toggle-arrow ${isExpanded ? 'open' : ''}`}>▸</span>
                                        {isExpanded ? 'Hide' : 'View'} Cost Breakdown
                                    </button>

                                    <div className={`cost-breakdown ${isExpanded ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                                        <div className="cost-section">
                                            <div className="cost-section-label">Crew — Shoot Day</div>
                                            {pkg.crew.map((c, i) => (
                                                <div key={i} className="cost-row">
                                                    <div className="cost-item">{c.label}<span className="cost-detail">{c.detail}</span></div>
                                                    <div className="cost-amount">{fmt(c.amount)}</div>
                                                </div>
                                            ))}
                                            <div className="cost-row total">
                                                <div className="cost-item">Crew Total</div>
                                                <div className="cost-amount">{fmt(crewTotal)}</div>
                                            </div>
                                        </div>

                                        <div className="cost-section">
                                            <div className="cost-section-label">Post-Production</div>
                                            {pkg.post.map((p, i) => (
                                                <div key={i} className="cost-row">
                                                    <div className="cost-item">{p.label}<span className="cost-detail">{p.detail}{p.per ? ` — ${p.per}` : ''}</span></div>
                                                    <div className={`cost-amount ${p.free ? 'free' : ''}`}>{p.free ? 'Included' : fmt(p.amount)}</div>
                                                </div>
                                            ))}
                                            <div className="cost-row total">
                                                <div className="cost-item">Post Total</div>
                                                <div className="cost-amount">{fmt(postTotal)}</div>
                                            </div>
                                        </div>

                                        {addonTotal > 0 && (
                                            <div className="cost-section">
                                                <div className="cost-section-label">Add-Ons</div>
                                                {ADDONS.filter(a => addons[a.id]).map((a, i) => (
                                                    <div key={i} className="cost-row">
                                                        <div className="cost-item">{a.label}</div>
                                                        <div className="cost-amount">+{fmt(a.price)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="cost-section" style={{ borderTop: `1px solid var(--border-strong)`, paddingTop: 14, marginTop: 6 }}>
                                            <div className="cost-row total" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                                                <div className="cost-item">Package Total</div>
                                                <div className="cost-amount">{fmt(total)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Add-Ons ── */}
                    <div className="addons-section">
                        <div className="section-header" style={{ marginBottom: 24 }}>
                            <div className="section-label">Optional Add-Ons</div>
                            <p className="section-desc">Toggle these to add to any package. Prices update in real-time across all tiers.</p>
                        </div>

                        {ADDONS.map((addon) => (
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

                    {/* ── Next Steps ── */}
                    <div className="next-steps">
                        <div className="next-steps-title">Next steps</div>
                        <div className="next-steps-grid">
                            <div className="next-step">
                                <strong>01. Review the invoice</strong>
                                <span>Check the line-item breakdown and contract terms. Everything is detailed and ready for your sign-off.</span>
                            </div>
                            <div className="next-step">
                                <strong>02. Sign & secure the date</strong>
                                <span>Sign the agreement and submit the 50% reservation fee to lock in March 26.</span>
                            </div>
                            <div className="next-step">
                                <strong>03. Talent prep</strong>
                                <span>We&apos;ll send your interviewees a simple guide — what to wear, where to look, and what to expect on shoot day.</span>
                            </div>
                            <div className="next-step">
                                <strong>04. Shoot day</strong>
                                <span>We arrive at 9:30 AM, handle everything, and wrap by 5 PM. Your talent just needs to show up and talk.</span>
                            </div>
                        </div>

                        <div className="cta-row">
                            <a href="/proposals/leadership-interviews/invoice" className="cta-btn">
                                Review Invoice &amp; Sign →
                            </a>
                            <a href="mailto:mattworkman@mediageekz.com,danielcastillo@mediageekz.com?subject=Leadership%20Interview%20Quote%20%E2%80%94%20Confirmed&body=Hey%20Matt%20%26%20Daniel%2C%0A%0AI%27d%20like%20to%20confirm%20the%20March%2026%20leadership%20interview%20shoot.%0A%0AThanks!" className="meeting-btn">
                                Reply to Confirm →
                            </a>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── FOOTER ── */}
                <footer className="li-footer">
                    <div className="footer-logo">MediaGeekz</div>
                    <div className="footer-tagline">Cinematic stories. Elevated brands.</div>
                </footer>
            </div>
        </>
    );
}
