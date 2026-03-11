/**
 * VideoQuoter — Pricing Engine v5 (Multi-Tenant)
 * =================================================
 * Vertical-agnostic engine that works with any rate card.
 *
 * The engine accepts a RateCard object (loaded from the DB per tenant+vertical)
 * instead of hardcoded DEFAULT_RATES.
 *
 * === RateCard shape ===
 * {
 *   coverage:   { halfDay, fullDay, overtime },
 *   turnaround: { expedited, rush, nextDay, sameDay },  // percentages (20 = 20%)
 *   logistics:  { parking, coi, travel },
 *   services:   [ { slug, name, standard, senior, mode } ],
 *   addOns:     [ { slug, name, pricePerUnit, unitType } ],
 * }
 *
 * Backward-compatible: can still be called with legacy DEFAULT_RATES via adapter.
 */

// ─── Turnaround Labels (universal) ──────────────────────────────
const TURNAROUND_LABELS = {
    standard: 'Standard (2 weeks)',
    expedited: 'Expedited (1 week)',
    rush: 'Rush (48 hours)',
    nextDay: 'Next-Day (24 hours)',
    sameDay: 'Same-Day',
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

function resolveAddOnDayCount(value, totalDays) {
    if (Array.isArray(value)) return value.length;
    if (value === true) return totalDays;
    return 0;
}

/**
 * Convert turnaround percentage (20) to multiplier (0.20).
 * Accepts either format — percentage integer or decimal multiplier.
 */
function turnaroundMultiplier(val) {
    if (val === undefined || val === null) return 0;
    // If > 1, treat as a percentage; otherwise treat as multiplier
    return val > 1 ? val / 100 : val;
}

// ─── Main Calculation ────────────────────────────────────────────

/**
 * @param {Object} request — client-submitted quote request
 * @param {Object} rateCard — { coverage, turnaround, logistics, services, addOns }
 * @returns {Object} QuoteResponse
 */
function calculateQuote(request, rateCard) {
    const cov = rateCard.coverage;
    const turnaroundRates = rateCard.turnaround || {};
    const logistics = rateCard.logistics || {};

    // Build lookup maps from arrays
    const serviceMap = {};
    (rateCard.services || []).forEach(s => { serviceMap[s.slug] = s; });
    const addOnMap = {};
    (rateCard.addOns || []).forEach(a => { addOnMap[a.slug] = a; });

    const lineItems = [];
    const editorTier = request.editorTier || 'standard';
    const editorLabel = editorTier === 'senior' ? 'Senior Editor' : 'Standard Editor';
    const globalTurnaround = request.turnaround || 'standard';
    const dayCount = (request.days || []).length || 1;

    // ──── Coverage ───────────────────────────────────────────────
    let coverageTotal = 0;

    (request.days || []).forEach((day, idx) => {
        const hours = day.hours || 8;
        const operators = day.operators || 1;
        const unitPrice = coverageRate(hours, cov);
        const total = unitPrice * operators;
        coverageTotal += total;

        let tier = hours <= 4 ? 'Half-Day' : 'Full-Day';
        let desc = `Day ${idx + 1}`;
        if (day.date) desc += ` (${day.date})`;
        desc += ` — ${tier} Coverage, ${hours}h`;
        if (hours > 8) desc += ` (includes ${hours - 8}h overtime)`;

        lineItems.push({ category: 'Coverage', description: desc, qty: operators, unitPrice, total });
    });

    // ──── Deliverables ───────────────────────────────────────────
    let deliverablesTotal = 0;
    let turnaroundFee = 0;
    const del = request.deliverables || {};

    for (const [slug, val] of Object.entries(del)) {
        const svc = serviceMap[slug];
        if (!svc) continue;

        const price = editorTier === 'senior' ? svc.senior : svc.standard;

        if (svc.mode === 'boolean') {
            const enabled = typeof val === 'object' ? val.enabled : val;
            if (!enabled) continue;

            lineItems.push({
                category: 'Deliverable',
                description: `${svc.name} [${editorLabel}]`,
                qty: 1, unitPrice: price, total: price,
            });
            deliverablesTotal += price;

            // Turnaround fee
            const itemTurnaround = (typeof val === 'object' && val.turnaround) ? val.turnaround : globalTurnaround;
            const mult = turnaroundMultiplier(turnaroundRates[itemTurnaround]);
            if (mult > 0) {
                const fee = Math.round(price * mult);
                const pct = Math.round(mult * 100);
                lineItems.push({
                    category: 'Turnaround',
                    description: `${TURNAROUND_LABELS[itemTurnaround]} for ${svc.name.split(' (')[0]} (+${pct}%)`,
                    qty: 1, unitPrice: fee, total: fee,
                });
                turnaroundFee += fee;
            }
        } else if (svc.mode === 'quantity') {
            let count = 0;
            let itemTurnaround = globalTurnaround;

            if (typeof val === 'object') {
                count = parseInt(val.count || val.qty || 0, 10);
                if (val.turnaround) itemTurnaround = val.turnaround;
            } else {
                count = parseInt(val, 10) || 0;
            }

            if (count > 0) {
                const total = price * count;
                lineItems.push({
                    category: 'Deliverable',
                    description: `${svc.name} [${editorLabel}]`,
                    qty: count, unitPrice: price, total,
                });
                deliverablesTotal += total;

                const mult = turnaroundMultiplier(turnaroundRates[itemTurnaround]);
                if (mult > 0) {
                    const fee = Math.round(total * mult);
                    const pct = Math.round(mult * 100);
                    lineItems.push({
                        category: 'Turnaround',
                        description: `${TURNAROUND_LABELS[itemTurnaround]} for ${svc.name.split(' (')[0]} (+${pct}%)`,
                        qty: 1, unitPrice: fee, total: fee,
                    });
                    turnaroundFee += fee;
                }
            }
        }
    }

    // ──── Add-Ons ────────────────────────────────────────────────
    let addOnsTotal = 0;
    const addOns = request.addOns || {};

    for (const [slug, val] of Object.entries(addOns)) {
        const addon = addOnMap[slug];
        if (!addon) continue;

        let count = 0;
        if (addon.unitType === 'hour') {
            count = parseInt(val, 10) || 0;
        } else {
            count = resolveAddOnDayCount(val, dayCount);
        }

        if (count > 0) {
            const t = addon.pricePerUnit * count;
            lineItems.push({
                category: 'Add-On',
                description: addon.name,
                qty: count,
                unitPrice: addon.pricePerUnit,
                total: t,
            });
            addOnsTotal += t;
        }
    }

    // ──── Logistics ──────────────────────────────────────────────
    let logisticsTotal = 0;

    if (request.parking) {
        const t = (logistics.parking || 0) * dayCount;
        lineItems.push({ category: 'Logistics', description: 'Venue Load-in & Parking', qty: dayCount, unitPrice: logistics.parking, total: t });
        logisticsTotal += t;
    }
    if (request.coi) {
        const fee = logistics.coi || 0;
        lineItems.push({ category: 'Logistics', description: 'COI Admin Fee', qty: 1, unitPrice: fee, total: fee });
        logisticsTotal += fee;
    }
    if (request.travelFee) {
        const fee = logistics.travel || 0;
        lineItems.push({ category: 'Logistics', description: 'Travel Fee (outside metro)', qty: 1, unitPrice: fee, total: fee });
        logisticsTotal += fee;
    }

    // ──── Grand Total ────────────────────────────────────────────
    const subtotal = coverageTotal + deliverablesTotal + turnaroundFee + addOnsTotal + logisticsTotal;

    return {
        quoteId: generateQuoteId(),
        clientName: request.clientName || '',
        email: request.email || '',
        eventName: request.eventName || '',
        location: request.location || '',
        editorTier,
        turnaround: globalTurnaround,
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

// ─── Legacy Adapter ──────────────────────────────────────────────
// Converts a vertical template object to the RateCard shape expected
// by calculateQuote. Used for tests and the seed/fallback.

function templateToRateCard(template) {
    return {
        coverage: template.coverage,
        turnaround: template.turnaround,
        logistics: template.logistics,
        services: template.services.map(s => ({
            slug: s.slug,
            name: s.name,
            category: s.category,
            standard: s.standard,
            senior: s.senior,
            mode: s.mode,
        })),
        addOns: template.addOns.map(a => ({
            slug: a.slug,
            name: a.name,
            desc: a.desc,
            pricePerUnit: a.price,
            unitType: a.unit,
        })),
    };
}

// ─── DB Row Adapter ──────────────────────────────────────────────
// Converts Prisma Vertical + ServiceItems + AddOnItems to RateCard.

function verticalToRateCard(vertical) {
    return {
        coverage: {
            halfDay: vertical.halfDayRate,
            fullDay: vertical.fullDayRate,
            overtime: vertical.overtimeRate,
        },
        turnaround: {
            expedited: vertical.turnaroundExpedited,
            rush: vertical.turnaroundRush,
            nextDay: vertical.turnaroundNextDay,
            sameDay: vertical.turnaroundSameDay,
        },
        logistics: {
            parking: vertical.parkingFee,
            coi: vertical.coiFee,
            travel: vertical.travelFee,
        },
        services: (vertical.services || [])
            .filter(s => s.enabled)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(s => ({
                slug: s.slug,
                name: s.name,
                category: s.category,
                standard: s.standardPrice,
                senior: s.seniorPrice,
                mode: s.mode,
            })),
        addOns: (vertical.addOns || [])
            .filter(a => a.enabled)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(a => ({
                slug: a.slug,
                name: a.name,
                pricePerUnit: a.pricePerUnit,
                unitType: a.unitType,
            })),
    };
}

module.exports = {
    calculateQuote,
    templateToRateCard,
    verticalToRateCard,
    TURNAROUND_LABELS,
    generateQuoteId,
};
