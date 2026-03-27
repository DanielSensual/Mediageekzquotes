'use client';
import { useState, useEffect, useRef } from 'react';

const PACKAGES = [
    {
        id: 'core',
        name: 'Core Coverage',
        tagline: '3-Camera Reality Crew',
        base: 18500,
        hours: 40,
        crew: [
            { label: 'Director / Showrunner', detail: 'Creative direction, scene blocking, talent management', amount: 5000 },
            { label: 'Lead DP / A-Camera', detail: 'Hero shots — interviews, dance floor, key moments', amount: 4500 },
            { label: 'B-Camera Operator', detail: 'Wide angles, crowd reactions, B-roll', amount: 3000 },
            { label: 'C-Camera / Roaming', detail: 'Behind-the-scenes, candid moments, confessionals', amount: 3000 },
        ],
        post: [
            { label: 'Organized Raw Footage Delivery', detail: 'Scene-separated, labeled by day + location', amount: 0, free: true },
            { label: 'Multi-Cam Sync + Timecode', detail: 'All 3 cameras synced by timecode per scene', amount: 1500 },
            { label: 'Audio Sync & Cleanup', detail: 'Lavs synced to camera, ambient noise reduction', amount: 1500 },
        ],
        included: [
            '40 hours of production (Thu–Mon)',
            '3-camera crew (DP + B-Cam + Roaming)',
            'Director / Showrunner on set daily',
            '8× wireless lav microphones',
            'Portable LED interview lighting',
            'All venue areas covered',
            'Multi-cam synced raw footage delivery',
            'Scene-separated, day-labeled organization',
            '2 revision rounds on audio sync',
        ],
        excluded: ['4th camera operator', 'Drone footage', 'Edited episodes', 'Color grading'],
    },
    {
        id: 'professional',
        name: 'Full Production',
        tagline: '4-Camera Reality Crew',
        recommended: true,
        base: 24000,
        hours: 40,
        crew: [
            { label: 'Director / Showrunner', detail: 'Creative direction, scene blocking, story arcs', amount: 5000 },
            { label: 'Lead DP / A-Camera', detail: 'Hero shots — performances, interviews, key drama', amount: 4500 },
            { label: 'B-Camera Operator', detail: 'Wide angles, stage coverage, crowd energy', amount: 3000 },
            { label: 'C-Camera / Steadicam', detail: 'Dance floor roaming, follow shots, dynamic movement', amount: 3500 },
            { label: 'D-Camera / Confessional', detail: 'Dedicated confessional + BTS + candid moments', amount: 3000 },
            { label: 'Audio Technician', detail: 'Dedicated lav management + boom for confessionals', amount: 2500 },
        ],
        post: [
            { label: 'Organized Raw Footage Delivery', detail: 'Scene-separated, synced, with proxies + selects', amount: 0, free: true },
            { label: 'Multi-Cam Sync + Timecode', detail: 'All 4 cameras synced per scene + metadata tags', amount: 2000 },
            { label: 'Audio Mix & Cleanup', detail: 'Broadcast-level lav + boom mix, room tone, noise reduction', amount: 2000 },
            { label: 'Dailies / Selects Reel', detail: 'Best moments compiled per day for review', amount: 1500 },
        ],
        included: [
            '40 hours of production (Thu–Mon)',
            '4-camera crew + dedicated audio tech',
            'Director / Showrunner on set daily',
            '12× wireless lav microphones',
            'Full professional lighting (all setups)',
            'Steadicam for dynamic dance coverage',
            'Dedicated confessional camera setup',
            'All venue + off-site locations covered',
            'Daily selects / highlight reels',
            'Broadcast-level audio mixing',
            'Multi-cam synced raw delivery + proxies',
            '3 revision rounds',
        ],
        excluded: ['Edited episodes', 'Drone footage (add-on available)'],
        bonuses: [
            { label: 'Steadicam Operator', detail: 'Dynamic dance floor coverage — included' },
            { label: 'Dedicated Audio Tech', detail: 'On-site boom + 12-channel lav management' },
            { label: 'Daily Selects', detail: 'Best moments compiled each night for review' },
        ],
    },
];

const ADDONS = [
    { id: 'drone', label: 'Drone Footage Package', detail: 'Aerial establishing shots of Miami venue — sunrise/sunset + event overview', price: 1500 },
    { id: 'sizzle', label: 'Sizzle Reel (3-5 min)', detail: 'High-energy promo cut for pitching networks / sponsors', price: 4500 },
    { id: 'social', label: 'Social Media Package', detail: '10× vertical clips (Reels/TikTok) cut and delivered same-week', price: 3000 },
    { id: 'color', label: 'Color Grading (Full)', detail: 'Cinematic LUT + grade on all footage — matched gold/black look', price: 2500 },
    { id: 'confessional-setup', label: 'Premium Confessional Suite', detail: 'Dedicated room with branded backdrop, ring light, 2-cam setup', price: 2000 },
    { id: 'bts-photo', label: 'BTS Photography', detail: '100+ edited production stills — cast, crew, venue', price: 1500 },
];

const SCENES = [
    { icon: '💃', title: 'Social Dancing Floor', desc: 'Multi-cam roaming coverage of social dancing — the heart of every bachata event. Steadicam follows featured dancers through the crowd, capturing connection and movement.' },
    { icon: '🎤', title: 'Confessional Interviews', desc: 'Private 1-on-1 interviews with cast members. Reality TV staple — raw reactions, drama, personal stories. Dedicated camera + lighting setup in a quiet space.' },
    { icon: '🏆', title: 'Workshops & Competitions', desc: 'Multi-angle coverage of instructor workshops and Jack & Jill competitions. Close-ups on technique, crowd reactions, judges, and winner reveals.' },
    { icon: '🌴', title: 'Miami Lifestyle B-Roll', desc: 'Establishing shots of Miami — ocean, skyline, nightlife. Cast arriving at venues, poolside moments, group dinners. The aspirational lifestyle layer.' },
    { icon: '🎭', title: 'Behind-the-Scenes Drama', desc: 'Roaming camera catches candid moments — arguments, friendships, romances forming. The unscripted gold that makes reality TV compelling.' },
    { icon: '🎶', title: 'Performances & Shows', desc: 'Full multi-cam coverage of stage performances and showcases. A-cam hero on performers, B-cam crowd reactions, C-cam wide establishing shots.' },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function SensualMovementProposal() {
    const [addons, setAddons] = useState({});
    const [expandedPkg, setExpandedPkg] = useState('professional');
    const [scrollY, setScrollY] = useState(0);
    const [sigName, setSigName] = useState('');
    const [signed, setSigned] = useState(false);
    const [signedAt, setSignedAt] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
    }, []);

    const toggleAddon = (id) => setAddons(prev => ({ ...prev, [id]: !prev[id] }));
    const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.price : 0), 0);
    const handleSign = () => { if (!sigName.trim()) return; const now = new Date(); setSignedAt(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })); setSigned(true); };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
                :root {
                    --shadow: #030303; --shadow-2: #0a0904; --navy: #0d0b06; --navy-light: #1a1508;
                    --panel: rgba(13, 11, 6, 0.92); --panel-strong: rgba(18, 15, 8, 0.96);
                    --border: rgba(212, 175, 55, 0.16); --border-strong: rgba(212, 175, 55, 0.4);
                    --gold: #d4af37; --gold-light: #f0d060; --gold-soft: rgba(212, 175, 55, 0.12);
                    --gold-glow: rgba(212, 175, 55, 0.25); --rose: #e8446c; --rose-soft: rgba(232, 68, 108, 0.12);
                    --cream: #e8e0d0; --white: #f5f0e8; --muted: #9a917e; --muted-2: #6b6352; --muted-3: #4a4338;
                }
                * { margin: 0; padding: 0; box-sizing: border-box; } html { scroll-behavior: smooth; }
                body { font-family: 'Inter', sans-serif !important; color: var(--cream) !important;
                    background: radial-gradient(circle at 30% 10%, rgba(212, 175, 55, 0.06), transparent 40%),
                        radial-gradient(circle at 70% 80%, rgba(232, 68, 108, 0.04), transparent 40%),
                        linear-gradient(180deg, #0d0b06 0%, #050403 50%, #030303 100%) !important;
                    line-height: 1.6; overflow-x: hidden;
                }
                body::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 0;
                    background: linear-gradient(90deg, rgba(212,175,55,0.015) 1px, transparent 1px),
                                linear-gradient(0deg, rgba(212,175,55,0.01) 1px, transparent 1px);
                    background-size: 80px 80px; opacity: 0.4;
                    mask-image: radial-gradient(circle at center, black 20%, transparent 75%);
                }
                ::selection { background: rgba(212, 175, 55, 0.3); color: var(--white); }
                ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--shadow); }
                ::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.4); border-radius: 999px; }
                .page-shell { position: relative; z-index: 1; }

                .sm-hero { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 80px 24px 60px; position: relative; overflow: hidden; }
                .sm-hero-bg { position: absolute; inset: 0; z-index: 0; background: url('/sensual-movement/hero.png') center/cover no-repeat; filter: brightness(0.3) saturate(0.9); transform: scale(1.1); }
                .sm-hero-overlay { position: absolute; inset: 0; z-index: 1;
                    background: linear-gradient(180deg, rgba(3,3,3,0.7) 0%, rgba(3,3,3,0.2) 40%, rgba(3,3,3,0.85) 100%),
                    radial-gradient(ellipse at 50% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%);
                }
                .sm-hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 200px; background: linear-gradient(transparent, var(--shadow)); pointer-events: none; z-index: 2; }
                .hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 999px; background: rgba(13, 11, 6, 0.8); color: var(--gold); font-size: 11px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; backdrop-filter: blur(12px); margin-bottom: 32px; position: relative; z-index: 3; }
                .hero-badge::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 7px rgba(212, 175, 55, 0.15); animation: pulse-dot 2s ease-in-out infinite; }
                @keyframes pulse-dot { 0%, 100% { box-shadow: 0 0 0 7px rgba(212,175,55,0.15); } 50% { box-shadow: 0 0 0 12px rgba(212,175,55,0.06); } }
                .hero-title { font-family: 'Outfit', sans-serif; font-size: clamp(42px, 7vw, 88px); font-weight: 700; line-height: 0.96; letter-spacing: -0.03em; color: var(--white); margin-bottom: 24px; position: relative; z-index: 3; }
                .hero-title em { color: var(--gold); font-style: normal; font-weight: 800; background: linear-gradient(135deg, #d4af37, #f0d060); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .hero-subtitle { max-width: 640px; color: var(--muted); font-size: 17px; line-height: 1.7; position: relative; z-index: 3; margin-bottom: 48px; }
                .hero-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: min(100%, 900px); position: relative; z-index: 3; }
                .hero-stat { padding: 20px 16px; border: 1px solid rgba(212, 175, 55, 0.12); border-radius: 16px; background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), rgba(13, 11, 6, 0.8); backdrop-filter: blur(12px); transition: border-color 0.3s; }
                .hero-stat:hover { border-color: rgba(212, 175, 55, 0.35); }
                .hero-stat-label { color: var(--gold); font-size: 9px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; }
                .hero-stat-value { margin-top: 10px; color: var(--white); font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 600; line-height: 1.2; }
                .hero-stat-detail { margin-top: 6px; color: var(--muted); font-size: 11px; }
                @media (max-width: 640px) { .hero-meta { grid-template-columns: repeat(2, 1fr); } }

                .divider { width: min(100%, 900px); height: 1px; margin: 0 auto; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.35), rgba(232,68,108,0.2), transparent); opacity: 0.72; }
                .sm-section { max-width: 1100px; margin: 0 auto; padding: 80px 24px; }
                .section-header { display: grid; gap: 14px; margin-bottom: 40px; max-width: 740px; }
                .section-label { color: var(--gold); font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; }
                .section-title { font-family: 'Outfit', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 600; line-height: 1.05; color: var(--white); }
                .section-desc { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 640px; }

                .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
                .scope-card { padding: 28px 24px; border: 1px solid rgba(212,175,55,0.12); border-radius: 16px; background: var(--panel); transition: border-color 0.3s, transform 0.3s; }
                .scope-card:hover { border-color: rgba(212,175,55,0.35); transform: translateY(-2px); }
                .scope-icon { font-size: 28px; margin-bottom: 14px; }
                .scope-card h3 { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; color: var(--white); margin-bottom: 8px; }
                .scope-card p { font-size: 13px; color: var(--muted-2); line-height: 1.7; }

                .timeline { position: relative; padding-left: 36px; }
                .timeline::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg, var(--gold), var(--rose), transparent); }
                .timeline-block { position: relative; margin-bottom: 28px; }
                .timeline-block::before { content: ''; position: absolute; left: -32px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: var(--gold); border: 2px solid var(--shadow); box-shadow: 0 0 0 4px rgba(212,175,55,0.15); }
                .timeline-time { color: var(--gold); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; }
                .timeline-label { color: var(--cream); font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 3px; }
                .timeline-desc { color: var(--muted-2); font-size: 12px; line-height: 1.6; }
                .timeline-location { display: inline-flex; align-items: center; gap: 6px; margin-top: 6px; padding: 4px 10px; background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.15); border-radius: 999px; font-size: 10px; color: var(--gold); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }

                .packages-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 48px; }
                @media (max-width: 860px) { .packages-grid { grid-template-columns: 1fr; } }
                .pkg-card { padding: 36px 28px; border: 1px solid rgba(100,100,80,0.15); border-radius: 20px; background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), var(--panel); transition: border-color 0.3s, transform 0.3s; position: relative; }
                .pkg-card:hover { border-color: rgba(212,175,55,0.3); transform: translateY(-4px); }
                .pkg-card.recommended { border-color: var(--gold); background: radial-gradient(circle at top right, rgba(212,175,55,0.1), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent), rgba(13,11,6,0.96); box-shadow: 0 0 50px rgba(212,175,55,0.08); }
                .pkg-badge { position: absolute; top: -12px; left: 28px; background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: var(--shadow); font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 16px; border-radius: 999px; }
                .pkg-name { font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700; color: var(--white); margin-bottom: 4px; }
                .pkg-tagline { color: var(--muted-2); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
                .pkg-price-row { display: flex; align-items: baseline; gap: 8px; padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid rgba(100,100,80,0.15); }
                .pkg-amount { font-family: 'Outfit', sans-serif; font-size: 38px; font-weight: 700; color: var(--gold); }
                .pkg-note { color: var(--muted-2); font-size: 11px; }
                .pkg-features { list-style: none; }
                .pkg-features li { font-size: 12px; color: var(--muted); padding: 6px 0 6px 22px; position: relative; line-height: 1.5; }
                .pkg-features li::before { content: '✓'; position: absolute; left: 0; color: var(--gold); font-size: 12px; }
                .pkg-features li.excluded { opacity: 0.3; }
                .pkg-features li.excluded::before { content: '—'; color: var(--muted-3); }
                .pkg-features li.bonus { color: var(--gold); font-weight: 500; }
                .pkg-features li.bonus::before { content: '★'; color: var(--gold); }

                .addon-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; margin-bottom: 12px; border: 1px solid rgba(100,100,80,0.15); border-radius: 14px; background: var(--panel); cursor: pointer; transition: border-color 0.25s, background 0.25s; }
                .addon-row:hover { border-color: rgba(212,175,55,0.3); }
                .addon-row.active { border-color: var(--gold); background: rgba(212,175,55,0.06); }
                .addon-left { display: flex; align-items: center; gap: 14px; }
                .addon-switch { width: 40px; height: 22px; border-radius: 999px; background: rgba(100,100,80,0.3); position: relative; transition: background 0.3s; flex-shrink: 0; }
                .addon-switch.on { background: var(--gold); }
                .addon-knob { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: var(--white); transition: left 0.3s; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
                .addon-switch.on .addon-knob { left: 20px; }
                .addon-name { color: var(--cream); font-size: 14px; font-weight: 500; }
                .addon-detail { color: var(--muted-2); font-size: 11px; margin-top: 2px; }
                .addon-price { color: var(--gold); font-size: 15px; font-weight: 700; white-space: nowrap; }

                .img-panel { position: relative; height: 50vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .img-panel-bg { position: absolute; inset: -20% 0; z-index: 0; background-size: cover; background-position: center; filter: brightness(0.35) saturate(0.9); }
                .img-panel-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, var(--shadow) 0%, transparent 30%, transparent 70%, var(--shadow) 100%); }
                .img-panel-content { position: relative; z-index: 2; text-align: center; padding: 24px; }
                .img-label { font-family: 'Outfit', sans-serif; font-size: clamp(20px, 4vw, 36px); font-weight: 300; color: rgba(245,240,232,0.9); letter-spacing: 0.08em; }
                .img-label span { color: var(--gold); font-weight: 600; }
                .img-sub { font-size: 12px; color: rgba(154,145,126,0.6); letter-spacing: 0.2em; text-transform: uppercase; margin-top: 8px; }

                .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(100,100,80,0.12); }
                .sig-label { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted-3); margin-bottom: 32px; }
                .sig-preview { min-height: 52px; padding: 10px 16px; border-bottom: 2px solid rgba(100,100,80,0.3); margin-bottom: 6px; display: flex; align-items: flex-end; }
                .sig-cursive { font-family: 'Dancing Script', cursive; font-size: 28px; font-weight: 700; color: var(--white); line-height: 1.2; }
                .sig-field { font-size: 11px; color: var(--muted-2); margin-bottom: 18px; }
                .sig-line { border-bottom: 1px solid rgba(100,100,80,0.3); padding-bottom: 6px; margin-bottom: 6px; min-height: 28px; }
                .sig-input { width: 100%; padding: 12px 16px; border: 1px solid rgba(100,100,80,0.2); border-radius: 10px; background: rgba(13,11,6,0.6); color: var(--white); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
                .sig-input:focus { border-color: var(--gold); }
                .sign-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 16px; border: none; border-radius: 12px; cursor: pointer; background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: var(--shadow); font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 16px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 6px 24px rgba(212,175,55,0.3); }
                .sign-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(212,175,55,0.4); }
                .sign-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .signed-badge { display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-radius: 12px; background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.25); margin-top: 16px; }
                @media (max-width: 640px) { .sig-grid { grid-template-columns: 1fr; } }

                .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }
                .sm-footer { text-align: center; padding: 80px 24px 40px; border-top: 1px solid rgba(100,100,80,0.1); }
                .footer-logo { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted-3); margin-bottom: 10px; }
                .footer-tagline { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 300; font-style: italic; color: rgba(100,100,80,0.4); }
                @media print { .no-print { display: none !important; } body { background: white !important; color: #1a1a1a !important; } }
            `}</style>

            <div className="page-shell">
                {/* ── HERO ── */}
                <div className="sm-hero">
                    <div className="sm-hero-bg" style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
                    <div className="sm-hero-overlay" />
                    <div className="hero-badge">Sensual Movement × MediaGeekz</div>
                    <h1 className="hero-title">
                        Miami<br /><em>Paradise.</em><br />Reality.
                    </h1>
                    <p className="hero-subtitle">
                        Multi-camera reality TV production capturing the world of bachata sensual — from the dance floor to the drama — at Miami Paradise Festival, June 2026.
                    </p>
                    <div className="hero-meta">
                        <div className="hero-stat">
                            <div className="hero-stat-label">Client</div>
                            <div className="hero-stat-value">Sensual Movement</div>
                            <div className="hero-stat-detail">Festival Organizer</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Event</div>
                            <div className="hero-stat-value">Miami Paradise</div>
                            <div className="hero-stat-detail">June 2026 · Miami, FL</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Production</div>
                            <div className="hero-stat-value">40 Hours</div>
                            <div className="hero-stat-detail">Thu–Mon · 5 shoot days</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Crew</div>
                            <div className="hero-stat-value">3–4 Camera</div>
                            <div className="hero-stat-detail">Full reality TV production</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── SCENE GUIDE ── */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="section-label">Scene Guide</div>
                        <h2 className="section-title">What makes bachata TV gold</h2>
                        <p className="section-desc">
                            Reality TV thrives on emotion, conflict, and beauty. A bachata festival delivers all three naturally. Here are the scenes that will define the show.
                        </p>
                    </div>
                    <div className="scope-grid">
                        {SCENES.map((s, i) => (
                            <div className="scope-card" key={i}>
                                <div className="scope-icon">{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ DANCE IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/dance.png')", transform: `translateY(${(scrollY - 1200) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Where <span>Connection</span> Becomes Content</div>
                        <div className="img-sub">Bachata Sensual · Multi-Cam Reality Production</div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── PRODUCTION SCHEDULE ── */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Schedule</div>
                        <h2 className="section-title">Five days. Forty hours.</h2>
                        <p className="section-desc">Wednesday arrival and setup. Cameras roll Thursday through Monday — covering every workshop, social, performance, and candid moment.</p>
                    </div>
                    <div className="timeline">
                        <div className="timeline-block">
                            <div className="timeline-time">Wednesday</div>
                            <div className="timeline-label">Crew Arrival + Location Scout</div>
                            <div className="timeline-desc">Crew flies into Miami. Venue walkthrough, confessional room setup, camera placements mapped. Pre-production meeting with Sensual Movement team.</div>
                            <div className="timeline-location">📍 Miami · Venue</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">Thursday · Day 1 (8 hrs)</div>
                            <div className="timeline-label">Festival Opens + Cast Introductions</div>
                            <div className="timeline-desc">First confessional interviews, cast arrivals, opening workshops. Establish characters and storylines. Evening social dancing — full floor coverage.</div>
                            <div className="timeline-location">📍 Main Venue + Social Floor</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">Friday · Day 2 (8 hrs)</div>
                            <div className="timeline-label">Workshops + Drama Development</div>
                            <div className="timeline-desc">Intensive workshop coverage, Jack & Jill prelims, poolside B-roll, group dinner scenes. Confessional check-ins with cast.</div>
                            <div className="timeline-location">📍 Workshop Rooms + Pool + Social</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">Saturday · Day 3 (10 hrs)</div>
                            <div className="timeline-label">Peak Night — Performances & Social</div>
                            <div className="timeline-desc">Main stage performances, competition finals, peak social dancing. This is the biggest night — all cameras rolling, maximum coverage. Extended hours for late-night socials.</div>
                            <div className="timeline-location">📍 Main Stage + Social Floor</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">Sunday · Day 4 (8 hrs)</div>
                            <div className="timeline-label">Competition Finals + Storyline Resolution</div>
                            <div className="timeline-desc">Final competitions, closing workshops, cast wrap interviews. Capture storyline resolutions and emotional moments.</div>
                            <div className="timeline-location">📍 Full Venue</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">Monday · Day 5 (6 hrs)</div>
                            <div className="timeline-label">Closing + Final Confessionals</div>
                            <div className="timeline-desc">Morning-after interviews, farewell scenes, Miami lifestyle B-roll. Final confessionals wrapping each cast member&apos;s arc. Data backup and wrap.</div>
                            <div className="timeline-location">📍 Miami · Various</div>
                        </div>
                    </div>
                </section>

                {/* ═══ CREW IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/crew.png')", transform: `translateY(${(scrollY - 2600) * 0.07}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Professional <span>Multi-Camera</span> Production</div>
                        <div className="img-sub">Cinema-Grade Equipment · Reality TV Workflow</div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── INVESTMENT / PRICING ── */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment</div>
                        <h2 className="section-title">Production packages</h2>
                        <p className="section-desc">Two tiers designed for reality TV at scale. Both include 40 hours of production, organized raw footage, and multi-cam sync.</p>
                    </div>

                    <div className="packages-grid">
                        {PACKAGES.map(pkg => (
                            <div key={pkg.id} className={`pkg-card ${pkg.recommended ? 'recommended' : ''}`} onClick={() => setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id)}>
                                {pkg.recommended && <div className="pkg-badge">Recommended</div>}
                                <div className="pkg-name">{pkg.name}</div>
                                <div className="pkg-tagline">{pkg.tagline}</div>
                                <div className="pkg-price-row">
                                    <span className="pkg-amount">{fmt(pkg.base)}</span>
                                    <span className="pkg-note">{pkg.hours} hours · {pkg.crew.length} crew</span>
                                </div>
                                <ul className="pkg-features">
                                    {pkg.included.map((f, i) => <li key={i}>{f}</li>)}
                                    {pkg.excluded.map((f, i) => <li key={'x' + i} className="excluded">{f}</li>)}
                                    {pkg.bonuses?.map((b, i) => <li key={'b' + i} className="bonus">{b.label} — {b.detail}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* ── Add-Ons ── */}
                    <div style={{ marginTop: 48 }}>
                        <div className="section-header">
                            <div className="section-label">Add-Ons</div>
                            <h2 className="section-title" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>Enhance the production</h2>
                        </div>
                        {ADDONS.map(a => (
                            <div key={a.id} className={`addon-row ${addons[a.id] ? 'active' : ''}`} onClick={() => toggleAddon(a.id)}>
                                <div className="addon-left">
                                    <div className={`addon-switch ${addons[a.id] ? 'on' : ''}`}>
                                        <div className="addon-knob" />
                                    </div>
                                    <div>
                                        <div className="addon-name">{a.label}</div>
                                        <div className="addon-detail">{a.detail}</div>
                                    </div>
                                </div>
                                <div className="addon-price">{fmt(a.price)}</div>
                            </div>
                        ))}
                        {addonTotal > 0 && (
                            <div style={{ textAlign: 'right', marginTop: 12, fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
                                Add-ons total: {fmt(addonTotal)}
                            </div>
                        )}
                    </div>

                    {/* ── Payment Terms ── */}
                    <div style={{ maxWidth: 700, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 48 }}>
                        <div style={{ padding: 20, border: '1px solid rgba(212,175,55,0.1)', borderRadius: 14, background: 'var(--panel)', textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Deposit</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>50%</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>to lock production dates</div>
                        </div>
                        <div style={{ padding: 20, border: '1px solid rgba(212,175,55,0.1)', borderRadius: 14, background: 'var(--panel)', textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Balance</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--cream)' }}>50%</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>on wrap day</div>
                        </div>
                        <div style={{ padding: 20, border: '1px solid rgba(212,175,55,0.1)', borderRadius: 14, background: 'var(--panel)', textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Delivery</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--cream)' }}>7 days</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>synced raw footage</div>
                        </div>
                    </div>
                </section>

                {/* ═══ AERIAL IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/aerial.png')", transform: `translateY(${(scrollY - 4000) * 0.06}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content">
                        <div className="img-label">Miami <span>Paradise</span> Festival</div>
                        <div className="img-sub">June 2026 · Multi-Day Reality Production</div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── AGREEMENT ── */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="section-label">Agreement</div>
                        <h2 className="section-title">Sign to confirm</h2>
                        <p className="section-desc">By signing below, both parties agree to the scope of work, deliverables, and payment terms outlined in this proposal.</p>
                    </div>

                    <div style={{ maxWidth: 700, border: '1px solid rgba(100,100,80,0.15)', borderRadius: 20, background: 'var(--panel)', padding: '32px 28px' }}>
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.8, marginBottom: 28, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12, background: 'rgba(255,255,255,0.01)' }}>
                            <strong style={{ color: 'var(--cream)' }}>Scope:</strong> This engagement covers <strong style={{ color: 'var(--cream)' }}>multi-camera reality TV production</strong> at Miami Paradise Festival, June 2026. 40 hours of production across 5 shoot days (Thursday–Monday). Deliverables include organized, multi-cam synced raw footage. Post-production editing is available as an add-on.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Terms:</strong> 50% deposit to lock production dates and crew. Remaining 50% due on wrap day. Cancellation within 14 days forfeits the deposit. Travel and accommodation for crew to be provided or reimbursed separately. Client receives perpetual usage rights on all delivered footage. MediaGeekz retains portfolio/reel usage rights unless otherwise agreed.
                        </div>

                        <div className="sig-grid">
                            <div>
                                <div className="sig-label">Producer — MediaGeekz</div>
                                <div className="sig-preview"><span className="sig-cursive">Daniel Castillo</span></div>
                                <div className="sig-field">Signature</div>
                                <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>Daniel Castillo</span></div>
                                <div className="sig-field">Printed Name</div>
                                <div className="sig-line"><span style={{ fontSize: 11, color: 'var(--muted)' }}>danielcastillo@mediageekz.com</span></div>
                                <div className="sig-field">Email</div>
                            </div>
                            <div>
                                <div className="sig-label">Client — Sensual Movement</div>
                                {signed ? (
                                    <>
                                        <div className="sig-preview"><span className="sig-cursive">{sigName}</span></div>
                                        <div className="sig-field">Signature</div>
                                        <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>{sigName}</span></div>
                                        <div className="sig-field">Printed Name</div>
                                        <div className="sig-line"><span style={{ fontSize: 13, color: 'var(--cream)' }}>{signedAt}</span></div>
                                        <div className="sig-field">Date</div>
                                        <div className="signed-badge">
                                            <span style={{ fontSize: 20 }}>✓</span>
                                            <div>
                                                <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>Agreement Signed</div>
                                                <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>{signedAt}</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 8 }}>Type your full name to sign</div>
                                        <input type="text" className="sig-input" placeholder="Full Name" value={sigName} onChange={(e) => setSigName(e.target.value)} />
                                        {sigName.trim() && <div className="sig-preview"><span className="sig-cursive">{sigName}</span></div>}
                                        <button className="sign-btn" onClick={handleSign} disabled={!sigName.trim()}>✍️ Sign Agreement</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ maxWidth: 700, textAlign: 'center', marginTop: 32 }}>
                        <a href="mailto:danielcastillo@mediageekz.com?subject=Sensual%20Movement%20Reality%20TV%20—%20Question" style={{ color: 'var(--muted-2)', fontSize: 12, textDecoration: 'none' }}>
                            Have questions? ✉ Email us
                        </a>
                    </div>
                </section>

                <div className="divider" />

                <footer className="sm-footer">
                    <div className="footer-logo">MediaGeekz × Sensual Movement</div>
                    <div className="footer-tagline">Reality captured. Stories told.</div>
                </footer>
            </div>
        </>
    );
}
