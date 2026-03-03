'use client';

import { useEffect, useRef } from 'react';
import { useQuote } from '../../context/QuoteContext';

export function QuoteTabs() {
    const { rateCards, activeVertical, setActiveVertical, setDeliverables, setAddOns } = useQuote();
    const tabsRef = useRef(null);
    const verticalSlugs = Object.keys(rateCards);

    useEffect(() => {
        if (!tabsRef.current || !activeVertical) return;
        const activeBtn = tabsRef.current.querySelector(`[data-slug="${activeVertical}"]`);
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [activeVertical]);

    if (verticalSlugs.length <= 1) return null;

    return (
        <div className="vertical-tabs-wrapper">
            <nav className="vertical-tabs" ref={tabsRef}>
                {verticalSlugs.map(slug => (
                    <button
                        key={slug}
                        className={`vtab ${slug === activeVertical ? 'vtab-active' : ''}`}
                        onClick={() => {
                            setActiveVertical(slug);
                            setDeliverables({});
                            setAddOns({});
                        }}
                        data-slug={slug}
                    >
                        <span className="vtab-icon">{rateCards[slug].icon}</span>
                        <span className="vtab-name">{rateCards[slug].name}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
