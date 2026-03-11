/**
 * Vertical Template — Agency Partner (Private)
 * =================================================
 * Internal rate card for partner agencies that outsource video production.
 * Covers the most common project types, crew roles, and equipment.
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
        { slug: 'brand-video',       name: 'Brand Story Video (2-4 min)',                 category: 'deliverable', standard: 2500, senior: 4000, mode: 'boolean', sort: 0 },
        { slug: 'product-demo',      name: 'Product / Service Demo (1-3 min)',             category: 'deliverable', standard: 1800, senior: 3000, mode: 'boolean', sort: 1 },
        { slug: 'testimonial-reel',  name: 'Client Testimonial Reel (per interview)',      category: 'deliverable', standard: 800,  senior: 1300, mode: 'quantity', sort: 2 },
        { slug: 'social-package',    name: 'Social Media Content Package (5-10 clips)',    category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 3 },
        { slug: 'event-highlight',   name: 'Event / Launch Highlight Reel (3-5 min)',      category: 'deliverable', standard: 2000, senior: 3500, mode: 'boolean', sort: 4 },
        { slug: 'training-video',    name: 'Training / Internal Comms Video (5-15 min)',   category: 'deliverable', standard: 2200, senior: 3800, mode: 'boolean', sort: 5 },
        { slug: 'promo-commercial',  name: 'Commercial / Promo Spot (30-60 sec)',          category: 'deliverable', standard: 3000, senior: 5000, mode: 'boolean', sort: 6 },
        { slug: 'social-cut',        name: 'Social Cut (Reel / TikTok / Short)',           category: 'deliverable', standard: 350,  senior: 550,  mode: 'quantity', sort: 7 },
        { slug: 'raw-footage',       name: 'Raw Footage Archive Drive',                   category: 'footage',     standard: 300,  senior: 300,  mode: 'boolean', sort: 8 },

        // ── Post-Production Extras ───────────────────────────────
        { slug: 'color-grade',       name: 'Cinema Color Grade (per deliverable)',         category: 'post',        standard: 250,  senior: 400,  mode: 'quantity', sort: 9 },
        { slug: 'motion-graphics',   name: 'Custom Motion Graphics / Lower Thirds',       category: 'post',        standard: 600,  senior: 1000, mode: 'boolean', sort: 10 },
        { slug: 'voiceover',         name: 'Professional Voice-Over Recording',           category: 'post',        standard: 400,  senior: 400,  mode: 'boolean', sort: 11 },
        { slug: 'revision-round',    name: 'Additional Revision Round (per round)',        category: 'post',        standard: 200,  senior: 350,  mode: 'quantity', sort: 12 },
    ],

    addOns: [
        // ── Additional Crew ──────────────────────────────────────
        { slug: 'director',        name: 'Creative Director',                 price: 1500, unit: 'day', sort: 0,
          desc: 'Pre-production planning, shot lists, mood boards, on-set direction, talent coaching & full creative oversight' },
        { slug: '2nd-camera',      name: 'Additional Camera Operator',        price: 600,  unit: 'day', sort: 1,
          desc: 'Second angle coverage — operates independently, no creative direction included' },
        { slug: 'ac',              name: 'Assistant Camera (AC / Focus Pull)', price: 350,  unit: 'day', sort: 2,
          desc: 'Focus pulling, lens changes, camera setup & breakdown, media management' },
        { slug: 'gaffer',          name: 'Gaffer / Lighting Tech',            price: 400,  unit: 'day', sort: 3,
          desc: 'Lighting design & setup, power management, gel & diffusion work' },
        { slug: 'grip',            name: 'Grip (Slider, Dolly, Rigging)',     price: 350,  unit: 'day', sort: 4,
          desc: 'Camera support systems — dolly, slider, jib, c-stands, flags & rigging' },
        { slug: 'sound-tech',      name: 'Sound / Audio Technician',          price: 400,  unit: 'day', sort: 5,
          desc: 'Lavs, boom, mixing, monitoring — clean production audio capture' },
        { slug: 'photographer',    name: 'Photographer (Stills)',             price: 600,  unit: 'day', sort: 6,
          desc: 'Behind-the-scenes stills, headshots, product photography during production' },
        { slug: 'pa',              name: 'Production Assistant (PA)',         price: 200,  unit: 'day', sort: 7,
          desc: 'General support — equipment loading, craft services, talent wrangling, errands' },
        { slug: 'mua',             name: 'Hair & Makeup Artist (MUA)',        price: 450,  unit: 'day', sort: 8,
          desc: 'On-set hair & makeup for talent — touch-ups between takes' },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator',             price: 350,  unit: 'day', sort: 9,
          desc: 'Teleprompter setup, speed control & script management for on-camera talent' },

        // ── Equipment ────────────────────────────────────────────
        { slug: 'cinema-camera',   name: 'Cinema Camera Package (RED/ARRI)', price: 500,  unit: 'day', sort: 10 },
        { slug: 'drone',           name: 'Drone Aerial Coverage (FAA 107)',   price: 450,  unit: 'hour', sort: 11 },
        { slug: 'lighting-kit',    name: 'Studio Lighting Kit',               price: 300,  unit: 'day', sort: 12 },
        { slug: 'slider-gimbal',   name: 'Slider / Gimbal Stabilizer',        price: 200,  unit: 'day', sort: 13 },
        { slug: 'teleprompter',    name: 'Teleprompter Gear',                 price: 150,  unit: 'day', sort: 14 },
        { slug: 'studio-rental',   name: 'Studio Rental',                     price: 600,  unit: 'day', sort: 15 },
    ],
};
