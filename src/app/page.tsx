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
  const [generatedIDs, setGeneratedIDs] = useState<SmartIDResult[]>([]);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genTrigger, setGenTrigger] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
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
    setCopiedIndex(null);
    setCopiedAmount(false);
    setGeneratedIDs([]); // Clear previous

    // Calculate luck and generate 3 options
    const results = [
      generateSmartID(platform, username),
      generateSmartID(platform, username),
      generateSmartID(platform, username)
    ];
    // Sort by tier rarity descending for better UX
    const tierOrder = { "LEGENDARY": 4, "MYTHIC": 3, "VIP": 2, "SUPER": 1, "COMMON": 0 };
    results.sort((a, b) => tierOrder[b.tier] - tierOrder[a.tier]);

    const amountResult = generateBeautifulDeposit(20000, budgetLimit);

    setGeneratedIDs(results);
    setDepositAmount(amountResult);

    // Reset loading state after animation duration
    setTimeout(() => {
      setIsGenerating(false);
      setGenTrigger(false);

      // Save best result to history
      saveHistory({
        id: results[0].id, // Save the highest tier one
        deposit: amountResult,
        tier: results[0].tier,
        timestamp: Date.now()
      });
    }, 2500);
  };

  const copyToClipboard = async (text: string, type: 'id' | 'amount', index?: number) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'id' && index !== undefined) {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
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
            {(generatedIDs.length > 0 || isGenerating) && (
              <div className="absolute top-4 right-4 flex flex-col items-end">
                <div className="text-xs text-gold-400/60 uppercase tracking-wider mb-1">Max Luck Score</div>
                <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                  {isGenerating ? (
                    <span className="animate-pulse">--</span>
                  ) : (
                    <span className={generatedIDs[0]?.luckScore > 90 ? "text-red-500" : "text-gold-300"}>
                      {generatedIDs[0]?.luckScore}%
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-10 py-8 w-full">

              {/* Generated IDs Block */}
              <div className="space-y-4 w-full">
                <h3 className="text-sm font-medium text-gold-400/70 uppercase tracking-wider mb-4">
                  Choose Your Identity
                </h3>

                {isGenerating || generatedIDs.length === 0 ? (
                  // Placeholder / Loading State
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-3xl md:text-4xl font-mono font-bold text-gold-300/50 tracking-widest">
                      <SlotCounter
                        value="----"
                        trigger={genTrigger}
                        duration={2000}
                      />
                    </div>
                  </div>
                ) : (
                  // 3 Result Options
                  <div className="flex flex-col gap-3 px-4">
                    {generatedIDs.map((result, idx) => (
                      <div
                        key={idx}
                        className="group relative w-full p-4 rounded-lg bg-black/40 border border-white/5 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all cursor-pointer flex items-center justify-between"
                        onClick={() => copyToClipboard(result.id, 'id', idx)}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] tracking-wider uppercase ${getTierBadgeColor(result.tier)}`}>
                              {result.tier}
                            </span>
                            <span className="text-xs text-emerald-400">{result.uniqueRate}% Unique</span>
                          </div>
                          <span className="text-xl md:text-2xl font-mono font-bold text-gold-100 tracking-wide group-hover:text-gold-400 transition-colors">
                            {result.id}
                          </span>
                        </div>

                        <div className="text-gold-500/50 group-hover:text-gold-400">
                          {copiedIndex === idx ? (
                            <span className="text-xs text-emerald-400 font-bold animate-fade-in">COPIED!</span>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
