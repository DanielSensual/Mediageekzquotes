/**
 * ReelEstate Orlando — Tenant Seed Script
 * =========================================
 * Seeds a "ReelEstate Orlando" tenant with cream/gold branding
 * and 3 verticals: Real Estate Video, Social Media, Corporate.
 *
 * Run: npm run db:seed:reelestate
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─── Verticals ───────────────────────────────────────────────────

const VERTICALS = [
    {
        slug: 'real-estate',
        name: 'Real Estate Video',
        icon: '🏠',
        coverage: { halfDay: 600, fullDay: 1200, overtime: 250 },
        turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },
        logistics: { parking: 50, coi: 50, travel: 150 },
        services: [
            { slug: 'mls-listing-video', name: 'MLS-Ready Listing Video (60-90s)', category: 'deliverable', standard: 500, senior: 800, mode: 'boolean', sort: 0 },
            { slug: 'cinematic-walkthrough', name: 'Cinematic Walkthrough w/ Floor Plan Overlay', category: 'deliverable', standard: 900, senior: 1400, mode: 'boolean', sort: 1 },
            { slug: 'agent-branding-intro', name: 'Agent Branded Intro + Outro', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 2 },
            { slug: 'drone-to-interior', name: 'Drone-to-Interior Transition Edit', category: 'deliverable', standard: 600, senior: 950, mode: 'boolean', sort: 3 },
            { slug: 'neighborhood-lifestyle', name: 'Neighborhood Lifestyle Montage', category: 'deliverable', standard: 700, senior: 1100, mode: 'boolean', sort: 4 },
            { slug: 'virtual-staging-overlay', name: 'Virtual Staging Overlay (per room)', category: 'deliverable', standard: 150, senior: 250, mode: 'quantity', sort: 5 },
            { slug: 'open-house-recap', name: 'Open House Recap Reel (IG/TikTok)', category: 'deliverable', standard: 300, senior: 500, mode: 'boolean', sort: 6 },
            { slug: 'raw-mls-export', name: 'Raw Footage + MLS-Formatted Export', category: 'footage', standard: 250, senior: 250, mode: 'boolean', sort: 7 },
            { slug: 'luxury-hero-film', name: 'Luxury Hero Film (cinematic 2-3 min)', category: 'deliverable', standard: 1200, senior: 2000, mode: 'boolean', sort: 8 },
            { slug: 'day-to-night', name: 'Day-to-Night Transition Edit', category: 'deliverable', standard: 400, senior: 650, mode: 'boolean', sort: 9 },
            { slug: 'social-just-listed', name: 'Social "Just Listed" Post (15-30s)', category: 'deliverable', standard: 200, senior: 350, mode: 'boolean', sort: 10 },
            { slug: 'agent-market-update', name: 'Agent Market Update Talking Head', category: 'deliverable', standard: 250, senior: 400, mode: 'quantity', sort: 11 },
            { slug: 'community-highlight', name: 'Community Highlight Package', category: 'deliverable', standard: 600, senior: 950, mode: 'boolean', sort: 12 },
        ],
        addOns: [
            { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', price: 450, unit: 'hour', sort: 0 },
            { slug: 'twilight-shoot', name: 'Twilight / Golden Hour Shoot', price: 350, unit: 'session', sort: 1 },
            { slug: 'virtual-tour-3d', name: '3D Virtual Tour (Matterport)', price: 500, unit: 'session', sort: 2 },
            { slug: 'staging-consult', name: 'Staging Consultation', price: 300, unit: 'session', sort: 3 },
        ],
    },
    {
        slug: 'social-media',
        name: 'Social Media Content',
        icon: '📱',
        coverage: { halfDay: 500, fullDay: 950, overtime: 200 },
        turnaround: { expedited: 15, rush: 30, nextDay: 50, sameDay: 80 },
        logistics: { parking: 50, coi: 50, travel: 150 },
        services: [
            { slug: 'ig-reels-pack', name: 'Instagram Reels Pack (3 edits)', category: 'deliverable', standard: 450, senior: 750, mode: 'boolean', sort: 0 },
            { slug: 'tiktok-series', name: 'TikTok Series (5 edits)', category: 'deliverable', standard: 600, senior: 950, mode: 'boolean', sort: 1 },
            { slug: 'stories-package', name: 'Stories Content Package (10 clips)', category: 'deliverable', standard: 350, senior: 550, mode: 'boolean', sort: 2 },
            { slug: 'behind-the-scenes', name: 'Behind-the-Scenes Montage', category: 'deliverable', standard: 300, senior: 500, mode: 'boolean', sort: 3 },
            { slug: 'agent-intro-reel', name: 'Agent Introduction Reel (30s)', category: 'deliverable', standard: 250, senior: 400, mode: 'boolean', sort: 4 },
            { slug: 'monthly-content-pack', name: 'Monthly Content Package (12 posts)', category: 'deliverable', standard: 1200, senior: 1800, mode: 'boolean', sort: 5 },
            { slug: 'testimonial-edit', name: 'Client Testimonial Edit', category: 'deliverable', standard: 200, senior: 350, mode: 'quantity', sort: 6 },
            { slug: 'raw-social-export', name: 'Raw Footage Export (all clips)', category: 'footage', standard: 200, senior: 200, mode: 'boolean', sort: 7 },
        ],
        addOns: [
            { slug: 'music-licensing', name: 'Premium Music Licensing', price: 75, unit: 'track', sort: 0 },
            { slug: 'caption-overlays', name: 'Animated Caption Overlays', price: 100, unit: 'video', sort: 1 },
            { slug: 'trending-audio', name: 'Trending Audio Integration', price: 50, unit: 'video', sort: 2 },
        ],
    },
    {
        slug: 'corporate',
        name: 'Corporate & Brand',
        icon: '🏢',
        coverage: { halfDay: 750, fullDay: 1400, overtime: 300 },
        turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },
        logistics: { parking: 50, coi: 50, travel: 150 },
        services: [
            { slug: 'brand-transformation', name: 'Brand Transformation Package', category: 'deliverable', standard: 2500, senior: 3500, mode: 'boolean', sort: 0 },
            { slug: 'company-overview', name: 'Company Overview Film (2-3 min)', category: 'deliverable', standard: 1500, senior: 2200, mode: 'boolean', sort: 1 },
            { slug: 'team-spotlight', name: 'Team Member Spotlight', category: 'deliverable', standard: 400, senior: 650, mode: 'quantity', sort: 2 },
            { slug: 'talking-head-interview', name: 'Talking Head Interview Edit', category: 'deliverable', standard: 350, senior: 550, mode: 'quantity', sort: 3 },
            { slug: 'event-recap', name: 'Event Recap Highlight Reel', category: 'deliverable', standard: 800, senior: 1200, mode: 'boolean', sort: 4 },
            { slug: 'training-video', name: 'Training / Explainer Video', category: 'deliverable', standard: 600, senior: 950, mode: 'quantity', sort: 5 },
            { slug: 'sizzle-reel', name: 'Sizzle Reel / Showreel', category: 'deliverable', standard: 1000, senior: 1600, mode: 'boolean', sort: 6 },
            { slug: 'raw-corporate-export', name: 'Raw Footage Export', category: 'footage', standard: 300, senior: 300, mode: 'boolean', sort: 7 },
        ],
        addOns: [
            { slug: 'teleprompter', name: 'Teleprompter + Operator', price: 250, unit: 'session', sort: 0 },
            { slug: 'multi-cam', name: 'Multi-Camera Setup (3+ angles)', price: 500, unit: 'session', sort: 1 },
            { slug: 'motion-graphics', name: 'Custom Motion Graphics Package', price: 750, unit: 'project', sort: 2 },
            { slug: 'voiceover', name: 'Professional Voiceover', price: 300, unit: 'script', sort: 3 },
        ],
    },
];

// ─── Main ────────────────────────────────────────────────────────

async function main() {
    console.log('🏠 Seeding ReelEstate Orlando tenant...\n');

    // Create tenant
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'reelestate' },
        update: {
            name: 'ReelEstate Orlando',
            colorPrimary: '#b5945a',
            colorBg: '#1a1815',
            fontFamily: 'Outfit',
            email: 'reelestateorlando@gmail.com',
            city: 'Orlando',
            state: 'FL',
        },
        create: {
            slug: 'reelestate',
            name: 'ReelEstate Orlando',
            plan: 'agency',
            colorPrimary: '#b5945a',
            colorBg: '#1a1815',
            fontFamily: 'Outfit',
            email: 'reelestateorlando@gmail.com',
            city: 'Orlando',
            state: 'FL',
        },
    });
    console.log(`  ✓ Tenant: ${tenant.name} (${tenant.id})`);

    // Seed each vertical
    for (const template of VERTICALS) {
        const vertical = await prisma.vertical.upsert({
            where: { tenantId_slug: { tenantId: tenant.id, slug: template.slug } },
            update: {
                name: template.name,
                icon: template.icon,
                halfDayRate: template.coverage.halfDay,
                fullDayRate: template.coverage.fullDay,
                overtimeRate: template.coverage.overtime,
                turnaroundExpedited: template.turnaround.expedited,
                turnaroundRush: template.turnaround.rush,
                turnaroundNextDay: template.turnaround.nextDay,
                turnaroundSameDay: template.turnaround.sameDay,
                parkingFee: template.logistics.parking,
                coiFee: template.logistics.coi,
                travelFee: template.logistics.travel,
            },
            create: {
                tenantId: tenant.id,
                slug: template.slug,
                name: template.name,
                icon: template.icon,
                enabled: true,
                halfDayRate: template.coverage.halfDay,
                fullDayRate: template.coverage.fullDay,
                overtimeRate: template.coverage.overtime,
                turnaroundExpedited: template.turnaround.expedited,
                turnaroundRush: template.turnaround.rush,
                turnaroundNextDay: template.turnaround.nextDay,
                turnaroundSameDay: template.turnaround.sameDay,
                parkingFee: template.logistics.parking,
                coiFee: template.logistics.coi,
                travelFee: template.logistics.travel,
            },
        });

        // Seed services
        for (const svc of template.services) {
            await prisma.serviceItem.upsert({
                where: { verticalId_slug: { verticalId: vertical.id, slug: svc.slug } },
                update: {
                    name: svc.name,
                    category: svc.category,
                    standardPrice: svc.standard,
                    seniorPrice: svc.senior,
                    mode: svc.mode,
                    sortOrder: svc.sort,
                },
                create: {
                    verticalId: vertical.id,
                    slug: svc.slug,
                    name: svc.name,
                    category: svc.category,
                    standardPrice: svc.standard,
                    seniorPrice: svc.senior,
                    mode: svc.mode,
                    sortOrder: svc.sort,
                    enabled: true,
                },
            });
        }

        // Seed add-ons
        for (const addon of template.addOns) {
            await prisma.addOnItem.upsert({
                where: { verticalId_slug: { verticalId: vertical.id, slug: addon.slug } },
                update: {
                    name: addon.name,
                    pricePerUnit: addon.price,
                    unitType: addon.unit,
                    sortOrder: addon.sort,
                },
                create: {
                    verticalId: vertical.id,
                    slug: addon.slug,
                    name: addon.name,
                    pricePerUnit: addon.price,
                    unitType: addon.unit,
                    sortOrder: addon.sort,
                    enabled: true,
                },
            });
        }

        console.log(`  ✓ Vertical: ${template.name} — ${template.services.length} services, ${template.addOns.length} add-ons`);
    }

    // Admin user
    await prisma.tenantUser.upsert({
        where: { email: 'reelestateorlando@gmail.com' },
        update: {},
        create: {
            tenantId: tenant.id,
            email: 'reelestateorlando@gmail.com',
            name: 'Daniel Castillo',
            role: 'admin',
        },
    });
    console.log('  ✓ Admin: reelestateorlando@gmail.com');

    console.log('\n✅ ReelEstate Orlando seed complete!');
    console.log('   → Navigate to /reelestate to see the quote builder');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
