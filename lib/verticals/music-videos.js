/**
 * Vertical Template — Music Video Production
 * =============================================
 * Cinematic performance edits, narrative concepts, VFX, creative direction.
 * Rates based on Orlando MSA market research ($5,000–$12,000 project range).
 */

module.exports = {
    slug: 'music-videos',
    name: 'Music Video Production',
    icon: '🎵',

    coverage: { halfDay: 800, fullDay: 1600, overtime: 350 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 150 },

    services: [
        { slug: 'performance-edit', name: 'Performance Edit (3-5 min)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 0 },
        { slug: 'narrative-edit', name: 'Narrative / Concept Edit (3-5 min)', category: 'deliverable', standard: 2500, senior: 4000, mode: 'boolean', sort: 1 },
        { slug: 'lyric-video', name: 'Lyric Video (animated text)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 2 },
        { slug: 'bts-featurette', name: 'Behind-the-Scenes Featurette (2-3 min)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 3 },
        { slug: 'social-teasers', name: 'Social Media Teasers (5 clips, 15-60s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 4 },
        { slug: 'directors-cut', name: 'Director\'s Cut (extended edit)', category: 'deliverable', standard: 1800, senior: 3000, mode: 'boolean', sort: 5 },
        { slug: 'raw-footage', name: 'Raw Footage Handover (includes hard drive)', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 6 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'vfx-color-grade', name: 'VFX & Advanced Color Grading', price: 800, unit: 'day', sort: 1 },
        { slug: 'makeup-styling', name: 'Makeup Artist / Wardrobe Styling', price: 400, unit: 'day', sort: 2 },
        { slug: 'location-scout', name: 'Location Scouting & Permitting', price: 350, unit: 'session', sort: 3 },
        { slug: 'choreographer', name: 'Choreographer / Movement Director', price: 500, unit: 'day', sort: 4 },
    ],
};
