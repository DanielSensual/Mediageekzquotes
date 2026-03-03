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
        { slug: 'plating-montage', name: 'Plating Close-Up Montage w/ Steam & Sizzle FX', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 0 },
        { slug: 'ambiance-mood-reel', name: 'Ambiance Mood Reel (30-60s, music-synced)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 1 },
        { slug: 'chefs-table-pov', name: 'Chef\'s Table POV (kitchen action + interview)', category: 'deliverable', standard: 450, senior: 750, mode: 'boolean', sort: 2 },
        { slug: 'cocktail-craft', name: 'Cocktail Craft Sequence (slow-mo pour + garnish)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 3 },
        { slug: 'delivery-app-menu', name: 'UberEats / DoorDash Menu Video (per item)', category: 'deliverable', standard: 100, senior: 150, mode: 'quantity', sort: 4 },
        { slug: 'grand-opening-edit', name: 'Grand Opening Cinematic Edit (2-3 min)', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 5 },
        { slug: 'reservation-cta', name: 'Reservation CTA Bumper (15s, multi-platform)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 6 },
        { slug: 'raw-food-footage', name: 'Raw Footage + Food Photography Selects', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial / Exterior Coverage', price: 450, unit: 'hour', sort: 0 },
        { slug: 'food-stylist', name: 'Food Stylist', price: 350, unit: 'session', sort: 1 },
        { slug: 'photo-coverage', name: 'Food Photography (stills)', price: 500, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
