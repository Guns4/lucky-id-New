import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy - LuckyGen',
    description: 'Privacy Policy for LuckyGen Random Wheel Generator. Learn how we collect, use, and protect your data.',
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "January 11, 2026";

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Privacy Policy</h1>
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
                    <h2>Introduction</h2>
                    <p>
                        Welcome to LuckyGen ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
                        the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
                        and safeguard your information when you visit our website <strong>luckygen.click</strong> and use our
                        random wheel generator tool.
                    </p>
                    <p>
                        Please read this privacy policy carefully. By accessing or using our service, you acknowledge that you
                        have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                    </p>

                    <h2>1. Information We Collect</h2>

                    <h3>1.1 Information You Provide</h3>
                    <p>
                        Our service is designed to work without requiring personal information. However, you may voluntarily provide:
                    </p>
                    <ul>
                        <li>Custom text entries you add to the wheel (stored locally in your browser)</li>
                        <li>Wheel configurations and settings (stored locally in your browser)</li>
                    </ul>
                    <p>
                        <strong>Important:</strong> We do not require registration, email addresses, or personal information to use our service.
                    </p>

                    <h3>1.2 Information Automatically Collected</h3>
                    <p>
                        When you visit our website, certain information is automatically collected, including:
                    </p>
                    <ul>
                        <li><strong>Log Data:</strong> IP address, browser type, browser version, pages visited, time and date of visit, time spent on pages, and other diagnostic data</li>
                        <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
                        <li><strong>Usage Data:</strong> How you interact with our service, features used, and preferences</li>
                    </ul>

                    <h2>2. Cookies and Tracking Technologies</h2>

                    <h3>2.1 What Are Cookies</h3>
                    <p>
                        Cookies are small text files stored on your device that help us enhance your experience. We use cookies
                        and similar tracking technologies to track activity on our service and store certain information.
                    </p>

                    <h3>2.2 Types of Cookies We Use</h3>
                    <ul>
                        <li>
                            <strong>Essential Cookies:</strong> Required for the website to function properly, such as remembering
                            your wheel settings and preferences
                        </li>
                        <li>
                            <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting
                            and reporting information anonymously (via Google Analytics)
                        </li>
                        <li>
                            <strong>Advertising Cookies:</strong> Used to deliver advertisements that are relevant to you and your interests
                        </li>
                    </ul>

                    <h3>2.3 Managing Cookies</h3>
                    <p>
                        You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However,
                        if you do not accept cookies, some portions of our service may not function properly.
                    </p>

                    <h2>3. Google AdSense and Third-Party Advertising</h2>

                    <h3>3.1 Google AdSense</h3>
                    <p>
                        We use <strong>Google AdSense</strong> to display advertisements on our website. Google AdSense uses cookies
                        to serve ads based on your prior visits to our website or other websites on the Internet.
                    </p>

                    <h3>3.2 How Google Uses Your Information</h3>
                    <p>
                        Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to
                        our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting
                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Google Ads Settings
                        </a>.
                    </p>

                    <h3>3.3 Third-Party Ad Networks</h3>
                    <p>
                        Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website.
                        These third-party vendors have their own privacy policies, and we do not have access to or control over the
                        cookies they may use.
                    </p>
                    <p>
                        For more information about how Google uses data when you use our partners' sites or apps, visit:
                        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                            Google Privacy & Terms
                        </a>
                    </p>

                    <h2>4. Google Analytics</h2>
                    <p>
                        We use Google Analytics to analyze how our service is used. Google Analytics collects information such as
                        how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site.
                    </p>
                    <p>
                        Google Analytics uses cookies to collect this information. The information generated relating to our website is
                        used to create reports about the use of our website. Google stores this information, and Google's privacy policy
                        is available at:
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                            https://policies.google.com/privacy
                        </a>
                    </p>

                    <h2>5. Local Storage</h2>
                    <p>
                        We use browser local storage to save your wheel configurations, custom segments, and preferences. This data is:
                    </p>
                    <ul>
                        <li>Stored locally on your device only</li>
                        <li>Not transmitted to our servers</li>
                        <li>Not shared with third parties</li>
                        <li>Accessible only by you within your browser</li>
                        <li>Can be cleared by you at any time through your browser settings</li>
                    </ul>

                    <h2>6. How We Use Your Information</h2>
                    <p>We use the information we collect for the following purposes:</p>
                    <ul>
                        <li>To provide, maintain, and improve our service</li>
                        <li>To understand how users interact with our service</li>
                        <li>To develop new features and functionality</li>
                        <li>To serve relevant advertisements through Google AdSense</li>
                        <li>To analyze usage patterns and optimize performance</li>
                        <li>To detect, prevent, and address technical issues</li>
                        <li>To comply with legal obligations</li>
                    </ul>

                    <h2>7. Data Security</h2>
                    <p>
                        We take the security of your data seriously and implement appropriate technical and organizational measures to
                        protect your information. However, please note that:
                    </p>
                    <ul>
                        <li>No method of transmission over the Internet is 100% secure</li>
                        <li>We cannot guarantee absolute security of your information</li>
                        <li>Your wheel data is stored locally in your browser and is under your control</li>
                        <li>We use HTTPS encryption to protect data in transit</li>
                    </ul>

                    <h2>8. Children's Privacy</h2>
                    <p>
                        Our service is a general audience tool and is not directed to children under the age of 13. We do not knowingly
                        collect personal information from children under 13. If you are a parent or guardian and believe your child has
                        provided us with personal information, please contact us, and we will take steps to delete such information.
                    </p>

                    <h2>9. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and maintained on servers located outside of your country where data
                        protection laws may differ. By using our service, you consent to such transfers.
                    </p>

                    <h2>10. Your Privacy Rights</h2>
                    <p>Depending on your location, you may have the following rights:</p>
                    <ul>
                        <li><strong>Access:</strong> Request access to your personal information</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your information</li>
                        <li><strong>Opt-Out:</strong> Opt out of personalized advertising</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                    </ul>
                    <p>
                        To exercise these rights, you can clear your browser's local storage and cookies, or contact us at the email
                        address provided below.
                    </p>

                    <h2>11. Do Not Track Signals</h2>
                    <p>
                        Some web browsers include a "Do Not Track" (DNT) feature. Our service currently does not respond to DNT signals.
                        However, you can opt out of personalized advertising through Google's settings.
                    </p>

                    <h2>12. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated"
                        date. We encourage you to review this Privacy Policy periodically for any changes. Continued use of our service after
                        changes constitutes acceptance of the updated Privacy Policy.
                    </p>

                    <h2>13. Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <div className="bg-gray-50 border-l-4 border-blue-500 p-4 my-4">
                        <p className="mb-1"><strong>Email:</strong> privacy@luckygen.click</p>
                        <p className="mb-1"><strong>Website:</strong> https://luckygen.click</p>
                    </div>

                    <h2>14. Consent</h2>
                    <p>
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">Summary</h3>
                        <p className="text-sm text-blue-800">
                            We respect your privacy. We don't collect personal information unless you provide it. We use cookies and
                            Google AdSense for advertising. Your wheel configurations are stored locally in your browser. You can opt
                            out of personalized ads anytime through Google's settings.
                        </p>
                    </div>
                </article>

                {/* Footer Navigation */}
                <div className="mt-8 flex justify-between items-center">
                    <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Terms of Service →
                    </Link>
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
