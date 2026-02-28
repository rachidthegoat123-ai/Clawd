"use client";

import {
  Wallet,
  TrendingUp,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
} from "lucide-react";
import PortfolioChart from "@/components/PortfolioChart";
import ActivityItemComponent from "@/components/ActivityItem";
import { activePositions, activityFeed, formatUsd } from "@/lib/mockData";
import Link from "next/link";

const stats = [
  {
    label: "Portfolio Value",
    value: "$78,200",
    change: "+$2,700",
    changePercent: "+3.6%",
    positive: true,
    icon: Wallet,
  },
  {
    label: "24h Profit/Loss",
    value: "+$4,280",
    change: "vs yesterday",
    changePercent: "+5.8%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Active Mirrors",
    value: "5",
    change: "of 6 wallets",
    changePercent: "",
    positive: true,
    icon: Users,
  },
  {
    label: "Mirror Win Rate",
    value: "76.2%",
    change: "Last 30 days",
    changePercent: "+2.1%",
    positive: true,
    icon: Target,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your smart money portfolio at a glance
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
              February 2026 · All mirrored positions
            </p>
          </div>
          <div className="flex gap-2">
            {["7D", "1M", "3M", "ALL"].map((period) => (
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
                  <th className="pb-3 pr-4">Current</th>
                  <th className="pb-3 pr-4 text-right">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-500/30">
                {activePositions.map((pos) => (
                  <tr key={pos.symbol} className="group hover:bg-dark-600/30">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-100">
                          {pos.symbol}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            pos.chain === "ETH"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : pos.chain === "SOL"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          }`}
                        >
                          {pos.chain}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-400">
                        {pos.mirroredFrom}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-300 font-mono">
                        ${pos.entryPrice}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-100 font-mono">
                        ${pos.currentPrice}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {pos.pnlPercent >= 0 ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-accent-green" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-accent-red" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            pos.pnlPercent >= 0
                              ? "text-accent-green"
                              : "text-accent-red"
                          }`}
                        >
                          {pos.pnlPercent >= 0 ? "+" : ""}
                          {pos.pnlPercent.toFixed(1)}%
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-0.5 ${
                          pos.pnlUsd >= 0
                            ? "text-accent-green/70"
                            : "text-accent-red/70"
                        }`}
                      >
                        {pos.pnlUsd >= 0 ? "+" : ""}
                        {formatUsd(Math.abs(pos.pnlUsd))}
                      </p>
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
