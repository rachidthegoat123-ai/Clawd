"use client";

import {
  Wallet,
  TrendingUp,
  Crosshair,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Rocket,
  GraduationCap,
  Clock,
  LogOut,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import PortfolioChart from "@/components/PortfolioChart";
import ActivityItemComponent from "@/components/ActivityItem";
import {
  activePositions,
  activityFeed,
  formatMcap,
  formatAge,
} from "@/lib/mockData";
import Link from "next/link";

const stats = [
  {
    label: "Portfolio Value",
    value: "548 SOL",
    change: "+42 SOL today",
    changePercent: "+8.3%",
    positive: true,
    icon: Wallet,
  },
  {
    label: "24h P&L",
    value: "+86.4 SOL",
    change: "vs yesterday",
    changePercent: "+18.7%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Tokens Sniped Today",
    value: "12",
    change: "across 6 wallets",
    changePercent: "",
    positive: true,
    icon: Crosshair,
  },
  {
    label: "Avg Multiplier",
    value: "6.2x",
    change: "Last 30 days",
    changePercent: "+1.4x",
    positive: true,
    icon: Target,
  },
];

export default function Dashboard() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  // Not connected — show onboarding CTA
  if (!connected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your pump.fun mirror portfolio at a glance
          </p>
        </div>

        {/* Connect Wallet CTA */}
        <div className="glass-card p-10 text-center max-w-xl mx-auto mt-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center mx-auto mb-5">
            <Wallet className="w-8 h-8 text-dark-900" />
          </div>
          <h2 className="text-xl font-bold text-gray-100 mb-2">
            Connect your wallet to get started
          </h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Connect your Phantom wallet to start copy-trading the best pump.fun
            snipers. Your keys never leave your device.
          </p>
          <button
            onClick={() => setVisible(true)}
            className="btn-primary mx-auto"
          >
            <Wallet className="w-4 h-4" />
            Connect Phantom
          </button>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-accent-green">6</p>
              <p className="text-xs text-gray-500 mt-0.5">Top Wallets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">12</p>
              <p className="text-xs text-gray-500 mt-0.5">Safety Filters</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent-cyan">Auto</p>
              <p className="text-xs text-gray-500 mt-0.5">Exit Strategies</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connected — show full dashboard
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your pump.fun mirror portfolio at a glance
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                {stat.label}
              </span>
              <stat.icon className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
            <div className="flex items-center gap-2">
              {stat.changePercent && (
                <span
                  className={`text-xs font-medium ${
                    stat.positive ? "text-accent-green" : "text-accent-red"
                  }`}
                >
                  {stat.changePercent}
                </span>
              )}
              <span className="text-xs text-gray-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Portfolio Performance
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              February 2026 · All mirrored pump.fun positions
            </p>
          </div>
          <div className="flex gap-2">
            {["24H", "7D", "1M", "ALL"].map((period) => (
              <button
                key={period}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  period === "1M"
                    ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
                    : "text-gray-500 hover:text-gray-300 hover:bg-dark-600"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <PortfolioChart />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Active Positions */}
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-100">
              Active Positions
            </h2>
            <span className="badge-green">{activePositions.length} Open</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-dark-500/50">
                  <th className="pb-3 pr-4">Token</th>
                  <th className="pb-3 pr-4">Mirrored From</th>
                  <th className="pb-3 pr-4">Entry</th>
                  <th className="pb-3 pr-4">Now</th>
                  <th className="pb-3 pr-4">P&L</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-500/30">
                {activePositions.map((pos) => (
                  <tr key={pos.ticker} className="group hover:bg-dark-600/30">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-100">
                          {pos.ticker}
                        </span>
                        {pos.graduated ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded border bg-accent-green/10 text-accent-green border-accent-green/20 flex items-center gap-0.5">
                            <GraduationCap className="w-2.5 h-2.5" />
                            PumpSwap
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.5 rounded border bg-purple-500/10 text-purple-400 border-purple-500/20 flex items-center gap-0.5">
                            <Rocket className="w-2.5 h-2.5" />
                            {pos.bondingCurveProgress}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {formatAge(pos.holdTimeMins)}
                      </p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-400">
                        {pos.mirroredFrom}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-400 font-mono">
                        {formatMcap(pos.entryMcap)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-100 font-mono">
                        {formatMcap(pos.currentMcap)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1">
                        {pos.pnlSol >= 0 ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-accent-green" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-accent-red" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            pos.pnlSol >= 0
                              ? "text-accent-green"
                              : "text-accent-red"
                          }`}
                        >
                          {pos.multiplier}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-0.5 ${
                          pos.pnlSol >= 0
                            ? "text-accent-green/70"
                            : "text-accent-red/70"
                        }`}
                      >
                        {pos.pnlSol >= 0 ? "+" : ""}
                        {pos.pnlSol.toFixed(1)} SOL
                      </p>
                    </td>
                    <td className="py-3 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-red/10 text-accent-red border border-accent-red/20 hover:bg-accent-red/20 flex items-center gap-1 ml-auto">
                        <LogOut className="w-3 h-3" />
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-100">
              Recent Activity
            </h2>
            <Link
              href="/feed"
              className="text-xs text-accent-blue hover:text-accent-blue/80 flex items-center gap-1"
            >
              View All <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {activityFeed.slice(0, 3).map((item) => (
              <ActivityItemComponent key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
