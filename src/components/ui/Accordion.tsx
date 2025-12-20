"use client";

import React, { useState } from "react";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-lg bg-black/40 overflow-hidden mb-3 transition-colors hover:border-gold-500/30">
            <button
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gold-100">{title}</span>
                <span
                    className={`transform transition-transform text-gold-500 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    ▼
                </span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 p-4 pt-0" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function Accordion({ children }: { children: React.ReactNode }) {
    return <div className="w-full">{children}</div>;
}
