import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'default' | 'casino' | 'anime' | 'dark' | string;

export interface WheelSegment {
    text: string;
    color: string;
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
}

export const useWheelStore = create<WheelStore>()(
    persist(
        (set) => ({
            segments: [],
            title: 'My Wheel',
            theme: 'default',
            eliminationMode: false,

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
        }),
        {
            name: 'luckygen-wheel-storage',
        }
    )
);

