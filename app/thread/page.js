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
                    --border: rgba(232, 98, 44, 0.16);
                    --orange: #e8622c;
                    --orange-soft: rgba(232, 98, 44, 0.12);
                    --teal: #2dd4bf;
                    --teal-soft: rgba(45, 212, 191, 0.12);
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

                ::selection { background: rgba(232, 98, 44, 0.3); color: var(--white); }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(232, 98, 44, 0.4); border-radius: 999px; }

                .page-shell { position: relative; }

                /* ── CINEMATIC HERO ── */
                .cin-hero {
                    position: relative; min-height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden;
                }

                .cin-hero-bg {
                    position: absolute; inset: 0;
                    background: url('/thread/production-bts.png') center/cover no-repeat;
                    filter: brightness(0.3) saturate(1.2);
                    transform: scale(1.05);
                    transition: transform 0.1s linear;
                }

                .cin-hero-overlay {
                    position: absolute; inset: 0;
                    background:
                        linear-gradient(180deg, rgba(6, 10, 20, 0.5) 0%, rgba(6, 10, 20, 0.3) 40%, rgba(6, 10, 20, 0.85) 80%, #060a14 100%),
                        radial-gradient(ellipse at 30% 30%, rgba(232, 98, 44, 0.12) 0%, transparent 50%);
                }

                .cin-hero-content {
                    position: relative; z-index: 2;
                    text-align: center; padding: 80px 24px 100px;
                    max-width: 900px;
                }

                .hero-badge {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 10px 20px; border: 1px solid rgba(232, 98, 44, 0.3);
                    border-radius: 999px; background: rgba(15, 23, 42, 0.6);
                    color: var(--orange); font-size: 11px; font-weight: 600;
                    letter-spacing: 0.3em; text-transform: uppercase;
                    backdrop-filter: blur(16px); margin-bottom: 36px;
                }

                .hero-badge::before {
                    content: ""; width: 7px; height: 7px; border-radius: 50%;
                    background: var(--orange); box-shadow: 0 0 0 7px rgba(232, 98, 44, 0.15);
                    animation: pulse-dot 2s ease-in-out infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { box-shadow: 0 0 0 7px rgba(232, 98, 44, 0.15); }
                    50% { box-shadow: 0 0 0 14px rgba(232, 98, 44, 0.04); }
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
                    border-color: rgba(232, 98, 44, 0.35);
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(232, 98, 44, 0.08);
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
                    border-color: rgba(232, 98, 44, 0.3);
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

                /* ── Video Embed ── */
                .video-section {
                    max-width: 1100px; margin: 0 auto;
                    padding: 80px 24px 0;
                }

                .video-wrap {
                    position: relative; width: 100%;
                    padding-bottom: 56.25%; /* 16:9 */
                    border-radius: 20px; overflow: hidden;
                    border: 1px solid rgba(232, 98, 44, 0.15);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(232, 98, 44, 0.06);
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
                    background: linear-gradient(90deg, transparent, rgba(232, 98, 44, 0.3), rgba(45, 212, 191, 0.2), transparent);
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

                .phase-pill:hover { border-color: rgba(232, 98, 44, 0.3); color: var(--cream); }

                .phase-pill.active {
                    border-color: var(--orange); background: rgba(232, 98, 44, 0.1); color: var(--orange);
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
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 16px; margin-top: 32px;
                }

                .equip-card {
                    padding: 24px 20px; border: 1px solid rgba(45, 212, 191, 0.1);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s, transform 0.3s;
                }

                .equip-card:hover { border-color: rgba(45, 212, 191, 0.3); transform: translateY(-2px); }
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

                .del-card:hover { border-color: rgba(232, 98, 44, 0.25); transform: translateX(6px); background: rgba(232, 98, 44, 0.03); }

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

                .team-card:hover { border-color: rgba(232, 98, 44, 0.25); transform: translateY(-2px); }

                .team-avatar {
                    width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
                    background: var(--orange-soft); border: 1px solid rgba(232, 98, 44, 0.2);
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
                    box-shadow: 0 8px 30px rgba(232, 98, 44, 0.3); text-decoration: none;
                }

                .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(232, 98, 44, 0.4); }

                .meeting-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 16px 32px; border: 1px solid var(--teal); border-radius: 999px; cursor: pointer;
                    background: rgba(45, 212, 191, 0.08); color: var(--teal);
                    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    transition: transform 0.2s, box-shadow 0.2s, background 0.2s; text-decoration: none;
                }

                .meeting-btn:hover { transform: translateY(-2px); background: rgba(45, 212, 191, 0.14); box-shadow: 0 8px 30px rgba(45, 212, 191, 0.2); }

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
                        <div className="hero-badge">MediaGeekz — Project Thread</div>
                        <h1 className="hero-title">
                            Let&apos;s<br /><em>Build.</em><br />Together.
                        </h1>
                        <p className="hero-subtitle">
                            Your private production thread — a shared space where we plan, track, and deliver two cinematic films for your agency. First shoot together. Let&apos;s make it count.
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
                            <img className="concept-img" src="/thread/agency-hero.png" alt="Agency promo concept" />
                        </div>
                        <div className="concept-body">
                            <div className="concept-tag" style={{ background: 'rgba(232, 98, 44, 0.12)', color: 'var(--orange)', border: '1px solid rgba(232, 98, 44, 0.25)' }}>
                                📹 Video 1 — Local Market
                            </div>
                            <div className="concept-name">Winter Garden Community Film</div>
                            <div className="concept-desc">
                                Built to connect with the local community. Your agency rooted in Winter Garden — Plant Street energy, local landmarks, familiar faces, and the neighborhood vibe. Show locals you&apos;re one of them.
                            </div>
                        </div>
                    </div>
                    <div className="concept-card">
                        <div style={{ overflow: 'hidden' }}>
                            <img className="concept-img" src="/thread/winter-garden.png" alt="Winter Garden local area" />
                        </div>
                        <div className="concept-body">
                            <div className="concept-tag" style={{ background: 'rgba(45, 212, 191, 0.1)', color: 'var(--teal)', border: '1px solid rgba(45, 212, 191, 0.25)' }}>
                                📹 Video 2 — National Level
                            </div>
                            <div className="concept-name">Agency Brand Film</div>
                            <div className="concept-desc">
                                National-market-ready brand film — premium, polished, and cinematic. The kind of video that positions your agency alongside the best. Fast cuts, gimbal walk-throughs, macro details, and team energy that competes on any stage.
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ VISION — REFERENCE VIDEO ═══ */}
                <section className="video-section reveal">
                    <div className="section-header">
                        <div className="section-label">Vision & Direction</div>
                        <h2 className="section-title">The look we&apos;re going for</h2>
                        <p className="section-desc">
                            This is the energy and cinematic quality we&apos;re aiming for. Watch it — this is the caliber of film we&apos;re building together.
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
                        <span>Style Reference</span> — Creative Agency Film by SOCL
                    </div>
                </section>

                {/* ═══ SHOT LIST ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Shot List</div>
                        <div className="section-question">Inspired by the reference above</div>
                        <h2 className="section-title">How we&apos;re building each video</h2>
                        <p className="section-desc">
                            Every shot planned with intention. Here&apos;s the breakdown for both films — mapped from the SOCL reference and tailored to your agency and Winter Garden.
                        </p>
                    </div>

                    {/* Video 1 Shot List */}
                    <div style={{ marginBottom: 56 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(232, 98, 44, 0.12)', border: '1px solid rgba(232, 98, 44, 0.25)', color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                📹 Video 1 — Local Market
                            </div>
                            <div style={{ fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--white)' }}>Winter Garden Community Film</div>
                        </div>

                        <div style={{ display: 'grid', gap: 10 }}>
                            {[
                                { shot: 'Hero Walk-In', type: 'Gimbal', desc: 'Team lead walks through downtown Winter Garden — Plant Street, local shops, familiar storefronts. Establishes "we\'re from here."' },
                                { shot: 'Street-Level Establishing', type: 'Drone + Wide', desc: 'Aerial reveal of downtown Winter Garden at golden hour. Tree-lined streets, brick buildings, community energy from above.' },
                                { shot: 'Local Landmark Montage', type: 'Slider + Gimbal', desc: 'Quick cuts of recognizable Winter Garden spots — Garden Theatre marquee, Plant Street Market, West Orange Trail, lakefront parks.' },
                                { shot: 'Community Faces', type: 'Medium Close-Up', desc: 'Real locals in their element — shop owners waving, families at the farmer\'s market, people on the trail. Warm, authentic.' },
                                { shot: 'Agency Storefront / Office', type: 'Dolly Push-In', desc: 'Cinematic reveal of the agency\'s home base. Slow push-in from exterior to interior — roots in the community.' },
                                { shot: 'Team in the Neighborhood', type: 'Handheld + Gimbal', desc: 'Your team walking through town, grabbing coffee, interacting with locals. Natural, not staged. You\'re part of Winter Garden.' },
                                { shot: 'Golden Hour B-Roll', type: 'Various', desc: 'Warm light hitting brick facades, shadows on sidewalks, string lights at dusk. The cinematic texture that makes Winter Garden glow.' },
                                { shot: 'Client Handshake / Meeting', type: 'Medium Shot', desc: 'Team greeting a local client at their business. The human connection — personal, not corporate.' },
                                { shot: 'Text-Safe Wide Shots', type: 'Static / Tripod', desc: 'Clean compositions with negative space for social media text overlays. Sky, walls, open streetscapes.' },
                                { shot: 'Closing Moment', type: 'Drone Pull-Back', desc: 'Final aerial pulling back from the team on Plant Street, revealing the full Winter Garden skyline. "This is where we work."' },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 20px', border: '1px solid rgba(232, 98, 44, 0.1)', borderRadius: 14, background: 'var(--panel)', transition: 'all 0.3s', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: 'rgba(232, 98, 44, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--orange)', fontFamily: "'Outfit', sans-serif" }}>{i + 1}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{s.shot}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(45, 212, 191, 0.2)', background: 'rgba(45, 212, 191, 0.06)' }}>{s.type}</span>
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
                            <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.25)', color: 'var(--teal)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                📹 Video 2 — National Level
                            </div>
                            <div style={{ fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--white)' }}>Agency Brand Film</div>
                        </div>

                        <div style={{ display: 'grid', gap: 10 }}>
                            {[
                                { shot: 'The Walking Hero', type: 'Gimbal', desc: 'Team lead walks through the agency space — confident, purposeful. Shallow depth of field, rack focus reveals. Sets the premium tone instantly.' },
                                { shot: 'Team Collaboration', type: 'Slider', desc: 'Smooth lateral moves across team brainstorming at a table — pointing at screens, sketching ideas, high-fives. The creative energy.' },
                                { shot: 'Macro Equipment Close-Ups', type: 'Macro / Slider', desc: 'Extreme close-ups of camera sensors, lenses being mounted, LED pixels, keyboard keys typing. "Gear porn" that signals quality.' },
                                { shot: 'Screen Work in Action', type: 'OTS / Close-Up', desc: 'Over-the-shoulder shots of design work, edit timelines, social media dashboards. Screens glowing in a dark environment.' },
                                { shot: 'Quick-Cut Rhythm Montage', type: 'Various', desc: 'Fast-paced 1-2 second cuts synced to the music beat — coffee pour, mouse click, whiteboard sketch, handshake, monitor glow. Builds energy.' },
                                { shot: 'Team Portraits', type: 'Static / Tripod', desc: 'Cinematic sit-down portraits of each team member. Dramatic lighting — soft key, hard edge. Each person gets their hero moment.' },
                                { shot: 'Meeting Room Power Shot', type: 'Dolly Push-In', desc: 'Slow push into a glass conference room where the team is presenting. Backlit, shallow DOF. Corporate but not boring.' },
                                { shot: 'The "Eureka" Moment', type: 'Handheld', desc: 'Organic, slightly shaky capture of a genuine team reaction — the win, the breakthrough. Authenticity in the chaos.' },
                                { shot: 'Light Leak Transitions', type: 'In-Camera + Post', desc: 'Orange/teal light leaks or whip pans between sequences. Bridges the high-energy cuts with cinematic style.' },
                                { shot: 'Logo Resolve', type: 'Static / Motion Graphics', desc: 'Clean ending — agency logo animates onto a dark background. Minimal. Powerful. The final frame that sticks.' },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 20px', border: '1px solid rgba(45, 212, 191, 0.08)', borderRadius: 14, background: 'var(--panel)', transition: 'all 0.3s', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: 'rgba(45, 212, 191, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--teal)', fontFamily: "'Outfit', sans-serif" }}>{i + 1}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{s.shot}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(232, 98, 44, 0.2)', background: 'rgba(232, 98, 44, 0.06)' }}>{s.type}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.6 }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
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
                            { id: 'pre-production', label: 'Pre-Production', color: '#e8622c' },
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
                                        borderColor: d.status === 'included' ? 'rgba(45, 212, 191, 0.3)' : 'rgba(232, 98, 44, 0.3)',
                                        background: d.status === 'included' ? 'rgba(45, 212, 191, 0.08)' : 'rgba(232, 98, 44, 0.08)',
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
                                <div className="team-name">Daniel Castillo</div>
                                <div className="team-role">Director / Lead DP</div>
                            </div>
                        </div>
                        <div className="team-card">
                            <div className="team-avatar">🎯</div>
                            <div>
                                <div className="team-name">Matt Workman</div>
                                <div className="team-role">Producer</div>
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
                    <div className="footer-logo">MediaGeekz</div>
                    <div className="footer-tagline">Your production. Our obsession.</div>
                </div>
            </div>
        </>
    );
}
