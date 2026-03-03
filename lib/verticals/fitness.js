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
        { slug: 'speed-ramp-promo', name: 'Speed Ramp Slow-Mo Gym Promo (30-60s)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 0 },
        { slug: 'trainer-intro-reel', name: 'Trainer Intro Reel w/ Stats Overlay', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 1 },
        { slug: 'form-breakdown', name: 'Exercise Form Breakdown (slo-mo + annotation)', category: 'deliverable', standard: 350, senior: 550, mode: 'quantity', sort: 2 },
        { slug: 'transformation-edit', name: 'Transformation Before/After w/ Motion Graphics', category: 'deliverable', standard: 700, senior: 1100, mode: 'boolean', sort: 3 },
        { slug: 'class-schedule-promo', name: 'Class Schedule / Weekly Promo (animated)', category: 'deliverable', standard: 300, senior: 500, mode: 'boolean', sort: 4 },
        { slug: 'workout-series', name: 'IGTV / YouTube Workout Series Episode', category: 'deliverable', standard: 450, senior: 700, mode: 'quantity', sort: 5 },
        { slug: 'facility-flythrough', name: 'Facility Flythrough (drone + gimbal stitch)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 6 },
        { slug: 'raw-gym-footage', name: 'Raw Footage + B-Roll Selects', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'athlete-model', name: 'Athlete / Fitness Model', price: 400, unit: 'day', sort: 1 },
        { slug: 'makeup-styling', name: 'Makeup Artist / Styling', price: 400, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
