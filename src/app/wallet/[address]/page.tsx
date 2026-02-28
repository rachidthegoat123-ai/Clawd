"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  TrendingUp,
  Target,
  Activity,
  Shield,
  Trophy,
  Star,
  BarChart3,
} from "lucide-react";
import { trackedWallets, formatUsd, shortenAddress } from "@/lib/mockData";

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SOL: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  BASE: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  ARB: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const riskColors = {
  Conservative: "badge-blue",
  Moderate: "badge-yellow",
  Aggressive: "badge-red",
};

// Mock recent trades for the wallet profile
const mockTrades = [
  { token: "LINK", action: "BUY", amount: 52000, pnl: 24.1, date: "2h ago" },
  { token: "JUP", action: "BUY", amount: 125000, pnl: 32.1, date: "1d ago" },
  { token: "AAVE", action: "SELL", amount: 340000, pnl: 18.5, date: "2d ago" },
  { token: "UNI", action: "BUY", amount: 88000, pnl: -5.2, date: "3d ago" },
  { token: "BRETT", action: "BUY", amount: 18500, pnl: 45.8, date: "4d ago" },
  { token: "ARB", action: "BUY", amount: 210000, pnl: 12.3, date: "5d ago" },
  { token: "OP", action: "SELL", amount: 155000, pnl: 28.7, date: "6d ago" },
  { token: "WIF", action: "BUY", amount: 76000, pnl: 92.4, date: "1w ago" },
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
          Back to Inner Circle
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
        Back to Inner Circle
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
                <span
                  className={`badge text-[10px] border ${chainColors[wallet.chain]}`}
                >
                  {wallet.chain}
                </span>
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
            {formatUsd(wallet.totalProfitUsd)}
          </p>
          <span className="text-xs text-accent-green">
            +{wallet.totalProfitPercent}% ROI
          </span>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Total Trades
          </div>
          <p className="text-3xl font-bold text-gray-100 mt-1">
            {wallet.totalTrades}
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Risk Level
          </div>
          <div className="mt-2">
            <span className={`${riskColors[wallet.riskLevel]} text-sm`}>
              {wallet.riskLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Favorite Tokens */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-accent-yellow" />
            <h2 className="text-lg font-semibold text-gray-100">
              Favorite Tokens
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {wallet.favoriteTokens.map((token) => (
              <div
                key={token}
                className="px-4 py-2 rounded-xl bg-dark-600 border border-dark-500 text-sm font-medium text-gray-200 hover:border-accent-blue/30 transition-colors cursor-pointer"
              >
                {token}
              </div>
            ))}
          </div>
        </div>

        {/* Biggest Win */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-accent-yellow" />
            <h2 className="text-lg font-semibold text-gray-100">Biggest Win</h2>
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-accent-green">
              {formatUsd(wallet.biggestWin.profit)}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              on <span className="text-gray-200 font-semibold">{wallet.biggestWin.token}</span>
            </p>
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
              {formatUsd(wallet.portfolioValue)}
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
                        trade.action === "BUY"
                          ? "text-accent-green"
                          : "text-accent-red"
                      }`}
                    >
                      {trade.action}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-300">
                      {formatUsd(trade.amount)}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        trade.pnl >= 0 ? "text-accent-green" : "text-accent-red"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}
                      {trade.pnl}%
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
