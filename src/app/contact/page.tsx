"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Contact() {
    return (
        <div className="min-h-screen bg-black-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black-900 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[128px]" />
            </div>

            <main className="z-10 w-full max-w-3xl space-y-8 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gold-300 to-gold-600 bg-clip-text text-transparent">
                        Hubungi Kami
                    </h1>
                    <p className="text-gold-100/60 uppercase tracking-widest text-sm">
                        Kami Siap Membantu
                    </p>
                </div>

                <Card title="Kirim Pesan" className="p-6">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Nama Lengkap" placeholder="Nama Anda" />
                            <Input label="Email" type="email" placeholder="email@contoh.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gold-400/80 uppercase tracking-wider ml-1">
                                Pesan
                            </label>
                            <textarea
                                className="w-full bg-black/40 border border-gold-500/20 rounded-lg p-3 text-gold-100 placeholder-zinc-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all h-32 resize-none"
                                placeholder="Tuliskan pertanyaan atau masukan Anda..."
                            ></textarea>
                        </div>

                        <Button className="w-full">Kirim Pesan</Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center space-y-2 text-zinc-400 text-sm">
                        <p>Atau hubungi kami langsung melalui email:</p>
                        <a href="mailto:support@luckyid.pro" className="text-gold-400 font-bold hover:text-white transition-colors">
                            support@luckyid.pro
                        </a>
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
