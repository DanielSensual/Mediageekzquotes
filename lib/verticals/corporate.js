/**
 * Vertical Template — Corporate Video Production
 * =================================================
 * Executive interviews, training modules, brand documentaries, product demos.
 * Rates based on Orlando MSA market research ($4,000–$8,500 project range).
 */

module.exports = {
    slug: 'corporate',
    name: 'Corporate Video',
    icon: '🏢',

    coverage: { halfDay: 1200, fullDay: 2500, overtime: 400 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 50, travel: 200 },

    services: [
        { slug: 'exec-sitdown', name: 'Executive Interview w/ Lower Thirds + B-Roll', category: 'deliverable', standard: 800, senior: 1300, mode: 'boolean', sort: 0 },
        { slug: 'training-chapters', name: 'Training Module w/ Chapter Markers (5-15 min)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 1 },
        { slug: 'investor-brand-doc', name: 'Investor / Stakeholder Brand Documentary (5-10 min)', category: 'deliverable', standard: 3000, senior: 5000, mode: 'boolean', sort: 2 },
        { slug: 'internal-comms', name: 'Internal Comms / Town Hall Edit (multi-cam)', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 3 },
        { slug: 'product-explainer', name: 'Product Explainer w/ Screen Capture Integration', category: 'deliverable', standard: 1000, senior: 1600, mode: 'boolean', sort: 4 },
        { slug: 'linkedin-cut', name: 'LinkedIn-Optimized Cut (1:1 + captions)', category: 'deliverable', standard: 300, senior: 500, mode: 'quantity', sort: 5 },
        { slug: 'employee-testimonial', name: 'Employee / Client Testimonial Edit', category: 'deliverable', standard: 500, senior: 800, mode: 'quantity', sort: 6 },
        { slug: 'raw-corporate-archive', name: 'Raw Footage + Brand Archive Drive', category: 'footage', standard: 300, senior: 300, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 1 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
        { slug: 'studio-rental', name: 'Studio Rental', price: 500, unit: 'day', sort: 4 },
    ],
};
