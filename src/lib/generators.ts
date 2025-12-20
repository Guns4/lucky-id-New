export type Tier = "LEGENDARY" | "MYTHIC" | "VIP" | "SUPER" | "COMMON";

export interface SmartIDResult {
    id: string;
    tier: Tier;
    luckScore: number;
    uniqueRate: number;
    tags: string[];
}

// Expanded Dictionary for Cool/Lucky Names (Indonesian & Global Context)
const COOL_PREFIXES = [
    // Mythical & Power
    "Naga", "Zeus", "Raja", "Dewa", "King", "Lord", "Boss", "Sultan", "Moster",
    "Titan", "Phoenix", "Dragon", "Tiger", "Lion", "Garuda", "Elang", "Cobra",
    "Viper", "Phantom", "Shadow", "Storm", "Thunder", "Petir", "Badai", 'Wolf',
    'Tiger', 'Lion', 'Eagle', 'Shark', 'Hawk', 'Falcon', 'Panther',
    'Cobra', 'Viper', 'Dragon', 'Phoenix', 'Bear', 'Jaguar', 'Leopard', 'Raven',
    'Fox', 'Lynx', 'Puma', 'Raptor', 'Grizzly', 'Mustang', 'Stallion', 'Rhino',
    'Scorpion', 'Mantis', 'Spider', 'Kraken', 'Griffin', 'Hydra', 'Cerberus',
    'Storm', 'Thunder', 'Blaze', 'Frost', 'Shadow', 'Dawn', 'Dusk', 'Eclipse',
    'Aurora', 'Nova', 'Comet', 'Meteor', 'Astro', 'Cosmic', 'Solar', 'Lunar',
    'Ocean', 'River', 'Mountain', 'Forest', 'Desert', 'Arctic', 'Tropic', 'Volcano',
    'Crystal', 'Diamond', 'Ruby', 'Jade', 'Onyx', 'Obsidian', 'Emerald', 'Sapphire',
    'Blitz', 'Bolt', 'Flash', 'Spark', 'Flare', 'Blaze', 'Fury', 'Rage',
    'Havoc', 'Chaos', 'Vortex', 'Apex', 'Zenith', 'Summit', 'Peak', 'Crest',
    'Edge', 'Blade', 'Steel', 'Iron', 'Titanium', 'Chrome', 'Silver', 'Gold',
    'Jet', 'Rocket', 'Missile', 'Bullet', 'Arrow', 'Spear', 'Sword', 'Shield',
    // Fortune
    "Hoki", "Cuan", "Gacor", "Win", "Max", "Jackpot", "Profit", "Rich", "Gold",
    "Diamond", "Crystal", "Ruby", "Luck", "Fortune", "Winner", "Juara", "Top",
    'Titan', 'Zeus', 'Thor', 'Odin', 'Atlas', 'Ares', 'Apollo', 'Hades',
    'Phoenix', 'Sphinx', 'Minotaur', 'Pegasus', 'Valkyrie', 'Fenrir', 'Loki',
    'Naga', 'Garuda', 'Dewa', 'Raja', 'Satria', 'Arjuna', 'Bima', 'Kresna',
    'Merlin', 'Draco', 'Osiris', 'Anubis', 'Ra', 'Poseidon', 'Hercules',
    'King', 'Queen', 'Sultan', 'Boss', 'Chief', 'Master', 'Legend', 'Hero',
    'Champion', 'Victor', 'Conqueror', 'Emperor', 'Prince', 'Duke', 'Lord', 'Baron',
    'Captain', 'General', 'Admiral', 'Commander', 'Major', 'Colonel', 'Elite', 'Prime',
    'Ace', 'Pro', 'VIP', 'MVP', 'Star', 'Icon', 'Mogul', 'Tycoon',
    'Sakti', 'Jaya', 'Wijaya', 'Kusuma', 'Putra', 'Surya', 'Bayu', 'Agung',
    'Berlian', 'Emas', 'Mutiara', 'Permata', 'Intan', 'Megah', 'Cahaya', 'Mentari',
    'Elang', 'Harimau', 'Singa', 'Rajawali', 'Banteng', 'Badak', 'Komodo', 'Macan',
    'Pangeran', 'Ratu', 'Prabu', 'Ksatria', 'Pahlawan', 'Perkasa', 'Gagah', 'Berani',
];

const COOL_OBJECTS = [
    "Bet", "Slot", "Spin", "Play", "Game", "Zone", "Club", "City", "Star",
    "Moon", "Sun", "Sky", "Sea", "Ocean", "Fire", "Ice",
    'Ninja', 'Sniper', 'Hunter', 'Raider', 'Viking', 'Samurai', 'Ronin', 'Shadow',
    'Phantom', 'Ghost', 'Reaper', 'Striker', 'Blader', 'Gunner', 'Tank', 'Healer',
    'Mage', 'Rogue', 'Paladin', 'Warlord', 'Assassin', 'Berserker', 'Ranger',
    'Crusader', 'Knight', 'Sentinel', 'Guardian', 'Seeker', 'Slayer', 'Breaker',
    'Pixel', 'Cyber', 'Neo', 'Matrix', 'Vector', 'Quantum', 'Binary', 'Crypto',
    'Nexus', 'Byte', 'Code', 'Data', 'Node', 'Cloud', 'Nano', 'Turbo',
    'Sonic', 'Nitro', 'Hyper', 'Ultra', 'Mega', 'Giga', 'Tera', 'Omega',
    'Alpha', 'Beta', 'Delta', 'Sigma', 'Zero', 'Core', 'Pulse', 'Flux',
    'Gamer', 'Player', 'User', 'Guest', 'Member', 'Admin', 'Mod', 'Dev',
    'Hacker', 'Coder', 'Geek', 'Nerd', 'Noob', 'Newbie', 'Veteran', 'Legend',
    'Stream', 'Live', 'Online', 'Digital', 'Virtual', 'Web', 'Net', 'Link',
    'Click', 'Tap', 'Swipe', 'Scroll', 'Like', 'Share', 'Post', 'Chat',
];

const HOKI_SUFFIXES = ["88", "77", "99", "888", "777", "999", "168", "303", "4D", "69", "007"];

export const generateSmartID = (platform: string, username: string): SmartIDResult => {
    // 1. Calculate luck check
    const luckScore = Math.floor(Math.random() * (99.9 - 75.0) + 75.0);
    const uniqueRate = Math.floor(Math.random() * (99 - 85) + 85);

    // 2. Determine Tier
    let tier: Tier = "COMMON";
    if (luckScore > 98) tier = "LEGENDARY";
    else if (luckScore > 95) tier = "MYTHIC";
    else if (luckScore > 90) tier = "VIP";
    else if (luckScore > 85) tier = "SUPER";

    // 3. Construct ID
    // Pattern: [Word][Suffix] or [Word][Word][Suffix]
    // We want to avoid generic randomness like "KILU".

    let baseName = "";

    // 50% chance to incorporate platform or username fragment if they exist and are short
    const useUserInput = Math.random() > 0.6;

    if (useUserInput && (platform.length < 6 || username.length < 6)) {
        // Use user input + Cool Prefix
        const inputBase = username.length < 6 && username.length > 0 ? username : platform;
        const prefix = COOL_PREFIXES[Math.floor(Math.random() * COOL_PREFIXES.length)];
        // Capitalize first letter only for aesthetic "NagaZeus" vs "NAGAZEUS"
        const cleanInput = inputBase.charAt(0).toUpperCase() + inputBase.slice(1).toLowerCase().replace(/[^a-zA-Z]/g, '');
        baseName = `${prefix}${cleanInput}`;
    } else {
        // Pure Dictionary Generation
        const prefix = COOL_PREFIXES[Math.floor(Math.random() * COOL_PREFIXES.length)];
        // Optional second word for variety
        const useSecondWord = Math.random() > 0.4;
        let secondWord = "";
        if (useSecondWord) {
            secondWord = COOL_OBJECTS[Math.floor(Math.random() * COOL_OBJECTS.length)];
        }
        baseName = `${prefix}${secondWord}`;
    }

    // Suffix: Mandatory Hoki Numbers
    const suffix = HOKI_SUFFIXES[Math.floor(Math.random() * HOKI_SUFFIXES.length)];

    const id = `${baseName}${suffix}`;

    return {
        id,
        tier,
        luckScore,
        uniqueRate,
        tags: ["Pattern Matched", "Hoki Suffix"]
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
