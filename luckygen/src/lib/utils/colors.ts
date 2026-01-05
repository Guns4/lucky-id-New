const VIBRANT_COLORS = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#FFD93D', // Yellow
    '#6C5CE7', // Purple
    '#A8E6CF', // Mint
    '#FF8B94', // Pink
    '#45B7D1', // Blue
    '#FFA07A', // Coral
    '#98D8C8', // Seafoam
    '#F7DC6F', // Gold
    '#BB8FCE', // Lavender
    '#85C1E2', // Sky Blue
];

let colorIndex = 0;

export function getRandomColor(): string {
    const color = VIBRANT_COLORS[colorIndex % VIBRANT_COLORS.length];
    colorIndex++;
    return color;
}

export function resetColorIndex(): void {
    colorIndex = 0;
}

/**
 * Calculates whether text should be black or white based on background color brightness.
 * Uses the YIQ formula for perceived brightness.
 * @param hexColor The background color in hex format (e.g., #FFFFFF or #FFF)
 * @returns 'black' | 'white'
 */
export function getContrastColor(hexColor: string): 'black' | 'white' {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return (yiq >= 128) ? 'black' : 'white';
}
