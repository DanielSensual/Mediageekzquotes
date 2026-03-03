/**
 * Vertical Template — Weddings
 * =============================
 */

module.exports = {
    slug: 'weddings',
    name: 'Wedding Films',
    icon: '💒',

    coverage: { halfDay: 900, fullDay: 1800, overtime: 350 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 150 },

    services: [
        { slug: 'cinematic-highlights', name: 'Cinematic Highlights Film (3-5 min, color graded)', category: 'deliverable', standard: 1200, senior: 1800, mode: 'boolean', sort: 0 },
        { slug: 'full-ceremony-doc', name: 'Full Ceremony Documentary Edit (20-30 min)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 1 },
        { slug: 'love-story-doc', name: 'Love Story Documentary (interviews + day-of, 8-15 min)', category: 'deliverable', standard: 3500, senior: 5500, mode: 'boolean', sort: 2 },
        { slug: 'vow-overlay-edit', name: 'Vow Overlay Edit (vows narrated over B-roll)', category: 'deliverable', standard: 600, senior: 900, mode: 'boolean', sort: 3 },
        { slug: 'first-look-reveal', name: 'First Look Reveal (slow-mo + reaction capture)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 4 },
        { slug: 'guest-message-compile', name: 'Guest Message Booth Compilation', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 5 },
        { slug: 'next-day-sneak-peek', name: 'Next-Day Sneak Peek (60s teaser, 24hr turn)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 6 },
        { slug: 'raw-wedding-drive', name: 'Raw Footage + Audio (hard drive, scene-labeled)', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'second-shooter', name: 'Second Videographer', price: 500, unit: 'day', sort: 1 },
        { slug: 'photo-coverage', name: 'Photo Coverage (stills photographer)', price: 600, unit: 'day', sort: 2 },
        { slug: 'livestreaming', name: 'Livestreaming (ceremony)', price: 400, unit: 'day', sort: 3 },
        { slug: 'photo-booth', name: 'Photo/Video Booth', price: 350, unit: 'day', sort: 4 },
    ],
};
