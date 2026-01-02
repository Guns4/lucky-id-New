'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
    duration?: number;
    type?: 'info' | 'success' | 'warning' | 'error';
}

export default function Toast({
    message,
    show,
    onClose,
    duration = 3000,
    type = 'info',
}: ToastProps) {
    useEffect(() => {
        if (show && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    const bgColors = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className={`fixed top-4 left-1/2 z-50 px-6 py-4 rounded-lg shadow-2xl ${bgColors[type]} text-white flex items-center gap-3 min-w-[300px] max-w-md`}
                >
                    <span className="flex-1 font-semibold">{message}</span>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                        aria-label="Close notification"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
