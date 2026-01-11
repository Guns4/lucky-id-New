import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service - LuckyGen',
    description: 'Terms of Service for LuckyGen Random Wheel Generator. Read our terms and conditions for using our service.',
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsOfServicePage() {
    const lastUpdated = "January 11, 2026";

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Terms of Service</h1>
                    <p className="text-gray-600">
                        Last Updated: <span className="font-semibold">{lastUpdated}</span>
                    </p>
                    <Link
                        href="/"
                        className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Content */}
                <article className="bg-white rounded-lg shadow-md p-8 prose prose-gray max-w-none">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing and using LuckyGen ("Service," "we," "our," or "us"), available at <strong>luckygen.click</strong>,
                        you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms,
                        you may not access the Service.
                    </p>

                    <h2>2. Description of Service</h2>
                    <p>
                        LuckyGen is a web-based random wheel generator tool designed for entertainment and educational purposes.
                        Our Service allows users to:
                    </p>
                    <ul>
                        <li>Create custom random selection wheels</li>
                        <li>Add and manage wheel segments</li>
                        <li>Spin the wheel to generate random results</li>
                        <li>Save wheel configurations locally in their browser</li>
                        <li>Share wheels with others</li>
                    </ul>

                    <h2>3. Important Disclaimer</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
                        <h3 className="text-xl font-bold text-yellow-900 mb-2 mt-0">⚠️ Entertainment and Educational Use Only</h3>
                        <p className="text-yellow-800 mb-2">
                            <strong>This tool is intended solely for entertainment and educational purposes.</strong>
                        </p>
                        <p className="text-yellow-800 mb-2">
                            <strong>ALL RESULTS ARE GENERATED RANDOMLY</strong> using cryptographic pseudo-random number generation (PRNG).
                            While we strive for fairness and randomness, the results are for entertainment purposes only.
                        </p>
                        <p className="text-yellow-800 mb-0">
                            <strong>DO NOT use this tool for:</strong>
                        </p>
                        <ul className="text-yellow-800 mt-2">
                            <li>Legal decisions or binding contracts</li>
                            <li>Financial decisions or gambling</li>
                            <li>Medical decisions or health-related choices</li>
                            <li>Any situation where the outcome has legal, financial, or serious consequences</li>
                        </ul>
                    </div>

                    <h2>4. Use License</h2>
                    <p>
                        We grant you a personal, non-exclusive, non-transferable, limited license to access and use the Service for
                        entertainment and educational purposes, subject to these Terms.
                    </p>
                    <p>You agree NOT to:</p>
                    <ul>
                        <li>Modify, copy, or create derivative works based on the Service</li>
                        <li>Reverse engineer, decompile, or disassemble the Service</li>
                        <li>Remove any copyright or proprietary notices</li>
                        <li>Use the Service for any illegal or unauthorized purpose</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Attempt to gain unauthorized access to the Service</li>
                        <li>Use automated systems (bots, scripts) to access the Service</li>
                    </ul>

                    <h2>5. User Content and Data</h2>

                    <h3>5.1 Your Content</h3>
                    <p>
                        You retain all rights to any content you create using the Service (wheel configurations, segment text, etc.).
                        This content is stored locally in your browser and is not transmitted to our servers.
                    </p>

                    <h3>5.2 Responsibility for Content</h3>
                    <p>
                        You are solely responsible for the content you create. You agree not to create content that:
                    </p>
                    <ul>
                        <li>Is illegal, harmful, threatening, abusive, or hateful</li>
                        <li>Violates any intellectual property rights</li>
                        <li>Contains malware or malicious code</li>
                        <li>Impersonates another person or entity</li>
                        <li>Is spam or unsolicited advertising</li>
                    </ul>

                    <h2>6. Randomness and Fairness</h2>
                    <p>
                        While we implement industry-standard random number generation algorithms, we make no guarantees about:
                    </p>
                    <ul>
                        <li>The statistical perfection of random outcomes</li>
                        <li>The suitability of results for any particular purpose</li>
                        <li>The fairness of results in any legal or binding context</li>
                    </ul>
                    <p>
                        <strong>Results are provided "as is" for entertainment purposes only.</strong>
                    </p>

                    <h2>7. Disclaimer of Warranties</h2>
                    <p>
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                        INCLUDING BUT NOT LIMITED TO:
                    </p>
                    <ul>
                        <li>Warranties of merchantability or fitness for a particular purpose</li>
                        <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
                        <li>Warranties regarding the accuracy or reliability of results</li>
                        <li>Warranties that defects will be corrected</li>
                    </ul>
                    <p>
                        Your use of the Service is at your sole risk.
                    </p>

                    <h2>8. Limitation of Liability</h2>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, LUCKYGEN AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY:
                    </p>
                    <ul>
                        <li>Indirect, incidental, special, consequential, or punitive damages</li>
                        <li>Loss of profits, revenue, data, or use</li>
                        <li>Damages arising from your use or inability to use the Service</li>
                        <li>Damages arising from any reliance on results generated by the Service</li>
                    </ul>
                    <p>
                        IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID US IN THE PAST TWELVE MONTHS (WHICH IS $0
                        AS THE SERVICE IS FREE).
                    </p>

                    <h2>9. Indemnification</h2>
                    <p>
                        You agree to indemnify, defend, and hold harmless LuckyGen, its officers, directors, employees, and agents from
                        any claims, liabilities, damages, losses, or expenses arising from:
                    </p>
                    <ul>
                        <li>Your use of the Service</li>
                        <li>Your violation of these Terms</li>
                        <li>Your violation of any rights of another party</li>
                        <li>Any content you create or share using the Service</li>
                    </ul>

                    <h2>10. Third-Party Services</h2>

                    <h3>10.1 Google AdSense</h3>
                    <p>
                        Our Service uses Google AdSense to display advertisements. Your use of the Service is subject to Google's
                        privacy policy and terms of service. Clicking on advertisements is at your own risk.
                    </p>

                    <h3>10.2 External Links</h3>
                    <p>
                        The Service may contain links to third-party websites. We are not responsible for the content, privacy policies,
                        or practices of any third-party sites. Accessing such links is at your own risk.
                    </p>

                    <h2>11. Intellectual Property</h2>
                    <p>
                        The Service, including its original content, features, functionality, source code, and design, is owned by
                        LuckyGen and is protected by international copyright, trademark, patent, trade secret, and other intellectual
                        property laws.
                    </p>
                    <p>
                        Our trademarks and trade dress may not be used without our prior written consent.
                    </p>

                    <h2>12. Privacy</h2>
                    <p>
                        Your use of the Service is also governed by our Privacy Policy. Please review our
                        <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> to
                        understand our data practices.
                    </p>

                    <h2>13. Age Restriction</h2>
                    <p>
                        The Service is intended for general audiences. If you are under 13 years of age, you may only use the Service
                        with the consent and supervision of a parent or legal guardian.
                    </p>

                    <h2>14. Termination</h2>
                    <p>
                        We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any
                        reason, including without limitation if you breach these Terms.
                    </p>
                    <p>
                        Upon termination, your right to use the Service will immediately cease. You may also discontinue using the Service
                        at any time.
                    </p>

                    <h2>15. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this
                        page with an updated "Last Updated" date. Your continued use of the Service after changes constitutes acceptance
                        of the new Terms.
                    </p>

                    <h2>16. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which LuckyGen
                        operates, without regard to conflict of law provisions.
                    </p>

                    <h2>17. Dispute Resolution</h2>
                    <p>
                        Any disputes arising from these Terms or the Service shall be resolved through binding arbitration, except where
                        prohibited by law. You waive any right to participate in a class action lawsuit or class-wide arbitration.
                    </p>

                    <h2>18. Severability</h2>
                    <p>
                        If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated
                        to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                    </p>

                    <h2>19. No Waiver</h2>
                    <p>
                        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                    </p>

                    <h2>20. Entire Agreement</h2>
                    <p>
                        These Terms constitute the entire agreement between you and LuckyGen regarding the Service and supersede all prior
                        agreements and understandings.
                    </p>

                    <h2>21. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms, please contact us:
                    </p>
                    <div className="bg-gray-50 border-l-4 border-blue-500 p-4 my-4">
                        <p className="mb-1"><strong>Email:</strong> legal@luckygen.click</p>
                        <p className="mb-1"><strong>Website:</strong> https://luckygen.click</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">Summary</h3>
                        <p className="text-sm text-blue-800">
                            This tool is for <strong>entertainment and educational purposes only</strong>. Results are randomly generated.
                            Do not use for legal, financial, or medical decisions. Use at your own risk. We are not liable for any outcomes.
                            By using this service, you accept these terms.
                        </p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-4">
                        <h3 className="text-lg font-bold text-red-900 mb-2">🎲 Random Results Disclaimer</h3>
                        <p className="text-sm text-red-800 mb-0">
                            <strong>IMPORTANT:</strong> All wheel spins produce random results using cryptographic algorithms. While designed
                            for fairness, results should never be used for binding decisions, gambling, legal matters, or anything with
                            serious consequences. This is a fun tool for casual decision-making and entertainment only.
                        </p>
                    </div>
                </article>

                {/* Footer Navigation */}
                <div className="mt-8 flex justify-between items-center">
                    <Link
                        href="/privacy-policy"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        ← Privacy Policy
                    </Link>
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Back to Home →
                    </Link>
                </div>
            </div>
        </div>
    );
}
