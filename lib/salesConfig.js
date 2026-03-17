/**
 * MediaGeekz Sales Config
 * =======================
 * Central config for the Sales template system.
 * Aggressive pricing minimums — do NOT underquote.
 */

const SERVICE_CATALOG = [
    // ── Crew ──
    {
        id: 'lead-dp',
        category: 'Crew',
        label: 'Lead Cinematographer — Full Day',
        detail: 'Primary camera, lighting, audio setup',
        defaultPrice: 1800,
        min: 1500,
    },
    {
        id: 'camera-op-b',
        category: 'Crew',
        label: 'Camera Operator B — Full Day',
        detail: '2nd angle coverage',
        defaultPrice: 1200,
        min: 1000,
    },
    {
        id: 'camera-op-c',
        category: 'Crew',
        label: 'Camera Operator C — Full Day',
        detail: '3rd angle / B-roll dedicated',
        defaultPrice: 1200,
        min: 1000,
    },
    {
        id: 'audio-tech',
        category: 'Crew',
        label: 'Audio Technician',
        detail: 'Dedicated sound engineer + wireless lavs',
        defaultPrice: 800,
        min: 600,
    },
    {
        id: 'producer',
        category: 'Crew',
        label: 'On-Set Producer / Director',
        detail: 'Creative direction, talent coaching, shot management',
        defaultPrice: 1500,
        min: 1200,
    },

    // ── Post-Production ──
    {
        id: 'interview-edit',
        category: 'Post-Production',
        label: 'Multi-Cam Interview Edit',
        detail: '15–20 min each · synced, color graded, lower thirds',
        defaultPrice: 4500,
        min: 3500,
        perUnit: '/episode',
    },
    {
        id: 'corporate-brand-edit',
        category: 'Post-Production',
        label: 'Corporate Brand Profile Edit',
        detail: '2–3 min · talking-head + dynamic B-roll',
        defaultPrice: 3500,
        min: 2500,
        perUnit: '/video',
    },
    {
        id: 'short-form-batch',
        category: 'Post-Production',
        label: 'Short-Form Social Batch (4x)',
        detail: 'Four 30–60s vertical cuts for Reels/TikTok',
        defaultPrice: 1200,
        min: 800,
        perUnit: '/batch',
    },
    {
        id: 'short-form-edit',
        category: 'Post-Production',
        label: 'Short-Form Edit (Reel/TikTok)',
        detail: '60-sec vertical cuts (9:16)',
        defaultPrice: 250,
        min: 200,
        perUnit: '/clip',
    },
    {
        id: 'long-form-edit',
        category: 'Post-Production',
        label: 'Long-Form Video Edit (Single Cam)',
        detail: '5–15 min · full edit, color, sound design',
        defaultPrice: 3500,
        min: 2500,
        perUnit: '/video',
    },
    {
        id: 'commercial-edit',
        category: 'Post-Production',
        label: 'Commercial / Promo Edit',
        detail: '30–90 sec · premium grade, motion graphics',
        defaultPrice: 3000,
        min: 2000,
        perUnit: '/spot',
    },
    {
        id: 'color-grade',
        category: 'Post-Production',
        label: 'Color Grading (Standalone)',
        detail: 'DaVinci Resolve cinematic grade',
        defaultPrice: 500,
        min: 350,
        perUnit: '/video',
    },
    {
        id: 'sound-design',
        category: 'Post-Production',
        label: 'Sound Design & Mix',
        detail: 'Audio cleanup, music bed, SFX',
        defaultPrice: 500,
        min: 350,
        perUnit: '/video',
    },

    // ── Photography ──
    {
        id: 'bts-photo-cellphone',
        category: 'Photography',
        label: 'BTS Photography — Cellphone',
        detail: 'Behind-the-scenes photos shot on phone',
        defaultPrice: 500,
        min: 400,
    },
    {
        id: 'bts-photo-pro',
        category: 'Photography',
        label: 'BTS Photography — Pro + Editing',
        detail: 'DSLR/mirrorless BTS photos, professionally edited',
        defaultPrice: 900,
        min: 700,
    },
    {
        id: 'headshots',
        category: 'Photography',
        label: 'Professional Headshots',
        detail: 'Studio-quality portraits, retouched',
        defaultPrice: 350,
        min: 250,
        perUnit: '/person',
    },

    // ── Add-Ons ──
    {
        id: 'licensed-music',
        category: 'Add-On',
        label: 'Licensed Music',
        detail: 'Premium royalty-free track per video',
        defaultPrice: 150,
        min: 100,
        perUnit: '/track',
    },
    {
        id: 'motion-graphics',
        category: 'Add-On',
        label: 'Custom Motion Graphics',
        detail: 'Animated titles, logos, transitions',
        defaultPrice: 1000,
        min: 750,
        perUnit: '/package',
    },
    {
        id: 'teleprompter',
        category: 'Add-On',
        label: 'Teleprompter Rental + Operator',
        detail: 'On-set teleprompter with operator',
        defaultPrice: 400,
        min: 300,
    },
    {
        id: 'drone',
        category: 'Add-On',
        label: 'Drone Footage',
        detail: 'FAA-licensed aerial cinematography',
        defaultPrice: 800,
        min: 600,
    },

    // ── Retainers ──
    {
        id: 'retainer-corporate',
        category: 'Retainers',
        label: 'Corporate Growth Retainer',
        detail: 'Monthly unlimited tier: up to 4 long-form & 12 short-form videos',
        defaultPrice: 3500,
        min: 2500,
        perUnit: '/mo',
    },
];

const CONTRACT_CLAUSES = [
    {
        num: '01',
        title: 'Scope of Work',
        text: 'Producer agrees to provide video production services as described in the line items above, including all listed crew, equipment, and post-production deliverables.',
    },
    {
        num: '02',
        title: 'Shoot Date & Location',
        text: 'The shoot date and location are as specified above. Producer will confirm call time and logistics at least 48 hours prior to the shoot. Any changes to the date or location must be agreed upon in writing.',
    },
    {
        num: '03',
        title: 'Payment Terms',
        text: 'A 50% deposit is required to secure the production date. The remaining balance is due upon delivery of the first completed deliverable. All payments are processed securely via Square.',
    },
    {
        num: '04',
        title: 'Deliverables & Timeline',
        text: 'First deliverable will be provided within 7–10 business days of the shoot date. Remaining deliverables follow within 14 business days unless an expedited turnaround is purchased. Two (2) rounds of revisions are included per deliverable.',
    },
    {
        num: '05',
        title: 'Cancellation & Rescheduling',
        text: 'Cancellations made more than 7 days before the shoot date will receive a full deposit refund. Cancellations within 7 days forfeit the deposit. Rescheduling within 48 hours of the shoot incurs a $500 rebooking fee.',
    },
    {
        num: '06',
        title: 'Usage Rights',
        text: 'Client receives a perpetual, non-exclusive license to use all final deliverables for commercial and promotional purposes. Producer retains the right to use footage for portfolio and marketing purposes unless otherwise agreed in writing.',
    },
    {
        num: '07',
        title: 'Acceptance',
        text: 'By signing below, the parties agree to the scope of work, deliverables, and payment terms outlined in this agreement.',
    },
];

const PRODUCERS = [
    { name: 'Matt Workman', email: 'mattworkman@mediageekz.com' },
    { name: 'Daniel Castillo', email: 'danielcastillo@mediageekz.com' },
];

module.exports = { SERVICE_CATALOG, CONTRACT_CLAUSES, PRODUCERS };
