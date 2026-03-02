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
        { slug: 'listing-video', name: 'Listing Video (60-90s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 0 },
        { slug: 'property-walkthrough', name: 'Full Property Walkthrough (2-3 min)', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 1 },
        { slug: 'agent-on-camera', name: 'Agent-On-Camera Introduction', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 2 },
        { slug: 'neighborhood-tour', name: 'Neighborhood & Lifestyle Tour (2-4 min)', category: 'deliverable', standard: 700, senior: 1100, mode: 'boolean', sort: 3 },
        { slug: 'social-clips', name: 'Social Media Clip Pack (5 clips)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 4 },
        { slug: 'drone-highlight', name: 'Drone Aerial Highlight (30-60s)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 5 },
        { slug: 'community-promo', name: 'Community / HOA Promo Video', category: 'deliverable', standard: 900, senior: 1400, mode: 'boolean', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'twilight-shoot', name: 'Twilight / Golden Hour Shoot', price: 350, unit: 'session', sort: 1 },
        { slug: 'virtual-tour-3d', name: '3D Virtual Tour (Matterport)', price: 500, unit: 'session', sort: 2 },
        { slug: 'staging-consult', name: 'Staging Consultation', price: 300, unit: 'session', sort: 3 },
    ],
};
