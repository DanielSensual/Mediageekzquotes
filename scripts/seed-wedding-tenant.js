#!/usr/bin/env node

// ─── Load .env.local for DATABASE_URL ────────────────────────────
const fs = require('fs');
const pathMod = require('path');
const envPath = pathMod.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) return;
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
    });
}

/**
 * Seed Script — MediaGeekz Wedding Films (White Theme)
 * =====================================================
 * Creates a "MediaGeekz Wedding Films" tenant with a bright/white
 * theme for the custom wedding quote builder.
 *
 * Usage:  node scripts/seed-wedding-tenant.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─── Tenant Configuration ────────────────────────────────────────
const TENANT_CONFIG = {
    slug: 'mediageekz-weddings',
    name: 'MediaGeekz Wedding Films',
    plan: 'professional',

    // Branding — White theme with gold accent
    logoUrl: null,
    colorPrimary: '#C5A55A',           // Gold accent (matches proposal)
    colorBg: '#FAFAF8',               // Ivory white (matches proposal)
    fontFamily: 'Cormorant Garamond',  // Elegant serif

    // Contact
    email: 'weddings@mediageekz.com',
    phone: '(321) 666-5228',
    city: 'Orlando',
    state: 'FL',
};

// ─── Vertical: Wedding Films ─────────────────────────────────────
const VERTICAL_CONFIG = {
    slug: 'weddings',
    name: 'Wedding Films',
    icon: '💍',

    halfDayRate: 900,
    fullDayRate: 1800,
    overtimeRate: 350,

    turnaroundExpedited: 20,
    turnaroundRush: 35,
    turnaroundNextDay: 60,
    turnaroundSameDay: 100,

    parkingFee: 75,
    coiFee: 50,
    travelFee: 150,
};

// ─── Services ────────────────────────────────────────────────────
const SERVICES = [
    { slug: 'cinematic-highlights', name: 'Cinematic Highlights Film (3-5 min, color graded)', category: 'deliverable', standardPrice: 1200, seniorPrice: 1800, mode: 'boolean', sortOrder: 0 },
    { slug: 'full-ceremony-doc', name: 'Full Ceremony Documentary Edit (20-30 min)', category: 'deliverable', standardPrice: 800, seniorPrice: 1200, mode: 'boolean', sortOrder: 1 },
    { slug: 'love-story-doc', name: 'Love Story Documentary (interviews + day-of, 8-15 min)', category: 'deliverable', standardPrice: 3500, seniorPrice: 5500, mode: 'boolean', sortOrder: 2 },
    { slug: 'vow-overlay-edit', name: 'Vow Overlay Edit (vows narrated over B-roll)', category: 'deliverable', standardPrice: 600, seniorPrice: 900, mode: 'boolean', sortOrder: 3 },
    { slug: 'first-look-reveal', name: 'First Look Reveal (slow-mo + reaction capture)', category: 'deliverable', standardPrice: 400, seniorPrice: 650, mode: 'boolean', sortOrder: 4 },
    { slug: 'guest-message-compile', name: 'Guest Message Booth Compilation', category: 'deliverable', standardPrice: 500, seniorPrice: 800, mode: 'boolean', sortOrder: 5 },
    { slug: 'next-day-sneak-peek', name: 'Next-Day Sneak Peek (60s teaser, 24hr turn)', category: 'deliverable', standardPrice: 1500, seniorPrice: 2500, mode: 'boolean', sortOrder: 6 },
    { slug: 'raw-wedding-drive', name: 'Raw Footage + Audio (hard drive, scene-labeled)', category: 'footage', standardPrice: 250, seniorPrice: 250, mode: 'boolean', sortOrder: 7 },
    { slug: 'reception-party-edit', name: 'Reception Party Edit (speeches, dances, toasts)', category: 'deliverable', standardPrice: 800, seniorPrice: 1200, mode: 'boolean', sortOrder: 8 },
    { slug: 'save-the-date', name: 'Save the Date Video (30-60s)', category: 'deliverable', standardPrice: 500, seniorPrice: 800, mode: 'boolean', sortOrder: 9 },
    { slug: 'rehearsal-dinner', name: 'Rehearsal Dinner Recap', category: 'deliverable', standardPrice: 400, seniorPrice: 650, mode: 'boolean', sortOrder: 10 },
    { slug: 'social-trailer', name: 'Social Media Wedding Trailer (30s vertical)', category: 'deliverable', standardPrice: 350, seniorPrice: 550, mode: 'boolean', sortOrder: 11 },
    { slug: 'multi-format-export', name: 'Multi-Format Export Pack (16:9 + 9:16 + 1:1)', category: 'footage', standardPrice: 200, seniorPrice: 200, mode: 'boolean', sortOrder: 12 },
];

// ─── Add-Ons ─────────────────────────────────────────────────────
const ADD_ONS = [
    { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', pricePerUnit: 450, unitType: 'hour', sortOrder: 0 },
    { slug: 'second-shooter', name: 'Second Videographer', pricePerUnit: 500, unitType: 'day', sortOrder: 1 },
    { slug: 'photo-coverage', name: 'Photo Coverage (stills photographer)', pricePerUnit: 600, unitType: 'day', sortOrder: 2 },
    { slug: 'livestreaming', name: 'Livestreaming (ceremony)', pricePerUnit: 400, unitType: 'day', sortOrder: 3 },
    { slug: 'photo-booth', name: 'Photo/Video Booth', pricePerUnit: 350, unitType: 'day', sortOrder: 4 },
];

// ─── Main ────────────────────────────────────────────────────────
async function main() {
    console.log('💍  Seeding MediaGeekz Wedding Films tenant...\n');

    const tenant = await prisma.tenant.upsert({
        where: { slug: TENANT_CONFIG.slug },
        update: {
            name: TENANT_CONFIG.name,
            plan: TENANT_CONFIG.plan,
            logoUrl: TENANT_CONFIG.logoUrl,
            colorPrimary: TENANT_CONFIG.colorPrimary,
            colorBg: TENANT_CONFIG.colorBg,
            fontFamily: TENANT_CONFIG.fontFamily,
            email: TENANT_CONFIG.email,
            phone: TENANT_CONFIG.phone,
            city: TENANT_CONFIG.city,
            state: TENANT_CONFIG.state,
        },
        create: TENANT_CONFIG,
    });
    console.log(`✅  Tenant: ${tenant.name} (${tenant.slug})`);

    const vertical = await prisma.vertical.upsert({
        where: {
            tenantId_slug: { tenantId: tenant.id, slug: VERTICAL_CONFIG.slug },
        },
        update: {
            name: VERTICAL_CONFIG.name,
            icon: VERTICAL_CONFIG.icon,
            halfDayRate: VERTICAL_CONFIG.halfDayRate,
            fullDayRate: VERTICAL_CONFIG.fullDayRate,
            overtimeRate: VERTICAL_CONFIG.overtimeRate,
            turnaroundExpedited: VERTICAL_CONFIG.turnaroundExpedited,
            turnaroundRush: VERTICAL_CONFIG.turnaroundRush,
            turnaroundNextDay: VERTICAL_CONFIG.turnaroundNextDay,
            turnaroundSameDay: VERTICAL_CONFIG.turnaroundSameDay,
            parkingFee: VERTICAL_CONFIG.parkingFee,
            coiFee: VERTICAL_CONFIG.coiFee,
            travelFee: VERTICAL_CONFIG.travelFee,
            enabled: true,
        },
        create: {
            tenantId: tenant.id,
            ...VERTICAL_CONFIG,
            enabled: true,
        },
    });
    console.log(`✅  Vertical: ${vertical.name} (${vertical.slug})`);

    for (const svc of SERVICES) {
        await prisma.serviceItem.upsert({
            where: {
                verticalId_slug: { verticalId: vertical.id, slug: svc.slug },
            },
            update: { ...svc, enabled: true },
            create: { verticalId: vertical.id, ...svc, enabled: true },
        });
    }
    console.log(`✅  Services: ${SERVICES.length} items seeded`);

    for (const addon of ADD_ONS) {
        await prisma.addOnItem.upsert({
            where: {
                verticalId_slug: { verticalId: vertical.id, slug: addon.slug },
            },
            update: { ...addon, enabled: true },
            create: { verticalId: vertical.id, ...addon, enabled: true },
        });
    }
    console.log(`✅  Add-Ons: ${ADD_ONS.length} items seeded`);

    console.log('\n🎯  Done! Visit:');
    console.log(`    http://localhost:3000/mediageekz-weddings?v=weddings`);
    console.log('\n    This tenant uses a white/ivory theme with gold accents.');
}

main()
    .catch(e => { console.error('❌  Seed error:', e); process.exit(1); })
    .finally(() => prisma.$disconnect());
