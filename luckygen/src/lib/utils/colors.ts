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
