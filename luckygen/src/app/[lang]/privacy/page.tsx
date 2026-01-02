import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - LuckyGen',
    description: 'LuckyGen privacy policy - Learn how we protect your data and respect your privacy.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    Privacy Policy
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-sm text-gray-400">Last updated: January 2, 2026</p>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Information We Collect</h2>
                        <p>LuckyGen is designed with privacy in mind. We collect minimal information:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Wheel Data:</strong> When you create and share a wheel, we store the wheel title, segments, and slug in our database.</li>
                            <li><strong>Usage Statistics:</strong> We collect anonymous usage data such as page views and spin counts to improve our service.</li>
                            <li><strong>Browser Data:</strong> Standard web server logs including IP address, browser type, and referring pages.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. How We Use Your Information</h2>
                        <p>We use the collected information for:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Providing and improving the LuckyGen service</li>
                            <li>Generating shareable wheel URLs</li>
                            <li>Analyzing usage patterns to enhance user experience</li>
                            <li>Preventing abuse and ensuring service security</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Data Storage</h2>
                        <p>
                            Wheel data is stored securely in our database. Each shared wheel is accessible only via its unique URL.
                            We do not require user accounts or collect personal identifying information for basic use of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Cookies and Local Storage</h2>
                        <p>
                            We use browser localStorage to save your current wheel state, allowing you to continue where you left off.
                            This data never leaves your device and can be cleared at any time through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Third-Party Services</h2>
                        <p>
                            LuckyGen may display advertisements through Google AdSense. These services may use cookies to serve
                            relevant ads. Please review Google's privacy policy for more information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Data Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your data to third parties. Shared wheel URLs are publicly accessible
                            to anyone with the link, as intended by the sharing feature.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. Children's Privacy</h2>
                        <p>
                            LuckyGen is a general audience service. We do not knowingly collect personal information from children
                            under 13 years of age.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Access the data associated with your shared wheels</li>
                            <li>Request deletion of wheels you created (contact us with the URL)</li>
                            <li>Opt-out of analytics tracking via browser settings</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">9. Changes to This Policy</h2>
                        <p>
                            We may update this privacy policy from time to time. Changes will be posted on this page with an
                            updated revision date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">10. Contact Us</h2>
                        <p>
                            If you have questions about this privacy policy, please contact us at:{' '}
                            <a href="mailto:privacy@luckygen.click" className="text-blue-400 hover:underline">
                                privacy@luckygen.click
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
