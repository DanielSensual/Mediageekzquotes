/**
 * Vertical Template — Agency Partner (Private)
 * =================================================
 * Internal rate card for partner agencies that outsource video production.
 * Pricing validated against Orlando market data (March 2026).
 *
 * This card is NOT seeded into the DB — it's imported directly by the
 * /agency page and fed into calculateQuote() as a static RateCard.
 */

module.exports = {
    slug: 'agency',
    name: 'Agency Partner',
    icon: '🤝',

    coverage: { halfDay: 750, fullDay: 1000, overtime: 185 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 200 },

    services: [
        // ── Project Types / Deliverables ──────────────────────────
        { slug: 'brand-video',          name: 'Brand Story Video (2-4 min)',                   category: 'deliverable', standard: 2500, senior: 4000, mode: 'boolean', sort: 0 },
        { slug: 'brand-video-premium',  name: 'Brand Film — Premium (3-6 min, heavier post)',  category: 'deliverable', standard: 5000, senior: 7500, mode: 'boolean', sort: 1 },
        { slug: 'product-demo',         name: 'Product / Service Demo (1-3 min)',               category: 'deliverable', standard: 1800, senior: 3000, mode: 'boolean', sort: 2 },
        { slug: 'testimonial-single',   name: 'Single Testimonial Edit (60-90 sec)',            category: 'deliverable', standard: 800,  senior: 1300, mode: 'quantity', sort: 3 },
        { slug: 'testimonial-montage',  name: 'Testimonial Montage / Multi-Interview Reel',    category: 'deliverable', standard: 2000, senior: 3200, mode: 'boolean', sort: 4 },
        { slug: 'social-5',             name: 'Social Media Package — 5 Clips',                category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 5 },
        { slug: 'social-10',            name: 'Social Media Package — 10 Clips',               category: 'deliverable', standard: 2000, senior: 3200, mode: 'boolean', sort: 6 },
        { slug: 'event-highlight',      name: 'Event / Launch Highlight Reel (3-5 min)',       category: 'deliverable', standard: 2000, senior: 3500, mode: 'boolean', sort: 7 },
        { slug: 'training-short',       name: 'Training Video — Short (up to 5 min)',          category: 'deliverable', standard: 2200, senior: 3500, mode: 'boolean', sort: 8 },
        { slug: 'training-long',        name: 'Training Video — Long (5-15 min, sections)',    category: 'deliverable', standard: 4500, senior: 6500, mode: 'boolean', sort: 9 },
        { slug: 'promo-standard',       name: 'Promo Spot / Standard Edit (30-60 sec)',        category: 'deliverable', standard: 3000, senior: 5000, mode: 'boolean', sort: 10 },
        { slug: 'promo-commercial',     name: 'Commercial — Heavy Post / Motion (30-60 sec)',  category: 'deliverable', standard: 5500, senior: 8000, mode: 'boolean', sort: 11 },
        { slug: 'social-cut',           name: 'Social Cut (Reel / TikTok / Short)',            category: 'deliverable', standard: 350,  senior: 550,  mode: 'quantity', sort: 12 },
        { slug: 'raw-footage',          name: 'Raw Footage Archive Drive',                     category: 'footage',     standard: 300,  senior: 300,  mode: 'boolean', sort: 13 },

        // ── Post-Production Extras ───────────────────────────────
        { slug: 'color-grade',       name: 'Cinema Color Grade (per deliverable)',         category: 'post', standard: 250,  senior: 400,  mode: 'quantity', sort: 14 },
        { slug: 'motion-graphics',   name: 'Custom Motion Graphics / Lower Thirds',       category: 'post', standard: 600,  senior: 1000, mode: 'boolean', sort: 15 },
        { slug: 'voiceover',         name: 'Professional Voice-Over Recording',           category: 'post', standard: 400,  senior: 400,  mode: 'boolean', sort: 16 },
        { slug: 'captions',          name: 'Captions / Subtitles / Transcription',        category: 'post', standard: 150,  senior: 150,  mode: 'quantity', sort: 17 },
        { slug: 'music-license',     name: 'Music Licensing (per track)',                 category: 'post', standard: 200,  senior: 200,  mode: 'quantity', sort: 18 },
        { slug: 'stock-assets',      name: 'Stock Footage / Photos (per batch)',          category: 'post', standard: 150,  senior: 150,  mode: 'quantity', sort: 19 },
        { slug: 'aspect-versions',   name: 'Additional Aspect Ratio Version (16:9→9:16)', category: 'post', standard: 200,  senior: 350,  mode: 'quantity', sort: 20 },
        { slug: 'revision-round',    name: 'Additional Revision Round — Short-Form',      category: 'post', standard: 250,  senior: 400,  mode: 'quantity', sort: 21 },
        { slug: 'revision-long',     name: 'Additional Revision Round — Long-Form',       category: 'post', standard: 450,  senior: 600,  mode: 'quantity', sort: 22 },
    ],

    addOns: [
        // ── Additional Crew ──────────────────────────────────────
        { slug: 'director',        name: 'Creative Director',                    price: 1500, unit: 'day', sort: 0,
          desc: 'Pre-production planning, shot lists, mood boards, on-set direction, talent coaching & full creative oversight' },
        { slug: 'producer',        name: 'Producer / Project Manager',           price: 800,  unit: 'day', sort: 1,
          desc: 'Scheduling, call sheets, location coordination, client comms, talent wrangling, releases & logistics' },
        { slug: '2nd-camera',      name: 'Additional Camera Operator',           price: 600,  unit: 'day', sort: 2,
          desc: 'Second angle coverage — operates independently, no creative direction included' },
        { slug: 'ac',              name: 'Assistant Camera (AC / Focus Pull)',    price: 350,  unit: 'day', sort: 3,
          desc: 'Focus pulling, lens changes, camera setup & breakdown, media management' },
        { slug: 'gaffer',          name: 'Gaffer / Lighting Tech',               price: 400,  unit: 'day', sort: 4,
          desc: 'Lighting design & setup, power management, gel & diffusion work' },
        { slug: 'grip',            name: 'Grip (Slider, Dolly, Rigging)',        price: 350,  unit: 'day', sort: 5,
          desc: 'Camera support systems — dolly, slider, jib, c-stands, flags & rigging' },
        { slug: 'sound-mixer',     name: 'Location Sound Mixer',                 price: 650,  unit: 'day', sort: 6,
          desc: 'Professional sound recordist — mixing, monitoring, boom operation & talent comms' },
        { slug: 'photographer',    name: 'Photographer (Stills)',                price: 600,  unit: 'day', sort: 7,
          desc: 'Behind-the-scenes stills, headshots, product photography during production' },
        { slug: 'pa',              name: 'Production Assistant (PA)',             price: 200,  unit: 'day', sort: 8,
          desc: 'General support — equipment loading, craft services, talent wrangling, errands' },
        { slug: 'mua',             name: 'Hair & Makeup Artist (MUA)',           price: 450,  unit: 'day', sort: 9,
          desc: 'On-set hair & makeup for talent — touch-ups between takes' },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator',                price: 450,  unit: 'day', sort: 10,
          desc: 'Teleprompter setup, speed control & script management for on-camera talent' },

        // ── Equipment / Packages ─────────────────────────────────
        { slug: 'cinema-camera',   name: 'Cinema Camera Upgrade (RED/ARRI)',      price: 500,  unit: 'day', sort: 11,
          desc: 'Upgrade from standard camera to cinema-grade body — does not include operator' },
        { slug: 'b-cam-package',   name: 'Second Camera Package (body + support)', price: 400,  unit: 'day', sort: 12,
          desc: 'B-camera body, lens, tripod/monopod, batteries & media — pairs with Additional Cam Op' },
        { slug: 'audio-kit',       name: 'Audio / Interview Kit',                 price: 400,  unit: 'day', sort: 13,
          desc: 'Lavs, boom, mixer/recorder, IFB/timecode & cables — pairs with Sound Mixer' },
        { slug: 'lighting-kit',    name: 'Lighting Package',                      price: 300,  unit: 'day', sort: 14,
          desc: 'LED panel kit, stands, diffusion & gels — basic 2-3 light interview/product setup' },
        { slug: 'drone',           name: 'Drone — First Hour (FAA Part 107)',     price: 450,  unit: 'hour', sort: 15,
          desc: 'Aerial cinematography — includes pilot, drone, setup & airspace clearance' },
        { slug: 'slider-gimbal',   name: 'Slider / Gimbal Stabilizer',            price: 200,  unit: 'day', sort: 16 },
        { slug: 'teleprompter',    name: 'Teleprompter Gear',                     price: 200,  unit: 'day', sort: 17,
          desc: 'Camera-mounted or floor-standing prompter hardware' },
        { slug: 'studio-basic',    name: 'Studio — Practical / Small Space',      price: 600,  unit: 'day', sort: 18,
          desc: 'Basic practical location or small studio rental — no cyc wall' },
        { slug: 'studio-full',     name: 'Studio — Full Stage / Cyc Wall',        price: 1200, unit: 'day', sort: 19,
          desc: 'Production-ready studio with cyc wall, power, green room & load-in' },
    ],
};
