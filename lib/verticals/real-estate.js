/**
 * Vertical Template — Real Estate Video Production
 * ==================================================
 * Walkthroughs, drone aerials, agent-on-camera, neighborhood tours.
 * Rates based on Orlando MSA market research ($600–$1,500 range).
 */

module.exports = {
    slug: 'real-estate',
    name: 'Real Estate Video',
    icon: '🏠',

    coverage: { halfDay: 600, fullDay: 1200, overtime: 250 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'mls-listing-video', name: 'MLS-Ready Listing Video (60-90s, 16:9 + 1:1)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 0 },
        { slug: 'cinematic-walkthrough', name: 'Cinematic Walkthrough w/ Floor Plan Overlay', category: 'deliverable', standard: 900, senior: 1400, mode: 'boolean', sort: 1 },
        { slug: 'agent-branding-intro', name: 'Agent Branded Intro + Outro (logo, colors, headshot)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 2 },
        { slug: 'drone-to-interior', name: 'Drone-to-Interior Transition Edit', category: 'deliverable', standard: 600, senior: 950, mode: 'boolean', sort: 3 },
        { slug: 'neighborhood-lifestyle', name: 'Neighborhood Lifestyle Montage (POI, schools, parks)', category: 'deliverable', standard: 700, senior: 1100, mode: 'boolean', sort: 4 },
        { slug: 'virtual-staging-overlay', name: 'Virtual Staging Overlay (per room)', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 5 },
        { slug: 'open-house-recap', name: 'Open House Recap Reel (IG/TikTok)', category: 'deliverable', standard: 300, senior: 500, mode: 'boolean', sort: 6 },
        { slug: 'raw-mls-export', name: 'Raw Footage + MLS-Formatted Export', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'twilight-shoot', name: 'Twilight / Golden Hour Shoot', price: 350, unit: 'session', sort: 1 },
        { slug: 'virtual-tour-3d', name: '3D Virtual Tour (Matterport)', price: 500, unit: 'session', sort: 2 },
        { slug: 'staging-consult', name: 'Staging Consultation', price: 300, unit: 'session', sort: 3 },
    ],
};
