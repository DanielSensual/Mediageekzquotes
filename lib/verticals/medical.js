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
        { slug: 'annotated-procedure', name: 'Annotated Procedure Explainer (2-4 min, text overlays)', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 0 },
        { slug: 'consent-testimonial', name: 'Consent-Cleared Patient Testimonial Edit', category: 'deliverable', standard: 600, senior: 1000, mode: 'quantity', sort: 1 },
        { slug: 'before-after-mask', name: 'Before/After Showcase w/ Privacy Masking', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 2 },
        { slug: 'provider-profile', name: 'Provider Profile w/ Credentials Overlay', category: 'deliverable', standard: 800, senior: 1300, mode: 'boolean', sort: 3 },
        { slug: 'facility-sterile-tour', name: 'Sterile-Environment Facility Tour (2-3 min)', category: 'deliverable', standard: 900, senior: 1400, mode: 'boolean', sort: 4 },
        { slug: 'waiting-room-loop', name: 'Waiting Room TV Loop (5-10 min, silent w/ captions)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 5 },
        { slug: 'educational-series-ep', name: 'Educational Series Episode (condition-specific)', category: 'deliverable', standard: 700, senior: 1100, mode: 'quantity', sort: 6 },
        { slug: 'raw-hipaa-secure', name: 'Raw Footage (HIPAA-Secure Transfer)', category: 'footage', standard: 300, senior: 300, mode: 'boolean', sort: 7 },
        { slug: 'treatment-comparison', name: 'Treatment Comparison Video (side-by-side)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 8 },
        { slug: 'virtual-consultation', name: 'Virtual Consultation Intro (branded, 60-90s)', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 9 },
        { slug: 'staff-meet-the-team', name: 'Meet the Team / Staff Profiles (per provider)', category: 'deliverable', standard: 350, senior: 550, mode: 'quantity', sort: 10 },
        { slug: 'social-health-tip', name: 'Social Health Tip Reel (15-30s)', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 11 },
        { slug: 'accreditation-showcase', name: 'Accreditation / Awards Showcase Edit', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 12 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'medical-review', name: 'Medical Advisor Content Review', price: 300, unit: 'session', sort: 1 },
        { slug: 'hipaa-delivery', name: 'HIPAA-Compliant Delivery & Storage', price: 250, unit: 'session', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
