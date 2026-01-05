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
    neon: {
        name: 'Neon Glow',
        colors: [
            '#FF1493', '#00FFFF', '#FF00FF', '#39FF14',
            '#FF6600', '#00FF00', '#FF1493', '#00FFFF',
            '#FF00FF', '#39FF14', '#FF6600', '#00FF00'
        ],
        background: 'from-black via-purple-900 to-pink-900',
        pointerColor: '#FF1493',
        centerButtonGradient: 'from-pink-500 to-cyan-500',
        winnerGradient: 'from-pink-500 to-cyan-400',
        outerRing: '#FF1493',
    },
    retro: {
        name: 'Retro Vibes',
        colors: [
            '#FF6B35', '#F7C59F', '#2EC4B6', '#E71D36',
            '#FF9F1C', '#FFBF69', '#2EC4B6', '#E71D36',
            '#FF6B35', '#F7C59F', '#FF9F1C', '#FFBF69'
        ],
        background: 'from-orange-900 via-amber-800 to-teal-900',
        pointerColor: '#FF6B35',
        centerButtonGradient: 'from-orange-400 to-teal-500',
        winnerGradient: 'from-orange-400 to-teal-500',
        outerRing: '#FF9F1C',
    },
    pastel: {
        name: 'Pastel Dream',
        colors: [
            '#FFB5E8', '#B5DEFF', '#BFFCC6', '#FFC9DE',
            '#C5B0D5', '#FFFFD1', '#FFB5E8', '#B5DEFF',
            '#BFFCC6', '#FFC9DE', '#C5B0D5', '#FFFFD1'
        ],
        background: 'from-pink-200 via-purple-200 to-blue-200',
        pointerColor: '#FF69B4',
        textColor: '#333333',
        centerButtonGradient: 'from-pink-300 to-purple-400',
        winnerGradient: 'from-pink-300 to-purple-400',
        outerRing: '#FFB5E8',
    },
    ocean: {
        name: 'Deep Ocean',
        colors: [
            '#0077B6', '#00B4D8', '#90E0EF', '#03045E',
            '#0096C7', '#48CAE4', '#0077B6', '#00B4D8',
            '#90E0EF', '#03045E', '#0096C7', '#48CAE4'
        ],
        background: 'from-blue-900 via-cyan-900 to-teal-900',
        pointerColor: '#00B4D8',
        centerButtonGradient: 'from-cyan-400 to-blue-600',
        winnerGradient: 'from-cyan-400 to-blue-600',
        outerRing: '#00B4D8',
    },
    forest: {
        name: 'Forest',
        colors: [
            '#2D6A4F', '#40916C', '#52B788', '#74C69D',
            '#95D5B2', '#B7E4C7', '#2D6A4F', '#40916C',
            '#52B788', '#74C69D', '#95D5B2', '#B7E4C7'
        ],
        background: 'from-green-900 via-emerald-900 to-teal-900',
        pointerColor: '#52B788',
        centerButtonGradient: 'from-green-400 to-emerald-600',
        winnerGradient: 'from-green-400 to-emerald-600',
        outerRing: '#40916C',
    },
    party: {
        name: 'Party Mode',
        colors: [
            '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
            '#0000FF', '#4B0082', '#9400D3', '#FF1493',
            '#FF0000', '#FF7F00', '#FFFF00', '#00FF00'
        ],
        background: 'from-purple-600 via-pink-500 to-red-500',
        pointerColor: '#FFD700',
        centerButtonGradient: 'from-yellow-400 to-pink-500',
        winnerGradient: 'from-yellow-400 to-pink-500',
        outerRing: '#FFD700',
    },
    sunset: {
        name: 'Sunset Glow',
        colors: [
            '#FF6B6B', '#FFA07A', '#FFD700', '#FF69B4',
            '#FF8C00', '#FF1493', '#FF6347', '#FFA500',
            '#FF6B6B', '#FFA07A', '#FFD700', '#FF69B4'
        ],
        background: 'from-red-500 via-orange-500 to-yellow-500',
        pointerColor: '#FFFF00',
        centerButtonGradient: 'from-red-400 to-yellow-500',
        winnerGradient: 'from-red-400 to-yellow-400',
        outerRing: '#FFD700',
    },
    midnight: {
        name: 'Midnight Blue',
        colors: [
            '#191970', '#4169E1', '#1E90FF', '#00BFFF',
            '#000080', '#483D8B', '#191970', '#4169E1',
            '#1E90FF', '#00BFFF', '#000080', '#483D8B'
        ],
        background: 'from-indigo-950 via-blue-950 to-slate-900',
        pointerColor: '#00BFFF',
        centerButtonGradient: 'from-blue-500 to-indigo-700',
        winnerGradient: 'from-blue-400 to-indigo-600',
        outerRing: '#4169E1',
    },
    tropical: {
        name: 'Tropical Paradise',
        colors: [
            '#00CED1', '#20B2AA', '#48D1CC', '#40E0D0',
            '#00FA9A', '#7FFFD4', '#00CED1', '#20B2AA',
            '#48D1CC', '#40E0D0', '#00FA9A', '#7FFFD4'
        ],
        background: 'from-cyan-500 via-teal-500 to-emerald-500',
        pointerColor: '#00FA9A',
        centerButtonGradient: 'from-cyan-400 to-teal-600',
        winnerGradient: 'from-cyan-400 to-emerald-500',
        outerRing: '#00CED1',
    },
    galaxy: {
        name: 'Galaxy Space',
        colors: [
            '#9D4EDD', '#7209B7', '#560BAD', '#3C096C',
            '#B5179E', '#F72585', '#9D4EDD', '#7209B7',
            '#560BAD', '#3C096C', '#B5179E', '#F72585'
        ],
        background: 'from-purple-950 via-fuchsia-900 to-pink-900',
        pointerColor: '#F72585',
        centerButtonGradient: 'from-purple-500 to-pink-600',
        winnerGradient: 'from-purple-400 to-pink-500',
        outerRing: '#9D4EDD',
    },
    candy: {
        name: 'Candy Shop',
        colors: [
            '#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493',
            '#C71585', '#DB7093', '#FF69B4', '#FFB6C1',
            '#FFC0CB', '#FF1493', '#C71585', '#DB7093'
        ],
        background: 'from-pink-400 via-rose-400 to-fuchsia-500',
        pointerColor: '#FF1493',
        textColor: '#FFFFFF',
        centerButtonGradient: 'from-pink-400 to-fuchsia-600',
        winnerGradient: 'from-pink-300 to-fuchsia-500',
        outerRing: '#FF69B4',
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
