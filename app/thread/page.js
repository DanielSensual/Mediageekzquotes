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
    const [feedbackState, setFeedbackState] = useState({});
    const [toastMsg, setToastMsg] = useState(null);

    const toggleAddOn = (id) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const sendFeedback = async (section, reaction, comment) => {
        setFeedbackState(prev => ({ ...prev, [section]: { ...prev[section], sending: true } }));
        try {
            await fetch('/api/thread-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, reaction, comment, timestamp: new Date().toISOString() }),
            });
            setFeedbackState(prev => ({ ...prev, [section]: { sent: true, reaction } }));
            setToastMsg(`Feedback sent for ${section}!`);
            setTimeout(() => setToastMsg(null), 3000);
        } catch (e) {
            console.error(e);
            setFeedbackState(prev => ({ ...prev, [section]: { ...prev[section], sending: false } }));
        }
    };

    const FeedbackBar = ({ section }) => {
        const state = feedbackState[section] || {};
        const [open, setOpen] = useState(false);
        const [comment, setComment] = useState('');

        if (state.sent) {
            return (
                <div className="fb-bar fb-sent">
                    <span className="fb-check">✓</span> Thanks for the feedback on <strong>{section}</strong>
                </div>
            );
        }

        return (
            <div className="fb-bar">
                <div className="fb-row">
                    <span className="fb-label">How does this section feel?</span>
                    <div className="fb-reactions">
                        {[
                            { key: 'love', emoji: '❤️', tip: 'Love it' },
                            { key: 'like', emoji: '👍', tip: 'Looks good' },
                            { key: 'change', emoji: '✏️', tip: 'Needs changes' },
                        ].map(r => (
                            <button key={r.key} className={`fb-btn ${state.reaction === r.key ? 'active' : ''}`}
                                onClick={() => {
                                    if (r.key === 'change') { setOpen(true); setFeedbackState(prev => ({ ...prev, [section]: { reaction: r.key } })); }
                                    else sendFeedback(section, r.key, '');
                                }}
                                disabled={state.sending}
                                title={r.tip}
                            >{r.emoji}</button>
                        ))}
                        <button className="fb-comment-toggle" onClick={() => setOpen(!open)} title="Add a comment">💬</button>
                    </div>
                </div>
                {open && (
                    <div className="fb-comment-area">
                        <textarea className="fb-textarea" placeholder={`Any notes on the ${section.toLowerCase()} section...`}
                            value={comment} onChange={e => setComment(e.target.value)} rows={3} />
                        <button className="fb-send" onClick={() => sendFeedback(section, state.reaction || 'comment', comment)}
                            disabled={state.sending || !comment.trim()}
                        >{state.sending ? 'Sending...' : 'Send Feedback'}</button>
                    </div>
                )}
            </div>
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

                /* ── Shoot Day Schedule ── */
                .sd-schedule { display: grid; gap: 0; margin-top: 32px; position: relative; }
                .sd-schedule::before {
                    content: ''; position: absolute; left: 28px; top: 28px; bottom: 28px;
                    width: 2px; background: linear-gradient(180deg, var(--orange), var(--teal), rgba(99,102,241,0.2));
                }

                .sd-block {
                    display: grid; grid-template-columns: 56px 1fr; gap: 20px;
                    padding: 20px 0; position: relative;
                }

                .sd-time-col {
                    display: flex; flex-direction: column; align-items: center; position: relative;
                }

                .sd-dot {
                    width: 14px; height: 14px; border-radius: 50%;
                    background: var(--orange); border: 3px solid var(--shadow);
                    box-shadow: 0 0 0 5px rgba(99,102,241,0.12);
                    position: relative; z-index: 2;
                }

                .sd-dot.teal { background: var(--teal); box-shadow: 0 0 0 5px rgba(167,139,250,0.12); }
                .sd-dot.green { background: var(--green); box-shadow: 0 0 0 5px rgba(34,197,94,0.12); }

                .sd-time {
                    font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
                    color: var(--muted); margin-top: 6px; white-space: nowrap;
                }

                .sd-content {
                    padding: 20px 24px; border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s, transform 0.3s;
                }

                .sd-content:hover { border-color: rgba(99,102,241,0.25); transform: translateX(4px); }

                .sd-phase {
                    font-size: 9px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
                    padding: 4px 10px; border-radius: 6px; display: inline-block; margin-bottom: 10px;
                }

                .sd-phase.setup { background: rgba(99,102,241,0.12); color: var(--orange); }
                .sd-phase.shoot { background: rgba(34,197,94,0.12); color: var(--green); }
                .sd-phase.wrap { background: rgba(167,139,250,0.12); color: var(--teal); }

                .sd-title {
                    font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 700;
                    color: var(--white); margin-bottom: 6px;
                }

                .sd-desc { font-size: 12px; color: var(--muted-2); line-height: 1.7; }

                .sd-shots {
                    display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px;
                }

                .sd-shot-tag {
                    padding: 3px 10px; border-radius: 6px; font-size: 10px; font-weight: 600;
                    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
                    color: var(--cream);
                }

                /* ── Shot List Cards ── */
                .shot-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 14px; margin-top: 28px;
                }

                .shot-card {
                    padding: 24px 20px; border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s, transform 0.3s;
                }

                .shot-card:hover { border-color: rgba(99,102,241,0.25); transform: translateY(-3px); }

                .shot-num {
                    font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800;
                    color: rgba(99,102,241,0.15); line-height: 1; margin-bottom: 8px;
                }

                .shot-name {
                    font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700;
                    color: var(--white); margin-bottom: 6px;
                }

                .shot-setup { font-size: 11px; color: var(--orange); font-weight: 600; margin-bottom: 6px; }
                .shot-desc { font-size: 12px; color: var(--muted-2); line-height: 1.7; }

                @media (max-width: 640px) {
                    .sd-schedule::before { left: 24px; }
                    .sd-block { grid-template-columns: 48px 1fr; gap: 14px; }
                    .shot-grid { grid-template-columns: 1fr; }
                }

                /* ── Script Section ── */
                .script-block {
                    position: relative; padding: 24px 24px 24px 32px;
                    border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
                    background: var(--panel); margin-bottom: 16px;
                    border-left: 3px solid rgba(99,102,241,0.3);
                    transition: border-color 0.3s, transform 0.3s;
                }
                .script-block:hover { border-left-color: var(--orange); transform: translateX(4px); }

                .script-time-badge {
                    display: inline-block; padding: 3px 10px; border-radius: 6px;
                    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
                    background: rgba(99,102,241,0.12); color: var(--orange);
                    margin-bottom: 8px; font-family: 'Outfit', sans-serif;
                }

                .script-beat {
                    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
                    color: var(--white); margin-bottom: 6px;
                }

                .script-broll {
                    font-size: 11px; color: var(--teal); font-weight: 500;
                    margin-bottom: 10px; font-style: italic; line-height: 1.5;
                }

                .script-vo {
                    font-size: 14px; color: var(--cream); line-height: 1.8;
                    font-style: italic; font-family: 'Outfit', sans-serif;
                    font-weight: 300;
                }

                .script-vo strong { font-weight: 500; color: var(--white); }

                .alt-line {
                    padding: 12px 16px; border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px; background: rgba(255,255,255,0.02);
                    font-size: 12px; color: var(--muted-2); line-height: 1.6;
                    font-style: italic;
                }

                .alt-line span { color: var(--muted-3); font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 4px; font-style: normal; }

                /* ── Feedback Bar ── */
                .fb-bar {
                    margin: 20px 0 8px; padding: 14px 18px;
                    border: 1px solid rgba(99,102,241,0.1); border-radius: 14px;
                    background: rgba(99,102,241,0.03);
                    transition: all 0.3s;
                }
                .fb-bar:hover { border-color: rgba(99,102,241,0.2); }
                .fb-sent { text-align: center; color: var(--teal); font-size: 13px; font-weight: 500; }
                .fb-sent strong { color: var(--white); }
                .fb-check { display: inline-block; width: 20px; height: 20px; border-radius: 50%; background: var(--teal); color: #000; font-size: 12px; line-height: 20px; text-align: center; margin-right: 8px; font-weight: 700; }
                .fb-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
                .fb-label { font-size: 12px; color: var(--muted-2); font-weight: 500; }
                .fb-reactions { display: flex; gap: 6px; align-items: center; }
                .fb-btn {
                    width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(255,255,255,0.03); cursor: pointer; font-size: 16px;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                }
                .fb-btn:hover { background: rgba(255,255,255,0.08); transform: scale(1.1); border-color: var(--orange); }
                .fb-btn.active { background: rgba(232,118,74,0.15); border-color: var(--orange); transform: scale(1.15); }
                .fb-btn:disabled { opacity: 0.5; cursor: wait; }
                .fb-comment-toggle {
                    width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06);
                    background: transparent; cursor: pointer; font-size: 14px;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                }
                .fb-comment-toggle:hover { background: rgba(255,255,255,0.06); }
                .fb-comment-area { margin-top: 12px; }
                .fb-textarea {
                    width: 100%; padding: 10px 14px; border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.3);
                    color: var(--cream); font-size: 13px; font-family: 'Inter', sans-serif;
                    resize: vertical; min-height: 60px; outline: none;
                    transition: border-color 0.2s;
                }
                .fb-textarea:focus { border-color: var(--orange); }
                .fb-textarea::placeholder { color: var(--muted-3); }
                .fb-send {
                    margin-top: 8px; padding: 8px 20px; border-radius: 8px;
                    border: none; background: var(--orange); color: #000;
                    font-size: 12px; font-weight: 700; cursor: pointer;
                    letter-spacing: 0.05em; transition: all 0.2s;
                }
                .fb-send:hover { filter: brightness(1.1); transform: translateY(-1px); }
                .fb-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
                .fb-toast {
                    position: fixed; bottom: 24px; right: 24px; padding: 12px 20px;
                    background: var(--teal); color: #000; border-radius: 10px;
                    font-size: 13px; font-weight: 600; z-index: 9999;
                    animation: fbToastIn 0.3s ease-out;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }
                @keyframes fbToastIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

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
                                <div className="hero-stat-value">April 19</div>
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
                            { icon: '🤝', title: 'Human Connection', desc: 'Real conversations. Team working together, not performing for camera. The authenticity that makes people trust you before they ever call.' },
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
                            { icon: '🌅', title: 'Downtown Winter Garden', desc: 'Plant Street — recognizable local texture in the background. 2–3 quick seconds, not center stage. Pending location approval.' },
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

                <FeedbackBar section="Creative Treatment" />

                <div className="divider" />

                {/* ═══ SHOOT DAY DIRECTION ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Shoot Day Direction</div>
                        <div className="section-question">Production schedule & B-roll treatment</div>
                        <h2 className="section-title">Day of Shoot</h2>
                        <p className="section-desc">
                            A full production day capturing ThreadLink in its element — the workspace, the process, the team energy. Every shot is designed to feel organic and cinematic.
                        </p>
                    </div>

                    {/* Shoot Day Overview Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
                        {[
                            { label: 'Date', value: 'April 19', sub: 'Sunday', icon: '📅' },
                            { label: 'Location', value: 'ThreadLink HQ', sub: 'Clermont, FL', icon: '📍' },
                            { label: 'Load In', value: '8:00 AM', sub: 'Crew call time', icon: '🚛' },
                            { label: 'First Shot', value: '9:30 AM', sub: 'Cameras rolling', icon: '🎬' },
                            { label: 'Wrap', value: '6:00 PM', sub: 'Full day shoot', icon: '🎬' },
                            { label: 'Format', value: 'B-Roll Heavy', sub: 'Cinematic office', icon: '📹' },
                        ].map((d, i) => (
                            <div key={i} style={{ padding: '18px 16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, background: 'var(--panel)', textAlign: 'center' }}>
                                <div style={{ fontSize: 20, marginBottom: 6 }}>{d.icon}</div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 4 }}>{d.label}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>{d.value}</div>
                                <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 2 }}>{d.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Production Schedule */}
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>Production Schedule</div>
                        <div className="sd-schedule">
                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot" />
                                    <div className="sd-time">8:00 AM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase setup">Setup</div>
                                    <div className="sd-title">Load-In & Technical Setup</div>
                                    <div className="sd-desc">Crew arrives. Unload camera, grip, and lighting packages. Scout the office for best angles, identify hero positions (desks, conference room, exterior). Set up dual Sony FX3 bodies, LED panels, RGB accent lights for brand color. Test audio levels.</div>
                                    <div className="sd-shots">
                                        <span className="sd-shot-tag">Camera Setup</span>
                                        <span className="sd-shot-tag">Lighting Rig</span>
                                        <span className="sd-shot-tag">Audio Check</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot green" />
                                    <div className="sd-time">9:30 AM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase shoot">Shooting</div>
                                    <div className="sd-title">Scene Block 1 — Morning Workflow</div>
                                    <div className="sd-desc">Capture the team arriving and settling in. Coffee in hand, screens lighting up, the natural energy of a creative studio starting its day. Focus on tight detail shots — fingers on keyboard, cursor on screen, Figma boards loading.</div>
                                    <div className="sd-shots">
                                        <span className="sd-shot-tag">Desk B-Roll</span>
                                        <span className="sd-shot-tag">Screen OTS</span>
                                        <span className="sd-shot-tag">Detail Inserts</span>
                                        <span className="sd-shot-tag">Coffee Moment</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot green" />
                                    <div className="sd-time">11:00 AM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase shoot">Shooting</div>
                                    <div className="sd-title">Scene Block 2 — The Design Process</div>
                                    <div className="sd-desc">Apple Pencil on iPad in motion. Designers moving between Figma and Webflow. Over-the-shoulder shots of creative layouts being built, stylescapes being reviewed. Slider moves between workstations. This is the core of the film — the craft.</div>
                                    <div className="sd-shots">
                                        <span className="sd-shot-tag">Apple Pencil / iPad</span>
                                        <span className="sd-shot-tag">Figma Workflow</span>
                                        <span className="sd-shot-tag">Slider Moves</span>
                                        <span className="sd-shot-tag">Tight Hand Work</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot teal" />
                                    <div className="sd-time">12:30 PM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase wrap">Break</div>
                                    <div className="sd-title">Lunch & Reset</div>
                                    <div className="sd-desc">Team breaks while crew repositions for afternoon scenes. Adjust lighting setups for conference room and exterior shots. Review morning footage selects.</div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot green" />
                                    <div className="sd-time">1:30 PM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase shoot">Shooting</div>
                                    <div className="sd-title">Scene Block 3 — Team Collaboration</div>
                                    <div className="sd-desc">Conference room strategy sessions. Team gathered around a screen reviewing client work. Natural conversations — not scripted. Wide shots establish the space, tight shots capture genuine reactions and creative energy. Whiteboard brainstorming if applicable.</div>
                                    <div className="sd-shots">
                                        <span className="sd-shot-tag">Conference Wide</span>
                                        <span className="sd-shot-tag">Team Reactions</span>
                                        <span className="sd-shot-tag">Strategy Session</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot green" />
                                    <div className="sd-time">3:00 PM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase shoot">Shooting</div>
                                    <div className="sd-title">Scene Block 4 — Brand in the Wild</div>
                                    <div className="sd-desc">Subtle brand placement shots. ThreadLink logo on screen matching real-world collateral. Business cards, printed materials, branded assets in the environment. The "Screen to Street" concept — digital work becoming tangible.</div>
                                    <div className="sd-shots">
                                        <span className="sd-shot-tag">Brand Collateral</span>
                                        <span className="sd-shot-tag">Logo Reveals</span>
                                        <span className="sd-shot-tag">Print Materials</span>
                                        <span className="sd-shot-tag">Environmental</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot green" />
                                    <div className="sd-time">4:30 PM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase shoot">Shooting</div>
                                    <div className="sd-title">Scene Block 5 — Golden Hour & Exteriors</div>
                                    <div className="sd-desc">Exterior shots of the ThreadLink office at golden hour. Building signage, parking lot arrival, team walking out. Downtown Winter Garden if approved — Plant Street storefronts for local texture. Drone coverage if add-on is selected.</div>
                                    <div className="sd-shots">
                                        <span className="sd-shot-tag">Office Exterior</span>
                                        <span className="sd-shot-tag">Golden Hour</span>
                                        <span className="sd-shot-tag">Downtown B-Roll (Pending)</span>
                                        <span className="sd-shot-tag">Drone (optional)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sd-block">
                                <div className="sd-time-col">
                                    <div className="sd-dot teal" />
                                    <div className="sd-time">6:00 PM</div>
                                </div>
                                <div className="sd-content">
                                    <div className="sd-phase wrap">Wrap</div>
                                    <div className="sd-title">Wrap & Equipment Strike</div>
                                    <div className="sd-desc">Final review of shot list. Confirm all scenes covered. Break down equipment, pack out. Transfer media cards to backup drives. Crew wraps for the day.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* B-Roll Shot List */}
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>Detailed B-Roll Shot List</div>
                        <div style={{ fontSize: 12, color: 'var(--muted-2)', marginBottom: 20, lineHeight: 1.7 }}>Every shot planned for maximum editorial flexibility in post-production.</div>
                        <div className="shot-grid">
                            {[
                                { num: '01', name: 'Slider Desk Pass', setup: 'A-Cam · Slider · Low Angle', desc: 'Smooth slider move between workstations — camera glides past two designers at their desks. Shallow depth of field, bokeh of RGB LED accents in background. Sets the cinematic tone.' },
                                { num: '02', name: 'Apple Pencil Insert', setup: 'B-Cam · Macro Lens · Handheld', desc: 'Extreme close-up of Apple Pencil tip touching iPad surface. Drawing strokes, brush adjustments, color picker. The creative tool in motion — detail that sells craftsmanship.' },
                                { num: '03', name: 'Over-the-Shoulder Code', setup: 'A-Cam · 85mm · Tripod', desc: 'OTS of developer/designer working in Webflow or code editor. Screen fills the background (bokeh), shoulder and hands framed tight. Shows the technical depth.' },
                                { num: '04', name: 'Team Huddle Wide', setup: 'A-Cam · 24mm · Steadicam', desc: 'Conference room establishing shot. Team gathered around a screen or whiteboard. Natural conversation energy, not posed. Steadicam orbit from door entry to 3/4 view.' },
                                { num: '05', name: 'Coffee & Conversation', setup: 'B-Cam · 50mm · Handheld', desc: 'Two team members talking casually — maybe reviewing a phone, pointing at a screen. Coffee cups visible. The human connection moment that makes the film feel real.' },
                                { num: '06', name: 'Screen to Print Match', setup: 'A-Cam · Macro → Wide Pull', desc: 'Logo on screen, then match cut to the same logo on a business card or wall sign. The "screen to street" concept in one sequence. Rack focus from screen to physical collateral.' },
                                { num: '07', name: 'Keyboard Typing Detail', setup: 'B-Cam · Macro · Top-Down', desc: 'Overhead or low-angle shot of hands typing — rapid creative work. RGB-lit keys, shallow depth. Quick editorial cut that drives pace and energy in the final edit.' },
                                { num: '08', name: 'Window Light Portrait', setup: 'A-Cam · 85mm · Natural Light', desc: 'William at his desk, natural window light. Not looking at camera — engaged in work. Shallow depth, warm tone. The founder in his element. Hero shot for thumbnails and social.' },
                                { num: '09', name: 'Office Exterior Golden', setup: 'A-Cam · 35mm · Gimbal', desc: 'Gimbal walk-up to the ThreadLink office entrance at golden hour. Door opens, camera follows into the space. Establishes location and brand presence. Magic-hour light.' },
                                { num: '10', name: 'Rapid Fire Montage Cuts', setup: 'Both Cams · Mixed · Handheld', desc: 'Quick 1-2 second inserts: mouse clicking, pen writing notes, phone notifications, team fist bump, laughing at screen. The montage fuel that makes the final cut dynamic.' },
                            ].map((shot, i) => (
                                <div key={i} className="shot-card">
                                    <div className="shot-num">{shot.num}</div>
                                    <div className="shot-name">{shot.name}</div>
                                    <div className="shot-setup">{shot.setup}</div>
                                    <div className="shot-desc">{shot.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Crew Assignments */}
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>Crew Assignments</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                            <div style={{ padding: '24px 20px', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, background: 'rgba(99,102,241,0.04)' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>🎬</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>Matt Workman</div>
                                <div style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600, marginBottom: 8 }}>Director / Lead DP — A-Camera</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>Creative direction for every shot. Operates primary camera (Sony FX3) on slider, gimbal, and tripod. Calls shots, manages pacing, and ensures every frame matches the cinematic vision.</div>
                            </div>
                            <div style={{ padding: '24px 20px', border: '1px solid rgba(167,139,250,0.15)', borderRadius: 16, background: 'rgba(167,139,250,0.04)' }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>🎯</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>Daniel Castillo</div>
                                <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, marginBottom: 8 }}>Producer / Cinematographer — B-Camera</div>
                                <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.7 }}>Production logistics and B-camera operation. Handles detail inserts, macro work, and handheld coverage. Manages gear, lighting setups, and ensures the schedule stays on track.</div>
                            </div>
                        </div>
                    </div>

                    {/* Gear Checklist */}
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>Camera & Gear Package</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                            {[
                                { cat: 'Camera Bodies', items: ['Sony FX3 × 2', 'S-Cinetone + S-Log3', 'CFexpress Type A media'] },
                                { cat: 'Lenses', items: ['Sony 24mm f/1.4 GM', 'Sony 50mm f/1.2 GM', 'Sony 85mm f/1.4 GM', 'Macro lens (detail inserts)'] },
                                { cat: 'Grip & Movement', items: ['Motorized slider (120cm)', 'DJI RS4 Pro gimbal', 'Manfrotto fluid head tripod'] },
                                { cat: 'Lighting', items: ['Aputure 300d III key light', 'Nanlite Forza 60 fill', 'RGB LED accent panels', 'Light stands + modifiers'] },
                                { cat: 'Audio', items: ['Rode Wireless Pro × 2', 'Rode NTG5 shotgun mic', 'Zoom F3 field recorder'] },
                                { cat: 'Support', items: ['V-mount batteries', 'Monitor (SmallHD)', 'Pelican cases × 4', 'Backup media cards'] },
                            ].map((g, i) => (
                                <div key={i} style={{ padding: '18px 16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 10 }}>{g.cat}</div>
                                    {g.items.map((item, j) => (
                                        <div key={j} style={{ fontSize: 11, color: 'var(--muted)', padding: '3px 0 3px 16px', position: 'relative', lineHeight: 1.5 }}>
                                            <span style={{ position: 'absolute', left: 0, color: 'var(--orange)', fontSize: 10 }}>→</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prepared By */}
                    <div style={{ marginTop: 40, padding: '20px 24px', border: '1px solid rgba(99,102,241,0.12)', borderRadius: 16, background: 'rgba(99,102,241,0.03)', textAlign: 'center' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Prepared By</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>MediaGeekz</div>
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 4 }}>Orlando, FL · mediageekz.com · 321-666-5228</div>
                    </div>
                </section>

                <FeedbackBar section="Shoot Day Direction" />

                <div className="divider" />

                {/* ═══ VOICEOVER SCRIPT ═══ */}
                <section className="th-section reveal">
                    <div className="section-header">
                        <div className="section-label">Voiceover Script</div>
                        <div className="section-question">The words that carry the film</div>
                        <h2 className="section-title">&ldquo;The Neighbors&rdquo;</h2>
                        <p className="section-desc">
                            A warm, grounded voiceover that feels like a friend telling you what they do over coffee. Not a pitch — a story about a studio that shows up for its community.
                        </p>
                    </div>

                    {/* Script overview cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 36 }}>
                        {[
                            { label: 'Duration', value: '1:20–1:30', icon: '⏱' },
                            { label: 'Word Count', value: '~140 words', icon: '📝' },
                            { label: 'Tone', value: 'Warm & Chill', icon: '☀️' },
                            { label: 'Speaker', value: 'TBD', icon: '🎤' },
                            { label: 'Music', value: 'Acoustic / Indie', icon: '🎵' },
                        ].map((d, i) => (
                            <div key={i} style={{ padding: '14px 12px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, background: 'var(--panel)', textAlign: 'center' }}>
                                <div style={{ fontSize: 18, marginBottom: 4 }}>{d.icon}</div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 3 }}>{d.label}</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>{d.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Script beats */}
                    <div style={{ marginBottom: 40 }}>
                        <div className="script-block">
                            <div className="script-time-badge">0:00 – 0:08</div>
                            <div className="script-beat">Open — Clermont</div>
                            <div className="script-broll">Golden hour Clermont — downtown Plant Street, storefronts, people walking. Slow gimbal move.</div>
                            <div className="script-vo">
                                &ldquo;Clermont&rsquo;s kind of a small-town-that&rsquo;s-not-so-small-anymore, you know?&rdquo;<br />
                                &ldquo;And that&rsquo;s what makes it exciting.&rdquo;
                            </div>
                        </div>

                        <div className="script-block">
                            <div className="script-time-badge">0:08 – 0:22</div>
                            <div className="script-beat">Who We Are</div>
                            <div className="script-broll">Office door opens, morning light, team settling in. Coffee. Screens waking up. Casual energy. Smiles, someone greeting a teammate.</div>
                            <div className="script-vo">
                                &ldquo;We&rsquo;re ThreadLink. We&rsquo;re a design studio.&rdquo;<br />
                                &ldquo;But... really, we&rsquo;re just a group of people who grew up here&rdquo;<br />
                                &ldquo;and want to see it keep growing.&rdquo;<br /><br />
                                &ldquo;We build websites. We build brands.&rdquo;<br />
                                &ldquo;For the businesses that build our neighborhoods.&rdquo;
                            </div>
                        </div>

                        <div className="script-block">
                            <div className="script-time-badge">0:22 – 0:40</div>
                            <div className="script-beat">The People We Work With</div>
                            <div className="script-broll">Scroll through real client sites on screen — Pain Free Orlando, South Lake Chamber, Renovation Outdoors. Team reviewing client work in conference room — relaxed, laughing.</div>
                            <div className="script-vo">
                                &ldquo;Doctors who moved to Clermont to start something new.&rdquo;<br />
                                &ldquo;A scholarship fund that helps EMTs finish school.&rdquo;<br />
                                &ldquo;The chamber of commerce. The homeschool co-op.&rdquo;<br />
                                &ldquo;The landscaper who just wants his work to speak for itself.&rdquo;<br /><br />
                                &ldquo;These aren&rsquo;t just clients. They&rsquo;re our neighbors.&rdquo;
                            </div>
                        </div>

                        <div className="script-block">
                            <div className="script-time-badge">0:40 – 0:58</div>
                            <div className="script-beat">The Craft</div>
                            <div className="script-broll">Apple Pencil on iPad, Figma workflow, slider passes between desks. Logo on screen matching a real business card — screen to street.</div>
                            <div className="script-vo">
                                &ldquo;So when we sit down to design —&rdquo;<br />
                                &ldquo;it&rsquo;s not about making something look cool.&rdquo;<br />
                                &ldquo;It&rsquo;s about making something that feels like <strong>them</strong>.&rdquo;<br /><br />
                                &ldquo;Their story. Their colors. Their people.&rdquo;<br />
                                &ldquo;We just help it all make sense.&rdquo;
                            </div>
                        </div>

                        <div className="script-block">
                            <div className="script-time-badge">0:58 – 1:20</div>
                            <div className="script-beat">Close</div>
                            <div className="script-broll">Wide shot of team at work, golden window light. William at desk, not looking at camera. Exterior office at golden hour. ThreadLink logo fades in.</div>
                            <div className="script-vo">
                                &ldquo;We&rsquo;re not trying to be the biggest studio.&rdquo;<br />
                                &ldquo;We just want to be the one you trust.&rdquo;<br /><br />
                                &ldquo;<strong>ThreadLink.</strong>&rdquo;<br />
                                &ldquo;Clermont, Florida.&rdquo;
                            </div>
                        </div>
                    </div>

                    {/* Alt lines */}
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>Alt Lines — Editorial Flexibility</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                            {[
                                { swap: 'Open Alt', line: '"I used to drive past these businesses every day before I started designing for them."' },
                                { swap: 'Who We Are Alt', line: '"We didn\'t start ThreadLink to win awards — but we did. Twice."' },
                                { swap: 'Neighbors Alt', line: '"You can\'t build a brand for someone you don\'t understand. So we start by listening."' },
                                { swap: 'Craft Alt', line: '"Every color, every font, every pixel — it\'s on purpose."' },
                                { swap: 'Close Alt 1', line: '"Purpose-driven design. Community roots. That\'s the thread."' },
                                { swap: 'Close Alt 2', line: '"Built here. For here. And for wherever you\'re growing next."' },
                            ].map((a, i) => (
                                <div key={i} className="alt-line">
                                    <span>{a.swap}</span>
                                    {a.line}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Production notes */}
                    <div style={{ padding: '20px 20px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, background: 'var(--panel)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>Production Notes</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                            {[
                                { label: 'VO Style', val: 'Natural, not announcer — like talking to a friend. Pauses are OK.' },
                                { label: 'Music Bed', val: 'Warm acoustic guitar, subtle piano, soft percussion build. Artlist: "indie documentary warm"' },
                                { label: 'Sound Design', val: 'Quiet office ambience, keyboard taps, coffee pour, laughter — lived-in, not sterile' },
                                { label: 'Color Grade', val: 'Warm, golden, lifted shadows. Skin tones natural. Approachable, not overly cinematic.' },
                                { label: 'vs. Reference', val: 'Reference is confident & punchy. This is warm & grounded. Same structure, different soul.' },
                            ].map((n, i) => (
                                <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 4 }}>{n.label}</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6 }}>{n.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <FeedbackBar section="Voiceover Script" />

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

                {/* ═══ INVESTMENT / PRICING ═══ — HIDDEN PER CLIENT REQUEST */}
                {false && <>
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
                </>}

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

                {toastMsg && <div className="fb-toast">{toastMsg}</div>}
            </div>
        </>
    );
}
