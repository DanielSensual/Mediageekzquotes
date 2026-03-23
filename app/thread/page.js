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
                                <div className="hero-stat-value">April TBD</div>
                                <div className="hero-stat-detail">Picking the date today</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Format</div>
                                <div className="hero-stat-value">Multi-Cam</div>
                                <div className="hero-stat-detail">Local connect + brand film</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Location</div>
                                <div className="hero-stat-value">Winter Garden</div>
                                <div className="hero-stat-detail">FL · On-Location</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ TWO-VIDEO CONCEPT CARDS ═══ */}
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
                        <div className="section-question">Indigo + Pink — Minimal, clean</div>
                        <h2 className="section-title">Color direction for the films</h2>
                        <p className="section-desc">
                            The brand leans indigo-to-bubblegum pink with a minimal aesthetic. Color grading will be desaturated and balanced — not oversaturated. The palette informs set design, wardrobe coordination, and post-production color work.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                        {[
                            { color: '#1e1b4b', label: 'Deep Indigo' },
                            { color: '#4338ca', label: 'Indigo Core' },
                            { color: '#6366f1', label: 'Indigo Vivid' },
                            { color: '#818cf8', label: 'Indigo Light' },
                            { color: '#a78bfa', label: 'Violet' },
                            { color: '#c084fc', label: 'Orchid' },
                            { color: '#e879a8', label: 'Bubblegum Pink' },
                            { color: '#0f172a', label: 'Background' },
                        ].map((c, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ width: 56, height: 56, borderRadius: 14, background: c.color, border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: 6 }} />
                                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--muted-2)', letterSpacing: '0.05em' }}>{c.label}</div>
                                <div style={{ fontSize: 8, color: 'var(--muted-3)', fontFamily: "'Outfit', sans-serif" }}>{c.color}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ height: 8, borderRadius: 999, background: 'linear-gradient(90deg, #1e1b4b 0%, #4338ca 20%, #6366f1 35%, #818cf8 50%, #a78bfa 65%, #c084fc 80%, #e879a8 100%)', marginBottom: 20 }} />

                    <div style={{ padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--cream)' }}>Color Grading Approach:</strong> Desaturated, clean, balanced. We won&apos;t oversaturate the indigo/pink — instead, we create a color palette in the grade that makes the brand colors feel natural in the footage. The raw footage starts gray; we shape it to feel minimal and intentional, not loud.
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
                            { icon: '🏢', title: 'The Office', desc: 'Working sessions, creativity happening live. Show the lively, fun atmosphere — even though it\'s "just an office," we make it look alive.' },
                            { icon: '🤝', title: 'Conference Room', desc: 'Discovery meetings, client presentations, whiteboard strategy sessions. The depth of the process visible.' },
                            { icon: '🌿', title: 'Artificial Grass Area', desc: 'Unique creative shots — unexpected texture, fun energy. Shows personality in the space.' },
                            { icon: '🎥', title: 'Studio Rental', desc: '1-2 hour studio rental for controlled creative shots — white backdrop, product work, cinematic lighting. Shows craft and professionalism.' },
                            { icon: '🏪', title: 'Client Locations', desc: 'On-site at client businesses. Show them in their element. The team is there with them — cameras in hand, building together.' },
                            { icon: '🌄', title: 'Winter Garden Downtown', desc: 'Plant Street, Garden Theatre, farmer\'s market. Golden hour B-roll. The community texture that grounds the local video.' },
                        ].map((loc, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{loc.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{loc.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{loc.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 20, padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)', fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--cream)' }}>🎥 BTS Content:</strong> Behind-the-scenes footage will be captured throughout. The same cameras, same lenses — showing the creative process as it happens. This BTS content becomes its own social media asset.
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
                            { icon: '🎨', title: 'Desaturated Color Grade', desc: 'Indigo/pink palette integrated through the grade — not shoved in, not loud. Balanced, clean, calm. The footage starts gray and gets shaped to feel minimal and intentional.' },
                            { icon: '✂️', title: 'Pacing & Rhythm', desc: 'Organic pacing. Some moments breathe slowly (discovery, personal connection), others hit fast (full-stack montage, screen-to-street cuts). The edit matches the emotional arc.' },
                        ].map((p, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)', transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{p.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{p.desc}</div>
                            </div>
                        ))}
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
