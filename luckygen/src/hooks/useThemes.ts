'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { THEME_CONFIGS, ThemeConfig } from '@/lib/utils/themes';

interface UseThemesReturn {
    themes: Record<string, ThemeConfig>;
    themeKeys: string[];
    loading: boolean;
    error: Error | null;
}

export function useThemes(): UseThemesReturn {
    const [themes, setThemes] = useState<Record<string, ThemeConfig>>({ ...THEME_CONFIGS });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const { data, error } = await supabase
                    .from('app_themes')
                    .select('*')
                    .eq('is_active', true);

                if (error) throw error;

                if (data && data.length > 0) {
                    const dynamicThemes: Record<string, ThemeConfig> = {};

                    data.forEach((theme) => {
                        dynamicThemes[theme.key] = {
                            name: theme.name,
                            colors: theme.colors,
                            background: '', // Will use backgroundImageUrl
                            backgroundImageUrl: theme.bg_image_url,
                            pointerColor: '#FFFFFF', // Default fallback
                            pointerImageUrl: theme.pointer_image_url,
                            centerButtonGradient: 'from-gray-700 to-black', // Default
                            centerButtonStyle: theme.button_style,
                            winnerGradient: 'from-yellow-400 to-red-500', // Default
                            outerRing: '#FFFFFF',
                        };
                    });

                    // Merge dynamic themes with default themes
                    // Dynamic themes take precedence if keys collide (though they shouldn't usually)
                    setThemes((prev) => ({ ...prev, ...dynamicThemes }));
                }
            } catch (err) {
                console.error('Error fetching themes:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchThemes();
    }, [supabase]);

    return {
        themes,
        themeKeys: Object.keys(themes),
        loading,
        error,
    };
}
