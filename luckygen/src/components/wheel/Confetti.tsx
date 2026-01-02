'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Confetti() {
    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#FF8B94'][Math.floor(Math.random() * 5)],
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confettiPieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: piece.color,
                        left: `${piece.left}%`,
                        top: '-10%',
                    }}
                    initial={{ y: 0, opacity: 1, rotate: 0 }}
                    animate={{
                        y: ['0vh', '110vh'],
                        opacity: [1, 1, 0],
                        rotate: [0, 360, 720],
                    }}
                    transition={{
                        duration: 3,
                        delay: piece.delay,
                        ease: 'easeIn',
                    }}
                />
            ))}
        </div>
    );
}
