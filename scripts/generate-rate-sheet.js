#!/usr/bin/env node
/**
 * MediaGeekz — Rate Sheet Generator
 * ====================================
 * Generates a premium branded pricing/info sheet PDF
 * for a specific client. Uses PDFKit (already installed).
 *
 * Usage:  node scripts/generate-rate-sheet.js
 * Output: Eventive-Nicole-MediaGeekz-Rates.pdf
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ─── Branding ────────────────────────────────────────────────────
const BRAND = {
    name: 'MEDIAGEEKZ',
    tagline: 'Cinematic Video Production  •  Orlando, FL',
    website: 'mediageekz.com',
    email: 'hello@mediageekz.com',
    phone: '(321) 666-5228',
};

const C = {
    navy: '#05060A',
    navyLight: '#0D1117',
    navyMid: '#161B22',
    orange: '#FF6A00',
    orangeGlow: '#FF8533',
    white: '#FFFFFF',
    offWhite: '#F0F2F5',
    lightGray: '#D1D5DB',
    midGray: '#9CA3AF',
    darkGray: '#6B7280',
    charcoal: '#1F2937',
};

// ─── Client Info ─────────────────────────────────────────────────
const CLIENT = {
    name: 'Nicole',
    company: 'Eventive',
};

// ─── Rate Data ───────────────────────────────────────────────────
const HOURLY_RATES = [
    { service: 'Video Production', rate: 250, unit: 'hr' },
    { service: 'Photography', rate: 250, unit: 'hr' },
    { service: 'Drone Aerial Coverage', rate: 175, unit: 'hr', note: 'FAA Part 107 Certified' },
];

const COVERAGE_PACKAGES = [
    { name: 'Half-Day Coverage', detail: 'Up to 4 hours', price: 800 },
    { name: 'Full-Day Coverage', detail: 'Up to 8 hours', price: 1600 },
    { name: 'Overtime', detail: 'Per additional hour beyond 8', price: 300 },
];

const ADD_ONS = [
    { name: 'Multi-Platform Livestreaming', price: 800, unit: 'day' },
    { name: 'Teleprompter Operator + Gear', price: 350, unit: 'day' },
    { name: 'On-Site Creative Director', price: 500, unit: 'day' },
    { name: 'Event Photo Coverage', price: 600, unit: 'day' },
];

const DELIVERABLES = [
    { name: 'Social Media Teaser (60s)', price: 350 },
    { name: 'Basic Recap Reel (1-2 min)', price: 600 },
    { name: 'Premium Recap Reel (3-5 min)', price: 1200 },
    { name: 'Basic Highlight Reel (2-3 min)', price: 800 },
    { name: 'Premium Highlight Reel (3-5 min, cinematic)', price: 1500 },
    { name: 'Full Session Recording', price: 200, unit: 'session' },
    { name: 'Raw Footage Handover (incl. hard drive)', price: 250 },
];

const TURNAROUND = [
    { tier: 'Standard', time: '2 weeks', surcharge: 'Included' },
    { tier: 'Expedited', time: '1 week', surcharge: '+20%' },
    { tier: 'Rush', time: '48 hours', surcharge: '+35%' },
    { tier: 'Next-Day', time: '24 hours', surcharge: '+60%' },
    { tier: 'Same-Day', time: 'Same day', surcharge: '+100%' },
];

// ─── Helpers ─────────────────────────────────────────────────────
function fmt(n) {
    return '$' + n.toLocaleString('en-US');
}

function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

// ─── PDF Generation ──────────────────────────────────────────────
function generateRateSheet() {
    const outputPath = path.join(__dirname, '..', `Eventive-Nicole-MediaGeekz-Rates.pdf`);

    const doc = new PDFDocument({
        size: 'LETTER',
        margins: { top: 0, bottom: 40, left: 0, right: 0 },
        bufferPages: true,
        info: {
            Title: 'MediaGeekz — Rate Sheet for Eventive',
            Author: 'MediaGeekz',
            Subject: 'Video & Photography Rate Sheet',
        },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const PW = doc.page.width;   // 612
    const PH = doc.page.height;  // 792
    const MX = 50;               // horizontal margin
    const W = PW - MX * 2;      // content width 512

    // ════════════════════════════════════════════════════════════════
    // PAGE 1 — HEADER + HOURLY RATES + COVERAGE
    // ════════════════════════════════════════════════════════════════

    // ── Full-page dark background
    doc.rect(0, 0, PW, PH).fill(C.navy);

    // ── Top orange accent bar
    doc.rect(0, 0, PW, 5).fill(C.orange);

    // ── Header Block
    let y = 36;
    doc.fontSize(32).font('Helvetica-Bold').fillColor(C.orange)
        .text(BRAND.name, MX, y);
    y += 40;

    doc.fontSize(10).font('Helvetica').fillColor(C.midGray)
        .text(BRAND.tagline, MX, y);
    y += 30;

    // ── Divider
    doc.rect(MX, y, 80, 3).fill(C.orange);
    y += 20;

    // ── "Prepared For" section
    doc.fontSize(8).font('Helvetica-Bold').fillColor(C.darkGray)
        .text('PREPARED FOR', MX, y);
    y += 14;
    doc.fontSize(18).font('Helvetica-Bold').fillColor(C.white)
        .text(`${CLIENT.company} / ${CLIENT.name}`, MX, y);
    y += 28;

    const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
    doc.fontSize(9).font('Helvetica').fillColor(C.darkGray)
        .text(dateStr, MX, y);
    y += 36;

    // ═══ SECTION: HOURLY RATES ═══════════════════════════════════
    doc.rect(MX, y, W, 2).fill(C.orange);
    y += 14;
    doc.fontSize(14).font('Helvetica-Bold').fillColor(C.orange)
        .text('HOURLY RATES', MX, y);
    y += 28;

    HOURLY_RATES.forEach((item) => {
        // Card background
        doc.roundedRect(MX, y, W, 52, 6).fill(C.navyLight);

        // Service name
        doc.fontSize(11).font('Helvetica-Bold').fillColor(C.white)
            .text(item.service, MX + 16, y + (item.note ? 12 : 18));

        // Note (if any)
        if (item.note) {
            doc.fontSize(7.5).font('Helvetica').fillColor(C.darkGray)
                .text(item.note, MX + 16, y + 30);
        }

        // Price pill - right side
        const rateText = `${fmt(item.rate)} / ${item.unit}`;
        doc.roundedRect(MX + W - 130, y + 12, 114, 28, 14).fill(C.orange);
        doc.fontSize(12).font('Helvetica-Bold').fillColor(C.white)
            .text(rateText, MX + W - 128, y + 19, { width: 110, align: 'center' });

        y += 62;
    });

    y += 10;

    // ═══ SECTION: COVERAGE PACKAGES ══════════════════════════════
    doc.rect(MX, y, W, 2).fill(C.orange);
    y += 14;
    doc.fontSize(14).font('Helvetica-Bold').fillColor(C.orange)
        .text('COVERAGE PACKAGES', MX, y);
    y += 28;

    // Table header
    doc.roundedRect(MX, y, W, 30, 4).fill(C.navyMid);
    doc.fontSize(8).font('Helvetica-Bold').fillColor(C.midGray);
    doc.text('PACKAGE', MX + 16, y + 10);
    doc.text('DETAILS', MX + 200, y + 10);
    doc.text('PRICE', MX + W - 90, y + 10, { width: 74, align: 'right' });
    y += 30;

    COVERAGE_PACKAGES.forEach((pkg, i) => {
        const rowH = 36;
        const bgColor = i % 2 === 0 ? C.navyLight : C.navy;
        const radius = i === COVERAGE_PACKAGES.length - 1 ? 4 : 0;

        if (i === COVERAGE_PACKAGES.length - 1) {
            // Last row: rounded bottom corners via clipping
            doc.rect(MX, y, W, rowH).fill(bgColor);
        } else {
            doc.rect(MX, y, W, rowH).fill(bgColor);
        }

        doc.fontSize(10).font('Helvetica-Bold').fillColor(C.white)
            .text(pkg.name, MX + 16, y + 11);
        doc.fontSize(9).font('Helvetica').fillColor(C.darkGray)
            .text(pkg.detail, MX + 200, y + 12);
        doc.fontSize(11).font('Helvetica-Bold').fillColor(C.orangeGlow)
            .text(fmt(pkg.price), MX + W - 90, y + 11, { width: 74, align: 'right' });

        y += rowH;
    });

    // ════════════════════════════════════════════════════════════════
    // PAGE 2 — DELIVERABLES + ADD-ONS + TURNAROUND + TERMS
    // ════════════════════════════════════════════════════════════════
    doc.addPage();
    doc.rect(0, 0, PW, PH).fill(C.navy);
    doc.rect(0, 0, PW, 5).fill(C.orange);

    y = 36;

    // ═══ SECTION: POST-PRODUCTION DELIVERABLES ═══════════════════
    doc.rect(MX, y, W, 2).fill(C.orange);
    y += 12;
    doc.fontSize(13).font('Helvetica-Bold').fillColor(C.orange)
        .text('POST-PRODUCTION DELIVERABLES', MX, y);
    y += 8;
    doc.fontSize(8).font('Helvetica').fillColor(C.darkGray)
        .text('Starting at (Standard Editor tier — Senior Editor available at premium)', MX, y);
    y += 18;

    DELIVERABLES.forEach((item, i) => {
        const rowH = 26;
        const bgColor = i % 2 === 0 ? C.navyLight : C.navy;
        doc.rect(MX, y, W, rowH).fill(bgColor);

        doc.fontSize(9).font('Helvetica').fillColor(C.white)
            .text(item.name, MX + 16, y + 7);

        const priceLabel = item.unit ? `${fmt(item.price)} / ${item.unit}` : fmt(item.price);
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.orangeGlow)
            .text(priceLabel, MX + W - 120, y + 7, { width: 104, align: 'right' });

        y += rowH;
    });

    y += 12;

    // ═══ SECTION: ADD-ON SERVICES ════════════════════════════════
    doc.rect(MX, y, W, 2).fill(C.orange);
    y += 12;
    doc.fontSize(13).font('Helvetica-Bold').fillColor(C.orange)
        .text('ADD-ON SERVICES', MX, y);
    y += 22;

    ADD_ONS.forEach((item, i) => {
        const rowH = 26;
        const bgColor = i % 2 === 0 ? C.navyLight : C.navy;
        doc.rect(MX, y, W, rowH).fill(bgColor);

        doc.fontSize(9).font('Helvetica').fillColor(C.white)
            .text(item.name, MX + 16, y + 7);
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.orangeGlow)
            .text(`${fmt(item.price)} / ${item.unit}`, MX + W - 120, y + 7, { width: 104, align: 'right' });

        y += rowH;
    });

    y += 12;

    // ═══ SECTION: TURNAROUND TIERS ═══════════════════════════════
    doc.rect(MX, y, W, 2).fill(C.orange);
    y += 12;
    doc.fontSize(13).font('Helvetica-Bold').fillColor(C.orange)
        .text('TURNAROUND OPTIONS', MX, y);
    y += 22;

    // Table header
    doc.roundedRect(MX, y, W, 24, 4).fill(C.navyMid);
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(C.midGray);
    doc.text('TIER', MX + 16, y + 9);
    doc.text('DELIVERY TIME', MX + 160, y + 9);
    doc.text('SURCHARGE', MX + W - 110, y + 7, { width: 94, align: 'right' });
    y += 24;

    TURNAROUND.forEach((tier, i) => {
        const rowH = 24;
        const bgColor = i % 2 === 0 ? C.navyLight : C.navy;
        doc.rect(MX, y, W, rowH).fill(bgColor);

        const isIncluded = tier.surcharge === 'Included';
        doc.fontSize(9).font('Helvetica-Bold').fillColor(C.white)
            .text(tier.tier, MX + 16, y + 7);
        doc.fontSize(8.5).font('Helvetica').fillColor(C.darkGray)
            .text(tier.time, MX + 160, y + 7);
        doc.fontSize(9).font('Helvetica-Bold')
            .fillColor(isIncluded ? '#22C55E' : C.orangeGlow)
            .text(tier.surcharge, MX + W - 110, y + 7, { width: 94, align: 'right' });

        y += rowH;
    });

    y += 16;

    // ═══ TERMS ═══════════════════════════════════════════════════
    doc.rect(MX, y, W, 1).fill(C.navyMid);
    y += 14;
    doc.fontSize(8).font('Helvetica-Bold').fillColor(C.midGray)
        .text('TERMS & CONDITIONS', MX, y);
    y += 14;

    const terms = [
        'This rate sheet is valid for 30 days from the date of issue.',
        '50% deposit required to secure production date(s). Balance due within 7 days of final delivery.',
        'Standard delivery is 2 weeks from event date unless a faster turnaround is selected.',
        'Cancellations within 48 hours of the event are subject to a 25% cancellation fee.',
        'All footage and deliverables remain IP of MediaGeekz until full payment is received.',
        'Travel fees apply for locations outside the Orlando metro area (30+ miles from downtown).',
    ];

    terms.forEach(term => {
        doc.fontSize(7).font('Helvetica').fillColor(C.darkGray)
            .text(`•  ${term}`, MX + 4, y, { width: W - 8, lineGap: 0 });
        y += 12;
    });

    // ═══ FOOTER ══════════════════════════════════════════════════
    const footerY = PH - 42;
    doc.rect(0, footerY - 8, PW, 2).fill(C.orange);
    const footerText = `${BRAND.name}   •   ${BRAND.website}   •   ${BRAND.email}   •   ${BRAND.phone}`;
    doc.fontSize(8).font('Helvetica').fillColor(C.darkGray)
        .text(footerText, MX, footerY, { width: W, align: 'center', lineBreak: false });

    // ── Remove any trailing blank pages
    const pageRange = doc.bufferedPageRange();
    const totalPages = pageRange.start + pageRange.count;
    // We only want 2 pages — flip to each valid page so PDFKit writes them
    for (let i = 0; i < Math.min(totalPages, 2); i++) {
        doc.switchToPage(i);
    }
    // If there's a 3rd blank page, we can't remove it directly in PDFKit,
    // but ensuring we only reference 2 pages prevents content overflow.

    // ── Finalize
    doc.end();

    stream.on('finish', () => {
        const stats = fs.statSync(outputPath);
        console.log(`✅  Rate sheet generated: ${outputPath}`);
        console.log(`    Size: ${(stats.size / 1024).toFixed(1)} KB`);
    });
}

generateRateSheet();
