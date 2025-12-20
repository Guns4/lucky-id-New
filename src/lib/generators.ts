export type Tier = "LEGENDARY" | "MYTHIC" | "VIP" | "SUPER" | "COMMON";

export interface SmartIDResult {
    id: string;
    tier: Tier;
    luckScore: number;
    uniqueRate: number;
    tags: string[];
}

const WINNING_WORDS = ["MAX", "WIN", "GACOR", "JP", "PROFIT", "CUAN", "HOKI", "KING", "NAGA", "ZEUS"];
const HOKI_SUFFIXES = ["88", "777", "99", "168", "888", "303", "4D"];

export const generateSmartID = (platform: string, username: string): SmartIDResult => {
    // Normalize inputs
    const cleanPlatform = platform.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 4);
    const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);

    // 1. Calculate luck check (RNG spiced with username hash technically)
    // For now, pure RNG is fine but let's bias it high as requested
    const luckScore = Math.floor(Math.random() * (99.9 - 75.0) + 75.0); // 75-99.9%
    const uniqueRate = Math.floor(Math.random() * (99 - 85) + 85); // 85-99%

    // 2. Determine Tier based on Luck
    let tier: Tier = "COMMON";
    if (luckScore > 98) tier = "LEGENDARY";
    else if (luckScore > 95) tier = "MYTHIC";
    else if (luckScore > 90) tier = "VIP";
    else if (luckScore > 85) tier = "SUPER";

    // 3. Construct ID parts
    // Prefix: Platform or Dictionary Word
    const useWinningWord = Math.random() > 0.5;
    const prefix = useWinningWord
        ? WINNING_WORDS[Math.floor(Math.random() * WINNING_WORDS.length)]
        : (cleanPlatform || "LUCKY");

    // Middle: Username fragment or Random Chars
    const middle = cleanUsername.length > 2
        ? cleanUsername
        : Math.random().toString(36).substring(2, 6).toUpperCase();

    // Suffix: Hoki Numbers
    const suffix = HOKI_SUFFIXES[Math.floor(Math.random() * HOKI_SUFFIXES.length)];

    // Format: PREFIX-MIDDLE-SUFFIX
    const id = `${prefix}-${middle}-${suffix}`;

    return {
        id,
        tier,
        luckScore,
        uniqueRate,
        tags: [useWinningWord ? "Power Word" : "Platform Linked", "Hoki Suffix"]
    };
};

export const generateBeautifulDeposit = (min: number, max: number): number => {
    // Logic: Generate a number within range that looks "beautiful" or has a unique tail.

    // Chance for Pattern (88.888, 50.000) vs Tail verification (50.123)
    const isPattern = Math.random() > 0.4;

    if (isPattern) {
        // Generate patterns like ABC.ABC or AAA.AAA
        // Simplest approach: Generate a base round number and add pattern
        const base = Math.floor(Math.random() * ((max - min) / 1000)) * 1000 + min;

        // Force specific lucky numbers if within range
        const niceNumbers = [88888, 77777, 50000, 25000, 100000, 200000];
        const validNice = niceNumbers.filter(n => n >= min && n <= max);

        if (validNice.length > 0 && Math.random() > 0.6) {
            return validNice[Math.floor(Math.random() * validNice.length)];
        }

        return base; // Return round number
    } else {
        // Unique Tail Verification (add 3 unique digits)
        // e.g., Range 50000 -> 50123
        let base = Math.floor(Math.random() * (max - min) + min);
        base = Math.floor(base / 1000) * 1000; // Round down to thousands

        // Generate 3 unique unique digits? Or just 3 random digits.
        // "Unique 3 digits" usually means not 000.
        const tail = Math.floor(Math.random() * 899) + 101; // 101 to 999

        // Ensure accurate range constraint
        let result = base + tail;
        if (result > max) result = max - (max % 1000) + tail; // Clamp
        if (result < min) result = min + tail;

        return result;
    }
};
