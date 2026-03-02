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
        { slug: 'executive-interview', name: 'Executive Interview / Talking Head', category: 'deliverable', standard: 800, senior: 1300, mode: 'boolean', sort: 0 },
        { slug: 'training-video', name: 'Training / Onboarding Video (5-15 min)', category: 'deliverable', standard: 1500, senior: 2500, mode: 'boolean', sort: 1 },
        { slug: 'brand-documentary', name: 'Brand Documentary (5-10 min)', category: 'deliverable', standard: 3000, senior: 5000, mode: 'boolean', sort: 2 },
        { slug: 'company-culture', name: 'Company Culture / Recruitment Video (2-3 min)', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 3 },
        { slug: 'product-demo', name: 'Product / Service Demo (2-5 min)', category: 'deliverable', standard: 1000, senior: 1600, mode: 'boolean', sort: 4 },
        { slug: 'testimonial', name: 'Client / Employee Testimonial', category: 'deliverable', standard: 500, senior: 800, mode: 'quantity', sort: 5 },
        { slug: 'social-clips', name: 'Social Media Clip Pack (5 clips)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover (includes hard drive)', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 1 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
        { slug: 'studio-rental', name: 'Studio Rental', price: 500, unit: 'day', sort: 4 },
    ],
};
