import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export function Button({
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "relative overflow-hidden rounded-lg font-bold transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center";

    const variants = {
        primary:
            "bg-gradient-to-r from-gold-400 to-gold-600 text-black-900 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-[1.02]",
        secondary:
            "bg-black-800 text-gold-400 border border-gold-600/30 hover:bg-black-700 hover:border-gold-500",
        outline:
            "bg-transparent text-gold-400 border-2 border-gold-500 hover:bg-gold-500/10",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            ) : null}
            <span className="relative z-10">{children}</span>
            {variant === "primary" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] animate-shimmer" />
            )}
        </button>
    );
}
