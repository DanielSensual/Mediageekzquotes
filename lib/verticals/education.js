/**
 * Vertical Template — Education Video Production
 * =================================================
 * Campus tours, course promos, student testimonials, lecture capture.
 * Rates based on Orlando MSA market research ($2,500–$6,000 project range).
 */

module.exports = {
    slug: 'education',
    name: 'Education Video',
    icon: '🎓',

    coverage: { halfDay: 900, fullDay: 1800, overtime: 300 },

    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },

    logistics: { parking: 50, coi: 50, travel: 150 },

    services: [
        { slug: 'drone-campus-flyover', name: 'Drone Campus Flyover w/ Title Cards', category: 'deliverable', standard: 1000, senior: 1600, mode: 'boolean', sort: 0 },
        { slug: 'course-trailer', name: 'Course Trailer w/ Curriculum Graphics (60-90s)', category: 'deliverable', standard: 600, senior: 1000, mode: 'boolean', sort: 1 },
        { slug: 'student-day-in-life', name: 'Student Day-in-the-Life Vlog Edit', category: 'deliverable', standard: 400, senior: 650, mode: 'quantity', sort: 2 },
        { slug: 'lecture-slide-sync', name: 'Lecture Capture w/ Slide Sync + PiP', category: 'deliverable', standard: 300, senior: 500, mode: 'quantity', sort: 3 },
        { slug: 'alumni-success-story', name: 'Alumni Success Story Edit (2-3 min)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 4 },
        { slug: 'enrollment-cta', name: 'Enrollment CTA Bumper (15-30s, multi-format)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 5 },
        { slug: 'commencement-highlight', name: 'Commencement / Event Highlight Reel', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 6 },
        { slug: 'raw-academic-archive', name: 'Raw Footage + Archival Copy', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
    ],

    addOns: [
        { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
        { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', price: 800, unit: 'day', sort: 1 },
        { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', price: 350, unit: 'day', sort: 2 },
        { slug: 'on-site-director', name: 'On-Site Creative Director', price: 500, unit: 'day', sort: 3 },
    ],
};
