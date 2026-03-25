'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Pricing Data — Dental Practice Video Production (DEMO TEMPLATE)
   ═══════════════════════════════════════════════════════════════ */
const PACKAGES = [
    {
        id: 'essentials',
        name: 'Essentials',
        tagline: 'Solo shooter',
        base: 2800,
        crew: [
            { label: 'Lead Cinematographer / DP', detail: 'Full day (8 AM–5:30 PM)', amount: 1400 },
        ],
        post: [
            { label: 'Organized Raw Footage Delivery', detail: 'Scene-separated, labeled by location', amount: 0, free: true },
            { label: 'Basic Color Correction', detail: 'White-balance pass on all footage', amount: 400 },
            { label: 'Audio Sync & Cleanup', detail: 'Lav synced to camera, noise reduction', amount: 300 },
        ],
        gear: [
            { label: 'Sony FX3 (single camera)', detail: 'Full-frame cinema — 4K S-Log3', amount: 0, free: true },
            { label: '1× Wireless Lav Mic', detail: 'Sennheiser EW-D', amount: 0, free: true },
            { label: 'LED Interview Light Kit', detail: 'Portable panel + diffusion', amount: 0, free: true },
        ],
        included: [
            'Full-day shoot (8 AM – 5:30 PM)',
            'Solo cinematographer',
            'Single camera coverage (Sony FX3)',
            '1 wireless lav mic',
            'Portable LED lighting',
            'All locations covered (office + exterior)',
            'B-roll coverage (facility walkthrough, signage, equipment)',
            'Basic color correction + audio sync',
            'Organized raw footage delivery',
            '1 revision round on color/audio',
        ],
        excluded: [
            '2nd camera angle',
            'Dedicated audio technician',
            'Drone footage',
        ],
    },
    {
        id: 'professional',
        name: 'Professional',
        tagline: 'Full two-person crew',
        recommended: true,
        base: 3800,
        crew: [
            { label: 'Lead Cinematographer / DP', detail: 'Full day (8 AM–5:30 PM)', amount: 1400 },
            { label: 'Camera Operator B', detail: 'Full day — 2nd angle + B-roll', amount: 750 },
        ],
        post: [
            { label: 'Organized Raw Footage Delivery', detail: 'Scene-separated, labeled, dual-cam synced', amount: 0, free: true },
            { label: 'Color Correction (all footage)', detail: 'Full pass — matched A/B cams', amount: 550 },
            { label: 'Audio Sync & Cleanup', detail: 'Dual lavs synced, room tone, noise reduction', amount: 400 },
        ],
        gear: [
            { label: 'Sony FX3 + A7S III (dual camera)', detail: 'Matched color science — 4K S-Log3', amount: 0, free: true },
            { label: '2× Wireless Lav Mics', detail: 'Sennheiser EW-D — one per speaker', amount: 0, free: true },
            { label: 'LED Interview Light Kit', detail: 'Key + fill + hair light', amount: 0, free: true },
        ],
        included: [
            'Full-day shoot (8 AM – 5:30 PM)',
            '2-person crew (DP + Camera Operator)',
            'Dual camera coverage (A-cam hero + B-cam wide/reactions)',
            '2 wireless lav mics (one per speaker)',
            'Professional 3-point lighting',
            'All locations covered (office + patient areas)',
            'Full B-roll package (facility, equipment, treatment close-ups)',
            'Color correction + audio sync on all footage',
            'Organized, dual-cam synced raw delivery',
            '2 revision rounds on color/audio',
        ],
        excluded: [
            'Drone footage',
            'Dedicated audio technician',
        ],
    },
    {
        id: 'premier',
        name: 'Premier',
        tagline: 'Full cinematic production',
        base: 5200,
        crew: [
            { label: 'Lead Cinematographer / DP', detail: 'Full day (8 AM–5:30 PM)', amount: 1400 },
            { label: 'Camera Operator B', detail: 'Full day — 2nd angle + B-roll', amount: 750 },
            { label: 'Audio Technician', detail: 'Dedicated boom + lav management', amount: 500 },
        ],
        post: [
            { label: 'Organized Raw Footage Delivery', detail: 'Scene-separated, labeled, synced + proxies', amount: 0, free: true },
            { label: 'Color Grade (all footage)', detail: 'Cinematic grading — matched to brand look', amount: 700 },
            { label: 'Audio Mix & Cleanup', detail: 'Broadcast-level lav + boom mix, noise reduction', amount: 500 },
        ],
        gear: [
            { label: 'Sony FX3 + A7S III (dual camera)', detail: 'Matched color science — 4K S-Log3', amount: 0, free: true },
            { label: '2× Wireless Lavs + Boom Mic', detail: 'Sennheiser EW-D + NTG5 boom', amount: 0, free: true },
            { label: 'Full Lighting Kit', detail: 'Key + fill + hair light + portable panels', amount: 0, free: true },
            { label: 'Drone (DJI Mini 4 Pro)', detail: 'Aerial establishing shots of facility', amount: 0, free: true },
        ],
        included: [
            'Full-day shoot (8 AM – 5:30 PM)',
            '3-person crew (DP + Camera Op + Audio Tech)',
            'Dual camera coverage + cinematic drone aerials',
            '2 wireless lavs + dedicated boom mic',
            'Full professional lighting (all locations)',
            'All locations + pre-shoot location scout',
            'Cinematic B-roll (facility flyover, equipment macro, patient smiles)',
            'Cinematic color grade matched to existing brand look',
            'Broadcast-level audio mix',
            'Organized raw delivery + proxy files for editor',
            '3 revision rounds',
        ],
        excluded: [],
        bonuses: [
            { label: 'Drone Aerials', detail: 'Establishing shots of facility — included' },
            { label: 'Dedicated Audio Tech', detail: 'On-site boom + lav management — included' },
            { label: 'Location Pre-Scout', detail: 'Advance visit to plan shots — included' },
        ],
    },
];

const ADDONS = [
    { id: 'rough-cut', label: 'Rough Assembly Edit', detail: 'Timeline-ordered rough cut for your editor to start from', price: 800 },
    { id: 'highlight', label: 'Highlight Reel (2-min)', detail: 'Short promotional cut — ready for social or ads', price: 1200 },
    { id: 'color-grade', label: 'Color Grading (Full)', detail: 'Cinematic color grade on all footage — matched to your brand', price: 600 },
    { id: 'bts', label: 'Behind-the-Scenes Photography', detail: '15–20 edited stills from shoot day', price: 400 },
    { id: 'same-day', label: 'Same-Day Social Teaser', detail: '30–60 sec teaser clip delivered same evening', price: 300 },
    { id: 'drone', label: 'Drone Footage', detail: 'Aerial establishing shots of locations (if not in package)', price: 500 },
];

/* ═══════════════════════════════════════════════════════════════ */

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function DentalDemoProposal() {
    const [addons, setAddons] = useState({});
    const [expandedPkg, setExpandedPkg] = useState('professional');

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

    const toggleAddon = (id) => {
        setAddons(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.price : 0), 0);

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

                /* ── Template Banner ── */
                .template-banner {
                    position: sticky; top: 0; z-index: 100;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                    padding: 10px 24px;
                    background: linear-gradient(135deg, rgba(232, 98, 44, 0.15), rgba(45, 212, 191, 0.1));
                    backdrop-filter: blur(20px); border-bottom: 1px solid rgba(232, 98, 44, 0.25);
                    font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
                    color: var(--orange);
                }

                .template-banner .tier-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 3px 10px; border-radius: 999px;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: #060a14; font-size: 9px; font-weight: 800;
                    letter-spacing: 0.2em;
                }

                /* ── Hero ── */
                .ed-hero {
                    min-height: 80vh;
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: center;
                    text-align: center; padding: 80px 24px 60px;
                    position: relative;
                    background:
                        radial-gradient(ellipse at 50% 20%, rgba(232, 98, 44, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 60%, rgba(45, 212, 191, 0.04) 0%, transparent 40%);
                }

                .ed-hero::after {
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
                    max-width: 620px; color: var(--muted);
                    font-size: 17px; line-height: 1.7;
                    position: relative; z-index: 1; margin-bottom: 48px;
                }

                .hero-meta {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
                    width: min(100%, 860px); position: relative; z-index: 1;
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
                .ed-section {
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

                /* ── Scope / Understanding ── */
                .scope-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px; margin-top: 40px;
                }

                .scope-card {
                    padding: 28px 24px; border: 1px solid rgba(45, 212, 191, 0.12);
                    border-radius: 16px; background: var(--panel);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .scope-card:hover { border-color: rgba(45, 212, 191, 0.3); transform: translateY(-2px); }

                .scope-icon { font-size: 28px; margin-bottom: 14px; }

                .scope-card h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 20px; font-weight: 600; color: var(--white); margin-bottom: 8px;
                }

                .scope-card p { font-size: 13px; color: var(--muted-2); line-height: 1.7; }

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

                .timeline-location {
                    display: inline-flex; align-items: center; gap: 6px;
                    margin-top: 6px; padding: 4px 10px;
                    background: rgba(232, 98, 44, 0.08); border: 1px solid rgba(232, 98, 44, 0.15);
                    border-radius: 999px; font-size: 10px; color: var(--orange);
                    font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
                }

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

                /* ── Packages ── */
                .packages-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 20px; margin-top: 48px;
                }

                @media (max-width: 1060px) { .packages-grid { grid-template-columns: 1fr; } }

                .pkg-card {
                    padding: 32px 24px; border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 20px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent), var(--panel);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                    position: relative; cursor: pointer;
                }

                .pkg-card:hover { border-color: rgba(232, 98, 44, 0.3); transform: translateY(-4px); }

                .pkg-card.recommended {
                    border-color: var(--orange);
                    background:
                        radial-gradient(circle at top right, rgba(232, 98, 44, 0.1), transparent 50%),
                        linear-gradient(180deg, rgba(255,255,255,0.03), transparent),
                        rgba(15, 23, 42, 0.94);
                    box-shadow: 0 0 40px rgba(232, 98, 44, 0.08);
                }

                .pkg-badge {
                    position: absolute; top: -12px; left: 24px;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--shadow); font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; padding: 4px 14px; border-radius: 999px;
                }

                .pkg-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 26px; font-weight: 700; color: var(--white); margin-bottom: 4px;
                }

                .pkg-tagline { color: var(--muted-2); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }

                .pkg-price-row {
                    display: flex; align-items: baseline; gap: 8px;
                    padding-bottom: 20px; margin-bottom: 20px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.15);
                }

                .pkg-amount {
                    font-family: 'Outfit', sans-serif;
                    font-size: 36px; font-weight: 700; color: var(--orange);
                    transition: all 0.3s ease;
                }

                .pkg-note { color: var(--muted-2); font-size: 11px; }

                .pkg-features { list-style: none; }
                .pkg-features li {
                    font-size: 12px; color: var(--muted); padding: 6px 0 6px 22px;
                    position: relative; line-height: 1.5;
                }

                .pkg-features li::before {
                    content: '✓'; position: absolute; left: 0; color: var(--teal); font-size: 12px;
                }

                .pkg-features li.excluded { opacity: 0.3; }
                .pkg-features li.excluded::before { content: '—'; color: var(--muted-3); }

                .pkg-features li.bonus { color: var(--orange); font-weight: 500; }
                .pkg-features li.bonus::before { content: '★'; color: var(--orange); }

                /* ── Cost Breakdown ── */
                .cost-toggle {
                    display: flex; align-items: center; gap: 8px;
                    margin-top: 20px; padding: 10px 0;
                    border: none; background: none; cursor: pointer;
                    color: var(--teal); font-size: 11px; font-weight: 600;
                    letter-spacing: 0.18em; text-transform: uppercase;
                    transition: color 0.2s ease;
                }

                .cost-toggle:hover { color: var(--white); }
                .cost-toggle-arrow { display: inline-block; transition: transform 0.3s ease; font-size: 10px; }
                .cost-toggle-arrow.open { transform: rotate(90deg); }

                .cost-breakdown {
                    overflow: hidden; max-height: 0; opacity: 0;
                    transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
                    margin-top: 0;
                }

                .cost-breakdown.open { max-height: 800px; opacity: 1; margin-top: 16px; }

                .cost-section { margin-bottom: 18px; }

                .cost-section-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-3);
                    margin-bottom: 10px; padding-bottom: 6px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.1);
                }

                .cost-row {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    padding: 6px 0; font-size: 12px;
                }

                .cost-item { color: var(--cream); flex: 1; }
                .cost-detail { display: block; font-size: 10px; color: var(--muted-3); margin-top: 2px; }
                .cost-amount { color: var(--muted); font-weight: 500; white-space: nowrap; margin-left: 16px; font-size: 12px; }
                .cost-amount.free { color: var(--teal); font-weight: 600; }

                .cost-row.total { border-top: 1px solid rgba(232, 98, 44, 0.25); padding-top: 12px; margin-top: 8px; }
                .cost-row.total .cost-item { color: var(--white); font-weight: 600; }
                .cost-row.total .cost-amount { color: var(--orange); font-weight: 700; font-size: 14px; }

                /* ── Add-Ons ── */
                .addons-section { margin-top: 48px; }

                .addon-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 18px 20px; margin-bottom: 12px;
                    border: 1px solid rgba(100, 116, 139, 0.15); border-radius: 14px;
                    background: var(--panel); cursor: pointer;
                    transition: border-color 0.25s ease, background 0.25s ease;
                }

                .addon-row:hover { border-color: rgba(232, 98, 44, 0.3); }
                .addon-row.active { border-color: var(--orange); background: rgba(232, 98, 44, 0.06); }

                .addon-left { display: flex; align-items: center; gap: 14px; }

                .addon-switch {
                    width: 40px; height: 22px; border-radius: 999px;
                    background: rgba(100, 116, 139, 0.3); position: relative;
                    transition: background 0.3s ease; flex-shrink: 0;
                }

                .addon-switch.on { background: var(--orange); }

                .addon-knob {
                    position: absolute; top: 2px; left: 2px;
                    width: 18px; height: 18px; border-radius: 50%;
                    background: var(--white); transition: left 0.3s ease;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
                }

                .addon-switch.on .addon-knob { left: 20px; }

                .addon-name { color: var(--cream); font-size: 14px; font-weight: 500; }
                .addon-detail { color: var(--muted-2); font-size: 11px; margin-top: 2px; }
                .addon-price { color: var(--orange); font-size: 15px; font-weight: 700; white-space: nowrap; }

                /* ── Next Steps ── */
                .next-steps {
                    margin-top: 60px; padding: 32px 28px; border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 20px; background: var(--panel);
                }

                .next-steps-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 24px; font-weight: 700; color: var(--white); margin-bottom: 20px;
                }

                .next-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                @media (max-width: 640px) { .next-steps-grid { grid-template-columns: 1fr; } }

                .next-step strong {
                    display: block; font-size: 12px; color: var(--orange);
                    letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px;
                }

                .next-step span { font-size: 13px; color: var(--muted); line-height: 1.6; }

                /* ── Delivery Note ── */
                .delivery-note {
                    margin-top: 40px; padding: 24px 28px;
                    border: 1px solid rgba(45, 212, 191, 0.2); border-radius: 16px;
                    background: rgba(45, 212, 191, 0.04);
                }

                .delivery-note-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 600; color: var(--teal); margin-bottom: 10px;
                    display: flex; align-items: center; gap: 8px;
                }

                .delivery-note p { font-size: 13px; color: var(--muted); line-height: 1.7; }

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
                .ed-footer {
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
            `}</style>



            <div className="page-shell">
                {/* ── TEMPLATE BANNER ── */}
                <div className="template-banner">
                    <span className="tier-badge">STUDIO TIER</span>
                    <span>Template Demo — Custom White-Label Proposal with Payment Integration</span>
                </div>

                {/* ── HERO ── */}
                <div className="ed-hero">
                    <div className="hero-badge">ProducerOS × Dental Practice</div>
                    <h1 className="hero-title">
                        Capture.<br /><em>Transform.</em><br />Deliver.
                    </h1>
                    <p className="hero-subtitle">
                        Cinematic video production for dental and healthcare practices — from facility tours and provider introductions to patient testimonials and treatment demonstrations.
                    </p>

                    <div className="hero-meta">
                        <div className="hero-stat">
                            <div className="hero-stat-label">Client</div>
                            <div className="hero-stat-value">Sample Dental</div>
                            <div className="hero-stat-detail">Bright Smile Dentistry</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Shoot Date</div>
                            <div className="hero-stat-value">TBD</div>
                            <div className="hero-stat-detail">Full-day shoot — start ~8:00 AM</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Format</div>
                            <div className="hero-stat-value">Office + Exterior</div>
                            <div className="hero-stat-detail">Facility tour → treatment rooms → aerials</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-label">Deliverable</div>
                            <div className="hero-stat-value">Full Package</div>
                            <div className="hero-stat-detail">Raw + edited highlight reel</div>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                {/* ── PROJECT UNDERSTANDING ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Project Understanding</div>
                        <h2 className="section-title">What we&apos;re capturing</h2>
                        <p className="section-desc">
                            A complete video production package designed for dental and healthcare marketing — cinematic facility tours, provider bios, patient testimonials, and social-ready content.
                        </p>
                    </div>

                    <div className="scope-grid">
                        <div className="scope-card">
                            <div className="scope-icon">🏥</div>
                            <h3>Facility Tour</h3>
                            <p>A cinematic walkthrough of the practice — lobby, treatment rooms, sterilization area, and waiting areas filmed with stabilized gimbal moves and natural lighting.</p>
                        </div>
                        <div className="scope-card">
                            <div className="scope-icon">👨‍⚕️</div>
                            <h3>Provider Introductions</h3>
                            <p>Short interview-style clips with each provider — their background, specialization, and why patients trust them. Professional lighting and wireless audio for broadcast quality.</p>
                        </div>
                        <div className="scope-card">
                            <div className="scope-icon">😁</div>
                            <h3>Patient Testimonials</h3>
                            <p>Real patients sharing their experience — before and after moments, comfort level, and results. Authentic reactions captured with dual-cam coverage.</p>
                        </div>
                        <div className="scope-card">
                            <div className="scope-icon">🎬</div>
                            <h3>B-Roll + Drone</h3>
                            <p>Equipment close-ups, exterior establishing shots, team candids, and aerial footage of the facility. All the supplementary footage needed for a polished final cut.</p>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── PRODUCTION SCHEDULE ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Schedule</div>
                        <div className="section-question">Date TBD</div>
                        <h2 className="section-title">Full-day shoot. One facility.</h2>
                        <p className="section-desc">
                            Arrive early, capture everything your marketing team needs, and wrap by end of day with organized footage ready for delivery.
                        </p>
                    </div>

                    <div className="timeline">
                        <div className="timeline-block">
                            <div className="timeline-time">8:00 AM</div>
                            <div className="timeline-label">Arrive + Setup</div>
                            <div className="timeline-desc">Scout venue lighting, set up interview station, test wireless audio systems. Quick detail shots of signage, lobby, and reception area.</div>
                            <div className="timeline-location">📍 Front Office</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">8:45 AM</div>
                            <div className="timeline-label">Facility Walkthrough</div>
                            <div className="timeline-desc">Gimbal-stabilized tour through all patient-facing areas. Treatment rooms, sterilization area, technology close-ups, waiting room atmosphere.</div>
                            <div className="timeline-location">📍 All Areas</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">10:00 – 11:30 AM</div>
                            <div className="timeline-label">Provider Interviews</div>
                            <div className="timeline-desc">Interview each provider individually — 5–8 minutes each. Professional 3-point lighting, dual wireless lavs, and a locked B-cam for cutaway angles.</div>
                            <div className="timeline-location">📍 Interview Station</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">11:30 AM – 1:00 PM</div>
                            <div className="timeline-label">Patient Testimonials</div>
                            <div className="timeline-desc">Schedule 2–3 willing patients for short testimonial clips. Capture before/after moments, genuine reactions, and comfort-level sound bites.</div>
                            <div className="timeline-location">📍 Treatment Room</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">1:00 – 2:00 PM</div>
                            <div className="timeline-label">Drone + Exteriors</div>
                            <div className="timeline-desc">Aerial establishing shots of the facility and surrounding area. Exterior signage, parking, and building approach shots. Team group photo on front steps.</div>
                            <div className="timeline-location">📍 Exterior + Aerial</div>
                        </div>
                        <div className="timeline-block">
                            <div className="timeline-time">~2:30 PM</div>
                            <div className="timeline-label">Pickup Shots + Wrap</div>
                            <div className="timeline-desc">Remaining B-roll, equipment macro close-ups, and any retakes. Verify all media is backed up on dual cards. Pack gear and debrief with office manager.</div>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── EQUIPMENT ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Production Kit</div>
                        <h2 className="section-title">The gear behind the look</h2>
                        <p className="section-desc">
                            Professional cinema equipment optimized for healthcare environments — quiet operation, fast setup, and lighting designed for clinical spaces.
                        </p>
                    </div>

                    <div className="equip-grid">
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--orange)' }}>✦ Camera A — Hero</div>
                            <h3>Sony FX3</h3>
                            <p>Full-frame cinema body. Primary camera for interviews and treatment close-ups.</p>
                            <ul><li>85mm f/1.4 GM (interviews)</li><li>24-70mm f/2.8 GM (facility tour)</li><li>S-Log3 / S-Gamut3.Cine</li><li>4K 24fps — XAVC-S 4:2:2 10-bit</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: 'var(--teal)' }}>✦ Camera B — Wide / B-Roll</div>
                            <h3>Sony A7S III</h3>
                            <p>B-cam for wide angles, reactions, and gimbal-stabilized facility tours.</p>
                            <ul><li>24-70mm f/2.8 GM</li><li>Matched color science to A-cam</li><li>Low-light champion for interiors</li><li>S-Log3 synced profiles</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                            <h3>Wireless Lav System</h3>
                            <p>Clean dialogue capture — crystal-clear provider interviews and patient testimonials.</p>
                            <ul><li>Sennheiser EW-D wireless lavs ×2</li><li>Rode NTG5 boom (Premier tier)</li><li>Zoom F6 32-bit float recorder</li><li>Backup on-camera audio</li></ul>
                        </div>
                        <div className="equip-card">
                            <div className="equip-icon" style={{ color: '#FBBF24' }}>✦ Lighting</div>
                            <h3>Professional Interview Kit</h3>
                            <p>Precision lighting for clinical environments — flattering and natural-looking.</p>
                            <ul><li>300W LED + collapsible softbox</li><li>Aputure MC RGB fills ×2</li><li>Portable bi-color panels</li><li>5-in-1 reflector / neg fill</li></ul>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── PACKAGES ── */}
                <section className="ed-section reveal">
                    <div className="section-header">
                        <div className="section-label">Investment</div>
                        <h2 className="section-title">Transparent pricing. No surprises.</h2>
                        <p className="section-desc">
                            Every package includes professional cinema equipment, organized delivery, and the crew size you need. Click any package to see the full cost breakdown.
                        </p>
                    </div>

                    <div className="packages-grid">
                        {PACKAGES.map(pkg => (
                            <div
                                key={pkg.id}
                                className={`pkg-card ${pkg.recommended ? 'recommended' : ''}`}
                                onClick={() => setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id)}
                            >
                                {pkg.recommended && <div className="pkg-badge">Recommended</div>}
                                <div className="pkg-name">{pkg.name}</div>
                                <div className="pkg-tagline">{pkg.tagline}</div>

                                <div className="pkg-price-row">
                                    <div className="pkg-amount">{fmt(pkg.base + addonTotal)}</div>
                                    <div className="pkg-note">base + add-ons</div>
                                </div>

                                <ul className="pkg-features">
                                    {pkg.included.map((f, i) => <li key={i}>{f}</li>)}
                                    {pkg.excluded.map((f, i) => <li key={'ex'+i} className="excluded">{f}</li>)}
                                    {pkg.bonuses?.map((b, i) => <li key={'bn'+i} className="bonus">{b.label} — {b.detail}</li>)}
                                </ul>

                                <button className="cost-toggle" onClick={(e) => { e.stopPropagation(); setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id); }}>
                                    <span className={`cost-toggle-arrow ${expandedPkg === pkg.id ? 'open' : ''}`}>▶</span>
                                    See cost breakdown
                                </button>

                                <div className={`cost-breakdown ${expandedPkg === pkg.id ? 'open' : ''}`}>
                                    <div className="cost-section">
                                        <div className="cost-section-label">Crew</div>
                                        {pkg.crew.map((c, i) => (
                                            <div key={i} className="cost-row">
                                                <div className="cost-item">{c.label}<span className="cost-detail">{c.detail}</span></div>
                                                <div className="cost-amount">{fmt(c.amount)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cost-section">
                                        <div className="cost-section-label">Post-Production</div>
                                        {pkg.post.map((p, i) => (
                                            <div key={i} className="cost-row">
                                                <div className="cost-item">{p.label}<span className="cost-detail">{p.detail}</span></div>
                                                <div className={`cost-amount ${p.free ? 'free' : ''}`}>{p.free ? 'Included' : fmt(p.amount)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cost-section">
                                        <div className="cost-section-label">Equipment & Gear</div>
                                        {pkg.gear.map((g, i) => (
                                            <div key={i} className="cost-row">
                                                <div className="cost-item">{g.label}<span className="cost-detail">{g.detail}</span></div>
                                                <div className={`cost-amount ${g.free ? 'free' : ''}`}>{g.free ? 'Included' : fmt(g.amount)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cost-row total">
                                        <div className="cost-item">Package Total</div>
                                        <div className="cost-amount">{fmt(pkg.base + addonTotal)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Add-Ons ── */}
                    <div className="addons-section">
                        <div className="section-header" style={{ marginBottom: 24 }}>
                            <div className="section-label">Add-Ons</div>
                            <h3 className="section-title" style={{ fontSize: 32 }}>Enhance your package</h3>
                        </div>

                        {ADDONS.map(a => (
                            <div
                                key={a.id}
                                className={`addon-row ${addons[a.id] ? 'active' : ''}`}
                                onClick={() => toggleAddon(a.id)}
                            >
                                <div className="addon-left">
                                    <div className={`addon-switch ${addons[a.id] ? 'on' : ''}`}>
                                        <div className="addon-knob" />
                                    </div>
                                    <div>
                                        <div className="addon-name">{a.label}</div>
                                        <div className="addon-detail">{a.detail}</div>
                                    </div>
                                </div>
                                <div className="addon-price">+{fmt(a.price)}</div>
                            </div>
                        ))}
                    </div>

                    {/* ── Delivery Note ── */}
                    <div className="delivery-note">
                        <div className="delivery-note-title">
                            📦 Footage Delivery
                        </div>
                        <p>
                            All footage will be delivered via secure cloud transfer within 48 hours of the shoot. Files are organized by location and scene, with synced multi-cam timecode, labeled audio tracks, and room tone. We coordinate directly with your marketing team on format and organizational preferences.
                        </p>
                    </div>

                    {/* ── Next Steps ── */}
                    <div className="next-steps">
                        <div className="next-steps-title">Next steps</div>
                        <div className="next-steps-grid">
                            <div className="next-step">
                                <strong>01. Discovery call</strong>
                                <span>Walk through scope, finalize crew and package options, and confirm the shoot date.</span>
                            </div>
                            <div className="next-step">
                                <strong>02. Confirm your package</strong>
                                <span>Pick your tier + any add-ons. We&apos;ll send a final invoice and lock the date.</span>
                            </div>
                            <div className="next-step">
                                <strong>03. Location logistics</strong>
                                <span>Share facility address and any access requirements. We&apos;ll plan the shot list around your schedule.</span>
                            </div>
                            <div className="next-step">
                                <strong>04. Shoot day</strong>
                                <span>We arrive on time, handle everything on-site, and deliver organized footage within 48 hours.</span>
                            </div>
                        </div>

                        <div className="cta-row">
                            <a href="https://mediageekz.com/proposals" className="meeting-btn">
                                ← Back to ProducerOS
                            </a>
                            <span className="cta-btn" style={{ cursor: 'default', opacity: 0.7 }}>
                                Demo Only — No Payment Links
                            </span>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* ── FOOTER ── */}
                <footer className="ed-footer">
                    <div className="footer-logo">MediaGeekz × ProducerOS</div>
                    <div className="footer-tagline">Studio Tier — Custom white-label proposals with payment integration, web APIs, and client portals.</div>
                </footer>
            </div>
        </>
    );
}
