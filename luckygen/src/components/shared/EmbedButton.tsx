'use client';

import { useState } from 'react';
import { Code, Check } from 'lucide-react';

interface EmbedButtonProps {
    slug: string;
    title: string;
    lang: string;
}

export default function EmbedButton({ slug, title, lang }: EmbedButtonProps) {
    const [showEmbed, setShowEmbed] = useState(false);
    const [copied, setCopied] = useState(false);

    const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://luckygen.click'}/embed/${slug}" width="100%" height="600" frameborder="0" allowfullscreen title="${title} - LuckyGen"></iframe>`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-8">
            <button
                onClick={() => setShowEmbed(!showEmbed)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
                <Code size={20} />
                Embed This Wheel
            </button>

            {showEmbed && (
                <div className="mt-4 bg-white/10 backdrop-blur-lg rounded-lg p-6 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold mb-3">Embed Code</h3>
                    <p className="text-sm text-gray-300 mb-4">
                        Copy and paste this code into your website or blog:
                    </p>

                    <div className="relative">
                        <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
                            <code>{embedCode}</code>
                        </pre>
                        <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm flex items-center gap-1"
                        >
                            {copied ? <><Check size={14} /> Copied!</> : 'Copy'}
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                        By embedding this wheel, you're helping others discover LuckyGen.
                        The embed includes a link back to our site.
                    </p>
                </div>
            )}
        </div>
    );
}
