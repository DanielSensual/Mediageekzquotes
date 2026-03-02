/**
 * Vertical Template — Podcast Production
 * ========================================
 * Multi-cam recording, social clip extraction, studio sessions.
 * Rates based on Orlando MSA market research ($100-$195/hr, $1,200 bulk day).
 */

module.exports = {
    slug: 'podcasts',
    name: 'Podcast Production',
    icon: '🎙️',

    coverage: { halfDay: 600, fullDay: 1200, overtime: 200 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'episode-edit', name: 'Multi-Cam Episode Edit (30-60 min)', category: 'deliverable', standard: 500, senior: 800, mode: 'quantity', sort: 0 },
        { slug: 'social-clip-pack', name: 'Social Clip Pack (5 clips per episode)', category: 'deliverable', standard: 300, senior: 500, mode: 'quantity', sort: 1 },
        { slug: 'audiogram', name: 'Audiogram / Waveform Video', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 2 },
        { slug: 'youtube-longform', name: 'YouTube Long-Form Edit (1+ hr)', category: 'deliverable', standard: 800, senior: 1400, mode: 'boolean', sort: 3 },
        { slug: 'intro-outro', name: 'Intro / Outro Package (animated)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 4 },
        { slug: 'trailer', name: 'Podcast Trailer (60-90s)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 5 },
        { slug: 'raw-footage', name: 'Raw Footage + Audio Stems', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 6 },
    ],

    addOns: [
        { slug: 'studio-rental', name: 'Studio Rental (includes lighting)', price: 500, unit: 'day', sort: 0 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 1 },
        { slug: 'guest-kit', name: 'Remote Guest Kit (shipped mic + cam)', price: 200, unit: 'session', sort: 2 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 3 },
    ],
};
