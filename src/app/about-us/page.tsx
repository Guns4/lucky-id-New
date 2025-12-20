import { Card } from "@/components/ui/Card";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-black-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black-900 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-[128px]" />
            </div>

            <main className="z-10 w-full max-w-4xl space-y-8 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gold-300 to-gold-600 bg-clip-text text-transparent">
                        Tentang Kami
                    </h1>
                    <p className="text-gold-100/60 uppercase tracking-widest text-sm">
                        Filosofi Keberuntungan
                    </p>
                </div>

                <Card title="Visi & Misi" className="prose prose-invert prose-gold max-w-none">
                    <div className="space-y-6 text-zinc-300 leading-relaxed p-4">
                        <p>
                            Selamat datang di <strong>LuckyID Pro</strong>. Kami berdedikasi untuk memberikan sentuhan personal dan artistik dalam dunia gaming yang seringkali terasa acak.
                        </p>
                        <p>
                            Kami percaya bahwa sebuah ID bukan sekadar deretan karakter, melainkan identitas digital yang membawa energi positif bagi pemiliknya.
                            Dengan menggabungkan <em>algoritma modern</em> dan <em>estetika tradisional</em>, kami menciptakan nama-nama yang tidak hanya unik,
                            tetapi juga memiliki makna keberuntungan (Hoki).
                        </p>
                        <h3 className="text-gold-400 font-bold text-xl mt-6">Mengapa Memilih Kami?</h3>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                            <li><strong>Algoritma Cerdas:</strong> Sistem kami mempelajari pola nama yang populer dan estetik.</li>
                            <li><strong>Desain Premium:</strong> Antarmuka yang mewah untuk pengalaman pengguna terbaik.</li>
                            <li><strong>Privasi Terjamin:</strong> Kami tidak menyimpan data pribadi Anda di server kami.</li>
                        </ul>
                    </div>
                </Card>

                <div className="text-center">
                    <a href="/" className="text-sm text-gold-500 hover:text-gold-300 hover:underline transition-all">
                        &larr; Kembali ke Generator
                    </a>
                </div>
            </main>
        </div>
    );
}
