'use client';

import { useEffect, useState, useMemo } from 'react';

const HOUR_OPTIONS = [
    { label: '2-Hour Session', value: 2, price: 350, desc: 'Quick listing coverage' },
    { label: '4-Hour Session', value: 4, price: 650, desc: 'Full listing + agent brand', popular: true },
    { label: '6-Hour Session', value: 6, price: 950, desc: 'Multiple listings in one day' },
    { label: '8-Hour Session', value: 8, price: 1200, desc: 'Full-day production' },
    { label: '8 Hours / Month Retainer', value: 'retainer', price: 1000, desc: 'Monthly content — best per-hour rate' },
];

const EDITING_OPTIONS = [
    { label: 'Standard Edit', value: 'standard', price: 0, desc: 'Color grade, music, branded lower thirds', included: true },
    { label: 'Premium Edit', value: 'premium', price: 150, desc: 'Motion graphics, transitions, text overlays' },
    { label: 'Cinematic Edit', value: 'cinematic', price: 300, desc: 'Film-grade finish, sound design, custom graphics' },
];

const REELS_OPTIONS = [
    { label: 'No Reels', value: 0, price: 0 },
    { label: '5 Social Reels', value: 5, price: 200, desc: 'IG, TikTok, Shorts optimized' },
    { label: '10 Social Reels', value: 10, price: 350, desc: 'Full social content bundle', popular: true },
    { label: '15 Social Reels', value: 15, price: 500, desc: 'Maximum reach package' },
];

export default function VeronicaEllynProposal() {
    const [selectedHours, setSelectedHours] = useState(1);
    const [selectedEditing, setSelectedEditing] = useState(0);
    const [selectedReels, setSelectedReels] = useState(0);
    const [droneAddon, setDroneAddon] = useState(true);
    const [socialMgmt, setSocialMgmt] = useState(false);

    const total = useMemo(() => {
        let sum = HOUR_OPTIONS[selectedHours].price;
        sum += EDITING_OPTIONS[selectedEditing].price;
        sum += REELS_OPTIONS[selectedReels].price;
        if (droneAddon && HOUR_OPTIONS[selectedHours].value === 2) sum += 100;
        if (socialMgmt) sum += 500;
        return sum;
    }, [selectedHours, selectedEditing, selectedReels, droneAddon, socialMgmt]);

    const lineItems = useMemo(() => {
        const items = [];
        const h = HOUR_OPTIONS[selectedHours];
        items.push({ name: h.label, price: h.price });
        const e = EDITING_OPTIONS[selectedEditing];
        if (e.price > 0) items.push({ name: e.label, price: e.price });
        else items.push({ name: e.label + ' (included)', price: 0 });
        if (droneAddon) {
            if (HOUR_OPTIONS[selectedHours].value === 2) items.push({ name: 'Drone Coverage', price: 100 });
            else items.push({ name: 'Drone Coverage (included)', price: 0 });
        }
        const r = REELS_OPTIONS[selectedReels];
        if (r.price > 0) items.push({ name: r.label, price: r.price });
        if (socialMgmt) items.push({ name: 'Monthly Social Management', price: 500 });
        return items;
    }, [selectedHours, selectedEditing, selectedReels, droneAddon, socialMgmt]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const IMG = '/proposals/veronica-ellyn';

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

                :root {
                    --shadow: #0A0E1A;
                    --midnight: #111827;
                    --slate: #1E293B;
                    --steel: #64748B;
                    --stone: #94A3B8;
                    --gold: #D4A843;
                    --gold-soft: rgba(212, 168, 67, 0.12);
                    --gold-glow: rgba(212, 168, 67, 0.25);
                    --champagne: #F0E6D3;
                    --cream: #F1F5F9;
                    --white: #F8FAFC;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    background: var(--shadow) !important;
                    color: var(--cream) !important;
                    line-height: 1.6;
                    overflow-x: hidden;
                }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: var(--shadow); }
                ::-webkit-scrollbar-thumb { background: var(--steel); border-radius: 2px; }

                /* ---- HERO ---- */
                .proposal-hero {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 60px 24px;
                    position: relative;
                    background: radial-gradient(ellipse at 50% 30%, rgba(30, 41, 59, 0.9) 0%, var(--shadow) 70%);
                    overflow: hidden;
                }

                .proposal-hero::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(180deg, transparent 60%, var(--shadow) 100%);
                    pointer-events: none;
                }

                .proposal-hero::after {
                    content: '';
                    position: absolute;
                    top: -50%; left: -50%; right: -50%; bottom: -50%;
                    background: radial-gradient(circle at 30% 40%, rgba(212, 168, 67, 0.03) 0%, transparent 50%),
                                radial-gradient(circle at 70% 60%, rgba(100, 120, 200, 0.03) 0%, transparent 50%);
                    animation: heroFloat 20s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes heroFloat {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(2%, -1%) rotate(1deg); }
                    66% { transform: translate(-1%, 2%) rotate(-1deg); }
                }

                .hero-badge {
                    font-family: 'Inter', sans-serif;
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 4px; text-transform: uppercase;
                    color: var(--gold);
                    margin-bottom: 40px;
                    position: relative; z-index: 1;
                }

                .pt-hero-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(48px, 8vw, 96px);
                    font-weight: 300; letter-spacing: -1px; line-height: 1.05;
                    color: var(--white);
                    position: relative; z-index: 1;
                    margin-bottom: 24px;
                }

                .pt-hero-title em { font-style: italic; color: var(--gold); }

                .hero-subtitle {
                    font-size: 16px; font-weight: 300;
                    color: var(--stone);
                    max-width: 600px;
                    position: relative; z-index: 1;
                    margin-bottom: 60px;
                }

                .hero-meta {
                    display: flex; gap: 40px;
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--stone);
                    position: relative; z-index: 1;
                }

                .hero-meta span { display: flex; flex-direction: column; gap: 6px; }
                .hero-meta strong { color: var(--cream); font-weight: 500; }

                @media (max-width: 600px) {
                    .hero-meta { flex-wrap: wrap; justify-content: center; gap: 20px 32px; }
                }

                /* ---- STRUCTURE ---- */
                .divider {
                    width: 1px; height: 80px;
                    background: linear-gradient(180deg, transparent, var(--steel), transparent);
                    margin: 0 auto;
                }

                .proposal-section {
                    padding: 100px 24px;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .section-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 4px; text-transform: uppercase;
                    color: var(--gold); margin-bottom: 16px;
                }

                .section-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(32px, 5vw, 52px);
                    font-weight: 300; line-height: 1.15;
                    color: var(--white); margin-bottom: 20px;
                }

                .section-desc {
                    font-size: 15px; font-weight: 300;
                    color: var(--stone);
                    max-width: 600px; margin-bottom: 60px; line-height: 1.8;
                }

                /* ---- VISUAL GRID ---- */
                .visual-grid { display: grid; gap: 24px; }
                .visual-grid.two-col { grid-template-columns: 1fr 1fr; }
                .visual-grid.three-col { grid-template-columns: 1fr 1fr 1fr; }

                @media (max-width: 768px) {
                    .visual-grid.two-col, .visual-grid.three-col { grid-template-columns: 1fr; }
                }

                .visual-card {
                    position: relative; border-radius: 8px; overflow: hidden;
                    background: var(--midnight); transition: transform 0.4s ease;
                }
                .visual-card:hover { transform: scale(1.01); }

                .visual-card img {
                    width: 100%; height: 100%; object-fit: cover;
                    display: block; transition: transform 0.6s ease;
                }
                .visual-card:hover img { transform: scale(1.03); }

                .card-overlay {
                    position: absolute; bottom: 0; left: 0; right: 0;
                    padding: 40px 24px 24px;
                    background: linear-gradient(transparent, rgba(10, 14, 26, 0.95));
                }

                .card-label {
                    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
                    color: var(--gold); margin-bottom: 8px;
                }

                .pt-card-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px; font-weight: 400;
                    color: var(--white); margin-bottom: 6px;
                }

                .pt-card-desc { font-size: 12px; color: var(--stone); line-height: 1.6; }

                /* ---- GRADE ITEMS ---- */
                .grade-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 24px; margin-top: 40px;
                }
                @media (max-width: 768px) { .grade-grid { grid-template-columns: 1fr; } }

                .grade-item {
                    padding: 24px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 8px;
                    background: rgba(30, 41, 59, 0.4);
                }
                .grade-item h4 {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--gold); margin-bottom: 10px; font-weight: 500;
                }
                .grade-item p { font-size: 13px; color: var(--stone); line-height: 1.7; }

                /* ---- PALETTE ---- */
                .palette-strip {
                    display: flex; height: 120px;
                    border-radius: 8px; overflow: hidden; margin-bottom: 40px;
                }
                .palette-swatch {
                    flex: 1; display: flex; flex-direction: column;
                    justify-content: flex-end; padding: 12px;
                    transition: flex 0.4s ease; cursor: default;
                }
                .palette-swatch:hover { flex: 1.8; }
                .swatch-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.8; }
                .swatch-hex { font-size: 10px; font-family: 'Inter', monospace; opacity: 0.6; }

                /* ---- BRAND GRID ---- */
                .brand-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 40px; margin-top: 40px;
                }
                @media (max-width: 768px) { .brand-grid { grid-template-columns: 1fr; } }

                .brand-col h4 {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    margin-bottom: 16px; font-weight: 500;
                }
                .brand-col.do h4 { color: var(--gold); }
                .brand-col.avoid h4 { color: var(--steel); }
                .brand-col ul { list-style: none; }
                .brand-col ul li {
                    font-size: 13px; padding: 8px 0;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.08); line-height: 1.6;
                }
                .brand-col.do ul li { color: var(--cream); }
                .brand-col.avoid ul li { color: rgba(100, 116, 139, 0.6); }

                /* ---- FULL IMAGE ---- */
                .full-image-break {
                    width: 100%; max-height: 60vh;
                    object-fit: cover; margin: 0; display: block; opacity: 0.8;
                }

                /* ---- TIMELINE ---- */
                .schedule-block { margin-bottom: 48px; }
                .schedule-day {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 28px; color: var(--white); margin-bottom: 8px;
                }
                .schedule-meta { font-size: 12px; color: var(--steel); margin-bottom: 24px; }

                .timeline { position: relative; padding-left: 32px; }
                .timeline::before {
                    content: ''; position: absolute;
                    left: 6px; top: 0; bottom: 0;
                    width: 1px;
                    background: linear-gradient(180deg, var(--gold), var(--steel), transparent);
                }
                .timeline-item { position: relative; margin-bottom: 24px; padding-left: 16px; }
                .timeline-item::before {
                    content: ''; position: absolute;
                    left: -30px; top: 6px;
                    width: 9px; height: 9px; border-radius: 50%;
                    background: var(--gold); border: 2px solid var(--shadow);
                }
                .timeline-time {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--gold); margin-bottom: 4px;
                }
                .timeline-title {
                    font-size: 15px; color: var(--cream);
                    font-weight: 500; margin-bottom: 4px;
                }
                .timeline-desc { font-size: 12px; color: var(--steel); line-height: 1.6; }

                /* ---- EQUIPMENT ---- */
                .equip-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px; margin-top: 48px;
                }
                .equip-card {
                    padding: 24px 20px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 10px;
                    background: rgba(30, 41, 59, 0.3);
                    transition: border-color 0.3s ease;
                }
                .equip-card:hover { border-color: rgba(212, 168, 67, 0.3); }
                .equip-card .card-icon {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    font-weight: 500; margin-bottom: 10px;
                }
                .equip-card h3 {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 20px; font-weight: 400;
                    color: var(--white); margin-bottom: 10px;
                }
                .equip-card p { font-size: 12px; color: var(--steel); line-height: 1.7; }
                .equip-card ul { list-style: none; margin-top: 10px; }
                .equip-card ul li {
                    font-size: 11px; color: var(--steel);
                    padding: 3px 0; padding-left: 16px;
                    position: relative; line-height: 1.5;
                }
                .equip-card ul li::before {
                    content: '\\2192'; position: absolute; left: 0;
                    color: var(--gold); font-size: 10px;
                }

                /* ---- INTERACTIVE QUOTE BUILDER ---- */
                .quote-builder {
                    display: grid; grid-template-columns: 1fr 380px;
                    gap: 48px; margin-top: 48px;
                }
                @media (max-width: 900px) {
                    .quote-builder { grid-template-columns: 1fr; }
                }

                .quote-options { display: flex; flex-direction: column; gap: 40px; }

                .option-group h3 {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 24px; font-weight: 400;
                    color: var(--white); margin-bottom: 6px;
                }
                .option-group .option-subtitle {
                    font-size: 12px; color: var(--steel);
                    margin-bottom: 16px;
                }

                .option-cards { display: flex; flex-direction: column; gap: 10px; }

                .option-card {
                    position: relative;
                    padding: 16px 20px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 10px;
                    background: rgba(30, 41, 59, 0.3);
                    cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .option-card:hover {
                    border-color: rgba(212, 168, 67, 0.25);
                    background: rgba(30, 41, 59, 0.5);
                }
                .option-card.selected {
                    border-color: var(--gold);
                    background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(212, 168, 67, 0.06));
                    box-shadow: 0 0 20px rgba(212, 168, 67, 0.08);
                }

                .option-card .option-left { display: flex; flex-direction: column; gap: 2px; }
                .option-card .option-name {
                    font-size: 14px; font-weight: 500; color: var(--cream);
                }
                .option-card .option-desc {
                    font-size: 11px; color: var(--steel);
                }
                .option-card .option-price {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px; color: var(--gold);
                    white-space: nowrap;
                }
                .option-card .option-included {
                    font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
                    color: var(--gold); font-weight: 600;
                }

                .popular-tag {
                    position: absolute; top: -8px; right: 16px;
                    background: var(--gold); color: var(--shadow);
                    font-size: 8px; font-weight: 700;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    padding: 3px 10px; border-radius: 10px;
                }

                /* Toggle switch */
                .toggle-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 16px 20px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 10px;
                    background: rgba(30, 41, 59, 0.3);
                    transition: all 0.25s ease;
                }
                .toggle-row.active {
                    border-color: var(--gold);
                    background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(212, 168, 67, 0.06));
                }
                .toggle-left { display: flex; flex-direction: column; gap: 2px; }
                .toggle-name { font-size: 14px; font-weight: 500; color: var(--cream); }
                .toggle-desc { font-size: 11px; color: var(--steel); }
                .toggle-right { display: flex; align-items: center; gap: 12px; }
                .toggle-price {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 18px; color: var(--gold);
                }

                .switch {
                    width: 44px; height: 24px;
                    background: var(--slate);
                    border-radius: 12px;
                    position: relative;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    border: none; outline: none;
                }
                .switch.on { background: var(--gold); }
                .switch::after {
                    content: '';
                    position: absolute;
                    top: 3px; left: 3px;
                    width: 18px; height: 18px;
                    background: var(--white);
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                }
                .switch.on::after { transform: translateX(20px); }

                /* Summary sidebar */
                .quote-summary {
                    position: sticky; top: 32px;
                    padding: 32px 28px;
                    border: 1px solid rgba(212, 168, 67, 0.2);
                    border-radius: 16px;
                    background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 41, 59, 0.6));
                    backdrop-filter: blur(20px);
                    height: fit-content;
                }

                .summary-header {
                    font-size: 9px; font-weight: 600;
                    letter-spacing: 3px; text-transform: uppercase;
                    color: var(--gold); margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.15);
                }

                .summary-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .summary-item {
                    display: flex; justify-content: space-between; align-items: center;
                    font-size: 13px;
                }
                .summary-item-name { color: var(--stone); }
                .summary-item-price { color: var(--cream); font-weight: 500; }
                .summary-item-price.free { color: var(--gold); font-size: 11px; font-weight: 600; letter-spacing: 1px; }

                .summary-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(212, 168, 67, 0.3), transparent);
                    margin: 8px 0;
                }

                .summary-total {
                    display: flex; justify-content: space-between; align-items: baseline;
                    margin-bottom: 28px;
                }
                .summary-total-label {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--stone); font-weight: 500;
                }
                .summary-total-price {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 42px; color: var(--gold); font-weight: 400;
                    line-height: 1;
                    text-shadow: 0 0 30px rgba(212, 168, 67, 0.2);
                }

                .summary-cta {
                    display: block; width: 100%;
                    padding: 16px 24px;
                    background: linear-gradient(135deg, var(--gold), #C49A2E);
                    color: var(--shadow);
                    font-family: 'Inter', sans-serif;
                    font-size: 12px; font-weight: 700;
                    letter-spacing: 2px; text-transform: uppercase;
                    border: none; border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    text-align: center;
                }
                .summary-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(212, 168, 67, 0.25);
                }

                .summary-note {
                    text-align: center;
                    font-size: 11px; color: var(--steel);
                    margin-top: 12px;
                }

                /* ---- FOOTER ---- */
                .proposal-footer {
                    text-align: center;
                    padding: 80px 24px 40px;
                    border-top: 1px solid rgba(100, 116, 139, 0.1);
                }
                .footer-logo {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px; font-weight: 600;
                    letter-spacing: 4px; text-transform: uppercase;
                    color: var(--steel); margin-bottom: 12px;
                }
                .footer-tagline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 18px; font-weight: 300; font-style: italic;
                    color: rgba(100, 116, 139, 0.6);
                }
                .footer-contact {
                    margin-top: 24px;
                    font-size: 12px; color: var(--steel); letter-spacing: 1px;
                }
                .footer-contact a {
                    color: var(--gold); text-decoration: none;
                    transition: opacity 0.2s ease;
                }
                .footer-contact a:hover { opacity: 0.8; }

                /* ---- ANIMATIONS ---- */
                .fade-in {
                    opacity: 0; transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .fade-in.visible { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* HERO */}
            <div className="proposal-hero">
                <div className="hero-badge">MediaGeekz × ReelEstate Orlando</div>
                <h1 className="pt-hero-title">Veronica &amp;<br /><em>Ellyn</em></h1>
                <p className="hero-subtitle">A cinematic real estate video production quote — tailored for your brand, your listings, and your digital presence across Orlando.</p>
                <div className="hero-meta">
                    <span><strong>Client</strong>Veronica &amp; Ellyn</span>
                    <span><strong>Market</strong>Orlando, FL</span>
                    <span><strong>Format</strong>16:9 + 9:16</span>
                    <span><strong>Date</strong>March 2026</span>
                </div>
            </div>

            <div className="divider"></div>

            {/* VISUAL DIRECTION */}
            <section className="proposal-section fade-in">
                <div className="section-label">Visual Direction</div>
                <h2 className="section-title">Your listings deserve<br />cinematic storytelling.</h2>
                <p className="section-desc">We don&apos;t shoot &ldquo;walkthrough videos.&rdquo; We create cinematic brand content that positions you as the go-to luxury agents in Orlando. Every frame is intentional — from morning light through floor-to-ceiling windows to the golden hour drone reveal.</p>

                <div className="visual-grid two-col">
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/luxury_interior.png`} alt="Luxury home interior" />
                        <div className="card-overlay">
                            <div className="card-label">Interior — Hero Coverage</div>
                            <div className="pt-card-title">The Lifestyle Shot</div>
                            <div className="pt-card-desc">Gimbal walkthroughs capturing natural light, textures, and spatial flow. The footage that makes buyers feel like they&apos;re already home.</div>
                        </div>
                    </div>
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/pool_exterior.png`} alt="Pool exterior at golden hour" />
                        <div className="card-overlay">
                            <div className="card-label">Exterior — Golden Hour</div>
                            <div className="pt-card-title">The Money Shot</div>
                            <div className="pt-card-desc">Pool, landscaping, and architecture at the magic hour. Warm, aspirational, and scroll-stopping.</div>
                        </div>
                    </div>
                </div>

                <div className="visual-grid two-col" style={{ marginTop: 24 }}>
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/drone_aerial.png`} alt="Drone aerial Orlando neighborhood" />
                        <div className="card-overlay">
                            <div className="card-label">Aerial — FAA Part 107</div>
                            <div className="pt-card-title">The Neighborhood Reveal</div>
                            <div className="pt-card-desc">Cinematic drone orbits and reveals showing the property in context — neighborhood, lakes, and Orlando skyline at sunset.</div>
                        </div>
                    </div>
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/realtor_lifestyle.png`} alt="Realtor lifestyle brand shot" />
                        <div className="card-overlay">
                            <div className="card-label">Brand — Agent Spotlight</div>
                            <div className="pt-card-title">The Personal Brand</div>
                            <div className="pt-card-desc">Confident, approachable, professional. Short branded clips that build trust before the first handshake.</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* DELIVERABLES */}
            <section className="proposal-section fade-in">
                <div className="section-label">Deliverables</div>
                <h2 className="section-title">Three formats. Maximum impact.</h2>
                <p className="section-desc">Each deliverable is optimized for a specific platform and purpose — but together they create a cohesive content system that works for months.</p>

                <div className="visual-grid three-col">
                    <div className="grade-item" style={{ borderColor: 'var(--gold)' }}>
                        <h4>Deliverable 1 — Listing Video</h4>
                        <p style={{ color: 'var(--cream)', fontSize: 15, marginBottom: 12 }}>2–3 min · Cinematic Walkthrough</p>
                        <p>Gimbal-stabilized interior walkthrough, exterior coverage, drone aerials, and lifestyle B-roll — set to music with branded lower thirds and motion graphics.</p>
                        <p style={{ marginTop: 12, color: 'var(--gold)', fontSize: 12 }}>Use: MLS, YouTube, Facebook, website embed</p>
                    </div>
                    <div className="grade-item">
                        <h4>Deliverable 2 — Agent Brand Film</h4>
                        <p style={{ color: 'var(--cream)', fontSize: 15, marginBottom: 12 }}>60–90 sec · Realtor Spotlight</p>
                        <p>Your personal brand story. Confident on-camera presence, lifestyle B-roll, and a soundtrack that matches your energy. The video that introduces you before you ever shake hands.</p>
                        <p style={{ marginTop: 12, color: 'var(--gold)', fontSize: 12 }}>Use: Instagram bio, LinkedIn, email signatures</p>
                    </div>
                    <div className="grade-item">
                        <h4>Deliverable 3 — Social Reels</h4>
                        <p style={{ color: 'var(--cream)', fontSize: 15, marginBottom: 12 }}>15–60 sec · 9:16 Vertical</p>
                        <p>Scroll-stopping vertical content. Quick property teasers, behind-the-scenes, and market update reels designed for Instagram, TikTok, and Facebook Stories.</p>
                        <p style={{ marginTop: 12, color: 'var(--gold)', fontSize: 12 }}>Use: Instagram Reels, TikTok, YouTube Shorts</p>
                    </div>
                </div>
            </section>

            <img className="full-image-break" src={`${IMG}/pool_exterior.png`} alt="Orlando luxury listing" />

            <div className="divider"></div>

            {/* CREATIVE DIRECTION */}
            <section className="proposal-section fade-in">
                <div className="section-label">Creative Direction</div>
                <h2 className="section-title">Cinematic, not corporate.<br />Aspirational, not generic.</h2>
                <p className="section-desc">Your content should feel like a luxury brand campaign — not a cell phone walkthrough with royalty-free music. We create the content that makes people stop scrolling.</p>

                <div className="brand-grid">
                    <div className="brand-col do">
                        <h4>✦ The ReelEstate Standard</h4>
                        <ul>
                            <li>Cinematic gimbal movement — smooth, deliberate, editorial</li>
                            <li>Natural light first — golden hour exteriors, window-lit interiors</li>
                            <li>Shallow depth of field — selective focus that draws the eye</li>
                            <li>Warm, rich color grading — luxury feel, never flat or cool</li>
                            <li>Curated music selection — matching energy to the home&apos;s personality</li>
                            <li>Agent confidence on camera — approachable authority, not scripted</li>
                        </ul>
                    </div>
                    <div className="brand-col avoid">
                        <h4>✕ What We Avoid</h4>
                        <ul>
                            <li>Wide-angle fisheye distortion from phone cameras</li>
                            <li>Generic stock music with no personality</li>
                            <li>Flat, overlit footage with no atmosphere</li>
                            <li>Rushed pacing that doesn&apos;t let the home breathe</li>
                            <li>Basic text overlays with default fonts</li>
                            <li>Cookie-cutter templates that every agent uses</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* COLOR SCIENCE */}
            <section className="proposal-section fade-in">
                <div className="section-label">Color Science</div>
                <h2 className="section-title">The Orlando Grade</h2>
                <p className="section-desc">Warm, inviting, and aspirational. A color palette that makes every property feel like the dream home it is — golden light, rich shadows, and protected skin tones.</p>

                <div className="palette-strip">
                    <div className="palette-swatch" style={{ background: '#0A0E1A' }}><span className="swatch-label" style={{ color: '#64748B' }}>Deep Shadow</span><span className="swatch-hex" style={{ color: '#64748B' }}>#0A0E1A</span></div>
                    <div className="palette-swatch" style={{ background: '#1E293B' }}><span className="swatch-label" style={{ color: '#94A3B8' }}>Midnight</span><span className="swatch-hex" style={{ color: '#94A3B8' }}>#1E293B</span></div>
                    <div className="palette-swatch" style={{ background: '#8B7355' }}><span className="swatch-label" style={{ color: '#F1F5F9' }}>Warm Oak</span><span className="swatch-hex" style={{ color: '#F1F5F9' }}>#8B7355</span></div>
                    <div className="palette-swatch" style={{ background: '#D4A843' }}><span className="swatch-label" style={{ color: '#0A0E1A' }}>Orlando Gold</span><span className="swatch-hex" style={{ color: '#0A0E1A' }}>#D4A843</span></div>
                    <div className="palette-swatch" style={{ background: '#E8C170' }}><span className="swatch-label" style={{ color: '#1E293B' }}>Golden Hour</span><span className="swatch-hex" style={{ color: '#1E293B' }}>#E8C170</span></div>
                    <div className="palette-swatch" style={{ background: '#F8FAFC' }}><span className="swatch-label" style={{ color: '#1E293B' }}>Clean White</span><span className="swatch-hex" style={{ color: '#1E293B' }}>#F8FAFC</span></div>
                </div>

                <div className="grade-grid">
                    <div className="grade-item"><h4>Interiors</h4><p>Natural warmth preserved. Window light stays golden, hardwood floors glow. We enhance the existing beauty of each space without making it feel artificial.</p></div>
                    <div className="grade-item"><h4>Skin Tones</h4><p>Protected and natural. Warm, healthy complexion whether you&apos;re inside or out. Never orange, never washed out. Your clients see you, not a filter.</p></div>
                    <div className="grade-item"><h4>Exteriors</h4><p>Golden hour magic — palm trees, pools, and architecture bathed in warm Florida sunset light. Rich blues in the sky, deep greens in landscaping.</p></div>
                    <div className="grade-item"><h4>Drone Aerials</h4><p>Balanced exposure for sky and ground. Orlando&apos;s lakefront neighborhoods, rooftop details, and surrounding nature all visible and vibrant.</p></div>
                </div>
            </section>

            <div className="divider"></div>

            {/* PRODUCTION SCHEDULE */}
            <section className="proposal-section fade-in">
                <div className="section-label">Production Schedule</div>
                <h2 className="section-title">Structured for maximum coverage.</h2>
                <p className="section-desc">Every minute is pre-planned. We arrive ready to shoot and move with purpose — interiors for detail, exteriors for drama, drone for scale, lifestyle for brand.</p>

                <div className="schedule-block">
                    <div className="schedule-day">Shoot Day</div>
                    <div className="schedule-meta">On-Location Real Estate Video Session</div>
                    <div className="timeline">
                        <div className="timeline-item"><div className="timeline-time">Hour 1 — Arrive + Interiors</div><div className="timeline-title">Setup &amp; Interior Walkthrough</div><div className="timeline-desc">Scout rooms for best natural light angles. Gimbal walkthrough of main living areas, kitchen, master suite. Wide establishing shots + close-up detail inserts.</div></div>
                        <div className="timeline-item"><div className="timeline-time">Hour 2 — Interiors + Details</div><div className="timeline-title">Remaining Rooms &amp; Lifestyle B-Roll</div><div className="timeline-desc">Complete bedroom/bathroom coverage. Lifestyle vignettes — coffee on the island, opening French doors to the patio. The moments that sell the feeling.</div></div>
                        <div className="timeline-item"><div className="timeline-time">Hour 3 — Exteriors + Drone</div><div className="timeline-title">Backyard, Pool &amp; Aerial Coverage</div><div className="timeline-desc">Exterior walkthrough — pool area, landscaping, driveway approach. FAA Part 107 drone deployment — property orbit, neighborhood reveal, pull-up establishing shot.</div></div>
                        <div className="timeline-item"><div className="timeline-time">Hour 4 — Agent Brand Clips</div><div className="timeline-title">On-Camera Content</div><div className="timeline-desc">Personal brand footage — walking up to the front door, pointing out features, conversational moments. Confident, natural, social-ready vertical clips included.</div></div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* EQUIPMENT */}
            <section className="proposal-section fade-in">
                <div className="section-label">Production Kit</div>
                <h2 className="section-title">Cinema-grade gear.<br />Every session.</h2>
                <p className="section-desc">Professional equipment deployed for maximum visual impact — the same gear used on luxury brand campaigns and commercial shoots.</p>

                <div className="equip-grid">
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: 'var(--gold)' }}>✦ Camera A — Hero</div>
                        <h3>Sony FX6</h3>
                        <p>Full-frame cinema body for interiors and agent content. S-Log3 for maximum color grading latitude.</p>
                        <ul><li>24-70mm f/2.8 GM</li><li>85mm f/1.4 GM (portraits)</li><li>4K 120fps slow-mo capable</li><li>XAVC-I 4:2:2 10-bit</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#7BE87B' }}>✦ Camera B — Gimbal</div>
                        <h3>Sony A7S III</h3>
                        <p>Gimbal-mounted for smooth walkthrough coverage and dynamic B-roll.</p>
                        <ul><li>Sigma 24-70mm f/2.8 Art</li><li>DJI RS3 Pro stabilizer</li><li>Best-in-class low-light</li><li>S-Log3 matched to A-cam</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#60A5FA' }}>✦ Aerial</div>
                        <h3>DJI Mavic 3 Pro</h3>
                        <p>Triple-lens drone for property aerials. FAA Part 107 certified pilot.</p>
                        <ul><li>Hasselblad 24mm wide</li><li>70mm telephoto compression</li><li>D-Log M color science</li><li>43-min flight time</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                        <h3>Wireless Lav System</h3>
                        <p>Crystal-clear audio capture for any on-camera moments or voiceover.</p>
                        <ul><li>Sennheiser EW-D wireless</li><li>Dual-channel receiver</li><li>Backup recorder</li><li>Wind protection muffs</li></ul>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* INTERACTIVE QUOTE BUILDER */}
            <section className="proposal-section fade-in" id="quote">
                <div className="section-label">Your Quote</div>
                <h2 className="section-title">Build your package.</h2>
                <p className="section-desc">Select the session length, editing style, and social media options that fit your goals. Everything updates in real time.</p>

                <div className="quote-builder">
                    <div className="quote-options">
                        {/* Session Hours */}
                        <div className="option-group">
                            <h3>Session Length</h3>
                            <div className="option-subtitle">How much production time do you need?</div>
                            <div className="option-cards">
                                {HOUR_OPTIONS.map((opt, i) => (
                                    <div key={opt.value} className={`option-card${selectedHours === i ? ' selected' : ''}`} onClick={() => setSelectedHours(i)}>
                                        {opt.popular && <div className="popular-tag">Popular</div>}
                                        <div className="option-left">
                                            <div className="option-name">{opt.label}</div>
                                            <div className="option-desc">{opt.desc}</div>
                                        </div>
                                        <div className="option-price">${opt.price.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Editing Package */}
                        <div className="option-group">
                            <h3>Editing Package</h3>
                            <div className="option-subtitle">How polished should the final product be?</div>
                            <div className="option-cards">
                                {EDITING_OPTIONS.map((opt, i) => (
                                    <div key={opt.value} className={`option-card${selectedEditing === i ? ' selected' : ''}`} onClick={() => setSelectedEditing(i)}>
                                        <div className="option-left">
                                            <div className="option-name">{opt.label}</div>
                                            <div className="option-desc">{opt.desc}</div>
                                        </div>
                                        {opt.included ? <div className="option-included">Included</div> : <div className="option-price">+${opt.price}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Reels */}
                        <div className="option-group">
                            <h3>Social Media Reels</h3>
                            <div className="option-subtitle">Vertical content for Instagram, TikTok, &amp; Shorts</div>
                            <div className="option-cards">
                                {REELS_OPTIONS.map((opt, i) => (
                                    <div key={opt.value} className={`option-card${selectedReels === i ? ' selected' : ''}`} onClick={() => setSelectedReels(i)}>
                                        {opt.popular && <div className="popular-tag">Best Value</div>}
                                        <div className="option-left">
                                            <div className="option-name">{opt.label}</div>
                                            {opt.desc && <div className="option-desc">{opt.desc}</div>}
                                        </div>
                                        {opt.price === 0 ? <div className="option-desc">—</div> : <div className="option-price">+${opt.price}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="option-group">
                            <h3>Add-Ons</h3>
                            <div className="option-subtitle">Extra services to maximize your investment</div>
                            <div className="option-cards">
                                <div className={`toggle-row${droneAddon ? ' active' : ''}`}>
                                    <div className="toggle-left">
                                        <div className="toggle-name">Drone Aerial Coverage</div>
                                        <div className="toggle-desc">FAA Part 107 certified · Property orbits, reveals, neighborhood context</div>
                                    </div>
                                    <div className="toggle-right">
                                        {HOUR_OPTIONS[selectedHours].value !== 2 ? <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Included</span> : <div className="toggle-price">+$100</div>}
                                        <button className={`switch${droneAddon ? ' on' : ''}`} onClick={() => setDroneAddon(!droneAddon)} aria-label="Toggle drone"></button>
                                    </div>
                                </div>
                                <div className={`toggle-row${socialMgmt ? ' active' : ''}`}>
                                    <div className="toggle-left">
                                        <div className="toggle-name">Monthly Social Management</div>
                                        <div className="toggle-desc">Posting, scheduling, captions, hashtag strategy for IG &amp; TikTok</div>
                                    </div>
                                    <div className="toggle-right">
                                        <div className="toggle-price">+$500<span style={{ fontSize: 12, color: 'var(--steel)' }}>/mo</span></div>
                                        <button className={`switch${socialMgmt ? ' on' : ''}`} onClick={() => setSocialMgmt(!socialMgmt)} aria-label="Toggle social management"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STICKY SUMMARY */}
                    <div className="quote-summary">
                        <div className="summary-header">Your Quote Summary</div>
                        <div className="summary-items">
                            {lineItems.map((item, i) => (
                                <div key={i} className="summary-item">
                                    <span className="summary-item-name">{item.name}</span>
                                    <span className={`summary-item-price${item.price === 0 ? ' free' : ''}`}>
                                        {item.price === 0 ? 'FREE' : `$${item.price.toLocaleString()}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-total">
                            <span className="summary-total-label">Total</span>
                            <span className="summary-total-price">${total.toLocaleString()}</span>
                        </div>
                        <a href="sms:3216665228&body=Hey Daniel! I'm interested in booking a video session. Here's my quote: $" className="summary-cta">
                            Let&apos;s Book It →
                        </a>
                        <div className="summary-note">Reply to this proposal or text Daniel directly</div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* NEXT STEPS */}
            <section className="proposal-section fade-in">
                <div className="section-label">Next Steps</div>
                <h2 className="section-title">Let&apos;s lock in your date.</h2>
                <p className="section-desc" style={{ marginBottom: 40 }}>Once you&apos;re ready, here&apos;s how we move forward — simple, fast, no friction.</p>

                <div className="grade-grid">
                    <div className="grade-item" style={{ borderColor: 'var(--gold)' }}>
                        <h4>Step 1 — Confirm</h4>
                        <p>Reply to this proposal or text Daniel directly. Let us know your preferred date and which listing you want to feature first.</p>
                    </div>
                    <div className="grade-item">
                        <h4>Step 2 — Prep</h4>
                        <p>We&apos;ll send a pre-shoot checklist — staging tips, wardrobe suggestions, and a shot plan tailored to the property.</p>
                    </div>
                    <div className="grade-item">
                        <h4>Step 3 — Shoot</h4>
                        <p>Show up, look great, and let us handle the rest. Focused, professional production with zero stress.</p>
                    </div>
                    <div className="grade-item">
                        <h4>Step 4 — Deliver</h4>
                        <p>Final edited video delivered within 5–7 business days. Two rounds of revisions included to make sure it&apos;s exactly what you need.</p>
                    </div>
                </div>
            </section>

            <footer className="proposal-footer">
                <div className="footer-logo">MediaGeekz × ReelEstate Orlando</div>
                <div className="footer-tagline">Cinematic stories. Elevated brands.</div>
                <div className="footer-contact">
                    <a href="tel:3216665228">(321) 666-5228</a> · <a href="mailto:reelestateorlando@gmail.com">reelestateorlando@gmail.com</a>
                </div>
            </footer>
        </>
    );
}
