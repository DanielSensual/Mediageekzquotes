'use client';
import { useState, useEffect } from 'react';

const STANDARD_RATE = [
    { label: 'Director / DP (per day)', rate: 1500, days: 5, total: 7500 },
    { label: 'Camera Operator / Light (per day)', rate: 1500, days: 5, total: 7500 },
    { label: '3rd Camera / BTS (per day)', rate: 1500, days: 5, total: 7500 },
    { label: 'Post-Production (edit + color + audio)', rate: 3000, days: 1, total: 3000 },
];
const STANDARD_TOTAL = 25500;

const NEGOTIATED_PACKAGES = [
    {
        id: 'essential',
        name: 'Essential Reality',
        tagline: 'Raw Production — 3 Crew · 5 Days',
        price: 6500,
        crew: [
            { label: 'Director / Showrunner (Daniel)', rate: '$1,000/day', days: '5 days', total: 5000, detail: 'Creative direction, scene blocking, A-camera + interviews' },
            { label: 'Camera Operator / Lighting', rate: '$500/day', days: '5 days', total: 2500, detail: 'B-camera coverage, lighting setups, social floor roaming' },
            { label: '3rd Videographer (Contracted)', rate: 'Included', days: '—', total: 0, detail: 'C-camera / BTS / confessional rotation — sourced by MediaGeekz', free: true },
        ],
        included: [
            '40 hours of multi-cam production (Thu–Mon)',
            '3-person crew on set daily',
            'Director / Showrunner managing all scenes',
            'Professional cinema cameras + lenses ($20K+ gear)',
            'Wireless lavalier microphones (8×)',
            'Portable LED lighting for all setups',
            'Multi-cam synced raw footage delivery',
            'Scene-separated, day-labeled file organization',
            'Private gear room at venue (required)',
        ],
        post: ['Organized raw footage (synced, labeled)', 'Basic audio sync to cameras'],
        excluded: ['Edited episodes', 'Color grading', 'Sizzle reel'],
    },
    {
        id: 'complete',
        name: 'Complete Story',
        tagline: 'Full Production + Our Best Editor',
        recommended: true,
        price: 9500,
        crew: [
            { label: 'Director / Showrunner (Daniel)', rate: '$1,000/day', days: '5 days', total: 5000, detail: 'Full creative control, A-camera, talent direction' },
            { label: 'Camera Operator / Lighting', rate: '$500/day', days: '5 days', total: 2500, detail: 'B-camera coverage, lighting tech, social floor roaming' },
            { label: '3rd Videographer (Contracted)', rate: 'Included', days: '—', total: 0, detail: 'C-camera / BTS / confessional — sourced by MediaGeekz', free: true },
            { label: 'Post-Production (Best Editor)', rate: 'Flat', days: '—', total: 2000, detail: 'Our top editor — sizzle reel + selects + color grade' },
        ],
        included: [
            '40 hours of multi-cam production (Thu–Mon)',
            '3-person crew on set daily',
            'Director / Showrunner managing all scenes',
            'Professional cinema cameras + lenses ($20K+ gear)',
            'Wireless lavalier microphones (8×)',
            'Full professional lighting (all setups)',
            'Multi-cam synced raw footage delivery',
            'Scene-separated, day-labeled file organization',
            'Private gear room at venue (required)',
            'Sizzle reel (3–5 min highlight cut)',
            'Color grading — cinematic gold/black look',
            'Broadcast-level audio mixing',
            'Daily selects / best-of compilation per day',
        ],
        post: ['Sizzle reel (3–5 min)', 'Color graded footage', 'Audio mix + cleanup', 'Daily selects compilations'],
        excluded: ['Full episode editing (available separately)'],
        bonuses: [
            { label: 'Sizzle Reel', detail: 'High-energy 3–5 min promo for pitching networks' },
            { label: 'Cinematic Color Grade', detail: 'Full LUT + grade — gold/black Sensual Movement look' },
            { label: 'Daily Selects', detail: 'Best moments compiled each night for next-day review' },
        ],
    },
];

const SCENES = [
    { icon: '💃', title: 'Social Dancing Floor', desc: 'Multi-cam roaming coverage of social dancing — the heart of every bachata event. Follow featured dancers through the crowd, capturing connection and movement.' },
    { icon: '🎤', title: 'Confessional Interviews', desc: 'Private 1-on-1 interviews with cast members. Raw reactions, drama, personal stories. Dedicated camera + lighting in a private confessional space.' },
    { icon: '🏆', title: 'Workshops & Competitions', desc: 'Multi-angle coverage of instructor workshops and Jack & Jill competitions. Close-ups on technique, crowd reactions, and winner reveals.' },
    { icon: '🌴', title: 'Miami Lifestyle B-Roll', desc: 'Establishing shots of Miami — ocean, skyline, nightlife. Cast arriving, poolside moments, group dinners. The aspirational lifestyle layer.' },
    { icon: '🎭', title: 'Behind-the-Scenes Drama', desc: 'Roaming camera catches candid moments — friendships, romances forming, backstage energy. The unscripted gold that makes reality TV compelling.' },
    { icon: '🎶', title: 'Performances & Shows', desc: 'Full multi-cam coverage of stage performances and showcases. A-cam hero on performers, B-cam crowd reactions, C-cam wide establishing shots.' },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function SensualMovementProposal() {
    const [expandedPkg, setExpandedPkg] = useState('complete');
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

    const handleSign = () => { if (!sigName.trim()) return; const now = new Date(); setSignedAt(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })); setSigned(true); };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
                :root{--shadow:#030303;--navy:#0d0b06;--panel:rgba(13,11,6,0.92);--border:rgba(212,175,55,0.16);--gold:#d4af37;--gold-light:#f0d060;--rose:#e8446c;--cream:#e8e0d0;--white:#f5f0e8;--muted:#9a917e;--muted-2:#6b6352;--muted-3:#4a4338;}
                *{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
                body{font-family:'Inter',sans-serif!important;color:var(--cream)!important;background:radial-gradient(circle at 30% 10%,rgba(212,175,55,0.06),transparent 40%),radial-gradient(circle at 70% 80%,rgba(232,68,108,0.04),transparent 40%),linear-gradient(180deg,#0d0b06 0%,#050403 50%,#030303 100%)!important;line-height:1.6;overflow-x:hidden;}
                body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;background:linear-gradient(90deg,rgba(212,175,55,0.015) 1px,transparent 1px),linear-gradient(0deg,rgba(212,175,55,0.01) 1px,transparent 1px);background-size:80px 80px;opacity:0.4;mask-image:radial-gradient(circle at center,black 20%,transparent 75%);}
                ::selection{background:rgba(212,175,55,0.3);color:var(--white);}
                ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:var(--shadow);}::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.4);border-radius:999px;}
                .page-shell{position:relative;z-index:1;}
                .sm-hero{min-height:92vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:80px 24px 60px;position:relative;overflow:hidden;}
                .sm-hero-bg{position:absolute;inset:0;z-index:0;background:url('/sensual-movement/hero.png') center/cover no-repeat;filter:brightness(0.3) saturate(0.9);transform:scale(1.1);}
                .sm-hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(3,3,3,0.7) 0%,rgba(3,3,3,0.2) 40%,rgba(3,3,3,0.85) 100%),radial-gradient(ellipse at 50% 20%,rgba(212,175,55,0.15) 0%,transparent 50%);}
                .sm-hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:200px;background:linear-gradient(transparent,var(--shadow));pointer-events:none;z-index:2;}
                .hero-badge{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border:1px solid rgba(212,175,55,0.3);border-radius:999px;background:rgba(13,11,6,0.8);color:var(--gold);font-size:11px;font-weight:600;letter-spacing:0.3em;text-transform:uppercase;backdrop-filter:blur(12px);margin-bottom:32px;position:relative;z-index:3;}
                .hero-badge::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 7px rgba(212,175,55,0.15);animation:pd 2s ease-in-out infinite;}
                @keyframes pd{0%,100%{box-shadow:0 0 0 7px rgba(212,175,55,0.15);}50%{box-shadow:0 0 0 12px rgba(212,175,55,0.06);}}
                .hero-title{font-family:'Outfit',sans-serif;font-size:clamp(42px,7vw,88px);font-weight:700;line-height:0.96;letter-spacing:-0.03em;color:var(--white);margin-bottom:24px;position:relative;z-index:3;}
                .hero-title em{color:var(--gold);font-style:normal;font-weight:800;background:linear-gradient(135deg,#d4af37,#f0d060);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
                .hero-sub{max-width:640px;color:var(--muted);font-size:17px;line-height:1.7;position:relative;z-index:3;margin-bottom:48px;}
                .hero-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;width:min(100%,900px);position:relative;z-index:3;}
                .hero-stat{padding:20px 16px;border:1px solid rgba(212,175,55,0.12);border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent),rgba(13,11,6,0.8);backdrop-filter:blur(12px);transition:border-color 0.3s;}
                .hero-stat:hover{border-color:rgba(212,175,55,0.35);}
                .hs-label{color:var(--gold);font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;}
                .hs-value{margin-top:10px;color:var(--white);font-family:'Outfit',sans-serif;font-size:17px;font-weight:600;line-height:1.2;}
                .hs-detail{margin-top:6px;color:var(--muted);font-size:11px;}
                @media(max-width:640px){.hero-meta{grid-template-columns:repeat(2,1fr);}}
                .divider{width:min(100%,900px);height:1px;margin:0 auto;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.35),rgba(232,68,108,0.2),transparent);opacity:0.72;}
                .sm-section{max-width:1100px;margin:0 auto;padding:80px 24px;}
                .section-header{display:grid;gap:14px;margin-bottom:40px;max-width:740px;}
                .s-label{color:var(--gold);font-size:10px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;}
                .s-title{font-family:'Outfit',sans-serif;font-size:clamp(32px,5vw,52px);font-weight:600;line-height:1.05;color:var(--white);}
                .s-desc{color:var(--muted);font-size:15px;line-height:1.8;max-width:640px;}
                .scope-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:40px;}
                .scope-card{padding:28px 24px;border:1px solid rgba(212,175,55,0.12);border-radius:16px;background:var(--panel);transition:border-color 0.3s,transform 0.3s;}
                .scope-card:hover{border-color:rgba(212,175,55,0.35);transform:translateY(-2px);}
                .scope-icon{font-size:28px;margin-bottom:14px;}
                .scope-card h3{font-family:'Outfit',sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:8px;}
                .scope-card p{font-size:13px;color:var(--muted-2);line-height:1.7;}
                .timeline{position:relative;padding-left:36px;}
                .timeline::before{content:'';position:absolute;left:8px;top:0;bottom:0;width:1px;background:linear-gradient(180deg,var(--gold),var(--rose),transparent);}
                .tl-block{position:relative;margin-bottom:28px;}
                .tl-block::before{content:'';position:absolute;left:-32px;top:6px;width:10px;height:10px;border-radius:50%;background:var(--gold);border:2px solid var(--shadow);box-shadow:0 0 0 4px rgba(212,175,55,0.15);}
                .tl-time{color:var(--gold);font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;}
                .tl-label{color:var(--cream);font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;margin-bottom:3px;}
                .tl-desc{color:var(--muted-2);font-size:12px;line-height:1.6;}
                .tl-loc{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:4px 10px;background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.15);border-radius:999px;font-size:10px;color:var(--gold);font-weight:600;letter-spacing:0.1em;text-transform:uppercase;}
                .img-panel{position:relative;height:50vh;overflow:hidden;display:flex;align-items:center;justify-content:center;}
                .img-panel-bg{position:absolute;inset:-20% 0;z-index:0;background-size:cover;background-position:center;filter:brightness(0.35) saturate(0.9);}
                .img-panel-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,var(--shadow) 0%,transparent 30%,transparent 70%,var(--shadow) 100%);}
                .img-panel-content{position:relative;z-index:2;text-align:center;padding:24px;}
                .img-label{font-family:'Outfit',sans-serif;font-size:clamp(20px,4vw,36px);font-weight:300;color:rgba(245,240,232,0.9);letter-spacing:0.08em;}
                .img-label span{color:var(--gold);font-weight:600;}
                .img-sub{font-size:12px;color:rgba(154,145,126,0.6);letter-spacing:0.2em;text-transform:uppercase;margin-top:8px;}
                .std-table{width:100%;border-collapse:collapse;margin:20px 0;}
                .std-table th{text-align:left;font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted-3);padding:10px 12px;border-bottom:1px solid rgba(100,100,80,0.15);}
                .std-table td{padding:12px;font-size:13px;color:var(--muted);border-bottom:1px solid rgba(100,100,80,0.08);}
                .std-table .strike{text-decoration:line-through;opacity:0.45;}
                .std-table .total-row td{border-top:1px solid rgba(212,175,55,0.2);font-weight:700;color:var(--muted);font-size:15px;}
                .std-table .total-row .strike{font-family:'Outfit',sans-serif;}
                .savings-badge{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.25);border-radius:12px;margin-top:16px;}
                .savings-badge .pct{font-family:'Outfit',sans-serif;font-size:22px;font-weight:700;color:var(--gold);}
                .savings-badge .txt{font-size:12px;color:var(--muted);}
                .pkgs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px;}
                @media(max-width:860px){.pkgs-grid{grid-template-columns:1fr;}}
                .pkg{padding:36px 28px;border:1px solid rgba(100,100,80,0.15);border-radius:20px;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent),var(--panel);transition:border-color 0.3s,transform 0.3s;position:relative;}
                .pkg:hover{border-color:rgba(212,175,55,0.3);transform:translateY(-4px);}
                .pkg.rec{border-color:var(--gold);background:radial-gradient(circle at top right,rgba(212,175,55,0.1),transparent 50%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),rgba(13,11,6,0.96);box-shadow:0 0 50px rgba(212,175,55,0.08);}
                .pkg-badge{position:absolute;top:-12px;left:28px;background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--shadow);font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:5px 16px;border-radius:999px;}
                .pkg-name{font-family:'Outfit',sans-serif;font-size:28px;font-weight:700;color:var(--white);margin-bottom:4px;}
                .pkg-tag{color:var(--muted-2);font-size:12px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:20px;}
                .pkg-price-row{display:flex;align-items:baseline;gap:8px;padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid rgba(100,100,80,0.15);}
                .pkg-amt{font-family:'Outfit',sans-serif;font-size:38px;font-weight:700;color:var(--gold);}
                .pkg-note{color:var(--muted-2);font-size:11px;}
                .crew-line{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(100,100,80,0.08);}
                .crew-line:last-child{border-bottom:none;}
                .crew-left .cl-name{font-size:13px;color:var(--cream);font-weight:500;}
                .crew-left .cl-detail{font-size:11px;color:var(--muted-2);margin-top:2px;}
                .crew-right{text-align:right;white-space:nowrap;}
                .crew-right .cr-rate{font-size:11px;color:var(--muted-2);}
                .crew-right .cr-total{font-size:14px;color:var(--gold);font-weight:600;}
                .crew-right .cr-free{font-size:11px;color:rgba(212,175,55,0.6);font-style:italic;}
                .pkg-features{list-style:none;margin-top:20px;}
                .pkg-features li{font-size:12px;color:var(--muted);padding:6px 0 6px 22px;position:relative;line-height:1.5;}
                .pkg-features li::before{content:'✓';position:absolute;left:0;color:var(--gold);font-size:12px;}
                .pkg-features li.ex{opacity:0.3;}
                .pkg-features li.ex::before{content:'—';color:var(--muted-3);}
                .pkg-features li.bonus{color:var(--gold);font-weight:500;}
                .pkg-features li.bonus::before{content:'★';color:var(--gold);}
                .req-box{margin-top:40px;padding:24px;border:1px solid rgba(232,68,108,0.2);border-radius:16px;background:rgba(232,68,108,0.04);}
                .req-title{font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;color:var(--rose);margin-bottom:8px;display:flex;align-items:center;gap:8px;}
                .req-desc{font-size:13px;color:var(--muted);line-height:1.7;}
                .sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:32px;padding-top:28px;border-top:1px solid rgba(100,100,80,0.12);}
                .sig-label{font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted-3);margin-bottom:32px;}
                .sig-preview{min-height:52px;padding:10px 16px;border-bottom:2px solid rgba(100,100,80,0.3);margin-bottom:6px;display:flex;align-items:flex-end;}
                .sig-cursive{font-family:'Dancing Script',cursive;font-size:28px;font-weight:700;color:var(--white);line-height:1.2;}
                .sig-field{font-size:11px;color:var(--muted-2);margin-bottom:18px;}
                .sig-line{border-bottom:1px solid rgba(100,100,80,0.3);padding-bottom:6px;margin-bottom:6px;min-height:28px;}
                .sig-input{width:100%;padding:12px 16px;border:1px solid rgba(100,100,80,0.2);border-radius:10px;background:rgba(13,11,6,0.6);color:var(--white);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;}
                .sig-input:focus{border-color:var(--gold);}
                .sign-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px;border:none;border-radius:12px;cursor:pointer;background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--shadow);font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-top:16px;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 6px 24px rgba(212,175,55,0.3);}
                .sign-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 32px rgba(212,175,55,0.4);}
                .sign-btn:disabled{opacity:0.4;cursor:not-allowed;}
                .signed-badge{display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:12px;background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.25);margin-top:16px;}
                @media(max-width:640px){.sig-grid{grid-template-columns:1fr;}}
                .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease;}
                .reveal.is-visible{opacity:1;transform:translateY(0);}
                .sm-footer{text-align:center;padding:80px 24px 40px;border-top:1px solid rgba(100,100,80,0.1);}
                @media print{.no-print{display:none!important;}body{background:white!important;color:#1a1a1a!important;}}
            `}</style>

            <div className="page-shell">
                {/* ═══ HERO ═══ */}
                <div className="sm-hero">
                    <div className="sm-hero-bg" style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
                    <div className="sm-hero-overlay" />
                    <div className="hero-badge">Sensual Movement × MediaGeekz</div>
                    <h1 className="hero-title">Miami<br /><em>Paradise.</em><br />Reality.</h1>
                    <p className="hero-sub">Multi-camera reality TV production capturing the world of bachata sensual — from the dance floor to the drama — at Miami Paradise Festival, June 2026.</p>
                    <div className="hero-meta">
                        <div className="hero-stat"><div className="hs-label">Client</div><div className="hs-value">Sensual Movement</div><div className="hs-detail">Festival Organizer</div></div>
                        <div className="hero-stat"><div className="hs-label">Event</div><div className="hs-value">Miami Paradise</div><div className="hs-detail">June 2026 · Miami, FL</div></div>
                        <div className="hero-stat"><div className="hs-label">Production</div><div className="hs-value">40 Hours</div><div className="hs-detail">Thu–Mon · 5 shoot days</div></div>
                        <div className="hero-stat"><div className="hs-label">Crew</div><div className="hs-value">3-Man Crew</div><div className="hs-detail">Director + 2 Camera/Light</div></div>
                    </div>
                </div>

                <div className="divider" />

                {/* ═══ SCENE GUIDE ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Scene Guide</div>
                        <h2 className="s-title">What makes bachata TV gold</h2>
                        <p className="s-desc">Reality TV thrives on emotion, conflict, and beauty. A bachata festival delivers all three naturally.</p>
                    </div>
                    <div className="scope-grid">
                        {SCENES.map((s, i) => (<div className="scope-card" key={i}><div className="scope-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></div>))}
                    </div>
                </section>

                {/* ═══ DANCE IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/dance.png')", transform: `translateY(${(scrollY - 1200) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Where <span>Connection</span> Becomes Content</div><div className="img-sub">Bachata Sensual · Multi-Cam Reality Production</div></div>
                </div>

                <div className="divider" />

                {/* ═══ PRODUCTION SCHEDULE ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Production Schedule</div>
                        <h2 className="s-title">Five days. Forty hours.</h2>
                        <p className="s-desc">Wednesday arrival and setup. Cameras roll Thursday through Monday — covering every workshop, social, performance, and candid moment.</p>
                    </div>
                    <div className="timeline">
                        <div className="tl-block"><div className="tl-time">Wednesday</div><div className="tl-label">Crew Arrival + Location Scout</div><div className="tl-desc">Crew arrives in Miami. Venue walkthrough, confessional room setup, camera placements mapped. Pre-production meeting with Sensual Movement team.</div><div className="tl-loc">📍 Miami · Venue</div></div>
                        <div className="tl-block"><div className="tl-time">Thursday · Day 1 (8 hrs)</div><div className="tl-label">Festival Opens + Cast Introductions</div><div className="tl-desc">First confessional interviews, cast arrivals, opening workshops. Establish characters and storylines. Evening social dancing — full floor coverage.</div><div className="tl-loc">📍 Main Venue + Social Floor</div></div>
                        <div className="tl-block"><div className="tl-time">Friday · Day 2 (8 hrs)</div><div className="tl-label">Workshops + Drama Development</div><div className="tl-desc">Intensive workshop coverage, Jack &amp; Jill prelims, poolside B-roll, group dinner scenes. Confessional check-ins with cast.</div><div className="tl-loc">📍 Workshop Rooms + Pool + Social</div></div>
                        <div className="tl-block"><div className="tl-time">Saturday · Day 3 (10 hrs)</div><div className="tl-label">Peak Night — Performances & Social</div><div className="tl-desc">Main stage performances, competition finals, peak social dancing. Biggest night — all cameras rolling, maximum coverage. Extended hours for late-night socials.</div><div className="tl-loc">📍 Main Stage + Social Floor</div></div>
                        <div className="tl-block"><div className="tl-time">Sunday · Day 4 (8 hrs)</div><div className="tl-label">Competition Finals + Storyline Resolution</div><div className="tl-desc">Final competitions, closing workshops, cast wrap interviews. Capture storyline resolutions and emotional moments.</div><div className="tl-loc">📍 Full Venue</div></div>
                        <div className="tl-block"><div className="tl-time">Monday · Day 5 (6 hrs)</div><div className="tl-label">Closing + Final Confessionals</div><div className="tl-desc">Morning-after interviews, farewell scenes, Miami lifestyle B-roll. Final confessionals wrapping each cast member&apos;s arc. Data backup and wrap.</div><div className="tl-loc">📍 Miami · Various</div></div>
                    </div>
                </section>

                {/* ═══ WORKSHOP IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/workshop.png')", transform: `translateY(${(scrollY - 2200) * 0.07}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Every <span>Workshop</span> Is a Scene</div><div className="img-sub">Instructor Showcases · Jack & Jill · Competition Coverage</div></div>
                </div>

                <div className="divider" />

                {/* ═══ STANDARD RATES (for reference) ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Standard Rates</div>
                        <h2 className="s-title">Our normal production pricing</h2>
                        <p className="s-desc">For full transparency — here&apos;s what a 3-crew, 5-day reality production normally costs at our standard day rates.</p>
                    </div>

                    <div style={{ maxWidth: 700, border: '1px solid rgba(100,100,80,0.12)', borderRadius: 16, background: 'var(--panel)', padding: '24px', overflow: 'auto' }}>
                        <table className="std-table">
                            <thead><tr><th>Role</th><th>Day Rate</th><th>Days</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
                            <tbody>
                                {STANDARD_RATE.map((r, i) => (
                                    <tr key={i}>
                                        <td className="strike">{r.label}</td>
                                        <td className="strike">{fmt(r.rate)}</td>
                                        <td className="strike">{r.days}</td>
                                        <td className="strike" style={{ textAlign: 'right' }}>{fmt(r.total)}</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="3" className="strike">Standard Total</td>
                                    <td className="strike" style={{ textAlign: 'right', fontFamily: "'Outfit', sans-serif", fontSize: 20 }}>{fmt(STANDARD_TOTAL)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="savings-badge">
                            <span className="pct">Up to 75% off</span>
                            <span className="txt">Sensual Movement partnership pricing below</span>
                        </div>
                    </div>
                </section>

                {/* ═══ CONFESSIONAL IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/confessional.png')", transform: `translateY(${(scrollY - 3200) * 0.06}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">The <span>Confessional</span> Setup</div><div className="img-sub">Where Reality Gets Real — 2-Camera Interview Suite</div></div>
                </div>

                <div className="divider" />

                {/* ═══ NEGOTIATED PRICING ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Sensual Movement Special</div>
                        <h2 className="s-title">Partnership pricing</h2>
                        <p className="s-desc">Because we believe in this project — heavily discounted rates exclusive to Sensual Movement. Full professional production, fraction of the cost.</p>
                    </div>

                    <div className="pkgs-grid">
                        {NEGOTIATED_PACKAGES.map(pkg => (
                            <div key={pkg.id} className={`pkg ${pkg.recommended ? 'rec' : ''}`}>
                                {pkg.recommended && <div className="pkg-badge">Recommended</div>}
                                <div className="pkg-name">{pkg.name}</div>
                                <div className="pkg-tag">{pkg.tagline}</div>
                                <div className="pkg-price-row">
                                    <span className="pkg-amt">{fmt(pkg.price)}</span>
                                    <span className="pkg-note">40 hours · {pkg.crew.length} roles</span>
                                </div>

                                {/* Crew Breakdown */}
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 12 }}>Crew Breakdown</div>
                                    {pkg.crew.map((c, i) => (
                                        <div className="crew-line" key={i}>
                                            <div className="crew-left">
                                                <div className="cl-name">{c.label}</div>
                                                <div className="cl-detail">{c.detail}</div>
                                            </div>
                                            <div className="crew-right">
                                                <div className="cr-rate">{c.rate} × {c.days}</div>
                                                {c.free ? <div className="cr-free">Included</div> : c.total > 0 ? <div className="cr-total">{fmt(c.total)}</div> : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <ul className="pkg-features">
                                    {pkg.included.map((f, i) => <li key={i}>{f}</li>)}
                                    {pkg.excluded.map((f, i) => <li key={'x' + i} className="ex">{f}</li>)}
                                    {pkg.bonuses?.map((b, i) => <li key={'b' + i} className="bonus">{b.label} — {b.detail}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* ── Gear Room Requirement ── */}
                    <div className="req-box">
                        <div className="req-title">🔒 Private Gear Room Required</div>
                        <div className="req-desc">
                            We are bringing over <strong style={{ color: 'var(--cream)' }}>$20,000+ worth of professional cinema equipment</strong> — cameras, lenses, lighting, audio, stabilizers, and accessories. A private, lockable room at the venue or hotel is required for secure gear storage throughout the production. This room will also serve as our daily staging and charging station.
                        </div>
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

                {/* ═══ POOLSIDE IMAGE BREAK ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/poolside.png')", transform: `translateY(${(scrollY - 4500) * 0.06}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Miami <span>Lifestyle</span> Coverage</div><div className="img-sub">Poolside · Nightlife · Cast B-Roll</div></div>
                </div>

                {/* ═══ AERIAL IMAGE BREAK ═══ */}
                <div className="img-panel" style={{ height: '40vh' }}>
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/aerial.png')", transform: `translateY(${(scrollY - 5000) * 0.05}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Miami <span>Paradise</span> Festival</div><div className="img-sub">June 2026 · Multi-Day Reality Production</div></div>
                </div>

                <div className="divider" />

                {/* ═══ AGREEMENT ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Agreement</div>
                        <h2 className="s-title">Sign to confirm</h2>
                        <p className="s-desc">By signing below, both parties agree to the scope of work, deliverables, and payment terms outlined in this proposal.</p>
                    </div>

                    <div style={{ maxWidth: 700, border: '1px solid rgba(100,100,80,0.15)', borderRadius: 20, background: 'var(--panel)', padding: '32px 28px' }}>
                        <div style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.8, marginBottom: 28, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12, background: 'rgba(255,255,255,0.01)' }}>
                            <strong style={{ color: 'var(--cream)' }}>Scope:</strong> Multi-camera reality TV production at Miami Paradise Festival, June 2026. 40 hours across 5 shoot days (Thu–Mon) with a 3-person crew. Deliverables include organized, multi-cam synced raw footage. Post-production included in Complete Story package.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Requirements:</strong> Private lockable gear room provided by client for $20K+ equipment storage. Crew accommodation room provided by client or organizer.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Terms:</strong> 50% deposit to lock production dates and crew. Remaining 50% due on wrap day. Cancellation within 14 days forfeits the deposit. Client receives perpetual usage rights. MediaGeekz retains portfolio/reel usage rights unless otherwise agreed.
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
                                        <div className="signed-badge"><span style={{ fontSize: 20 }}>✓</span><div><div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>Agreement Signed</div><div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 2 }}>{signedAt}</div></div></div>
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
                        <a href="mailto:danielcastillo@mediageekz.com?subject=Sensual%20Movement%20Reality%20TV" style={{ color: 'var(--muted-2)', fontSize: 12, textDecoration: 'none' }}>Have questions? ✉ Email us</a>
                    </div>
                </section>

                <div className="divider" />

                <footer className="sm-footer">
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 10 }}>MediaGeekz × Sensual Movement</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 300, fontStyle: 'italic', color: 'rgba(100,100,80,0.4)' }}>Reality captured. Stories told.</div>
                </footer>
            </div>
        </>
    );
}
