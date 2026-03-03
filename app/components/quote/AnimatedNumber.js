'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedNumber({ value }) {
    // We use a spring to smoothly transition from the previous value
    const spring = useSpring(value, { stiffness: 100, damping: 20 });

    // We need state to trigger re-renders since we're formatting currency
    const [display, setDisplay] = useState(value);

    // Sync spring to new prop value
    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    // Listen to spring changes to update state
    useEffect(() => {
        return spring.on('change', (latest) => {
            setDisplay(Math.round(latest));
        });
    }, [spring]);

    const formatted = '$' + display.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return <motion.span>{formatted}</motion.span>;
}
