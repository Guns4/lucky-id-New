import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'default' | 'casino' | 'anime' | 'dark' | string;

export interface WheelSegment {
    text: string;
    color: string;
}

export interface SpinHistoryEntry {
    id: string;
    prizeName: string;
    timestamp: number; // Unix timestamp in milliseconds
}

interface WheelStore {
    segments: WheelSegment[];
    title: string;
    theme: ThemeType;
    eliminationMode: boolean;
    setTitle: (title: string) => void;
    addSegment: (segment: WheelSegment) => void;
    removeSegment: (index: number) => void;
    updateSegment: (index: number, updates: Partial<WheelSegment>) => void;
    setSegments: (segments: WheelSegment[]) => void;
    clearWheel: () => void;
    setTheme: (theme: ThemeType) => void;
    toggleEliminationMode: () => void;
    eliminateSegment: (text: string) => void;
    soundEnabled: boolean;
    toggleSound: () => void;
    // Spin history
    spinHistory: SpinHistoryEntry[];
    addToHistory: (prizeName: string) => void;
    clearHistory: () => void;
}

export const useWheelStore = create<WheelStore>()(
    persist(
        (set) => ({
            segments: [],
            title: 'My Wheel',
            theme: 'default',
            eliminationMode: false,
            soundEnabled: true,
            spinHistory: [], // Initialize empty history

            setTitle: (title) => set({ title }),

            addSegment: (segment) =>
                set((state) => ({ segments: [...state.segments, segment] })),

            removeSegment: (index) =>
                set((state) => ({
                    segments: state.segments.filter((_, i) => i !== index),
                })),

            updateSegment: (index, updates) =>
                set((state) => ({
                    segments: state.segments.map((seg, i) =>
                        i === index ? { ...seg, ...updates } : seg
                    ),
                })),

            setSegments: (segments) => set({ segments }),

            clearWheel: () => set({ segments: [], title: 'My Wheel' }),

            setTheme: (theme) => set({ theme }),

            toggleEliminationMode: () =>
                set((state) => ({ eliminationMode: !state.eliminationMode })),

            eliminateSegment: (text) =>
                set((state) => ({
                    segments: state.segments.filter((seg) => seg.text !== text),
                })),

            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

            // Add spin result to history
            addToHistory: (prizeName) =>
                set((state) => {
                    const newEntry: SpinHistoryEntry = {
                        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        prizeName,
                        timestamp: Date.now(),
                    };

                    // Add to beginning and keep only last 10
                    const updatedHistory = [newEntry, ...state.spinHistory].slice(0, 10);

                    return { spinHistory: updatedHistory };
                }),

            // Clear all history
            clearHistory: () => set({ spinHistory: [] }),
        }),
        {
            name: 'luckygen-wheel-storage',
        }
    )
);

