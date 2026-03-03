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
        { slug: 'multicam-performance', name: 'Multi-Cam Performance Sync Edit (3-5 min)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 0 },
        { slug: 'narrative-concept', name: 'Narrative / Storyline Concept Edit (3-5 min)', category: 'deliverable', standard: 2500, senior: 4000, mode: 'boolean', sort: 1 },
        { slug: 'cinema-color-grade', name: 'Cinema Color Grade + LUT Delivery', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 2 },
        { slug: 'vfx-composite', name: 'VFX Compositing (green screen, particles, overlays)', category: 'deliverable', standard: 800, senior: 1300, mode: 'boolean', sort: 3 },
        { slug: 'lyric-visualizer', name: 'Lyric Visualizer / Audio-Reactive Animation', category: 'deliverable', standard: 700, senior: 1100, mode: 'boolean', sort: 4 },
        { slug: 'bts-featurette', name: 'Behind-the-Scenes Featurette (2-3 min)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 5 },
        { slug: 'spotify-canvas', name: 'Spotify Canvas Loop (8s vertical loop)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 6 },
        { slug: 'distrokid-deliverables', name: 'DistroKid / Platform-Ready Exports (16:9 + 9:16)', category: 'footage', standard: 300, senior: 300, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'vfx-color-grade', name: 'VFX & Advanced Color Grading', price: 800, unit: 'day', sort: 1 },
        { slug: 'makeup-styling', name: 'Makeup Artist / Wardrobe Styling', price: 400, unit: 'day', sort: 2 },
        { slug: 'location-scout', name: 'Location Scouting & Permitting', price: 350, unit: 'session', sort: 3 },
        { slug: 'choreographer', name: 'Choreographer / Movement Director', price: 500, unit: 'day', sort: 4 },
    ],
};
