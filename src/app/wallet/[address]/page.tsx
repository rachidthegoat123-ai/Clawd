"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  TrendingUp,
  Target,
  Activity,
  Shield,
  Trophy,
  Crosshair,
  BarChart3,
  Skull,
  Rocket,
  GraduationCap,
  Users,
  Clock,
} from "lucide-react";
import { trackedWallets, formatSol, shortenAddress, formatMcap } from "@/lib/mockData";

const riskColors = {
  Conservative: "badge-blue",
  Moderate: "badge-yellow",
  Degen: "badge-red",
};

// Mock recent trades for pump.fun
const mockTrades = [
  { token: "$PNUT", action: "SNIPE", amountSol: 12.5, multiplier: "19.6x", pnlSol: 232.5, mcap: "$4.2K", platform: "pump.fun", date: "2h ago" },
  { token: "$BCAT", action: "SNIPE", amountSol: 5.2, multiplier: "5.0x", pnlSol: 20.8, mcap: "$6.8K", platform: "pump.fun", date: "4h ago" },
  { token: "$WIF", action: "SELL", amountSol: 220.0, multiplier: "86x", pnlSol: 8900, mcap: "$1.2M", platform: "Jupiter", date: "1d ago" },
  { token: "$MOODENG", action: "BUY", amountSol: 42.0, multiplier: "8.1x", pnlSol: 297, mcap: "$68K", platform: "PumpSwap", date: "1d ago" },
  { token: "$FOMO", action: "SNIPE", amountSol: 3.0, multiplier: "6.0x", pnlSol: 14.9, mcap: "$2.1K", platform: "pump.fun", date: "2d ago" },
  { token: "$RUG", action: "SNIPE", amountSol: 8.0, multiplier: "0x", pnlSol: -8.0, mcap: "$1.5K", platform: "pump.fun", date: "3d ago" },
  { token: "$MEW", action: "SELL", amountSol: 180.0, multiplier: "14.2x", pnlSol: 2376, mcap: "$890K", platform: "Jupiter", date: "4d ago" },
  { token: "$SLERF", action: "BUY", amountSol: 35.0, multiplier: "320x", pnlSol: 12000, mcap: "$45K", platform: "PumpSwap", date: "5d ago" },
];

export default function WalletProfilePage() {
  const params = useParams();
  const address = params.address as string;

  const wallet = trackedWallets.find(
    (w) => w.address.toLowerCase() === address.toLowerCase()
  );

  if (!wallet) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Wallet not found.</p>
        <Link href="/inner-circle" className="text-accent-blue text-sm mt-2 inline-block">
          Back to Tracked Wallets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/inner-circle"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tracked Wallets
      </Link>

      {/* Profile Header */}
      <div className="glass-card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-dark-600 flex items-center justify-center text-3xl">
              {wallet.emoji}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-100">
                  {wallet.nickname}
                </h1>
                {wallet.isActive && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-green/10 border border-accent-green/20">
                    <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-accent-green">
                      Active
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500 font-mono">
                  {shortenAddress(wallet.address)}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(wallet.address)}
                  className="text-gray-500 hover:text-gray-300"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary text-sm">
              <Target className="w-4 h-4" />
              Mirror This Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            Win Rate
          </div>
          <p className="text-3xl font-bold text-accent-green mt-1">
            {wallet.winRate}%
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            Total Profit
          </div>
          <p className="text-3xl font-bold text-gray-100 mt-1">
            {formatSol(wallet.totalProfitSol)}
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <Crosshair className="w-3.5 h-3.5" />
            Avg Multiplier
          </div>
          <p className="text-3xl font-bold text-accent-green mt-1">
            {wallet.avgMultiplier}
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Avg Hold Time
          </div>
          <p className="text-3xl font-bold text-gray-100 mt-1">
            {wallet.avgHoldTime}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biggest Win */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-accent-yellow" />
            <h2 className="text-lg font-semibold text-gray-100">Biggest Win</h2>
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-accent-green">
              {wallet.biggestWin.multiplier}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              on <span className="text-gray-200 font-semibold">{wallet.biggestWin.token}</span>
            </p>
            <p className="text-xs text-accent-green mt-1">
              +{formatSol(wallet.biggestWin.profitSol)} profit
            </p>
          </div>
        </div>

        {/* Pump.fun Stats */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-4 h-4 text-purple-400" />
            <h2 className="text-lg font-semibold text-gray-100">
              Pump.fun Stats
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Avg Entry MCap</span>
              <span className="text-sm font-semibold text-gray-200">{wallet.avgEntryMcap}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Favorite Play</span>
              <span className="text-sm font-semibold text-gray-200 text-right max-w-[180px]">{wallet.favoritePlay}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Rugs Hit</span>
              <span className="text-sm font-semibold text-accent-red flex items-center gap-1">
                <Skull className="w-3 h-3" />
                {wallet.rugsHit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Rug Rate</span>
              <span className="text-sm font-semibold text-gray-200">
                {((wallet.rugsHit / wallet.tokensAped) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Copiers</span>
              <span className="text-sm font-semibold text-gray-200 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {wallet.copiers}
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-accent-blue" />
            <h2 className="text-lg font-semibold text-gray-100">
              Portfolio Value
            </h2>
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-gray-100">
              {formatSol(wallet.portfolioValueSol)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last active: {wallet.lastActive}
            </p>
          </div>
        </div>
      </div>

      {/* Trade History */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">
          Recent Trade History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-dark-500/50">
                <th className="pb-3 pr-4">Token</th>
                <th className="pb-3 pr-4">Action</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Entry MCap</th>
                <th className="pb-3 pr-4">Platform</th>
                <th className="pb-3 pr-4">Multiplier</th>
                <th className="pb-3 pr-4 text-right">P&L</th>
                <th className="pb-3 text-right">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-500/30">
              {mockTrades.map((trade, idx) => (
                <tr key={idx} className="hover:bg-dark-600/30">
                  <td className="py-3 pr-4">
                    <span className="font-medium text-gray-100">
                      {trade.token}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`text-sm font-medium ${
                        trade.action === "SELL"
                          ? "text-accent-red"
                          : trade.action === "SNIPE"
                          ? "text-accent-cyan"
                          : "text-accent-green"
                      }`}
                    >
                      {trade.action}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-300">
                      {trade.amountSol} SOL
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-400 font-mono">
                      {trade.mcap}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-400">
                      {trade.platform}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`text-sm font-semibold ${
                        trade.pnlSol >= 0 ? "text-accent-green" : "text-accent-red"
                      }`}
                    >
                      {trade.multiplier}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        trade.pnlSol >= 0 ? "text-accent-green" : "text-accent-red"
                      }`}
                    >
                      {trade.pnlSol >= 0 ? "+" : ""}
                      {trade.pnlSol.toFixed(1)} SOL
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-xs text-gray-500">{trade.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
