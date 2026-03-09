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
 * Seed Script — Mock Realtor Convention/Event Demo
 * ==================================================
 * Creates a "Prestige Realty Group" tenant with a conventions
 * vertical themed for luxury realtor events.
 *
 * Usage:  node scripts/seed-realtor-demo.js
 *
 * ─── Easy Customization ──────────────────────────────────────
 * To repurpose for a real client, just update:
 *   1. TENANT_CONFIG  — name, slug, branding, contact info
 *   2. VERTICAL_CONFIG — rates, services, add-ons
 *   3. Re-run: node scripts/seed-realtor-demo.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─── Tenant Configuration ────────────────────────────────────────
const TENANT_CONFIG = {
    slug: 'prestige-realty',
    name: 'Prestige Realty Group',
    plan: 'professional',

    // Branding — Luxury gold + deep navy
    logoUrl: null,                     // Add client logo URL here
    colorPrimary: '#D4A843',           // Gold accent
    colorBg: '#0A0E1A',               // Deep navy
    fontFamily: 'Playfair Display',    // Luxury serif

    // Contact
    email: 'events@prestigerealty.com',
    phone: '(407) 555-0199',
    city: 'Orlando',
    state: 'FL',
};

// ─── Vertical: Convention & Event Coverage ───────────────────────
const VERTICAL_CONFIG = {
    slug: 'conventions',
    name: 'Convention & Event Coverage',
    icon: '🏛️',

    // Coverage rates
    halfDayRate: 850,
    fullDayRate: 1600,
    overtimeRate: 300,

    // Turnaround multipliers (%)
    turnaroundExpedited: 20,
    turnaroundRush: 35,
    turnaroundNextDay: 60,
    turnaroundSameDay: 100,

    // Logistics
    parkingFee: 75,
    coiFee: 50,
    travelFee: 150,
};

// ─── Services (Deliverables) ────────────────────────────────────
//
// 3-Package Guide (suggested toggle combos for clients):
//
// ESSENTIALS (~$3,500):
//   Coverage: Half-day, 1 operator
//   Deliverables: sizzle-reel, social-clip-pack, raw-convention-drive
//
// PROFESSIONAL (~$6,800):
//   Coverage: Full-day, 2 operators
//   Deliverables: All Essentials + keynote-multicam, attendee-interviews,
//                 after-movie, booth-walkthrough
//
// PREMIER (~$12,000+):
//   Coverage: 2 full days, 2 operators
//   Deliverables: Everything + recap-daily ×2, speaker-spotlight ×3,
//                 sponsor-highlight, sponsor-bumper ×2
//   Add-Ons: drone-coverage, livestreaming, on-site-director
//
const SERVICES = [
    { slug: 'keynote-multicam', name: 'Keynote Multi-Cam Edit w/ Speaker Name Overlays', category: 'deliverable', standardPrice: 600, seniorPrice: 900, mode: 'boolean', sortOrder: 0 },
    { slug: 'booth-walkthrough', name: 'Expo Booth Walkthrough w/ Text Annotations', category: 'deliverable', standardPrice: 350, seniorPrice: 500, mode: 'boolean', sortOrder: 1 },
    { slug: 'sizzle-reel', name: 'Post-Event Sizzle Reel (3-5 min, color graded + motion GFX)', category: 'deliverable', standardPrice: 1200, seniorPrice: 1800, mode: 'boolean', sortOrder: 2 },
    { slug: 'floor-timelapse', name: 'Venue Timelapse (setup → teardown)', category: 'deliverable', standardPrice: 400, seniorPrice: 600, mode: 'boolean', sortOrder: 3 },
    { slug: 'attendee-interviews', name: 'Guest Interview Package w/ Branded Frame', category: 'deliverable', standardPrice: 800, seniorPrice: 1200, mode: 'boolean', sortOrder: 4 },
    { slug: 'panel-session-edit', name: 'Panel / Breakout Session Edit (multi-angle sync)', category: 'footage', standardPrice: 300, seniorPrice: 400, mode: 'quantity', sortOrder: 5 },
    { slug: 'sponsor-highlight', name: 'Sponsor Highlight Montage (logo + footage)', category: 'deliverable', standardPrice: 500, seniorPrice: 800, mode: 'boolean', sortOrder: 6 },
    { slug: 'raw-convention-drive', name: 'Raw Event Footage (hard drive, time-coded)', category: 'footage', standardPrice: 250, seniorPrice: 250, mode: 'boolean', sortOrder: 7 },
    { slug: 'recap-daily', name: 'Daily Recap Reel (end-of-day social post)', category: 'deliverable', standardPrice: 400, seniorPrice: 650, mode: 'quantity', sortOrder: 8 },
    { slug: 'speaker-spotlight', name: 'Speaker Spotlight Package (per speaker)', category: 'deliverable', standardPrice: 350, seniorPrice: 550, mode: 'quantity', sortOrder: 9 },
    { slug: 'social-clip-pack', name: 'Social Clip Pack (10 vertical clips from event)', category: 'deliverable', standardPrice: 600, seniorPrice: 1000, mode: 'boolean', sortOrder: 10 },
    { slug: 'sponsor-bumper', name: 'Animated Sponsor Bumper (15s)', category: 'deliverable', standardPrice: 200, seniorPrice: 350, mode: 'quantity', sortOrder: 11 },
    { slug: 'after-movie', name: 'After-Movie Cinematic Wrap (5-8 min)', category: 'deliverable', standardPrice: 2000, seniorPrice: 3200, mode: 'boolean', sortOrder: 12 },
];

// ─── Add-Ons ────────────────────────────────────────────────────
const ADD_ONS = [
    { slug: 'drone-coverage', name: 'Drone Aerial Coverage (FAA Part 107)', pricePerUnit: 450, unitType: 'hour', sortOrder: 0 },
    { slug: 'livestreaming', name: 'Multi-Platform Livestreaming', pricePerUnit: 800, unitType: 'day', sortOrder: 1 },
    { slug: 'photo-coverage', name: 'Event Photo Coverage', pricePerUnit: 600, unitType: 'day', sortOrder: 2 },
    { slug: 'teleprompter-op', name: 'Teleprompter Operator + Gear', pricePerUnit: 350, unitType: 'day', sortOrder: 3 },
    { slug: 'on-site-director', name: 'On-Site Creative Director', pricePerUnit: 500, unitType: 'day', sortOrder: 4 },
];

// ─── Main ────────────────────────────────────────────────────────
async function main() {
    console.log('🏛️  Seeding Prestige Realty Group demo tenant...\n');

    // Upsert tenant
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

    // Upsert vertical
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

    // Upsert services
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

    // Upsert add-ons
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
    console.log(`    http://localhost:3000/prestige-realty?v=conventions`);
    console.log('\n📦  Package suggestions (toggle these in the UI):');
    console.log('    Essentials (~$3,500)  → sizzle-reel, social-clip-pack, raw footage');
    console.log('    Professional (~$6,800) → + keynote multicam, interviews, after-movie');
    console.log('    Premier (~$12,000+)   → Everything + drone, livestream, creative director');
}

main()
    .catch(e => { console.error('❌  Seed error:', e); process.exit(1); })
    .finally(() => prisma.$disconnect());
