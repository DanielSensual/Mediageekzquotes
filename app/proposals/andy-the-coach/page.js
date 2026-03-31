'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   MediaGeekz — Andy The Coach  ·  Blue Collar Business Consultants
   Live Stream + Content Production · Orlando, FL
   Multi-Cam Shoot: Brand Content & Live Stream Strategy
   ═══════════════════════════════════════════════════════════════ */

export default function AndyTheCoach() {
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
                        --border: rgba(232, 98, 44, 0.24);
                        --indigo: #e8622c;
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
                            radial-gradient(circle at 20% 20%, rgba(232, 98, 44, 0.08), transparent 35%),
                            radial-gradient(circle at 80% 70%, rgba(232, 98, 44, 0.04), transparent 35%),
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
                        border-radius: 999px; border: 1px solid rgba(232, 98, 44, 0.3);
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
                        <h1 className="hold-title">Andy The Coach <em>proposal</em> is being finalized.</h1>
                        <p className="hold-copy">
                            We&apos;re putting the finishing touches on the production plan and pricing. This page will be shared once everything is confirmed.
                        </p>
                    </section>
                </main>
            </>
        );
    }

    const [scrollY, setScrollY] = useState(0);
    const [activeQuarter, setActiveQuarter] = useState('culture');

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

    const quarterContent = {
        culture: {
            icon: '🏛️',
            title: 'Culture',
            tagline: 'Build the foundation',
            desc: 'Company culture is the bedrock of every successful business. Content around culture shows your audience what it truly means to be part of the Blue Collar Business family — the values, the mindset, the people. This is where trust starts.',
            topics: ['Team values & work ethic', 'Behind-the-scenes company life', 'Leadership philosophy', 'Hiring & building teams', 'Company traditions & rituals']
        },
        financial: {
            icon: '💰',
            title: 'Financial',
            tagline: 'Master the numbers',
            desc: 'CEOs who understand their financials scale faster. Content in this quarter breaks down the numbers game — cash flow, margins, reinvestment, and the financial strategies that separate surviving businesses from thriving ones.',
            topics: ['Cash flow management', 'Profit margins & pricing strategy', 'Financial planning for growth', 'Revenue vs. profit mindset', 'Smart reinvestment strategies']
        },
        operations: {
            icon: '⚙️',
            title: 'Operations',
            tagline: 'Systemize the chaos',
            desc: 'Operations is where the rubber meets the road. This content shows CEOs how to build systems that run without them — processes, SOPs, team management, and the infrastructure that lets you step back without everything falling apart.',
            topics: ['Building SOPs that scale', 'Process optimization', 'Team accountability systems', 'Workflow automation', 'Project management frameworks']
        },
        sales: {
            icon: '🎯',
            title: 'Sales',
            tagline: 'Close the deal',
            desc: 'At the end of the day, nothing happens until something gets sold. Sales content positions Andy as the go-to expert for CEOs who need proven closing strategies, pipeline management, and the confidence to command premium pricing.',
            topics: ['Sales pipeline mastery', 'Closing techniques for high-ticket', 'Objection handling frameworks', 'Client retention strategies', 'Premium pricing confidence']
        }
    };

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
                    --teal: #f59e0b;
                    --teal-soft: rgba(245, 158, 11, 0.12);
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

                ::selection { background: rgba(232, 98, 44, 0.35); color: var(--white); }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #e8622c 0%, #f59e0b 100%); border-radius: 999px; }

                .page-shell { position: relative; }

                /* ── CINEMATIC HERO ── */
                .cin-hero {
                    position: relative; min-height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden;
                }

                .cin-hero-bg {
                    position: absolute; inset: 0;
                    background: url('/andy-the-coach/hero.png') center/cover no-repeat;
                    filter: brightness(0.25) saturate(1.3);
                    transform: scale(1.05);
                    transition: transform 0.1s linear;
                }

                .cin-hero-overlay {
                    position: absolute; inset: 0;
                    background:
                        linear-gradient(180deg, rgba(6, 10, 20, 0.5) 0%, rgba(6, 10, 20, 0.3) 40%, rgba(6, 10, 20, 0.85) 80%, #060a14 100%),
                        radial-gradient(ellipse at 30% 30%, rgba(232, 98, 44, 0.15) 0%, transparent 50%);
                }

                .cin-hero-content {
                    position: relative; z-index: 2;
                    text-align: center; padding: 80px 24px 100px;
                    max-width: 900px;
                }

                .hero-badge {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 10px 20px; border: 1px solid rgba(232, 98, 44, 0.35);
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
                    font-size: clamp(48px, 9vw, 100px);
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
                    max-width: 600px; margin: 0 auto 52px;
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
                    border-color: rgba(232, 98, 44, 0.25);
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

                /* ── Divider ── */
                .divider {
                    width: min(100%, 900px); height: 1px; margin: 0 auto;
                    background: linear-gradient(90deg, transparent, rgba(232, 98, 44, 0.3), rgba(245, 158, 11, 0.2), transparent);
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

                /* ── Quarter Tabs ── */
                .quarter-bar { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }

                .quarter-pill {
                    padding: 12px 22px; border-radius: 999px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    background: var(--panel); font-size: 13px; font-weight: 600;
                    color: var(--muted); cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex; align-items: center; gap: 8px;
                }

                .quarter-pill:hover { border-color: rgba(232, 98, 44, 0.3); color: var(--cream); }

                .quarter-pill.active {
                    border-color: var(--orange); background: rgba(232, 98, 44, 0.1); color: var(--orange);
                }

                /* ── Content Format Cards ── */
                .format-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 16px; margin-top: 32px;
                }

                .format-card {
                    padding: 28px 24px; border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 20px; background: var(--panel);
                    transition: all 0.35s ease;
                    position: relative; overflow: hidden;
                }

                .format-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, var(--orange), var(--teal));
                    opacity: 0; transition: opacity 0.3s;
                }

                .format-card:hover { border-color: rgba(232, 98, 44, 0.3); transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4); }
                .format-card:hover::before { opacity: 1; }

                .format-icon { font-size: 32px; margin-bottom: 16px; }
                .format-card h3 { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 8px; }
                .format-card p { font-size: 13px; color: var(--muted-2); line-height: 1.7; }
                .format-card ul { list-style: none; margin-top: 14px; }
                .format-card ul li { font-size: 12px; color: var(--muted-2); padding: 4px 0 4px 18px; position: relative; line-height: 1.5; }
                .format-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--teal); font-size: 10px; }

                /* ── Creative Approach Checklist ── */
                .approach-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 12px; margin-top: 24px;
                }

                .approach-item {
                    display: flex; align-items: flex-start; gap: 14px;
                    padding: 18px 20px; border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 14px; background: var(--panel);
                    transition: all 0.3s ease;
                }

                .approach-item:hover {
                    border-color: rgba(232, 98, 44, 0.2);
                    background: rgba(232, 98, 44, 0.03);
                    transform: translateX(4px);
                }

                .approach-check {
                    width: 24px; height: 24px; border-radius: 8px;
                    background: rgba(232, 98, 44, 0.12); border: 1px solid rgba(232, 98, 44, 0.25);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; margin-top: 2px;
                    color: var(--orange); font-size: 11px; font-weight: 800;
                }

                .approach-name { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
                .approach-desc { font-size: 11px; color: var(--muted-2); line-height: 1.6; }

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
                .del-price { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: var(--orange); }
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
                    background: rgba(245, 158, 11, 0.08); color: var(--teal);
                    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    transition: transform 0.2s, box-shadow 0.2s, background 0.2s; text-decoration: none;
                }

                .meeting-btn:hover { transform: translateY(-2px); background: rgba(245, 158, 11, 0.14); box-shadow: 0 8px 30px rgba(245, 158, 11, 0.2); }

                /* ── Footer ── */
                .th-footer { text-align: center; padding: 80px 24px 48px; border-top: 1px solid rgba(100, 116, 139, 0.08); }
                .footer-logo { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted-3); }
                .footer-tagline { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 300; font-style: italic; color: rgba(100, 116, 139, 0.35); margin-top: 8px; }

                /* ── Reveal ── */
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 640px) {
                    .del-right { flex-direction: column; align-items: flex-end; gap: 6px; }
                    .quarter-bar { gap: 6px; }
                    .quarter-pill { padding: 8px 14px; font-size: 11px; }
                    .format-grid { grid-template-columns: 1fr; }
                    .approach-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="page-shell">
                {/* ═══ CINEMATIC HERO ═══ */}
                <div className="cin-hero">
                    <div className="cin-hero-bg" style={{ transform: `scale(1.05) translateY(${scrollY * 0.15}px)` }} />
                    <div className="cin-hero-overlay" />
                    <div className="cin-hero-content">
                        <div className="hero-badge">MediaGeekz × Blue Collar Business</div>
                        <h1 className="hero-title">
                            Coach.<br /><em>Create.</em><br />Dominate.
                        </h1>
                        <p className="hero-subtitle">
                            A creative partnership between MediaGeekz and Andy The Coach — building a content engine for Blue Collar Business Consultants. Live stream production, vertical content, and a multi-cam approach to position Andy as the go-to business coach for CEOs ready to level up.
                        </p>

                        <div className="hero-meta">
                            <div className="hero-stat">
                                <div className="hero-stat-label">Project</div>
                                <div className="hero-stat-value">Content Engine</div>
                                <div className="hero-stat-detail">Live Stream + Brand Content</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Shoot Date</div>
                                <div className="hero-stat-value">May 2026</div>
                                <div className="hero-stat-detail">Orlando, FL</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Format</div>
                                <div className="hero-stat-value">Multi-Cam</div>
                                <div className="hero-stat-detail">Live Stream + Content</div>
                            </div>
                            <div className="hero-stat">
                                <div className="hero-stat-label">Location</div>
                                <div className="hero-stat-value">Orlando</div>
                                <div className="hero-stat-detail">FL · Studio + On-Location</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ CLIENT PROFILE — ANDY THE COACH ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Client Profile</div>
                        <div className="section-question">Who we&apos;re creating for</div>
                        <h2 className="section-title">Andy The Coach</h2>
                        <p className="section-desc">
                            Founder of Blue Collar Business Consultants — a no-BS business coaching brand built for CEOs who are ready to stop playing small and start building real companies. Andy doesn&apos;t want to be like other coaches who make a quick buck and leave clients with nothing. He wants to be authentic. He wants people to feel like they know him immediately — without ever meeting him.
                        </p>
                    </div>

                    {/* Key Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
                        {[
                            { label: 'Brand', value: 'Blue Collar Business', icon: '🏗️' },
                            { label: 'Known As', value: 'Andy The Coach', icon: '🎙️' },
                            { label: 'Target', value: 'CEOs & Founders', icon: '🎯' },
                            { label: 'Framework', value: '4 Quarters System', icon: '📊' },
                            { label: 'Focus', value: 'Captivate & Convert', icon: '🔥' },
                            { label: 'Location', value: 'Orlando, FL', icon: '📍' },
                        ].map((d, i) => (
                            <div key={i} style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                                <div style={{ fontSize: 18, marginBottom: 6 }}>{d.icon}</div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 4 }}>{d.label}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>{d.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Core Pillars */}
                    <div style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>The 4 Quarters — Content Framework</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {['🏛️ Culture', '💰 Financial', '⚙️ Operations', '🎯 Sales'].map((s, i) => (
                                <span key={i} style={{ padding: '8px 18px', borderRadius: 999, background: 'rgba(232, 98, 44, 0.08)', border: '1px solid rgba(232, 98, 44, 0.15)', color: 'var(--cream)', fontSize: 13, fontWeight: 600 }}>{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Brand Positioning Quote */}
                    <div style={{ padding: '24px', border: '1px solid rgba(232, 98, 44, 0.12)', borderRadius: 16, background: 'rgba(232, 98, 44, 0.03)', borderLeft: '3px solid var(--orange)' }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            &quot;Andy doesn&apos;t want to be like other coaches trying to make a quick buck. He wants to be authentic. He wants people to feel like they know him immediately — without ever meeting him. That&apos;s the content we&apos;re building.&quot;
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--muted-2)', fontWeight: 600 }}>— From the creative meeting</div>
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ THE 4 QUARTERS ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Content Strategy</div>
                        <div className="section-question">The game plan for every piece of content</div>
                        <h2 className="section-title">The 4 Quarters</h2>
                        <p className="section-desc">
                            Every piece of content maps to one of Andy&apos;s four strategic pillars. This framework ensures a balanced content library that speaks to every stage of a CEO&apos;s growth journey.
                        </p>
                    </div>

                    <div className="quarter-bar">
                        {Object.entries(quarterContent).map(([key, q]) => (
                            <button
                                key={key}
                                className={`quarter-pill ${activeQuarter === key ? 'active' : ''}`}
                                onClick={() => setActiveQuarter(key)}
                            >
                                <span>{q.icon}</span>
                                {q.title}
                            </button>
                        ))}
                    </div>

                    {(() => {
                        const q = quarterContent[activeQuarter];
                        return (
                            <div style={{
                                padding: '32px', border: '1px solid rgba(232, 98, 44, 0.15)',
                                borderRadius: 20, background: 'rgba(232, 98, 44, 0.03)',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                    <div style={{ fontSize: 36 }}>{q.icon}</div>
                                    <div>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--white)' }}>{q.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{q.tagline}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>{q.desc}</p>
                                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Content Topic Ideas</div>
                                <div style={{ display: 'grid', gap: 6 }}>
                                    {q.topics.map((topic, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                            <span style={{ color: 'var(--teal)', fontSize: 10 }}>→</span>
                                            <span style={{ fontSize: 13, color: 'var(--cream)', fontWeight: 500 }}>{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </section>

                <div className="divider" />

                {/* ═══ CREATIVE APPROACHES ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Creative Direction</div>
                        <div className="section-question">How we&apos;re filming the content</div>
                        <h2 className="section-title">Creative Approaches</h2>
                        <p className="section-desc">
                            A menu of creative formats and filming styles we can pull from during the shoot. Mix and match to build a diverse content library that keeps the audience engaged.
                        </p>
                    </div>

                    <div className="approach-grid">
                        {[
                            { name: 'Vertical Talks to Camera', desc: 'Quick-hit wisdom drops filmed vertically — direct to camera, raw, real. Perfect for Reels, Shorts, and TikTok.' },
                            { name: 'Live Stream Podcast', desc: 'Long-form live conversations with guests — other CEOs, industry leaders, and people who have been through it.' },
                            { name: 'Coaching Hot Seat', desc: 'Andy brings a CEO into the hot seat and coaches them live — real problems, real solutions, real content.' },
                            { name: 'Whiteboard Breakdowns', desc: 'Andy at the whiteboard breaking down the 4 quarters framework visually, step by step. Easy to clip and repurpose.' },
                            { name: 'B-Roll Montage Clips', desc: 'Cinematic B-roll sequences — leadership moments, team meetings, behind-the-scenes of coaching sessions.' },
                            { name: 'Day-in-the-Life', desc: 'Follow Andy through his day — the real grind, the meetings, the coaching calls. A content goldmine for authenticity.' },
                            { name: 'Testimonial Interviews', desc: 'Sit-down interviews with clients who have been coached by Andy — their transformation story, their results.' },
                            { name: 'Brand Trailer / Sizzle Reel', desc: 'A cinematic trailer for Blue Collar Business Consultants — the one piece of content that says everything in 60 seconds.' },
                            { name: 'Quote Cards / Sound Bites', desc: 'Punchy one-liner moments from Andy — pulled in real-time during filming. Designed for shareability.' },
                            { name: 'Panel Discussion Format', desc: 'Multiple guests at a table discussing business topics — roundtable energy, multiple perspectives, great for clips.' },
                            { name: 'Walk-and-Talk', desc: 'Andy walking through a location, talking to camera — dynamic movement, natural environment, authentic energy.' },
                            { name: 'Reaction / Commentary', desc: 'Andy reacting to business content, news, or trends — adds personality and positions him as a thought leader.' },
                        ].map((approach, i) => (
                            <div className="approach-item" key={i}>
                                <div className="approach-check">✓</div>
                                <div>
                                    <div className="approach-name">{approach.name}</div>
                                    <div className="approach-desc">{approach.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ VISUAL TREATMENT GALLERY ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Visual Treatment</div>
                        <div className="section-question">The look and feel of production</div>
                        <h2 className="section-title">Production Style References</h2>
                        <p className="section-desc">
                            Cinematic, moody, and premium. Not a corporate promo — a brand story that commands attention and builds trust with high-level CEOs before they ever pick up the phone.
                        </p>
                    </div>

                    <div className="treatment-grid">
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/andy-the-coach/hero.png" alt="Coaching session" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Coaching · Leadership</div>
                                Coach in action — commanding the room with authority
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/andy-the-coach/livestream.png" alt="Live stream setup" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Live Stream · Podcast</div>
                                Multi-cam live stream — intimate conversations, big energy
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/andy-the-coach/vertical-content.png" alt="Vertical content" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Vertical · Social</div>
                                Direct-to-camera — raw, real, and shareable
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/andy-the-coach/multicam.png" alt="Multi-cam production" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">BTS · Production</div>
                                Cinema-grade multi-cam production setup
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/andy-the-coach/coaching.png" alt="1-on-1 coaching" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Intimate · Connection</div>
                                1-on-1 coaching — real conversations, real results
                            </div>
                        </div>
                        <div className="treatment-card">
                            <div style={{ overflow: 'hidden' }}>
                                <img className="treatment-img" src="/andy-the-coach/orlando.png" alt="Orlando skyline" />
                            </div>
                            <div className="treatment-caption">
                                <div className="treatment-type">Aerial · Location</div>
                                Orlando, FL — the backdrop for the brand
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ ORLANDO IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/andy-the-coach/orlando.png')", transform: `translateY(${(scrollY - 3000) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Filmed On Location · <span>Orlando, FL</span></div>
                    </div>
                </div>

                {/* ═══ CONTENT FORMAT BREAKDOWN ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Content Formats</div>
                        <div className="section-question">What we&apos;re producing</div>
                        <h2 className="section-title">The Content Engine</h2>
                        <p className="section-desc">
                            We&apos;re not shooting one video — we&apos;re building a content library. One shoot day, maximum output. Every format is designed to feed the machine.
                        </p>
                    </div>

                    <div className="format-grid">
                        <div className="format-card">
                            <div className="format-icon">📡</div>
                            <h3>Live Stream Production</h3>
                            <p>Multi-cam live stream setup — professional audio, switching, graphics, and real-time audience engagement. This is the centerpiece of the content strategy.</p>
                            <ul>
                                <li>Multi-camera switching (2-3 angles)</li>
                                <li>Professional audio setup</li>
                                <li>Live graphics & lower thirds</li>
                                <li>Real-time chat integration</li>
                                <li>Stream to YouTube / LinkedIn / Facebook</li>
                            </ul>
                        </div>
                        <div className="format-card">
                            <div className="format-icon">📱</div>
                            <h3>Vertical Social Content</h3>
                            <p>Quick-hit vertical clips — talks to camera, wisdom drops, and punchy one-liners. Designed to stop the scroll and build the audience on every platform.</p>
                            <ul>
                                <li>Instagram Reels</li>
                                <li>YouTube Shorts</li>
                                <li>TikTok content</li>
                                <li>LinkedIn vertical video</li>
                                <li>Quantity-focused approach</li>
                            </ul>
                        </div>
                        <div className="format-card">
                            <div className="format-icon">🎬</div>
                            <h3>Brand Trailer / Sizzle</h3>
                            <p>A cinematic 60-second trailer for Blue Collar Business Consultants — the one piece of content that tells the world who Andy is and why CEOs need to listen.</p>
                            <ul>
                                <li>Cinematic color grading</li>
                                <li>Professional sound design</li>
                                <li>Motion graphics & titles</li>
                                <li>Voiceover narrative</li>
                                <li>Hero piece for website & ads</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ═══ PRODUCTION BTS IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/andy-the-coach/multicam.png')", transform: `translateY(${(scrollY - 5000) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Multi-Cam <span>Cinema-Grade</span> Production</div>
                    </div>
                </div>

                {/* ═══ INVESTMENT / PRICING ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment</div>
                        <div className="section-question">Production & Post-Production breakdown</div>
                        <h2 className="section-title">Project Investment</h2>
                        <p className="section-desc">
                            Complete production breakdown — crew, camera package, live stream infrastructure, post-production, and all deliverables. Pricing is being finalized.
                        </p>
                    </div>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', marginBottom: 24 }}>
                            <div style={{ padding: '32px 40px', background: 'rgba(232, 98, 44, 0.06)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 4 }}>Full Service Production</div>
                                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--white)' }}>Blue Collar Content Package</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 10, color: 'var(--muted-2)', marginBottom: 4 }}>TOTAL INVESTMENT</div>
                                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--orange)' }}>TBD</div>
                                </div>
                            </div>

                            <div style={{ padding: '32px 40px' }}>
                                <div style={{ display: 'grid', gap: 16 }}>
                                    {[
                                        { label: 'Director / Lead DP', detail: 'Matt Workman — Creative direction & cinematography', price: 'TBD' },
                                        { label: 'Director of Photography', detail: 'Daniel Castillo — 2nd camera & technical execution', price: 'TBD' },
                                        { label: 'Live Stream Technical Director', detail: 'Camera switching, graphics, stream management', price: 'TBD' },
                                        { label: 'Pre-Production', detail: 'Creative planning, content calendar mapping, format strategy', price: 'TBD' },
                                        { label: 'Camera & Lighting Package', detail: 'Multi-cam cinema setup, LED panels, professional audio', price: 'TBD' },
                                        { label: 'Live Stream Infrastructure', detail: 'Streaming software, switching hardware, internet setup', price: 'TBD' },
                                        { label: 'Post-Production — Social Clips', detail: 'Batch editing vertical content, captions, color grading', price: 'TBD' },
                                        { label: 'Post-Production — Brand Trailer', detail: 'Cinematic edit, sound design, motion graphics, color grade', price: 'TBD' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, borderBottom: i === 7 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                                            <div>
                                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{item.label}</div>
                                                <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{item.detail}</div>
                                            </div>
                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--cream)', whiteSpace: 'nowrap', marginLeft: 16 }}>{item.price}</div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: 32, padding: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 0 }}>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--white)' }}>Total</div>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--orange)' }}>TBD</div>
                                    </div>
                                    <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7 }}>
                                        Pricing will be finalized after confirming the full scope — number of shoot days, final deliverable count, and any additional production needs.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div className="footer-logo">MediaGeekz × Andy The Coach</div>
                    <div className="footer-tagline">Blue collar work ethic. Premium content.</div>
                </div>
            </div>
        </>
    );
}
