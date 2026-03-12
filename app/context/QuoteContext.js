'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export const QuoteContext = createContext(null);

const TURNAROUND_SHORT = {
    standard: '2 Weeks', expedited: '1 Week', rush: '48 Hours', nextDay: 'Next-Day', sameDay: 'Same-Day',
};

// ─── Slug mapping (URL slugs → DB vertical slugs) ───────────────
const SLUG_MAP = {
    'conventions': 'conventions',
    'convention-videography': 'conventions',
    'weddings': 'weddings',
    'wedding-films': 'weddings',
    'social-media': 'social-media',
    'social-media-content': 'social-media',
    'restaurants': 'restaurants',
    'restaurant-video': 'restaurants',
    'real-estate': 'real-estate',
    'real-estate-video': 'real-estate',
    'music-videos': 'music-videos',
    'music-video-production': 'music-videos',
    'podcasts': 'podcasts',
    'podcast-production': 'podcasts',
    'fitness': 'fitness',
    'fitness-gym': 'fitness',
    'nightlife': 'nightlife',
    'nightlife-events': 'nightlife',
    'corporate': 'corporate',
    'corporate-video': 'corporate',
    'medical': 'medical',
    'medical-medspa': 'medical',
    'education': 'education',
    'education-video': 'education',
};

function getLocalDateString(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function QuoteProvider({ children }) {
    const params = useParams();
    const searchParams = useSearchParams();
    const tenantSlug = params.tenant;
    const requestedVertical = searchParams.get('v');

    const [loading, setLoading] = useState(true);
    const [tenant, setTenant] = useState(null);
    const [rateCards, setRateCards] = useState({});
    const [activeVertical, setActiveVertical] = useState('');

    // Form State
    const [clientName, setClientName] = useState('');
    const [email, setEmail] = useState('');
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [editorTier, setEditorTier] = useState('standard');
    const [turnaround, setTurnaround] = useState('standard');
    const [days, setDays] = useState([]);
    const [deliverables, setDeliverables] = useState({});
    const [addOns, setAddOns] = useState({});
    const [parking, setParking] = useState(false);
    const [coi, setCoi] = useState(false);
    const [travelFee, setTravelFee] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [mobileInputActive, setMobileInputActive] = useState(false);

    // Quote result
    const [quoteResult, setQuoteResult] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [quoteError, setQuoteError] = useState('');

    // V3: Progress bar calculation
    const progressPct = (() => {
        let steps = 0;
        if (clientName || eventName || location) steps++;
        if (days.length > 0) steps++;
        if (Object.values(deliverables).some(v => v)) steps++;
        if (Object.values(addOns).some(v => v) || parking || coi || travelFee) steps++;
        return Math.round((steps / 4) * 100);
    })();

    useEffect(() => {
        if (!tenantSlug) return;
        fetch(`/api/${tenantSlug}/rates`)
            .then(r => r.json())
            .then(data => {
                setTenant(data.tenant);
                setRateCards(data.rateCards || {});
                const verticals = Object.keys(data.rateCards || {});

                // Match ?v= param to a vertical slug
                if (requestedVertical && verticals.length > 0) {
                    const mapped = SLUG_MAP[requestedVertical] || requestedVertical;
                    const match = verticals.find(v =>
                        v === mapped ||
                        v.toLowerCase().includes(mapped.toLowerCase()) ||
                        mapped.toLowerCase().includes(v.toLowerCase())
                    );
                    setActiveVertical(match || verticals[0]);
                } else if (verticals.length > 0) {
                    setActiveVertical(verticals[0]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [tenantSlug, requestedVertical]);

    const rc = rateCards[activeVertical] || {};
    const services = rc.services || [];
    const rcAddOns = rc.addOns || [];
    const editorRates = (svc) => editorTier === 'senior' ? svc.senior : svc.standard;

    const addDay = () => setDays(prev => [...prev, { date: getLocalDateString(prev.length), hours: 8, operators: 2 }]);
    const removeDay = (idx) => setDays(prev => prev.filter((_, i) => i !== idx));
    const updateDay = (idx, field, value) => setDays(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));

    const toggleDeliverable = (slug) => setDeliverables(prev => ({ ...prev, [slug]: !prev[slug] }));
    const setDeliverableQty = (slug, qty) => setDeliverables(prev => ({ ...prev, [slug]: Math.max(0, qty) }));

    const toggleAddOn = (slug) => setAddOns(prev => ({ ...prev, [slug]: !prev[slug] }));
    const setAddOnQty = (slug, qty) => setAddOns(prev => ({ ...prev, [slug]: Math.max(0, qty) }));

    const localCalc = useCallback(() => {
        if (!rc.coverage) return { lineItems: [], coverageTotal: 0, deliverablesTotal: 0, turnaroundFee: 0, addOnsTotal: 0, logisticsTotal: 0, total: 0 };

        const lineItems = [];
        let coverageTotal = 0, deliverablesTotal = 0, turnaroundFee = 0, addOnsTotal = 0, logisticsTotal = 0;

        days.forEach((day, i) => {
            const hours = day.hours || 8;
            const operators = day.operators || 1;
            let unitPrice;
            if (hours <= 4) unitPrice = rc.coverage.halfDay;
            else if (hours <= 8) unitPrice = rc.coverage.fullDay;
            else unitPrice = rc.coverage.fullDay + (hours - 8) * rc.coverage.overtime;
            const total = unitPrice * operators;
            coverageTotal += total;
            let tier = hours <= 4 ? 'Half-Day' : 'Full-Day';
            let desc = `Day ${i + 1}`;
            if (day.date) desc += ` (${day.date})`;
            desc += ` — ${tier}, ${hours}h`;
            if (hours > 8) desc += ` (incl. ${hours - 8}h OT)`;
            lineItems.push({ category: 'Coverage', description: desc, qty: operators, total });
        });

        services.forEach(svc => {
            const val = deliverables[svc.slug];
            const price = editorRates(svc);

            if (svc.mode === 'boolean' && val) {
                lineItems.push({ category: 'Editing', description: `${svc.name} [${editorTier === 'senior' ? 'Senior' : 'Standard'}]`, qty: 1, total: price });
                deliverablesTotal += price;

                const mult = (rc.turnaround?.[turnaround] || 0) / 100;
                if (mult > 0) {
                    const fee = Math.round(price * mult);
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[turnaround]} — ${svc.name.split(' (')[0]} (+${Math.round(mult * 100)}%)`, qty: 1, total: fee });
                    turnaroundFee += fee;
                }
            } else if (svc.mode === 'quantity' && typeof val === 'number' && val > 0) {
                const total = price * val;
                lineItems.push({ category: 'Editing', description: `${svc.name} [${editorTier === 'senior' ? 'Senior' : 'Standard'}]`, qty: val, total });
                deliverablesTotal += total;

                const mult = (rc.turnaround?.[turnaround] || 0) / 100;
                if (mult > 0) {
                    const fee = Math.round(total * mult);
                    lineItems.push({ category: 'Turnaround', description: `${TURNAROUND_SHORT[turnaround]} — ${svc.name.split(' (')[0]}`, qty: 1, total: fee });
                    turnaroundFee += fee;
                }
            }
        });

        rcAddOns.forEach(addon => {
            const val = addOns[addon.slug];
            let count = 0;
            if (addon.unitType === 'hour' && typeof val === 'number') count = val;
            else if (val) count = Math.max(days.length, 1);
            if (count > 0) {
                const t = addon.pricePerUnit * count;
                lineItems.push({ category: 'Add-On', description: addon.name, qty: count, total: t });
                addOnsTotal += t;
            }
        });

        const dayCount = days.length || 1;
        if (parking && rc.logistics?.parking) {
            const t = rc.logistics.parking * dayCount;
            lineItems.push({ category: 'Logistics', description: 'Venue Parking', qty: dayCount, total: t });
            logisticsTotal += t;
        }
        if (coi && rc.logistics?.coi) {
            lineItems.push({ category: 'Logistics', description: 'COI Admin Fee', qty: 1, total: rc.logistics.coi });
            logisticsTotal += rc.logistics.coi;
        }
        if (travelFee && rc.logistics?.travel) {
            lineItems.push({ category: 'Logistics', description: 'Travel Fee', qty: 1, total: rc.logistics.travel });
            logisticsTotal += rc.logistics.travel;
        }

        const total = coverageTotal + deliverablesTotal + turnaroundFee + addOnsTotal + logisticsTotal;
        return { lineItems, coverageTotal, deliverablesTotal, turnaroundFee, addOnsTotal, logisticsTotal, total };
    }, [rc, days, deliverables, addOns, editorTier, turnaround, parking, coi, travelFee, services, rcAddOns]);

    const calc = localCalc();

    function buildDeliverablesPayload() {
        const out = {};
        services.forEach(svc => {
            const val = deliverables[svc.slug];
            if (svc.mode === 'boolean') out[svc.slug] = !!val;
            else if (svc.mode === 'quantity') out[svc.slug] = typeof val === 'number' ? val : 0;
        });
        return out;
    }

    function buildAddOnsPayload() {
        const out = {};
        rcAddOns.forEach(addon => {
            const val = addOns[addon.slug];
            if (addon.unitType === 'hour') out[addon.slug] = typeof val === 'number' ? val : 0;
            else out[addon.slug] = !!val;
        });
        return out;
    }

    const handleGenerate = async () => {
        setGenerating(true);
        setQuoteError('');
        setQuoteResult(null);
        const requestBody = {
            vertical: activeVertical,
            clientName, email, eventName, location, editorTier, turnaround, days,
            deliverables: buildDeliverablesPayload(),
            addOns: buildAddOnsPayload(),
            parking, coi, travelFee,
        };

        try {
            const res = await fetch(`/api/${tenantSlug}/quote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            setQuoteResult(data);
        } catch (err) {
            console.error('Quote error:', err);
            setQuoteError(err.message || 'Unable to generate quote right now.');
            setQuoteResult(null);
        } finally {
            setGenerating(false);
        }
    };

    const handleDownloadPDF = async () => {
        const requestBody = {
            vertical: activeVertical,
            clientName, email, eventName, location, editorTier, turnaround, days,
            deliverables: buildDeliverablesPayload(),
            addOns: buildAddOnsPayload(),
            parking, coi, travelFee,
        };

        try {
            const res = await fetch(`/api/${tenantSlug}/quote/pdf`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Quote-${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF error:', err);
            setQuoteError('Failed to download the PDF quote.');
        }
    };

    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleCheckout = async (quoteId) => {
        setQuoteError('');
        setCheckoutLoading(true);
        try {
            const res = await fetch(`/api/${tenantSlug}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quoteId }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || `HTTP ${res.status}`);
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Checkout session could not be created.');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setQuoteError(err.message || 'Checkout failed.');
        }
        setCheckoutLoading(false);
    };

    const value = {
        loading, tenant, rateCards, activeVertical, setActiveVertical,
        clientName, setClientName, email, setEmail, eventName, setEventName, location, setLocation,
        editorTier, setEditorTier, turnaround, setTurnaround,
        days, setDays, addDay, removeDay, updateDay,
        deliverables, toggleDeliverable, setDeliverableQty, setDeliverables,
        addOns, toggleAddOn, setAddOnQty, setAddOns,
        parking, setParking, coi, setCoi, travelFee, setTravelFee,
        mobileInputActive, setMobileInputActive,
        selectedPackage, setSelectedPackage,
        quoteResult, quoteError, generating, progressPct, rc, services, rcAddOns, editorRates, calc,
        handleGenerate, handleDownloadPDF, handleCheckout, checkoutLoading
    };

    return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
    return useContext(QuoteContext);
}
