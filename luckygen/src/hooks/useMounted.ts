'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to prevent hydration mismatch errors
 * Returns true only after component has mounted on client
 * 
 * Use this for:
 * - Random values (colors, numbers)
 * - localStorage access
 * - window/document access
 * - Client-only features
 */
export function useMounted() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}

/**
 * Hook to safely access localStorage without hydration errors
 * 
 * @param key - localStorage key
 * @param initialValue - default value if key doesn't exist
 * @returns [value, setValue, isLoaded]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
            setIsLoaded(true);
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error);
            setIsLoaded(true);
        }
    }, [key]);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, isLoaded] as const;
}

/**
 * Hook to get window dimensions without hydration errors
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        // Set initial size
        handleResize();

        // Listen for resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
