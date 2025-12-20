import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ className = "", label, error, ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium text-gold-400">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    className={`glass-dark w-full rounded-lg border border-gold-600/30 bg-black-800 px-4 py-3 text-gold-100 placeholder-gold-600/50 outline-none transition-all focus:border-gold-500 focus:ring-1 focus:ring-gold-500 hover:border-gold-500/50 ${error ? "border-red-500/50" : ""
                        } ${className}`}
                    {...props}
                />
                <div className="absolute inset-0 rounded-lg bg-gold-500/5 opacity-0 transition-opacity pointer-events-none group-hover:opacity-100" />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
