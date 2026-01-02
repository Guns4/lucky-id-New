/**
 * Calculate winner index using weighted randomization
 */
export function calculateWinner(segmentCount: number): number {
    return Math.floor(Math.random() * segmentCount);
}

/**
 * Get final rotation angle to land on winner segment
 * Pointer is at top (12 o'clock), so we rotate the wheel to position winner under pointer
 */
export function getRotationForWinner(winnerIndex: number, segmentCount: number): number {
    const segmentAngle = 360 / segmentCount;

    // Calculate the middle of the winner segment
    const winnerMiddleAngle = winnerIndex * segmentAngle + segmentAngle / 2;

    // To position winner at top, we need to rotate by (360 - winnerMiddleAngle)
    // Add small random offset within segment for natural feel
    const randomOffset = (Math.random() - 0.5) * segmentAngle * 0.5;

    return (360 - winnerMiddleAngle + randomOffset) % 360;
}
