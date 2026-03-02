/**
 * Vertical Template — Nightlife / Event Coverage
 * =================================================
 * Club nights, festivals, DJ sets, venue promos, quick-turn highlight reels.
 * Rates based on Orlando MSA market research ($800–$1,600 range).
 */

module.exports = {
    slug: 'nightlife',
    name: 'Nightlife & Events',
    icon: '🌃',

    coverage: { halfDay: 600, fullDay: 1200, overtime: 250 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 150 },

    services: [
        { slug: 'highlight-reel', name: 'Event Highlight Reel (1-2 min)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 0 },
        { slug: 'dj-performance', name: 'DJ / Artist Performance Capture', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 1 },
        { slug: 'venue-promo', name: 'Venue Promo Video (30-60s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 2 },
        { slug: 'social-clips', name: 'Social Media Clips (5 quick-turn clips)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 3 },
        { slug: 'recap-reel', name: 'Full Event Recap (3-5 min)', category: 'deliverable', standard: 1000, senior: 1600, mode: 'boolean', sort: 4 },
        { slug: 'crowd-montage', name: 'Crowd / Atmosphere Montage (15-30s)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 5 },
        { slug: 'raw-footage', name: 'Raw Footage Handover', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 6 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'second-shooter', name: 'Second Videographer', price: 500, unit: 'day', sort: 1 },
        { slug: 'photo-coverage', name: 'Event Photo Coverage', price: 600, unit: 'day', sort: 2 },
        { slug: 'led-wall-content', name: 'LED Wall / Projection Content', price: 400, unit: 'session', sort: 3 },
    ],
};
