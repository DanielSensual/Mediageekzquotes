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
        { slug: 'fast-cut-energy', name: 'Fast-Cut Energy Reel (30-60s, beat-synced)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 0 },
        { slug: 'dj-set-capture', name: 'DJ / Live Set Capture w/ Waveform Overlay', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 1 },
        { slug: 'venue-walkthrough-music', name: 'Venue Walkthrough (music-synced, 60-90s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 2 },
        { slug: 'crowd-pov-montage', name: 'Crowd POV Montage (GoPro + gimbal)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 3 },
        { slug: 'vip-table-promo', name: 'VIP / Bottle Service Promo', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 4 },
        { slug: 'event-recap-24hr', name: 'Full Event Recap — 24hr Turnaround (3-5 min)', category: 'deliverable', standard: 1000, senior: 1600, mode: 'boolean', sort: 5 },
        { slug: 'ig-story-pack', name: 'IG Story Pack (10 branded stories)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 6 },
        { slug: 'raw-event-footage', name: 'Raw Event Footage (timestamped)', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'second-shooter', name: 'Second Videographer', price: 500, unit: 'day', sort: 1 },
        { slug: 'photo-coverage', name: 'Event Photo Coverage', price: 600, unit: 'day', sort: 2 },
        { slug: 'led-wall-content', name: 'LED Wall / Projection Content', price: 400, unit: 'session', sort: 3 },
    ],
};
