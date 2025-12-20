import { Card } from "@/components/ui/Card";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black-900 flex items-center justify-center p-4">
            <main className="z-10 w-full max-w-4xl space-y-8 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gold-300 to-gold-600 bg-clip-text text-transparent">
                        Terms of Service
                    </h1>
                    <p className="text-gold-100/60 uppercase tracking-widest text-sm">
                        Syarat & Ketentuan
                    </p>
                </div>

                <Card title="Penyangkalan Hukum" className="prose prose-invert prose-gold max-w-none">
                    <div className="space-y-6 text-zinc-300 leading-relaxed p-4 text-sm md:text-base">
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-200 text-sm mb-6">
                            <strong>PERINGATAN KERAS:</strong> Website ini dibuat HANYA untuk tujuan hiburan (entertainment purposes only).
                        </div>

                        <h3 className="text-gold-400 font-bold text-lg">1. Tujuan Penggunaan</h3>
                        <p>
                            LuckyID Pro adalah generator nama dan angka acak. Kami TIDAK berafiliasi, bekerjasama, atau mempromosikan situs perjudian,
                            game online ilegal, atau aktivitas melanggar hukum lainnya.
                        </p>

                        <h3 className="text-gold-400 font-bold text-lg">2. Tidak Ada Jaminan</h3>
                        <p>
                            Istilah "Hoki", "Lucky", "Gacor", atau "Win" yang digunakan dalam website ini hanyalah elemen estetik dan gimmick visual.
                            Kami TIDAK MENJAMIN bahwa penggunaan ID atau angka yang dihasilkan akan memberikan kemenangan, keuntungan, atau hasil positif dalam permainan apapun.
                        </p>

                        <h3 className="text-gold-400 font-bold text-lg">3. Tanggung Jawab Pengguna</h3>
                        <p>
                            Pengguna bertanggung jawab penuh atas penggunaan nama atau angka yang dihasilkan oleh alat ini.
                            Kami tidak bertanggung jawab atas kerugian materiil atau non-materiil yang timbul dari penggunaan informasi di website ini.
                        </p>

                        <h3 className="text-gold-400 font-bold text-lg">4. Hak Kekayaan Intelektual</h3>
                        <p>
                            Desain, kode, dan konten website ini dilindungi oleh hak cipta. Dilarang menyalin atau menduplikasi tanpa izin tertulis.
                        </p>
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
