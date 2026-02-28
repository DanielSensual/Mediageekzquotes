/**
 * MediaGeekz Videography Quotes — Pricing Engine v3
 * ===================================================
 * Two editor tiers, tiered deliverables, and multi-level turnaround pricing.
 */

const DEFAULT_RATES = {
    // ──── Coverage (per operator) ────────────────────────────────
    halfDay: 850,
    fullDay: 1600,
    overtime: 300,

    // ──── Deliverables: Two-Tier Editing ─────────────────────────
    // Standard Editor (~5 yrs experience)
    standard: {
        socialTeaser: 350,   // 60s same-day teaser
        basicRecapReel: 600,   // 1-2 min, clean edit
        premiumRecapReel: 1200,   // 3-5 min, color graded + motion GFX
        basicHighlight: 800,   // 2-3 min, clean cut
        premiumHighlight: 1500,   // 3-5 min, cinematic edit
        sessionRecording: 200,   // per session, light color/audio
        secondCameraEdit: 300,   // per session, multi-angle sync
        rawFootage: 250,   // includes hard drive
    },
    // Senior Editor (10+ yrs experience)
    senior: {
        socialTeaser: 500,
        basicRecapReel: 900,
        premiumRecapReel: 1800,
        basicHighlight: 1200,
        premiumHighlight: 2500,
        sessionRecording: 300,
        secondCameraEdit: 400,
        rawFootage: 250,   // same — no editing involved
    },

    // ──── Turnaround Multipliers ─────────────────────────────────
    turnaround: {
        standard: 0,      // 2 weeks  — base price
        expedited: 0.20,   // 1 week   — +20%
        rush: 0.35,   // 48 hours — +35%
        nextDay: 0.60,   // 24 hours — +60%
        sameDay: 1.00,   // same day — +100%
    },

    // ──── Premium Add-Ons ────────────────────────────────────────
    droneCoverage: 450,
    livestreaming: 800,
    photoCoverage: 600,
    teleprompterOp: 350,
    onSiteDirector: 500,

    // ──── Logistics ──────────────────────────────────────────────
    occcParking: 75,
    coiFee: 50,
    travelFee: 150,
};

// ─── Helpers ─────────────────────────────────────────────────────

function coverageRate(hours, rates) {
    if (hours <= 4) return rates.halfDay;
    if (hours <= 8) return rates.fullDay;
    return rates.fullDay + (hours - 8) * rates.overtime;
}

function generateQuoteId() {
    const now = new Date();
    const d = now.toISOString().slice(0, 10).replace(/-/g, '');
    const r = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `MG-${d}-${r}`;
}

const TURNAROUND_LABELS = {
    standard: 'Standard (2 weeks)',
    expedited: 'Expedited (1 week)',
    rush: 'Rush (48 hours)',
    nextDay: 'Next-Day (24 hours)',
    sameDay: 'Same-Day',
};

const DELIVERABLE_LABELS = {
    socialTeaser: 'Social Media Teaser (60s)',
    basicRecapReel: 'Basic Recap Reel (1-2 min)',
    premiumRecapReel: 'Premium Recap Reel (3-5 min, color graded + motion GFX)',
    basicHighlight: 'Basic Highlight Reel (2-3 min)',
    premiumHighlight: 'Premium Highlight Reel (3-5 min, cinematic)',
    sessionRecording: 'Full Session Recording (light color/audio)',
    secondCameraEdit: 'Second Camera Angle Edit (multi-angle sync)',
    rawFootage: 'Raw Footage Handover (includes hard drive)',
};

// ─── Main Calculation ────────────────────────────────────────────

function calculateQuote(request, rateOverrides = {}) {
    const rates = { ...DEFAULT_RATES, ...rateOverrides };
    // Deep-merge editor tiers
    if (rateOverrides.standard) rates.standard = { ...DEFAULT_RATES.standard, ...rateOverrides.standard };
    if (rateOverrides.senior) rates.senior = { ...DEFAULT_RATES.senior, ...rateOverrides.senior };
    if (rateOverrides.turnaround) rates.turnaround = { ...DEFAULT_RATES.turnaround, ...rateOverrides.turnaround };

    const lineItems = [];
    const editorTier = request.editorTier || 'standard';
    const editorRates = rates[editorTier] || rates.standard;
    const editorLabel = editorTier === 'senior' ? 'Senior Editor' : 'Standard Editor';
    const turnaroundKey = request.turnaround || 'standard';
    const turnaroundMult = rates.turnaround[turnaroundKey] || 0;
    const dayCount = (request.days || []).length || 1;

    // ──── Coverage ───────────────────────────────────────────────
    let coverageTotal = 0;

    (request.days || []).forEach((day, idx) => {
        const hours = day.hours || 8;
        const operators = day.operators || 1;
        const unitPrice = coverageRate(hours, rates);
        const total = unitPrice * operators;
        coverageTotal += total;

        let tier = hours <= 4 ? 'Half-Day' : 'Full-Day';
        let desc = `Day ${idx + 1}`;
        if (day.date) desc += ` (${day.date})`;
        desc += ` — ${tier} Coverage, ${hours}h`;
        if (hours > 8) desc += ` (includes ${hours - 8}h overtime)`;

        lineItems.push({ category: 'Coverage', description: desc, qty: operators, unitPrice, total });
    });

    // ──── Deliverables (tiered by editor) ────────────────────────
    let deliverablesTotal = 0;
    const del = request.deliverables || {};

    const qtyItems = ['sessionRecording', 'secondCameraEdit'];
    const boolItems = ['socialTeaser', 'basicRecapReel', 'premiumRecapReel', 'basicHighlight', 'premiumHighlight', 'rawFootage'];

    for (const key of boolItems) {
        if (del[key]) {
            const price = editorRates[key];
            lineItems.push({
                category: 'Deliverable',
                description: `${DELIVERABLE_LABELS[key]} [${editorLabel}]`,
                qty: 1, unitPrice: price, total: price,
            });
            deliverablesTotal += price;
        }
    }

    for (const key of qtyItems) {
        const count = parseInt(del[key], 10) || 0;
        if (count > 0) {
            const price = editorRates[key];
            const total = price * count;
            lineItems.push({
                category: 'Deliverable',
                description: `${DELIVERABLE_LABELS[key]} [${editorLabel}]`,
                qty: count, unitPrice: price, total,
            });
            deliverablesTotal += total;
        }
    }

    // ──── Turnaround Fee ─────────────────────────────────────────
    let turnaroundFee = 0;
    if (turnaroundMult > 0 && deliverablesTotal > 0) {
        turnaroundFee = Math.round(deliverablesTotal * turnaroundMult);
        const pct = Math.round(turnaroundMult * 100);
        lineItems.push({
            category: 'Turnaround',
            description: `${TURNAROUND_LABELS[turnaroundKey]} (+${pct}% of editing)`,
            qty: 1, unitPrice: turnaroundFee, total: turnaroundFee,
        });
    }

    // ──── Premium Add-Ons ────────────────────────────────────────
    let addOnsTotal = 0;
    const addOns = request.addOns || {};

    const droneHours = parseInt(addOns.droneHours, 10) || 0;
    if (droneHours > 0) {
        const t = rates.droneCoverage * droneHours;
        lineItems.push({ category: 'Add-On', description: 'Drone Aerial Coverage (FAA Part 107)', qty: droneHours, unitPrice: rates.droneCoverage, total: t });
        addOnsTotal += t;
    }
    if (addOns.livestreaming) {
        const t = rates.livestreaming * dayCount;
        lineItems.push({ category: 'Add-On', description: 'Multi-Platform Livestreaming', qty: dayCount, unitPrice: rates.livestreaming, total: t });
        addOnsTotal += t;
    }
    if (addOns.photoCoverage) {
        const t = rates.photoCoverage * dayCount;
        lineItems.push({ category: 'Add-On', description: 'Event Photo Coverage', qty: dayCount, unitPrice: rates.photoCoverage, total: t });
        addOnsTotal += t;
    }
    if (addOns.teleprompterOp) {
        const t = rates.teleprompterOp * dayCount;
        lineItems.push({ category: 'Add-On', description: 'Teleprompter Operator + Gear', qty: dayCount, unitPrice: rates.teleprompterOp, total: t });
        addOnsTotal += t;
    }
    if (addOns.onSiteDirector) {
        const t = rates.onSiteDirector * dayCount;
        lineItems.push({ category: 'Add-On', description: 'On-Site Creative Director', qty: dayCount, unitPrice: rates.onSiteDirector, total: t });
        addOnsTotal += t;
    }

    // ──── Logistics ──────────────────────────────────────────────
    let logisticsTotal = 0;

    if (request.occcParking) {
        const t = rates.occcParking * dayCount;
        lineItems.push({ category: 'Logistics', description: 'OCCC/Resort Load-in & Parking', qty: dayCount, unitPrice: rates.occcParking, total: t });
        logisticsTotal += t;
    }
    if (request.coi) {
        lineItems.push({ category: 'Logistics', description: 'COI Admin Fee', qty: 1, unitPrice: rates.coiFee, total: rates.coiFee });
        logisticsTotal += rates.coiFee;
    }
    if (request.travelFee) {
        lineItems.push({ category: 'Logistics', description: 'Travel Fee (outside Orlando)', qty: 1, unitPrice: rates.travelFee, total: rates.travelFee });
        logisticsTotal += rates.travelFee;
    }

    // ──── Grand Total ────────────────────────────────────────────
    const subtotal = coverageTotal + deliverablesTotal + turnaroundFee + addOnsTotal + logisticsTotal;

    return {
        quoteId: generateQuoteId(),
        clientName: request.clientName || '',
        eventName: request.eventName || '',
        location: request.location || '',
        editorTier,
        turnaround: turnaroundKey,
        lineItems,
        coverageTotal,
        deliverablesTotal,
        turnaroundFee,
        addOnsTotal,
        logisticsTotal,
        total: subtotal,
        generatedAt: new Date().toISOString(),
    };
}

module.exports = { calculateQuote, DEFAULT_RATES, TURNAROUND_LABELS, DELIVERABLE_LABELS };
