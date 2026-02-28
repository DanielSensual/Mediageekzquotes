/**
 * Unit tests for the MediaGeekz Pricing Engine
 * Uses Node.js built-in test runner (zero dependencies)
 *
 * Run: npm test
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { calculateQuote, DEFAULT_RATES } = require('../engine');

// ─── Helpers ─────────────────────────────────────────────────────

function makeRequest(overrides = {}) {
    return {
        clientName: 'Test Client',
        eventName: 'Test Event',
        location: 'Orlando',
        editorTier: 'standard',
        turnaround: 'standard',
        days: [{ date: '2026-04-01', hours: 8, operators: 1 }],
        deliverables: {},
        addOns: {},
        occcParking: false,
        coi: false,
        travelFee: false,
        ...overrides,
    };
}

// ─── Coverage Tests ──────────────────────────────────────────────

describe('Coverage pricing', () => {
    it('charges half-day for ≤4 hours', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 4, operators: 1 }] }));
        assert.equal(q.coverageTotal, DEFAULT_RATES.halfDay);
    });

    it('charges full-day for 5-8 hours', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 8, operators: 1 }] }));
        assert.equal(q.coverageTotal, DEFAULT_RATES.fullDay);
    });

    it('charges overtime for >8 hours', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 10, operators: 1 }] }));
        const expected = DEFAULT_RATES.fullDay + 2 * DEFAULT_RATES.overtime;
        assert.equal(q.coverageTotal, expected);
    });

    it('multiplies by operator count', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 8, operators: 3 }] }));
        assert.equal(q.coverageTotal, DEFAULT_RATES.fullDay * 3);
    });

    it('sums multiple days', () => {
        const q = calculateQuote(makeRequest({
            days: [
                { hours: 4, operators: 1 },
                { hours: 8, operators: 2 },
            ],
        }));
        assert.equal(q.coverageTotal, DEFAULT_RATES.halfDay + DEFAULT_RATES.fullDay * 2);
    });
});

// ─── Editor Tier Tests ───────────────────────────────────────────

describe('Editor tiers', () => {
    it('uses standard rates by default', () => {
        const q = calculateQuote(makeRequest({
            deliverables: { socialTeaser: true },
        }));
        const item = q.lineItems.find(i => i.category === 'Deliverable' && i.description.includes('Social Media Teaser'));
        assert.equal(item.unitPrice, DEFAULT_RATES.standard.socialTeaser);
    });

    it('uses senior rates when selected', () => {
        const q = calculateQuote(makeRequest({
            editorTier: 'senior',
            deliverables: { socialTeaser: true },
        }));
        const item = q.lineItems.find(i => i.category === 'Deliverable' && i.description.includes('Social Media Teaser'));
        assert.equal(item.unitPrice, DEFAULT_RATES.senior.socialTeaser);
    });

    it('pricing difference between tiers is correct', () => {
        const standard = calculateQuote(makeRequest({
            editorTier: 'standard',
            deliverables: { premiumHighlight: true },
        }));
        const senior = calculateQuote(makeRequest({
            editorTier: 'senior',
            deliverables: { premiumHighlight: true },
        }));
        assert.equal(
            senior.deliverablesTotal - standard.deliverablesTotal,
            DEFAULT_RATES.senior.premiumHighlight - DEFAULT_RATES.standard.premiumHighlight
        );
    });
});

// ─── Turnaround Multiplier Tests ─────────────────────────────────

describe('Turnaround multipliers', () => {
    it('standard turnaround adds no fee', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'standard',
            deliverables: { socialTeaser: true },
        }));
        assert.equal(q.turnaroundFee, 0);
    });

    it('expedited adds 20%', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'expedited',
            deliverables: { socialTeaser: true },
        }));
        const base = DEFAULT_RATES.standard.socialTeaser;
        assert.equal(q.turnaroundFee, Math.round(base * 0.20));
    });

    it('rush adds 35%', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'rush',
            deliverables: { basicRecapReel: true },
        }));
        const base = DEFAULT_RATES.standard.basicRecapReel;
        assert.equal(q.turnaroundFee, Math.round(base * 0.35));
    });

    it('sameDay adds 100%', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'sameDay',
            deliverables: { socialTeaser: true },
        }));
        const base = DEFAULT_RATES.standard.socialTeaser;
        assert.equal(q.turnaroundFee, Math.round(base * 1.00));
    });

    it('per-deliverable turnaround overrides global', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'standard', // global = no fee
            deliverables: {
                socialTeaser: { enabled: true, turnaround: 'rush' }, // override = 35%
                basicRecapReel: true, // inherits standard = no fee
            },
        }));
        const base = DEFAULT_RATES.standard.socialTeaser;
        assert.equal(q.turnaroundFee, Math.round(base * 0.35));
    });
});

// ─── Qty Deliverables ────────────────────────────────────────────

describe('Quantity deliverables', () => {
    it('sessionRecording charges per count', () => {
        const q = calculateQuote(makeRequest({
            deliverables: { sessionRecording: 3 },
        }));
        assert.equal(q.deliverablesTotal, DEFAULT_RATES.standard.sessionRecording * 3);
    });

    it('secondCameraEdit with object syntax', () => {
        const q = calculateQuote(makeRequest({
            deliverables: { secondCameraEdit: { count: 2, turnaround: 'expedited' } },
        }));
        const base = DEFAULT_RATES.standard.secondCameraEdit * 2;
        assert.equal(q.deliverablesTotal, base);
        assert.equal(q.turnaroundFee, Math.round(base * 0.20));
    });
});

// ─── Add-Ons ─────────────────────────────────────────────────────

describe('Add-ons', () => {
    it('drone charges per hour', () => {
        const q = calculateQuote(makeRequest({
            addOns: { droneHours: 3 },
        }));
        assert.equal(q.addOnsTotal, DEFAULT_RATES.droneCoverage * 3);
    });

    it('boolean true add-on covers all days', () => {
        const q = calculateQuote(makeRequest({
            days: [{ hours: 8, operators: 1 }, { hours: 8, operators: 1 }],
            addOns: { livestreaming: true },
        }));
        assert.equal(q.addOnsTotal, DEFAULT_RATES.livestreaming * 2);
    });

    it('array add-on covers selected days only', () => {
        const q = calculateQuote(makeRequest({
            days: [{ hours: 8, operators: 1 }, { hours: 8, operators: 1 }, { hours: 8, operators: 1 }],
            addOns: { photoCoverage: [0, 2] }, // 2 of 3 days
        }));
        assert.equal(q.addOnsTotal, DEFAULT_RATES.photoCoverage * 2);
    });

    it('false add-on charges nothing', () => {
        const q = calculateQuote(makeRequest({
            addOns: { livestreaming: false },
        }));
        assert.equal(q.addOnsTotal, 0);
    });
});

// ─── Logistics ───────────────────────────────────────────────────

describe('Logistics', () => {
    it('OCCC parking multiplies by day count', () => {
        const q = calculateQuote(makeRequest({
            days: [{ hours: 8, operators: 1 }, { hours: 8, operators: 1 }],
            occcParking: true,
        }));
        assert.equal(q.logisticsTotal, DEFAULT_RATES.occcParking * 2);
    });

    it('COI is flat fee', () => {
        const q = calculateQuote(makeRequest({ coi: true }));
        assert.equal(q.logisticsTotal, DEFAULT_RATES.coiFee);
    });

    it('travel fee is flat fee', () => {
        const q = calculateQuote(makeRequest({ travelFee: true }));
        assert.equal(q.logisticsTotal, DEFAULT_RATES.travelFee);
    });

    it('all logistics stack', () => {
        const q = calculateQuote(makeRequest({
            occcParking: true, coi: true, travelFee: true,
        }));
        assert.equal(q.logisticsTotal, DEFAULT_RATES.occcParking + DEFAULT_RATES.coiFee + DEFAULT_RATES.travelFee);
    });
});

// ─── Grand Total & Output Shape ──────────────────────────────────

describe('Output shape', () => {
    it('generates a quote ID in MG-YYYYMMDD-XXXX format', () => {
        const q = calculateQuote(makeRequest());
        assert.match(q.quoteId, /^MG-\d{8}-[A-Z0-9]{4}$/);
    });

    it('grand total equals all category sums', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'expedited',
            deliverables: { socialTeaser: true, sessionRecording: 2 },
            addOns: { droneHours: 1, livestreaming: true },
            occcParking: true, coi: true, travelFee: true,
        }));
        const expected = q.coverageTotal + q.deliverablesTotal + q.turnaroundFee + q.addOnsTotal + q.logisticsTotal;
        assert.equal(q.total, expected);
    });

    it('includes clientName and eventName in output', () => {
        const q = calculateQuote(makeRequest({ clientName: 'Acme', eventName: 'Summit' }));
        assert.equal(q.clientName, 'Acme');
        assert.equal(q.eventName, 'Summit');
    });

    it('includes generatedAt timestamp', () => {
        const q = calculateQuote(makeRequest());
        assert.ok(q.generatedAt);
        assert.doesNotThrow(() => new Date(q.generatedAt));
    });
});

// ─── Edge Cases ──────────────────────────────────────────────────

describe('Edge cases', () => {
    it('empty deliverables = zero deliverable total', () => {
        const q = calculateQuote(makeRequest({ deliverables: {} }));
        assert.equal(q.deliverablesTotal, 0);
    });

    it('no add-ons = zero add-on total', () => {
        const q = calculateQuote(makeRequest({ addOns: {} }));
        assert.equal(q.addOnsTotal, 0);
    });

    it('minimal request (just one day) still works', () => {
        const q = calculateQuote({ days: [{ hours: 4 }] });
        assert.ok(q.total > 0);
        assert.ok(q.quoteId);
    });
});
