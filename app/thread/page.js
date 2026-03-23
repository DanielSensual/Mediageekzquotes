'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   MediaGeekz — Thread Link  ·  Enhanced Edition
   Collaborative Project Space · Winter Garden, FL
   Two-Video Shoot: Agency Promo + Local Area
   ═══════════════════════════════════════════════════════════════ */

export default function ThreadLink() {
    const [activePhase, setActivePhase] = useState('pre-production');
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

                :root {
                    --shadow: #060a14;
                    --navy: #0f1729;
                    --panel: rgba(15, 23, 42, 0.88);
                    --border: rgba(99, 102, 241, 0.16);
                    --orange: #818cf8;
                    --orange-soft: rgba(129, 140, 248, 0.12);
                    --teal: #a78bfa;
                    --teal-soft: rgba(167, 139, 250, 0.12);
                    --cream: #e2e8f0;
                    --white: #f1f5f9;
                    --muted: #94a3b8;
                    --muted-2: #64748b;
                    --muted-3: #475569;
                    --green: #22c55e;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    color: var(--cream) !important;
                    background: #060a14 !important;
                    line-height: 1.6;
                    overflow-x: hidden;
                    -webkit-font-smoothing: antialiased;
                }

                ::selection { background: rgba(99, 102, 241, 0.35); color: var(--white); }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #6366f1 0%, #818cf8 100%); border-radius: 999px; }

                .page-shell { position: relative; }

                /* ── CINEMATIC HERO ── */
                .cin-hero {
                    position: relative; min-height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden;
                }

                .cin-hero-bg {
                    position: absolute; inset: 0;
                    background: url('/thread/community.png') center/cover no-repeat;
                    filter: brightness(0.25) saturate(1.3);
                    transform: scale(1.05);
                    transition: transform 0.1s linear;
                }

                .cin-hero-overlay {
                    position: absolute; inset: 0;
                    background:
                        linear-gradient(180deg, rgba(6, 10, 20, 0.5) 0%, rgba(6, 10, 20, 0.3) 40%, rgba(6, 10, 20, 0.85) 80%, #060a14 100%),
                        radial-gradient(ellipse at 30% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
                }

                .cin-hero-content {
                    position: relative; z-index: 2;
                    text-align: center; padding: 80px 24px 100px;
                    max-width: 900px;
                }

                .hero-badge {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 10px 20px; border: 1px solid rgba(99, 102, 241, 0.35);
                    border-radius: 999px; background: rgba(15, 23, 42, 0.6);
                    color: var(--orange); font-size: 11px; font-weight: 600;
                    letter-spacing: 0.3em; text-transform: uppercase;
                    backdrop-filter: blur(16px); margin-bottom: 36px;
                }

                .hero-badge::before {
                    content: ""; width: 7px; height: 7px; border-radius: 50%;
                    background: var(--orange); box-shadow: 0 0 0 7px rgba(99, 102, 241, 0.15);
                    animation: pulse-dot 2s ease-in-out infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { box-shadow: 0 0 0 7px rgba(99, 102, 241, 0.15); }
                    50% { box-shadow: 0 0 0 14px rgba(99, 102, 241, 0.04); }
                }

                .hero-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(52px, 9vw, 110px);
                    font-weight: 800; line-height: 0.92; letter-spacing: -0.035em;
                    color: var(--white); margin-bottom: 28px;
                }

                .hero-title em {
                    font-style: normal;
                    background: linear-gradient(135deg, #e8622c, #f59e0b, #e8622c);
                    background-size: 200% auto;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 4s ease-in-out infinite;
                }

                @keyframes shimmer {
                    0%, 100% { background-position: 0% center; }
                    50% { background-position: 100% center; }
                }

                .hero-subtitle {
                    max-width: 560px; margin: 0 auto 52px;
                    color: rgba(148, 163, 184, 0.9);
                    font-size: 18px; line-height: 1.7; font-weight: 300;
                }

                .hero-meta {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
                    width: min(100%, 800px); margin: 0 auto;
                }

                .hero-stat {
                    padding: 22px 16px; border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 18px;
                    background: rgba(15, 23, 42, 0.5);
                    backdrop-filter: blur(16px);
                    transition: all 0.35s ease;
                }

                .hero-stat:hover {
                    border-color: rgba(99, 102, 241, 0.35);
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(99, 102, 241, 0.08);
                }

                .hero-stat-label {
                    color: var(--teal); font-size: 9px; font-weight: 700;
                    letter-spacing: 0.24em; text-transform: uppercase;
                }

                .hero-stat-value {
                    margin-top: 10px; color: var(--white);
                    font-family: 'Outfit', sans-serif;
                    font-size: 20px; font-weight: 700; line-height: 1.2;
                }

                .hero-stat-detail { margin-top: 5px; color: var(--muted-2); font-size: 12px; }

                @media (max-width: 640px) {
                    .hero-meta { grid-template-columns: repeat(2, 1fr); }
                    .cin-hero-content { padding: 60px 20px 80px; }
                }

                /* ── IMAGE PANELS ── */
                .img-panel {
                    position: relative;
                    width: 100%; height: 50vh; min-height: 320px;
                    overflow: hidden;
                }

                .img-panel-bg {
                    position: absolute; inset: -40px;
                    background-size: cover; background-position: center;
                    transition: transform 0.1s linear;
                }

                .img-panel-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(180deg, #060a14, rgba(6, 10, 20, 0.15) 30%, rgba(6, 10, 20, 0.15) 70%, #060a14);
                }

                .img-panel-content {
                    position: relative; z-index: 2;
                    height: 100%; display: flex; align-items: center; justify-content: center;
                    text-align: center; padding: 32px 24px;
                }

                .img-label {
                    display: inline-block; padding: 10px 20px;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 999px; backdrop-filter: blur(12px);
                    background: rgba(0, 0, 0, 0.3);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 700; letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .img-label span { color: var(--orange); }

                /* ── CONCEPT CARDS ── */
                .concept-grid {
                    display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
                    max-width: 1100px; margin: 0 auto; padding: 0 24px;
                    margin-top: -60px; position: relative; z-index: 3;
                }

                @media (max-width: 768px) { .concept-grid { grid-template-columns: 1fr; } }

                .concept-card {
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 20px; overflow: hidden;
                    background: var(--panel); backdrop-filter: blur(16px);
                    transition: all 0.35s ease;
                }

                .concept-card:hover {
                    border-color: rgba(99, 102, 241, 0.3);
                    transform: translateY(-4px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
                }

                .concept-img {
                    width: 100%; height: 220px;
                    object-fit: cover; display: block;
                    filter: brightness(0.85) saturate(1.1);
                    transition: filter 0.3s, transform 0.5s;
                }

                .concept-card:hover .concept-img {
                    filter: brightness(1) saturate(1.2);
                    transform: scale(1.03);
                }

                .concept-body { padding: 28px 24px 32px; }

                .concept-tag {
                    display: inline-block; padding: 4px 12px;
                    border-radius: 999px; font-size: 10px; font-weight: 700;
                    letter-spacing: 0.15em; text-transform: uppercase;
                    margin-bottom: 14px;
                }

                .concept-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 22px; font-weight: 700; color: var(--white);
                    margin-bottom: 10px; line-height: 1.2;
                }

                .concept-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

                /* ── Treatment Gallery ── */
                .treatment-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
                    margin-top: 32px;
                }

                @media (max-width: 768px) { .treatment-grid { grid-template-columns: 1fr; } }

                .treatment-card {
                    border-radius: 16px; overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    background: var(--panel);
                    transition: all 0.35s ease;
                }

                .treatment-card:hover {
                    border-color: rgba(99, 102, 241, 0.25);
                    transform: translateY(-3px);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
                }

                .treatment-img {
                    width: 100%; height: 200px;
                    object-fit: cover; display: block;
                    filter: brightness(0.9) saturate(1.1);
                    transition: filter 0.3s, transform 0.5s;
                }

                .treatment-card:hover .treatment-img {
                    filter: brightness(1) saturate(1.2);
                    transform: scale(1.04);
                }

                .treatment-caption {
                    padding: 16px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 600; color: var(--cream);
                }

                .treatment-type {
                    font-size: 9px; color: var(--teal); font-weight: 700;
                    letter-spacing: 0.15em; text-transform: uppercase;
                    margin-bottom: 4px;
                }

                /* ── Video Embed ── */
                .video-section {
                    max-width: 1100px; margin: 0 auto;
                    padding: 80px 24px 0;
                }

                .video-wrap {
                    position: relative; width: 100%;
                    padding-bottom: 56.25%; /* 16:9 */
                    border-radius: 20px; overflow: hidden;
                    border: 1px solid rgba(99, 102, 241, 0.15);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(99, 102, 241, 0.06);
                }

                .video-wrap iframe {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%; border: none;
                }

                .video-caption {
                    margin-top: 20px; text-align: center;
                    font-size: 13px; color: var(--muted-2);
                    font-style: italic;
                }

                .video-caption span { color: var(--orange); font-style: normal; font-weight: 600; }

                /* ── Divider ── */
                .divider {
                    width: min(100%, 900px); height: 1px; margin: 0 auto;
                    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2), transparent);
                }

                /* ── Sections ── */
                .th-section { max-width: 1100px; margin: 0 auto; padding: 80px 24px; }
                .section-header { display: grid; gap: 14px; margin-bottom: 40px; max-width: 740px; }
                .section-label { color: var(--orange); font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; }
                .section-question { color: var(--muted-2); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }

                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(36px, 5vw, 54px);
                    font-weight: 700; line-height: 1.05; color: var(--white);
                }

                .section-desc { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 640px; }

                /* ── Phase Bar ── */
                .phase-bar { display: flex; gap: 8px; margin-bottom: 48px; flex-wrap: wrap; }

                .phase-pill {
                    padding: 10px 20px; border-radius: 999px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    background: var(--panel); font-size: 12px; font-weight: 600;
                    color: var(--muted); cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex; align-items: center; gap: 8px;
                }

                .phase-pill:hover { border-color: rgba(99, 102, 241, 0.3); color: var(--cream); }

                .phase-pill.active {
                    border-color: var(--orange); background: rgba(99, 102, 241, 0.1); color: var(--orange);
                }

                .phase-dot-sm { width: 6px; height: 6px; border-radius: 50%; }

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
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
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
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 16px; margin-top: 32px;
                }

                .equip-card {
                    padding: 24px 20px; border: 1px solid rgba(139, 92, 246, 0.1);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s, transform 0.3s;
                }

                .equip-card:hover { border-color: rgba(139, 92, 246, 0.3); transform: translateY(-2px); }
                .equip-icon { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; }

                .equip-card h3 { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; color: var(--white); margin-bottom: 8px; }
                .equip-card p { font-size: 12px; color: var(--muted-2); line-height: 1.7; }
                .equip-card ul { list-style: none; margin-top: 10px; }
                .equip-card ul li { font-size: 11px; color: var(--muted-2); padding: 3px 0 3px 18px; position: relative; line-height: 1.5; }
                .equip-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--teal); font-size: 10px; }

                /* ── Deliverables Grid ── */
                .del-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }

                .del-card {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 22px 24px; border: 1px solid rgba(100, 116, 139, 0.1);
                    border-radius: 16px; background: var(--panel); transition: all 0.3s;
                }

                .del-card:hover { border-color: rgba(99, 102, 241, 0.25); transform: translateX(6px); background: rgba(99, 102, 241, 0.03); }

                .del-info { flex: 1; }
                .del-name { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; color: var(--white); }
                .del-desc { font-size: 12px; color: var(--muted-2); margin-top: 4px; }
                .del-right { display: flex; align-items: center; gap: 16px; }
                .del-eta { font-size: 12px; color: var(--muted-2); font-family: 'Outfit', sans-serif; }
                .del-status { padding: 5px 14px; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid; }

                /* ── Team ── */
                .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 32px; }

                .team-card {
                    display: flex; align-items: center; gap: 18px;
                    padding: 24px 20px; border: 1px solid rgba(100, 116, 139, 0.1);
                    border-radius: 16px; background: var(--panel); transition: border-color 0.3s, transform 0.3s;
                }

                .team-card:hover { border-color: rgba(99, 102, 241, 0.25); transform: translateY(-2px); }

                .team-avatar {
                    width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
                    background: var(--orange-soft); border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 14px; font-size: 24px;
                }

                .team-name { font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 600; color: var(--white); }
                .team-role { font-size: 12px; color: var(--muted); margin-top: 3px; }

                /* ── CTA ── */
                .cta-row { display: flex; gap: 16px; margin-top: 28px; flex-wrap: wrap; }

                .cta-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 16px 32px; border: none; border-radius: 999px; cursor: pointer;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.3); text-decoration: none;
                }

                .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(99, 102, 241, 0.4); }

                .meeting-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 16px 32px; border: 1px solid var(--teal); border-radius: 999px; cursor: pointer;
                    background: rgba(139, 92, 246, 0.08); color: var(--teal);
                    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    transition: transform 0.2s, box-shadow 0.2s, background 0.2s; text-decoration: none;
                }

                .meeting-btn:hover { transform: translateY(-2px); background: rgba(139, 92, 246, 0.14); box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2); }

                /* ── Footer ── */
                .th-footer { text-align: center; padding: 80px 24px 48px; border-top: 1px solid rgba(100, 116, 139, 0.08); }
                .footer-logo { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted-3); }
                .footer-tagline { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 300; font-style: italic; color: rgba(100, 116, 139, 0.35); margin-top: 8px; }

                /* ── Reveal ── */
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 640px) {
                    .del-right { flex-direction: column; align-items: flex-end; gap: 6px; }
                    .phase-bar { gap: 6px; }
                    .phase-pill { padding: 8px 14px; font-size: 11px; }
                    .concept-img { height: 180px; }
                }
            `}</style>

            <div className="page-shell">
                {/* ═══ CINEMATIC HERO ═══ */}
                <div className="cin-hero">
                    <div className="cin-hero-bg" style={{ transform: `scale(1.05) translateY(${scrollY * 0.15}px)` }} />
                    <div className="cin-hero-overlay" />
                    <div className="cin-hero-content">
                        <div className="hero-badge">MediaGeekz × ThreadLink</div>
                        <h1 className="hero-title">
                            Create.<br /><em>Connect.</em><br />Grow.
                        </h1>
                        <p className="hero-subtitle">
                            A creative collaboration between MediaGeekz and ThreadLink — a strategic web design &amp; branding studio rooted in Clermont, FL. Two cinematic films to showcase the creative agency and connect with the community.
                        </p>

                        <div className="hero-meta">
                            <div className="hero-stat">
                                <div className="hero-stat-label">Project</div>
                                <div className="hero-stat-value">2 Videos</div>
                                <div className="hero-stat-detail">Local Market + National</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Shoot Date</div>
                                <div className="hero-stat-value">Mid-April</div>
                                <div className="hero-stat-detail">Weekend shoot</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Format</div>
                                <div className="hero-stat-value">Multi-Cam</div>
                                <div className="hero-stat-detail">Local connect + brand film</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Location</div>
                                <div className="hero-stat-value">Clermont</div>
                                <div className="hero-stat-detail">FL · On-Location</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ CLIENT PROFILE — THREADLINK ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Client Profile</div>
                        <div className="section-question">Who we&apos;re creating for</div>
                        <h2 className="section-title">ThreadLink</h2>
                        <p className="section-desc">
                            A strategic web design &amp; branding studio rooted in Clermont, Florida — serving businesses from the Orlando area to clients across the U.S.
                        </p>
                    </div>

                    {/* Logo + Brand Identity */}
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
                        <div style={{ background: '#111', borderRadius: 16, padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <img src="https://cdn.prod.website-files.com/6556499e67d676543a981f3c/68b18b947aae8a1c4f263916_WHITE-ThreadLink-Container-Logo.png" alt="ThreadLink Logo" style={{ height: 36 }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>mythreadlink.com</div>
                            <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>
                                📍 17011 SR-50 Suite 201, Clermont FL 34711 · 📞 (407) 664-1287
                            </div>
                        </div>
                        <a href="https://mythreadlink.com" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 20px', borderRadius: 999, background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Visit Site →</a>
                    </div>

                    {/* Key Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
                        {[
                            { label: 'Founded', value: 'Clermont, FL', icon: '📍' },
                            { label: 'Specialization', value: 'Web Design + Branding', icon: '🎨' },
                            { label: 'Awards', value: 'Best of South Lake 2023-2025', icon: '🏆' },
                            { label: 'Portfolio', value: '20+ Clients', icon: '📂' },
                            { label: 'Tools', value: 'Figma → Webflow', icon: '⚙️' },
                            { label: 'Reach', value: 'Local + Nationwide', icon: '🌐' },
                        ].map((d, i) => (
                            <div key={i} style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                                <div style={{ fontSize: 18, marginBottom: 6 }}>{d.icon}</div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 4 }}>{d.label}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>{d.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Services */}
                    <div style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>Services Offered</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {['UI Design', 'UX Design', 'SEO', '3D', 'Consulting', 'Stylescapes', 'Logo Design', 'Brand Guidelines', 'Marketing Strategy', 'Custom Websites'].map((s, i) => (
                                <span key={i} style={{ padding: '5px 14px', borderRadius: 999, background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.15)', color: 'var(--cream)', fontSize: 11, fontWeight: 500 }}>{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Process Flow */}
                    <div style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>Their Process (What the Videos Should Showcase)</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                            {['Discovery', 'Strategy', 'Stylescapes', 'Wireframing', 'Prototyping', 'Development', 'Testing', 'Launch & Beyond'].map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ padding: '6px 14px', borderRadius: 10, background: i === 0 ? 'rgba(99, 102, 241, 0.15)' : 'var(--panel)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: 11, fontWeight: 600, color: i === 0 ? 'var(--orange)' : 'var(--cream)' }}>{step}</span>
                                    {i < 7 && <span style={{ color: 'var(--muted-3)', fontSize: 10 }}>→</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Portfolio Highlights */}
                    <div style={{ padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', marginBottom: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Notable Clients</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {['Paladin HealthCare', 'South Lake Chamber', 'SunCoast Eco-Tours', 'Pain Free Orlando', 'Powell Studio Architecture', 'Renovation Outdoors', '4Sight Labs', 'OnlyinClermont', 'Ovosk Medspa', 'Rapid Environmental'].map((c, i) => (
                                <span key={i} style={{ padding: '4px 12px', borderRadius: 8, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: 10, color: 'var(--muted)', fontWeight: 500 }}>{c}</span>
                            ))}
                        </div>
                    </div>

                    {/* Brand Positioning Quote */}
                    <div style={{ padding: '24px', border: '1px solid rgba(99, 102, 241, 0.12)', borderRadius: 16, background: 'rgba(99, 102, 241, 0.03)', borderLeft: '3px solid var(--orange)' }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            &quot;We partner with industries that build our communities, delivering purpose-driven web design and cohesive branding solutions engineered to fuel growth and empower your business.&quot;
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--muted-2)', fontWeight: 600 }}>— mythreadlink.com</div>
                    </div>
                </section>

                <div className="divider" />

                <div className="concept-grid reveal">
                    <div className="concept-card">
                        <div style={{ overflow: 'hidden' }}>
                            <img className="concept-img" src="/thread/community.png" alt="Winter Garden community" />
                        </div>
                        <div className="concept-body">
                            <div className="concept-tag" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--orange)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                                📹 Video 1 — Local Market
                            </div>
                            <div className="concept-name">Winter Garden Community Film</div>
                            <div className="concept-desc">
                                Family-friendly, community-first. Your creative agency rooted in Winter Garden — local landmarks, familiar faces, neighborhood energy. Show the community you&apos;re one of them. Built to connect with locals.
                            </div>
                        </div>
                    </div>
                    <div className="concept-card">
                        <div style={{ overflow: 'hidden' }}>
                            <img className="concept-img" src="/thread/screen-work.png" alt="Creative agency at work" />
                        </div>
                        <div className="concept-body">
                            <div className="concept-tag" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--teal)', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
                                📹 Video 2 — National Level
                            </div>
                            <div className="concept-name">Creative Agency Film</div>
                            <div className="concept-desc">
                                National-level creative showcase — the design process, the tools, the craft. Apple Pencil on iPad, designers at their screens, the creative energy that drives everything. Not a brand agency — a creative powerhouse.
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ CREATIVE TREATMENT — SHOT GALLERY ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Creative Treatment</div>
                        <div className="section-question">The shots that tell the story</div>
                        <h2 className="section-title">Visual direction for both films</h2>
                        <p className="section-desc">
                            These reference frames set the tone for each video — family-friendly local energy for Video 1, tight creative process shots for Video 2.
                        </p>
                    </div>

                    <div className="treatment-grid">
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/community.png" alt="Community scene" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Video 1 · Local</div>
                                Community Walk — Families, storefronts, farmer&apos;s market
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/apple-pencil.png" alt="Apple Pencil on iPad" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Video 2 · Tight Shot</div>
                                Apple Pencil — The creative tool in motion
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/screen-work.png" alt="Designer at screen" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Video 2 · OTS</div>
                                Screen Work — Designer reviewing creative layouts
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/winter-garden.png" alt="Winter Garden aerial" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Video 1 · Drone</div>
                                Aerial Reveal — Downtown Winter Garden at golden hour
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/production-bts.png" alt="Production crew" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Both · BTS</div>
                                Behind the Scenes — Cinema-grade production setup
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/agency-hero.png" alt="Agency workspace" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Video 2 · Wide</div>
                                Team Collaboration — The creative workspace energy
                            </div>
                        </div>
                    </div>
                </section>
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Creative Direction</div>
                        <div className="section-question">From our meeting — the vision for both films</div>
                        <h2 className="section-title">Organic. Cinematic. Real.</h2>
                        <p className="section-desc">
                            Not a generic corporate promo. These films need to feel human — like you&apos;re watching a story, not a sales pitch. The brand is there, but it&apos;s never shoved in your face. Think Publix commercials — you don&apos;t feel &quot;come buy groceries.&quot; You feel family. Quality. Connection.
                        </p>
                    </div>

                    {/* Creative Pillars */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 48 }}>
                        {[
                            { icon: '🎬', title: 'Screen to Street', desc: 'The magic transition — what\'s happening on the computer comes alive in the real world. Monster truck on screen → monster truck driving in real life. The brand in action, not just in pixels.' },
                            { icon: '🏠', title: 'Publix Energy', desc: 'Subtle brand placement. Logo on the coffee cup, brand colors in the background, tagline on the wall — never the hero of the shot, always part of the environment. You feel it without being told.' },
                            { icon: '🤝', title: 'Human Connection', desc: 'Real conversations. Real handshakes. Team sitting with clients, not performing for camera. The authenticity that makes people trust you before they ever call.' },
                            { icon: '❤️', title: 'This Is Personal', desc: 'When a client is struggling, you scale their spend down. You tell them to save money. You want them to make it — and you do everything to set the stage. Not a conglomerate. A family.' },
                            { icon: '📞', title: 'Always Pick Up', desc: 'Someone calls the office, someone answers. Email at 1am because the thought just hit? Send it. Don\'t wait. The commitment is visible — clients feel it before they ever sign.' },
                            { icon: '📣', title: 'Social Media By Demand', desc: 'Two clients literally handed over budgets and said "you\'re doing our social media." It wasn\'t the plan — but when clients demand you carry the vision forward, you step up. That\'s how the service was born.' },
                            { icon: '🚀', title: 'Built for Entrepreneurs', desc: 'Not every business. Entrepreneurs ready to scale — ready to break through the glass ceiling. The ones who want discovery, branding, web, SEO, ads, social — the full stack.' },
                            { icon: '🎨', title: 'Creative, Not Corporate', desc: 'Apple Pencil on iPad. Wireframes on whiteboards. Logo iterations on screen. Show the craft — this is a creative agency, not a suit-and-tie consulting firm.' },
                            { icon: '♻️', title: 'We Don\'t Drop You Off', desc: 'The full journey: 3-4 hour discovery → branding → website → SEO → ads → social media. Uniformed. Every touchpoint connected. The website actually converts, actually works for their business.' },
                            { icon: '📺', title: 'Brady Bunch Remote Team', desc: 'The remote creative team appears in a split-screen grid — cinema-lit, like a Zoom meeting shot with real equipment. 2-3 seconds. Connects the viewer to the full team, not just the local office.' },
                        ].map((p, i) => (
                            <div key={i} style={{ padding: '24px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{p.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>{p.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Key Quote */}
                    <div style={{ padding: '32px', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: 20, background: 'rgba(99, 102, 241, 0.04)', borderLeft: '3px solid var(--orange)', marginBottom: 16 }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            &quot;Whatever we&apos;re doing creatively, you see it in the real world. I want that connection. The brand in action — textile, tangible, actually happening. Not AI-generated stories. Real ones.&quot;
                        </div>
                        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--muted-2)', fontWeight: 600 }}>— From the creative meeting</div>
                    </div>

                    {/* Second Quote */}
                    <div style={{ padding: '32px', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: 20, background: 'rgba(139, 92, 246, 0.03)', borderLeft: '3px solid var(--teal)', marginBottom: 16 }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            &quot;This is personal for us. We want you to make it. And we&apos;re going to do everything we can to set the stage for you. You&apos;re still going to have to sell. This is your business. But we will set the stage.&quot;
                        </div>
                        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--muted-2)', fontWeight: 600 }}>— From the creative meeting</div>
                    </div>

                    {/* North Dakota Story */}
                    <div style={{ padding: '20px 24px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', marginBottom: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>📍 Proof It Works — Without Video</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                            A client in <strong style={{ color: 'var(--cream)' }}>North Dakota</strong> found you by searching &quot;creative agency near me&quot; — and called because of your reviews and the <em>feeling</em> she got from the website alone. She said she&apos;d been pushed around by agencies for years and couldn&apos;t get anyone on the phone. You haven&apos;t had a single video until now. Imagine what happens when you do.
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ STORYBOARD / SCRIPT ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Storyboard &amp; Script</div>
                        <div className="section-question">Beat-by-beat narrative for each film</div>
                        <h2 className="section-title">The story we&apos;re telling</h2>
                        <p className="section-desc">
                            Each video follows a narrative arc — not a list of shots, but a story with emotional beats. Organic pacing, cinematic quality, human connection throughout.
                        </p>
                    </div>

                    {/* Video 1 Script */}
                    <div style={{ marginBottom: 64 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                            <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                📹 Video 1 — Local Market
                            </div>
                            <div style={{ fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--white)' }}>Winter Garden Community Film</div>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24, maxWidth: 640, padding: '12px 16px', borderLeft: '2px solid rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.03)', borderRadius: '0 12px 12px 0' }}>
                            <strong style={{ color: 'var(--orange)' }}>Tone:</strong> Warm, organic, family-friendly. Like a Publix commercial — you feel quality, community, and trust. The brand is in the background, never the pitch.
                        </div>

                        <div style={{ display: 'grid', gap: 12 }}>
                            {[
                                { beat: 'OPEN', title: 'Morning in Winter Garden', desc: 'Drone rises over downtown at golden hour. String lights still on from the night before. A family walks past the Garden Theatre. You hear ambient sound — birds, distant laughter, a door chime. This is home.', time: '0:00–0:08' },
                                { beat: 'ACT 1', title: 'The People', desc: 'A barista hands over a coffee — logo on the cup is subtle, in the background. A shop owner flips her "OPEN" sign. Kids run past a mural. The team walks through Plant Street, waving at someone they know. It\'s all real. Nobody\'s performing.', time: '0:08–0:20' },
                                { beat: 'TRANSITION', title: 'Screen to Street', desc: 'CUT TO: a hand scrolling through a website on an iPad in a coffee shop. The website shows a local business storefront. MATCH CUT: we\'re now standing in front of that actual storefront. The digital becomes real. The brand made this happen.', time: '0:20–0:28' },
                                { beat: 'ACT 2', title: 'The Work in Action', desc: 'Team sitting with a local entrepreneur at their business — not in a boardroom, at their shop counter. Laughing, pointing at a laptop showing their new branding. The client\'s kid runs through. It\'s organic. You see the logo on a business card being handed over. Subtle. Real.', time: '0:28–0:42' },
                                { beat: 'MONTAGE', title: 'The Community Texture', desc: 'Quick cuts: a hand-lettered chalkboard menu, a dog on a leash, fresh produce at the market, a couple holding hands walking past storefronts, the team photographing a local restaurant. Every frame has warmth. The brand colors appear — on signage, on a tote bag, on a mug — but never as the subject.', time: '0:42–0:55' },
                                { beat: 'CLOSE', title: 'We\'re Here', desc: 'The team walks back toward the office at sunset. One of them turns back and waves. Drone pulls back to reveal the full downtown. Super: "ThreadLink Creative — Winter Garden, FL" — clean, minimal, on screen for 3 seconds. No CTA. No "call us." Just the name and the place. They\'ll remember.', time: '0:55–1:05' },
                            ].map((b, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '20px', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: 14, background: 'var(--panel)', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 60, textAlign: 'center' }}>
                                        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 4 }}>{b.beat}</div>
                                        <div style={{ fontSize: 10, color: 'var(--muted-3)', fontFamily: "'Outfit', sans-serif" }}>{b.time}</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>{b.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>{b.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video 2 Script */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                            <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)', color: 'var(--teal)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                📹 Video 2 — National Level
                            </div>
                            <div style={{ fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--white)' }}>Creative Agency Film</div>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24, maxWidth: 640, padding: '12px 16px', borderLeft: '2px solid rgba(139, 92, 246, 0.3)', background: 'rgba(139, 92, 246, 0.03)', borderRadius: '0 12px 12px 0' }}>
                            <strong style={{ color: 'var(--teal)' }}>Tone:</strong> Premium, cinematic, but still human. Show the creative process — the craft, the tools, the team. This is a creative agency that takes entrepreneurs from zero to scale. Not a brand factory — a partner.
                        </div>

                        <div style={{ display: 'grid', gap: 12 }}>
                            {[
                                { beat: 'OPEN', title: 'The Craft', desc: 'TIGHT: Apple Pencil touches iPad screen. A logo sketch comes alive. Pull back to reveal a designer in a warm studio, coffee within reach, natural light. It\'s quiet. Intentional. This is where ideas start.', time: '0:00–0:08' },
                                { beat: 'ACT 1', title: 'Discovery', desc: 'The team sits across from a client at a table — not a pitch, a discovery. 3-4 hours of "what does your business actually need?" Whiteboard behind them covered in strategy. Laptop open showing wireframes. You feel the depth. This isn\'t a quick-fix agency.', time: '0:08–0:22' },
                                { beat: 'TEAM', title: 'The Brady Bunch', desc: 'SPLIT SCREEN: 6 faces appear in a grid — the full creative leadership team. Three in the office, three remote, each cinema-lit in their own space. They\'re in a meeting, laughing, pointing at their screens. 2-3 seconds. Shows that the connection doesn\'t stop at city limits. The team is everywhere.', time: '0:22–0:26' },
                                { beat: 'TRANSITION', title: 'Screen to Street', desc: 'OTS: a designer finishes a website mockup on screen. The client\'s product is right there in the design. MATCH CUT: we\'re at the client\'s actual location — an entrepreneur standing in front of their business, the new logo on the window. Digital to tangible.', time: '0:26–0:34' },
                                { beat: 'ACT 2', title: 'Full Stack', desc: 'QUICK CUTS synced to music: Apple Pencil sketching a logo → final logo on a business card. Wireframe on screen → live website on a phone. Camera filming a product → the ad playing on Instagram. SEO dashboard showing rankings climbing. Each cut shows: they deployed it, and it\'s working.', time: '0:34–0:50' },
                                { beat: 'PERSONAL', title: 'This Is Personal', desc: 'QUIET MOMENT: the team leader on a call with a client, genuinely invested. Not upselling — listening. Maybe they\'re scaling the budget down because the client needs it. The care is visible. This isn\'t transactional. They want you to make it.', time: '0:50–0:58' },
                                { beat: 'BRAND IN ACTION', title: 'The Real World', desc: 'The client\'s business is alive — customers walking in, new signage, branded packaging. The team is there too, filming, supporting. Logo on the cup. Brand on the apron. It\'s everywhere, but it\'s natural. They didn\'t drop them off.', time: '0:58–1:08' },
                                { beat: 'CLOSE', title: 'The Partner', desc: 'Team and client together, reviewing analytics on a laptop. Both smiling — it\'s working. Not a vendor relationship — a partnership. Pull back. The full leadership team at their desks, golden hour light. Super: "ThreadLink Creative — Full-Stack Creative Agency" — 3 seconds, clean, confident. Cut to black.', time: '1:08–1:18' },
                            ].map((b, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '20px', border: '1px solid rgba(139, 92, 246, 0.08)', borderRadius: 14, background: 'var(--panel)', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 60, textAlign: 'center' }}>
                                        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: 4 }}>{b.beat}</div>
                                        <div style={{ fontSize: 10, color: 'var(--muted-3)', fontFamily: "'Outfit', sans-serif" }}>{b.time}</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>{b.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>{b.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ VISION — REFERENCE VIDEO ═══ */}
                <section className="video-section reveal">
                    <div className="section-header">
                        <div className="section-label">Reference</div>
                        <h2 className="section-title">Cinematic quality benchmark</h2>
                        <p className="section-desc">
                            The production value we&apos;re matching — but with more heart, more connection, and more authenticity than a typical agency reel.
                        </p>
                    </div>
                    <div className="video-wrap">
                        <iframe
                            src="https://www.youtube.com/embed/wpo7lzDhiAw?rel=0&modestbranding=1&color=white"
                            title="Creative Agency Film — Style Reference"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="video-caption">
                        <span>Quality Reference</span> — Our films will have this production value, but with real human connection, not just style
                    </div>
                </section>

                {/* ═══ SHOT LIST ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Shot List</div>
                        <div className="section-question">From the storyboard — every shot planned</div>
                        <h2 className="section-title">The shots that make it real</h2>
                        <p className="section-desc">
                            Based on the &quot;Screen to Street&quot; concept — every shot bridges the creative process to the real-world impact. Organic, never staged.
                        </p>
                    </div>

                    {/* Video 1 Shot List */}
                    <div style={{ marginBottom: 56 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                📹 Video 1 — Local Market
                            </div>
                            <div style={{ fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--white)' }}>Winter Garden Community Film</div>
                        </div>

                        <div style={{ display: 'grid', gap: 10 }}>
                            {[
                                { shot: 'Golden Hour Drone Rise', type: 'Drone', desc: 'Downtown Winter Garden at sunrise/sunset. String lights, tree canopy, the Garden Theatre sign. Establishes warmth and place.' },
                                { shot: 'Community Walk — Families', type: 'Gimbal', desc: 'Family walking past storefronts at Plant Street Market. Kids laughing, dog on a leash. Organic, not directed.' },
                                { shot: 'Branded Coffee Cup', type: 'Insert / Macro', desc: 'Logo-on-cup moment — someone takes a sip at a local café. Brand is there but it\'s not the subject. Publix energy.' },
                                { shot: 'Local Shop Owner Wave', type: 'Medium', desc: 'A real shopkeeper flipping their OPEN sign. Team member waves through the window. Community connection.' },
                                { shot: 'Screen to Street — Website', type: 'Match Cut', desc: 'iPad showing a client\'s website → match cut to standing in front of that actual business. Digital becomes real.' },
                                { shot: 'Client Meeting at Their Shop', type: 'Handheld', desc: 'Team and local entrepreneur at the shop counter — laughing, pointing at a laptop with their new branding. Kid runs through. Organic chaos.' },
                                { shot: 'Business Card Handover', type: 'Close-Up', desc: 'New branded business card being handed to a customer. You see the logo, the design work — it\'s tangible. The brand in textile.' },
                                { shot: 'Farmer\'s Market B-Roll', type: 'Gimbal + Slider', desc: 'Fresh produce, hand-lettered signs, families browsing. Intercut with team photographing a client\'s booth.' },
                                { shot: 'Sunset Walk Back', type: 'Gimbal', desc: 'Team walking back toward the office at golden hour. One turns and waves. Natural, warm, unscripted.' },
                                { shot: 'Drone Pull-Back Close', type: 'Drone', desc: 'Final wide — revealing the full downtown from above. Super: "ThreadLink Creative — Winter Garden, FL." 3 seconds. Cut to black.' },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 20px', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: 14, background: 'var(--panel)', transition: 'all 0.3s', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--orange)', fontFamily: "'Outfit', sans-serif" }}>{i + 1}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{s.shot}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(139, 92, 246, 0.2)', background: 'rgba(139, 92, 246, 0.06)' }}>{s.type}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.6 }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video 2 Shot List */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)', color: 'var(--teal)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                📹 Video 2 — National Level
                            </div>
                            <div style={{ fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--white)' }}>Creative Agency Film</div>
                        </div>

                        <div style={{ display: 'grid', gap: 10 }}>
                            {[
                                { shot: 'Apple Pencil on iPad', type: 'Macro', desc: 'Extreme tight: stylus meets screen, a logo comes to life. Pull back to reveal the designer in a cozy studio. Coffee steam. Natural light. This is where it starts.' },
                                { shot: 'Discovery Meeting', type: 'Medium / OTS', desc: 'Team across from client at a table. Whiteboard covered in strategy behind them. 3-4 hour discovery — you see the depth. This isn\'t a 30-minute consult.' },
                                { shot: 'Wireframe Close-Up', type: 'Macro / Slider', desc: 'Tight on screen: wireframe for a client\'s website. User flows, component layouts. The architecture before the beauty.' },
                                { shot: 'Screen to Street — Logo', type: 'Match Cut', desc: 'Logo design on screen → match cut to that logo on a real building sign, on a coffee cup, on a business card. Digital becomes physical.' },
                                { shot: 'Full-Stack Montage', type: 'Quick Cuts', desc: 'Apple Pencil → business card. Wireframe → live site on phone. Camera filming → ad on Instagram. SEO dashboard climbing. Each cut = they deployed it, and it\'s working.' },
                                { shot: 'Client\'s Business Alive', type: 'Gimbal', desc: 'Walk through the client\'s transformed business — customers at the counter, branded packaging, new signage. The team is there too, filming, supporting. They didn\'t leave.' },
                                { shot: 'Branded Elements in Environment', type: 'Insert', desc: 'Logo on the apron. Brand colors on the wall. Tagline on the website open on a laptop. Never the hero — always the texture. Starbucks-cup energy.' },
                                { shot: 'Analytics Review — Both Smiling', type: 'Medium', desc: 'Team and client looking at a laptop together. Numbers going up. Both genuinely happy. Partnership, not a vendor call.' },
                                { shot: 'Team at Work — Golden Hour', type: 'Wide / Slider', desc: 'Pull back to the full team at their desks. Warm light. Multiple screens showing active projects. The engine behind it all.' },
                                { shot: 'Logo Resolve', type: 'Motion Graphics', desc: '"ThreadLink Creative — Full-Stack Creative Agency" — clean on black. 3 seconds. No CTA. Confidence. Cut to black.' },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 20px', border: '1px solid rgba(139, 92, 246, 0.08)', borderRadius: 14, background: 'var(--panel)', transition: 'all 0.3s', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--teal)', fontFamily: "'Outfit', sans-serif" }}>{i + 1}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{s.shot}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(99, 102, 241, 0.2)', background: 'rgba(99, 102, 241, 0.06)' }}>{s.type}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.6 }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ ON-CAMERA TALENT ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">On-Camera Talent</div>
                        <div className="section-question">Creative leadership team — 6 people</div>
                        <h2 className="section-title">The faces of the brand</h2>
                        <p className="section-desc">
                            The leadership team that will be on camera. Three in the office, three remote (Brady Bunch split-screen). Blood, sweat, and tears in every project — you&apos;ll see that on screen.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
                        {[
                            { name: 'Lead 1', role: 'Creative Director', location: '📍 In Office', color: 'var(--orange)' },
                            { name: 'Ashley', role: 'Co-Founder / Strategy', location: '📍 In Office', color: 'var(--orange)' },
                            { name: 'Saraw', role: 'Creative Team', location: '📍 In Office', color: 'var(--orange)' },
                            { name: 'Sebastian', role: 'Creative Team', location: '🌐 Remote', color: 'var(--teal)' },
                            { name: 'Andre', role: 'Creative Team', location: '🌐 Remote — Spain', color: 'var(--teal)' },
                            { name: 'Andrea', role: 'Creative Team', location: '🌐 Remote', color: 'var(--teal)' },
                        ].map((t, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', textAlign: 'center', transition: 'all 0.3s' }}>
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${t.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 22 }}>
                                    {i < 3 ? '🎯' : '📺'}
                                </div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 8 }}>{t.role}</div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.color, padding: '3px 10px', borderRadius: 999, border: `1px solid ${t.color}30`, background: `${t.color}08`, display: 'inline-block' }}>{t.location}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 24, padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--cream)' }}>📺 Brady Bunch Shot:</strong> The 3 remote team members appear in a cinema-lit split-screen grid — like a Zoom meeting, but shot with real cameras and proper lighting. 2-3 seconds in the video. Shows that the full team is connected regardless of location. The remote members will record their footage independently with lighting direction from us.
                    </div>
                </section>

                {/* ═══ BRAND PALETTE ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Brand Palette</div>
                        <div className="section-question">Indigo — Minimal, clean, desaturated</div>
                        <h2 className="section-title">Color direction for the films</h2>
                        <p className="section-desc">
                            The brand is indigo. Not pink, not bubblegum — pure indigo with a minimal aesthetic. Color grading will be desaturated and balanced. The palette informs set design, wardrobe, LED accents, and post-production color work.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                        {[
                            { color: '#0f172a', label: 'Background' },
                            { color: '#1e1b4b', label: 'Deep Indigo' },
                            { color: '#312e81', label: 'Indigo Dark' },
                            { color: '#4338ca', label: 'Indigo Core' },
                            { color: '#4f46e5', label: 'Indigo Brand' },
                            { color: '#6366f1', label: 'Indigo Vivid' },
                            { color: '#818cf8', label: 'Indigo Light' },
                            { color: '#e2e8f0', label: 'Clean White' },
                        ].map((c, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ width: 56, height: 56, borderRadius: 14, background: c.color, border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: 6 }} />
                                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--muted-2)', letterSpacing: '0.05em' }}>{c.label}</div>
                                <div style={{ fontSize: 8, color: 'var(--muted-3)', fontFamily: "'Outfit', sans-serif" }}>{c.color}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ height: 8, borderRadius: 999, background: 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 15%, #312e81 30%, #4338ca 45%, #4f46e5 55%, #6366f1 70%, #818cf8 85%, #e2e8f0 100%)', marginBottom: 20 }} />

                    <div style={{ padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--cream)' }}>Color Grading Approach:</strong> Desaturated, clean, balanced. Raw footage starts gray — we shape it to feel minimal and intentional. Indigo accents via RGB LED lights in the background, not overlaid in post. The brand color lives in the environment, not a filter.
                    </div>
                </section>

                {/* ═══ CREATIVE LOCATIONS ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Creative Locations</div>
                        <div className="section-question">Where we&apos;re shooting</div>
                        <h2 className="section-title">Locations &amp; set design</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                        {[
                            { icon: '🏢', title: 'The Office', desc: 'Small but workable — tight shots, bokeh, ultra-wide slider between laptops. We\'ll rearrange furniture, center the table, keep it tight enough that it feels intentional. Indigo RGB LEDs in the background for brand color accents.' },
                            { icon: '🤝', title: 'Conference Room', desc: 'Discovery meetings, client presentations, strategy sessions. The depth of the process visible. Tables can be moved, glass whiteboard down. Good depth for interviews.' },
                            { icon: '🚧', title: 'Construction Site', desc: 'Client location — wear the helmets, show you\'re out there working hard. It shows range: you\'re not just behind a screen, you\'re embedded in the client\'s world.' },
                            { icon: '🏡', title: 'Client Businesses', desc: 'On-site at client locations. Show them in their element. The team is there with them — cameras in hand, building together. Need confirmed time slots, not run-and-gun.' },
                            { icon: '🌅', title: 'Downtown Winter Garden', desc: 'Plant Street, clock tower, train in the background. Recognizable but not center-stage — a couple seconds of local texture. Background should be identifiable but we\'re not under the clock tower posing.' },
                            { icon: '🌿', title: 'Artificial Grass Area', desc: 'Unique creative shots — unexpected texture, fun energy. Shows personality in the space. Quick moments, not a main location.' },
                        ].map((loc, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{loc.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{loc.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{loc.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                        <div style={{ padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                            <strong style={{ color: 'var(--cream)' }}>☀️ Outdoor Lighting:</strong> Extra crew member needed for outdoor shots. Butterfly softbox setup (large diffusion frame) to control harsh sunlight. Best when slightly cloudy. Time-sensitive — tight schedule for outdoor scenes.
                        </div>
                        <div style={{ padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                            <strong style={{ color: 'var(--cream)' }}>📱 BTS Content:</strong> Entire shoot process documented with iPhones + pro cameras. BTS becomes its own social media asset. Creative behind-the-scenes showing the journey, not just final product.
                        </div>
                    </div>

                    <div style={{ marginTop: 12, padding: '12px 16px', border: '1px solid rgba(234, 179, 8, 0.15)', borderRadius: 10, background: 'rgba(234, 179, 8, 0.03)', fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                        ⚠️ <strong style={{ color: '#eab308' }}>Permits:</strong> May be needed for outdoor shooting with professional equipment. Public spaces are generally fine for handheld, but butterfly softboxes and full rigs could draw attention. Locations need to be confirmed and locked before shoot day.
                    </div>
                </section>

                {/* ═══ POST-PRODUCTION NOTES ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Post-Production</div>
                        <div className="section-question">Sound, text, and color</div>
                        <h2 className="section-title">Finishing the story</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                        {[
                            { icon: '🎧', title: 'Sound Design', desc: 'Custom sound design layered under the visuals. Ambient textures, subtle transitions, emotional scoring. Not stock music — a designed soundscape.' },
                            { icon: '📝', title: 'Selective Text Overlays', desc: 'Text at key moments when someone is speaking — not oversaturated captions everywhere. Specific words and phrases that need to land. Clean, minimal, on-brand typography.' },
                            { icon: '🎨', title: 'Desaturated Color Grade', desc: 'Indigo palette integrated through the grade — not shoved in, not loud. Balanced, clean, calm. The footage starts gray and gets shaped to feel minimal and intentional.' },
                            { icon: '✂️', title: 'Pacing &amp; Rhythm', desc: 'Organic pacing. Some moments breathe slowly (discovery, personal connection), others hit fast (full-stack montage, screen-to-street cuts). The edit matches the emotional arc.' },
                        ].map((p, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{p.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ WARDROBE DIRECTION ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Wardrobe</div>
                        <div className="section-question">What to wear on shoot day</div>
                        <h2 className="section-title">Wardrobe direction</h2>
                        <p className="section-desc">
                            Brand colors present but not forced. No company logo shirts — that&apos;s too corporate. The indigo should live subtly in the clothing. Final wardrobe choices need to be decided before the shoot.
                        </p>
                    </div>

                    {/* Colors to avoid vs prefer */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>✅ Preferred Colors</div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {[
                                    { color: '#111', label: 'Black' },
                                    { color: '#fff', label: 'White' },
                                    { color: '#4f46e5', label: 'Indigo' },
                                    { color: '#eab308', label: 'Yellow accent' },
                                ].map((c, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: c.color, border: '1px solid rgba(255,255,255,0.15)', marginBottom: 4 }} />
                                        <div style={{ fontSize: 8, color: 'var(--muted-2)' }}>{c.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 10 }}>🚫 Avoid</div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {[
                                    { color: '#f5f0e1', label: 'Cream' },
                                    { color: '#14b8a6', label: 'Turquoise' },
                                    { color: '#3b82f6', label: 'Blues' },
                                    { color: 'repeating-linear-gradient(45deg, #666, #666 5px, #888 5px, #888 10px)', label: 'Patterns' },
                                ].map((c, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: c.color, border: '1px solid rgba(255,255,255,0.15)', marginBottom: 4, position: 'relative', overflow: 'hidden' }}>
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: 18, fontWeight: 700 }}>×</div>
                                        </div>
                                        <div style={{ fontSize: 8, color: 'var(--muted-2)' }}>{c.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                        {[
                            { icon: '👔', title: 'Indigo Accents', desc: 'Indigo blazer, striped shirt, subtle tones. Yellow as a subtle pop — like peeking from under a coat. The brand color should be present but not screaming.' },
                            { icon: '🚫', title: 'No Logo Shirts', desc: 'No company name shirts. That reads corporate, not creative. Let the visuals and environment do the branding — the clothes should feel personal.' },
                            { icon: '🎨', title: 'Collateral Materials', desc: 'ThreadLink can provide collateral — branded materials at wholesale pricing. Maybe custom pins with the indigo icon. Subtle brand touches in accessories and props.' },
                            { icon: '✨', title: 'Clean & Intentional', desc: 'Professional but approachable. Not suits. Not hoodies. The sweet spot between polished and real. The clothing matches the brand — minimal, premium, purposeful.' },
                            { icon: '💄', title: 'No Makeup Artist Needed', desc: 'Keeping it natural and authentic. No glam. The team should look like themselves — real, not produced. Just make sure hair and grooming are sharp.' },
                        ].map((w, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{w.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{w.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{w.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ MESSAGING & KEY WORDS ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Messaging</div>
                        <div className="section-question">The words that carry the video</div>
                        <h2 className="section-title">Key words &amp; phrases</h2>
                        <p className="section-desc">
                            The video needs a unifying word or phrase that threads through everything — the way you speak, the visuals, the energy. Viewers must walk away knowing exactly what this company does and what it stands for.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                        {['Connection', 'Empowerment', 'Purpose-Driven', 'Community', 'Building', 'Family', 'Growth', 'Authenticity'].map((word, i) => (
                            <span key={i} style={{ padding: '8px 20px', borderRadius: 999, background: i < 2 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.04)', border: '1px solid ' + (i < 2 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.08)'), color: i < 2 ? 'var(--orange)' : 'var(--cream)', fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{word}</span>
                        ))}
                    </div>

                    <div style={{ padding: '24px', border: '1px solid rgba(99, 102, 241, 0.12)', borderRadius: 16, background: 'rgba(99, 102, 241, 0.03)', borderLeft: '3px solid var(--orange)', marginBottom: 16 }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            &quot;Certain words and the way you say things is going to be honestly more important than some of the visuals we may shoot. That&apos;s where the authenticity is going to come from, not the creative shots.&quot;
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--muted-2)', fontWeight: 600 }}>— Daniel, from the meeting</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>✅ Must Come Across</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2 }}>
                                <li>We know exactly what ThreadLink does</li>
                                <li>They build relationships, not transactions</li>
                                <li>Your brand IS their brand — they invest personally</li>
                                <li>Results matter more than aesthetics</li>
                                <li>They don&apos;t drop you off after delivery</li>
                            </ul>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 8 }}>🚫 Avoid</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2 }}>
                                <li>Looking like a corporate conglomerate</li>
                                <li>Feeling muddy — unclear about services</li>
                                <li>Over-listing services unnaturally</li>
                                <li>Teleprompter energy — stiff, rehearsed</li>
                                <li>Too many locations that dilute the story</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ═══ ON-CAMERA APPROACH ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">On-Camera</div>
                        <div className="section-question">How we capture authenticity</div>
                        <h2 className="section-title">Production approach</h2>
                        <p className="section-desc">
                            Final delivery: under 1:30. Script drafted collaboratively — the team knows their brand best, we&apos;ll help shape it. Not talking 24/7 — there need to be breaks and moments.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                        {[
                            { icon: '🚫', title: 'No Teleprompter', desc: 'Natural conversation, not scripts. Cable-talk energy — get them going and they flow. The authenticity comes from real conversation, not rehearsed lines.' },
                            { icon: '🎬', title: 'Script Under 1:30', desc: 'Rough draft from the team, then we refine together. Overlays and visuals fill the gaps — you don\'t have to be talking every second. Natural breaks, moments of breathing room.' },
                            { icon: '🎤', title: 'Practice Runs', desc: 'Practice speaking on camera before shoot day. Podcast-style warm-ups. The more natural, the more viewers trust you. Practice leads to confidence, not perfection.' },
                            { icon: '😄', title: 'Light Comedy', desc: 'One light-hearted moment — juggling drinks (we juggle everything), a quick reaction shot. Not forced. Just a beat that makes someone chuckle.' },
                            { icon: '🎯', title: 'Results > Aesthetics', desc: 'The video that gets clients results beats the "prettiest" video every time. Beautiful AND effective — that is the standard.' },
                            { icon: '📣', title: 'No Hard CTA', desc: 'If the storytelling is done well enough, they know the call to action. No "call us" or "get your free estimate." Let the work speak. The story IS the pitch.' },
                        ].map((a, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{a.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{a.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{a.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 16, padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 10, background: 'var(--panel)', fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                        📷 <strong style={{ color: 'var(--cream)' }}>Tech Note:</strong> Need a CPL polarizer for any screen shots (laptops, monitors). The lens we have can handle it, but want a fresh one for this shoot to ensure clean reflections.
                    </div>
                </section>

                {/* ═══ EQUIPMENT INVESTMENT ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Equipment</div>
                        <div className="section-question">What we invested for this project</div>
                        <h2 className="section-title">New gear for ThreadLink</h2>
                        <p className="section-desc">
                            We purchased additional equipment specifically for this project. This isn&apos;t rented — it&apos;s owned. Long-term investment in the quality of the work.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                        {[
                            { icon: '📷', title: '2nd Sony FX3', desc: 'Another $5K cinema body — matched color science, dual-cam coverage without compromise. Same sensor, same logs, seamless editing.' },
                            { icon: '💡', title: 'Thin LED Panels', desc: 'Ultra-thin, lightweight LED panels. No heavy softboxes — flat surfaces that deliver beautiful, controllable light without cluttering the set.' },
                            { icon: '🟣', title: 'RGB LED Accents', desc: 'Indigo-colored LED accent lights for background brand color. The brand color lives in the environment through light, not post-production overlays.' },
                            { icon: '🔧', title: 'Accessories & Rigging', desc: 'Sliders, lenses, rigging for ultra-wide angles between desks. The tools to make a small office feel cinematic.' },
                        ].map((e, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{e.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{e.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{e.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ MEETING NOTES ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Meeting Notes</div>
                        <div className="section-question">Everything discussed across all sessions</div>
                        <h2 className="section-title">Raw meeting notes</h2>
                        <p className="section-desc">
                            Compiled from all pre-production meetings. These are the unfiltered takeaways that inform every creative decision.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                        {/* Creative Direction */}
                        <div style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>🎬 Creative Direction</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>Two videos: local community film (Winter Garden) + national brand authority film (full-stack capabilities)</li>
                                <li>Screen to Street concept — transition from computer work to real-world brand in action. The truck driving on screen transitions to real life.</li>
                                <li>We want to see the brand IN ACTION, not just talking about it. Show the creative process happening live.</li>
                                <li>Balance between demonstrating authority and building human connection. Don&apos;t choose one — do both.</li>
                                <li>Publix Energy — like Publix commercials, subtle branding that makes you feel something without being aggressive</li>
                                <li>Organic content but cinematic quality. Not run-and-gun. Not overly produced. The sweet spot.</li>
                                <li>AI is getting good enough to fake things with people. We want to make sure whatever we create has genuine human moments that can&apos;t be replicated.</li>
                                <li>The storytelling should show the real working relationship, not a curated highlight reel</li>
                                <li>Brady Bunch split-screen for the remote team — 3 remote members in a cinema-lit grid, 2-3 seconds in the video</li>
                                <li>Alternative remote shot: record a Zoom call, one team member full frame, then zoom out to show the desk in real life</li>
                            </ul>
                        </div>

                        {/* Brand Philosophy */}
                        <div style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>💡 Brand Philosophy &amp; Client Approach</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>This is personal for us. We want them to make it. We will do everything we can to give them the tools and set the stage.</li>
                                <li>We toned down a client&apos;s spend budget when she was in a hard spot. Told her to bring it down, we can run with this for now, then scale back up.</li>
                                <li>We&apos;re not a massive conglomerate. We&apos;re a team that picks up the phone. We respond quickly. We&apos;re available.</li>
                                <li>Social media was added because clients literally demanded it. We didn&apos;t plan on offering it — the market told us to.</li>
                                <li>Hiring process values initiative and cultural fit. We don&apos;t just hire for skills.</li>
                                <li>Their brand is your brand. We need to provide real authentic services because their success IS our success.</li>
                                <li>Got made fun of by another videographer for quality — sent that videographer the client results. Views, leads, ad performance. Results win.</li>
                                <li>We went back out for free when we messed up. We own mistakes and make them right.</li>
                                <li>Clients come to us looking outdated — their content or collateral doesn&apos;t match the services they provide. We fix that gap.</li>
                                <li>Tired of seeing businesses fail because they chased the wrong team. We want to build family within the space.</li>
                            </ul>
                        </div>

                        {/* Wardrobe Notes */}
                        <div style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>👔 Wardrobe &amp; Styling</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>Indigo and purple should be present but not overpowering. Just there.</li>
                                <li>An indigo striped blazer — not what you&apos;d wear casually, but styled for camera</li>
                                <li>Or you wear shirts with your company name, but that can be corporate. We don&apos;t think you need that.</li>
                                <li>No patterns. No cream. No turquoise or certain blues.</li>
                                <li>Preferred: black, white, indigo, yellow accents</li>
                                <li>Yellow works as a subtle pop — like peeking from under a coat. Not the whole outfit.</li>
                                <li>Maybe custom pins with the brand icon in purple</li>
                                <li>ThreadLink can help with collateral materials at wholesale pricing</li>
                                <li>No makeup artist needed. Keeping it natural.</li>
                                <li>Everyone in the shot matters — team needs to have wardrobe decisions made before shoot day</li>
                            </ul>
                        </div>

                        {/* Messaging */}
                        <div style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>💬 Messaging &amp; Script</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>Certain words and the way you say things is going to be more important than some of the visuals. That&apos;s where the authenticity comes from.</li>
                                <li>We need a word or phrase that threads through the entire video — connection, empowerment, purpose-driven</li>
                                <li>When you finish watching, you need to know what this company does. Period.</li>
                                <li>The website says &quot;elevating brands and empowering clients.&quot; Empowering is good. Elevating is overused.</li>
                                <li>Video should be under 1:30 final delivery. Natural breaks. Not talking 24/7.</li>
                                <li>Script is collaborative — team writes a rough draft of what they want to say, then we refine together</li>
                                <li>No teleprompter. Cable-talk energy — just get them going and they flow.</li>
                                <li>No hard CTA needed. If the storytelling is done well enough, they know the call to action. No &quot;call us now.&quot;</li>
                                <li>Text overlays should be selective — specific words at key moments, not captions everywhere</li>
                                <li>Practice on camera before shoot day. Podcast warm-ups help. Comfort builds confidence.</li>
                                <li>One light comedy moment is fine — juggling drinks, a quick reaction shot. Nothing forced.</li>
                            </ul>
                        </div>

                        {/* Locations */}
                        <div style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>📍 Locations &amp; Set</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>Keep locations minimal. Too many locations dilutes the video. Only add a location if it truly serves the message.</li>
                                <li>Office is small but workable — tight shots, bokeh, ultra-wide slider between laptops. Rearrange furniture to make it feel intentional.</li>
                                <li>Conference room has depth. Tables can be moved. Glass whiteboard was taken down.</li>
                                <li>Can fake the office — center the table, desaturate the colors, focus lighting in one area. Nobody needs to know there&apos;s other stuff.</li>
                                <li>Indigo RGB LED lights in the background for brand color accents. Like the reference video uses blue.</li>
                                <li>Downtown Winter Garden — recognizable background but not center stage. See the train, know where you are, but not posing under the clock tower.</li>
                                <li>Construction site with hard hats shows range — not just behind a screen</li>
                                <li>No studio rental. Not the vibe.</li>
                                <li>If doing outdoor shots, need an extra crew member dedicated to lighting. Butterfly softbox setup for harsh sun control.</li>
                                <li>Cloudy days are best for outdoor filming. If sunny, we need diffusion.</li>
                                <li>Outdoor scenes should be tight — a couple seconds max. Quick local texture.</li>
                                <li>Permits may be needed for professional equipment in public spaces. Butterfly rigs draw attention.</li>
                                <li>Every location needs confirmed time slots. No run-and-gun for this project.</li>
                            </ul>
                        </div>

                        {/* Technical */}
                        <div style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>⚙️ Technical &amp; Equipment</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>Bought a 2nd FX3 specifically for this project. Another $5K. Matched color science for dual-cam coverage.</li>
                                <li>New ultra-thin LED panels — lightweight, no heavy softboxes cluttering the set</li>
                                <li>Was about to buy a $20K camera but was talked out of it. Better to invest in better lenses and lighting with the FX3.</li>
                                <li>Lighting is so important. Backlighting separates you from the background — creates a 3D effect.</li>
                                <li>Need a CPL polarizer for screen shots (laptops, monitors). Want a fresh one for this shoot.</li>
                                <li>Color grading will be desaturated, minimal. Raw footage starts gray — shaped to feel intentional, not loud.</li>
                                <li>Brand color lives in the environment through RGB LEDs, not through post-production filters.</li>
                                <li>Sound design is custom — not stock music. Ambient textures, subtle transitions, emotional scoring.</li>
                                <li>BTS will be captured with iPhones + pro cameras. The BTS footage becomes its own social media content.</li>
                                <li>Bringing extra crew for BTS documentation — capturing the entire journey</li>
                                <li>ThreadLink will provide actual hex codes from their style escape for accurate color matching</li>
                            </ul>
                        </div>

                        {/* Open Questions */}
                        <div style={{ padding: '20px', border: '1px solid rgba(234, 179, 8, 0.1)', borderRadius: 16, background: 'rgba(234, 179, 8, 0.02)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#eab308', marginBottom: 12 }}>❓ Open Questions / To Decide</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: 'var(--muted-2)', lineHeight: 2.2 }}>
                                <li>Exact shoot date — mid-April weekend, TBD</li>
                                <li>Which client locations to feature? Construction site? Apex Health?</li>
                                <li>Do we need scenes outside the office to show community involvement?</li>
                                <li>Best way to balance humor and professionalism in the content?</li>
                                <li>How heavily should services (SEO, marketing, branding) be featured vs. implied?</li>
                                <li>Final wardrobe selections for all team members</li>
                                <li>Are permits required for all chosen outdoor filming locations?</li>
                                <li>Exact script — team needs to draft their talking points</li>
                                <li>What is the final unifying word/phrase? Connection? Empowerment? Both?</li>
                            </ul>
                        </div>

                    </div>
                </section>

                <div style={{ height: 40 }} />
                <div className="divider" />

                {/* ═══ PROJECT STATUS / TIMELINE ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Project Status</div>
                        <div className="section-question">Where are we right now?</div>
                        <h2 className="section-title">Planning Phase</h2>
                        <p className="section-desc">
                            We&apos;re picking the shoot date today and mapping out the vision for both videos. Here&apos;s where things stand across every phase.
                        </p>
                    </div>

                    <div className="phase-bar">
                        {[
                            { id: 'pre-production', label: 'Pre-Production', color: '#6366f1' },
                            { id: 'shoot-day', label: 'Shoot Day', color: '#94a3b8' },
                            { id: 'post-production', label: 'Post-Production', color: '#94a3b8' },
                            { id: 'delivery', label: 'Delivery', color: '#94a3b8' },
                        ].map(phase => (
                            <button
                                key={phase.id}
                                className={`phase-pill ${activePhase === phase.id ? 'active' : ''}`}
                                onClick={() => setActivePhase(phase.id)}
                            >
                                <span className="phase-dot-sm" style={{ background: phase.id === 'pre-production' ? '#22c55e' : phase.color }} />
                                {phase.label}
                            </button>
                        ))}
                    </div>

                    {activePhase === 'pre-production' && (
                        <div className="timeline">
                            <div className="timeline-block">
                                <div className="timeline-time" style={{ color: 'var(--green)' }}>● Today</div>
                                <div className="timeline-label">Pick the Shoot Date</div>
                                <div className="timeline-desc">Locking in the April date for the agency promo shoot in Winter Garden. Coordinating schedules and availability.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">○ Upcoming</div>
                                <div className="timeline-label">Creative Direction & Shot List</div>
                                <div className="timeline-desc">Define the visual story for both videos — agency energy + local area charm. We&apos;ll build the shot list together.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">○ Upcoming</div>
                                <div className="timeline-label">Location Scout — Winter Garden</div>
                                <div className="timeline-desc">Walk the space, test natural light, find hero backdrops. Scout exterior locations for the local area film.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">○ Upcoming</div>
                                <div className="timeline-label">Crew & Equipment Confirmation</div>
                                <div className="timeline-desc">Lock in the full crew and equipment list. Stage gear, test audio kits, prep camera packages.</div>
                            </div>
                        </div>
                    )}

                    {activePhase === 'shoot-day' && (
                        <div className="timeline">
                            <div className="timeline-block">
                                <div className="timeline-time">Early Morning</div>
                                <div className="timeline-label">Arrive + Setup</div>
                                <div className="timeline-desc">Position cameras, set lighting, dress the set. Test audio and dial in the look before talent arrives.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time" style={{ color: 'var(--orange)' }}>📹 Video 1 — Agency Promo</div>
                                <div className="timeline-label">Agency Team + Brand Story</div>
                                <div className="timeline-desc">Cinematic portraits, action shots of the team at work, and short punchy interview segments. The faces and energy of your agency.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Late Morning</div>
                                <div className="timeline-label">Agency B-Roll + Workspace</div>
                                <div className="timeline-desc">Interior detail shots — workspace energy, team collaboration, client-facing moments. Office textures and branded elements.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Midday</div>
                                <div className="timeline-label">Lunch + Reset</div>
                                <div className="timeline-desc">Card swap, battery rotation. Review hero shots on monitor. Prep for exterior shoots.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time" style={{ color: 'var(--teal)' }}>📹 Video 2 — Local Area</div>
                                <div className="timeline-label">Winter Garden Neighborhood Film</div>
                                <div className="timeline-desc">Cinematic showcase of the local area — downtown Winter Garden, Plant Street, historic district, parks, community vibe.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Afternoon</div>
                                <div className="timeline-label">Exterior B-Roll + Drone</div>
                                <div className="timeline-desc">Golden hour establishing shots, storefronts, street scenes, aerial views. The cinematic texture that ties the local area story together.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Late Afternoon</div>
                                <div className="timeline-label">Wrap + BTS</div>
                                <div className="timeline-desc">Behind-the-scenes photography, final pickup shots, media backup. Everything secured and verified.</div>
                            </div>
                        </div>
                    )}

                    {activePhase === 'post-production' && (
                        <div className="timeline">
                            <div className="timeline-block">
                                <div className="timeline-time" style={{ color: 'var(--orange)' }}>Video 1</div>
                                <div className="timeline-label">Agency Brand Film — Hero Edit</div>
                                <div className="timeline-desc">Primary 60–90 sec cinematic brand video. Color graded, sound designed, motion graphics. Priority delivery within ~7 days.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time" style={{ color: 'var(--teal)' }}>Video 2</div>
                                <div className="timeline-label">Local Area Film — Winter Garden</div>
                                <div className="timeline-desc">60–90 sec cinematic location showcase. Highlight the neighborhood, community, and lifestyle.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 1–2</div>
                                <div className="timeline-label">Social Clips — Both Videos</div>
                                <div className="timeline-desc">Vertical cuts from both the agency promo and local area footage. Optimized for Reels, TikTok, and LinkedIn.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 2</div>
                                <div className="timeline-label">Extended Cuts + BTS Photos</div>
                                <div className="timeline-desc">Longer-form versions (2–3 min each) for website/YouTube + full BTS photography set.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Ongoing</div>
                                <div className="timeline-label">Revisions & Feedback</div>
                                <div className="timeline-desc">2 revision rounds per deliverable. Drop feedback right here in the thread.</div>
                            </div>
                        </div>
                    )}

                    {activePhase === 'delivery' && (
                        <div className="timeline">
                            <div className="timeline-block">
                                <div className="timeline-time">Week 1</div>
                                <div className="timeline-label">Agency Brand Film — Hero Edit</div>
                                <div className="timeline-desc">Priority delivery via secure download link. You&apos;ll get a notification when it&apos;s ready for review.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 1</div>
                                <div className="timeline-label">Local Area Film — Hero Edit</div>
                                <div className="timeline-desc">Winter Garden neighborhood showcase delivered alongside the agency film.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 1</div>
                                <div className="timeline-label">BTS Photography</div>
                                <div className="timeline-desc">Behind-the-scenes photos from both shoot segments, professionally edited.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 2</div>
                                <div className="timeline-label">Social Clips + Extended Cuts</div>
                                <div className="timeline-desc">All vertical social cuts and extended versions for both videos, ready for launch.</div>
                            </div>
                        </div>
                    )}
                </section>

                {/* ═══ BTS IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/thread/production-bts.png')", transform: `translateY(${(scrollY - 2000) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Professional <span>Cinema-Grade</span> Production</div>
                    </div>
                </div>

                {/* ═══ DELIVERABLES ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Deliverables</div>
                        <div className="section-question">What you&apos;re getting</div>
                        <h2 className="section-title">Everything in scope</h2>
                        <p className="section-desc">
                            Your complete deliverables list. We&apos;ll update statuses here as each item moves through production.
                        </p>
                    </div>

                    <div className="del-grid">
                        {[
                            { name: '📹 Agency Brand Film (60–90 sec)', desc: 'Cinematic hero video — your team, your story, your energy. Color graded + sound designed.', eta: '~1 week', status: 'upcoming' },
                            { name: '📹 Local Area Film (60–90 sec)', desc: 'Winter Garden neighborhood showcase — community, lifestyle, and why clients choose this area.', eta: '~1 week', status: 'upcoming' },
                            { name: 'Extended Cuts (2–3 min each)', desc: 'Longer versions of both videos for website & YouTube', eta: '~2 weeks', status: 'upcoming' },
                            { name: 'Social Clips (6–8 cuts)', desc: 'Vertical 30–60s cuts from both videos for Reels, TikTok, LinkedIn', eta: '~10 days', status: 'upcoming' },
                            { name: 'BTS Photography', desc: 'Behind-the-scenes photos from both shoot segments', eta: '~3 days', status: 'upcoming' },
                            { name: '2 Revision Rounds per Deliverable', desc: 'Feedback tracked in-thread — just reply with notes', eta: 'Ongoing', status: 'included' },
                        ].map((d, i) => (
                            <div className="del-card" key={i}>
                                <div className="del-info">
                                    <div className="del-name">{d.name}</div>
                                    <div className="del-desc">{d.desc}</div>
                                </div>
                                <div className="del-right">
                                    <div className="del-eta">ETA {d.eta}</div>
                                    <div className="del-status" style={{
                                        color: d.status === 'included' ? 'var(--teal)' : 'var(--orange)',
                                        borderColor: d.status === 'included' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                                        background: d.status === 'included' ? 'rgba(139, 92, 246, 0.08)' : 'rgba(99, 102, 241, 0.08)',
                                    }}>
                                        {d.status === 'included' ? 'Included' : 'Upcoming'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ EQUIPMENT ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Kit</div>
                        <h2 className="section-title">The gear behind the look</h2>
                        <p className="section-desc">
                            Professional cinema equipment for both interior agency shoots and exterior location coverage.
                        </p>
                    </div>

                    <div className="equip-grid">
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--orange)' }}>✦ Camera A — Hero</div>
                            <h3>Sony FX3</h3>
                            <p>Full-frame cinema body. Primary hero angle for interviews and team portraits.</p>
                            <ul><li>85mm f/1.4 GM</li><li>S-Log3 / S-Gamut3.Cine</li><li>4K 24fps</li><li>XAVC-S 4:2:2 10-bit</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--teal)' }}>✦ Camera B — 2nd Angle</div>
                            <h3>Sony A7S III</h3>
                            <p>B-cam on complementary angle — detail shots and reactions.</p>
                            <ul><li>24-70mm f/2.8 GM</li><li>Matched color science</li><li>Low-light capable</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#A78BFA' }}>✦ Camera C — Wide / Gimbal</div>
                            <h3>Sony A7S III</h3>
                            <p>Establishing shots + gimbal movement for exterior location coverage.</p>
                            <ul><li>16-35mm f/2.8 GM</li><li>DJI RS 3 Pro gimbal</li><li>Full scene coverage</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                            <h3>Dual Wireless Lavs</h3>
                            <p>Clean, isolated audio tracks for each speaker.</p>
                            <ul><li>Sennheiser EW-D ×2</li><li>Rode NTG5 boom</li><li>Zoom F6 32-bit float</li><li>Synced timecode</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#FBBF24' }}>✦ Lighting</div>
                            <h3>Interview + Location Kit</h3>
                            <p>Soft, flattering key light for interiors. Portable fills for exteriors.</p>
                            <ul><li>300W LED + 47&quot; Softbox</li><li>Aputure MC RGB fill ×2</li><li>4×4 neg fill flag</li><li>Portable reflectors</li></ul>
                        </div>
                    </div>
                </section>

                {/* ═══ WINTER GARDEN IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/thread/winter-garden.png')", transform: `translateY(${(scrollY - 4000) * 0.06}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">On Location — <span>Winter Garden, FL</span></div>
                    </div>
                </div>

                {/* ═══ INVESTMENT / PRICING ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment</div>
                        <div className="section-question">What does this project cost?</div>
                        <h2 className="section-title">Choose your package</h2>
                        <p className="section-desc">
                            All tiers include professional dual-camera coverage with matched Sony FX3 cinema bodies, professional audio, and organized footage delivery. 50% deposit to lock the date.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>

                        {/* ── PROFESSIONAL (Recommended) ── */}
                        <div style={{ padding: '32px 24px', border: '1px solid rgba(99, 102, 241, 0.35)', borderRadius: 16, background: 'linear-gradient(135deg, var(--panel), rgba(99, 102, 241, 0.06))', position: 'relative', transition: 'all 0.3s' }}>
                            <div style={{ position: 'absolute', top: -12, left: 24, background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 16px', borderRadius: 20 }}>Recommended</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>Professional</div>
                            <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid rgba(99, 102, 241, 0.15)' }}>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 700, color: '#818cf8' }}>$7,500</span>
                                <br />
                                <span style={{ fontSize: 11, color: 'var(--muted-2)' }}>two videos — full package</span>
                            </div>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12, color: 'var(--cream)', lineHeight: 2.4 }}>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Full-day shoot (up to 10 hours)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Dual-cam coverage (2× Sony FX3)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>2 cinematic videos (brand + local community)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Desaturated indigo color grade</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Custom sound design (not stock)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Selective text overlays</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>8 social clips (9:16 vertical)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Extended cuts (2–3 min each for web)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>BTS photography (iPhone + pro cameras)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>Outdoor lighting crew assist</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#818cf8' }}>✓</span>2 revision rounds</li>
                                <li style={{ paddingLeft: 20, position: 'relative', opacity: 0.3, color: 'var(--muted-2)' }}><span style={{ position: 'absolute', left: 0, color: 'var(--muted-3)' }}>—</span>Premium motion graphics</li>
                                <li style={{ paddingLeft: 20, position: 'relative', opacity: 0.3, color: 'var(--muted-2)' }}><span style={{ position: 'absolute', left: 0, color: 'var(--muted-3)' }}>—</span>Raw footage archive</li>
                            </ul>
                        </div>

                        {/* ── PREMIER ── */}
                        <div style={{ padding: '32px 24px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>Premier</div>
                            <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 700, color: 'var(--orange)' }}>$11,500</span>
                                <br />
                                <span style={{ fontSize: 11, color: 'var(--muted-2)' }}>full creative production</span>
                            </div>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12, color: 'var(--muted-2)', lineHeight: 2.4 }}>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Full-day shoot (up to 12 hours)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Dual-cam + creative director on set</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>2 cinematic videos (brand + local)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Desaturated indigo color grade</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Custom sound design + licensed music</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Premium motion graphics + text overlays</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>12+ social clips (9:16 vertical)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Extended cuts (2–3 min each for web)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Pro BTS photography + BTS video reel</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Outdoor lighting crew + extra PA</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Raw footage archive drive</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>Priority delivery (~5 business days)</li>
                                <li style={{ paddingLeft: 20, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)' }}>✓</span>3 revision rounds</li>
                            </ul>
                        </div>

                    </div>

                    {/* Payment Terms */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 24 }}>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 12, background: 'var(--panel)', textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Deposit</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--orange)' }}>50%</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>to lock shoot date</div>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 12, background: 'var(--panel)', textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Balance</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--cream)' }}>50%</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>on first deliverable</div>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 12, background: 'var(--panel)', textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Delivery</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--cream)' }}>7–10</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>business days</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 16, padding: '14px 18px', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: 12, background: 'rgba(99, 102, 241, 0.03)', fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.8 }}>
                        <strong style={{ color: 'var(--cream)' }}>What&apos;s included in every tier:</strong> Dual Sony FX3 cinema cameras with matched color science, professional wireless audio (dual lavs), full lighting kit (LED panels + RGB accents), slider/gimbal stabilization, CPL polarizer for screen shots, and all media backed up on-set.
                    </div>
                </section>

                {/* ═══ YOUR TEAM ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Your Team</div>
                        <h2 className="section-title">Who&apos;s on your project</h2>
                        <p className="section-desc">
                            Your dedicated production crew. Any questions or ideas — reach out directly.
                        </p>
                    </div>

                    <div className="team-grid">
                        <div className="team-card">
                            <div className="team-avatar">🎬</div>
                            <div>
                                <div className="team-name">Matt Workman</div>
                                <div className="team-role">Director / Lead DP</div>
                            </div>
                        </div>
                        <div className="team-card">
                            <div className="team-avatar">🎯</div>
                            <div>
                                <div className="team-name">Daniel Castillo</div>
                                <div className="team-role">Producer / Cinematographer</div>
                            </div>
                        </div>
                    </div>

                    <div className="cta-row" style={{ marginTop: 48 }}>
                        <a className="cta-btn" href="tel:321-666-5228">📞 Call Us</a>
                        <a className="meeting-btn" href="mailto:hello@mediageekz.com">✉ Send a Message</a>
                    </div>
                </section>

                {/* ═══ FOOTER ═══ */}
                <div className="th-footer">
                    <div className="footer-logo">MediaGeekz × ThreadLink</div>
                    <div className="footer-tagline">Creative partnership. Community roots.</div>
                </div>
            </div>
        </>
    );
}
