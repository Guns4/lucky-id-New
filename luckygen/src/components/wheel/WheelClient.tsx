'use client';

import dynamic from 'next/dynamic';
import { WheelSegment } from '@/lib/store/wheelStore';
import { ThemeConfig } from '@/lib/utils/themes';

// Wheel component props interface
export interface WheelProps {
    segments: WheelSegment[];
    theme?: string;
    themeConfig?: ThemeConfig;
    eliminationMode?: boolean;
    onSpinComplete?: (winner: string) => void;
    onEliminate?: (eliminatedText: string) => void;
    slug?: string;
    wheelTitle?: string;
    mode?: '2D' | '3D';
}

// Loading component
function WheelLoading() {
    return (
        <div className="flex items-center justify-center" style={{ width: '600px', height: '600px' }}>
            <div className="relative">
                {/* Spinning loader */}
                <div className="w-32 h-32 border-8 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}

// Dynamically import Wheel component with NO SSR
// This prevents all browser API issues during server-side rendering
const WheelClient = dynamic<WheelProps>(
    () => import('@/components/wheel/Wheel'),
    {
        ssr: false, // CRITICAL: Disable server-side rendering
        loading: () => <WheelLoading />,
    }
);

export default WheelClient;
