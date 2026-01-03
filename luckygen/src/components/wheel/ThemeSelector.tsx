import { ComponentType } from 'react';
import { Sparkles, Diamond, Swords, Zap, Flame, Sunset, Cloud, Waves, TreePine, PartyPopper, Image as ImageIcon } from 'lucide-react';
import { useWheelStore } from '@/lib/store/wheelStore';
import { ThemeConfig, ThemeType } from '@/lib/utils/themes';

interface ThemeSelectorProps {
    themes?: Record<string, ThemeConfig>;
}

// Icon mapping for each theme
const themeIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
    default: Sparkles,
    casino: Diamond,
    anime: Swords,
    dark: Zap,
    neon: Flame,
    retro: Sunset,
    pastel: Cloud,
    ocean: Waves,
    forest: TreePine,
    party: PartyPopper,
};

// Mini wheel preview component
function MiniWheelPreview({ colors }: { colors: string[] }) {
    const displayColors = colors.slice(0, 6);
    const segmentAngle = 360 / displayColors.length;

    return (
        <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full">
                {displayColors.map((color, i) => {
                    const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
                    const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
                    const x1 = 20 + 20 * Math.cos(startAngle);
                    const y1 = 20 + 20 * Math.sin(startAngle);
                    const x2 = 20 + 20 * Math.cos(endAngle);
                    const y2 = 20 + 20 * Math.sin(endAngle);
                    const largeArc = segmentAngle > 180 ? 1 : 0;

                    return (
                        <path
                            key={i}
                            d={`M 20 20 L ${x1} ${y1} A 20 20 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={color}
                        />
                    );
                })}
                <circle cx="20" cy="20" r="6" fill="#1f2937" />
            </svg>
        </div>
    );
}

export default function ThemeSelector({ themes }: ThemeSelectorProps) {
    const { theme, setTheme } = useWheelStore();

    // Convert Record to Array for mapping
    const themeList = themes ? Object.entries(themes).map(([key, config]) => ({
        id: key,
        name: config.name,
        icon: themeIcons[key] || ImageIcon,
        colors: config.colors || ['#888', '#999', '#aaa', '#bbb'],
        gradient: config.background.includes('from-')
            ? config.background.split(' ').filter(c => c.startsWith('from-') || c.startsWith('via-') || c.startsWith('to-')).join(' ')
            : 'from-gray-500 to-gray-700',
        bgImage: config.backgroundImageUrl,
    })) : [];

    if (!themes) return <div className="text-center text-white/50">Loading themes...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-400" /> Choose Theme
                <span className="text-sm font-normal text-white/50 ml-2">({themeList.length} available)</span>
            </h3>

            {/* Flex wrap layout for better responsiveness */}
            <div className="flex flex-wrap justify-center gap-3">
                {themeList.map((themeOption) => {
                    const Icon = themeOption.icon;
                    const isActive = theme === themeOption.id;

                    return (
                        <button
                            key={themeOption.id}
                            onClick={() => setTheme(themeOption.id as ThemeType)}
                            className={`
                                relative p-3 rounded-xl transition-all duration-300 group
                                min-w-[100px] max-w-[120px]
                                ${isActive
                                    ? 'bg-white/25 scale-105 ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20'
                                    : 'bg-white/5 hover:bg-white/15 hover:scale-105 hover:shadow-lg'
                                }
                            `}
                        >
                            {/* Active Indicator Badge */}
                            {isActive && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center z-10 shadow-lg animate-pulse">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                            )}

                            {/* Theme Preview */}
                            <div className={`
                                mx-auto mb-2 rounded-lg overflow-hidden flex items-center justify-center relative
                                ${isActive ? 'ring-2 ring-white/50' : 'group-hover:ring-2 group-hover:ring-white/30'}
                            `}>
                                {themeOption.bgImage ? (
                                    <img
                                        src={themeOption.bgImage}
                                        alt={themeOption.name}
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Mini Wheel Preview */}
                                        <MiniWheelPreview colors={themeOption.colors} />
                                    </div>
                                )}
                            </div>

                            {/* Theme Icon & Name */}
                            <div className="flex flex-col items-center gap-1">
                                <Icon
                                    size={16}
                                    className={`transition-colors ${isActive ? 'text-yellow-400' : 'text-white/70 group-hover:text-white'}`}
                                />
                                <p className={`font-semibold text-xs truncate w-full text-center transition-colors ${isActive ? 'text-yellow-400' : 'text-white group-hover:text-white'}`}>
                                    {themeOption.name}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
