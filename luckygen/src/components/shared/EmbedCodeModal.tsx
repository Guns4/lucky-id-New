'use client';

import { X, Copy, Check, Code } from 'lucide-react';
import { useState } from 'react';

interface EmbedCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    slug: string;
    title: string;
}

export default function EmbedCodeModal({ isOpen, onClose, slug, title }: EmbedCodeModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://luckygen.click';
    const embedCode = `<iframe src="${baseUrl}/embed/${slug}" width="100%" height="500" frameborder="0" style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Decorative gradient header */}
                <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 bg-[length:200%_100%] animate-gradient" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                {/* Content */}
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
                            <Code className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Embed This Wheel
                        </h2>
                        <p className="text-gray-600">
                            Copy the code below to embed "{title}" on your website
                        </p>
                    </div>

                    {/* Info boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                            <p className="text-xs text-blue-600 font-semibold mb-1">Responsive</p>
                            <p className="text-2xl font-bold text-blue-700">100%</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                            <p className="text-xs text-purple-600 font-semibold mb-1">Height</p>
                            <p className="text-2xl font-bold text-purple-700">500px</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl text-center">
                            <p className="text-xs text-pink-600 font-semibold mb-1">Backlink</p>
                            <p className="text-2xl font-bold text-pink-700">✓</p>
                        </div>
                    </div>

                    {/* Code block */}
                    <div className="relative">
                        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                            <code className="text-sm text-green-400 font-mono break-all">
                                {embedCode}
                            </code>
                        </div>

                        {/* Copy button */}
                        <button
                            onClick={handleCopy}
                            className={`absolute top-2 right-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <Check size={16} />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    Copy Code
                                </>
                            )}
                        </button>
                    </div>

                    {/* Benefits */}
                    <div className="mt-6 space-y-3">
                        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Why Embed?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Engage your visitors with interactive content</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Free forever, no API key needed</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Mobile-responsive and fast loading</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Includes subtle "Powered by LuckyGen" link</span>
                            </div>
                        </div>
                    </div>

                    {/* Preview link */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Preview the embed:</p>
                        <a
                            href={`/embed/${slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline font-mono break-all"
                        >
                            {baseUrl}/embed/{slug}
                        </a>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-xs text-center text-gray-500">
                        The embedded wheel includes a small "Powered by LuckyGen" branding link. This helps us keep the service free!
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
}
