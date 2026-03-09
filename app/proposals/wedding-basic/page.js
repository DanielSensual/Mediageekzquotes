'use client';

import { useEffect } from 'react';

export default function WeddingBasicProposal() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const IMG = '/proposals/wedding-basic';

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

                :root {
                    --bg: #FAFAF8;
                    --bg-warm: #F5F3EF;
                    --bg-card: #FFFFFF;
                    --border: rgba(0, 0, 0, 0.06);
                    --border-hover: rgba(0, 0, 0, 0.12);
                    --text-dark: #1A1A1A;
                    --text-body: #4A4A4A;
                    --text-muted: #8A8A8A;
                    --text-light: #B0B0B0;
                    --accent: #C5A55A;
                    --accent-soft: rgba(197, 165, 90, 0.1);
                    --sage: #9CAF88;
                    --blush: #E8C4C4;
                    --cream: #F0EBE3;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    background: var(--bg) !important;
                    color: var(--text-body) !important;
                    line-height: 1.6;
                    overflow-x: hidden;
                }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: var(--bg); }
                ::-webkit-scrollbar-thumb { background: var(--text-light); border-radius: 2px; }

                /* ─── Hero ───────────────────────────────────── */
                .w-hero {
                    min-height: 100vh;
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: center;
                    text-align: center; padding: 60px 24px;
                    position: relative;
                    background: linear-gradient(180deg, #FFFFFF 0%, var(--bg-warm) 60%, var(--bg) 100%);
                }

                .w-hero::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(ellipse at 50% 40%, rgba(197, 165, 90, 0.04) 0%, transparent 70%);
                    pointer-events: none;
                }

                .w-hero-badge {
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 4px; text-transform: uppercase;
                    color: var(--accent); margin-bottom: 40px;
                    position: relative; z-index: 1;
                }

                .w-hero-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(48px, 8vw, 96px);
                    font-weight: 300; letter-spacing: -1px; line-height: 1.05;
                    color: var(--text-dark);
                    position: relative; z-index: 1; margin-bottom: 24px;
                }

                .w-hero-title em {
                    font-style: italic;
                    color: var(--accent);
                }

                .w-hero-subtitle {
                    font-size: 16px; font-weight: 300;
                    color: var(--text-muted);
                    max-width: 520px;
                    position: relative; z-index: 1; margin-bottom: 60px;
                }

                .w-hero-meta {
                    display: flex; gap: 40px;
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--text-muted);
                    position: relative; z-index: 1;
                }

                .w-hero-meta span { display: flex; flex-direction: column; gap: 6px; }
                .w-hero-meta strong { color: var(--text-dark); font-weight: 500; }

                @media (max-width: 600px) {
                    .w-hero-meta { flex-wrap: wrap; justify-content: center; gap: 20px 32px; }
                }

                /* ─── Divider ────────────────────────────────── */
                .w-divider {
                    width: 1px; height: 80px;
                    background: linear-gradient(180deg, transparent, var(--border-hover), transparent);
                    margin: 0 auto;
                }

                /* ─── Sections ───────────────────────────────── */
                .w-section {
                    padding: 100px 24px;
                    max-width: 1100px; margin: 0 auto;
                }

                .w-section-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 4px; text-transform: uppercase;
                    color: var(--accent); margin-bottom: 16px;
                }

                .w-section-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(32px, 5vw, 52px);
                    font-weight: 300; line-height: 1.15;
                    color: var(--text-dark); margin-bottom: 20px;
                }

                .w-section-desc {
                    font-size: 15px; font-weight: 300;
                    color: var(--text-muted);
                    max-width: 600px; margin-bottom: 60px; line-height: 1.8;
                }

                /* ─── Visual Grid ────────────────────────────── */
                .w-visual-grid { display: grid; gap: 20px; }
                .w-visual-grid.two-col { grid-template-columns: 1fr 1fr; }
                .w-visual-grid.three-col { grid-template-columns: 1fr 1fr 1fr; }

                @media (max-width: 768px) {
                    .w-visual-grid.two-col, .w-visual-grid.three-col { grid-template-columns: 1fr; }
                }

                .w-visual-card {
                    position: relative; border-radius: 12px; overflow: hidden;
                    background: var(--bg-card);
                    box-shadow: 0 2px 20px rgba(0,0,0,0.04);
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }

                .w-visual-card:hover {
                    transform: scale(1.01);
                    box-shadow: 0 8px 40px rgba(0,0,0,0.08);
                }

                .w-visual-card img {
                    width: 100%; height: 100%; object-fit: cover;
                    display: block; transition: transform 0.6s ease;
                }

                .w-visual-card:hover img { transform: scale(1.03); }

                .w-card-overlay {
                    position: absolute; bottom: 0; left: 0; right: 0;
                    padding: 40px 24px 24px;
                    background: linear-gradient(transparent, rgba(255, 255, 255, 0.95));
                }

                .w-card-label {
                    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
                    color: var(--accent); margin-bottom: 8px;
                }

                .w-card-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px; font-weight: 400;
                    color: var(--text-dark); margin-bottom: 6px;
                }

                .w-card-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

                /* ─── Full Image Break ───────────────────────── */
                .w-full-image-break {
                    width: 100%; max-height: 50vh;
                    object-fit: cover; margin: 0; display: block;
                }

                /* ─── Grade Items / Info Cards ───────────────── */
                .w-info-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 20px; margin-top: 40px;
                }

                @media (max-width: 768px) { .w-info-grid { grid-template-columns: 1fr; } }

                .w-info-card {
                    padding: 28px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: var(--bg-card);
                    transition: border-color 0.3s ease;
                }

                .w-info-card:hover { border-color: var(--accent); }

                .w-info-card h4 {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--accent); margin-bottom: 10px; font-weight: 500;
                }

                .w-info-card p { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

                /* ─── Brand Direction ────────────────────────── */
                .w-brand-grid {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 40px; margin-top: 40px;
                }

                @media (max-width: 768px) { .w-brand-grid { grid-template-columns: 1fr; } }

                .w-brand-col h4 {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    margin-bottom: 16px; font-weight: 500;
                }

                .w-brand-col.do h4 { color: var(--accent); }
                .w-brand-col.avoid h4 { color: var(--text-light); }
                .w-brand-col ul { list-style: none; }

                .w-brand-col ul li {
                    font-size: 13px; padding: 8px 0;
                    border-bottom: 1px solid var(--border); line-height: 1.6;
                }

                .w-brand-col.do ul li { color: var(--text-body); }
                .w-brand-col.avoid ul li { color: var(--text-light); }

                /* ─── Color Palette ──────────────────────────── */
                .w-palette-strip {
                    display: flex; height: 120px;
                    border-radius: 12px; overflow: hidden; margin-bottom: 40px;
                    box-shadow: 0 2px 20px rgba(0,0,0,0.06);
                }

                .w-palette-swatch {
                    flex: 1; display: flex; flex-direction: column;
                    justify-content: flex-end; padding: 12px;
                    transition: flex 0.4s ease; cursor: default;
                }

                .w-palette-swatch:hover { flex: 1.8; }
                .w-swatch-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; }
                .w-swatch-hex { font-size: 10px; font-family: 'Inter', monospace; opacity: 0.6; }

                /* ─── Shot List ───────────────────────────────── */
                .w-shot-list { margin-top: 48px; }

                .w-shot-header {
                    display: grid;
                    grid-template-columns: 40px 1fr 140px 80px;
                    gap: 16px; padding: 12px 0;
                    border-bottom: 1px solid var(--border);
                    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--text-light);
                }

                .w-shot-row {
                    display: grid;
                    grid-template-columns: 40px 1fr 140px 80px;
                    gap: 16px; padding: 16px 0;
                    border-bottom: 1px solid var(--border);
                    font-size: 13px; align-items: center;
                    transition: background 0.2s ease;
                }

                .w-shot-row:hover { background: var(--accent-soft); }
                .w-shot-num { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--accent); }
                .w-shot-name { color: var(--text-dark); font-weight: 400; }
                .w-shot-type { color: var(--text-light); font-size: 11px; }
                .w-shot-fps { font-size: 11px; color: var(--accent); text-align: right; }

                @media (max-width: 768px) {
                    .w-shot-header, .w-shot-row { grid-template-columns: 30px 1fr 80px; }
                    .w-shot-fps { display: none; }
                }

                /* ─── Equipment Grid ─────────────────────────── */
                .w-equip-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px; margin-top: 48px;
                }

                .w-equip-card {
                    padding: 24px 20px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: var(--bg-card);
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .w-equip-card:hover {
                    border-color: var(--accent);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.04);
                }

                .w-equip-icon {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    font-weight: 500; margin-bottom: 10px; color: var(--accent);
                }

                .w-equip-card h3 {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 20px; font-weight: 400;
                    color: var(--text-dark); margin-bottom: 10px;
                }

                .w-equip-card p { font-size: 12px; color: var(--text-muted); line-height: 1.7; }
                .w-equip-card ul { list-style: none; margin-top: 10px; }

                .w-equip-card ul li {
                    font-size: 11px; color: var(--text-muted);
                    padding: 3px 0 3px 16px; position: relative; line-height: 1.5;
                }

                .w-equip-card ul li::before {
                    content: '\\2192'; position: absolute; left: 0;
                    color: var(--accent); font-size: 10px;
                }

                /* ─── Schedule ───────────────────────────────── */
                .w-schedule-block { margin-bottom: 48px; }

                .w-schedule-day {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 28px; color: var(--text-dark); margin-bottom: 8px;
                }

                .w-schedule-meta { font-size: 12px; color: var(--text-light); margin-bottom: 24px; }

                .w-timeline { position: relative; padding-left: 32px; }

                .w-timeline::before {
                    content: ''; position: absolute;
                    left: 6px; top: 0; bottom: 0;
                    width: 1px;
                    background: linear-gradient(180deg, var(--accent), var(--text-light), transparent);
                }

                .w-timeline-item { position: relative; margin-bottom: 24px; padding-left: 16px; }

                .w-timeline-item::before {
                    content: ''; position: absolute;
                    left: -30px; top: 6px;
                    width: 9px; height: 9px; border-radius: 50%;
                    background: var(--accent); border: 2px solid var(--bg);
                }

                .w-timeline-time {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--accent); margin-bottom: 4px;
                }

                .w-timeline-title {
                    font-size: 15px; color: var(--text-dark);
                    font-weight: 500; margin-bottom: 4px;
                }

                .w-timeline-desc { font-size: 12px; color: var(--text-light); line-height: 1.6; }

                /* ─── Packages ───────────────────────────────── */
                .w-packages {
                    display: grid; grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px; margin-top: 48px;
                }

                @media (max-width: 900px) { .w-packages { grid-template-columns: 1fr; } }

                .w-package {
                    padding: 40px 32px;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    background: var(--bg-card);
                    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                }

                .w-package:hover {
                    border-color: var(--accent);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.06);
                }

                .w-package.recommended {
                    border-color: var(--accent);
                    background: linear-gradient(135deg, #FFFFFF, rgba(197, 165, 90, 0.04));
                    position: relative;
                    box-shadow: 0 4px 30px rgba(197, 165, 90, 0.1);
                }

                .w-recommended-badge {
                    position: absolute; top: -12px; left: 32px;
                    background: var(--accent); color: #FFFFFF;
                    font-size: 9px; font-weight: 600;
                    letter-spacing: 2px; text-transform: uppercase;
                    padding: 4px 14px; border-radius: 20px;
                }

                .w-package-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 28px; color: var(--text-dark); margin-bottom: 8px;
                }

                .w-package-price {
                    font-size: 12px; color: var(--text-light);
                    margin-bottom: 24px; padding-bottom: 24px;
                    border-bottom: 1px solid var(--border);
                }

                .w-package-price .amount {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 36px; color: var(--accent); font-weight: 400;
                }

                .w-package-features { list-style: none; }

                .w-package-features li {
                    font-size: 13px; color: var(--text-muted);
                    padding: 8px 0 8px 20px; position: relative;
                }

                .w-package-features li::before {
                    content: '✓'; position: absolute; left: 0;
                    color: var(--accent); font-size: 12px;
                }

                .w-package-features li.excluded { opacity: 0.35; }
                .w-package-features li.excluded::before { content: '—'; color: var(--text-light); }

                /* ─── Deliverables ────────────────────────────── */
                .w-deliverable-grid {
                    display: grid; grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                }

                @media (max-width: 768px) { .w-deliverable-grid { grid-template-columns: 1fr; } }

                .w-deliverable {
                    padding: 28px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: var(--bg-card);
                }

                .w-deliverable h4 {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--accent); margin-bottom: 10px; font-weight: 500;
                }

                .w-deliverable .w-del-title {
                    font-size: 15px; color: var(--text-dark);
                    margin-bottom: 12px; font-weight: 400;
                }

                .w-deliverable p { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

                .w-deliverable .w-del-use {
                    margin-top: 12px; color: var(--accent); font-size: 12px;
                }

                /* ─── Footer ─────────────────────────────────── */
                .w-footer {
                    text-align: center;
                    padding: 80px 24px 40px;
                    border-top: 1px solid var(--border);
                }

                .w-footer-logo {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px; font-weight: 600;
                    letter-spacing: 4px; text-transform: uppercase;
                    color: var(--text-light); margin-bottom: 12px;
                }

                .w-footer-tagline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 18px; font-weight: 300; font-style: italic;
                    color: var(--text-light);
                }

                /* ─── Animations ──────────────────────────────── */
                .fade-in {
                    opacity: 0; transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }

                .fade-in.visible { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* HERO */}
            <div className="w-hero">
                <div className="w-hero-badge">MediaGeekz Wedding Films</div>
                <h1 className="w-hero-title">Your <em>Forever</em><br />Film</h1>
                <p className="w-hero-subtitle">Cinematic wedding coverage that captures every stolen glance, every tear of joy, and every moment of celebration — beautifully, simply, authentically.</p>
                <div className="w-hero-meta">
                    <span><strong>Style</strong>Cinematic + Documentary</span>
                    <span><strong>Coverage</strong>5–12 Hours</span>
                    <span><strong>Format</strong>16:9 + 9:16</span>
                    <span><strong>Delivery</strong>4–6 Weeks</span>
                </div>
            </div>

            <div className="w-divider"></div>

            {/* VISUAL DIRECTION */}
            <section className="w-section fade-in">
                <div className="w-section-label">Visual Direction</div>
                <h2 className="w-section-title">Bright. Airy. Timeless.</h2>
                <p className="w-section-desc">Your wedding film should feel like flipping through a fine art album — every frame luminous, every moment intentional. We shoot for warmth, natural light, and genuine emotion.</p>

                <div className="w-visual-grid two-col">
                    <div className="w-visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/garden_couple.png`} alt="Couple in garden" />
                        <div className="w-card-overlay">
                            <div className="w-card-label">The Couple — Golden Hour</div>
                            <div className="w-card-title">The Love Story Shot</div>
                            <div className="w-card-desc">Natural light portraits during golden hour. Shallow depth of field, genuine laughter, editorial-quality framing.</div>
                        </div>
                    </div>
                    <div className="w-visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/reception_venue.png`} alt="Reception venue" />
                        <div className="w-card-overlay">
                            <div className="w-card-label">Reception — Atmosphere</div>
                            <div className="w-card-title">The Celebration</div>
                            <div className="w-card-desc">Candlelight, chandeliers, and toasts. We capture the warmth and energy of your reception with cinematic flair.</div>
                        </div>
                    </div>
                </div>

                <div className="w-visual-grid two-col" style={{ marginTop: 20 }}>
                    <div className="w-visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/rings_detail.png`} alt="Ring details" />
                        <div className="w-card-overlay">
                            <div className="w-card-label">Details — Macro</div>
                            <div className="w-card-title">The Fine Details</div>
                            <div className="w-card-desc">Rings, lace, invitations, florals. The small details that make your day uniquely yours, captured in soft natural light.</div>
                        </div>
                    </div>
                    <div className="w-visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/aerial_ceremony.png`} alt="Aerial ceremony" />
                        <div className="w-card-overlay">
                            <div className="w-card-label">Aerial — Establishing</div>
                            <div className="w-card-title">The Grand View</div>
                            <div className="w-card-desc">Drone coverage of your venue and ceremony from above. The cinematic wide shot that sets the scene for your story.</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-divider"></div>

            {/* DELIVERABLES */}
            <section className="w-section fade-in">
                <div className="w-section-label">What You Receive</div>
                <h2 className="w-section-title">Films that live forever.</h2>
                <p className="w-section-desc">Every piece is crafted to be watched, rewatched, and shared — from a quick teaser for Instagram to a full cinematic feature for your living room.</p>

                <div className="w-deliverable-grid">
                    <div className="w-deliverable">
                        <h4>Highlight Film</h4>
                        <div className="w-del-title">3–5 min · Cinematic Edit</div>
                        <p>The hero piece. Music-driven, color-graded, and paced to give you chills. The best moments of your entire day distilled into one beautiful film.</p>
                        <p className="w-del-use">Use: Share on social, send to family, relive the day</p>
                    </div>
                    <div className="w-deliverable">
                        <h4>Ceremony Film</h4>
                        <div className="w-del-title">Full-length · Documentary</div>
                        <p>Your complete ceremony from processional to recessional. Audio captured from officiant mic + ambient, with multi-angle coverage for a broadcast-quality finish.</p>
                        <p className="w-del-use">Use: Archive, anniversary viewing, share with guests who couldn&apos;t attend</p>
                    </div>
                    <div className="w-deliverable">
                        <h4>Social Teasers</h4>
                        <div className="w-del-title">30–60s · Vertical + Square</div>
                        <p>Quick-turn clips optimized for Instagram Reels, TikTok, and Stories. Delivered within a week so you can share while the excitement is fresh.</p>
                        <p className="w-del-use">Use: Instagram, TikTok, thank-you posts</p>
                    </div>
                </div>
            </section>

            <img className="w-full-image-break" src={`${IMG}/reception_venue.png`} alt="Reception panoramic" />

            <div className="w-divider"></div>

            {/* CREATIVE DIRECTION */}
            <section className="w-section fade-in">
                <div className="w-section-label">Creative Direction</div>
                <h2 className="w-section-title">Natural, not staged.<br />Cinematic, not corporate.</h2>
                <p className="w-section-desc">We approach every wedding like a short film — finding the story as it unfolds, never interrupting or posing. Your film should feel like your day actually felt.</p>

                <div className="w-brand-grid">
                    <div className="w-brand-col do">
                        <h4>✦ Our Approach</h4>
                        <ul>
                            <li>Documentary-first — real moments, genuine reactions</li>
                            <li>Natural light whenever possible — golden hour priority</li>
                            <li>Shallow depth of field for dreamy, editorial quality</li>
                            <li>Warm, bright color grading — never dark or moody unless requested</li>
                            <li>Stabilized gimbal movement — smooth and intentional</li>
                            <li>Audio design with ambient sound — not just music overlay</li>
                        </ul>
                    </div>
                    <div className="w-brand-col avoid">
                        <h4>✕ What We Avoid</h4>
                        <ul>
                            <li>Over-posed, forced interactions that feel unnatural</li>
                            <li>Heavy-handed filters or trendy presets</li>
                            <li>Shaky handheld without purpose</li>
                            <li>Generic stock music or templated intros</li>
                            <li>Intrusive filming that disrupts the ceremony flow</li>
                            <li>Over-produced effects that age poorly</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="w-divider"></div>

            {/* COLOR SCIENCE */}
            <section className="w-section fade-in">
                <div className="w-section-label">Color Science</div>
                <h2 className="w-section-title">The Bright &amp; Airy Grade</h2>
                <p className="w-section-desc">Luminous, warm, and timeless. Lifted shadows, protected skin tones, and a soft champagne warmth throughout. Your film will look as beautiful in 20 years as it does today.</p>

                <div className="w-palette-strip">
                    <div className="w-palette-swatch" style={{ background: '#FAFAF8' }}><span className="w-swatch-label" style={{ color: '#8A8A8A' }}>Ivory</span><span className="w-swatch-hex" style={{ color: '#8A8A8A' }}>#FAFAF8</span></div>
                    <div className="w-palette-swatch" style={{ background: '#F0EBE3' }}><span className="w-swatch-label" style={{ color: '#8A8A8A' }}>Cream</span><span className="w-swatch-hex" style={{ color: '#8A8A8A' }}>#F0EBE3</span></div>
                    <div className="w-palette-swatch" style={{ background: '#C5A55A' }}><span className="w-swatch-label" style={{ color: '#FFFFFF' }}>Gold</span><span className="w-swatch-hex" style={{ color: '#FFFFFF' }}>#C5A55A</span></div>
                    <div className="w-palette-swatch" style={{ background: '#9CAF88' }}><span className="w-swatch-label" style={{ color: '#FFFFFF' }}>Sage</span><span className="w-swatch-hex" style={{ color: '#FFFFFF' }}>#9CAF88</span></div>
                    <div className="w-palette-swatch" style={{ background: '#E8C4C4' }}><span className="w-swatch-label" style={{ color: '#4A4A4A' }}>Blush</span><span className="w-swatch-hex" style={{ color: '#4A4A4A' }}>#E8C4C4</span></div>
                    <div className="w-palette-swatch" style={{ background: '#1A1A1A' }}><span className="w-swatch-label" style={{ color: '#F0EBE3' }}>Shadow</span><span className="w-swatch-hex" style={{ color: '#F0EBE3' }}>#1A1A1A</span></div>
                </div>

                <div className="w-info-grid">
                    <div className="w-info-card"><h4>Shadows</h4><p>Lifted, never crushed. Soft warmth in the blacks with a slight champagne tint. Clean, open shadows that preserve detail in darker venues.</p></div>
                    <div className="w-info-card"><h4>Skin Tones</h4><p>Protected and warm — the #1 priority. Natural olive base, never orange or washed out. Consistent across indoor, outdoor, and mixed lighting.</p></div>
                    <div className="w-info-card"><h4>Highlights</h4><p>Soft, creamy roll-off. White dresses hold detail without blowing out. Natural window light gets a gentle halation for a film-like quality.</p></div>
                    <div className="w-info-card"><h4>Overall Feel</h4><p>Bright and airy with warmth. Think fine art wedding photography translated to motion. Clean, timeless, never trendy.</p></div>
                </div>
            </section>

            <div className="w-divider"></div>

            {/* SHOT ARCHITECTURE */}
            <section className="w-section fade-in">
                <div className="w-section-label">Shot Architecture</div>
                <h2 className="w-section-title">Moment-by-moment coverage</h2>
                <p className="w-section-desc">Every shot is intentional. We capture with the final edit in mind — wide for context, medium for connection, close-up for emotion.</p>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--accent)', marginBottom: 8 }}>Getting Ready</h3>
                <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 0 }}>Intimate, detail-focused coverage</p>
                <div className="w-shot-list">
                    <div className="w-shot-header"><span>#</span><span>Shot</span><span>Type</span><span>FPS</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">01</span><span className="w-shot-name">Dress hanging in natural window light</span><span className="w-shot-type">Detail / CU</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">02</span><span className="w-shot-name">Ring details with florals + invitation</span><span className="w-shot-type">Macro</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">03</span><span className="w-shot-name">Bride getting ready — mirror reflection</span><span className="w-shot-type">Medium / candid</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">04</span><span className="w-shot-name">Emotional veil moment + reaction</span><span className="w-shot-type">CU / reaction</span><span className="w-shot-fps">60fps</span></div>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--accent)', marginTop: 60, marginBottom: 8 }}>Ceremony</h3>
                <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 0 }}>Multi-angle coverage, zero interruptions</p>
                <div className="w-shot-list">
                    <div className="w-shot-header"><span>#</span><span>Shot</span><span>Type</span><span>FPS</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">05</span><span className="w-shot-name">Venue wide — aisle + guests seated</span><span className="w-shot-type">Wide / establishing</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">06</span><span className="w-shot-name">Processional — bride walking down aisle</span><span className="w-shot-type">Medium / steady</span><span className="w-shot-fps">60fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">07</span><span className="w-shot-name">Groom&apos;s first look reaction</span><span className="w-shot-type">CU / reaction</span><span className="w-shot-fps">60fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">08</span><span className="w-shot-name">Vow exchange — hands + faces</span><span className="w-shot-type">CU detail</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">09</span><span className="w-shot-name">Ring exchange</span><span className="w-shot-type">Macro / CU</span><span className="w-shot-fps">60fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">10</span><span className="w-shot-name">First kiss + crowd reaction</span><span className="w-shot-type">Medium + wide</span><span className="w-shot-fps">60fps</span></div>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--accent)', marginTop: 60, marginBottom: 8 }}>Reception &amp; Portraits</h3>
                <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 0 }}>Energy, speeches, golden hour</p>
                <div className="w-shot-list">
                    <div className="w-shot-header"><span>#</span><span>Shot</span><span>Type</span><span>FPS</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">11</span><span className="w-shot-name">Golden hour couple portraits — backlit</span><span className="w-shot-type">Medium / CU</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">12</span><span className="w-shot-name">Grand entrance + first dance</span><span className="w-shot-type">Wide + medium</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">13</span><span className="w-shot-name">Speeches — speaker + couple reactions</span><span className="w-shot-type">MCU / reaction</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">14</span><span className="w-shot-name">Dance floor energy — guest candids</span><span className="w-shot-type">Handheld / wide</span><span className="w-shot-fps">24fps</span></div>
                    <div className="w-shot-row"><span className="w-shot-num">15</span><span className="w-shot-name">Sparkler exit / send-off</span><span className="w-shot-type">Tracking / slow-mo</span><span className="w-shot-fps">120fps</span></div>
                </div>
            </section>

            <div className="w-divider"></div>

            {/* EQUIPMENT */}
            <section className="w-section fade-in">
                <div className="w-section-label">Production Kit</div>
                <h2 className="w-section-title">The gear behind the look</h2>
                <p className="w-section-desc">Professional cinema equipment optimized for natural light, low-light reception venues, and all-day reliability.</p>

                <div className="w-equip-grid">
                    <div className="w-equip-card">
                        <div className="w-equip-icon">✦ Camera A — Primary</div>
                        <h3>Sony FX6</h3>
                        <p>Full-frame cinema camera. S-Log3 for maximum dynamic range in bright daylight and dark dance floors.</p>
                        <ul><li>24-70mm f/2.8 GM</li><li>85mm f/1.4 GM (portraits)</li><li>4K 120fps slow motion</li><li>Dual card slots (redundancy)</li></ul>
                    </div>
                    <div className="w-equip-card">
                        <div className="w-equip-icon">✦ Camera B — Ceremony Lock</div>
                        <h3>Sony A7S III</h3>
                        <p>Locked on tripod for continuous ceremony coverage. Low-light champion for reception dance floor.</p>
                        <ul><li>35mm f/1.4 GM (wide altar)</li><li>70-200mm f/2.8 GM (tight altar)</li><li>S-Log3 matched to A-cam</li><li>External audio feed</li></ul>
                    </div>
                    <div className="w-equip-card">
                        <div className="w-equip-icon">✦ Audio</div>
                        <h3>Dual Wireless</h3>
                        <p>Lapel mics on officiant + groom for crystal-clear vow audio. Backup recorder for redundancy.</p>
                        <ul><li>Sennheiser EW-D wireless ×2</li><li>Rode NTG5 shotgun (ambient)</li><li>Zoom F6 32-bit float backup</li><li>DJ board feed (reception)</li></ul>
                    </div>
                    <div className="w-equip-card">
                        <div className="w-equip-icon">✦ Stabilization</div>
                        <h3>Gimbal + Tripod</h3>
                        <p>DJI RS3 Pro for silky-smooth aisle walks and couple portraits. Sachtler tripod for locked ceremony coverage.</p>
                        <ul><li>DJI RS3 Pro gimbal</li><li>Sachtler Ace tripod</li><li>Monopod (reception flexibility)</li><li>V-mount batteries all day</li></ul>
                    </div>
                </div>
            </section>

            <div className="w-divider"></div>

            {/* SCHEDULE */}
            <section className="w-section fade-in">
                <div className="w-section-label">Wedding Day Coverage</div>
                <h2 className="w-section-title">Structured for your timeline.</h2>
                <p className="w-section-desc">We work with your coordinator to align coverage with your timeline. Here&apos;s a typical full-day flow.</p>

                <div className="w-schedule-block">
                    <div className="w-schedule-day">Your Wedding Day</div>
                    <div className="w-schedule-meta">Coverage scales with your package — 5, 8, or 12 hours</div>
                    <div className="w-timeline">
                        <div className="w-timeline-item"><div className="w-timeline-time">2:00 PM</div><div className="w-timeline-title">Arrive + Setup</div><div className="w-timeline-desc">Scout venue light, position ceremony camera, test audio. Quick detail shots of venue, florals, and signage.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">2:30 PM</div><div className="w-timeline-title">Getting Ready Coverage</div><div className="w-timeline-desc">Dress, shoes, rings, invitation flat-lay. Candid moments of bride/groom prep. Hair and makeup finishing touches.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">3:30 PM</div><div className="w-timeline-title">First Look (if applicable)</div><div className="w-timeline-desc">Private first look moment. Multi-angle coverage of reveal + reaction. Followed by couple portraits.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">4:30 PM</div><div className="w-timeline-title">Ceremony</div><div className="w-timeline-desc">Multi-angle ceremony coverage. Locked tripod hero angle + gimbal for aisle and reactions. Wireless audio on officiant + groom.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">5:30 PM</div><div className="w-timeline-title">Cocktail Hour + Family Formals</div><div className="w-timeline-desc">Bridal party portraits, family group shots. Cocktail hour candids and venue atmosphere.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">6:30 PM</div><div className="w-timeline-title">Golden Hour Portraits</div><div className="w-timeline-desc">Just the two of you. Backlit sunset portraits, natural movement, genuine laughter. The shots that end up on your wall.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">7:00 PM</div><div className="w-timeline-title">Reception</div><div className="w-timeline-desc">Grand entrance, first dance, speeches and toasts, cake cutting, parent dances, bouquet toss, open dancing.</div></div>
                        <div className="w-timeline-item"><div className="w-timeline-time">9:00 PM</div><div className="w-timeline-title">Send-Off</div><div className="w-timeline-desc">Sparkler exit, vintage car departure, or final dance floor energy. The cinematic close to your story.</div></div>
                    </div>
                </div>
            </section>

            <div className="w-divider"></div>

            {/* PACKAGES */}
            <section className="w-section fade-in">
                <div className="w-section-label">Investment</div>
                <h2 className="w-section-title">Simple, transparent pricing.</h2>
                <p className="w-section-desc">No hidden fees. Every package includes professional cinema equipment, color-graded delivery, and organized digital delivery.</p>

                <div className="w-packages">
                    <div className="w-package">
                        <div className="w-package-name">Essentials</div>
                        <div className="w-package-price">
                            <span className="amount">$2,000</span>
                            <br /><span style={{ fontSize: 11, color: 'var(--text-light)' }}>single shooter · 5 hours</span>
                        </div>
                        <ul className="w-package-features">
                            <li>5 hours of coverage</li>
                            <li>1 videographer</li>
                            <li>Highlight film (3–5 min, color graded)</li>
                            <li>2 social teaser clips (IG/TikTok)</li>
                            <li>Digital delivery via private link</li>
                            <li>1 revision round</li>
                            <li className="excluded">Full ceremony edit</li>
                            <li className="excluded">Getting ready coverage</li>
                            <li className="excluded">Second shooter</li>
                            <li className="excluded">Drone coverage</li>
                            <li className="excluded">Raw footage</li>
                        </ul>
                    </div>
                    <div className="w-package recommended">
                        <div className="w-recommended-badge">Most Popular</div>
                        <div className="w-package-name">Classic</div>
                        <div className="w-package-price">
                            <span className="amount">$3,800</span>
                            <br /><span style={{ fontSize: 11, color: 'var(--text-light)' }}>single shooter · 8 hours</span>
                        </div>
                        <ul className="w-package-features">
                            <li>8 hours of coverage</li>
                            <li>1 videographer</li>
                            <li>Highlight film (3–5 min, motion GFX)</li>
                            <li>Full ceremony edit (multi-angle)</li>
                            <li>Getting ready coverage</li>
                            <li>5 social teaser clips</li>
                            <li>Golden hour portrait session</li>
                            <li>Digital delivery + USB keepsake</li>
                            <li>2 revision rounds</li>
                            <li className="excluded">Second shooter</li>
                            <li className="excluded">Drone coverage</li>
                            <li className="excluded">Raw footage</li>
                        </ul>
                    </div>
                    <div className="w-package">
                        <div className="w-package-name">Cinematic</div>
                        <div className="w-package-price">
                            <span className="amount">$6,500</span>
                            <br /><span style={{ fontSize: 11, color: 'var(--text-light)' }}>two shooters · 12 hours</span>
                        </div>
                        <ul className="w-package-features">
                            <li>12 hours of full-day coverage</li>
                            <li>2 videographers</li>
                            <li>Cinematic highlight film (5–8 min)</li>
                            <li>Full ceremony edit (multi-angle)</li>
                            <li>Reception speeches + toasts edit</li>
                            <li>Getting ready (bride + groom)</li>
                            <li>Golden hour portrait session</li>
                            <li>Drone aerial coverage</li>
                            <li>10 social teaser clips</li>
                            <li>Same-week Instagram teaser</li>
                            <li>All raw footage</li>
                            <li>USB + digital delivery</li>
                            <li>3 revision rounds</li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer className="w-footer">
                <div className="w-footer-logo">MediaGeekz</div>
                <div className="w-footer-tagline">Cinematic stories. Captured forever.</div>
            </footer>
        </>
    );
}
