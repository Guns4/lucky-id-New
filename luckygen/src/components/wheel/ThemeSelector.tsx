import { ComponentType } from 'react';
import { Sparkles, Diamond, Swords, Zap, Image as ImageIcon } from 'lucide-react';
import { useWheelStore } from '@/lib/store/wheelStore';
import { ThemeConfig, ThemeType } from '@/lib/utils/themes';

interface ThemeSelectorProps {
    themes?: Record<string, ThemeConfig>;
}

export default function ThemeSelector({ themes }: ThemeSelectorProps) {
    const { theme, setTheme } = useWheelStore();

    // Convert Record to Array for mapping
    // If no themes passed, it implies fallback, but we should always have themes from the hook or default
    const themeList = themes ? Object.entries(themes).map(([key, config]) => ({
        id: key,
        name: config.name,
        // Fallback or specific logic for icons if desired, for now using generic logic
        icon: key === 'default' ? Sparkles :
            key === 'casino' ? Diamond :
                key === 'anime' ? Swords :
                    key === 'dark' ? Zap : ImageIcon,
        gradient: config.background.includes('from-') ? config.background.split(' ').filter(c => c.startsWith('from-') || c.startsWith('to-')).join(' ') : 'from-gray-500 to-gray-700',
        bgImage: config.backgroundImageUrl,
        description: key === 'default' ? 'Classic' : 'Custom Theme',
    })) : [];

    if (!themes) return <div className="text-center text-white/50">Loading themes...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-400" /> Choose Theme
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {themeList.map((themeOption) => {
                    const Icon = themeOption.icon;
                    const isActive = theme === themeOption.id;

                    return (
                        <button
                            key={themeOption.id}
                            onClick={() => setTheme(themeOption.id as ThemeType)}
                            className={`
                                relative p-3 rounded-xl transition-all duration-300 group
                                ${isActive
                                    ? 'bg-white/20 scale-105 ring-2 ring-white shadow-xl'
                                    : 'bg-white/5 hover:bg-white/10 hover:scale-102'
                                }
                            `}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-md">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                            )}

                            {/* Icon/Image Preview */}
                            <div className={`
                                w-12 h-12 mx-auto mb-2 rounded-lg 
                                overflow-hidden flex items-center justify-center relative
                                ${isActive ? 'ring-2 ring-white/50' : ''}
                            `}>
                                {themeOption.bgImage ? (
                                    <img
                                        src={themeOption.bgImage}
                                        alt={themeOption.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${themeOption.gradient} flex items-center justify-center`}>
                                        <Icon size={24} className="text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Theme Name */}
                            <p className="text-white font-semibold text-xs md:text-sm mb-0.5 truncate w-full">
                                {themeOption.name}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
