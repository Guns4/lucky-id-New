import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - LuckyGen',
    description: 'LuckyGen terms of service - Read our terms and conditions for using the random wheel spinner.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    Terms of Service
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-sm text-gray-400">Last updated: January 2, 2026</p>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using LuckyGen, you accept and agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. Service Description</h2>
                        <p>
                            LuckyGen provides a free online random wheel spinner tool for decision-making purposes.
                            Users can create custom wheels, spin them for random results, and share wheels via unique URLs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. User Responsibilities</h2>
                        <p>You agree to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Use the service for lawful purposes only</li>
                            <li>Not create wheels with offensive, illegal, or harmful content</li>
                            <li>Not attempt to abuse, hack, or interfere with the service</li>
                            <li>Not use automated tools to spam or overload the service</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Content Ownership</h2>
                        <p>
                            You retain ownership of the wheel configurations you create. By sharing a wheel, you grant
                            LuckyGen a license to display and distribute that wheel content via the shareable URL.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. No Warranties</h2>
                        <p>
                            LuckyGen is provided "as is" without warranties of any kind. We do not guarantee uninterrupted
                            access, error-free operation, or that the service will meet your specific requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Limitation of Liability</h2>
                        <p>
                            LuckyGen and its operators shall not be liable for any indirect, incidental, or consequential
                            damages arising from your use of the service. Use the service at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. Content Moderation</h2>
                        <p>
                            We reserve the right to remove any shared wheels that violate these terms or contain
                            inappropriate content, without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. Service Modifications</h2>
                        <p>
                            We reserve the right to modify, suspend, or discontinue any aspect of the service at any time,
                            with or without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">9. Third-Party Links</h2>
                        <p>
                            LuckyGen may contain links to third-party websites or advertisements. We are not responsible
                            for the content or practices of these external sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">10. Termination</h2>
                        <p>
                            We may terminate or suspend your access to the service immediately, without prior notice,
                            for conduct that we believe violates these terms or is harmful to other users.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">11. Governing Law</h2>
                        <p>
                            These terms shall be governed by and construed in accordance with applicable international laws,
                            without regard to conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">12. Contact</h2>
                        <p>
                            Questions about these terms? Contact us at:{' '}
                            <a href="mailto:legal@luckygen.click" className="text-blue-400 hover:underline">
                                legal@luckygen.click
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
