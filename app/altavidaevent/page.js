'use client';

import { useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Invoice — Alta Vida Event Pool Party
   MediaGeekz × Jesse Kader
   ═══════════════════════════════════════════════════════════════ */

const INVOICE_NUMBER = 'MGZ-2026-0330';
const INVOICE_DATE = 'March 30, 2026';
const DUE_DATE = 'April 6, 2026';
const EVENT_DATE = 'March 30, 2026';

const CLIENT = {
    name: 'Jesse Kader',
    company: 'Alta Vida',
    email: '',
};

const LINE_ITEMS = [
    { description: 'Event Videography — Pool Party', detail: '11:00 AM – 2:00 PM · 3 hours on-site', amount: 350 },
];

const BASE_SUBTOTAL = LINE_ITEMS.reduce((s, i) => s + i.amount, 0);
const DEPOSIT_PAID = 0;

const REEL_OPTIONS = [
    { id: 0, label: 'No reels', reels: 0, price: 0 },
    { id: 1, label: '1 Reel', reels: 1, price: 75 },
    { id: 2, label: '2 Reels', reels: 2, price: 150 },
    { id: 3, label: '3 Reels — Bundle', reels: 3, price: 200, badge: 'SAVE $25' },
];

const fmt = (n) => '$' + n.toLocaleString('en-US');

export default function AltaVidaInvoice() {
    const printRef = useRef(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [sigName, setSigName] = useState('');
    const [signed, setSigned] = useState(false);
    const [signedAt, setSignedAt] = useState(null);
    const [reelSelection, setReelSelection] = useState(0);
    const [addonsOpen, setAddonsOpen] = useState(false);

    const selectedReel = REEL_OPTIONS[reelSelection];
    const reelTotal = selectedReel.price;
    const SUBTOTAL = BASE_SUBTOTAL + reelTotal;
    const TOTAL_DUE = SUBTOTAL - DEPOSIT_PAID;

    const handlePrint = () => {
        window.print();
    };

    const handlePayment = () => {
        const reelDesc = reelTotal > 0 ? ` + ${selectedReel.label} Edit` : '';
        const params = new URLSearchParams({
            amount: TOTAL_DUE.toString(),
            desc: `MediaGeekz — Alta Vida Pool Party${reelDesc}`,
        });

        window.location.href = `/altavidaevent/checkout?${params.toString()}`;
    };

    const handleSign = () => {
        if (!sigName.trim()) return;
        const now = new Date();
        setSignedAt(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        setSigned(true);
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');

                :root {
                    --shadow: #060a14;
                    --navy: #0f1729;
                    --panel: rgba(15, 23, 42, 0.88);
                    --border: rgba(232, 98, 44, 0.16);
                    --orange: #e8622c;
                    --teal: #2dd4bf;
                    --cream: #e2e8f0;
                    --white: #f1f5f9;
                    --muted: #94a3b8;
                    --muted-2: #64748b;
                    --muted-3: #475569;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }

                body {
                    font-family: 'Inter', sans-serif !important;
                    color: var(--cream) !important;
                    background:
                        radial-gradient(ellipse at 30% 15%, rgba(232, 98, 44, 0.06), transparent 50%),
                        radial-gradient(ellipse at 70% 85%, rgba(45, 212, 191, 0.04), transparent 50%),
                        linear-gradient(180deg, #0d1220 0%, #080c16 50%, #060a14 100%) !important;
                    line-height: 1.6;
                }

                @media print {
                    body { background: #fff !important; color: #1a1a1a !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .invoice-shell { max-width: 100%; padding: 0; }
                    .invoice-card { border: none; background: #fff !important; box-shadow: none; }
                    .invoice-card * { color: #1a1a1a !important; }
                    .line-header, .line-row { border-color: #ddd !important; }
                    .total-row { background: #f5f5f5 !important; }
                    .brand-mark { color: #e8622c !important; }
                    .contract-section { page-break-before: always; }
                }

                .invoice-shell {
                    max-width: 860px; margin: 0 auto;
                    padding: 60px 24px 80px;
                }

                .print-bar {
                    display: flex; justify-content: flex-end; gap: 12px;
                    margin-bottom: 32px;
                }

                .print-btn {
                    padding: 10px 24px; border: 1px solid rgba(232, 98, 44, 0.3);
                    border-radius: 8px; background: rgba(232, 98, 44, 0.08);
                    color: var(--orange); font-family: 'Inter', sans-serif;
                    font-size: 13px; font-weight: 600; cursor: pointer;
                    letter-spacing: 0.06em; transition: all 0.2s;
                }
                .print-btn:hover { background: rgba(232, 98, 44, 0.16); border-color: var(--orange); }

                .invoice-card {
                    border: 1px solid rgba(100, 116, 139, 0.15);
                    border-radius: 20px; background: var(--panel);
                    padding: 48px 40px; position: relative;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
                }

                .invoice-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 40px; padding-bottom: 32px;
                    border-bottom: 1px solid rgba(100, 116, 139, 0.12);
                }

                .brand-mark {
                    font-family: 'Outfit', sans-serif;
                    font-size: 22px; font-weight: 700; color: var(--orange);
                    letter-spacing: 0.06em;
                }

                .brand-sub {
                    font-size: 11px; color: var(--muted-2); margin-top: 4px;
                    letter-spacing: 0.1em; text-transform: uppercase;
                }

                .invoice-meta { text-align: right; }

                .invoice-id {
                    font-family: 'Outfit', sans-serif;
                    font-size: 11px; font-weight: 700; color: var(--teal);
                    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px;
                }

                .meta-row { font-size: 12px; color: var(--muted); margin-bottom: 3px; }
                .meta-row strong { color: var(--cream); font-weight: 600; }

                .parties {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
                    margin-bottom: 40px;
                }

                .party-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.24em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 10px;
                }

                .party-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 600; color: var(--white); margin-bottom: 2px;
                }

                .party-detail { font-size: 12px; color: var(--muted-2); }

                /* Line items */
                .line-header {
                    display: grid; grid-template-columns: 1fr 120px;
                    padding: 10px 0; border-bottom: 1px solid rgba(232, 98, 44, 0.2);
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-3);
                }

                .line-row {
                    display: grid; grid-template-columns: 1fr 120px;
                    padding: 16px 0; border-bottom: 1px solid rgba(100, 116, 139, 0.08);
                    align-items: center;
                }

                .line-desc { font-size: 14px; color: var(--cream); font-weight: 500; }
                .line-detail { font-size: 11px; color: var(--muted-2); margin-top: 3px; }
                .line-amount { font-size: 16px; color: var(--white); font-weight: 700; text-align: right; }

                .total-section { margin-top: 28px; }

                .total-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 10px 0; font-size: 13px;
                }

                .total-row.highlight {
                    padding: 20px 24px; margin-top: 8px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(232, 98, 44, 0.12), rgba(245, 158, 11, 0.06));
                    border: 1px solid rgba(232, 98, 44, 0.25);
                }

                .total-label { color: var(--muted); }
                .total-label.strong { color: var(--white); font-weight: 700; font-size: 16px; }
                .total-value { color: var(--cream); font-weight: 600; }
                .total-value.big { color: var(--orange); font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700; }

                .notes-section {
                    margin-top: 24px; padding: 20px 24px;
                    border-radius: 12px; background: rgba(45, 212, 191, 0.04);
                    border: 1px solid rgba(45, 212, 191, 0.12);
                    font-size: 12px; color: var(--muted); line-height: 1.8;
                }

                .notes-section strong { color: var(--teal); }

                /* ── Event Details Banner ── */
                .event-banner {
                    margin-bottom: 36px; padding: 24px 28px;
                    border-radius: 16px;
                    background:
                        radial-gradient(ellipse at top right, rgba(232, 98, 44, 0.1), transparent 60%),
                        rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(232, 98, 44, 0.15);
                }

                .event-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 6px 14px; margin-bottom: 14px;
                    border-radius: 999px; background: rgba(232, 98, 44, 0.1);
                    border: 1px solid rgba(232, 98, 44, 0.2);
                    font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
                    text-transform: uppercase; color: var(--orange);
                }

                .event-badge::before {
                    content: ""; width: 6px; height: 6px; border-radius: 50%;
                    background: var(--orange); box-shadow: 0 0 0 4px rgba(232, 98, 44, 0.15);
                    animation: pulse-dot 2s ease-in-out infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { box-shadow: 0 0 0 4px rgba(232, 98, 44, 0.15); }
                    50% { box-shadow: 0 0 0 8px rgba(232, 98, 44, 0.06); }
                }

                .event-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 22px; font-weight: 700; color: var(--white);
                    margin-bottom: 4px;
                }

                .event-detail { font-size: 12px; color: var(--muted-2); }

                .event-meta-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
                    margin-top: 18px;
                }

                .event-meta-item {
                    padding: 12px 14px; border-radius: 10px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(100, 116, 139, 0.08);
                }

                .event-meta-label {
                    font-size: 8px; font-weight: 700; letter-spacing: 0.22em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 4px;
                }

                .event-meta-value {
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 600; color: var(--cream);
                }

                /* ── Payment Actions ── */
                .payment-actions {
                    margin-top: 36px; padding: 32px 28px;
                    border: 1px solid rgba(232, 98, 44, 0.2);
                    border-radius: 18px;
                    background: linear-gradient(180deg, rgba(232, 98, 44, 0.05), transparent);
                }

                .payment-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 18px; font-weight: 700; color: var(--white);
                    margin-bottom: 20px; text-align: center;
                }

                .pay-btn {
                    display: flex; flex-direction: column; align-items: center;
                    gap: 8px; padding: 22px 24px; width: 100%; max-width: 400px;
                    margin: 0 auto;
                    border: none; border-radius: 14px; cursor: pointer;
                    font-family: 'Outfit', sans-serif;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    box-shadow: 0 8px 32px rgba(232, 98, 44, 0.35);
                }

                .pay-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(232, 98, 44, 0.45); }
                .pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .pay-label {
                    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
                    text-transform: uppercase; color: rgba(255,255,255,0.85);
                }

                .pay-amount {
                    font-size: 28px; font-weight: 800; color: var(--white);
                }

                .pay-spinner {
                    width: 22px; height: 22px; border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: var(--white); border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .pay-error {
                    margin-top: 12px; padding: 10px 14px;
                    border-radius: 8px; background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #f87171; font-size: 12px; text-align: center;
                }

                /* ── Add-On Dropdown ── */
                .addons-toggle {
                    display: flex; align-items: center; justify-content: space-between;
                    width: 100%; padding: 18px 22px; margin-top: 28px;
                    border: 1px solid rgba(232, 98, 44, 0.18); border-radius: 14px;
                    background: rgba(232, 98, 44, 0.04);
                    cursor: pointer; transition: all 0.25s ease;
                    user-select: none;
                }

                .addons-toggle:hover { border-color: rgba(232, 98, 44, 0.35); background: rgba(232, 98, 44, 0.07); }
                .addons-toggle.open { border-color: var(--orange); border-bottom-left-radius: 0; border-bottom-right-radius: 0; }

                .addons-toggle-left {
                    display: flex; align-items: center; gap: 12px;
                }

                .addons-toggle-icon {
                    font-size: 20px;
                }

                .addons-toggle-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 15px; font-weight: 600; color: var(--white);
                }

                .addons-toggle-sub {
                    font-size: 11px; color: var(--muted-2); margin-top: 1px;
                }

                .addons-toggle-arrow {
                    font-size: 13px; color: var(--orange);
                    transition: transform 0.3s ease;
                }

                .addons-toggle-arrow.open { transform: rotate(180deg); }

                .addons-panel {
                    overflow: hidden; max-height: 0; opacity: 0;
                    transition: max-height 0.4s ease, opacity 0.3s ease;
                    border: 1px solid transparent; border-top: none;
                    border-radius: 0 0 14px 14px;
                }

                .addons-panel.open {
                    max-height: 500px; opacity: 1;
                    border-color: rgba(232, 98, 44, 0.18);
                    background: rgba(15, 23, 42, 0.5);
                }

                .addons-panel-inner {
                    padding: 20px 22px;
                }

                .reel-option {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 14px 16px; margin-bottom: 8px;
                    border: 1px solid rgba(100, 116, 139, 0.12); border-radius: 10px;
                    background: rgba(15, 23, 42, 0.6);
                    cursor: pointer; transition: all 0.2s ease;
                }

                .reel-option:last-child { margin-bottom: 0; }
                .reel-option:hover { border-color: rgba(232, 98, 44, 0.25); background: rgba(232, 98, 44, 0.04); }

                .reel-option.selected {
                    border-color: var(--orange);
                    background: rgba(232, 98, 44, 0.08);
                    box-shadow: 0 0 0 1px rgba(232, 98, 44, 0.15);
                }

                .reel-radio {
                    width: 18px; height: 18px; border-radius: 50%;
                    border: 2px solid rgba(100, 116, 139, 0.3);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; transition: border-color 0.2s;
                }

                .reel-option.selected .reel-radio { border-color: var(--orange); }

                .reel-radio-inner {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: var(--orange); transform: scale(0);
                    transition: transform 0.2s ease;
                }

                .reel-option.selected .reel-radio-inner { transform: scale(1); }

                .reel-info {
                    flex: 1; margin-left: 14px;
                }

                .reel-label {
                    font-size: 14px; font-weight: 500; color: var(--cream);
                    display: flex; align-items: center; gap: 8px;
                }

                .reel-save-badge {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
                    padding: 2px 8px; border-radius: 999px;
                    background: rgba(45, 212, 191, 0.12); border: 1px solid rgba(45, 212, 191, 0.25);
                    color: var(--teal); text-transform: uppercase;
                }

                .reel-sub {
                    font-size: 11px; color: var(--muted-2); margin-top: 2px;
                }

                .reel-price {
                    font-family: 'Outfit', sans-serif;
                    font-size: 16px; font-weight: 700; color: var(--white);
                    white-space: nowrap;
                }

                .reel-price.free { color: var(--muted-2); font-weight: 500; font-size: 13px; }

                .addons-selected-note {
                    margin-top: 14px; padding: 10px 14px;
                    border-radius: 8px; background: rgba(45, 212, 191, 0.06);
                    border: 1px solid rgba(45, 212, 191, 0.12);
                    font-size: 11px; color: var(--teal); text-align: center;
                }

                .pay-secure-note {
                    margin-top: 14px; text-align: center;
                    font-size: 11px; color: var(--muted-3);
                }

                /* ── Contract Section ── */
                .contract-section {
                    margin-top: 48px; padding-top: 40px;
                    border-top: 1px solid rgba(100, 116, 139, 0.12);
                }

                .contract-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 24px;
                }

                .clause { margin-bottom: 20px; }

                .clause-num {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--orange); margin-bottom: 4px;
                }

                .clause-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 4px;
                }

                .clause-text {
                    font-size: 12px; color: var(--muted); line-height: 1.8;
                }

                /* ── Signature Block ── */
                .sig-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
                    margin-top: 48px; padding-top: 32px;
                    border-top: 1px solid rgba(100, 116, 139, 0.12);
                }

                .sig-label {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 40px;
                }

                .sig-line {
                    border-bottom: 1px solid rgba(100, 116, 139, 0.3);
                    padding-bottom: 8px; margin-bottom: 8px;
                    min-height: 32px;
                }

                .sig-field {
                    font-size: 11px; color: var(--muted-2); margin-bottom: 20px;
                }

                .sig-preview {
                    min-height: 60px; padding: 12px 20px;
                    border-bottom: 2px solid rgba(100, 116, 139, 0.3);
                    margin-bottom: 8px; display: flex; align-items: flex-end;
                }

                .sig-cursive {
                    font-family: 'Dancing Script', cursive;
                    font-size: 32px; font-weight: 700; color: var(--white);
                    line-height: 1.2;
                }

                .sig-input-group { margin-bottom: 20px; }

                .sig-input-label {
                    font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 8px;
                }

                .sig-input {
                    width: 100%; padding: 12px 16px;
                    border: 1px solid rgba(100, 116, 139, 0.2); border-radius: 10px;
                    background: rgba(15, 23, 42, 0.6); color: var(--white);
                    font-family: 'Inter', sans-serif; font-size: 14px;
                    outline: none; transition: border-color 0.2s;
                }

                .sig-input:focus { border-color: var(--orange); }

                .sig-date-auto {
                    font-size: 12px; color: var(--muted); margin-top: 4px;
                }

                .sign-btn {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    width: 100%; padding: 16px;
                    border: none; border-radius: 12px; cursor: pointer;
                    background: linear-gradient(135deg, var(--orange), #f59e0b);
                    color: var(--white); font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 700; letter-spacing: 0.08em;
                    text-transform: uppercase; margin-top: 20px;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 6px 24px rgba(232, 98, 44, 0.3);
                }

                .sign-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(232, 98, 44, 0.4); }
                .sign-btn:disabled { opacity: 0.4; cursor: not-allowed; }

                .signed-badge {
                    display: flex; align-items: center; gap: 10px;
                    padding: 14px 20px; border-radius: 12px;
                    background: rgba(45, 212, 191, 0.08);
                    border: 1px solid rgba(45, 212, 191, 0.25);
                    margin-top: 16px;
                }

                .signed-badge-icon { font-size: 20px; }
                .signed-badge-text { font-size: 12px; color: var(--teal); font-weight: 600; }
                .signed-badge-time { font-size: 11px; color: var(--muted-2); margin-top: 2px; }

                .print-contract-btn {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    width: 100%; padding: 14px; margin-top: 12px;
                    border: 1px solid rgba(100, 116, 139, 0.3); border-radius: 10px;
                    background: transparent; color: var(--white);
                    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
                    cursor: pointer; transition: all 0.2s;
                }
                .print-contract-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(100, 116, 139, 0.5);
                }

                .back-link {
                    display: inline-flex; align-items: center; gap: 8px;
                    margin-bottom: 20px; font-size: 12px; color: var(--muted);
                    text-decoration: none; transition: color 0.2s;
                }
                .back-link:hover { color: var(--orange); }

                /* ── Footer ── */
                .invoice-footer {
                    text-align: center; margin-top: 48px;
                    padding-top: 32px;
                    border-top: 1px solid rgba(100, 116, 139, 0.08);
                }

                .footer-logo {
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 700; letter-spacing: 0.4em;
                    text-transform: uppercase; color: var(--muted-3); margin-bottom: 6px;
                }

                .footer-tagline {
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 300; font-style: italic;
                    color: rgba(100, 116, 139, 0.4);
                }

                @media (max-width: 640px) {
                    .invoice-shell { padding: 24px 12px 60px; }
                    .invoice-card { padding: 24px 16px; border-radius: 14px; }
                    .invoice-header { flex-direction: column; gap: 20px; }
                    .invoice-meta { text-align: left; }
                    .parties { grid-template-columns: 1fr; gap: 20px; }
                    .line-header { grid-template-columns: 1fr 80px; }
                    .line-row { grid-template-columns: 1fr 80px; padding: 12px 0; }
                    .line-desc { font-size: 13px; }
                    .line-detail { font-size: 10px; }
                    .line-amount { font-size: 14px; }
                    .total-row.highlight { padding: 16px 18px; }
                    .total-value.big { font-size: 22px; }
                    .sig-grid { grid-template-columns: 1fr; gap: 32px; }
                    .sig-cursive { font-size: 26px; }
                    .event-meta-grid { grid-template-columns: 1fr; }
                    .pay-amount { font-size: 24px; }
                }

                @media print {
                    .no-print { display: none !important; }
                    .sig-input-group, .sign-btn, .print-contract-btn { display: none !important; }
                }
            `}</style>

            <div className="invoice-shell" ref={printRef}>
                <a href="/" className="back-link no-print">← Back to Dashboard</a>

                <div className="print-bar no-print">
                    <button className="print-btn" onClick={handlePrint}>
                        🖨️ Print / Save PDF
                    </button>
                </div>

                <div className="invoice-card">
                    {/* ── Header ── */}
                    <div className="invoice-header">
                        <div>
                            <div className="brand-mark">MediaGeekz</div>
                            <div className="brand-sub">Cinematic Video Production</div>
                            <div style={{ marginTop: 12, fontSize: 11, color: '#64748b', lineHeight: 1.8 }}>
                                Orlando, FL<br />
                                danielcastillo@mediageekz.com
                            </div>
                        </div>
                        <div className="invoice-meta">
                            <div className="invoice-id">Invoice {INVOICE_NUMBER}</div>
                            <div className="meta-row"><strong>Issued:</strong> {INVOICE_DATE}</div>
                            <div className="meta-row"><strong>Due:</strong> {DUE_DATE}</div>
                            <div className="meta-row"><strong>Event Date:</strong> {EVENT_DATE}</div>
                        </div>
                    </div>

                    {/* ── Parties ── */}
                    <div className="parties">
                        <div>
                            <div className="party-label">From</div>
                            <div className="party-name">MediaGeekz LLC</div>
                            <div className="party-detail">Daniel Castillo</div>
                            <div className="party-detail">Orlando, FL</div>
                        </div>
                        <div>
                            <div className="party-label">Bill To</div>
                            <div className="party-name">{CLIENT.name}</div>
                            <div className="party-detail">{CLIENT.company}</div>
                        </div>
                    </div>

                    {/* ── Event Details Banner ── */}
                    <div className="event-banner">
                        <div className="event-badge">Event Coverage</div>
                        <div className="event-title">Alta Vida — Pool Party</div>
                        <div className="event-detail">On-location event videography — footage captured and ready for delivery</div>

                        <div className="event-meta-grid">
                            <div className="event-meta-item">
                                <div className="event-meta-label">Date</div>
                                <div className="event-meta-value">March 30, 2026</div>
                            </div>
                            <div className="event-meta-item">
                                <div className="event-meta-label">Time</div>
                                <div className="event-meta-value">11:00 AM – 2:00 PM</div>
                            </div>
                            <div className="event-meta-item">
                                <div className="event-meta-label">Status</div>
                                <div className="event-meta-value" style={{ color: '#2dd4bf' }}>✓ Completed</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Line Items ── */}
                    <div className="line-header">
                        <div>Description</div>
                        <div style={{ textAlign: 'right' }}>Amount</div>
                    </div>

                    {LINE_ITEMS.map((item, i) => (
                        <div className="line-row" key={i}>
                            <div>
                                <div className="line-desc">{item.description}</div>
                                <div className="line-detail">{item.detail}</div>
                            </div>
                            <div className="line-amount">{fmt(item.amount)}</div>
                        </div>
                    ))}

                    {/* ── Add-On: Reel Edits (Collapsible) ── */}
                    <div
                        className={`addons-toggle no-print ${addonsOpen ? 'open' : ''}`}
                        onClick={() => setAddonsOpen(!addonsOpen)}
                    >
                        <div className="addons-toggle-left">
                            <span className="addons-toggle-icon">🎬</span>
                            <div>
                                <div className="addons-toggle-text">
                                    Add-On: Reel Edits
                                    {reelTotal > 0 && <span style={{ color: 'var(--orange)', marginLeft: 8 }}>+{fmt(reelTotal)}</span>}
                                </div>
                                <div className="addons-toggle-sub">30-second edited reels from event footage · $75 each or 3 for $200</div>
                            </div>
                        </div>
                        <span className={`addons-toggle-arrow ${addonsOpen ? 'open' : ''}`}>▼</span>
                    </div>

                    <div className={`addons-panel no-print ${addonsOpen ? 'open' : ''}`}>
                        <div className="addons-panel-inner">
                            {REEL_OPTIONS.map((opt) => (
                                <div
                                    key={opt.id}
                                    className={`reel-option ${reelSelection === opt.id ? 'selected' : ''}`}
                                    onClick={() => setReelSelection(opt.id)}
                                >
                                    <div className="reel-radio">
                                        <div className="reel-radio-inner" />
                                    </div>
                                    <div className="reel-info">
                                        <div className="reel-label">
                                            {opt.label}
                                            {opt.badge && <span className="reel-save-badge">{opt.badge}</span>}
                                        </div>
                                        <div className="reel-sub">
                                            {opt.reels === 0 ? 'Footage only — no editing' : `${opt.reels} × 30-sec reel${opt.reels > 1 ? 's' : ''} edited from event footage`}
                                        </div>
                                    </div>
                                    <div className={`reel-price ${opt.price === 0 ? 'free' : ''}`}>
                                        {opt.price === 0 ? '—' : fmt(opt.price)}
                                    </div>
                                </div>
                            ))}

                            {reelTotal > 0 && (
                                <div className="addons-selected-note">
                                    ✓ {selectedReel.label} selected — adds {fmt(reelTotal)} to invoice total
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Totals ── */}
                    <div className="total-section">
                        <div className="total-row">
                            <span className="total-label">Event Coverage</span>
                            <span className="total-value">{fmt(BASE_SUBTOTAL)}</span>
                        </div>
                        {reelTotal > 0 && (
                            <div className="total-row">
                                <span className="total-label">Reel Edits — {selectedReel.label}</span>
                                <span className="total-value">{fmt(reelTotal)}</span>
                            </div>
                        )}
                        <div className="total-row highlight">
                            <span className="total-label strong">Total Due</span>
                            <span className="total-value big">{fmt(TOTAL_DUE)}</span>
                        </div>
                    </div>

                    <div className="notes-section">
                        <strong>📦 Footage Delivery:</strong> Raw event footage will be organized and delivered within 48 hours of payment receipt via secure cloud transfer.<br /><br />
                        <strong>📝 Note:</strong> This invoice covers event videography for the Alta Vida Pool Party on March 30, 2026. Coverage included 3 hours of on-location shooting (11 AM – 2 PM).
                    </div>

                    {/* ── Payment Actions ── */}
                    <div className="payment-actions no-print">
                        <div className="payment-title">Pay Invoice</div>
                        <button
                            className="pay-btn"
                            onClick={() => handlePayment()}
                            disabled={!!loading}
                        >
                            {loading ? (
                                <span className="pay-spinner" />
                            ) : (
                                <>
                                    <span className="pay-label">Pay Now</span>
                                    <span className="pay-amount">{fmt(TOTAL_DUE)}</span>
                                </>
                            )}
                        </button>
                        {error && <div className="pay-error">{error}</div>}
                        <div className="pay-secure-note">🔒 Payments processed securely via Square · Card, Apple Pay, Google Pay</div>
                    </div>

                    {/* ═══════════════════════════════════════════════
                        CONTRACT / AGREEMENT
                    ═══════════════════════════════════════════════ */}
                    <div className="contract-section">
                        <div className="contract-title">Production Services Agreement</div>

                        <div className="clause">
                            <div className="clause-num">1. Scope of Work</div>
                            <div className="clause-text">
                                MediaGeekz LLC (&ldquo;Producer&rdquo;) has provided event videography services for {CLIENT.company} (&ldquo;Client&rdquo;) as outlined in this invoice. Services included: on-site event videography coverage of the Alta Vida Pool Party on March 30, 2026, from 11:00 AM to 2:00 PM, including camera operation, B-roll capture, and crowd/atmosphere footage.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">2. Event Date &amp; Location</div>
                            <div className="clause-text">
                                The event was held on <strong>March 30, 2026</strong>. Filming covered the pool party from 11:00 AM to 2:00 PM (3 hours of continuous coverage).
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">3. Payment</div>
                            <div className="clause-text">
                                Total production cost is <strong>{fmt(SUBTOTAL)}</strong>. Payment is due within seven (7) days of invoice date. Payments may be made via credit card, Apple Pay, Google Pay, or check.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">4. Deliverables</div>
                            <div className="clause-text">
                                Producer will deliver organized raw event footage via secure cloud transfer within 48 hours of payment receipt. Footage includes all camera angles and B-roll captures from the event.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">5. Usage Rights</div>
                            <div className="clause-text">
                                Upon full payment, Client receives unlimited usage rights to all delivered video assets for internal and external marketing, social media, and promotional purposes. Producer retains the right to use footage in its portfolio and promotional materials unless otherwise agreed in writing.
                            </div>
                        </div>

                        <div className="clause">
                            <div className="clause-num">6. Acceptance</div>
                            <div className="clause-text">
                                By signing below, both parties agree to the terms outlined in this agreement and the attached invoice.
                            </div>
                        </div>

                        {/* ── Signature Block ── */}
                        <div className="sig-grid">
                            <div className="sig-block">
                                <div className="sig-label">Producer — MediaGeekz</div>

                                <div>
                                    <div className="sig-preview">
                                        <span className="sig-cursive">Daniel Castillo</span>
                                    </div>
                                    <div className="sig-field">Signature</div>
                                    <div className="sig-line" style={{ borderBottomColor: 'rgba(100, 116, 139, 0.3)' }}>
                                        <span style={{ fontSize: 13, color: 'var(--cream)' }}>Daniel Castillo</span>
                                    </div>
                                    <div className="sig-field">Printed Name</div>
                                    <div className="sig-line" style={{ borderBottomColor: 'rgba(100, 116, 139, 0.3)' }}>
                                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>danielcastillo@mediageekz.com</span>
                                    </div>
                                    <div className="sig-field">Email</div>
                                    <div className="sig-line" style={{ borderBottomColor: 'rgba(100, 116, 139, 0.3)' }}>
                                        <span style={{ fontSize: 13, color: 'var(--cream)' }}>{INVOICE_DATE}</span>
                                    </div>
                                    <div className="sig-field">Date</div>
                                </div>
                            </div>
                            <div className="sig-block">
                                <div className="sig-label">Client — {CLIENT.company}</div>
                                {signed ? (
                                    <>
                                        <div className="sig-preview">
                                            <span className="sig-cursive">{sigName}</span>
                                        </div>
                                        <div className="sig-field">Signature</div>
                                        <div className="sig-line" style={{ borderBottomColor: 'rgba(100, 116, 139, 0.3)' }}>
                                            <span style={{ fontSize: 13, color: 'var(--cream)' }}>{sigName}</span>
                                        </div>
                                        <div className="sig-field">Printed Name</div>
                                        <div className="sig-line" style={{ borderBottomColor: 'rgba(100, 116, 139, 0.3)' }}>
                                            <span style={{ fontSize: 13, color: 'var(--cream)' }}>{signedAt}</span>
                                        </div>
                                        <div className="sig-field">Date</div>
                                        <div className="signed-badge">
                                            <span className="signed-badge-icon">✓</span>
                                            <div>
                                                <div className="signed-badge-text">Agreement Signed</div>
                                                <div className="signed-badge-time">{signedAt}</div>
                                            </div>
                                        </div>
                                        <button className="print-contract-btn no-print" onClick={handlePrint}>
                                            📄 Download Signed PDF
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="sig-input-group">
                                            <div className="sig-input-label">Type your full name to sign</div>
                                            <input
                                                type="text"
                                                className="sig-input"
                                                placeholder={CLIENT.name}
                                                value={sigName}
                                                onChange={(e) => setSigName(e.target.value)}
                                            />
                                        </div>
                                        {sigName.trim() && (
                                            <div className="sig-preview">
                                                <span className="sig-cursive">{sigName}</span>
                                            </div>
                                        )}
                                        <div className="sig-date-auto">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        <button
                                            className="sign-btn"
                                            onClick={handleSign}
                                            disabled={!sigName.trim()}
                                        >
                                            ✍️ Sign Agreement
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="invoice-footer">
                        <div className="footer-logo">MediaGeekz</div>
                        <div className="footer-tagline">Cinematic stories. Elevated brands.</div>
                    </div>
                </div>
            </div>
        </>
    );
}
