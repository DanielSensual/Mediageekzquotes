/**
 * Vertical Template — Fitness / Gym Promos
 * ==========================================
 * High-energy gym promos, trainer spotlights, transformation videos.
 * Rates based on Orlando MSA market research ($1,000–$2,500 range).
 */

module.exports = {
    slug: 'fitness',
    name: 'Fitness & Gym Video',
    icon: '💪',

    coverage: { halfDay: 800, fullDay: 1600, overtime: 300 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'gym-promo', name: 'Gym Promo Video (30-60s)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 0 },
        { slug: 'trainer-spotlight', name: 'Trainer Spotlight (2-3 min)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 1 },
        { slug: 'class-highlight', name: 'Class / Session Highlight Reel', category: 'deliverable', standard: 450, senior: 700, mode: 'boolean', sort: 2 },
        { slug: 'transformation', name: 'Transformation / Testimonial Video', category: 'deliverable', standard: 700, senior: 1100, mode: 'boolean', sort: 3 },
        { slug: 'social-clip-pack', name: 'Social Media Clip Pack (5 clips)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 4 },
        { slug: 'facility-tour', name: 'Facility Tour (2-4 min)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 5 },
        { slug: 'workout-tutorial', name: 'Workout Tutorial / How-To', category: 'deliverable', standard: 350, senior: 550, mode: 'quantity', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'athlete-model', name: 'Athlete / Fitness Model', price: 400, unit: 'day', sort: 1 },
        { slug: 'makeup-styling', name: 'Makeup Artist / Styling', price: 400, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
