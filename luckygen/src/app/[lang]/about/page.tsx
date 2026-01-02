import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - LuckyGen | Random Wheel Decision Maker',
    description: 'Learn about LuckyGen, the free online spinning wheel tool that helps millions make decisions easily.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    About LuckyGen
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <section>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Our Mission</h2>
                        <p>
                            LuckyGen was created with a simple goal: to make decision-making fun, fair, and effortless.
                            We believe that sometimes the best choice is the one made by chance, free from bias and overthinking.
                        </p>
                        <p>
                            Whether you're deciding what to eat for lunch, choosing a random winner for a giveaway, or
                            just having fun with friends, our spinning wheel tool brings an element of excitement to
                            everyday decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">What We Offer</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Free Forever:</strong> No hidden costs, no subscriptions, no limits</li>
                            <li><strong>No Registration Required:</strong> Start spinning immediately</li>
                            <li><strong>Unlimited Customization:</strong> Create wheels with any options you want</li>
                            <li><strong>Shareable Links:</strong> Every wheel gets a unique URL to share with anyone</li>
                            <li><strong>Mobile-Friendly:</strong> Works perfectly on all devices</li>
                            <li><strong>Multilingual:</strong> Available in English, Spanish, Portuguese, Indonesian, and Hindi</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Our Technology</h2>
                        <p>
                            Built with modern web technologies including Next.js, our platform delivers lightning-fast
                            performance and smooth animations. Every spin uses a fair randomization algorithm, ensuring
                            each option has an equal chance of being selected.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Privacy & Security</h2>
                        <p>
                            We respect your privacy. LuckyGen doesn't require personal information to use the basic features.
                            Any wheels you create are stored securely and only accessible via their unique URL.
                            We don't sell or share your data with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Contact Us</h2>
                        <p>
                            Have questions, feedback, or suggestions? We'd love to hear from you!
                        </p>
                        <p>
                            Email: <a href="mailto:support@luckygen.click" className="text-blue-400 hover:underline">support@luckygen.click</a>
                        </p>
                    </section>

                    <section className="mt-12 pt-8 border-t border-white/20">
                        <p className="text-center">
                            <a href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform">
                                Try LuckyGen Now
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
