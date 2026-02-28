"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Shield,
  Repeat,
  DollarSign,
  TrendingDown,
  Percent,
  Zap,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import Toggle from "@/components/Toggle";

type MirrorMode = "exact" | "proportional" | "fixed";
type SlippageLevel = "low" | "med" | "high";

export default function TradeSettingsPage() {
  // Intelligence Filter state
  const [minTradeEnabled, setMinTradeEnabled] = useState(true);
  const [minTradeSize, setMinTradeSize] = useState("5000");
  const [liquidityGuard, setLiquidityGuard] = useState(true);
  const [minLiquidity, setMinLiquidity] = useState("100000");
  const [safetyCheck, setSafetyCheck] = useState(true);
  const [socialSentiment, setSocialSentiment] = useState(true);

  // Mirror Mode state
  const [mirrorMode, setMirrorMode] = useState<MirrorMode>("proportional");
  const [fixedAmount, setFixedAmount] = useState("100");
  const [proportionalPercent, setProportionalPercent] = useState("1");

  // Slippage state
  const [slippage, setSlippage] = useState<SlippageLevel>("med");

  // Exit Strategy state
  const [shadowSell, setShadowSell] = useState(true);
  const [trailingStop, setTrailingStop] = useState(true);
  const [trailingStopPercent, setTrailingStopPercent] = useState("15");
  const [takeProfit, setTakeProfit] = useState(true);
  const [takeProfitMultiplier, setTakeProfitMultiplier] = useState("2");
  const [takeProfitSellPercent, setTakeProfitSellPercent] = useState("50");

  // MEV Protection
  const [mevProtection, setMevProtection] = useState(true);

  const mirrorModes: {
    key: MirrorMode;
    label: string;
    desc: string;
    icon: typeof DollarSign;
  }[] = [
    {
      key: "exact",
      label: "Exact Match",
      desc: "If they buy $10K, you buy $10K",
      icon: DollarSign,
    },
    {
      key: "proportional",
      label: "Proportional",
      desc: "Match their % of portfolio",
      icon: Percent,
    },
    {
      key: "fixed",
      label: "Fixed Amount",
      desc: "Always spend a set amount",
      icon: Lock,
    },
  ];

  const slippageLevels: { key: SlippageLevel; label: string; value: string }[] =
    [
      { key: "low", label: "Low", value: "0.5%" },
      { key: "med", label: "Medium", value: "1.0%" },
      { key: "high", label: "High", value: "3.0%" },
    ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Trade Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure how the agent filters, mirrors, and exits trades
        </p>
      </div>

      {/* ========== INTELLIGENCE FILTER ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Intelligence Filter
            </h2>
            <p className="text-xs text-gray-500">
              Don&apos;t copy every trade — only the smart ones
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Min Trade Size */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={minTradeEnabled}
              onToggle={setMinTradeEnabled}
              label="Minimum Trade Size"
              description="Only copy if the whale spends more than this amount"
            />
            {minTradeEnabled && (
              <div className="mt-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={minTradeSize}
                  onChange={(e) => setMinTradeSize(e.target.value)}
                  className="input-field w-40 text-sm"
                  placeholder="5000"
                />
                <span className="text-xs text-gray-500">USD minimum</span>
              </div>
            )}
          </div>

          {/* Liquidity Guard */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={liquidityGuard}
              onToggle={setLiquidityGuard}
              label="Liquidity Guard"
              description="Skip tokens with low liquidity pools to prevent rug-pulls"
            />
            {liquidityGuard && (
              <div className="mt-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={minLiquidity}
                  onChange={(e) => setMinLiquidity(e.target.value)}
                  className="input-field w-40 text-sm"
                  placeholder="100000"
                />
                <span className="text-xs text-gray-500">
                  Minimum pool liquidity
                </span>
              </div>
            )}
          </div>

          {/* Safety Check */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={safetyCheck}
              onToggle={setSafetyCheck}
              label="Contract Verification"
              description="Only buy tokens verified on Etherscan or BaseScan"
            />
            {safetyCheck && (
              <div className="mt-2 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
                <span className="text-xs text-accent-green">
                  Green checkmark required on block explorer
                </span>
              </div>
            )}
          </div>

          {/* Social Sentiment */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={socialSentiment}
              onToggle={setSocialSentiment}
              label="AI Social Sentiment Check"
              description='The agent checks social media — if a token is called a "scam," it skips the trade'
            />
          </div>
        </div>
      </div>

      {/* ========== MIRROR MODE ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
            <Repeat className="w-5 h-5 text-accent-purple" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Mirror Mode</h2>
            <p className="text-xs text-gray-500">
              Choose how to size your mirrored trades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {mirrorModes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => setMirrorMode(mode.key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                mirrorMode === mode.key
                  ? "border-accent-purple/50 bg-accent-purple/5"
                  : "border-dark-500/50 bg-dark-800/30 hover:border-dark-500"
              }`}
            >
              <mode.icon
                className={`w-5 h-5 mb-2 ${
                  mirrorMode === mode.key
                    ? "text-accent-purple"
                    : "text-gray-500"
                }`}
              />
              <p
                className={`text-sm font-semibold ${
                  mirrorMode === mode.key ? "text-gray-100" : "text-gray-300"
                }`}
              >
                {mode.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{mode.desc}</p>
            </button>
          ))}
        </div>

        {/* Conditional Inputs */}
        {mirrorMode === "fixed" && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={fixedAmount}
              onChange={(e) => setFixedAmount(e.target.value)}
              className="input-field w-40 text-sm"
              placeholder="100"
            />
            <span className="text-xs text-gray-500">
              per trade, regardless of whale&apos;s amount
            </span>
          </div>
        )}
        {mirrorMode === "proportional" && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Percent className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={proportionalPercent}
              onChange={(e) => setProportionalPercent(e.target.value)}
              className="input-field w-24 text-sm"
              placeholder="1"
            />
            <span className="text-xs text-gray-500">
              % of your wallet per trade (matching their allocation %)
            </span>
          </div>
        )}
      </div>

      {/* ========== SLIPPAGE CONTROL ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-accent-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Slippage Control
            </h2>
            <p className="text-xs text-gray-500">
              Maximum price deviation you&apos;ll accept on a trade
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {slippageLevels.map((level) => (
            <button
              key={level.key}
              onClick={() => setSlippage(level.key)}
              className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                slippage === level.key
                  ? "border-accent-yellow/50 bg-accent-yellow/5"
                  : "border-dark-500/50 bg-dark-800/30 hover:border-dark-500"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  slippage === level.key ? "text-accent-yellow" : "text-gray-300"
                }`}
              >
                {level.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{level.label}</p>
            </button>
          ))}
        </div>

        {/* MEV Protection */}
        <div className="mt-4 p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
          <Toggle
            enabled={mevProtection}
            onToggle={setMevProtection}
            label="MEV Protection"
            description="Use private transaction routes so frontrunning bots can't steal your profit"
          />
          {mevProtection && (
            <div className="mt-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent-green" />
              <span className="text-xs text-accent-green">
                Flashbots Protect / Private mempool enabled
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ========== AUTOMATIC EXIT ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-accent-red" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Automatic Exit Strategy
            </h2>
            <p className="text-xs text-gray-500">
              Know when to sell — the hardest part of trading, automated
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Shadow Sell */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={shadowSell}
              onToggle={setShadowSell}
              label="Shadow Sell"
              description="Sell exactly when the whale sells their position"
            />
          </div>

          {/* Trailing Stop-Loss */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={trailingStop}
              onToggle={setTrailingStop}
              label="Trailing Stop-Loss"
              description="Auto-sell if the price drops from the peak by a percentage"
            />
            {trailingStop && (
              <div className="mt-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-accent-red" />
                <input
                  type="text"
                  value={trailingStopPercent}
                  onChange={(e) => setTrailingStopPercent(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                />
                <span className="text-xs text-gray-500">
                  % drop from peak triggers sell
                </span>
              </div>
            )}
          </div>

          {/* Take Profit */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={takeProfit}
              onToggle={setTakeProfit}
              label="Take Profit"
              description="Automatically sell a portion when your target is hit"
            />
            {takeProfit && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-green" />
                  <span className="text-xs text-gray-400">Sell</span>
                  <input
                    type="text"
                    value={takeProfitSellPercent}
                    onChange={(e) => setTakeProfitSellPercent(e.target.value)}
                    className="input-field w-20 text-sm text-center"
                  />
                  <span className="text-xs text-gray-400">
                    % of position at
                  </span>
                  <input
                    type="text"
                    value={takeProfitMultiplier}
                    onChange={(e) => setTakeProfitMultiplier(e.target.value)}
                    className="input-field w-16 text-sm text-center"
                  />
                  <span className="text-xs text-gray-400">x profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    Example: Sell {takeProfitSellPercent}% when you hit{" "}
                    {takeProfitMultiplier}x your entry
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="btn-secondary">Reset to Defaults</button>
        <button className="btn-primary">
          <CheckCircle2 className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
