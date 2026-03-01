"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Shield,
  Repeat,
  TrendingDown,
  Percent,
  Zap,
  Lock,
  CheckCircle2,
  Info,
  Rocket,
  Users,
  Skull,
  BarChart3,
  Snowflake,
  Coins,
  Package,
  Clock,
  GraduationCap,
} from "lucide-react";
import Toggle from "@/components/Toggle";

type MirrorMode = "exact" | "proportional" | "fixed";
type SlippageLevel = "low" | "med" | "high";

export default function TradeSettingsPage() {
  // Pump.fun Filter state
  const [minMcapEnabled, setMinMcapEnabled] = useState(true);
  const [minMcap, setMinMcap] = useState("3000");
  const [maxMcapEnabled, setMaxMcapEnabled] = useState(true);
  const [maxMcap, setMaxMcap] = useState("500000");
  const [bondingCurveFilter, setBondingCurveFilter] = useState(true);
  const [minBondingPercent, setMinBondingPercent] = useState("5");
  const [maxBondingPercent, setMaxBondingPercent] = useState("95");
  const [maxDevHolding, setMaxDevHolding] = useState(true);
  const [maxDevHoldingPercent, setMaxDevHoldingPercent] = useState("5");
  const [devSoldAutoSkip, setDevSoldAutoSkip] = useState(true);
  const [bundleDetection, setBundleDetection] = useState(true);
  const [minBuyersEnabled, setMinBuyersEnabled] = useState(true);
  const [minBuyers, setMinBuyers] = useState("10");
  const [creatorRugFilter, setCreatorRugFilter] = useState(true);
  const [creatorRugMax, setCreatorRugMax] = useState("2");
  const [freezeAuthorityCheck, setFreezeAuthorityCheck] = useState(true);
  const [mintAuthorityCheck, setMintAuthorityCheck] = useState(true);
  const [topHolderConcentration, setTopHolderConcentration] = useState(true);
  const [topHolderMax, setTopHolderMax] = useState("60");
  const [tokenAgeFilter, setTokenAgeFilter] = useState(true);
  const [minTokenAge, setMinTokenAge] = useState("1");
  const [maxTokenAge, setMaxTokenAge] = useState("120");

  // Mirror Mode state
  const [mirrorMode, setMirrorMode] = useState<MirrorMode>("fixed");
  const [fixedAmount, setFixedAmount] = useState("5");
  const [proportionalPercent, setProportionalPercent] = useState("1");

  // Slippage state
  const [slippage, setSlippage] = useState<SlippageLevel>("high");

  // Jito Tips
  const [jitoTips, setJitoTips] = useState(true);

  // Exit Strategy state
  const [shadowSell, setShadowSell] = useState(true);
  const [autoSellDevSell, setAutoSellDevSell] = useState(true);
  const [autoSellGraduation, setAutoSellGraduation] = useState(false);
  const [trailingStop, setTrailingStop] = useState(true);
  const [trailingStopPercent, setTrailingStopPercent] = useState("30");
  const [takeProfit, setTakeProfit] = useState(true);
  const [takeProfitMultiplier, setTakeProfitMultiplier] = useState("5");
  const [takeProfitSellPercent, setTakeProfitSellPercent] = useState("50");

  const mirrorModes: {
    key: MirrorMode;
    label: string;
    desc: string;
    icon: typeof Zap;
  }[] = [
    {
      key: "exact",
      label: "Exact SOL Match",
      desc: "If they ape 10 SOL, you ape 10 SOL",
      icon: Zap,
    },
    {
      key: "proportional",
      label: "Proportional",
      desc: "Match their % of wallet size",
      icon: Percent,
    },
    {
      key: "fixed",
      label: "Fixed Amount",
      desc: "Always ape a set SOL amount",
      icon: Lock,
    },
  ];

  const slippageLevels: { key: SlippageLevel; label: string; value: string }[] =
    [
      { key: "low", label: "Low", value: "5%" },
      { key: "med", label: "Medium", value: "15%" },
      { key: "high", label: "Degen", value: "30%" },
    ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Trade Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure how the agent filters pump.fun tokens, sizes positions, and exits trades
        </p>
      </div>

      {/* ========== PUMP.FUN SAFETY FILTERS ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Pump.fun Safety Filters
            </h2>
            <p className="text-xs text-gray-500">
              Don&apos;t ape every token — filter out rugs and scams
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Min Market Cap */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={minMcapEnabled}
              onToggle={setMinMcapEnabled}
              label="Minimum Market Cap"
              description="Skip tokens below this market cap to avoid ultra-micro launches"
            />
            {minMcapEnabled && (
              <div className="mt-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">$</span>
                <input
                  type="text"
                  value={minMcap}
                  onChange={(e) => setMinMcap(e.target.value)}
                  className="input-field w-32 text-sm"
                  placeholder="3000"
                />
                <span className="text-xs text-gray-500">minimum MCap</span>
              </div>
            )}
          </div>

          {/* Max Market Cap */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={maxMcapEnabled}
              onToggle={setMaxMcapEnabled}
              label="Maximum Market Cap"
              description="Skip tokens above this MCap — focus on early plays only"
            />
            {maxMcapEnabled && (
              <div className="mt-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">$</span>
                <input
                  type="text"
                  value={maxMcap}
                  onChange={(e) => setMaxMcap(e.target.value)}
                  className="input-field w-32 text-sm"
                  placeholder="500000"
                />
                <span className="text-xs text-gray-500">maximum MCap</span>
              </div>
            )}
          </div>

          {/* Bonding Curve Range */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={bondingCurveFilter}
              onToggle={setBondingCurveFilter}
              label="Bonding Curve Range"
              description="Only enter if bonding curve progress is within a specific range"
            />
            {bondingCurveFilter && (
              <div className="mt-3 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  value={minBondingPercent}
                  onChange={(e) => setMinBondingPercent(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="5"
                />
                <span className="text-xs text-gray-500">% min</span>
                <span className="text-xs text-gray-500 mx-1">to</span>
                <input
                  type="text"
                  value={maxBondingPercent}
                  onChange={(e) => setMaxBondingPercent(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="95"
                />
                <span className="text-xs text-gray-500">
                  % max bonding curve progress
                </span>
              </div>
            )}
          </div>

          {/* Max Dev Holding */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={maxDevHolding}
              onToggle={setMaxDevHolding}
              label="Max Dev Holding %"
              description="Skip if dev holds more than X% of supply"
            />
            {maxDevHolding && (
              <div className="mt-3 flex items-center gap-2">
                <Skull className="w-4 h-4 text-accent-red" />
                <input
                  type="text"
                  value={maxDevHoldingPercent}
                  onChange={(e) => setMaxDevHoldingPercent(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="5"
                />
                <span className="text-xs text-gray-500">
                  % max dev holding
                </span>
              </div>
            )}
          </div>

          {/* Dev Sold Auto-Skip */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={devSoldAutoSkip}
              onToggle={setDevSoldAutoSkip}
              label="Dev Sold = Auto-Skip"
              description="Automatically skip if deployer has already sold their tokens"
            />
            {devSoldAutoSkip && (
              <div className="mt-2 flex items-center gap-2">
                <Skull className="w-3.5 h-3.5 text-accent-red" />
                <span className="text-xs text-accent-red">
                  Auto-skip if dev wallet has sold any tokens
                </span>
              </div>
            )}
          </div>

          {/* Bundle Detection */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={bundleDetection}
              onToggle={setBundleDetection}
              label="Bundle Detection = Auto-Skip"
              description="Auto-skip tokens where deployer and early buyers share the same funding source"
            />
            {bundleDetection && (
              <div className="mt-2 flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-accent-red" />
                <span className="text-xs text-accent-red">
                  Bundled launches will be auto-skipped
                </span>
              </div>
            )}
          </div>

          {/* Min Unique Buyers */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={minBuyersEnabled}
              onToggle={setMinBuyersEnabled}
              label="Minimum Unique Buyers"
              description="Require a minimum number of unique buyers to avoid wash trading"
            />
            {minBuyersEnabled && (
              <div className="mt-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={minBuyers}
                  onChange={(e) => setMinBuyers(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="10"
                />
                <span className="text-xs text-gray-500">
                  minimum unique buyers
                </span>
              </div>
            )}
          </div>

          {/* Creator Rug History */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={creatorRugFilter}
              onToggle={setCreatorRugFilter}
              label="Creator Rug History"
              description="Skip if the token creator has rugged more than X previous tokens"
            />
            {creatorRugFilter && (
              <div className="mt-3 flex items-center gap-2">
                <Skull className="w-4 h-4 text-accent-red" />
                <span className="text-xs text-gray-500">Skip if creator has rugged &gt;</span>
                <input
                  type="text"
                  value={creatorRugMax}
                  onChange={(e) => setCreatorRugMax(e.target.value)}
                  className="input-field w-16 text-sm text-center"
                  placeholder="2"
                />
                <span className="text-xs text-gray-500">tokens</span>
              </div>
            )}
          </div>

          {/* Freeze Authority Check */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={freezeAuthorityCheck}
              onToggle={setFreezeAuthorityCheck}
              label="Freeze Authority Check"
              description="Skip if freeze authority is still active — creator can freeze all trading"
            />
            {freezeAuthorityCheck && (
              <div className="mt-2 flex items-center gap-2">
                <Snowflake className="w-3.5 h-3.5 text-accent-red" />
                <span className="text-xs text-accent-red">
                  Tokens with active freeze authority will be auto-skipped (critical)
                </span>
              </div>
            )}
          </div>

          {/* Mint Authority Check */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={mintAuthorityCheck}
              onToggle={setMintAuthorityCheck}
              label="Mint Authority Check"
              description="Skip if mint authority is still active — creator can mint unlimited tokens"
            />
            {mintAuthorityCheck && (
              <div className="mt-2 flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-accent-red" />
                <span className="text-xs text-accent-red">
                  Tokens with active mint authority will be auto-skipped
                </span>
              </div>
            )}
          </div>

          {/* Top Holder Concentration */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={topHolderConcentration}
              onToggle={setTopHolderConcentration}
              label="Top Holder Concentration"
              description="Skip if top 10 holders control more than X% of supply"
            />
            {topHolderConcentration && (
              <div className="mt-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">Skip if top 10 hold &gt;</span>
                <input
                  type="text"
                  value={topHolderMax}
                  onChange={(e) => setTopHolderMax(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="60"
                />
                <span className="text-xs text-gray-500">% of supply</span>
              </div>
            )}
          </div>

          {/* Token Age Filter */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={tokenAgeFilter}
              onToggle={setTokenAgeFilter}
              label="Token Age Filter"
              description="Only enter tokens within a specific age range (in minutes)"
            />
            {tokenAgeFilter && (
              <div className="mt-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={minTokenAge}
                  onChange={(e) => setMinTokenAge(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="1"
                />
                <span className="text-xs text-gray-500">min</span>
                <span className="text-xs text-gray-500 mx-1">to</span>
                <input
                  type="text"
                  value={maxTokenAge}
                  onChange={(e) => setMaxTokenAge(e.target.value)}
                  className="input-field w-20 text-sm text-center"
                  placeholder="120"
                />
                <span className="text-xs text-gray-500">max minutes</span>
              </div>
            )}
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
              Choose how to size your mirrored apes
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
            <Zap className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={fixedAmount}
              onChange={(e) => setFixedAmount(e.target.value)}
              className="input-field w-24 text-sm"
              placeholder="5"
            />
            <span className="text-xs text-gray-500">
              SOL per snipe, regardless of whale&apos;s amount
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
              % of your wallet per ape (matching their allocation %)
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
              Pump.fun tokens are volatile — set your max price impact
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

        {/* Jito Tips */}
        <div className="mt-4 p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
          <Toggle
            enabled={jitoTips}
            onToggle={setJitoTips}
            label="Jito Bundle Tips"
            description="Use Jito bundles for faster transaction inclusion and front-running protection on Solana"
          />
          {jitoTips && (
            <div className="mt-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent-green" />
              <span className="text-xs text-accent-green">
                Jito tips enabled — priority landing with MEV protection
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
              Pump.fun tokens move fast — automate your exits
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

          {/* Auto-sell on Dev Sell */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={autoSellDevSell}
              onToggle={setAutoSellDevSell}
              label="Auto-Sell on Dev Sell"
              description="Automatically sell your position if the dev wallet starts dumping tokens"
            />
            {autoSellDevSell && (
              <div className="mt-2 flex items-center gap-2">
                <Skull className="w-3.5 h-3.5 text-accent-red" />
                <span className="text-xs text-accent-red">
                  Will trigger immediate sell if dev dumps
                </span>
              </div>
            )}
          </div>

          {/* Auto-sell on Graduation */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={autoSellGraduation}
              onToggle={setAutoSellGraduation}
              label="Auto-Sell on Graduation"
              description="Take profit when token graduates from pump.fun bonding curve to PumpSwap"
            />
            {autoSellGraduation && (
              <div className="mt-2 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-accent-green" />
                <span className="text-xs text-accent-green">
                  Will sell 100% of position on graduation to PumpSwap
                </span>
              </div>
            )}
          </div>

          {/* Trailing Stop-Loss */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={trailingStop}
              onToggle={setTrailingStop}
              label="Trailing Stop-Loss"
              description="Auto-sell if token dumps from its peak by a percentage"
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
              label="Take Profit at Multiplier"
              description="Automatically sell a portion when your multiplier target is hit"
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
                    % of bag at
                  </span>
                  <input
                    type="text"
                    value={takeProfitMultiplier}
                    onChange={(e) => setTakeProfitMultiplier(e.target.value)}
                    className="input-field w-16 text-sm text-center"
                  />
                  <span className="text-xs text-gray-400">x</span>
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
