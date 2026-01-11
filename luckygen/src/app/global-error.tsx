'use client';

import { useEffect } from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console (in production, send to error tracking service)
        console.error('Global Error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                        {/* Error Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                                <AlertCircle size={48} className="text-red-400" />
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-2xl font-bold text-white text-center mb-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-300 text-center mb-6">
                            We encountered an unexpected error. Don't worry, we're on it!
                        </p>

                        {/* Error Details (Development Only) */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mb-6 p-4 bg-black/30 rounded-lg border border-red-500/30">
                                <p className="text-xs text-red-300 font-mono break-all">
                                    {error.message}
                                </p>
                                {error.digest && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Error ID: {error.digest}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={reset}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                <RefreshCw size={20} />
                                Try Again
                            </button>
                            <a
                                href="/"
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                <Home size={20} />
                                Go Home
                            </a>
                        </div>

                        {/* Help Text */}
                        <p className="text-xs text-gray-400 text-center mt-6">
                            If this problem persists, please contact support
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}
