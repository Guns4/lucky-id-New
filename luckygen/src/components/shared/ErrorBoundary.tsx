'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console (in production, send to error tracking service like Sentry)
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Update state with error details
        this.setState({
            error,
            errorInfo
        });

        // TODO: Send to error tracking service
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    handleReload = () => {
        // Clear error state and reload
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });

        // Reload the page
        window.location.reload();
    };

    handleGoHome = () => {
        // Navigate to home page
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                                <AlertTriangle className="text-white" size={40} />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            Ouch! Something Broke 💥
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-center mb-8 text-lg">
                            We encountered an unexpected error. Don't worry, this happens sometimes!
                            Try reloading the page or going back to the homepage.
                        </p>

                        {/* Error Details (only in development) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <h3 className="font-bold text-red-900 mb-2">Error Details (Dev Mode):</h3>
                                <pre className="text-xs text-red-800 overflow-auto max-h-40">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                                <RefreshCw size={20} />
                                Reload Page
                            </button>

                            <button
                                onClick={this.handleGoHome}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                                <Home size={20} />
                                Go Home
                            </button>
                        </div>

                        {/* Help Text */}
                        <p className="text-center text-sm text-gray-500 mt-8">
                            If the problem persists, please contact support or try again later.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
