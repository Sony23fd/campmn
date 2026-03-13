"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedCounter({ 
    value, 
    duration = 2,
    className = "" 
}: { 
    value: string; 
    duration?: number;
    className?: string;
}) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Parse the numeric part from a string like "100+" or "18"
    const parsedNumber = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    const suffix = value.replace(/[0-9]/g, "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || parsedNumber === 0) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * parsedNumber));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(parsedNumber);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, parsedNumber, duration]);

    return (
        <span ref={ref} className={className}>
            {count}{suffix}
        </span>
    );
}
