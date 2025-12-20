"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { SlotCounter } from "@/components/SlotCounter";
import { HistoryLog, HistoryItem } from "@/components/HistoryLog";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import {
  generateSmartID,
  generateBeautifulDeposit,
  Tier,
  SmartIDResult
} from "@/lib/generators";

export default function Home() {
  // Input State
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("");
  const [budgetLimit, setBudgetLimit] = useState(500000); // Max budget

  // Result State
  const [generatedID, setGeneratedID] = useState<SmartIDResult | null>(null);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genTrigger, setGenTrigger] = useState(false);
  const [copiedID, setCopiedID] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("luckyHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history].slice(0, 5); // Keep last 5
    setHistory(newHistory);
    localStorage.setItem("luckyHistory", JSON.stringify(newHistory));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenTrigger(true);
    setCopiedID(false);
    setCopiedAmount(false);

    // Calculate luck immediately
    const idResult = generateSmartID(platform, username);
    const amountResult = generateBeautifulDeposit(20000, budgetLimit);

    setGeneratedID(idResult);
    setDepositAmount(amountResult);

    // Reset loading state after animation duration
    setTimeout(() => {
      setIsGenerating(false);
      setGenTrigger(false);

      // Save to history after generation is "complete" (visual effect)
      saveHistory({
        id: idResult.id,
        deposit: amountResult,
        tier: idResult.tier,
        timestamp: Date.now()
      });
    }, 2500); // Slightly longer for dramatic effect
  };

  const copyToClipboard = async (text: string, type: 'id' | 'amount') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'id') {
        setCopiedID(true);
        setTimeout(() => setCopiedID(false), 2000);
      } else {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const getTierBadgeColor = (tier: Tier) => {
    switch (tier) {
      case "LEGENDARY": return "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.6)]";
      case "MYTHIC": return "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]";
      case "VIP": return "bg-gold-500 text-black font-bold";
      case "SUPER": return "bg-blue-500 text-white";
      default: return "bg-zinc-700 text-zinc-300";
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black-900 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-[128px]" />
      </div>

      <main className="z-10 w-full max-w-5xl flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-gold-300 to-gold-600 bg-clip-text text-transparent drop-shadow-sm">
            LuckyID Pro
          </h1>
          <p className="text-gold-100/60 text-lg uppercase tracking-widest">
            Advanced Generator System
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 w-full">
          {/* User Input Section */}
          <Card title="Configuration" className="h-full">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Platform Name"
                  placeholder="e.g. Zeus88"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                />
                <Input
                  label="Username"
                  placeholder="Preferred user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Slider
                  label="Max Deposit Budget"
                  min={50000}
                  max={10000000}
                  step={50000}
                  initialValue={budgetLimit}
                  onChange={setBudgetLimit}
                  formatValue={(v) => `IDR ${v.toLocaleString()}`}
                />
                <p className="text-xs text-gold-500/40 mt-2">
                  *The generator will optimize for beautiful numbers within this range.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!username || !platform}
                >
                  Generate Luck
                </Button>
              </div>
            </div>

            <HistoryLog items={history} onClear={() => {
              setHistory([]);
              localStorage.removeItem("luckyHistory");
            }} />
          </Card>

          {/* Results Section */}
          <Card title="Generation Result" className="min-h-[400px] flex flex-col relative">
            {/* Luck Meter Overlay */}
            {(generatedID || isGenerating) && (
              <div className="absolute top-4 right-4 flex flex-col items-end">
                <div className="text-xs text-gold-400/60 uppercase tracking-wider mb-1">Luck Score</div>
                <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                  {isGenerating ? (
                    <span className="animate-pulse">--</span>
                  ) : (
                    <span className={generatedID?.luckScore && generatedID.luckScore > 90 ? "text-red-500" : "text-gold-300"}>
                      {generatedID?.luckScore}%
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-10 py-8">

              {/* Generated ID Block */}
              <div className="space-y-3 group relative w-full">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-sm font-medium text-gold-400/70 uppercase tracking-wider">
                    Smart ID
                  </h3>
                  {!isGenerating && generatedID?.tier && (
                    <span className={`px-2 py-0.5 rounded text-[10px] tracking-wider uppercase ${getTierBadgeColor(generatedID.tier)}`}>
                      {generatedID.tier}
                    </span>
                  )}
                </div>

                <div
                  className="text-3xl md:text-4xl font-mono font-bold text-gold-300 tracking-widest break-all drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] cursor-pointer hover:text-gold-100 transition-colors"
                  onClick={() => generatedID && copyToClipboard(generatedID.id, 'id')}
                  title="Click to copy"
                >
                  <SlotCounter
                    value={generatedID?.id || "----"}
                    trigger={genTrigger}
                    duration={2000}
                  />
                </div>

                {/* Unique Rate Indicator */}
                {!isGenerating && generatedID && (
                  <div className="flex justify-center gap-4 text-xs mt-2">
                    <span className="text-zinc-500">Unique Rate: <span className="text-emerald-400">{generatedID.uniqueRate}%</span></span>
                    <span className="text-zinc-500">Tags: <span className="text-gold-500/60">{generatedID.tags.join(", ")}</span></span>
                  </div>
                )}

                {copiedID && <span className="absolute right-0 top-0 text-xs text-emerald-400 animate-fade-in bg-black/50 px-2 py-1 rounded">Copied!</span>}
              </div>

              <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-gold-600/20 to-transparent" />

              {/* Deposit Block */}
              <div className="space-y-3 relative w-full">
                <h3 className="text-sm font-medium text-gold-400/70 uppercase tracking-wider">
                  Prosperous Deposit
                </h3>
                <div
                  className="text-4xl md:text-5xl font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)] cursor-pointer hover:text-emerald-200 transition-colors"
                  onClick={() => depositAmount && copyToClipboard(depositAmount.toString(), 'amount')}
                  title="Click to copy"
                >
                  {depositAmount || isGenerating ? (
                    <span>
                      Rp <SlotCounter
                        value={depositAmount?.toLocaleString() || "0"}
                        trigger={genTrigger}
                        duration={2000}
                      />
                    </span>
                  ) : (
                    <span className="text-zinc-600">--</span>
                  )}
                </div>
                {copiedAmount && <span className="absolute right-0 top-0 text-xs text-emerald-400 animate-fade-in bg-black/50 px-2 py-1 rounded">Copied!</span>}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center pb-4">
              <p className="text-[10px] text-zinc-600">
                *Results are generated using advanced algorithms for entertainment purposes.
              </p>
            </div>
          </Card>
        </div>

        {/* Tips & Insights Section */}
        <div className="w-full max-w-4xl space-y-8 pt-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gold-400 text-xl">💡</span>
            <h2 className="text-xl font-bold text-white">Tips & Wawasan</h2>
          </div>

          <Accordion>
            <AccordionItem title="Mengapa angka 8 dianggap hoki?">
              Dalam budaya Tionghoa, angka 8 (ba) terdengar mirip dengan kata "fa" yang berarti kekayaan atau kemakmuran. Bentuknya yang simetris juga melambangkan keseimbangan yang sempurna.
            </AccordionItem>
            <AccordionItem title="Nominal deposit yang terlihat natural">
              Hindari deposit bulat sempurna seperti 50.000. Sistem pemantauan seringkali lebih lunak terhadap angka organik seperti 50.123 atau 50.888 karena terlihat seperti transaksi manual yang wajar.
            </AccordionItem>
            <AccordionItem title="Pola ID yang mudah diingat">
              Kombinasi 4 huruf + 4 angka (misal: ZEUS-8888) adalah yang paling mudah diingat oleh otak manusia sekaligus terlihat eksklusif di papan peringkat (leaderboard).
            </AccordionItem>
          </Accordion>

          {/* Important Notice */}
          <div className="w-full p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 flex gap-4 shadow-lg">
            <div className="text-gold-500 text-2xl flex-shrink-0">
              🛡️
            </div>
            <div>
              <h3 className="text-gold-100 font-bold mb-2">Pemberitahuan Penting</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Website ini hanya alat generator angka dan tidak berafiliasi dengan situs judi atau game manapun.
                Angka yang dihasilkan tidak menjamin hasil permainan apapun. Gunakan dengan bijak dan bertanggung jawab.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 text-center border-t border-white/5 mt-12">
          <div className="flex justify-center gap-6 text-sm text-zinc-500 mb-4">
            <a href="/privacy-policy" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="/about-us" className="hover:text-gold-400 transition-colors">About Us</a>
            <a href="/contact" className="hover:text-gold-400 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-zinc-700">
            © 2025 LuckyGen — Lucky Number Generator
          </p>
        </footer>
      </main>
    </div>
  );
}
