"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SlotCounter } from "@/components/SlotCounter";
import { generateLuckyID, generateDepositAmount } from "@/lib/generators";

export default function Home() {
  const [username, setUsername] = useState("");
  const [generatedID, setGeneratedID] = useState("LUCKY-????-????");
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  // We need a trigger state for animations that toggles every generation
  const [genTrigger, setGenTrigger] = useState(false);
  const [copiedID, setCopiedID] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenTrigger(true);
    setCopiedID(false);
    setCopiedAmount(false);

    // Calculate luck immediately
    const newID = generateLuckyID();
    const newAmount = generateDepositAmount();

    setGeneratedID(newID);
    setDepositAmount(newAmount);

    // Reset loading state after animation duration
    setTimeout(() => {
      setIsGenerating(false);
      setGenTrigger(false);
    }, 2000);
  };

  const copyToClipboard = async (text: string, type: 'id' | 'amount') => {
    if (!text || text.includes('?')) return;
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

  // Improved trigger logic: toggle a boolean that SlotCounter listens to?
  // Actually SlotCounter needs to know when to START.
  // Let's pass a counter or timestamp as trigger to SlotCounter?
  // Our simple SlotCounter implementation watches 'trigger' boolean.
  // Let's refactor usage: We want to show random shuffling WHILE isGenerating is true.
  // And settle on the REAL value when isGenerating becomes false.
  // My previous SlotCounter logic was: on trigger, shuffle for duration, then set value.
  // Here we calculate value upfront but want to show it only after delay.

  // Let's slightly change the approach:
  // 1. We know the result immediately (or we could wait).
  // 2. Pass the result to SlotCounter.
  // 3. SlotCounter should animate to that result.

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black-900 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-[128px]" />
      </div>

      <main className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-gold-300 to-gold-600 bg-clip-text text-transparent drop-shadow-sm">
            LuckyID Generator
          </h1>
          <p className="text-gold-100/60 text-lg uppercase tracking-widest">
            Unlock Your Fortune
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* User Input Section */}
          <Card title="Player Details" className="h-full">
            <div className="space-y-6">
              <Input
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!username}
                >
                  Generate Lucky ID
                </Button>
              </div>
              <p className="text-xs text-gold-500/40 text-center">
                *Uses advanced RNG algorithms for maximum luck.
              </p>
            </div>
          </Card>

          {/* Results Section */}
          <Card title="Your Fortune" className="min-h-[300px] flex flex-col justify-center items-center text-center">
            <div className="space-y-8 w-full">
              <div className="space-y-2 group relative">
                <h3 className="text-sm font-medium text-gold-400/70 uppercase tracking-wider">
                  Generated ID
                </h3>
                <div
                  className="text-3xl font-mono font-bold text-gold-300 tracking-widest break-all drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] cursor-pointer hover:text-gold-100 transition-colors"
                  onClick={() => copyToClipboard(generatedID, 'id')}
                  title="Click to copy"
                >
                  <SlotCounter
                    value={generatedID}
                    trigger={genTrigger}
                    duration={2000}
                  />
                </div>
                {copiedID && <span className="absolute -right-2 top-0 text-xs text-emerald-400 animate-fade-in">Copied!</span>}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent" />

              <div className="space-y-2 relative">
                <h3 className="text-sm font-medium text-gold-400/70 uppercase tracking-wider">
                  Recommended Deposit
                </h3>
                <div
                  className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] cursor-pointer hover:text-emerald-200 transition-colors"
                  onClick={() => depositAmount && copyToClipboard(depositAmount.toString(), 'amount')}
                  title="Click to copy"
                >
                  {depositAmount ? (
                    <span>
                      $<SlotCounter
                        value={depositAmount.toString()}
                        trigger={genTrigger}
                        duration={2000}
                      />
                    </span>
                  ) : (
                    "--"
                  )}
                </div>
                {copiedAmount && <span className="absolute -right-2 top-0 text-xs text-emerald-400 animate-fade-in">Copied!</span>}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
