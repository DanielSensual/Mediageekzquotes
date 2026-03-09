'use client';

import { useEffect } from 'react';

export default function ConventionEventProposal() {
    useEffect(() => {
        // Fade-in on scroll
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

    const IMG = '/proposals/convention-event';

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

                :root {
                    --shadow: #0A0E1A;
                    --midnight: #111827;
                    --slate: #1E293B;
                    --steel: #64748B;
                    --stone: #94A3B8;
                    --gold: #D4A843;
                    --gold-soft: rgba(212, 168, 67, 0.12);
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
                }

                .proposal-hero::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(180deg, transparent 60%, var(--shadow) 100%);
                    pointer-events: none;
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
                    max-width: 560px;
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

                .shot-list { margin-top: 48px; }

                .shot-list-header {
                    display: grid;
                    grid-template-columns: 40px 1fr 140px 80px;
                    gap: 16px; padding: 12px 0;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.2);
                    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
                    color: var(--steel);
                }

                .shot-row {
                    display: grid;
                    grid-template-columns: 40px 1fr 140px 80px;
                    gap: 16px; padding: 16px 0;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.08);
                    font-size: 13px; align-items: center;
                    transition: background 0.2s ease;
                }

                .shot-row:hover { background: var(--gold-soft); }
                .shot-num { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--gold); }
                .shot-name { color: var(--cream); font-weight: 400; }
                .shot-type { color: var(--steel); font-size: 11px; }
                .shot-fps { font-size: 11px; color: var(--gold); text-align: right; }

                @media (max-width: 768px) {
                    .shot-list-header, .shot-row { grid-template-columns: 30px 1fr 80px; }
                    .shot-fps { display: none; }
                }

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

                .packages {
                    display: grid; grid-template-columns: 1fr 1fr 1fr;
                    gap: 24px; margin-top: 48px;
                }

                @media (max-width: 900px) { .packages { grid-template-columns: 1fr; } }

                .package-card {
                    padding: 40px 32px;
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 12px;
                    background: rgba(30, 41, 59, 0.3);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .package-card:hover {
                    border-color: rgba(212, 168, 67, 0.3);
                    transform: translateY(-4px);
                }

                .package-card.recommended {
                    border-color: var(--gold);
                    background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(212, 168, 67, 0.08));
                    position: relative;
                }

                .recommended-badge {
                    position: absolute; top: -12px; left: 32px;
                    background: var(--gold); color: var(--shadow);
                    font-size: 9px; font-weight: 600;
                    letter-spacing: 2px; text-transform: uppercase;
                    padding: 4px 14px; border-radius: 20px;
                }

                .package-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 28px; color: var(--white); margin-bottom: 8px;
                }

                .package-price {
                    font-size: 12px; color: var(--steel);
                    margin-bottom: 24px; padding-bottom: 24px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.15);
                }

                .package-price .amount {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 36px; color: var(--gold); font-weight: 400;
                }

                .package-features { list-style: none; }

                .package-features li {
                    font-size: 13px; color: var(--stone);
                    padding: 8px 0; padding-left: 20px; position: relative;
                }

                .package-features li::before {
                    content: '✓'; position: absolute; left: 0;
                    color: var(--gold); font-size: 12px;
                }

                .package-features li.excluded { opacity: 0.35; }
                .package-features li.excluded::before { content: '—'; color: var(--steel); }

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

                .full-image-break {
                    width: 100%; max-height: 60vh;
                    object-fit: cover; margin: 0; display: block; opacity: 0.8;
                }

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

                .fade-in {
                    opacity: 0; transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }

                .fade-in.visible { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* HERO */}
            <div className="proposal-hero">
                <div className="hero-badge">MediaGeekz × Prestige Realty Group</div>
                <h1 className="pt-hero-title">The <em>Prestige</em><br />Event</h1>
                <p className="hero-subtitle">A multi-format event coverage campaign — capturing the energy, authority, and luxury of your brand through cinematic convention storytelling.</p>
                <div className="hero-meta">
                    <span><strong>Client</strong>Prestige Realty Group</span>
                    <span><strong>Event</strong>Annual Broker Summit</span>
                    <span><strong>Format</strong>16:9 + 9:16</span>
                    <span><strong>Coverage</strong>1–2 Days</span>
                </div>
            </div>

            <div className="divider"></div>

            {/* VISUAL DIRECTION */}
            <section className="proposal-section fade-in">
                <div className="section-label">Visual Direction</div>
                <h2 className="section-title">Cinematic event cinema.<br />Bold. Elevated. Unforgettable.</h2>
                <p className="section-desc">Every frame should feel like a scene from a luxury brand film — not a corporate recap video. We capture the ambiance, the authority, and the human moments that make your events worth remembering.</p>

                <div className="visual-grid two-col">
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/keynote_stage.png`} alt="Keynote stage" />
                        <div className="card-overlay">
                            <div className="card-label">Keynote — Main Stage</div>
                            <div className="pt-card-title">The Authority Shot</div>
                            <div className="pt-card-desc">Multi-cam coverage from hero angle + crowd reaction. Dramatic stage lighting, speaker silhouettes, audience energy.</div>
                        </div>
                    </div>
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/expo_floor.png`} alt="Expo floor" />
                        <div className="card-overlay">
                            <div className="card-label">Expo Floor — Coverage</div>
                            <div className="pt-card-title">The Energy of the Room</div>
                            <div className="pt-card-desc">Elevated wide shots showing booth density and foot traffic. Intimate medium shots of vendor interactions.</div>
                        </div>
                    </div>
                </div>

                <div className="visual-grid two-col" style={{ marginTop: 24 }}>
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/vip_reception.png`} alt="VIP reception" />
                        <div className="card-overlay">
                            <div className="card-label">VIP Reception — Evening</div>
                            <div className="pt-card-title">The Inner Circle</div>
                            <div className="pt-card-desc">Shallow depth of field, warm bokeh, champagne in hand. The intimate networking moments that show your brand&apos;s exclusivity.</div>
                        </div>
                    </div>
                    <div className="visual-card" style={{ aspectRatio: '4/3' }}>
                        <img src={`${IMG}/drone_aerial.png`} alt="Drone aerial" />
                        <div className="card-overlay">
                            <div className="card-label">Aerial — Golden Hour</div>
                            <div className="pt-card-title">The Establishing Shot</div>
                            <div className="pt-card-desc">FAA Part 107 drone coverage of the venue at sunset. The cinematic wide that opens every sizzle reel.</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* NARRATIVE ARCHITECTURE */}
            <section className="proposal-section fade-in">
                <div className="section-label">Narrative Architecture</div>
                <h2 className="section-title">Three deliverables. One story.</h2>
                <p className="section-desc">Each piece works independently for different platforms — but together they form a complete content ecosystem that extends the life of your event by months.</p>

                <div className="visual-grid three-col">
                    <div className="grade-item" style={{ borderColor: 'var(--gold)' }}>
                        <h4>Deliverable 1 — Sizzle Reel</h4>
                        <p style={{ color: 'var(--cream)', fontSize: 15, marginBottom: 12 }}>3–5 min · Event Highlight</p>
                        <p>The hero piece. Fast-paced energy shots, keynote highlights, crowd reactions, booth activity, and golden hour exteriors — set to music with branded motion graphics.</p>
                        <p style={{ marginTop: 12, color: 'var(--gold)', fontSize: 12 }}>Use: Website hero, social media, sponsor decks</p>
                    </div>
                    <div className="grade-item">
                        <h4>Deliverable 2 — Keynote Recap</h4>
                        <p style={{ color: 'var(--cream)', fontSize: 15, marginBottom: 12 }}>8–15 min · Speaker Coverage</p>
                        <p>Multi-cam edit of keynote presentation with speaker name overlays, slide integration, and audience reaction cutaways. Broadcast-quality finish.</p>
                        <p style={{ marginTop: 12, color: 'var(--gold)', fontSize: 12 }}>Use: YouTube, internal training, lead magnets</p>
                    </div>
                    <div className="grade-item">
                        <h4>Deliverable 3 — After-Movie</h4>
                        <p style={{ color: 'var(--cream)', fontSize: 15, marginBottom: 12 }}>5–8 min · Cinematic Wrap</p>
                        <p>The emotional, cinematic piece. Attendee testimonials woven with atmospheric B-roll, drone footage, and a narrative voiceover. This is the piece people share.</p>
                        <p style={{ marginTop: 12, color: 'var(--gold)', fontSize: 12 }}>Use: Next year&apos;s registration push, sponsorship pitch</p>
                    </div>
                </div>
            </section>

            <img className="full-image-break" src={`${IMG}/expo_floor.png`} alt="Convention panoramic" />

            <div className="divider"></div>

            {/* CREATIVE DIRECTION */}
            <section className="proposal-section fade-in">
                <div className="section-label">Creative Direction</div>
                <h2 className="section-title">Cinematic, not corporate.<br />Prestigious, not generic.</h2>
                <p className="section-desc">Your event coverage should feel like a luxury brand campaign — every shot intentional, every frame elevated. We don&apos;t make &ldquo;recap videos.&rdquo; We create brand cinema.</p>

                <div className="brand-grid">
                    <div className="brand-col do">
                        <h4>✦ The Prestige Standard</h4>
                        <ul>
                            <li>Cinematic camera movement — gimbals, sliders, dolly energy</li>
                            <li>Dramatic lighting awareness — stage spots, natural window light, golden hour</li>
                            <li>Editorial framing — shallow DOF, negative space, intentional composition</li>
                            <li>Warm, rich color grading — not flat corporate gray</li>
                            <li>Sound design that builds atmosphere — not just background music</li>
                            <li>Human moments — genuine reactions, handshakes, laughter</li>
                        </ul>
                    </div>
                    <div className="brand-col avoid">
                        <h4>✕ What We Avoid</h4>
                        <ul>
                            <li>Static tripod talking heads with fluorescent lighting</li>
                            <li>&ldquo;Corporate training video&rdquo; energy and pacing</li>
                            <li>Generic stock music and title cards</li>
                            <li>Flat, overlit footage with no contrast or mood</li>
                            <li>Shaky handheld without purpose</li>
                            <li>Over-produced motion graphics that feel templated</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* COLOR GRADING */}
            <section className="proposal-section fade-in">
                <div className="section-label">Color Science</div>
                <h2 className="section-title">The Prestige Grade</h2>
                <p className="section-desc">Rich, warm editorial cinema. Deep shadows with champagne highlights and protected skin tones. The grade should feel premium and timeless.</p>

                <div className="palette-strip">
                    <div className="palette-swatch" style={{ background: '#0A0E1A' }}><span className="swatch-label" style={{ color: '#64748B' }}>Deep Midnight</span><span className="swatch-hex" style={{ color: '#64748B' }}>#0A0E1A</span></div>
                    <div className="palette-swatch" style={{ background: '#1E293B' }}><span className="swatch-label" style={{ color: '#94A3B8' }}>Slate Navy</span><span className="swatch-hex" style={{ color: '#94A3B8' }}>#1E293B</span></div>
                    <div className="palette-swatch" style={{ background: '#334155' }}><span className="swatch-label" style={{ color: '#F1F5F9' }}>Steel</span><span className="swatch-hex" style={{ color: '#F1F5F9' }}>#334155</span></div>
                    <div className="palette-swatch" style={{ background: '#D4A843' }}><span className="swatch-label" style={{ color: '#0A0E1A' }}>Prestige Gold</span><span className="swatch-hex" style={{ color: '#0A0E1A' }}>#D4A843</span></div>
                    <div className="palette-swatch" style={{ background: '#F0E6D3' }}><span className="swatch-label" style={{ color: '#1E293B' }}>Champagne</span><span className="swatch-hex" style={{ color: '#1E293B' }}>#F0E6D3</span></div>
                    <div className="palette-swatch" style={{ background: '#F8FAFC' }}><span className="swatch-label" style={{ color: '#1E293B' }}>Ivory</span><span className="swatch-hex" style={{ color: '#1E293B' }}>#F8FAFC</span></div>
                </div>

                <div className="grade-grid">
                    <div className="grade-item"><h4>Shadows</h4><p>Deep navy-black with subtle warmth. Never crushed, never muddy. Lifted blacks with teal undertones for cinematic depth.</p></div>
                    <div className="grade-item"><h4>Skin Tones</h4><p>Protected and warm — golden olive base, never orange or pink. Pull global saturation 10-15%, then selectively boost skin warmth.</p></div>
                    <div className="grade-item"><h4>Highlights</h4><p>Champagne roll-off — warm, never blown. Stage lights get a halation glow. Kodak 5219 film emulation at 25-35%.</p></div>
                    <div className="grade-item"><h4>Stage Lighting</h4><p>Respect the venue&apos;s lighting design — use it, don&apos;t fight it. Spot-meter for speaker skin, let backgrounds fall naturally.</p></div>
                </div>
            </section>

            <div className="divider"></div>

            {/* SHOT ARCHITECTURE */}
            <section className="proposal-section fade-in">
                <div className="section-label">Shot Architecture</div>
                <h2 className="section-title">Scene-by-scene vision</h2>
                <p className="section-desc">Every shot has a purpose in the final edit. We capture with the edit in mind — wide establishes, mediums for context, close-ups for emotion.</p>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--gold)', marginBottom: 8 }}>Main Stage — Keynote Coverage</h3>
                <p style={{ fontSize: 12, color: 'var(--steel)', marginBottom: 0 }}>Multi-cam positions, hero angles</p>
                <div className="shot-list">
                    <div className="shot-list-header"><span>#</span><span>Shot</span><span>Type</span><span>FPS</span></div>
                    <div className="shot-row"><span className="shot-num">01</span><span className="shot-name">Stage wide — full set + audience</span><span className="shot-type">Wide / establishing</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">02</span><span className="shot-name">Speaker MCU — direct to audience</span><span className="shot-type">Medium close-up</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">03</span><span className="shot-name">Crowd reaction — engaged attendees</span><span className="shot-type">Medium / CU</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">04</span><span className="shot-name">Speaker hands + gestures</span><span className="shot-type">CU detail</span><span className="shot-fps">60fps</span></div>
                    <div className="shot-row"><span className="shot-num">05</span><span className="shot-name">LED screen content + speaker silhouette</span><span className="shot-type">Wide / artistic</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">06</span><span className="shot-name">Standing ovation / applause</span><span className="shot-type">Wide + CU</span><span className="shot-fps">60fps</span></div>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--gold)', marginTop: 60, marginBottom: 8 }}>Expo Floor + Networking</h3>
                <p style={{ fontSize: 12, color: 'var(--steel)', marginBottom: 0 }}>Handheld energy, booth coverage, B-roll</p>
                <div className="shot-list">
                    <div className="shot-list-header"><span>#</span><span>Shot</span><span>Type</span><span>FPS</span></div>
                    <div className="shot-row"><span className="shot-num">07</span><span className="shot-name">Booth walkthrough — gimbal tracking</span><span className="shot-type">Tracking / medium</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">08</span><span className="shot-name">Vendor demo + attendee reaction</span><span className="shot-type">Medium / OTS</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">09</span><span className="shot-name">Handshake / business card exchange</span><span className="shot-type">CU detail</span><span className="shot-fps">60fps</span></div>
                    <div className="shot-row"><span className="shot-num">10</span><span className="shot-name">Hallway crowd — depth compression</span><span className="shot-type">Telephoto / wide open</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">11</span><span className="shot-name">Attendee interviews — branded frame</span><span className="shot-type">MCU locked tripod</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">12</span><span className="shot-name">Branding details — signage, badges, swag</span><span className="shot-type">Macro / CU</span><span className="shot-fps">60fps</span></div>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--gold)', marginTop: 60, marginBottom: 8 }}>Exteriors + Drone</h3>
                <p style={{ fontSize: 12, color: 'var(--steel)', marginBottom: 0 }}>Golden hour window — venue establishing</p>
                <div className="shot-list">
                    <div className="shot-list-header"><span>#</span><span>Shot</span><span>Type</span><span>FPS</span></div>
                    <div className="shot-row"><span className="shot-num">13</span><span className="shot-name">Drone orbit — venue full exterior</span><span className="shot-type">Aerial / orbit</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">14</span><span className="shot-name">Drone pull-up reveal — parking + venue</span><span className="shot-type">Aerial / ascend</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">15</span><span className="shot-name">Ground level — guests arriving, valet</span><span className="shot-type">Wide / tracking</span><span className="shot-fps">24fps</span></div>
                    <div className="shot-row"><span className="shot-num">16</span><span className="shot-name">Sunset behind venue — hold + timelapse</span><span className="shot-type">Locked tripod</span><span className="shot-fps">24fps + TL</span></div>
                </div>
            </section>

            <div className="divider"></div>

            {/* EQUIPMENT */}
            <section className="proposal-section fade-in">
                <div className="section-label">Production Kit</div>
                <h2 className="section-title">The gear behind the look</h2>
                <p className="section-desc">Professional cinema equipment deployed for maximum flexibility across stage, floor, and aerial environments.</p>

                <div className="equip-grid">
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: 'var(--gold)' }}>✦ Camera A — Hero</div>
                        <h3>Sony FX6</h3>
                        <p>Full-frame cinema body for stage and interviews. S-Log3 / S-Gamut3.Cine.</p>
                        <ul><li>24-70mm f/2.8 GM</li><li>85mm f/1.4 GM</li><li>4K 120fps capable</li><li>XAVC-I 4:2:2 10-bit</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#7BE87B' }}>✦ Camera B — Run &amp; Gun</div>
                        <h3>Sony A7S III</h3>
                        <p>Gimbal-mounted B-cam for floor coverage and dynamic B-roll.</p>
                        <ul><li>Sigma 24-70mm f/2.8 Art</li><li>DJI RS3 Pro gimbal</li><li>Low-light monster</li><li>S-Log3 matched to A-cam</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#60A5FA' }}>✦ Aerial</div>
                        <h3>DJI Mavic 3 Pro</h3>
                        <p>Triple-lens drone for establishing shots. FAA Part 107 certified.</p>
                        <ul><li>Hasselblad 24mm wide</li><li>70mm telephoto</li><li>D-Log M for color matching</li><li>43-min flight time</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#F472B6' }}>✦ Audio</div>
                        <h3>Dual Recording</h3>
                        <p>Board feed + wireless lavs for keynotes. Boom + lav for interviews.</p>
                        <ul><li>Sennheiser EW-D wireless ×2</li><li>XLR board feed</li><li>Rode NTG5 shotgun</li><li>Zoom F6 32-bit float</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: '#FBBF24' }}>✦ Lighting</div>
                        <h3>Interview Kit</h3>
                        <p>Portable lighting for branded interview station.</p>
                        <ul><li>Aputure 300d III + 36&quot; Lantern</li><li>Aputure MC RGB fill</li><li>4×4 neg fill flag</li><li>Branded backdrop</li></ul>
                    </div>
                    <div className="equip-card">
                        <div className="card-icon" style={{ color: 'var(--champagne)' }}>✦ Support</div>
                        <h3>Stabilization + Grip</h3>
                        <p>Professional support for cinematic movement.</p>
                        <ul><li>DJI RS3 Pro gimbal</li><li>Sachtler Ace tripod</li><li>Slider 24&quot;</li><li>V-mount batteries</li></ul>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* PRODUCTION SCHEDULE */}
            <section className="proposal-section fade-in">
                <div className="section-label">Production Schedule</div>
                <h2 className="section-title">Structured for maximum coverage.</h2>
                <p className="section-desc">Every hour is pre-planned with shot priorities. Crew moves with purpose — stage for authority, floor for energy, exterior for scale.</p>

                <div className="schedule-block">
                    <div className="schedule-day">Day One</div>
                    <div className="schedule-meta">Full Day — Convention Main Event (~10 hours)</div>
                    <div className="timeline">
                        <div className="timeline-item"><div className="timeline-time">7:00 – 8:00 AM</div><div className="timeline-title">Arrive + Setup</div><div className="timeline-desc">Scout venue lighting, position A-cam for keynote, set up interview station, test audio board feed.</div></div>
                        <div className="timeline-item"><div className="timeline-time">8:00 – 8:30 AM</div><div className="timeline-title">Arrival B-Roll</div><div className="timeline-desc">Guests arriving, registration area, badge scanning, signage details, venue establishing shots.</div></div>
                        <div className="timeline-item"><div className="timeline-time">9:00 AM – 12:00 PM</div><div className="timeline-title">Keynote Coverage — Multi-Cam</div><div className="timeline-desc">A-cam locked on hero angle, B-cam on gimbal for crowd reactions and stage wides. Board audio + wireless lav backup.</div></div>
                        <div className="timeline-item"><div className="timeline-time">12:00 – 1:00 PM</div><div className="timeline-title">Lunch + Card Swap</div><div className="timeline-desc">Offload media to backup drives. Recharge batteries. Review hero shots on monitor.</div></div>
                        <div className="timeline-item"><div className="timeline-time">1:00 – 4:00 PM</div><div className="timeline-title">Expo Floor + Booth Coverage</div><div className="timeline-desc">Gimbal walkthroughs, vendor interactions, branded detail macro shots, networking candids.</div></div>
                        <div className="timeline-item"><div className="timeline-time">4:00 – 5:30 PM</div><div className="timeline-title">Attendee Interviews</div><div className="timeline-desc">Branded interview station. 8–12 attendees, 2–3 minutes each. Controlled lighting, consistent framing.</div></div>
                        <div className="timeline-item"><div className="timeline-time">5:30 – 6:30 PM</div><div className="timeline-title">Drone + Exterior — Golden Hour</div><div className="timeline-desc">Venue orbit, pull-up reveal, sunset timelapse. Ground-level guest departure, valet activity.</div></div>
                    </div>
                </div>

                <div className="schedule-block">
                    <div className="schedule-day">Day Two</div>
                    <div className="schedule-meta">Half Day — Breakouts + VIP (~5 hours) · Premier Package Only</div>
                    <div className="timeline">
                        <div className="timeline-item"><div className="timeline-time">9:00 – 11:00 AM</div><div className="timeline-title">Breakout Sessions</div><div className="timeline-desc">Panel multi-cam coverage, speaker spotlights, Q&amp;A moments.</div></div>
                        <div className="timeline-item"><div className="timeline-time">11:00 AM – 1:00 PM</div><div className="timeline-title">Sponsor Content + Award Ceremony</div><div className="timeline-desc">Sponsor booth deep-dives, branded montages, awards presentation coverage.</div></div>
                        <div className="timeline-item"><div className="timeline-time">6:00 – 8:00 PM</div><div className="timeline-title">VIP Reception — Evening</div><div className="timeline-desc">Intimate cocktail coverage. Shallow DOF, champagne pour slow-mo, ambient candids.</div></div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* PACKAGES */}
            <section className="proposal-section fade-in">
                <div className="section-label">Investment</div>
                <h2 className="section-title">Choose your coverage scope</h2>
                <p className="section-desc">All tiers include professional cinema equipment, FAA-certified drone pilot, and organized raw footage delivery.</p>

                <div className="packages">
                    <div className="package-card">
                        <div className="package-name">Essentials</div>
                        <div className="package-price">
                            <span className="amount">$3,500</span>
                            <br /><span style={{ fontSize: 11, color: 'var(--stone)' }}>half-day coverage</span>
                        </div>
                        <ul className="package-features">
                            <li>Half-day shoot (up to 5 hours)</li>
                            <li>1 camera operator</li>
                            <li>Sizzle reel (3–5 min, color graded)</li>
                            <li>Social clip pack (10 vertical clips)</li>
                            <li>Raw event footage (organized drive)</li>
                            <li>1 revision round</li>
                            <li className="excluded">Keynote multi-cam</li>
                            <li className="excluded">Attendee interviews</li>
                            <li className="excluded">After-movie cinematic</li>
                            <li className="excluded">Drone coverage</li>
                            <li className="excluded">Day 2 coverage</li>
                        </ul>
                    </div>
                    <div className="package-card recommended">
                        <div className="recommended-badge">Recommended</div>
                        <div className="package-name">Professional</div>
                        <div className="package-price">
                            <span className="amount">$6,800</span>
                            <br /><span style={{ fontSize: 11, color: 'var(--stone)' }}>full-day coverage</span>
                        </div>
                        <ul className="package-features">
                            <li>Full-day shoot (up to 10 hours)</li>
                            <li>2 camera operators</li>
                            <li>Sizzle reel (3–5 min, motion GFX)</li>
                            <li>Keynote multi-cam edit w/ overlays</li>
                            <li>Attendee interview package (branded)</li>
                            <li>Social clip pack (15 vertical clips)</li>
                            <li>Drone aerial coverage (golden hour)</li>
                            <li>All raw footage + room tone</li>
                            <li>2 revision rounds</li>
                            <li className="excluded">After-movie cinematic</li>
                            <li className="excluded">Day 2 breakouts + VIP</li>
                        </ul>
                    </div>
                    <div className="package-card">
                        <div className="package-name">Premier</div>
                        <div className="package-price">
                            <span className="amount">$12,000</span>
                            <br /><span style={{ fontSize: 11, color: 'var(--stone)' }}>multi-day coverage</span>
                        </div>
                        <ul className="package-features">
                            <li>2-day full coverage (up to 16 hours)</li>
                            <li>2 camera operators + creative director</li>
                            <li>Sizzle reel (5–8 min, premium finish)</li>
                            <li>Keynote multi-cam edit w/ overlays</li>
                            <li>After-movie cinematic wrap (5–8 min)</li>
                            <li>Attendee interview package (branded)</li>
                            <li>Speaker spotlight edits (per speaker)</li>
                            <li>Daily recap reels for social</li>
                            <li>Sponsor highlight montage</li>
                            <li>Drone aerial coverage (both days)</li>
                            <li>Multi-platform livestreaming</li>
                            <li>Social clip pack (25+ clips)</li>
                            <li>All raw footage + room tone</li>
                            <li>3 revision rounds</li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer className="proposal-footer">
                <div className="footer-logo">MediaGeekz</div>
                <div className="footer-tagline">Cinematic stories. Elevated brands.</div>
            </footer>
        </>
    );
}
