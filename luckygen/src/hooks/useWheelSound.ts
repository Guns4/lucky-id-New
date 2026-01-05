'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useWheelStore } from '@/lib/store/wheelStore';

/**
 * Custom hook for synthesized audio using Web Audio API
 * No external MP3 files needed - all sounds are generated programmatically
 */
export function useWheelSound() {
    const { soundEnabled, toggleSound } = useWheelStore();
    const audioContextRef = useRef<AudioContext | null>(null);
    const isInitializedRef = useRef(false);

    // Initialize AudioContext on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Create AudioContext (with webkit prefix for Safari)
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        audioContextRef.current = new AudioContextClass();

        // Handle autoplay policy - resume on first user interaction
        const resumeAudio = () => {
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
            if (!isInitializedRef.current) {
                isInitializedRef.current = true;
            }
        };

        // Listen for user interactions
        const events = ['click', 'touchstart', 'keydown'];
        events.forEach(event => {
            document.addEventListener(event, resumeAudio, { once: true });
        });

        return () => {
            // Cleanup
            events.forEach(event => {
                document.removeEventListener(event, resumeAudio);
            });
            audioContextRef.current?.close();
        };
    }, []);

    /**
     * Play a short "tick" sound using an oscillator
     * Simulates a plastic click with a frequency sweep
     * Also triggers haptic feedback on mobile devices
     */
    const playTick = useCallback(() => {
        if (!soundEnabled || !audioContextRef.current) return;

        const audioContext = audioContextRef.current;

        // Ensure AudioContext is running
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        try {
            // Create oscillator node for tone generation
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            // Connect nodes: Oscillator -> Gain -> Destination (speakers)
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Configure oscillator
            oscillator.type = 'triangle'; // Softer than square, more interesting than sine

            // Frequency sweep: 800Hz → 200Hz (creates "click" effect)
            const now = audioContext.currentTime;
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.05);

            // Volume envelope: Quick attack, exponential decay
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

            // Play for 50ms
            oscillator.start(now);
            oscillator.stop(now + 0.05);

            // Haptic feedback (mobile only)
            if (navigator.vibrate) {
                navigator.vibrate(5); // 5ms vibration
            }
        } catch (error) {
            // Silent fail for browser compatibility
            console.warn('Failed to play tick sound:', error);
        }
    }, [soundEnabled]);

    /**
     * Play a "win" fanfare sound using multiple oscillators
     * Creates a major chord progression (C-E-G) for a celebratory feel
     */
    const playWin = useCallback(() => {
        if (!soundEnabled || !audioContextRef.current) return;

        const audioContext = audioContextRef.current;

        // Ensure AudioContext is running
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        try {
            // Major chord: C5, E5, G5 (frequencies in Hz)
            const notes = [
                { freq: 523.25, delay: 0 },      // C5
                { freq: 659.25, delay: 0.1 },    // E5
                { freq: 783.99, delay: 0.2 },    // G5
                { freq: 1046.50, delay: 0.3 }    // C6 (octave up for finale)
            ];

            const duration = 0.5;

            notes.forEach(({ freq, delay }) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                // Use sine wave for smooth, pleasant tone
                oscillator.type = 'sine';
                oscillator.frequency.value = freq;

                const startTime = audioContext.currentTime + delay;

                // Volume envelope
                gainNode.gain.setValueAtTime(0.4, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            });

            // Longer haptic feedback for win
            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 100]); // Pattern: vibrate-pause-vibrate
            }
        } catch (error) {
            console.warn('Failed to play win sound:', error);
        }
    }, [soundEnabled]);

    /**
     * Play an elimination sound (glitch effect)
     * Uses noise-like oscillator with rapid frequency modulation
     */
    const playEliminate = useCallback(() => {
        if (!soundEnabled || !audioContextRef.current) return;

        const audioContext = audioContextRef.current;

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Square wave for harsh, digital sound
            oscillator.type = 'square';

            const now = audioContext.currentTime;

            // Descending pitch for "falling" effect
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.3);

            // Quick fade out
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            oscillator.start(now);
            oscillator.stop(now + 0.3);

            // Harsh vibration for elimination
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        } catch (error) {
            console.warn('Failed to play eliminate sound:', error);
        }
    }, [soundEnabled]);

    return {
        playTick,
        playWin,
        playEliminate,
        enabled: soundEnabled,
        toggleSound
    };
}
