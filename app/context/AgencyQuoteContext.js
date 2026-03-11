'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { calculateQuote, templateToRateCard, generateQuoteId } from '@/lib/engine';

// ─── Import the agency rate card directly (no DB fetch) ──────────
const agencyTemplate = require('@/lib/verticals/agency');
const RATE_CARD = templateToRateCard(agencyTemplate);

export const AgencyQuoteContext = createContext(null);

const TURNAROUND_SHORT = {
    standard: '2 Weeks', expedited: '1 Week', rush: '48 Hours', nextDay: 'Next-Day', sameDay: 'Same-Day',
};

function getLocalDateString(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function AgencyQuoteProvider({ children }) {
    // ── Project Info ──
    const [clientName, setClientName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    // ── Coverage ──
    const [days, setDays] = useState([]);
    const addDay = () => setDays(prev => [...prev, { date: getLocalDateString(prev.length + 7), hours: 8, operators: 1 }]);
    const removeDay = (idx) => setDays(prev => prev.filter((_, i) => i !== idx));
    const updateDay = (idx, field, value) => setDays(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));

    // ── Editor / Turnaround ──
    const [editorTier, setEditorTier] = useState('standard');
    const [turnaround, setTurnaround] = useState('standard');

    // ── Deliverables ──
    const [deliverables, setDeliverables] = useState({});
    const toggleDeliverable = (slug) => setDeliverables(prev => ({ ...prev, [slug]: !prev[slug] }));
    const setDeliverableQty = (slug, qty) => setDeliverables(prev => ({ ...prev, [slug]: Math.max(0, qty) }));

    // ── Add-Ons ──
    const [addOns, setAddOns] = useState({});
    const toggleAddOn = (slug) => setAddOns(prev => ({ ...prev, [slug]: !prev[slug] }));
    const setAddOnQty = (slug, qty) => setAddOns(prev => ({ ...prev, [slug]: Math.max(0, qty) }));

    // ── Logistics ──
    const [parking, setParking] = useState(false);
    const [coi, setCoi] = useState(false);
    const [travelFee, setTravelFee] = useState(false);

    // ── Markup ──
    const [markupType, setMarkupType] = useState('percentage'); // 'percentage' | 'fixed'
    const [markupValue, setMarkupValue] = useState(20);

    // ── Derived rate card data ──
    const rc = RATE_CARD;
    const services = rc.services || [];
    const rcAddOns = rc.addOns || [];
    const editorRates = (svc) => editorTier === 'senior' ? svc.senior : svc.standard;

    // ── Local Calculation ──
    const localCalc = useCallback(() => {
        if (!rc.coverage) return { lineItems: [], coverageTotal: 0, deliverablesTotal: 0, turnaroundFee: 0, addOnsTotal: 0, logisticsTotal: 0, total: 0 };

        const lineItems = [];
        let coverageTotal = 0, deliverablesTotal = 0, turnaroundFee = 0, addOnsTotal = 0, logisticsTotal = 0;

        // Coverage — always 1 DP per day
        days.forEach((day, i) => {
            const hours = day.hours || 8;
            const operators = 1; // Always 1 DP — additional crew goes through add-ons
            let unitPrice;
            if (hours <= 4) unitPrice = rc.coverage.halfDay;
            else if (hours <= 8) unitPrice = rc.coverage.fullDay;
            else unitPrice = rc.coverage.fullDay + (hours - 8) * rc.coverage.overtime;
            const total = unitPrice * operators;
            coverageTotal += total;
            let tier = hours <= 4 ? 'Half-Day' : 'Full-Day';
            let desc = `Day ${i + 1} — DP / Lead Camera`;
            if (day.date) desc += ` (${day.date})`;
            desc += ` — ${tier}, ${hours}h`;
            if (hours > 8) desc += ` (incl. ${hours - 8}h OT)`;
            lineItems.push({ category: 'Coverage', description: desc, qty: operators, unitPrice, total });
        });

        // Deliverables
        services.forEach(svc => {
            const val = deliverables[svc.slug];
            const price = editorRates(svc);

            if (svc.mode === 'boolean' && val) {
                lineItems.push({ category: svc.category === 'post' ? 'Post-Production' : svc.category === 'footage' ? 'Footage' : 'Deliverable', description: svc.name, qty: 1, unitPrice: price, total: price });
                deliverablesTotal += price;

                const mult = (rc.turnaround?.[turnaround] || 0) / 100;
                if (mult > 0) {
                    const fee = Math.round(price * mult);
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[turnaround]} — ${svc.name.split(' (')[0]} (+${Math.round(mult * 100)}%)`, qty: 1, unitPrice: fee, total: fee });
                    turnaroundFee += fee;
                }
            } else if (svc.mode === 'quantity' && typeof val === 'number' && val > 0) {
                const total = price * val;
                lineItems.push({ category: svc.category === 'post' ? 'Post-Production' : 'Deliverable', description: svc.name, qty: val, unitPrice: price, total });
                deliverablesTotal += total;

                const mult = (rc.turnaround?.[turnaround] || 0) / 100;
                if (mult > 0) {
                    const fee = Math.round(total * mult);
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[turnaround]} — ${svc.name.split(' (')[0]}`, qty: 1, unitPrice: fee, total: fee });
                    turnaroundFee += fee;
                }
            }
        });

        // Add-Ons (crew + equipment)
        rcAddOns.forEach(addon => {
            const val = addOns[addon.slug];
            let count = 0;
            if (addon.unitType === 'hour' && typeof val === 'number') count = val;
            else if (val) count = Math.max(days.length, 1);
            if (count > 0) {
                const t = addon.pricePerUnit * count;
                lineItems.push({ category: 'Add-On', description: addon.name, qty: count, unitPrice: addon.pricePerUnit, total: t });
                addOnsTotal += t;
            }
        });

        // Logistics
        const dayCount = days.length || 1;
        if (parking && rc.logistics?.parking) {
            const t = rc.logistics.parking * dayCount;
            lineItems.push({ category: 'Logistics', description: 'Venue Parking', qty: dayCount, unitPrice: rc.logistics.parking, total: t });
            logisticsTotal += t;
        }
        if (coi && rc.logistics?.coi) {
            lineItems.push({ category: 'Logistics', description: 'COI Admin Fee', qty: 1, unitPrice: rc.logistics.coi, total: rc.logistics.coi });
            logisticsTotal += rc.logistics.coi;
        }
        if (travelFee && rc.logistics?.travel) {
            lineItems.push({ category: 'Logistics', description: 'Travel Fee', qty: 1, unitPrice: rc.logistics.travel, total: rc.logistics.travel });
            logisticsTotal += rc.logistics.travel;
        }

        const subtotal = coverageTotal + deliverablesTotal + turnaroundFee + addOnsTotal + logisticsTotal;

        // Markup
        let markupAmount = 0;
        if (markupType === 'percentage') {
            markupAmount = Math.round(subtotal * (markupValue / 100));
        } else {
            markupAmount = markupValue || 0;
        }

        return { lineItems, coverageTotal, deliverablesTotal, turnaroundFee, addOnsTotal, logisticsTotal, subtotal, markupAmount, clientTotal: subtotal + markupAmount };
    }, [rc, days, deliverables, addOns, editorTier, turnaround, parking, coi, travelFee, markupType, markupValue, services, rcAddOns]);

    const calc = localCalc();

    // ── Progress ──
    const progressPct = (() => {
        let steps = 0;
        if (clientName || businessType) steps++;
        if (days.length > 0) steps++;
        if (Object.values(deliverables).some(v => v)) steps++;
        if (Object.values(addOns).some(v => v) || parking || coi || travelFee) steps++;
        if (markupValue > 0) steps++;
        return Math.round((steps / 5) * 100);
    })();

    const value = {
        // Project info
        clientName, setClientName, businessType, setBusinessType, projectDescription, setProjectDescription,
        // Coverage
        days, setDays, addDay, removeDay, updateDay,
        // Editor / turnaround
        editorTier, setEditorTier, turnaround, setTurnaround,
        // Deliverables
        deliverables, setDeliverables, toggleDeliverable, setDeliverableQty,
        // Add-ons
        addOns, setAddOns, toggleAddOn, setAddOnQty,
        // Logistics
        parking, setParking, coi, setCoi, travelFee, setTravelFee,
        // Markup
        markupType, setMarkupType, markupValue, setMarkupValue,
        // Derived
        rc, services, rcAddOns, editorRates, calc, progressPct,
    };

    return <AgencyQuoteContext.Provider value={value}>{children}</AgencyQuoteContext.Provider>;
}

export function useAgencyQuote() {
    return useContext(AgencyQuoteContext);
}
