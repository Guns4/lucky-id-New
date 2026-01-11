/**
 * Generate a vibrant, contrasting color palette for wheel segments
 * Uses HSL color space for consistent brightness and saturation
 */

export function generateColorPalette(count: number): string[] {
    const colors: string[] = [];

    // Base saturation and lightness for vibrant colors
    const saturation = 70; // 70% saturation for vibrant colors
    const lightness = 55;  // 55% lightness for good contrast

    // Calculate hue step to distribute colors evenly around color wheel
    const hueStep = 360 / count;

    // Generate colors with even distribution
    for (let i = 0; i < count; i++) {
        const hue = Math.floor(i * hueStep);
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        colors.push(color);
    }

    return colors;
}

/**
 * Pre-defined vibrant color palettes for common segment counts
 * Optimized for maximum contrast and visual appeal
 */
export const PRESET_PALETTES: Record<number, string[]> = {
    2: ['#FF6B6B', '#4ECDC4'],
    3: ['#FF6B6B', '#FFD93D', '#6BCF7F'],
    4: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A78BFA'],
    5: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A78BFA', '#FB7185'],
    6: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A78BFA', '#FB7185', '#34D399'],
    8: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A78BFA', '#FB7185', '#34D399', '#F97316', '#8B5CF6'],
    10: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A78BFA', '#FB7185', '#34D399', '#F97316', '#8B5CF6', '#EC4899', '#10B981'],
};

/**
 * Get color palette for wheel segments
 * Uses preset palettes for common counts, generates for others
 */
export function getWheelColors(count: number): string[] {
    // Use preset if available
    if (PRESET_PALETTES[count]) {
        return PRESET_PALETTES[count];
    }

    // Generate colors for custom counts
    return generateColorPalette(count);
}

/**
 * Convert HSL to Hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
