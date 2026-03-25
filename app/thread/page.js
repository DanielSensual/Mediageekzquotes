'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   MediaGeekz — Thread Link  ·  Enhanced Edition
   Collaborative Project Space · Winter Garden, FL
   Single-Video Shoot: Creative Agency Promo
   ═══════════════════════════════════════════════════════════════ */

export default function ThreadLink() {
    const proposalHidden = false;

    if (proposalHidden) {
        return (
            <>
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
                    :root {
                        --shadow: #060a14;
                        --navy: #0f1729;
                        --panel: rgba(15, 23, 42, 0.88);
                        --border: rgba(99, 102, 241, 0.24);
                        --indigo: #6366f1;
                        --cream: #e2e8f0;
                        --white: #f8fafc;
                        --muted: #94a3b8;
                    }
                    * { box-sizing: border-box; }
                    body {
                        margin: 0;
                        font-family: 'Inter', sans-serif !important;
                        color: var(--cream) !important;
                        background:
                            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.08), transparent 35%),
                            radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.04), transparent 35%),
                            linear-gradient(180deg, #0d1220 0%, #080c16 100%) !important;
                    }
                    .hold-shell { min-height: 100vh; display: grid; place-items: center; padding: 32px; }
                    .hold-card {
                        width: min(100%, 760px); padding: 40px 32px;
                        border: 1px solid var(--border); border-radius: 24px;
                        background: var(--panel); box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
                        text-align: center;
                    }
                    .hold-badge {
                        display: inline-block; margin-bottom: 20px; padding: 8px 14px;
                        border-radius: 999px; border: 1px solid rgba(99, 102, 241, 0.3);
                        color: var(--indigo); font-size: 11px; font-weight: 700;
                        letter-spacing: 0.18em; text-transform: uppercase;
                    }
                    .hold-title {
                        margin: 0 0 16px; font-family: 'Outfit', sans-serif;
                        font-size: clamp(38px, 7vw, 64px); line-height: 0.98; color: var(--white);
                    }
                    .hold-title em { font-style: normal; color: var(--indigo); }
                    .hold-copy { margin: 0 auto; max-width: 560px; color: var(--muted); font-size: 16px; line-height: 1.8; }
                `}</style>
                <main className="hold-shell">
                    <section className="hold-card">
                        <div className="hold-badge">Proposal Temporarily Hidden</div>
                        <h1 className="hold-title">ThreadLink <em>proposal</em> is being finalized.</h1>
                        <p className="hold-copy">
                            We&apos;re putting the finishing touches on the production plan and pricing. This page will be shared once everything is confirmed.
                        </p>
                    </section>
                </main>
            </>
        );
    }

    const [activePhase, setActivePhase] = useState('pre-production');
    const [scrollY, setScrollY] = useState(0);
    const [selectedAddOns, setSelectedAddOns] = useState([]);

    const toggleAddOn = (id) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

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
                            A creative collaboration between MediaGeekz and ThreadLink — a strategic web design &amp; branding studio rooted in Clermont, FL. One cinematic film to showcase who ThreadLink is and what they do for their clients.
                        </p>

                        <div className="hero-meta">
                            <div className="hero-stat">
                                <div className="hero-stat-label">Project</div>
                                <div className="hero-stat-value">1 Video</div>
                                <div className="hero-stat-detail">Creative Agency Promo</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Shoot Date</div>
                                <div className="hero-stat-value">Mid-April</div>
                                <div className="hero-stat-detail">Weekend shoot</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Format</div>
                                <div className="hero-stat-value">Multi-Cam</div>
                                <div className="hero-stat-detail">Cinematic brand film</div>
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
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>Their Process (What the Video Should Showcase)</div>
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

                <div className="concept-grid reveal" style={{ gridTemplateColumns: '1fr', maxWidth: 700, margin: '0 auto' }}>
                    <div className="concept-card">
                        <div style={{ overflow: 'hidden' }}>
                            <img className="concept-img" src="/thread/screen-work.png" alt="Creative agency at work" />
                        </div>
                        <div className="concept-body">
                            <div className="concept-tag" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--orange)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                                📹 Creative Agency Promo — 1:30
                            </div>
                            <div className="concept-name">ThreadLink Brand Film</div>
                            <div className="concept-desc">
                                A cinematic creative agency showcase — the design process, the tools, the team, and the human connection. Apple Pencil on iPad, designers at their screens, real client moments. Not a corporate promo — a story about a studio that actually cares.
                            </div>
                        </div>
                    </div>
                </div>


                {/* ═══ CREATIVE TREATMENT — SHOT GALLERY ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Creative Treatment</div>
                        <div className="section-question">The shots that tell the story</div>
                        <h2 className="section-title">Visual direction for the film</h2>
                        <p className="section-desc">
                            These reference frames set the tone — cinematic creative process shots, team energy, and the ThreadLink brand in its natural environment.
                        </p>
                    </div>

                    <div className="treatment-grid">
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/community.png" alt="Community scene" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Exterior · Community</div>
                                Local texture — storefronts, Plant Street, neighborhood energy
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/apple-pencil.png" alt="Apple Pencil on iPad" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Tight Shot · Detail</div>
                                Apple Pencil — The creative tool in motion
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/screen-work.png" alt="Designer at screen" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">OTS · Screen Work</div>
                                Screen Work — Designer reviewing creative layouts
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/winter-garden.png" alt="Winter Garden aerial" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Aerial · Drone</div>
                                Aerial Reveal — Downtown Winter Garden at golden hour
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/production-bts.png" alt="Production crew" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">BTS · Production</div>
                                Behind the Scenes — Cinema-grade production setup
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/thread/agency-hero.png" alt="Agency workspace" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Wide · Team</div>
                                Team Collaboration — The creative workspace energy
                            </div>
                        </div>
                    </div>
                </section>
                {/* ═══ CREATIVE DIRECTION ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Creative Direction</div>
                        <div className="section-question">The vision for the film</div>
                        <h2 className="section-title">Organic. Cinematic. Real.</h2>
                        <p className="section-desc">
                            Not a generic corporate promo. This film feels human — you&apos;re watching a story, not a sales pitch. The brand lives in the environment, never the focus.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 28 }}>
                        {[
                            { icon: '🎬', title: 'Screen to Street', desc: 'Digital becomes physical — a logo on screen matches cuts to the real-world signage, business card, environment. The brand in action, not just in pixels.' },
                            { icon: '🏠', title: 'Publix Energy', desc: 'Subtle brand placement throughout. Logo on the coffee cup, brand colors in the background — never the hero of the shot, always part of the texture.' },
                            { icon: '🤝', title: 'Human Connection', desc: 'Real conversations. Team sitting with clients, not performing for camera. The authenticity that makes people trust you before they ever call.' },
                        ].map((p, i) => (
                            <div key={i} style={{ padding: '24px 20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{p.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>{p.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '28px 32px', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: 16, background: 'rgba(99, 102, 241, 0.04)', borderLeft: '3px solid var(--orange)' }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            &quot;Whatever we&apos;re doing creatively, you see it in the real world. The brand in action — textile, tangible, actually happening. Not AI-generated stories. Real ones.&quot;
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--muted-2)', fontWeight: 600 }}>— From the creative meeting</div>
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ LOCATIONS ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Locations</div>
                        <div className="section-question">Where we&apos;re shooting</div>
                        <h2 className="section-title">On Location</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                        {[
                            { icon: '🏢', title: 'The Office', desc: 'Tight shots, bokeh, slider between desks. Indigo RGB LEDs for brand color. Small space made cinematic.' },
                            { icon: '🤝', title: 'Conference Room', desc: 'Discovery meetings, strategy sessions. Depth for interviews. Whiteboard removed, tables moveable.' },
                            { icon: '🌅', title: 'Downtown Winter Garden', desc: 'Plant Street — recognizable local texture in the background. 2–3 quick seconds, not center stage.' },
                            { icon: '🏡', title: 'Client Businesses', desc: 'On-site at client locations — showing the team embedded in the real world, not behind a screen.' },
                        ].map((loc, i) => (
                            <div key={i} style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, background: 'var(--panel)' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{loc.icon}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{loc.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>{loc.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ REFERENCE VIDEO ═══ */}
                <section className="video-section reveal">
                    <div className="section-header">
                        <div className="section-label">Reference</div>
                        <h2 className="section-title">Cinematic quality benchmark</h2>
                        <p className="section-desc">
                            The production value we&apos;re matching — with more heart, more connection, and more authenticity than a typical agency reel.
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
                        <span>Quality Reference</span> — Our film will match this production value, with real human connection at the center
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ BTS IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/thread/production-bts.png')", transform: `translateY(${(scrollY - 2000) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Professional <span>Cinema-Grade</span> Production</div>
                    </div>
                </div>

                {/* ═══ INVESTMENT / PRICING ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment</div>
                        <div className="section-question">Production & Post-Production breakdown</div>
                        <h2 className="section-title">Project Investment</h2>
                        <p className="section-desc">
                            Complete production and post-production — crew, camera package, editing, and all the post-work to make it cinematic.
                        </p>
                    </div>

                    {(() => {
                        const addOns = [
                            { id: 'reel', label: 'Vertical Reel Version', detail: 'Social-optimized 9:16 cut for Reels, TikTok & Shorts', price: 500 },
                            { id: 'drone', label: 'Drone Package', detail: 'Aerial cinematic coverage added to the shoot day', price: 500 },
                            { id: 'extra-edit', label: 'Additional Video Edited', detail: 'Full edit of a second deliverable — same quality, sound design & color', price: 1000 },
                        ];
                        const baseItems = [
                            { label: 'Director / Lead DP', detail: 'Matt Workman — Creative direction & cinematography', price: 1500 },
                            { label: 'Director of Photography', detail: 'Daniel Castillo — 2nd camera & technical execution', price: 1000 },
                            { label: 'Production Assistant', detail: 'On-set support, lighting assist, & logistics', price: 500 },
                            { label: 'Pre-Production', detail: 'Creative planning, shot listing, & creative meetings', price: 250 },
                            { label: 'Camera & Lighting Package', detail: 'Dual Sony FX3 cinema bodies, LED panels, RGB accents & rigging', price: 500 },
                            { label: 'Editing — Commercial 1:30', detail: 'Sound design, graphics, overlay text, & cinematic color grading', price: 1500 },
                        ];
                        const subtotal = baseItems.reduce((s, i) => s + i.price, 0)
                            + addOns.filter(a => selectedAddOns.includes(a.id)).reduce((s, a) => s + a.price, 0);
                        const fee = Math.round(subtotal * 0.10);
                        const total = subtotal + fee;
                        const fmt = (n) => '$' + n.toLocaleString();

                        return (
                            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                                {/* Main pricing card */}
                                <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', marginBottom: 24 }}>
                                    <div style={{ padding: '32px 40px', background: 'rgba(99, 102, 241, 0.06)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 4 }}>Full Service Production</div>
                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--white)' }}>Agency Promo Package</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginBottom: 4 }}>TOTAL INVESTMENT</div>
                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--orange)', transition: 'all 0.3s' }}>{fmt(total)}</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '32px 40px' }}>
                                        <div style={{ display: 'grid', gap: 16 }}>
                                            {baseItems.map((item, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, borderBottom: i === baseItems.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                                                    <div>
                                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{item.label}</div>
                                                        <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{item.detail}</div>
                                                    </div>
                                                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--cream)', whiteSpace: 'nowrap', marginLeft: 16 }}>{fmt(item.price)}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {selectedAddOns.length > 0 && (
                                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed rgba(99,102,241,0.2)', display: 'grid', gap: 12 }}>
                                                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)' }}>Selected Add-Ons</div>
                                                {addOns.filter(a => selectedAddOns.includes(a.id)).map((a, i) => (
                                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <div>
                                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--teal)' }}>+ {a.label}</div>
                                                            <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{a.detail}</div>
                                                        </div>
                                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--teal)', whiteSpace: 'nowrap', marginLeft: 16 }}>{fmt(a.price)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ marginTop: 32, padding: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Subtotal</div>
                                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>{fmt(subtotal)}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Production Fee (10%)</div>
                                                <div style={{ fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>{fmt(fee)}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--white)' }}>Total</div>
                                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--orange)', transition: 'all 0.3s' }}>{fmt(total)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Add-Ons */}
                                <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden' }}>
                                    <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Optional Add-Ons</div>
                                        <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>Select to see updated total</div>
                                    </div>
                                    <div style={{ padding: '8px 0' }}>
                                        {addOns.map((addon) => {
                                            const selected = selectedAddOns.includes(addon.id);
                                            return (
                                                <div
                                                    key={addon.id}
                                                    onClick={() => toggleAddOn(addon.id)}
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px', cursor: 'pointer', transition: 'background 0.2s', background: selected ? 'rgba(45,212,191,0.06)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${selected ? 'var(--teal)' : 'rgba(255,255,255,0.2)'}`, background: selected ? 'var(--teal)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                                                            {selected && <span style={{ color: '#0f172a', fontSize: 13, fontWeight: 800 }}>✓</span>}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: selected ? 'var(--teal)' : 'var(--cream)', transition: 'color 0.2s' }}>{addon.label}</div>
                                                            <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{addon.detail}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: selected ? 'var(--teal)' : 'var(--muted)', whiteSpace: 'nowrap', marginLeft: 16, transition: 'color 0.2s' }}>+{fmt(addon.price)}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </section>

                <div className="divider" />

                {/* ═══ PAYMENT OPTIONS ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Payment</div>
                        <div className="section-question">How would you like to pay?</div>
                        <h2 className="section-title">Payment Options</h2>
                        <p className="section-desc">
                            Choose the option that works best for you. All payments processed securely via Square.
                        </p>
                    </div>

                    {(() => {
                        const addOns = [
                            { id: 'reel', price: 500 },
                            { id: 'drone', price: 500 },
                            { id: 'extra-edit', price: 1000 },
                        ];
                        const base = 5250;
                        const addOnTotal = addOns.filter(a => selectedAddOns.includes(a.id)).reduce((s, a) => s + a.price, 0);
                        const subtotal = base + addOnTotal;
                        const fee = Math.round(subtotal * 0.10);
                        const total = subtotal + fee;
                        const deposit = Math.round(total / 2);
                        const balance = total - deposit;
                        const fmt = (n) => '$' + n.toLocaleString();

                        return (
                            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

                                {/* Payment chips */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                    <div style={{ padding: 20, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, background: 'var(--panel)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Deposit</div>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--orange)' }}>{fmt(deposit)}</div>
                                        <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>50% — to lock shoot date</div>
                                    </div>
                                    <div style={{ padding: 20, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, background: 'var(--panel)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Balance</div>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--cream)' }}>{fmt(balance)}</div>
                                        <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>50% — on wrap day</div>
                                    </div>
                                    <div style={{ padding: 20, border: '1px solid rgba(45,212,191,0.15)', borderRadius: 16, background: 'rgba(45,212,191,0.04)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 6 }}>Pay in Full</div>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--teal)' }}>{fmt(total)}</div>
                                        <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>One payment, all done</div>
                                    </div>
                                </div>

                                {/* Pay deposit CTA */}
                                <div style={{ padding: '28px 32px', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, background: 'rgba(99,102,241,0.04)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)' }}>Ready to move forward?</div>
                                    <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                                        A 50% deposit of <strong style={{ color: 'var(--cream)' }}>{fmt(deposit)}</strong> locks your shoot date. The remaining <strong style={{ color: 'var(--cream)' }}>{fmt(balance)}</strong> is due on wrap day.
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        <a
                                            href={`/checkout?amount=${deposit}&desc=${encodeURIComponent('ThreadLink — 50% Deposit')}`}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                                padding: '18px 24px', borderRadius: 14, cursor: 'pointer',
                                                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                                                color: '#fff', fontFamily: "'Outfit', sans-serif",
                                                fontSize: 15, fontWeight: 700, letterSpacing: '0.04em',
                                                textDecoration: 'none', boxShadow: '0 8px 28px rgba(99,102,241,0.3)',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                            }}
                                        >
                                            💳 Pay Deposit — {fmt(deposit)}
                                        </a>
                                        <a
                                            href={`/checkout?amount=${total}&desc=${encodeURIComponent('ThreadLink — Paid in Full')}`}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                                padding: '18px 24px', borderRadius: 14, cursor: 'pointer',
                                                background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.3)',
                                                color: 'var(--teal)', fontFamily: "'Outfit', sans-serif",
                                                fontSize: 15, fontWeight: 700, letterSpacing: '0.04em',
                                                textDecoration: 'none',
                                                transition: 'transform 0.2s',
                                            }}
                                        >
                                            ✓ Pay in Full — {fmt(total)}
                                        </a>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', textAlign: 'center' }}>
                                        🔒 Payments processed securely via Square · Card, Apple Pay, Google Pay
                                    </div>
                                </div>

                            </div>
                        );
                    })()}
                </section>

                <div className="divider" />

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
