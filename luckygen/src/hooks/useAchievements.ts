'use client';

import { useState, useEffect } from 'react';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: number;
    unlocked: boolean;
    unlockedAt?: Date;
}

interface AchievementStats {
    spinCount: number;
    totalWheelsCreated: number;
    totalShares: number;
    firstSpinDate?: Date;
}

const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
    {
        id: 'novice',
        name: 'Novice Spinner',
        description: 'Complete your first 10 spins',
        icon: '🎯',
        requirement: 10
    },
    {
        id: 'pro',
        name: 'Pro Spinner',
        description: 'Reach 50 spins and unlock Premium theme',
        icon: '⭐',
        requirement: 50
    },
    {
        id: 'expert',
        name: 'Spin Expert',
        description: 'Master the wheel with 100 spins',
        icon: '🏆',
        requirement: 100
    },
    {
        id: 'legend',
        name: 'Spin Legend',
        description: 'Become a legend with 500 spins',
        icon: '👑',
        requirement: 500
    },
    {
        id: 'godlike',
        name: 'Godlike',
        description: 'Achieve ultimate mastery with 1000 spins',
        icon: '💫',
        requirement: 1000
    }
];

const STORAGE_KEY = 'luckygen_achievements';
const STATS_KEY = 'luckygen_stats';

export function useAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [stats, setStats] = useState<AchievementStats>({
        spinCount: 0,
        totalWheelsCreated: 0,
        totalShares: 0
    });
    const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const savedAchievements = localStorage.getItem(STORAGE_KEY);
            const savedStats = localStorage.getItem(STATS_KEY);

            if (savedAchievements) {
                setAchievements(JSON.parse(savedAchievements));
            } else {
                // Initialize achievements
                const initial = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }));
                setAchievements(initial);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
            }

            if (savedStats) {
                setStats(JSON.parse(savedStats));
            }
        } catch (error) {
            console.error('Failed to load achievements:', error);
        }
    }, []);

    // Save to localStorage whenever achievements or stats change
    const saveToStorage = (newAchievements: Achievement[], newStats: AchievementStats) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newAchievements));
            localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
        } catch (error) {
            console.error('Failed to save achievements:', error);
        }
    };

    // Check and unlock achievements
    const checkAchievements = (newStats: AchievementStats) => {
        const updated = achievements.map(achievement => {
            if (achievement.unlocked) return achievement;

            const shouldUnlock = newStats.spinCount >= achievement.requirement;

            if (shouldUnlock) {
                const unlockedAchievement = {
                    ...achievement,
                    unlocked: true,
                    unlockedAt: new Date()
                };

                // Only show notification for first unlock
                if (!newlyUnlocked || newlyUnlocked.id !== achievement.id) {
                    setNewlyUnlocked(unlockedAchievement);

                    // Auto-hide notification after 5 seconds
                    setTimeout(() => setNewlyUnlocked(null), 5000);
                }

                return unlockedAchievement;
            }

            return achievement;
        });

        setAchievements(updated);
        saveToStorage(updated, newStats);
    };

    // Increment spin count
    const incrementSpin = () => {
        const newStats: AchievementStats = {
            ...stats,
            spinCount: stats.spinCount + 1,
            firstSpinDate: stats.firstSpinDate || new Date()
        };

        setStats(newStats);
        checkAchievements(newStats);
    };

    // Increment wheels created
    const incrementWheelsCreated = () => {
        const newStats = {
            ...stats,
            totalWheelsCreated: stats.totalWheelsCreated + 1
        };

        setStats(newStats);
        saveToStorage(achievements, newStats);
    };

    // Increment shares
    const incrementShares = () => {
        const newStats = {
            ...stats,
            totalShares: stats.totalShares + 1
        };

        setStats(newStats);
        saveToStorage(achievements, newStats);
    };

    // Dismiss notification
    const dismissNotification = () => {
        setNewlyUnlocked(null);
    };

    // Check if Pro theme is unlocked (50+ spins)
    const hasUnlockedProTheme = () => {
        return stats.spinCount >= 50;
    };

    // Get progress for next achievement
    const getNextAchievement = () => {
        const locked = achievements.filter(a => !a.unlocked);
        return locked.length > 0 ? locked[0] : null;
    };

    const getProgress = () => {
        const next = getNextAchievement();
        if (!next) return 100;
        return Math.min((stats.spinCount / next.requirement) * 100, 100);
    };

    return {
        achievements,
        stats,
        newlyUnlocked,
        incrementSpin,
        incrementWheelsCreated,
        incrementShares,
        dismissNotification,
        hasUnlockedProTheme,
        getNextAchievement,
        getProgress
    };
}
