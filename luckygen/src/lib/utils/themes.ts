// Theme configuration for the Wheel component
// Provides color palettes, backgrounds, and visual styles for each theme

export type ThemeType = 'default' | 'casino' | 'anime' | 'dark' | string;

export interface ThemeConfig {
    name: string;
    colors: string[]; // Color palette for wheel segments
    background: string; // Tailwind gradient classes
    backgroundImageUrl?: string; // Optional background image URL (overrides background classes if present)
    pointerImageUrl?: string; // Optional custom pointer image URL
    centerColor?: string; // Color for the center hub
    textColor?: string; // Color for text on segments
    pointerColor?: string; // Color for standard pointer
    buttonStyle?: string; // Custom toggle button styles
    centerButtonGradient: string; // Gradient for center button
    centerButtonStyle?: string; // Custom CSS classes for center button
    winnerGradient: string; // Gradient for winner display
    outerRing: string; // Color for outer ring
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
    default: {
        name: 'Default',
        colors: [
            '#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7',
            '#A8E6CF', '#FF8B94', '#FF6F91', '#FFA07A',
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ],
        background: 'from-purple-900 via-blue-900 to-indigo-900',
        pointerColor: '#EF4444', // red-500
        centerButtonGradient: 'from-yellow-400 to-yellow-600',
        winnerGradient: 'from-purple-500 to-pink-500',
        outerRing: '#FFFFFF',
    },
    casino: {
        name: 'Casino',
        colors: [
            '#FFD700', '#DC143C', '#228B22', '#000000',
            '#FFD700', '#DC143C', '#228B22', '#000000',
            '#FFD700', '#DC143C', '#228B22', '#000000'
        ],
        background: 'from-red-900 via-black to-green-900',
        pointerColor: '#FFD700', // gold
        centerButtonGradient: 'from-yellow-500 to-amber-600',
        winnerGradient: 'from-yellow-400 to-amber-600',
        outerRing: '#FFD700',
    },
    anime: {
        name: 'Anime',
        colors: [
            '#FF69B4', '#00CED1', '#FFD700', '#9370DB',
            '#FF1493', '#00BFFF', '#FFA500', '#DA70D6',
            '#FF69B4', '#48D1CC', '#FFD700', '#BA55D3'
        ],
        background: 'from-pink-500 via-purple-500 to-cyan-500',
        pointerColor: '#FFFFFF', // white sword
        centerButtonGradient: 'from-pink-400 to-purple-600',
        winnerGradient: 'from-pink-400 to-purple-600',
        outerRing: '#FFFFFF',
    },
    dark: {
        name: 'Dark Cyber',
        colors: [
            '#00FFFF', '#FF00FF', '#00FF00', '#FFFF00',
            '#FF00FF', '#00FFFF', '#FF0080', '#80FF00',
            '#0080FF', '#FF0080', '#00FF80', '#8000FF'
        ],
        background: 'from-gray-900 via-purple-900 to-black',
        pointerColor: '#00FFFF', // cyan with glow
        centerButtonGradient: 'from-cyan-400 to-purple-600',
        winnerGradient: 'from-cyan-400 to-purple-600',
        outerRing: '#00FFFF',
    },
};

/**
 * Get theme configuration by theme type
 */
export function getThemeConfig(theme: ThemeType): ThemeConfig {
    return THEME_CONFIGS[theme];
}

/**
 * Get color for segment based on theme and index
 */
export function getSegmentColor(theme: ThemeType, index: number): string {
    const colors = THEME_CONFIGS[theme].colors;
    return colors[index % colors.length];
}

/**
 * Apply theme colors to existing segments
 */
export function applyThemeToSegments(
    segments: Array<{ text: string; color: string }>,
    theme: ThemeType
): Array<{ text: string; color: string }> {
    return segments.map((segment, index) => ({
        ...segment,
        color: getSegmentColor(theme, index),
    }));
}
