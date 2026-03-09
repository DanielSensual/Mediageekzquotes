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
        { slug: 'reception-party-edit', name: 'Reception Party Edit (speeches, dances, toasts)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 8 },
        { slug: 'save-the-date', name: 'Save the Date Video (30-60s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 9 },
        { slug: 'rehearsal-dinner', name: 'Rehearsal Dinner Recap', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 10 },
        { slug: 'social-trailer', name: 'Social Media Wedding Trailer (30s vertical)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 11 },
        { slug: 'multi-format-export', name: 'Multi-Format Export Pack (16:9 + 9:16 + 1:1)', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 12 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'second-shooter', name: 'Second Videographer', price: 500, unit: 'day', sort: 1 },
        { slug: 'photo-coverage', name: 'Photo Coverage (stills photographer)', price: 600, unit: 'day', sort: 2 },
        { slug: 'livestreaming', name: 'Livestreaming (ceremony)', price: 400, unit: 'day', sort: 3 },
        { slug: 'photo-booth', name: 'Photo/Video Booth', price: 350, unit: 'day', sort: 4 },
        { slug: 'finale-reel', name: 'The Finale Reel — Same-Day Reception Edit (1 min, 16:9, played at reception)', price: 2500, unit: 'day', sort: 5 },
        { slug: 'dawn-cut', name: 'The Dawn Cut — Next-Day Edit (1 min, 16:9, delivered within 24hrs)', price: 2000, unit: 'day', sort: 6 },
    ],

    /* ─── Quick-Pick Packages ──────────────────────────────────────── */
    packages: [
        {
            slug: 'intimate',
            name: 'Intimate',
            tagline: 'Perfect for elopements & micro-weddings',
            price: '$2,000',
            hours: 5,
            operators: 1,
            editorTier: 'standard',
            deliverables: ['cinematic-highlights'],
            addOns: [],
        },
        {
            slug: 'classic',
            name: 'Classic',
            tagline: 'The essentials for your big day',
            price: '$4,500',
            hours: 5,
            operators: 2,
            editorTier: 'standard',
            deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'social-trailer'],
            addOns: [],
        },
        {
            slug: 'cinematic',
            name: 'Cinematic',
            tagline: 'Full-day coverage with cinematic storytelling',
            badge: 'Most Popular',
            price: '$7,000',
            hours: 8,
            operators: 2,
            editorTier: 'senior',
            deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'reception-party-edit', 'social-trailer'],
            addOns: ['drone-coverage', 'second-shooter'],
        },
        {
            slug: 'premiere',
            name: 'Premiere',
            tagline: 'Premium experience with same-day reception screening',
            price: '$10,500',
            hours: 10,
            operators: 2,
            editorTier: 'senior',
            deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'reception-party-edit', 'first-look-reveal', 'social-trailer', 'multi-format-export'],
            addOns: ['drone-coverage', 'second-shooter', 'finale-reel'],
        },
        {
            slug: 'legacy',
            name: 'Legacy',
            tagline: 'The ultimate film — a love story for generations',
            badge: 'Ultimate',
            price: '$15,000+',
            hours: 14,
            operators: 2,
            editorTier: 'senior',
            deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'love-story-doc', 'reception-party-edit', 'first-look-reveal', 'vow-overlay-edit', 'guest-message-compile', 'social-trailer', 'raw-wedding-drive', 'multi-format-export'],
            addOns: ['drone-coverage', 'second-shooter', 'photo-coverage', 'finale-reel', 'dawn-cut'],
        },
    ],
};
