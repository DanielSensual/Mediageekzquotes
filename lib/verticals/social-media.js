/**
 * Vertical Template — Social Media Content
 * ==========================================
 */

module.exports = {
    slug: 'social-media',
    name: 'Social Media Content',
    icon: '📱',

    coverage: { halfDay: 750, fullDay: 1400, overtime: 250 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'reel-package', name: 'Reel Package (5 Reels, 15-60s each)', category: 'deliverable', standard: 750, senior: 1200, mode: 'boolean', sort: 0 },
        { slug: 'tiktok-content-day', name: 'TikTok Content Day (10+ clips)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 1 },
        { slug: 'youtube-edit', name: 'YouTube Video Edit (8-15 min)', category: 'deliverable', standard: 800, senior: 1400, mode: 'boolean', sort: 2 },
        { slug: 'brand-promo', name: 'Brand Promo (30-60s)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 3 },
        { slug: 'product-launch', name: 'Product Launch Video', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 4 },
        { slug: 'podcast-edit', name: 'Podcast Video Edit (per episode)', category: 'deliverable', standard: 300, senior: 500, mode: 'quantity', sort: 5 },
        { slug: 'thumbnail-intro', name: 'Thumbnail + Intro Package', category: 'deliverable', standard: 200, senior: 350, mode: 'boolean', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage', price: 450, unit: 'hour', sort: 0 },
        { slug: 'makeup-artist', name: 'Makeup Artist / Styling', price: 400, unit: 'day', sort: 1 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator', price: 350, unit: 'day', sort: 2 },
        { slug: 'studio-rental', name: 'Studio Rental', price: 500, unit: 'day', sort: 3 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 4 },
    ],
};
