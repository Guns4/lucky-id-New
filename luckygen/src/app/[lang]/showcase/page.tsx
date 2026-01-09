import PremiumHero from '@/components/shared/PremiumHero';
import PremiumFeatures from '@/components/shared/PremiumFeatures';
import ComparisonTable from '@/components/shared/ComparisonTable';
import Navigation from '@/components/shared/Navigation';

export default function ShowcasePage() {
    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-[#0a0f1e]">
                <PremiumHero />
                <div id="wheel-section"><PremiumFeatures /></div>
                <ComparisonTable />

                {/* Premium Footer */}
                <footer className="py-12 px-4 border-t border-white/10">
                    <div className="container-premium text-center">
                        <div className="frosted-glass p-8 rounded-3xl max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-gradient mb-4">
                                Ready to Experience the Difference?
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Join over 1 million users who trust LuckyGen for their decision-making needs
                            </p>
                            <a
                                href="/"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-bold text-white hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300"
                            >
                                Start Spinning Now - It's Free!
                            </a>
                        </div>

                        <div className="mt-8 text-sm text-gray-500">
                            <p>© 2024 LuckyGen. The Professional Choice for Decision Making.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
