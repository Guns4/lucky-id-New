import { Card } from "@/components/ui/Card";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black-900 flex items-center justify-center p-4">
            <main className="z-10 w-full max-w-4xl space-y-8 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gold-300 to-gold-600 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-gold-100/60 uppercase tracking-widest text-sm">
                        Kebijakan Privasi
                    </p>
                </div>

                <Card title="Kebijakan Data Pengguna" className="prose prose-invert prose-gold max-w-none">
                    <div className="space-y-6 text-zinc-300 leading-relaxed p-4 text-sm md:text-base">
                        <h3 className="text-gold-400 font-bold text-lg">1. Pengumpulan Data</h3>
                        <p>
                            LuckyID Pro tidak mengumpulkan, menyimpan, atau membagikan data pribadi Anda ke server eksternal manapun.
                            Semua input (platform, username) diproses secara lokal di browser Anda (Client-Side) dan akan hilang saat Anda memuat ulang halaman.
                        </p>

                        <h3 className="text-gold-400 font-bold text-lg">2. Penyimpanan Lokal (LocalStorage)</h3>
                        <p>
                            Fitur "Riwayat" (History Log) menggunakan teknologi LocalStorage browser Anda untuk menyimpan 5 hasil terakhir demi kenyamanan Anda.
                            Data ini hanya tersimpan di perangkat Anda dan dapat dihapus kapan saja dengan menekan tombol "Clear History" atau menghapus cache browser.
                        </p>

                        <h3 className="text-gold-400 font-bold text-lg">3. Analitik & Cookies</h3>
                        <p>
                            Kami tidak menggunakan cookie pelacak pihak ketiga untuk tujuan iklan. Website ini murni berfungsi sebagai alat bantu (utility tool).
                        </p>

                        <h3 className="text-gold-400 font-bold text-lg">4. Perubahan Kebijakan</h3>
                        <p>
                            Kami berhak mengubah kebijakan privasi ini sewaktu-waktu. Penggunaan berkelanjutan atas layanan ini menandakan persetujuan Anda terhadap perubahan tersebut.
                        </p>

                        <p className="text-zinc-500 text-xs mt-8">Terakhir diperbarui: 20 Desember 2025</p>
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
