'use client';

import React, { useState } from 'react';
import { Share2, Check, Loader2 } from 'lucide-react';
import { useWheelStore } from '@/lib/store/wheelStore';

export default function ShareButton() {
    const { segments, title } = useWheelStore();
    const [isSharing, setIsSharing] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (segments.length < 2) {
            alert('Please add at least 2 segments before sharing!');
            return;
        }

        setIsSharing(true);

        try {
            const response = await fetch('/api/wheels/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    segments,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create wheel');
            }

            const data = await response.json();
            const url = `${window.location.origin}/en/w/${data.slug}`;
            setShareUrl(url);

            // Auto-copy to clipboard
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Error sharing wheel:', error);
            alert('Failed to share wheel. Please try again.');
        } finally {
            setIsSharing(false);
        }
    };

    const handleCopy = async () => {
        if (shareUrl) {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleShare}
                disabled={isSharing || segments.length < 2}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                {isSharing ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Sharing...
                    </>
                ) : (
                    <>
                        <Share2 size={20} />
                        Share Wheel
                    </>
                )}
            </button>

            {shareUrl && (
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 max-w-md w-full">
                    <p className="text-sm text-gray-300 mb-2">Shareable Link:</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded text-white text-sm"
                        />
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded transition-colors flex items-center gap-1"
                        >
                            {copied ? <Check size={16} /> : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
