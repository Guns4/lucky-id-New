'use client';

import React from 'react';

interface SEOContentProps {
    title: string;
    description: string;
    items: string[];
    lang?: string;
    category?: string;
}

/**
 * Dynamic SEO Content Component
 * 
 * Generates search-engine-friendly HTML content based on wheel metadata.
 * Uses the "Mad Libs" strategy to create unique, keyword-rich text for each wheel.
 * 
 * Benefits:
 * - Google can index the content (visual wheel alone is invisible to crawlers)
 * - Each page has unique, relevant text (no duplicate content penalties)
 * - Includes FAQ schema for rich snippets
 * - Multilingual support (en/id)
 */
export default function SEOContent({
    title,
    description,
    items,
    lang = 'en',
    category = 'decision'
}: SEOContentProps) {
    // Get top 10 items for list (or fewer if less available)
    const topItems = items.slice(0, 10);

    // Language-specific content
    const content = {
        en: {
            intro: `Looking for the best **${title}** generator? LuckyGen is the ultimate free tool to help you decide quickly and fairly. Simply spin the wheel and let fate choose! Whether you're picking ${category === 'food' ? 'what to eat' : category === 'game' ? 'a game to play' : 'an option'}, our random selector removes the stress of decision-making.`,
            howToTitle: `How to Use This ${title} Wheel`,
            howToSteps: [
                `Review the pre-loaded options in your ${title} wheel`,
                'Click "Edit" to add, remove, or customize the choices',
                'Hit the colorful "SPIN" button in the center',
                'Watch the wheel spin and wait for it to stop',
                'The selected option will be highlighted with a celebration!',
                'Use "Elimination Mode" to remove winners and spin again'
            ],
            itemsTitle: `Popular Options in This ${title} Picker`,
            whyTitle: `Why Use LuckyGen for ${category}?`,
            whyParagraph: getCategoryBenefit(category, lang),
            faqTitle: 'Frequently Asked Questions',
            faqs: [
                {
                    question: `Is this ${title} wheel completely free?`,
                    answer: 'Yes! LuckyGen is 100% free to use with no registration required. All features including custom wheels, themes, and elimination mode are available at no cost.'
                },
                {
                    question: 'Can I customize the options on the wheel?',
                    answer: 'Absolutely! Click the "Edit" tab in the control panel to add, remove, or modify any options. You can create a completely custom wheel tailored to your needs.'
                },
                {
                    question: 'Can I save my custom wheel?',
                    answer: 'Yes! After customizing your wheel, use the "Share" button to generate a unique URL. Bookmark or share this link to access your custom wheel anytime.'
                },
                {
                    question: 'Is the wheel result truly random?',
                    answer: 'Yes! Our wheel uses a cryptographically secure random number generator to ensure completely fair and unbiased results every time you spin.'
                }
            ],
            footer: `Start spinning your ${title} wheel now and make decisions effortlessly!`
        },
        id: {
            intro: `Mencari generator **${title}** terbaik? LuckyGen adalah alat gratis terbaik untuk membantu Anda memutuskan dengan cepat dan adil. Cukup putar roda dan biarkan nasib memilih! Baik Anda memilih ${category === 'food' ? 'apa yang akan dimakan' : category === 'game' ? 'game untuk dimainkan' : 'sebuah pilihan'}, pemilih acak kami menghilangkan stres pengambilan keputusan.`,
            howToTitle: `Cara Menggunakan Roda ${title} Ini`,
            howToSteps: [
                `Tinjau opsi yang sudah dimuat di roda ${title} Anda`,
                'Klik "Edit" untuk menambah, menghapus, atau menyesuaikan pilihan',
                'Tekan tombol "PUTAR" yang berwarna di tengah',
                'Lihat roda berputar dan tunggu sampai berhenti',
                'Opsi yang dipilih akan ditampilkan dengan perayaan!',
                'Gunakan "Mode Eliminasi" untuk menghapus pemenang dan putar lagi'
            ],
            itemsTitle: `Opsi Populer di Pemilih ${title} Ini`,
            whyTitle: `Mengapa Menggunakan LuckyGen untuk ${category}?`,
            whyParagraph: getCategoryBenefit(category, lang),
            faqTitle: 'Pertanyaan yang Sering Diajukan',
            faqs: [
                {
                    question: `Apakah roda ${title} ini benar-benar gratis?`,
                    answer: 'Ya! LuckyGen 100% gratis digunakan tanpa perlu registrasi. Semua fitur termasuk roda kustom, tema, dan mode eliminasi tersedia tanpa biaya.'
                },
                {
                    question: 'Bisakah saya menyesuaikan opsi di roda?',
                    answer: 'Tentu saja! Klik tab "Edit" di panel kontrol untuk menambah, menghapus, atau memodifikasi opsi apapun. Anda dapat membuat roda yang sepenuhnya disesuaikan dengan kebutuhan Anda.'
                },
                {
                    question: 'Bisakah saya menyimpan roda kustom saya?',
                    answer: 'Ya! Setelah menyesuaikan roda Anda, gunakan tombol "Bagikan" untuk menghasilkan URL unik. Tandai atau bagikan tautan ini untuk mengakses roda kustom Anda kapan saja.'
                },
                {
                    question: 'Apakah hasil roda benar-benar acak?',
                    answer: 'Ya! Roda kami menggunakan generator angka acak yang aman secara kriptografis untuk memastikan hasil yang sepenuhnya adil dan tidak bias setiap kali Anda berputar.'
                }
            ],
            footer: `Mulai putar roda ${title} Anda sekarang dan buat keputusan dengan mudah!`
        }
    };

    const t = content[lang as keyof typeof content] || content.en;

    return (
        <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate lg:prose-lg prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-purple-600 prose-strong:text-purple-700">
            {/* Main Heading - Matches Wheel Title */}
            <h1 className="text-center mb-6">{title}</h1>

            {/* Meta Description as Intro */}
            {description && (
                <p className="lead text-lg text-gray-700 text-center mb-8">
                    {description}
                </p>
            )}

            {/* SEO-Rich Intro Paragraph */}
            <p className="text-gray-800 leading-relaxed">
                {t.intro}
            </p>

            {/* How to Use Section */}
            <h2 className="mt-10 mb-4">{t.howToTitle}</h2>
            <ol className="space-y-2 text-gray-700">
                {t.howToSteps.map((step, index) => (
                    <li key={index} className="leading-relaxed">{step}</li>
                ))}
            </ol>

            {/* Popular Items List (Google loves lists!) */}
            {topItems.length > 0 && (
                <>
                    <h2 className="mt-10 mb-4">{t.itemsTitle}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                        {topItems.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="text-purple-500 font-bold">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Why Use Section */}
            <h2 className="mt-10 mb-4">{t.whyTitle}</h2>
            <p className="text-gray-800 leading-relaxed">
                {t.whyParagraph}
            </p>

            {/* Benefits List */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg">
                <h3 className="text-xl font-bold text-purple-900 mb-3">
                    {lang === 'id' ? 'Keuntungan Utama' : 'Key Benefits'}
                </h3>
                <ul className="space-y-2 text-purple-800">
                    <li>⚡ {lang === 'id' ? 'Hasil instan - tidak perlu ragu-ragu' : 'Instant results - no more hesitation'}</li>
                    <li>🎨 {lang === 'id' ? 'Tema dan mode yang dapat disesuaikan' : 'Customizable themes and modes'}</li>
                    <li>🔊 {lang === 'id' ? 'Efek suara dan umpan balik haptik' : 'Sound effects and haptic feedback'}</li>
                    <li>📱 {lang === 'id' ? 'Bekerja sempurna di ponsel dan desktop' : 'Works perfectly on mobile and desktop'}</li>
                    <li>💾 {lang === 'id' ? 'Simpan dan bagikan roda kustom Anda' : 'Save and share your custom wheels'}</li>
                </ul>
            </div>

            {/* FAQ Section (Schema-Friendly for Rich Snippets) */}
            <h2 className="mt-12 mb-6">{t.faqTitle}</h2>
            <div className="space-y-6">
                {t.faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        itemScope
                        itemType="https://schema.org/Question"
                    >
                        <h3
                            className="text-lg font-semibold text-gray-900 mb-2"
                            itemProp="name"
                        >
                            {faq.question}
                        </h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                            <p className="text-gray-700 leading-relaxed" itemProp="text">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action Footer */}
            <div className="mt-12 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg">
                <p className="text-xl font-bold mb-2">
                    {t.footer}
                </p>
                <p className="text-purple-100 text-sm">
                    {lang === 'id'
                        ? 'Gratis selamanya. Tanpa registrasi diperlukan.'
                        : 'Free forever. No registration required.'}
                </p>
            </div>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: t.faqs.map(faq => ({
                            '@type': 'Question',
                            name: faq.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: faq.answer
                            }
                        }))
                    })
                }}
            />
        </article>
    );
}

/**
 * Generate category-specific benefit text
 */
function getCategoryBenefit(category: string, lang: string): string {
    const benefits: Record<string, Record<string, string>> = {
        food: {
            en: "Can't decide what to eat? You're not alone. Food decision fatigue is real! Our food wheel eliminates the endless \"what should we have for dinner?\" debate. Simply add your favorite restaurants, cuisines, or meal ideas, spin the wheel, and let randomness guide your taste buds. Perfect for couples, families, or groups who can never agree on where to eat. No more analysis paralysis – just delicious decisions!",
            id: "Tidak bisa memutuskan apa yang akan dimakan? Anda tidak sendirian. Kelelahan keputusan makanan itu nyata! Roda makanan kami menghilangkan perdebatan tanpa akhir \"apa yang harus kita makan untuk makan malam?\". Cukup tambahkan restoran favorit, masakan, atau ide makanan Anda, putar roda, dan biarkan keacakan memandu selera Anda. Sempurna untuk pasangan, keluarga, atau kelompok yang tidak pernah setuju di mana harus makan. Tidak ada lagi kelumpuhan analisis – hanya keputusan yang lezat!"
        },
        game: {
            en: "With thousands of games available, choosing what to play next can be overwhelming. Our game picker wheel solves this problem instantly. Add your Steam library, favorite board games, or video game backlog to the wheel and let it decide. Whether you're streaming on Twitch, hosting a game night, or just bored, this random game selector ensures everyone gets a fair shot at picking. No more scrolling through endless libraries – spin and play!",
            id: "Dengan ribuan game yang tersedia, memilih apa yang akan dimainkan selanjutnya bisa sangat membingungkan. Roda pemilih game kami menyelesaikan masalah ini secara instan. Tambahkan pustaka Steam Anda, permainan papan favorit, atau backlog video game ke roda dan biarkan itu memutuskan. Baik Anda streaming di Twitch, mengadakan malam permainan, atau hanya bosan, pemilih game acak ini memastikan semua orang mendapat kesempatan yang adil untuk memilih. Tidak perlu lagi menggulir pustaka yang tak ada habisnya – putar dan mainkan!"
        },
        movie: {
            en: "Netflix has thousands of titles, yet we spend 30 minutes scrolling without watching anything. Sound familiar? Our movie wheel cuts through decision paralysis. Add your watchlist, favorite genres, or streaming service catalogs to the wheel. Perfect for movie nights with friends, date nights, or solo viewing sessions. The random selector ensures everyone's preferences get equal consideration, and you'll actually start watching something within seconds instead of scrolling for hours.",
            id: "Netflix memiliki ribuan judul, namun kita menghabiskan 30 menit menggulir tanpa menonton apa pun. Terdengar familiar? Roda film kami memotong kelumpuhan keputusan. Tambahkan daftar tonton Anda, genre favorit, atau katalog layanan streaming ke roda. Sempurna untuk malam film dengan teman, malam kencan, atau sesi menonton solo. Pemilih acak memastikan preferensi setiap orang mendapat pertimbangan yang sama, dan Anda akan benar-benar mulai menonton sesuatu dalam hitungan detik alih-alih menggulir selama berjam-jam."
        },
        name: {
            en: "Naming things is notoriously difficult, whether it's a baby, pet, business, or game character. Our name picker wheel brings fun and fairness to the naming process. Add your shortlist of favorite names, spin the wheel, and let fate decide. Great for expectant parents who can't agree, D&D players creating characters, or entrepreneurs brainstorming business names. The random selection removes bias and often leads to surprisingly perfect choices you might have overlooked.",
            id: "Memberi nama pada sesuatu sangat sulit, baik itu bayi, hewan peliharaan, bisnis, atau karakter game. Roda pemilih nama kami membawa kesenangan dan keadilan ke proses penamaan. Tambahkan daftar pendek nama favorit Anda, putar roda, dan biarkan nasib memutuskan. Bagus untuk calon orang tua yang tidak bisa setuju, pemain D&D yang membuat karakter, atau pengusaha yang melakukan brainstorming nama bisnis. Pemilihan acak menghilangkan bias dan sering mengarah pada pilihan yang sempurna mengejutkan yang mungkin telah Anda abaikan."
        },
        decision: {
            en: "Every day, we make hundreds of small decisions that drain our mental energy. Should I work on Project A or B? Which task should I tackle first? Where should we go this weekend? Our decision wheel eliminates choice paralysis. Add your options, spin, and move forward confidently. It's perfect for morning routines, productivity hacks, or group activities. The random selection removes overthinking and often leads to better outcomes than agonizing over the \"perfect\" choice for hours.",
            id: "Setiap hari, kita membuat ratusan keputusan kecil yang menguras energi mental kita. Haruskah saya bekerja pada Proyek A atau B? Tugas mana yang harus saya tangani terlebih dahulu? Ke mana kita harus pergi akhir pekan ini? Roda keputusan kami menghilangkan kelumpuhan pilihan. Tambahkan opsi Anda, putar, dan bergerak maju dengan percaya diri. Ini sempurna untuk rutinitas pagi, peretasan produktivitas, atau aktivitas kelompok. Pemilihan acak menghilangkan overthinking dan sering mengarah pada hasil yang lebih baik daripada menderita memilih pilihan \"sempurna\" selama berjam-jam."
        }
    };

    const categoryLower = category.toLowerCase();
    return benefits[categoryLower]?.[lang] || benefits.decision[lang];
}
