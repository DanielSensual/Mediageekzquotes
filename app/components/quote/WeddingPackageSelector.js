'use client';

import { useState } from 'react';
import { useQuote } from '../../context/QuoteContext';

/**
 * WeddingPackageSelector
 * ─────────────────────
 * Renders 5 quick-pick wedding packages. Clicking one auto-configures
 * the full quote form (days, operators, editor tier, deliverables, add-ons).
 */

const WEDDING_PACKAGES = [
    {
        slug: 'intimate',
        name: 'Intimate',
        tagline: 'Elopements & micro-weddings',
        price: '$2,000',
        hours: 5,
        operators: 1,
        editorTier: 'standard',
        deliverables: ['cinematic-highlights'],
        addOns: [],
    },
    {
        slug: 'classic',
        name: 'Classic',
        tagline: 'The essentials for your big day',
        price: '$4,500',
        hours: 5,
        operators: 2,
        editorTier: 'standard',
        deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'social-trailer'],
        addOns: [],
    },
    {
        slug: 'cinematic',
        name: 'Cinematic',
        tagline: 'Full-day cinematic storytelling',
        badge: 'Most Popular',
        price: '$7,000',
        hours: 8,
        operators: 2,
        editorTier: 'senior',
        deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'reception-party-edit', 'social-trailer'],
        addOns: ['drone-coverage', 'second-shooter'],
    },
    {
        slug: 'premiere',
        name: 'Premiere',
        tagline: 'Same-day reception screening',
        price: '$10,500',
        hours: 10,
        operators: 2,
        editorTier: 'senior',
        deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'reception-party-edit', 'first-look-reveal', 'social-trailer', 'multi-format-export'],
        addOns: ['drone-coverage', 'second-shooter', 'finale-reel'],
    },
    {
        slug: 'legacy',
        name: 'Legacy',
        tagline: 'A love story for generations',
        badge: 'Ultimate',
        price: '$15,000+',
        hours: 14,
        operators: 2,
        editorTier: 'senior',
        deliverables: ['cinematic-highlights', 'full-ceremony-doc', 'love-story-doc', 'reception-party-edit', 'first-look-reveal', 'vow-overlay-edit', 'guest-message-compile', 'social-trailer', 'raw-wedding-drive', 'multi-format-export'],
        addOns: ['drone-coverage', 'second-shooter', 'photo-coverage', 'finale-reel', 'dawn-cut'],
    },
];

export function WeddingPackageSelector() {
    const {
        activeVertical,
        setEditorTier, setDeliverables, setAddOns,
        setDays, setParking, setCoi, setTravelFee, setSelectedPackage, rcAddOns
    } = useQuote();

    const [selected, setSelected] = useState(null);

    // Only show for weddings vertical
    if (activeVertical !== 'weddings') return null;

    const handleSelect = (pkg) => {
        setSelected(pkg.slug);

        // Store the selected package for the sidebar display
        setSelectedPackage({ name: pkg.name, displayPrice: pkg.price });

        // Set editor tier
        setEditorTier(pkg.editorTier || 'standard');

        // Set the coverage day with package-specific hours + operators
        const d = new Date();
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        setDays([{ date: dateStr, hours: pkg.hours || 8, operators: pkg.operators || 2 }]);

        // Set deliverables
        const delivObj = {};
        (pkg.deliverables || []).forEach(slug => { delivObj[slug] = true; });
        setDeliverables(delivObj);

        // Set add-ons (true = enabled for day-type, number for hour-type)
        const aoObj = {};
        (pkg.addOns || []).forEach(slug => {
            const addon = rcAddOns.find(item => item.slug === slug);
            aoObj[slug] = addon?.unitType === 'hour' ? 1 : true;
        });
        setAddOns(aoObj);

        // Enable standard logistics
        setParking(true);
        setCoi(true);
        setTravelFee(false);
    };

    return (
        <div className="card wpkg-card">
            <div className="step-indicator">
                <span className="step-number">✦</span>
                <div>
                    <h2 className="card-title">Quick-Pick Packages</h2>
                    <p className="card-subtitle">Choose a package to auto-fill your quote, or scroll down to customize</p>
                </div>
            </div>

            <div className="wpkg-grid">
                {WEDDING_PACKAGES.map(pkg => (
                    <button
                        key={pkg.slug}
                        type="button"
                        className={`wpkg-option ${selected === pkg.slug ? 'wpkg-active' : ''} ${pkg.badge ? 'wpkg-featured' : ''}`}
                        onClick={() => handleSelect(pkg)}
                    >
                        {pkg.badge && <span className="wpkg-badge">{pkg.badge}</span>}
                        <span className="wpkg-name">{pkg.name}</span>
                        <span className="wpkg-price">{pkg.price}</span>
                        <span className="wpkg-tagline">{pkg.tagline}</span>
                        <span className="wpkg-details">
                            {pkg.operators > 1 ? `${pkg.operators} shooters` : '1 shooter'} · {pkg.hours}hrs
                        </span>
                    </button>
                ))}
            </div>

            {selected && (
                <p className="wpkg-hint">
                    ✓ Package applied — feel free to customize any section below
                </p>
            )}
        </div>
    );
}
