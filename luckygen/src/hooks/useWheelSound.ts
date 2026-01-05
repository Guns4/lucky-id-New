'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useWheelStore } from '@/lib/store/wheelStore';

/**
 * Custom hook for MP3 audio playback
 * Uses HTML5 Audio elements to play sound files from /public/sounds/
 */
export function useWheelSound() {
    const { soundEnabled, toggleSound } = useWheelStore();
    const tickAudioRef = useRef<HTMLAudioElement | null>(null);
    const winAudioRef = useRef<HTMLAudioElement | null>(null);
    const spinAudioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio elements on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Create audio elements
        tickAudioRef.current = new Audio('/sounds/tick.mp3');
        winAudioRef.current = new Audio('/sounds/win.mp3');
        spinAudioRef.current = new Audio('/sounds/spin.mp3');

        // Preload audio files
        tickAudioRef.current.preload = 'auto';
        winAudioRef.current.preload = 'auto';
        spinAudioRef.current.preload = 'auto';

        // Set volumes
        tickAudioRef.current.volume = 0.3;
        winAudioRef.current.volume = 0.5;
        spinAudioRef.current.volume = 0.4;

        // Cleanup
        return () => {
            tickAudioRef.current = null;
            winAudioRef.current = null;
            spinAudioRef.current = null;
        };
    }, []);

    /**
     * Play a short "tick" sound
     * Used when wheel passes each segment
     */
    const playTick = useCallback(() => {
        if (!soundEnabled || !tickAudioRef.current) return;

        try {
            // Reset audio to beginning
            tickAudioRef.current.currentTime = 0;

            // Play the sound
            const playPromise = tickAudioRef.current.play();

            // Handle promise (required for some browsers)
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Tick sound play failed:', error);
                });
            }

            // Haptic feedback (mobile only)
            if (navigator.vibrate) {
                navigator.vibrate(5); // 5ms vibration
            }
        } catch (error) {
            console.warn('Failed to play tick sound:', error);
        }
    }, [soundEnabled]);

    /**
     * Play a "win" fanfare sound
     * Used when wheel stops on the winner
     */
    const playWin = useCallback(() => {
        if (!soundEnabled || !winAudioRef.current) return;

        try {
            // Reset audio to beginning
            winAudioRef.current.currentTime = 0;

            // Play the sound
            const playPromise = winAudioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Win sound play failed:', error);
                });
            }

            // Longer haptic feedback for win
            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 100]); // Pattern: vibrate-pause-vibrate
            }
        } catch (error) {
            console.warn('Failed to play win sound:', error);
        }
    }, [soundEnabled]);

    /**
     * Play an elimination sound
     * Used in elimination mode when a segment is removed
     */
    const playEliminate = useCallback(() => {
        if (!soundEnabled || !tickAudioRef.current) return;

        try {
            // Use tick sound but with different playback rate for variation
            const audio = tickAudioRef.current.cloneNode() as HTMLAudioElement;
            audio.volume = 0.2;
            audio.playbackRate = 0.7; // Slower playback for elimination effect

            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Eliminate sound play failed:', error);
                });
            }

            // Harsh vibration for elimination
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        } catch (error) {
            console.warn('Failed to play eliminate sound:', error);
        }
    }, [soundEnabled]);

    /**
     * Play continuous spin sound (optional)
     * Used during wheel spinning
     */
    const playSpinLoop = useCallback(() => {
        if (!soundEnabled || !spinAudioRef.current) return;

        try {
            spinAudioRef.current.currentTime = 0;
            spinAudioRef.current.loop = true;

            const playPromise = spinAudioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Spin sound play failed:', error);
                });
            }
        } catch (error) {
            console.warn('Failed to play spin sound:', error);
        }
    }, [soundEnabled]);

    /**
     * Stop continuous spin sound
     */
    const stopSpinLoop = useCallback(() => {
        if (!spinAudioRef.current) return;

        try {
            spinAudioRef.current.pause();
            spinAudioRef.current.currentTime = 0;
            spinAudioRef.current.loop = false;
        } catch (error) {
            console.warn('Failed to stop spin sound:', error);
        }
    }, []);

    return {
        playTick,
        playWin,
        playEliminate,
        playSpinLoop,
        stopSpinLoop,
        enabled: soundEnabled,
        toggleSound
    };
}
