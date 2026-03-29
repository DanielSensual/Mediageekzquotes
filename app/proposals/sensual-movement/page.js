'use client';
import { useState, useEffect } from 'react';

const CREW = [
    { role: 'Director / Showrunner (Daniel)', rate: 1000, detail: 'Manages entire production — crew scheduling, scene direction, cast management, shot list execution, A-camera operation' },
    { role: 'Cinematographer / DP', rate: 800, detail: 'Dedicated camera operator — cinematic framing, lighting design, lens selection, camera movement, visual storytelling' },
    { role: 'B-Camera Operator', rate: 400, detail: 'Secondary angles, roaming coverage, behind-the-scenes, reaction shots' },
    { role: 'Audio Engineer', rate: 350, detail: 'Wireless lavs (8×), boom mic, ambient sound, live mixing' },
];
const DAILY_RATE = CREW.reduce((s, c) => s + c.rate, 0);

const STD_RATES = [
    { label: 'Director / DP (per day)', rate: 1500, qty: 5, total: 7500 },
    { label: 'Cinematographer (per day)', rate: 1500, qty: 5, total: 7500 },
    { label: 'B-Camera / BTS (per day)', rate: 1500, qty: 5, total: 7500 },
    { label: 'Audio Engineer (per day)', rate: 1000, qty: 5, total: 5000 },
    { label: 'Post-Production (8 × 1hr eps)', rate: 2500, qty: 8, total: 20000 },
];
const STD_TOTAL = STD_RATES.reduce((s, r) => s + r.total, 0);

const EPISODES = 8;
const EDIT_STD = 1000;
const EDIT_PREM = 1500;
const TEASER_RATE = 100;

const SCENES = [
    { icon: '🎤', title: 'Confessional Interviews', desc: 'Private 1-on-1 sit-downs with cast. Raw reactions, drama, personal stories. 2-camera setup with professional lighting.' },
    { icon: '💃', title: 'Cast Social Moments', desc: 'Follow cast as they dance, interact, and connect. Multi-cam roaming captures chemistry, tension, and relationships.' },
    { icon: '🌴', title: 'Miami Lifestyle B-Roll', desc: 'Miami skyline, nightlife, ocean. Cast arrivals, poolside moments, group dinners. The aspirational lifestyle layer.' },
    { icon: '🎭', title: 'Unscripted Drama', desc: 'Roaming cameras catching candid moments — friendships, romances, heated conversations. Unscripted gold.' },
    { icon: '🍽️', title: 'Group Scenes & Outings', desc: 'Cast dinners, pool parties, nightclub outings, beach sessions. Controlled environments where storylines develop.' },
    { icon: '🎬', title: 'Scene Setups & ITMs', desc: 'Produced "In The Moment" scenes — reactions, reveals, confrontations. Director-guided narrative structure.' },
    { icon: '🔥', title: 'Rehearsal Heat', desc: 'Partnered dance rehearsals where chemistry is tested. Intimate body contact, eye contact, missed steps and breakthroughs. The tension builds on camera.' },
    { icon: '🌙', title: 'Late Night Confessions', desc: 'After-hours moments when the walls come down. Balcony conversations, rooftop reflections, whispered truths. Raw emotion in low light.' },
    { icon: '✈️', title: 'Miami Arrival Day', desc: 'Cast lands in Miami. First reactions, hotel check-ins, meeting roommates. Expectations vs reality — the show\'s opening energy.' },
    { icon: '🏆', title: 'Cast Reunion & Showcase', desc: 'Final group performance or social. Resolutions, last dances, farewell confessionals. The season finale moment that ties every arc together.' },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function SensualMovementProposal() {
    const [days, setDays] = useState(5);
    const [editTier, setEditTier] = useState('standard');
    const [teasers, setTeasers] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [sigName, setSigName] = useState('');
    const [signed, setSigned] = useState(false);
    const [signedAt, setSignedAt] = useState(null);

    const crewTotal = DAILY_RATE * days;
    const editRate = editTier === 'premium' ? EDIT_PREM : EDIT_STD;
    const editTotal = editRate * EPISODES;
    const teaserTotal = teasers * TEASER_RATE;
    const grandTotal = crewTotal + editTotal + teaserTotal;
    const savings = STD_TOTAL - grandTotal;

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
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
                @keyframes goldShimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
                @keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:0.6;}50%{opacity:1;}100%{transform:translateY(-120vh) scale(0.3);opacity:0;}}
                @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0);}50%{box-shadow:0 0 40px rgba(212,175,55,0.08);}}
                @keyframes countUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
                @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
                @keyframes slideInRight{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
                .hero-title{font-family:'Outfit',sans-serif;font-size:clamp(42px,7vw,88px);font-weight:700;line-height:0.96;letter-spacing:-0.03em;color:var(--white);margin-bottom:24px;position:relative;z-index:3;}
                .hero-title em{font-style:normal;font-weight:800;background:linear-gradient(90deg,#d4af37,#f0d060,#e8c84a,#d4af37);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:goldShimmer 6s linear infinite;}
                .hero-sub{max-width:640px;color:var(--muted);font-size:17px;line-height:1.7;position:relative;z-index:3;margin-bottom:48px;}
                .hero-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;width:min(100%,900px);position:relative;z-index:3;}
                .hero-stat{padding:20px 16px;border:1px solid rgba(212,175,55,0.12);border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent),rgba(13,11,6,0.8);backdrop-filter:blur(12px);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);animation:glowPulse 4s ease-in-out infinite;}
                .hero-stat:nth-child(1){animation-delay:0s;}.hero-stat:nth-child(2){animation-delay:1s;}.hero-stat:nth-child(3){animation-delay:2s;}.hero-stat:nth-child(4){animation-delay:3s;}
                .hero-stat:hover{border-color:rgba(212,175,55,0.5);transform:translateY(-4px);box-shadow:0 12px 40px rgba(212,175,55,0.1);}
                .hs-label{color:var(--gold);font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;}
                .hs-value{margin-top:10px;color:var(--white);font-family:'Outfit',sans-serif;font-size:17px;font-weight:600;line-height:1.2;}
                .hs-detail{margin-top:6px;color:var(--muted);font-size:11px;}
                @media(max-width:640px){.hero-meta{grid-template-columns:repeat(2,1fr);}}
                .gold-particle{position:fixed;width:3px;height:3px;border-radius:50%;background:var(--gold);pointer-events:none;z-index:0;opacity:0;animation:floatUp linear infinite;}
                .divider{width:min(100%,900px);height:1px;margin:0 auto;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.35),rgba(232,68,108,0.2),transparent);opacity:0.72;}
                .sm-section{max-width:1100px;margin:0 auto;padding:80px 24px;}
                .section-header{display:grid;gap:14px;margin-bottom:40px;max-width:740px;}
                .s-label{color:var(--gold);font-size:10px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;}
                .s-title{font-family:'Outfit',sans-serif;font-size:clamp(32px,5vw,52px);font-weight:600;line-height:1.05;color:var(--white);}
                .s-desc{color:var(--muted);font-size:15px;line-height:1.8;max-width:640px;}
                .scope-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:40px;}
                .scope-card{padding:28px 24px;border:1px solid rgba(212,175,55,0.12);border-radius:16px;background:var(--panel);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);position:relative;overflow:hidden;}
                .scope-card::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.04),transparent);transition:left 0.6s ease;}
                .scope-card:hover::before{left:120%;}
                .scope-card:hover{border-color:rgba(212,175,55,0.4);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.3),0 0 40px rgba(212,175,55,0.06);}
                .scope-icon{font-size:28px;margin-bottom:14px;transition:transform 0.3s;}
                .scope-card:hover .scope-icon{transform:scale(1.15);}
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
                .savings-badge{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.25);border-radius:12px;margin-top:16px;}
                .savings-badge .pct{font-family:'Outfit',sans-serif;font-size:22px;font-weight:700;color:var(--gold);}
                .savings-badge .txt{font-size:12px;color:var(--muted);}
                .cfg-card{padding:32px 28px;border:1px solid rgba(100,100,80,0.15);border-radius:20px;background:var(--panel);margin-bottom:24px;}
                .cfg-step{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--shadow);font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;margin-bottom:16px;}
                .cfg-title{font-family:'Outfit',sans-serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:6px;}
                .cfg-desc{color:var(--muted-2);font-size:13px;margin-bottom:24px;}
                .day-wrap{position:relative;max-width:380px;margin-bottom:28px;}
                .day-sel{width:100%;padding:14px 44px 14px 16px;border:1px solid rgba(212,175,55,0.25);border-radius:12px;background:rgba(13,11,6,0.6);color:var(--white);font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;cursor:pointer;appearance:none;-webkit-appearance:none;outline:none;transition:border-color 0.2s;}
                .day-sel:focus{border-color:var(--gold);}
                .day-sel option{background:#0d0b06;color:var(--cream);}
                .day-wrap::after{content:'▾';position:absolute;right:16px;top:50%;transform:translateY(-50%);color:var(--gold);pointer-events:none;font-size:14px;}
                .crew-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(100,100,80,0.08);}
                .crew-row:last-child{border-bottom:none;}
                .cr-left .cr-role{font-size:13px;color:var(--cream);font-weight:500;}
                .cr-left .cr-detail{font-size:11px;color:var(--muted-2);margin-top:2px;}
                .cr-right{text-align:right;white-space:nowrap;}
                .cr-math{font-size:11px;color:var(--muted-2);}
                .cr-amt{font-size:14px;color:var(--gold);font-weight:600;}
                .crew-total-row{display:flex;justify-content:space-between;padding:14px 0 0;margin-top:8px;border-top:1px solid rgba(212,175,55,0.2);}
                .crew-total-row span:first-child{font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;color:var(--cream);}
                .crew-total-row span:last-child{font-family:'Outfit',sans-serif;font-size:20px;font-weight:700;color:var(--gold);}
                .tier-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0;}
                @media(max-width:640px){.tier-grid{grid-template-columns:1fr;}}
                .tier-card{padding:24px 20px;border:1px solid rgba(100,100,80,0.15);border-radius:16px;background:rgba(255,255,255,0.02);cursor:pointer;transition:all 0.3s;position:relative;}
                .tier-card:hover{border-color:rgba(212,175,55,0.3);transform:translateY(-2px);}
                .tier-card.active{border-color:var(--gold);background:rgba(212,175,55,0.06);box-shadow:0 0 30px rgba(212,175,55,0.06);}
                .tier-badge{position:absolute;top:-10px;right:16px;background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--shadow);font-size:8px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:4px 12px;border-radius:999px;}
                .tier-name{font-family:'Outfit',sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:4px;}
                .tier-price{font-family:'Outfit',sans-serif;font-size:24px;font-weight:700;color:var(--gold);margin-bottom:2px;}
                .tier-ep{font-size:11px;color:var(--muted-2);margin-bottom:10px;}
                .tier-total{font-size:13px;color:var(--cream);font-weight:500;padding:8px 0;border-top:1px solid rgba(100,100,80,0.1);margin-top:8px;}
                .tier-desc{font-size:12px;color:var(--muted-2);margin-top:8px;line-height:1.5;}
                .addon-row{display:flex;justify-content:space-between;align-items:center;padding:16px 0;}
                .addon-left .addon-name{font-size:14px;color:var(--cream);font-weight:500;}
                .addon-left .addon-detail{font-size:11px;color:var(--muted-2);margin-top:2px;}
                .addon-right{display:flex;align-items:center;gap:16px;}
                .addon-price{font-size:13px;color:var(--gold);font-weight:600;}
                .counter{display:flex;align-items:center;gap:10px;}
                .counter-btn{width:32px;height:32px;border-radius:8px;border:1px solid rgba(212,175,55,0.25);background:rgba(13,11,6,0.6);color:var(--gold);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-family:'Outfit',sans-serif;}
                .counter-btn:hover{background:rgba(212,175,55,0.1);border-color:var(--gold);}
                .counter-val{font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;color:var(--white);min-width:24px;text-align:center;}
                .summary-panel{margin-top:32px;padding:28px 24px;border:1px solid rgba(212,175,55,0.25);border-radius:20px;background:radial-gradient(circle at top right,rgba(212,175,55,0.06),transparent 50%),var(--panel);}
                .sum-title{font-family:'Outfit',sans-serif;font-size:18px;font-weight:600;color:var(--white);margin-bottom:16px;}
                .sum-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(100,100,80,0.08);font-size:14px;}
                .sum-row .sum-l{color:var(--muted);}
                .sum-row .sum-r{color:var(--cream);font-weight:500;}
                .sum-total{display:flex;justify-content:space-between;align-items:baseline;padding:16px 0 0;margin-top:8px;border-top:1px solid rgba(212,175,55,0.2);}
                .sum-total .sum-tl{font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;color:var(--white);}
                .sum-total .sum-tv{font-family:'Outfit',sans-serif;font-size:32px;font-weight:700;color:var(--gold);}
                .pay-note{margin-top:16px;padding:12px 16px;border-radius:10px;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.12);font-size:12px;color:var(--muted);line-height:1.6;}
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
                .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1),transform 0.8s cubic-bezier(0.16,1,0.3,1);}
                .reveal.is-visible{opacity:1;transform:translateY(0);}
                .reveal.is-visible .scope-card{opacity:0;animation:countUp 0.5s ease forwards;}
                .reveal.is-visible .scope-card:nth-child(1){animation-delay:0.05s;}
                .reveal.is-visible .scope-card:nth-child(2){animation-delay:0.1s;}
                .reveal.is-visible .scope-card:nth-child(3){animation-delay:0.15s;}
                .reveal.is-visible .scope-card:nth-child(4){animation-delay:0.2s;}
                .reveal.is-visible .scope-card:nth-child(5){animation-delay:0.25s;}
                .reveal.is-visible .scope-card:nth-child(6){animation-delay:0.3s;}
                .reveal.is-visible .scope-card:nth-child(7){animation-delay:0.35s;}
                .reveal.is-visible .scope-card:nth-child(8){animation-delay:0.4s;}
                .reveal.is-visible .scope-card:nth-child(9){animation-delay:0.45s;}
                .reveal.is-visible .scope-card:nth-child(10){animation-delay:0.5s;}
                .reveal.is-visible .tl-block{opacity:0;animation:slideInLeft 0.5s ease forwards;}
                .reveal.is-visible .tl-block:nth-child(1){animation-delay:0.1s;}
                .reveal.is-visible .tl-block:nth-child(2){animation-delay:0.2s;}
                .reveal.is-visible .tl-block:nth-child(3){animation-delay:0.3s;}
                .reveal.is-visible .tl-block:nth-child(4){animation-delay:0.4s;}
                .cfg-card{animation:glowPulse 5s ease-in-out infinite;}
                .img-panel-bg{transition:filter 0.6s ease;}
                .img-panel:hover .img-panel-bg{filter:brightness(0.45) saturate(1.1);}
                .img-panel-content{transition:transform 0.4s ease;}
                .img-panel:hover .img-panel-content{transform:scale(1.03);}
                .sm-footer{text-align:center;padding:80px 24px 40px;border-top:1px solid rgba(100,100,80,0.1);}
                @media print{.no-print{display:none!important;}body{background:white!important;color:#1a1a1a!important;}}
            `}</style>

            <div className="page-shell">
                {/* Floating gold particles */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="gold-particle" style={{ left: `${10 + i * 12}%`, animationDuration: `${8 + i * 3}s`, animationDelay: `${i * 1.5}s`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px` }} />
                ))}
                {/* ═══ HERO ═══ */}
                <div className="sm-hero">
                    <div className="sm-hero-bg" style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
                    <div className="sm-hero-overlay" />
                    <div className="hero-badge">Sensual Movement × MediaGeekz</div>
                    <h1 className="hero-title">Sensual<br /><em>Movement.</em><br />Reality.</h1>
                    <p className="hero-sub">Multi-camera reality TV production following the world of bachata sensual — the cast, the connections, and the drama — filmed on location in Miami, June 2026.</p>
                    <div className="hero-meta">
                        <div className="hero-stat"><div className="hs-label">Client</div><div className="hs-value">Sensual Movement</div><div className="hs-detail">Reality TV Show</div></div>
                        <div className="hero-stat"><div className="hs-label">Episodes</div><div className="hs-value">8 × 1 Hour</div><div className="hs-detail">Full season</div></div>
                        <div className="hero-stat"><div className="hs-label">Production</div><div className="hs-value">Flexible Sessions</div><div className="hs-detail">Scheduled filming days</div></div>
                        <div className="hero-stat"><div className="hs-label">Crew</div><div className="hs-value">4-Man Crew</div><div className="hs-detail">Director + DP + B-Cam + Audio</div></div>
                    </div>
                </div>

                <div className="divider" />

                {/* ═══ SCENE GUIDE ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Scene Guide</div>
                        <h2 className="s-title">What makes bachata TV gold</h2>
                        <p className="s-desc">Reality TV thrives on emotion, conflict, and beauty. The bachata world delivers all three naturally — we just capture it.</p>
                    </div>
                    <div className="scope-grid">
                        {SCENES.map((s, i) => (<div className="scope-card" key={i}><div className="scope-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></div>))}
                    </div>
                </section>

                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/dance.png')", transform: `translateY(${(scrollY - 1200) * 0.08}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Where <span>Connection</span> Becomes Content</div><div className="img-sub">Bachata Sensual · Multi-Cam Reality Production</div></div>
                </div>

                <div className="divider" />

                {/* ═══ PRODUCTION APPROACH ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Production Approach</div>
                        <h2 className="s-title">Flexible. Scheduled. Story-driven.</h2>
                        <p className="s-desc">Filming sessions are scheduled around cast availability and story needs. Our 4-man crew focuses entirely on the reality TV show as its own project — separate from any event coverage.</p>
                    </div>
                    <div className="timeline">
                        <div className="tl-block"><div className="tl-time">Pre-Production</div><div className="tl-label">Planning + Cast Coordination</div><div className="tl-desc">Cast selection, confessional locations, scene outlines. Pre-production call to align on storylines and shooting priorities.</div><div className="tl-loc">📍 Remote + On-Site Scout</div></div>
                        <div className="tl-block"><div className="tl-time">Session 1</div><div className="tl-label">Cast Introductions + First Confessionals</div><div className="tl-desc">Establishing shots, cast arrivals, first interviews. Set up each character&apos;s arc. 4-camera coverage from the start.</div><div className="tl-loc">📍 Miami · On Location</div></div>
                        <div className="tl-block"><div className="tl-time">Sessions 2–4</div><div className="tl-label">Storyline Development + Peak Moments</div><div className="tl-desc">Group outings, dinner scenes, nightlife, social dancing, cast interactions. Confessional check-ins. Drama and relationships develop naturally.</div><div className="tl-loc">📍 Various Miami Locations</div></div>
                        <div className="tl-block"><div className="tl-time">Final Session</div><div className="tl-label">Climax + Final Confessionals + Wrap</div><div className="tl-desc">Key confrontations, resolutions, closing interviews. Miami lifestyle B-roll. Data backup, gear wrap, footage handoff.</div><div className="tl-loc">📍 Miami · Various</div></div>
                    </div>
                </section>

                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/workshop.png')", transform: `translateY(${(scrollY - 2200) * 0.07}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Every <span>Moment</span> Is a Scene</div><div className="img-sub">Cast Interactions · Social Dancing · Group Outings</div></div>
                </div>

                <div className="divider" />

                {/* ═══ STANDARD RATES (reference) ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Standard Rates</div>
                        <h2 className="s-title">Our normal production pricing</h2>
                        <p className="s-desc">For full transparency — here&apos;s what a 4-crew, 5-day reality production with 8 edited episodes normally costs at our standard rates.</p>
                    </div>
                    <div style={{ maxWidth: 700, border: '1px solid rgba(100,100,80,0.12)', borderRadius: 16, background: 'var(--panel)', padding: 24, overflow: 'auto' }}>
                        <table className="std-table">
                            <thead><tr><th>Role</th><th>Rate</th><th>Qty</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
                            <tbody>
                                {STD_RATES.map((r, i) => (<tr key={i}><td className="strike">{r.label}</td><td className="strike">{fmt(r.rate)}</td><td className="strike">{r.qty}</td><td className="strike" style={{ textAlign: 'right' }}>{fmt(r.total)}</td></tr>))}
                                <tr className="total-row"><td colSpan="3" className="strike">Standard Total</td><td className="strike" style={{ textAlign: 'right', fontFamily: "'Outfit', sans-serif", fontSize: 20 }}>{fmt(STD_TOTAL)}</td></tr>
                            </tbody>
                        </table>
                        <div className="savings-badge">
                            <span className="pct">{savings > 0 ? `Save ${fmt(savings)}` : 'Partnership pricing'}</span>
                            <span className="txt">Sensual Movement special rates below</span>
                        </div>
                    </div>
                </section>

                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/confessional.png')", transform: `translateY(${(scrollY - 3200) * 0.06}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">The <span>Confessional</span> Setup</div><div className="img-sub">Where Reality Gets Real — Multi-Camera Interview Suite</div></div>
                </div>

                <div className="divider" />

                {/* ═══ COVERAGE BUILDER ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Build Your Package</div>
                        <h2 className="s-title">Customize your coverage</h2>
                        <p className="s-desc">Select your filming days and editing preferences. Our 4-man crew brings professional multi-camera production to every session. All gear included.</p>
                    </div>

                    {/* Step 1: Filming Days */}
                    <div className="cfg-card">
                        <div className="cfg-step">01</div>
                        <div className="cfg-title">How many filming days?</div>
                        <div className="cfg-desc">4-man crew · 10–12 hour production days · multi-cam included · cinema drone included · all professional gear provided</div>
                        <div className="day-wrap">
                            <select className="day-sel" value={days} onChange={(e) => setDays(Number(e.target.value))}>
                                {[1,2,3,4,5,6,7,8,9,10].map(d => (
                                    <option key={d} value={d}>{d} {d === 1 ? 'day' : 'days'} — {fmt(DAILY_RATE * d)}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 12 }}>Crew Breakdown — {fmt(DAILY_RATE)}/day</div>
                        {CREW.map((c, i) => (
                            <div className="crew-row" key={i}>
                                <div className="cr-left"><div className="cr-role">{c.role}</div><div className="cr-detail">{c.detail}</div></div>
                                <div className="cr-right"><div className="cr-math">{fmt(c.rate)}/day × {days}</div><div className="cr-amt">{fmt(c.rate * days)}</div></div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', marginTop: 8, borderTop: '1px solid rgba(100,100,80,0.08)' }}>
                            <span style={{ fontSize: 11, color: 'var(--gold)' }}>🎥</span>
                            <span style={{ fontSize: 12, color: 'var(--muted)' }}><strong style={{ color: 'var(--cream)' }}>Cinema Drone</strong> — aerial establishing shots, location reveals, cast arrivals · <span style={{ color: 'var(--gold)', fontWeight: 600 }}>INCLUDED FREE</span></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                            <span style={{ fontSize: 11, color: 'var(--gold)' }}>⏱️</span>
                            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Each filming day is a <strong style={{ color: 'var(--cream)' }}>10–12 hour production day</strong> — full call-to-wrap coverage</span>
                        </div>
                        <div className="crew-total-row">
                            <span>Crew Subtotal ({days} {days === 1 ? 'day' : 'days'})</span>
                            <span>{fmt(crewTotal)}</span>
                        </div>
                    </div>

                    {/* Step 2: Episode Editing */}
                    <div className="cfg-card">
                        <div className="cfg-step">02</div>
                        <div className="cfg-title">Episode Editing — 8 × 1-Hour Episodes</div>
                        <div className="cfg-desc">Professional editing for your complete season. You can pay per episode as they&apos;re completed — no need to pay all at once.</div>
                        <div className="tier-grid">
                            <div className={`tier-card ${editTier === 'standard' ? 'active' : ''}`} onClick={() => setEditTier('standard')}>
                                <div className="tier-name">Standard Editor</div>
                                <div className="tier-price">{fmt(EDIT_STD)}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted-2)' }}>/episode</span></div>
                                <div className="tier-total">{EPISODES} episodes × {fmt(EDIT_STD)} = <strong style={{ color: 'var(--gold)' }}>{fmt(EDIT_STD * EPISODES)}</strong></div>
                                <div className="tier-desc">Professional edit, color correction, audio sync, scene assembly</div>
                            </div>
                            <div className={`tier-card ${editTier === 'premium' ? 'active' : ''}`} onClick={() => setEditTier('premium')}>
                                <div className="tier-badge">UPGRADE</div>
                                <div className="tier-name">Premium Editor</div>
                                <div className="tier-price">{fmt(EDIT_PREM)}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted-2)' }}>/episode</span></div>
                                <div className="tier-total">{EPISODES} episodes × {fmt(EDIT_PREM)} = <strong style={{ color: 'var(--gold)' }}>{fmt(EDIT_PREM * EPISODES)}</strong></div>
                                <div className="tier-desc">Our best editor — cinematic color grade, sound design, transitions, motion graphics</div>
                            </div>
                        </div>
                        <div className="pay-note">💡 <strong style={{ color: 'var(--cream)' }}>Flexible payment:</strong> Pay per episode as they&apos;re delivered, or split into monthly installments. No need to pay the full editing cost upfront.</div>
                    </div>

                    {/* Step 3: Add-ons */}
                    <div className="cfg-card">
                        <div className="cfg-step">03</div>
                        <div className="cfg-title">Add-ons</div>
                        <div className="cfg-desc">Optional extras to maximize your content.</div>
                        <div className="addon-row">
                            <div className="addon-left">
                                <div className="addon-name">Social Teaser Clips</div>
                                <div className="addon-detail">30–60s teaser cuts for IG Reels / TikTok promo</div>
                            </div>
                            <div className="addon-right">
                                <div className="addon-price">{fmt(TEASER_RATE)}/ea</div>
                                <div className="counter">
                                    <button className="counter-btn" onClick={() => setTeasers(Math.max(0, teasers - 1))}>−</button>
                                    <span className="counter-val">{teasers}</span>
                                    <button className="counter-btn" onClick={() => setTeasers(teasers + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Summary ── */}
                    <div className="summary-panel">
                        <div className="sum-title">Your Package Summary</div>
                        <div className="sum-row"><span className="sum-l">4-Man Crew × {days} {days === 1 ? 'day' : 'days'}</span><span className="sum-r">{fmt(crewTotal)}</span></div>
                        <div className="sum-row"><span className="sum-l">Episode Editing ({EPISODES} × 1hr) — {editTier === 'premium' ? 'Premium' : 'Standard'}</span><span className="sum-r">{fmt(editTotal)}</span></div>
                        {teasers > 0 && <div className="sum-row"><span className="sum-l">Social Teasers × {teasers}</span><span className="sum-r">{fmt(teaserTotal)}</span></div>}
                        <div className="sum-total">
                            <span className="sum-tl">Total Investment</span>
                            <span className="sum-tv">{fmt(grandTotal)}</span>
                        </div>
                        {savings > 0 && (
                            <div className="savings-badge" style={{ marginTop: 20 }}>
                                <span className="pct">Save {fmt(savings)}</span>
                                <span className="txt">vs standard industry rates ({fmt(STD_TOTAL)})</span>
                            </div>
                        )}
                    </div>

                    {/* ── Gear Room ── */}
                    <div className="req-box">
                        <div className="req-title">🔒 Private Gear Room Required</div>
                        <div className="req-desc">We are bringing over <strong style={{ color: 'var(--cream)' }}>$20,000+ worth of professional cinema equipment</strong> — cameras, lenses, lighting, audio, stabilizers, and accessories. A private, lockable room at the venue or hotel is required for secure gear storage. This room also serves as our daily staging and charging station.</div>
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
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-3)', marginBottom: 6 }}>Editing</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--cream)' }}>Per Episode</div>
                            <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 4 }}>pay as delivered</div>
                        </div>
                    </div>
                </section>

                {/* ═══ IMAGE BREAKS ═══ */}
                <div className="img-panel">
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/poolside.png')", transform: `translateY(${(scrollY - 4500) * 0.06}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Miami <span>Lifestyle</span> Coverage</div><div className="img-sub">Poolside · Nightlife · Cast B-Roll</div></div>
                </div>

                <div className="img-panel" style={{ height: '40vh' }}>
                    <div className="img-panel-bg" style={{ backgroundImage: "url('/sensual-movement/aerial.png')", transform: `translateY(${(scrollY - 5000) * 0.05}px)` }} />
                    <div className="img-panel-overlay" />
                    <div className="img-panel-content"><div className="img-label">Filmed On Location in <span>Miami</span></div><div className="img-sub">June 2026 · Reality TV Production</div></div>
                </div>

                <div className="divider" />

                {/* ═══ PENDING SHOT LIST & SCRIPT ═══ */}
                <section className="sm-section reveal">
                    <div className="section-header">
                        <div className="s-label">Pre-Production</div>
                        <h2 className="s-title">Pending: Shot List & Script</h2>
                        <p className="s-desc">The following production documents will be finalized collaboratively between MediaGeekz and Sensual Movement prior to the first filming session.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                        <div className="cfg-card" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                            <div style={{ fontSize: 24, marginBottom: 12 }}>📋</div>
                            <div className="cfg-title" style={{ fontSize: 18 }}>Master Shot List</div>
                            <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7, marginTop: 8 }}>Scene-by-scene breakdown of required shots, camera angles, cast combinations, and location-specific setups. Built around the 10 scene types outlined above.</div>
                            <div style={{ marginTop: 16, padding: '8px 14px', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 10, background: 'rgba(212,175,55,0.04)', fontSize: 11, color: 'var(--gold)', fontWeight: 600, display: 'inline-block' }}>⏳ PENDING — To be finalized pre-production</div>
                        </div>
                        <div className="cfg-card" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                            <div style={{ fontSize: 24, marginBottom: 12 }}>📝</div>
                            <div className="cfg-title" style={{ fontSize: 18 }}>Episode Outline / Script</div>
                            <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7, marginTop: 8 }}>Loose narrative arc for each of the 8 episodes — cast introductions, key storylines, confessional prompts, climax points, and resolution beats. Structured but flexible for unscripted moments.</div>
                            <div style={{ marginTop: 16, padding: '8px 14px', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 10, background: 'rgba(212,175,55,0.04)', fontSize: 11, color: 'var(--gold)', fontWeight: 600, display: 'inline-block' }}>⏳ PENDING — To be finalized pre-production</div>
                        </div>
                        <div className="cfg-card" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                            <div style={{ fontSize: 24, marginBottom: 12 }}>📍</div>
                            <div className="cfg-title" style={{ fontSize: 18 }}>Location & Cast Schedule</div>
                            <div style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.7, marginTop: 8 }}>Day-by-day filming schedule with confirmed locations, cast call times, scene priorities, and backup plans. Coordinated between Director and Sensual Movement.</div>
                            <div style={{ marginTop: 16, padding: '8px 14px', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 10, background: 'rgba(212,175,55,0.04)', fontSize: 11, color: 'var(--gold)', fontWeight: 600, display: 'inline-block' }}>⏳ PENDING — To be finalized pre-production</div>
                        </div>
                    </div>
                    <div className="pay-note" style={{ marginTop: 24, maxWidth: 700 }}>📌 <strong style={{ color: 'var(--cream)' }}>Note:</strong> All pre-production documents will be developed jointly. The Director (Daniel) manages all crew scheduling, scene coordination, and on-set logistics. The client (Sensual Movement) provides cast access, location details, and story direction input.</div>
                </section>

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
                            <strong style={{ color: 'var(--cream)' }}>Scope:</strong> Multi-camera reality TV production filmed on location in Miami, FL — June 2026. 4-man crew with flexible scheduled filming sessions (10–12 hour production days). 8 × 1-hour episodes. Cinema drone included. This is a standalone reality TV project, separate from any event coverage.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Crew:</strong> Director/Showrunner ($1,000/day — manages crew, scheduling, scene direction, A-camera), Cinematographer/DP ($800/day — dedicated camera operator, lighting, visual storytelling), B-Camera Operator ($400/day), Audio Engineer ($350/day). Multi-camera + cinema drone coverage included.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Editing:</strong> {editTier === 'premium' ? 'Premium' : 'Standard'} editing at {fmt(editRate)}/episode × {EPISODES} episodes = {fmt(editTotal)}. Episodes can be paid individually as delivered.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Requirements:</strong> Private lockable gear room provided by client for $20K+ equipment storage. Crew accommodation room provided by client or organizer.<br /><br />
                            <strong style={{ color: 'var(--cream)' }}>Terms:</strong> 50% deposit to lock production dates and crew. Remaining 50% due on wrap day. Episode editing billed separately per episode. Cancellation within 14 days forfeits the deposit. Client receives perpetual usage rights. MediaGeekz retains portfolio/reel usage rights unless otherwise agreed.
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
                                <div className="sig-label">Client — Sensual Movement (Brand)</div>
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
