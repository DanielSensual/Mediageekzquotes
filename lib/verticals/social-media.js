/**
 * Vertical Template — Social Media Content
 * ==========================================
 */

module.exports = {
    slug: 'social-media',
    name: 'Social Media Content',
    icon: '📱',

    coverage: { halfDay: 750, fullDay: 1400, overtime: 250 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'hook-first-reels', name: 'Hook-First Vertical Reels (5 clips, 15-60s)', category: 'deliverable', standard: 750, senior: 1200, mode: 'boolean', sort: 0 },
        { slug: 'tiktok-trend-batch', name: 'TikTok Trend Batch (10+ clips, format-native)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 1 },
        { slug: 'youtube-chaptered', name: 'YouTube Chaptered Edit (8-15 min, timestamps + cards)', category: 'deliverable', standard: 800, senior: 1400, mode: 'boolean', sort: 2 },
        { slug: 'carousel-story-seq', name: 'IG Carousel / Story Sequence (10 slides, animated)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 3 },
        { slug: 'ugc-product-review', name: 'UGC-Style Product Review Edit', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 4 },
        { slug: 'trending-audio-sync', name: 'Trending Audio Sync Edit (per clip, beat-matched)', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 5 },
        { slug: 'thumb-intro-pack', name: 'Custom Thumbnail + Branded Intro Package', category: 'deliverable', standard: 200, senior: 350, mode: 'boolean', sort: 6 },
        { slug: 'raw-content-library', name: 'Raw Content Library (organized by platform)', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
        { slug: 'podcast-clip-vertical', name: 'Podcast Clip to Vertical Reel (per clip)', category: 'deliverable', standard: 100, senior: 175, mode: 'quantity', sort: 8 },
        { slug: 'meme-format-edit', name: 'Meme-Format Edit (caption overlay)', category: 'deliverable', standard: 75, senior: 125, mode: 'quantity', sort: 9 },
        { slug: 'before-after-swipe', name: 'Before/After Swipe Edit', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 10 },
        { slug: 'monthly-content-batch', name: 'Monthly Content Batch (20 clips, scheduled)', category: 'deliverable', standard: 2500, senior: 4000, mode: 'boolean', sort: 11 },
        { slug: 'branded-template-pack', name: 'Branded Template Pack (5 reusable templates)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 12 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage', price: 450, unit: 'hour', sort: 0 },
        { slug: 'makeup-artist', name: 'Makeup Artist / Styling', price: 400, unit: 'day', sort: 1 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator', price: 350, unit: 'day', sort: 2 },
        { slug: 'studio-rental', name: 'Studio Rental', price: 500, unit: 'day', sort: 3 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 4 },
    ],
};
