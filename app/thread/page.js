'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   MediaGeekz — Thread Link
   Collaborative Project Space · Winter Garden, FL
   Agency Promo Video — First Shoot Together
   ═══════════════════════════════════════════════════════════════ */

export default function ThreadLink() {
    const [activePhase, setActivePhase] = useState('pre-production');

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
                    --green: #22c55e;
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
                .th-hero {
                    min-height: 80vh;
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: center;
                    text-align: center; padding: 80px 24px 60px;
                    position: relative;
                    background:
                        radial-gradient(ellipse at 50% 20%, rgba(232, 98, 44, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 60%, rgba(45, 212, 191, 0.04) 0%, transparent 40%);
                }

                .th-hero::after {
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
                .th-section {
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

                /* ── Phase Status Bar ── */
                .phase-bar {
                    display: flex; gap: 8px; margin-bottom: 48px;
                    flex-wrap: wrap;
                }

                .phase-pill {
                    padding: 10px 20px; border-radius: 999px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    background: var(--panel);
                    font-size: 12px; font-weight: 600;
                    color: var(--muted); cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex; align-items: center; gap: 8px;
                }

                .phase-pill:hover { border-color: rgba(232, 98, 44, 0.3); color: var(--cream); }

                .phase-pill.active {
                    border-color: var(--orange);
                    background: rgba(232, 98, 44, 0.1);
                    color: var(--orange);
                }

                .phase-dot-sm {
                    width: 6px; height: 6px; border-radius: 50%;
                }

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

                /* ── Deliverables Grid ── */
                .del-grid {
                    display: grid; grid-template-columns: 1fr;
                    gap: 14px; margin-top: 32px;
                }

                .del-card {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 22px 24px;
                    border: 1px solid rgba(100, 116, 139, 0.12);
                    border-radius: 16px; background: var(--panel);
                    transition: all 0.3s ease;
                }

                .del-card:hover {
                    border-color: rgba(232, 98, 44, 0.25);
                    transform: translateX(6px);
                    background: rgba(232, 98, 44, 0.03);
                }

                .del-info { flex: 1; }
                .del-name { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; color: var(--white); }
                .del-desc { font-size: 12px; color: var(--muted-2); margin-top: 4px; }

                .del-right { display: flex; align-items: center; gap: 16px; }
                .del-eta { font-size: 12px; color: var(--muted-2); font-family: 'Outfit', sans-serif; }
                .del-status {
                    padding: 5px 14px; border-radius: 999px;
                    font-size: 10px; font-weight: 800;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    border: 1px solid;
                }

                /* ── Team Section ── */
                .team-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px; margin-top: 32px;
                }

                .team-card {
                    display: flex; align-items: center; gap: 18px;
                    padding: 24px 20px;
                    border: 1px solid rgba(100, 116, 139, 0.12);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s, transform 0.3s;
                }

                .team-card:hover { border-color: rgba(232, 98, 44, 0.25); transform: translateY(-2px); }

                .team-avatar {
                    width: 52px; height: 52px;
                    display: flex; align-items: center; justify-content: center;
                    background: var(--orange-soft); border: 1px solid rgba(232, 98, 44, 0.2);
                    border-radius: 14px; font-size: 24px;
                }

                .team-name { font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 600; color: var(--white); }
                .team-role { font-size: 12px; color: var(--muted); margin-top: 3px; }

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
                .th-footer {
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

                @media (max-width: 640px) {
                    .del-right { flex-direction: column; align-items: flex-end; gap: 6px; }
                    .phase-bar { gap: 6px; }
                    .phase-pill { padding: 8px 14px; font-size: 11px; }
                }
            `}</style>

            <div className="page-shell">
                {/* ── HERO ── */}
                <div className="th-hero">
                    <div className="hero-badge">MediaGeekz — Project Thread</div>
                    <h1 className="hero-title">
                        Let&apos;s<br /><em>Build.</em><br />Together.
                    </h1>
                    <p className="hero-subtitle">
                        Your private production thread — a shared space where we plan, track, and deliver your agency&apos;s promo video. First shoot together. Let&apos;s make it count.
                    </p>

                    <div className="hero-meta">
                        <div className="hero-stat">
                            <div className="hero-stat-label">Project</div>
                            <div className="hero-stat-value">Agency Promo</div>
                            <div className="hero-stat-detail">Brand video for your agency</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Shoot Date</div>
                            <div className="hero-stat-value">April TBD</div>
                            <div className="hero-stat-detail">Picking the date today</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Format</div>
                            <div className="hero-stat-value">Multi-Cam</div>
                            <div className="hero-stat-detail">Cinematic agency brand film</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Location</div>
                            <div className="hero-stat-value">Winter Garden</div>
                            <div className="hero-stat-detail">FL · On-Location</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── PROJECT STATUS ── */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Project Status</div>
                        <div className="section-question">Where are we right now?</div>
                        <h2 className="section-title">Planning Phase</h2>
                        <p className="section-desc">
                            We&apos;re picking the shoot date today and mapping out the vision for your agency promo. Here&apos;s where things stand across every phase of production.
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
                                <div className="timeline-desc">Define the visual story — what does your agency look like on camera? Hero angles, team moments, workspace energy, client-facing scenes. We&apos;ll build a shot list together.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">○ Upcoming</div>
                                <div className="timeline-label">Location Scout — Winter Garden</div>
                                <div className="timeline-desc">Walk the space, test natural light, find hero backdrops, plan camera placements. Identify any grip/lighting needs.</div>
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
                                <div className="timeline-time">Morning</div>
                                <div className="timeline-label">Arrive + Setup</div>
                                <div className="timeline-desc">Position cameras, set lighting, dress the set. Test audio and dial in the look before talent arrives.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Late Morning</div>
                                <div className="timeline-label">Hero Shots — Agency Team</div>
                                <div className="timeline-desc">Cinematic portraits and action shots of the team at work. The faces of your agency, captured with intention.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Midday</div>
                                <div className="timeline-label">Brand Story — Talking Heads</div>
                                <div className="timeline-desc">Short, punchy interview segments. Who are you? What do you do? Why should people care? Natural and conversational.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Afternoon</div>
                                <div className="timeline-label">B-Roll + Environment</div>
                                <div className="timeline-desc">Cinematic detail shots — workspace energy, team collaboration, client-facing moments. The texture that makes the edit sing.</div>
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
                                <div className="timeline-time">Week 1</div>
                                <div className="timeline-label">Hero Edit — Agency Brand Film</div>
                                <div className="timeline-desc">Primary 60–90 sec cinematic brand video. Color graded, sound designed, motion graphics. Priority delivery within ~7 days.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 1–2</div>
                                <div className="timeline-label">Social Clips — First Batch</div>
                                <div className="timeline-desc">Vertical cuts optimized for Reels and TikTok. Quick-hit agency highlights for immediate posting.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 2</div>
                                <div className="timeline-label">Extended Cut + BTS Photos</div>
                                <div className="timeline-desc">Longer-form version for website/YouTube + full BTS photography set delivered via secure link.</div>
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
                                <div className="timeline-time">Week 1 Post-Shoot</div>
                                <div className="timeline-label">Agency Brand Film — Hero Edit</div>
                                <div className="timeline-desc">Priority delivery via secure download link. You&apos;ll get a notification when it&apos;s ready for review.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 1</div>
                                <div className="timeline-label">BTS Photography</div>
                                <div className="timeline-desc">Behind-the-scenes photos, professionally edited, delivered via gallery link.</div>
                            </div>
                            <div className="timeline-block">
                                <div className="timeline-time">Week 2</div>
                                <div className="timeline-label">Social Clips + Extended Cut</div>
                                <div className="timeline-desc">All vertical social cuts and the extended website/YouTube version, ready for launch.</div>
                            </div>
                        </div>
                    )}
                </section>

                <div className="divider" />

                {/* ── DELIVERABLES ── */}
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
                            { name: 'Agency Brand Film (60–90 sec)', desc: 'Cinematic hero video — color graded, sound designed, motion graphics', eta: '~1 week post-shoot', status: 'upcoming' },
                            { name: 'Extended Cut (2–3 min)', desc: 'Longer version for website & YouTube — full brand story', eta: '~2 weeks', status: 'upcoming' },
                            { name: 'Social Clips (4–6 cuts)', desc: 'Vertical 30–60s cuts for Reels, TikTok, LinkedIn', eta: '~10 days', status: 'upcoming' },
                            { name: 'BTS Photography', desc: 'Behind-the-scenes photos, professionally edited', eta: '~3 days', status: 'upcoming' },
                            { name: '2 Revision Rounds per Deliverable', desc: 'Feedback tracked in-thread — just reply with notes', eta: 'Ongoing', status: 'included' },
                        ].map((d, i) => (
                            <div className="del-card" key={i}>
                                <div className="del-info">
                                    <div className="del-name">{d.name}</div>
                                    <div className="del-desc">{d.desc}</div>
                                </div>
                                <div className="del-right">
                                    <div className="del-eta">ETA {d.eta}</div>
                                    <div
                                        className="del-status"
                                        style={{
                                            color: d.status === 'included' ? 'var(--teal)' : 'var(--orange)',
                                            borderColor: d.status === 'included' ? 'rgba(45, 212, 191, 0.3)' : 'rgba(232, 98, 44, 0.3)',
                                            background: d.status === 'included' ? 'rgba(45, 212, 191, 0.08)' : 'rgba(232, 98, 44, 0.08)',
                                        }}
                                    >
                                        {d.status === 'included' ? 'Included' : 'Upcoming'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ── EQUIPMENT ── */}
                <section className="th-section reveal">
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
                            <ul><li>85mm f/1.4 GM</li><li>S-Log3 / S-Gamut3.Cine</li><li>4K 24fps</li><li>XAVC-S 4:2:2 10-bit</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--teal)' }}>✦ Camera B — 2nd Angle</div>
                            <h3>Sony A7S III</h3>
                            <p>B-cam on complementary angle — captures reactions and close-ups.</p>
                            <ul><li>24-70mm f/2.8 GM</li><li>Matched color science</li><li>Low-light capable</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#A78BFA' }}>✦ Camera C — Wide</div>
                            <h3>Sony A7S III</h3>
                            <p>Locked-off wide establishing shot — full scene coverage for editor&apos;s cutaways.</p>
                            <ul><li>16-35mm f/2.8 GM</li><li>Static tripod</li><li>Full room coverage</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                            <h3>Dual Wireless Lavs</h3>
                            <p>One lav per participant. Clean, isolated audio tracks for each speaker.</p>
                            <ul><li>Sennheiser EW-D ×2</li><li>Rode NTG5 boom backup</li><li>Zoom F6 32-bit float</li><li>Synced timecode</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#FBBF24' }}>✦ Lighting</div>
                            <h3>Interview Kit</h3>
                            <p>Soft, flattering key light with controlled fill and separation.</p>
                            <ul><li>300W LED + 47&quot; Softbox</li><li>Aputure MC RGB fill ×2</li><li>4×4 neg fill flag</li><li>LED hair light / edge</li></ul>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── YOUR TEAM ── */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Your Team</div>
                        <h2 className="section-title">Who&apos;s on your project</h2>
                        <p className="section-desc">
                            Your dedicated production crew. Any questions or ideas — reach out to us directly through this thread.
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

                {/* ── FOOTER ── */}
                <div className="th-footer">
                    <div className="footer-logo">MediaGeekz</div>
                    <div className="footer-tagline">Your production. Our obsession.</div>
                </div>
            </div>
        </>
    );
}
