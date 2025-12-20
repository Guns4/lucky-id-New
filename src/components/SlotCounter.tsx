import React, { useEffect, useState } from "react";

interface SlotCounterProps {
    value: string;
    trigger: boolean; // Toggle to start animation
    duration?: number;
}

export function SlotCounter({ value, trigger, duration = 2000 }: SlotCounterProps) {
    const [displayValue, setDisplayValue] = useState(value);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        setIsAnimating(true);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed > duration) {
                clearInterval(interval);
                setDisplayValue(value);
                setIsAnimating(false);
            } else {
                // Generate random string of same length as value
                let randomStr = "";
                for (let i = 0; i < value.length; i++) {
                    if (value[i] === "-" || value[i] === " ") {
                        randomStr += value[i];
                    } else {
                        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                }
                setDisplayValue(randomStr);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [trigger, value, duration]);

    return (
        <span
            className={`font-mono transition-colors duration-300 ${isAnimating ? "text-gold-300 blur-[0.5px]" : "text-gold-400"
                }`}
        >
            {displayValue}
        </span>
    );
}
