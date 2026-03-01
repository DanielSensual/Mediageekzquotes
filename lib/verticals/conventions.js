/**
 * Vertical Template — Conventions
 * ================================
 * Migrated from the original MediaGeekz DEFAULT_RATES.
 */

module.exports = {
    slug: 'conventions',
    name: 'Convention Videography',
    icon: '🎤',

    coverage: { halfDay: 850, fullDay: 1600, overtime: 300 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 150 },

    services: [
        { slug: 'social-teaser', name: 'Social Media Teaser (60s)', category: 'deliverable', standard: 350, senior: 500, mode: 'boolean', sort: 0 },
        { slug: 'basic-recap-reel', name: 'Basic Recap Reel (1-2 min)', category: 'deliverable', standard: 600, senior: 900, mode: 'boolean', sort: 1 },
        { slug: 'premium-recap-reel', name: 'Premium Recap Reel (3-5 min, color graded + motion GFX)', category: 'deliverable', standard: 1200, senior: 1800, mode: 'boolean', sort: 2 },
        { slug: 'basic-highlight', name: 'Basic Highlight Reel (2-3 min)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 3 },
        { slug: 'premium-highlight', name: 'Premium Highlight Reel (3-5 min, cinematic)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 4 },
        { slug: 'session-recording', name: 'Full Session Recording (light color/audio)', category: 'footage', standard: 200, senior: 300, mode: 'quantity', sort: 5 },
        { slug: 'second-camera-edit', name: 'Second Camera Angle Edit (multi-angle sync)', category: 'footage', standard: 300, senior: 400, mode: 'quantity', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover (includes hard drive)', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 1 },
        { slug: 'photo-coverage', name: 'Event Photo Coverage', price: 600, unit: 'day', sort: 2 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 3 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 4 },
    ],
};
