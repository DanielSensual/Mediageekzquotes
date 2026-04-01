'use client';

import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Leadership Interviews — Single-Page Proposal + Invoice
   MediaGeekz × Tommy Bliven / 66 Degrees
   Filming Complete — Final Payment Due
   ═══════════════════════════════════════════════════════════════ */

const INVOICE_NUMBER = 'MGZ-2026-0326';
const INVOICE_DATE = 'March 17, 2026';
const SHOOT_DATE = 'March 26, 2026';

const CLIENT = {
    name: 'Tommy Bliven',
    company: '66 Degrees',
};

const LINE_ITEMS = [
    { description: 'Lead Cinematographer — Full Day', detail: 'Setup 9:30 AM · Record 11:30 AM – 5:00 PM', amount: 1200 },
    { description: 'Camera Operator B — Full Day', detail: '2nd angle coverage', amount: 750 },
    { description: 'BTS Photography', detail: 'Up to 100 edited behind-the-scenes photos', amount: 400 },
    { description: '5× Multi-Cam Interview Edits', detail: '15–20 min each · synced, color graded, lower thirds', amount: 7500, per: '$1,500/ep' },
    { description: 'Lighting & Microphone Package', detail: 'Professional interview lighting kit + dual wireless lav system', amount: 900 },
];

const SUBTOTAL = LINE_ITEMS.reduce((s, i) => s + i.amount, 0);
const DEPOSIT_PAID = 3875;
const REMAINING = SUBTOTAL - DEPOSIT_PAID;

const ADDONS = [
    { id: 'extra-interview', label: 'Extra Long-Form Interview Edit', detail: 'Additional 15–20 min multi-cam interview edit — recorded on shoot day', price: 1500 },
    { id: 'licensed-music', label: 'Licensed Music', detail: 'Premium royalty-free track per episode — curated to match your brand', price: 100, per: '~$100/ep' },
];

const BTS_PHOTOS = [
    { src: '/proposals/leadership-interviews/bts-hero.jpg', caption: 'Full interview setup — professional lighting & multi-cam' },
    { src: '/proposals/leadership-interviews/bts-interview-1.jpg', caption: 'Executive interview in progress' },
    { src: '/proposals/leadership-interviews/bts-interview-2.jpg', caption: 'Leadership conversation captured' },
    { src: '/proposals/leadership-interviews/bts-interview-3.jpg', caption: 'Two-shot interview framing' },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function LeadershipInterviewsProposal() {
    const [addons, setAddons] = useState({});
    const [expandedPkg, setExpandedPkg] = useState(null);
    const [sigName, setSigName] = useState('');
    const [signed, setSigned] = useState(false);
    const [signedAt, setSignedAt] = useState(null);
    const [tipAmount, setTipAmount] = useState(0);
    const [customTip, setCustomTip] = useState('');
    const [showCustomTip, setShowCustomTip] = useState(false);
    const printRef = useRef(null);

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

    const toggleAddon = (id) => setAddons(prev => ({ ...prev, [id]: !prev[id] }));
    const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.price : 0), 0);
    const handlePrint = () => window.print();
    const handleSign = () => {
        if (!sigName.trim()) return;
        const now = new Date();
        setSignedAt(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        setSigned(true);
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Dancing+Script:wght@700&display=swap');

                :root {
                    --shadow: #060a14; --shadow-2: #0a0f1a;
                    --navy: #0f1729; --navy-light: #162033;
                    --panel: rgba(15, 23, 42, 0.88); --panel-strong: rgba(18, 28, 50, 0.94);
                    --border: rgba(232, 98, 44, 0.16); --border-strong: rgba(232, 98, 44, 0.35);
                    --orange: #e8622c; --orange-soft: rgba(232, 98, 44, 0.12); --orange-glow: rgba(232, 98, 44, 0.22);
                    --teal: #2dd4bf; --teal-soft: rgba(45, 212, 191, 0.12);
                    --cream: #e2e8f0; --white: #f1f5f9; --muted: #94a3b8; --muted-2: #64748b; --muted-3: #475569;
                }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body {
                    font-family: 'Inter', sans-serif !important; color: var(--cream) !important;
                    background: radial-gradient(circle at 30% 10%, rgba(232, 98, 44, 0.06), transparent 40%),
                        radial-gradient(circle at 70% 80%, rgba(45, 212, 191, 0.04), transparent 40%),
                        linear-gradient(180deg, #0d1220 0%, #080c16 50%, #060a14 100%) !important;
                    line-height: 1.6; overflow-x: hidden;
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

                /* Hero */
                .li-hero { min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center;
                    text-align: center; padding: 80px 24px 60px; position: relative; overflow: hidden; }
                .hero-bg { position: absolute; inset: 0; z-index: 0; }
                .hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.25; filter: brightness(0.6); }
                .hero-bg::after { content: ''; position: absolute; inset: 0;
                    background: linear-gradient(180deg, rgba(6,10,20,0.4) 0%, rgba(6,10,20,0.7) 50%, var(--shadow) 100%); }
                .hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px;
                    border: 1px solid rgba(232, 98, 44, 0.25); border-radius: 999px; background: rgba(15, 23, 42, 0.7);
                    color: var(--orange); font-size: 11px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase;
                    backdrop-filter: blur(12px); margin-bottom: 32px; position: relative; z-index: 1; }
                .hero-badge::before { content: ""; width: 7px; height: 7px; border-radius: 50%;
                    background: var(--orange); box-shadow: 0 0 0 7px rgba(232, 98, 44, 0.15);
                    animation: pulse-dot 2s ease-in-out infinite; }
                @keyframes pulse-dot { 0%, 100% { box-shadow: 0 0 0 7px rgba(232, 98, 44, 0.15); } 50% { box-shadow: 0 0 0 12px rgba(232, 98, 44, 0.06); } }
                .hero-title { font-family: 'Outfit', sans-serif; font-size: clamp(48px, 8vw, 96px); font-weight: 700;
                    line-height: 0.96; letter-spacing: -0.03em; color: var(--white); margin-bottom: 24px; position: relative; z-index: 1; }
                .hero-title em { color: var(--orange); font-style: normal; font-weight: 800;
                    background: linear-gradient(135deg, #e8622c, #f59e0b); -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent; background-clip: text; }
                .hero-subtitle { max-width: 600px; color: var(--muted); font-size: 17px; line-height: 1.7;
                    position: relative; z-index: 1; margin-bottom: 48px; }
                .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
                    width: min(100%, 800px); position: relative; z-index: 1; }
                .hero-stat { padding: 20px 16px; border: 1px solid rgba(232, 98, 44, 0.12); border-radius: 16px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), rgba(15, 23, 42, 0.7);
                    backdrop-filter: blur(12px); transition: border-color 0.3s ease; }
                .hero-stat:hover { border-color: rgba(232, 98, 44, 0.3); }
                .hero-stat-label { color: var(--teal); font-size: 9px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; }
                .hero-stat-value { margin-top: 10px; color: var(--white); font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; line-height: 1.2; }
                .hero-stat-detail { margin-top: 6px; color: var(--muted); font-size: 12px; }
                @media (max-width: 640px) { .hero-meta { grid-template-columns: repeat(2, 1fr); } }

                /* Divider & Sections */
                .divider { width: min(100%, 900px); height: 1px; margin: 0 auto;
                    background: linear-gradient(90deg, transparent, rgba(232, 98, 44, 0.3), rgba(45, 212, 191, 0.2), transparent); opacity: 0.72; }
                .li-section { max-width: 1100px; margin: 0 auto; padding: 80px 24px; }
                .section-header { display: grid; gap: 14px; margin-bottom: 40px; max-width: 740px; }
                .section-label { color: var(--orange); font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; }
                .section-question { color: var(--muted-2); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }
                .section-title { font-family: 'Outfit', sans-serif; font-size: clamp(36px, 5vw, 54px); font-weight: 600; line-height: 1.05; color: var(--white); }
                .section-desc { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 640px; }

                /* BTS Gallery */
                .bts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
                .bts-card { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid rgba(100, 116, 139, 0.15);
                    aspect-ratio: 16/10; transition: transform 0.3s ease, border-color 0.3s ease; }
                .bts-card:hover { transform: translateY(-4px); border-color: rgba(232, 98, 44, 0.3); }
                .bts-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
                .bts-card:hover img { transform: scale(1.04); }
                .bts-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 16px 14px;
                    background: linear-gradient(transparent, rgba(6, 10, 20, 0.88)); }
                .bts-card-caption { font-size: 12px; color: var(--muted); }
                @media (max-width: 640px) { .bts-grid { grid-template-columns: 1fr; } }

                /* Timeline */
                .timeline { position: relative; padding-left: 36px; }
                .timeline::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0;
                    width: 1px; background: linear-gradient(180deg, var(--orange), var(--teal), transparent); }
                .timeline-block { position: relative; margin-bottom: 28px; }
                .timeline-block::before { content: ''; position: absolute; left: -32px; top: 6px;
                    width: 10px; height: 10px; border-radius: 50%; background: var(--orange);
                    border: 2px solid var(--shadow); box-shadow: 0 0 0 4px rgba(232, 98, 44, 0.15); }
                .timeline-time { color: var(--teal); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; }
                .timeline-label { color: var(--cream); font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 3px; }
                .timeline-desc { color: var(--muted-2); font-size: 12px; line-height: 1.6; }

                /* Equipment Grid */
                .equip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 40px; }
                .equip-card { padding: 24px 20px; border: 1px solid rgba(45, 212, 191, 0.12); border-radius: 16px;
                    background: var(--panel); transition: border-color 0.3s ease, transform 0.3s ease; }
                .equip-card:hover { border-color: rgba(45, 212, 191, 0.3); transform: translateY(-2px); }
                .equip-icon { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; }
                .equip-card h3 { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; color: var(--white); margin-bottom: 8px; }
                .equip-card p { font-size: 12px; color: var(--muted-2); line-height: 1.7; }
                .equip-card ul { list-style: none; margin-top: 10px; }
                .equip-card ul li { font-size: 11px; color: var(--muted-2); padding: 3px 0 3px 18px; position: relative; line-height: 1.5; }
                .equip-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--teal); font-size: 10px; }

                /* Signature */
                .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
                @media (max-width: 700px) { .sig-grid { grid-template-columns: 1fr; } }
                .sig-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange); margin-bottom: 16px; }
                .sig-preview { padding: 16px 20px; border-bottom: 2px solid rgba(232, 98, 44, 0.3); margin-bottom: 4px; min-height: 52px; }
                .sig-cursive { font-family: 'Dancing Script', cursive; font-size: 28px; color: var(--white); }
                .sig-field { font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-3); margin-bottom: 14px; }
                .sig-line { padding: 6px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.12); margin-bottom: 4px; min-height: 30px; }
                .sig-input { width: 100%; padding: 14px 16px; border: 1px solid rgba(232, 98, 44, 0.3); border-radius: 12px;
                    background: rgba(15, 23, 42, 0.6); color: var(--white); font-family: 'Inter', sans-serif;
                    font-size: 15px; outline: none; transition: border-color 0.2s; }
                .sig-input:focus { border-color: var(--orange); }
                .sign-btn { width: 100%; margin-top: 16px; padding: 16px; border: none; border-radius: 12px; cursor: pointer;
                    background: linear-gradient(135deg, var(--orange), #f59e0b); color: var(--white);
                    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.08em;
                    text-transform: uppercase; transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 6px 24px rgba(232, 98, 44, 0.3); }
                .sign-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(232, 98, 44, 0.4); }
                .sign-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
                .signed-badge { display: flex; align-items: center; gap: 10px; margin-top: 16px; padding: 12px 16px;
                    border-radius: 12px; background: rgba(45, 212, 191, 0.1); border: 1px solid rgba(45, 212, 191, 0.3); }
                .signed-badge-icon { font-size: 18px; color: var(--teal); }
                .signed-badge-text { font-size: 12px; font-weight: 700; color: var(--teal); letter-spacing: 0.1em; text-transform: uppercase; }
                .signed-badge-time { font-size: 11px; color: var(--muted-2); margin-top: 2px; }
                .print-contract-btn { width: 100%; margin-top: 12px; padding: 12px; border: 1px solid rgba(100, 116, 139, 0.2);
                    border-radius: 12px; background: var(--panel); color: var(--cream); font-size: 13px; cursor: pointer;
                    transition: border-color 0.2s; }
                .print-contract-btn:hover { border-color: rgba(232, 98, 44, 0.3); }

                /* Review Section */
                .review-card { max-width: 640px; margin: 0 auto; padding: 40px 32px; border: 1px solid rgba(45, 212, 191, 0.2);
                    border-radius: 20px; background: radial-gradient(circle at top left, rgba(45, 212, 191, 0.06), transparent 50%), var(--panel);
                    text-align: center; }
                .review-stars { font-size: 32px; letter-spacing: 8px; margin: 16px 0; filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.3)); }
                .review-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; margin-top: 20px;
                    border: 1px solid var(--teal); border-radius: 999px; background: rgba(45, 212, 191, 0.1);
                    color: var(--teal); font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
                    transition: transform 0.2s, background 0.2s, box-shadow 0.2s; }
                .review-btn:hover { transform: translateY(-2px); background: rgba(45, 212, 191, 0.18); box-shadow: 0 8px 28px rgba(45, 212, 191, 0.2); }

                /* Footer & CTA */
                .li-footer { text-align: center; padding: 80px 24px 40px; border-top: 1px solid rgba(100, 116, 139, 0.1); }
                .footer-logo { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted-3); margin-bottom: 10px; }
                .footer-tagline { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 300; font-style: italic; color: rgba(100, 116, 139, 0.4); }
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }
                @media print { .no-print { display: none !important; } body { background: white !important; color: #1a1a1a !important; } }
            `}</style>

            <div className="page-shell" ref={printRef}>
                {/* ── HERO ── */}
                <div className="li-hero">
                    <div className="hero-bg">
                        <img src="/proposals/leadership-interviews/bts-hero.jpg" alt="Leadership interview BTS" />
                    </div>
                    <div className="hero-badge">MediaGeekz — Leadership Interviews</div>
                    <h1 className="hero-title">
                        Recorded.<br /><em>Refined.</em><br />Amplified.
                    </h1>
                    <p className="hero-subtitle">
                        Five executive leadership interviews captured with cinematic multi-cam production — delivered as polished long-form episodes with professional lighting and audio.
                    </p>
                    <div className="hero-meta">
                        <div className="hero-stat">
                            <div className="hero-stat-label">Client</div>
                            <div className="hero-stat-value">{CLIENT.name}</div>
                            <div className="hero-stat-detail">{CLIENT.company}</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Shoot Date</div>
                            <div className="hero-stat-value">March 26</div>
                            <div className="hero-stat-detail">Filming Complete ✓</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Format</div>
                            <div className="hero-stat-value">3-Cam</div>
                            <div className="hero-stat-detail">Multi-cam interviews</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Status</div>
                            <div className="hero-stat-value" style={{ color: 'var(--teal)' }}>Post-Production</div>
                            <div className="hero-stat-detail">Editing in progress</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── BTS GALLERY ── */}
                <section className="li-section reveal">
                    <div className="section-header" style={{ textAlign: 'center', maxWidth: '100%' }}>
                        <div className="section-label">Behind The Scenes</div>
                        <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>From the shoot</h2>
                        <p className="section-desc" style={{ margin: '0 auto' }}>
                            Actual production stills from the March 26 shoot at Orlando — professional lighting, multi-cam setup, and cinematic quality throughout.
                        </p>
                    </div>
                    <div className="bts-grid">
                        {BTS_PHOTOS.map((photo, i) => (
                            <div key={i} className="bts-card">
                                <img src={photo.src} alt={photo.caption} />
                                <div className="bts-card-overlay">
                                    <div className="bts-card-caption">{photo.caption}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ── PRODUCTION SCHEDULE ── */}
                <section className="li-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Schedule</div>
                        <div className="section-question">March 26, 2026 — Completed</div>
                        <h2 className="section-title">One day. Five stories.</h2>
                        <p className="section-desc">
                            Every hour was structured to maximize quality and minimize downtime between interviews.
                        </p>
                    </div>
                    <div className="timeline">
                        {[
                            { time: '9:30 – 11:00 AM', label: 'Arrive + Setup', desc: 'Scout room lighting, position cameras, set up lighting kit, test wireless lavs and audio levels.' },
                            { time: '11:00 – 11:30 AM', label: 'Talent Walkthrough', desc: 'Quick on-camera test. Set framing, confirm eyeline, mic check.' },
                            { time: '11:30 AM – 12:30 PM', label: 'Interview 1 — CEO + CIO', desc: 'First leadership sit-down. Multi-cam coverage. Priority edit — delivered within ~1 week.' },
                            { time: '12:30 – 1:30 PM', label: 'Lunch + Reset', desc: 'Card swap, battery rotation, review hero shots on monitor.' },
                            { time: '1:30 – 2:30 PM', label: 'Interview 2', desc: 'Second leadership interview with fresh interviewees.' },
                            { time: '2:30 – 3:00 PM', label: 'Break + B-Roll', desc: 'Branded detail shots — name tags, meeting space ambiance, architectural shots.' },
                            { time: '3:00 – 4:00 PM', label: 'Interview 3', desc: 'Final leadership interview with lessons learned from earlier sessions.' },
                            { time: '4:00 – 5:00 PM', label: 'Wrap + BTS Photography', desc: 'Behind-the-scenes photography, pickup shots, offload media to backup drive.' },
                        ].map((block, i) => (
                            <div key={i} className="timeline-block">
                                <div className="timeline-time">{block.time}</div>
                                <div className="timeline-label">{block.label}</div>
                                <div className="timeline-desc">{block.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* ── EQUIPMENT ── */}
                <section className="li-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Kit</div>
                        <h2 className="section-title">The gear behind the look</h2>
                    </div>
                    <div className="equip-grid">
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--orange)' }}>✦ Camera A — Hero</div>
                            <h3>Sony FX3</h3>
                            <p>Full-frame cinema body. Locked on hero interview angle.</p>
                            <ul><li>85mm f/1.4 GM</li><li>S-Log3 / S-Gamut3.Cine</li><li>4K 24fps</li><li>XAVC-S 4:2:2 10-bit</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--teal)' }}>✦ Camera B — 2nd Angle</div>
                            <h3>Sony A7S III</h3>
                            <p>B-cam on complementary angle — reactions and close-ups.</p>
                            <ul><li>24-70mm f/2.8 GM</li><li>Matched color science</li><li>Low-light capable</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#A78BFA' }}>✦ Camera C — Locked Wide</div>
                            <h3>Sony A7S III</h3>
                            <p>Locked-off wide establishing shot — full scene coverage.</p>
                            <ul><li>16-35mm f/2.8 GM</li><li>Static mount</li><li>Full room coverage</li><li>S-Log3 synced</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                            <h3>Dual Wireless Lavs</h3>
                            <p>One lav per participant. Clean, isolated audio tracks.</p>
                            <ul><li>Sennheiser EW-D ×2</li><li>Rode NTG5 boom backup</li><li>Zoom F6 32-bit float</li><li>Synced timecode</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#FBBF24' }}>✦ Lighting</div>
                            <h3>Interview Kit</h3>
                            <p>Soft, flattering key light with controlled fill and separation.</p>
                            <ul><li>300W LED + 47&quot; Softbox</li><li>Aputure MC RGB fill ×2</li><li>4×4 neg fill flag</li><li>LED hair / edge light</li></ul>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── AGREEMENT + SIGNATURE ── */}
                <section className="li-section reveal">
                    <div className="section-header">
                        <div className="section-label">Agreement</div>
                        <h2 className="section-title">Sign to confirm</h2>
                        <p className="section-desc">
                            By signing below, both parties agree to the scope of work, deliverables, and payment terms outlined in this proposal.
                        </p>
                    </div>

                    <div style={{ maxWidth: 640, border: '1px solid rgba(100, 116, 139, 0.15)', borderRadius: 20, background: 'var(--panel)', padding: '32px 28px' }}>
                        {/* Invoice Summary */}
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 14 }}>
                            Invoice {INVOICE_NUMBER} · {INVOICE_DATE}
                        </div>
                        <div style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
                            {LINE_ITEMS.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                    <span style={{ color: 'var(--cream)' }}>{item.description}</span>
                                    <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{fmt(item.amount)}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px solid rgba(232, 98, 44, 0.2)', paddingTop: 12, marginTop: 8 }}>
                                <span style={{ color: 'var(--white)', fontWeight: 600 }}>Total</span>
                                <span style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--orange)', fontWeight: 700, fontSize: 18 }}>{fmt(SUBTOTAL)}</span>
                            </div>
                        </div>

                        {/* Terms */}
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.8, marginBottom: 28, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12, background: 'rgba(255,255,255,0.01)' }}>
                            <strong style={{ color: 'var(--cream)' }}>Scope:</strong> 5 multi-cam leadership interviews (15–20 min each), filmed on location with professional lighting, audio, and BTS photography. Includes synced multi-cam editing, color grading, sound design, lower-third graphics, and 2 revision rounds per episode.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Terms:</strong> 50% deposit to lock the shoot date. Remaining 50% due upon completion. Cancellation within 48 hours forfeits the deposit. Client receives perpetual usage rights on all delivered content. MediaGeekz retains portfolio usage rights unless otherwise agreed.
                        </div>

                        {/* Signatures */}
                        <div className="sig-grid">
                            <div>
                                <div className="sig-label">Producer — MediaGeekz</div>
                                <div style={{ marginBottom: 24 }}>
                                    <div className="sig-preview"><span className="sig-cursive">Matt Workman</span></div>
                                    <div className="sig-field">Signature</div>
                                    <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>Matt Workman</span></div>
                                    <div className="sig-field">Printed Name</div>
                                    <div className="sig-line"><span style={{ fontSize: 11, color: 'var(--muted)' }}>mattworkman@mediageekz.com</span></div>
                                    <div className="sig-field">Email</div>
                                    <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>March 17, 2026</span></div>
                                    <div className="sig-field">Date</div>
                                </div>
                                <div>
                                    <div className="sig-preview"><span className="sig-cursive">Daniel Castillo</span></div>
                                    <div className="sig-field">Signature</div>
                                    <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>Daniel Castillo</span></div>
                                    <div className="sig-field">Printed Name</div>
                                    <div className="sig-line"><span style={{ fontSize: 11, color: 'var(--muted)' }}>danielcastillo@mediageekz.com</span></div>
                                    <div className="sig-field">Email</div>
                                    <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>March 17, 2026</span></div>
                                    <div className="sig-field">Date</div>
                                </div>
                            </div>

                            <div>
                                <div className="sig-label">Client — {CLIENT.company}</div>
                                {signed ? (
                                    <>
                                        <div className="sig-preview"><span className="sig-cursive">{sigName}</span></div>
                                        <div className="sig-field">Signature</div>
                                        <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>{sigName}</span></div>
                                        <div className="sig-field">Printed Name</div>
                                        <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>{signedAt}</span></div>
                                        <div className="sig-field">Date</div>
                                        <div className="signed-badge">
                                            <span className="signed-badge-icon">✓</span>
                                            <div>
                                                <div className="signed-badge-text">Agreement Signed</div>
                                                <div className="signed-badge-time">{signedAt}</div>
                                            </div>
                                        </div>
                                        <button className="print-contract-btn no-print" onClick={handlePrint}>📄 Download Signed PDF</button>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: 16 }}>
                                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 8 }}>Type your full name to sign</div>
                                            <input type="text" className="sig-input" placeholder={CLIENT.name} value={sigName} onChange={(e) => setSigName(e.target.value)} />
                                        </div>
                                        {sigName.trim() && <div className="sig-preview"><span className="sig-cursive">{sigName}</span></div>}
                                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        <button className="sign-btn" onClick={handleSign} disabled={!sigName.trim()}>✍️ Sign Agreement</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── PAYMENT ── */}
                    <div style={{ maxWidth: 640, marginTop: 32 }}>
                        <div style={{ padding: '28px 24px', border: '1px solid rgba(45, 212, 191, 0.4)', borderRadius: 20, background: 'radial-gradient(circle at top right, rgba(45, 212, 191, 0.1), transparent 50%), var(--panel)', textAlign: 'center' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: 'rgba(45, 212, 191, 0.15)', border: '1px solid rgba(45, 212, 191, 0.3)', color: 'var(--teal)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                                <span style={{ fontSize: 14 }}>✓</span> Deposit Paid — {fmt(DEPOSIT_PAID)}
                            </div>

                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 12 }}>Final Balance Due</div>
                            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.7 }}>
                                Remaining 50% balance for completed production. Final edits delivered upon payment.
                            </div>

                            {/* Tip Section */}
                            <div style={{ marginTop: 0, padding: '24px 20px', borderRadius: 16, border: '1px solid rgba(232, 98, 44, 0.15)', background: 'rgba(232, 98, 44, 0.04)', marginBottom: 20 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6, textAlign: 'center' }}>Show Some Love</div>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--cream)', textAlign: 'center', marginBottom: 4 }}>Add a Tip for the Crew ☕</div>
                                <div style={{ fontSize: 12, color: 'var(--muted-2)', textAlign: 'center', marginBottom: 20, lineHeight: 1.6 }}>
                                    Tips are optional and go directly to the production crew.
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 8 }}>
                                    <button onClick={() => { setTipAmount(0); setCustomTip(''); setShowCustomTip(false); }}
                                        style={{ padding: '14px 8px', border: tipAmount === 0 && !customTip && !showCustomTip ? '1.5px solid var(--teal)' : '1px solid rgba(100, 116, 139, 0.2)', borderRadius: 12, background: tipAmount === 0 && !customTip && !showCustomTip ? 'rgba(45, 212, 191, 0.12)' : 'var(--panel)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' }}>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: tipAmount === 0 && !customTip && !showCustomTip ? 'var(--teal)' : 'var(--cream)' }}>None</div>
                                        <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>$0</div>
                                    </button>
                                    {[
                                        { label: '5%', amount: Math.round(REMAINING * 0.05) },
                                        { label: '10%', amount: Math.round(REMAINING * 0.10) },
                                        { label: '15%', amount: Math.round(REMAINING * 0.15) },
                                    ].map((opt) => (
                                        <button key={opt.label} onClick={() => { setTipAmount(opt.amount); setCustomTip(''); setShowCustomTip(false); }}
                                            style={{ padding: '14px 8px', border: tipAmount === opt.amount && !customTip ? '1.5px solid var(--orange)' : '1px solid rgba(100, 116, 139, 0.2)', borderRadius: 12, background: tipAmount === opt.amount && !customTip ? 'rgba(232, 98, 44, 0.12)' : 'var(--panel)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' }}>
                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: tipAmount === opt.amount && !customTip ? 'var(--orange)' : 'var(--cream)' }}>{opt.label}</div>
                                            <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>${opt.amount}</div>
                                        </button>
                                    ))}
                                    <button onClick={() => { setTipAmount(0); setShowCustomTip(true); }}
                                        style={{ padding: '14px 8px', border: showCustomTip ? '1.5px solid var(--orange)' : '1px solid rgba(100, 116, 139, 0.2)', borderRadius: 12, background: showCustomTip ? 'rgba(232, 98, 44, 0.12)' : 'var(--panel)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' }}>
                                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: showCustomTip ? 'var(--orange)' : 'var(--cream)' }}>Custom</div>
                                        <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>Any $</div>
                                    </button>
                                </div>

                                {showCustomTip && tipAmount === 0 && (
                                    <div style={{ marginTop: 12, position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-2)', fontSize: 16, fontWeight: 600 }}>$</span>
                                        <input type="number" min="1" placeholder="Enter amount" value={customTip} onChange={(e) => setCustomTip(e.target.value)}
                                            style={{ width: '100%', padding: '14px 14px 14px 28px', border: '1px solid rgba(232, 98, 44, 0.3)', borderRadius: 12, background: 'rgba(15, 23, 42, 0.6)', color: 'var(--white)', fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                )}
                            </div>

                            {(() => {
                                const effectiveTip = customTip ? parseInt(customTip) || 0 : tipAmount;
                                const finalAmount = REMAINING + effectiveTip;
                                const descParts = ['Leadership Interviews — Final Balance'];
                                if (effectiveTip > 0) descParts.push(`+ $${effectiveTip} Crew Tip`);
                                return (
                                    <a href={`/checkout?amount=${finalAmount}&desc=${encodeURIComponent(descParts.join(' '))}&return=${encodeURIComponent('/proposals/leadership-interviews')}`}
                                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '20px 32px', border: 'none', borderRadius: 14, cursor: 'pointer', background: 'linear-gradient(135deg, var(--orange), #f59e0b)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 28px rgba(232, 98, 44, 0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                                        💳 Pay {effectiveTip > 0 ? `$${finalAmount.toLocaleString('en-US')}` : `Final Balance ${fmt(REMAINING)}`}
                                        {effectiveTip > 0 && <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.8 }}>(inc. ${effectiveTip} tip)</span>}
                                    </a>
                                );
                            })()}

                            <div style={{ marginTop: 24, padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.04)', background: 'rgba(255, 255, 255, 0.02)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--muted-3)', textTransform: 'uppercase', marginBottom: 4 }}>Deposit Paid</div>
                                    <div style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 600 }}>{fmt(DEPOSIT_PAID)}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 4 }}>Balance Due</div>
                                    <div style={{ color: 'var(--white)', fontSize: 14, fontWeight: 700 }}>{(() => { const t = customTip ? parseInt(customTip) || 0 : tipAmount; return fmt(REMAINING + t); })()}</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(148, 163, 184, 0.5)' }}>
                                🔒 Payments processed securely via Square · Card, Apple Pay, Google Pay
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 16 }}>
                            <a href="mailto:danielcastillo@mediageekz.com?subject=Leadership%20Interviews%20%E2%80%94%20Question&body=Hey%20Daniel%2C%0A%0A" style={{ color: 'var(--muted-2)', fontSize: 12, textDecoration: 'none' }}>
                                Have questions? ✉ Email us
                            </a>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── LEAVE A REVIEW ── */}
                <section className="li-section reveal">
                    <div className="review-card">
                        <div className="section-label" style={{ marginBottom: 8 }}>We Value Your Feedback</div>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
                            Enjoyed working with us?
                        </h2>
                        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>
                            Your review helps other businesses find professional video production they can trust. It only takes 30 seconds.
                        </p>
                        <div className="review-stars">⭐⭐⭐⭐⭐</div>
                        <a href="https://g.page/r/Cdrk5jth0K60EBM/review" target="_blank" rel="noopener noreferrer" className="review-btn">
                            ⭐ Leave a Google Review
                        </a>
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
