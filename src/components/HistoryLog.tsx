"use client";

import React, { useEffect, useState } from "react";
import { Tier } from "@/lib/generators";

export interface HistoryItem {
    id: string;
    deposit: number;
    tier: Tier;
    timestamp: number;
}

interface HistoryLogProps {
    items: HistoryItem[];
    onClear: () => void;
}

export function HistoryLog({ items, onClear }: HistoryLogProps) {
    if (items.length === 0) return null;

    const getTierColor = (tier: Tier) => {
        switch (tier) {
            case "LEGENDARY": return "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]";
            case "MYTHIC": return "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]";
            case "VIP": return "text-gold-300";
            default: return "text-zinc-400";
        }
    };

    return (
        <div className="w-full mt-8 border-t border-gold-600/10 pt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gold-400">Recent Luck</h3>
                <button
                    onClick={onClear}
                    className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                >
                    Clear History
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div
                        key={item.timestamp + idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all"
                    >
                        <div className="flex flex-col">
                            <span className={`text-sm font-mono font-bold ${getTierColor(item.tier)}`}>
                                {item.id}
                            </span>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.tier}</span>
                        </div>
                        <div className="font-mono text-emerald-400 text-sm">
                            ${item.deposit.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
