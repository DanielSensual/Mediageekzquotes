/**
 * Vertical Template — Medical / MedSpa Content
 * ===============================================
 * Procedure explainers, patient testimonials, facility tours, HIPAA-aware.
 * Rates based on Orlando MSA market research ($3,000–$6,000 project range).
 * Highest-margin vertical — institutional budgets + high patient LTV.
 */

module.exports = {
    slug: 'medical',
    name: 'Medical & MedSpa',
    icon: '🏥',

    coverage: { halfDay: 1500, fullDay: 3000, overtime: 500 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 75, coi: 75, travel: 200 },

    services: [
        { slug: 'procedure-explainer', name: 'Procedure Explainer (2-4 min)', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 0 },
        { slug: 'patient-testimonial', name: 'Patient Testimonial Video', category: 'deliverable', standard: 600, senior: 1000, mode: 'quantity', sort: 1 },
        { slug: 'facility-tour', name: 'Facility / Office Tour (2-3 min)', category: 'deliverable', standard: 900, senior: 1400, mode: 'boolean', sort: 2 },
        { slug: 'social-content-pack', name: 'Social Content Pack (5 clips)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 3 },
        { slug: 'doctor-profile', name: 'Doctor / Provider Profile (2-3 min)', category: 'deliverable', standard: 800, senior: 1300, mode: 'boolean', sort: 4 },
        { slug: 'before-after', name: 'Before & After Showcase', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 5 },
        { slug: 'educational-series', name: 'Educational Series Episode', category: 'deliverable', standard: 700, senior: 1100, mode: 'quantity', sort: 6 },
        { slug: 'raw-footage', name: 'Raw Footage Handover', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'medical-review', name: 'Medical Advisor Content Review', price: 300, unit: 'session', sort: 1 },
        { slug: 'hipaa-delivery', name: 'HIPAA-Compliant Delivery & Storage', price: 250, unit: 'session', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
