/**
 * Vertical Template — Restaurants
 * ================================
 */

module.exports = {
    slug: 'restaurants',
    name: 'Restaurant Video',
    icon: '🍽️',

    coverage: { halfDay: 700, fullDay: 1300, overtime: 250 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'menu-showcase', name: 'Menu Showcase Video (60-90s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 0 },
        { slug: 'ambiance-reel', name: 'Ambiance / Vibe Reel (30-60s)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 1 },
        { slug: 'chef-interview', name: 'Chef Interview + Behind-the-Scenes', category: 'deliverable', standard: 450, senior: 750, mode: 'boolean', sort: 2 },
        { slug: 'social-clip-pack', name: 'Social Media Clip Pack (5 clips)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 3 },
        { slug: 'grand-opening', name: 'Grand Opening Video', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 4 },
        { slug: 'seasonal-menu', name: 'Seasonal Menu Update', category: 'deliverable', standard: 300, senior: 500, mode: 'boolean', sort: 5 },
        { slug: 'google-business', name: 'Google Business Video Profile', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial / Exterior Coverage', price: 450, unit: 'hour', sort: 0 },
        { slug: 'food-stylist', name: 'Food Stylist', price: 350, unit: 'session', sort: 1 },
        { slug: 'photo-coverage', name: 'Food Photography (stills)', price: 500, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
