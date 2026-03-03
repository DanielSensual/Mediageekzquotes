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
        { slug: 'multicam-sync-edit', name: 'Multi-Cam Synced Timeline Edit (30-90 min)', category: 'deliverable', standard: 500, senior: 800, mode: 'quantity', sort: 0 },
        { slug: 'dynamic-captions', name: 'Dynamic Captions / Subtitles (per episode)', category: 'deliverable', standard: 200, senior: 350, mode: 'quantity', sort: 1 },
        { slug: 'topic-clip-pack', name: 'Topic-Based Clip Pack (5 vertical clips w/ hooks)', category: 'deliverable', standard: 300, senior: 500, mode: 'quantity', sort: 2 },
        { slug: 'audiogram-waveform', name: 'Audiogram Waveform Cards (3 per episode)', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 3 },
        { slug: 'spotify-video-ep', name: 'Spotify Video Podcast Export (synced chapters)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 4 },
        { slug: 'animated-intro-outro', name: 'Animated Intro / Outro Bumper Package', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 5 },
        { slug: 'season-trailer', name: 'Season / Show Trailer (60-90s)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 6 },
        { slug: 'raw-multitrack', name: 'Raw Multi-Track Audio + Video Stems', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
        { slug: 'highlight-supercut', name: 'Best-Of Highlight Supercut (per season)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 8 },
        { slug: 'guest-promo-clip', name: 'Guest Promo Clip (60s, shareable)', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 9 },
        { slug: 'reaction-overlay', name: 'Reaction Split-Screen Overlay Edit', category: 'deliverable', standard: 100, senior: 175, mode: 'quantity', sort: 10 },
        { slug: 'youtube-shorts-batch', name: 'YouTube Shorts Batch (10 clips from episode)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 11 },
        { slug: 'podcast-trailer', name: 'Podcast Trailer / Ad Spot (30s)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 12 },
    ],

    addOns: [
        { slug: 'studio-rental', name: 'Studio Rental (includes lighting)', price: 500, unit: 'day', sort: 0 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 1 },
        { slug: 'guest-kit', name: 'Remote Guest Kit (shipped mic + cam)', price: 200, unit: 'session', sort: 2 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 3 },
    ],
};
