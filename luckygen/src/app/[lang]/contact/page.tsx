import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - LuckyGen',
    description: 'Get in touch with the LuckyGen team. We welcome your feedback, questions, and suggestions.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent text-center">
                    Contact Us
                </h1>

                <div className="max-w-2xl mx-auto space-y-8">
                    <p className="text-center text-gray-300 text-lg">
                        We'd love to hear from you! Whether you have questions, feedback, or just want to say hello,
                        feel free to reach out.
                    </p>

                    <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Get In Touch</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">General Inquiries</h3>
                                <a
                                    href="mailto:support@luckygen.click"
                                    className="text-blue-400 hover:underline text-lg"
                                >
                                    support@luckygen.click
                                </a>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2">Business & Partnerships</h3>
                                <a
                                    href="mailto:business@luckygen.click"
                                    className="text-blue-400 hover:underline text-lg"
                                >
                                    business@luckygen.click
                                </a>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2">Privacy Concerns</h3>
                                <a
                                    href="mailto:privacy@luckygen.click"
                                    className="text-blue-400 hover:underline text-lg"
                                >
                                    privacy@luckygen.click
                                </a>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2">Legal & Terms</h3>
                                <a
                                    href="mailto:legal@luckygen.click"
                                    className="text-blue-400 hover:underline text-lg"
                                >
                                    legal@luckygen.click
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Is LuckyGen really free?</h3>
                                <p className="text-gray-300">
                                    Yes! LuckyGen is completely free to use with no hidden costs or premium tiers.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Can I delete a wheel I created?</h3>
                                <p className="text-gray-300">
                                    Yes, contact us with the wheel URL and we'll remove it from our database.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Do you offer API access?</h3>
                                <p className="text-gray-300">
                                    Currently, we don't offer public API access, but we're considering it for the future.
                                    Contact us if you have specific integration needs.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Can I use LuckyGen commercially?</h3>
                                <p className="text-gray-300">
                                    Yes, you can use LuckyGen for commercial purposes. If you need custom features or
                                    white-labeling, reach out to our business email.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-gray-400 mb-4">Response time: Usually within 24-48 hours</p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
