/**
 * Unit tests for the MediaGeekz Pricing Engine (V5)
 * Uses Node.js built-in test runner
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { calculateQuote, generateQuoteId } = require('../lib/engine');

// Dummy RateCard
const dummyRateCard = {
    coverage: { halfDay: 850, fullDay: 1600, overtime: 300 },
    turnaround: { expedited: 20, rush: 35, nextDay: 60, sameDay: 100 },
    logistics: { parking: 75, coi: 50, travel: 150 },
    services: [
        { slug: 'promo-video', name: 'Promo Video', standard: 1200, senior: 1800, mode: 'boolean', category: 'deliverable' },
        { slug: 'social-clip', name: 'Social Clip', standard: 350, senior: 550, mode: 'quantity', category: 'deliverable' }
    ],
    addOns: [
        { slug: 'drone', name: 'Drone', pricePerUnit: 450, unitType: 'hour' },
        { slug: 'second-shooter', name: 'Second Shooter', pricePerUnit: 500, unitType: 'day' }
    ]
};

function makeRequest(overrides = {}) {
    return {
        clientName: 'Test Client',
        eventName: 'Test Event',
        location: 'Orlando',
        editorTier: 'standard',
        turnaround: 'standard',
        days: [{ hours: 8, operators: 1 }],
        deliverables: {},
        addOns: {},
        parking: false,
        coi: false,
        travelFee: false,
        ...overrides
    };
}

describe('Coverage Testing', () => {
    it('calculates half day', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 4, operators: 1 }] }), dummyRateCard);
        assert.equal(q.coverageTotal, 850);
    });
    it('calculates full day', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 8, operators: 1 }] }), dummyRateCard);
        assert.equal(q.coverageTotal, 1600);
    });
    it('calculates overtime', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 10, operators: 1 }] }), dummyRateCard);
        assert.equal(q.coverageTotal, 1600 + (2 * 300));
    });
    it('calculates multiple operators', () => {
        const q = calculateQuote(makeRequest({ days: [{ hours: 8, operators: 2 }] }), dummyRateCard);
        assert.equal(q.coverageTotal, 3200);
    });
});

describe('Deliverables & Turnaround', () => {
    it('boolean deliverable standard tier', () => {
        const q = calculateQuote(makeRequest({ deliverables: { 'promo-video': true } }), dummyRateCard);
        assert.equal(q.deliverablesTotal, 1200);
    });
    it('boolean deliverable senior tier', () => {
        const q = calculateQuote(makeRequest({ editorTier: 'senior', deliverables: { 'promo-video': true } }), dummyRateCard);
        assert.equal(q.deliverablesTotal, 1800);
    });
    it('quantity deliverable', () => {
        const q = calculateQuote(makeRequest({ deliverables: { 'social-clip': 3 } }), dummyRateCard);
        assert.equal(q.deliverablesTotal, 1050);
    });
    it('calculates turnaround multiplier', () => {
        const q = calculateQuote(makeRequest({
            turnaround: 'expedited',
            deliverables: { 'promo-video': true }
        }), dummyRateCard);
        assert.equal(q.turnaroundFee, Math.round(1200 * 0.20));
    });
    it('calculates turnaround multiplier with object syntax', () => {
        const q = calculateQuote(makeRequest({
            deliverables: { 'social-clip': { count: 2, turnaround: 'rush' } }
        }), dummyRateCard);
        assert.equal(q.deliverablesTotal, 700);
        assert.equal(q.turnaroundFee, Math.round(700 * 0.35));
    });
});

describe('Add-Ons', () => {
    it('hourly add-on', () => {
        const q = calculateQuote(makeRequest({ addOns: { 'drone': 2 } }), dummyRateCard);
        assert.equal(q.addOnsTotal, 900);
    });
    it('boolean add-on spans all days', () => {
        const q = calculateQuote(makeRequest({
            days: [{}, {}],
            addOns: { 'second-shooter': true }
        }), dummyRateCard);
        assert.equal(q.addOnsTotal, 1000);
    });
});

describe('Logistics', () => {
    it('stacks flat and daily logistics', () => {
        const q = calculateQuote(makeRequest({
            days: [{}, {}], // 2 days
            parking: true, // 75 * 2 = 150
            coi: true, // 50
            travelFee: true // 150
        }), dummyRateCard);
        assert.equal(q.logisticsTotal, 350);
    });
});

describe('Totals & Shape', () => {
    it('grand total combines all categories', () => {
        const q = calculateQuote(makeRequest({
            deliverables: { 'promo-video': true }, // 1200
            turnaround: 'expedited', // 240
            addOns: { 'drone': 1 }, // 450
            coi: true // 50
        }), dummyRateCard); // coverage=1600
        assert.equal(q.total, 1600 + 1200 + 240 + 450 + 50);
    });
    it('generates a valid quote ID', () => {
        const id = generateQuoteId();
        assert.match(id, /^MG-\d{8}-[A-Z0-9]{4}$/);
    });
});
