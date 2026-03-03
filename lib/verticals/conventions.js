/**
 * Vertical Template — Conventions
 * ================================
 * Migrated from the original MediaGeekz DEFAULT_RATES.
 */

module.exports = {
    slug: 'conventions',
    name: 'Convention Videography',
    icon: '🎤',

    coverage: { halfDay: 850, fullDay: 1600, overtime: 300 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 150 },

    services: [
        { slug: 'keynote-multicam', name: 'Keynote Multi-Cam Edit w/ Speaker Name Overlays', category: 'deliverable', standard: 600, senior: 900, mode: 'boolean', sort: 0 },
        { slug: 'booth-walkthrough', name: 'Expo Booth Walkthrough w/ Text Annotations', category: 'deliverable', standard: 350, senior: 500, mode: 'boolean', sort: 1 },
        { slug: 'sizzle-reel', name: 'Post-Show Sizzle Reel (3-5 min, color graded + motion GFX)', category: 'deliverable', standard: 1200, senior: 1800, mode: 'boolean', sort: 2 },
        { slug: 'floor-timelapse', name: 'Expo Floor Timelapse (setup → teardown)', category: 'deliverable', standard: 400, senior: 600, mode: 'boolean', sort: 3 },
        { slug: 'attendee-interviews', name: 'Attendee Interview Package w/ Branded Frame', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 4 },
        { slug: 'panel-session-edit', name: 'Panel / Breakout Session Edit (multi-angle sync)', category: 'footage', standard: 300, senior: 400, mode: 'quantity', sort: 5 },
        { slug: 'sponsor-highlight', name: 'Sponsor Highlight Montage (logo + footage)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 6 },
        { slug: 'raw-convention-drive', name: 'Raw Convention Footage (hard drive, time-coded)', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 1 },
        { slug: 'photo-coverage', name: 'Event Photo Coverage', price: 600, unit: 'day', sort: 2 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 3 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 4 },
    ],
};
