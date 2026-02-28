import Link from "next/link";
import { TrendingUp, Activity, ExternalLink } from "lucide-react";
import { type TrackedWallet, formatUsd, shortenAddress } from "@/lib/mockData";

interface WalletCardProps {
  wallet: TrackedWallet;
}

const riskColors = {
  Conservative: "badge-blue",
  Moderate: "badge-yellow",
  Aggressive: "badge-red",
};

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SOL: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  BASE: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  ARB: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function WalletCard({ wallet }: WalletCardProps) {
  return (
    <Link href={`/wallet/${wallet.address}`}>
      <div className="glass-card-hover p-5 cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{wallet.emoji}</div>
            <div>
              <h3 className="font-semibold text-gray-100 group-hover:text-accent-green transition-colors">
                {wallet.nickname}
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                {shortenAddress(wallet.address)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`badge text-[10px] border ${chainColors[wallet.chain]}`}
            >
              {wallet.chain}
            </span>
            {wallet.isActive && (
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Win Rate
            </p>
            <p className="text-lg font-bold text-accent-green">
              {wallet.winRate}%
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Total Profit
            </p>
            <p className="text-lg font-bold text-gray-100">
              {formatUsd(wallet.totalProfitUsd)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              ROI
            </p>
            <p className="text-lg font-bold text-accent-green">
              +{wallet.totalProfitPercent}%
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-dark-500/50">
          <div className="flex items-center gap-3">
            <span className={riskColors[wallet.riskLevel]}>
              {wallet.riskLevel}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {wallet.totalTrades} trades
            </span>
          </div>
          <span className="text-xs text-gray-500">{wallet.lastActive}</span>
        </div>
      </div>
    </Link>
  );
}
