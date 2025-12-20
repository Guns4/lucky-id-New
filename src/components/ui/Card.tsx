import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className = "", title }: CardProps) {
    return (
        <div
            className={`glass-dark relative overflow-hidden rounded-xl p-6 text-gold-100 shadow-2xl transition-all hover:shadow-gold-500/10 ${className}`}
        >
            {/* Decorative gradient blob */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gold-600/5 blur-3xl pointer-events-none" />

            {title && (
                <h3 className="mb-4 text-xl font-bold text-gold-400 border-b border-gold-500/20 pb-2">
                    {title}
                </h3>
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
