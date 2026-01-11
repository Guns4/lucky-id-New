/**
 * Format timestamp to relative time or absolute time
 * Examples: "Just now", "2m ago", "1h ago", "12:05 PM"
 */
export function formatTimestamp(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    // Less than 10 seconds: "Just now"
    if (diff < 10000) {
        return 'Just now';
    }

    // Less than 1 minute: "Xs ago"
    if (diff < 60000) {
        const seconds = Math.floor(diff / 1000);
        return `${seconds}s ago`;
    }

    // Less than 1 hour: "Xm ago"
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}m ago`;
    }

    // Less than 24 hours: "Xh ago"
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}h ago`;
    }

    // Older: Show absolute time "12:05 PM"
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
