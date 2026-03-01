import {
  ArrowUpRight,
  ArrowDownRight,
  Crosshair,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Rocket,
  GraduationCap,
  Users,
  Crown,
  Snowflake,
  Coins,
  Package,
  Skull,
} from "lucide-react";
import SafetyBadge from "./SafetyBadge";
import {
  type ActivityItem as ActivityItemType,
  formatMcap,
  formatAge,
} from "@/lib/mockData";

interface ActivityItemProps {
  item: ActivityItemType;
}

const actionIcons = {
  BUY: ArrowUpRight,
  SELL: ArrowDownRight,
  SNIPE: Crosshair,
};

const actionColors = {
  BUY: "text-accent-green",
  SELL: "text-accent-red",
  SNIPE: "text-accent-cyan",
};

const statusConfig = {
  analyzing: {
    icon: Loader2,
    label: "Analyzing...",
    color: "text-accent-yellow",
    bg: "bg-accent-yellow/10 border-accent-yellow/20",
    animate: "animate-spin",
  },
  sniping: {
    icon: Loader2,
    label: "Sniping...",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10 border-accent-cyan/20",
    animate: "animate-spin",
  },
  executed: {
    icon: CheckCircle2,
    label: "Executed",
    color: "text-accent-green",
    bg: "bg-accent-green/10 border-accent-green/20",
    animate: "",
  },
  skipped: {
    icon: XCircle,
    label: "Skipped",
    color: "text-accent-red",
    bg: "bg-accent-red/10 border-accent-red/20",
    animate: "",
  },
  waiting: {
    icon: Clock,
    label: "Awaiting Review",
    color: "text-accent-purple",
    bg: "bg-accent-purple/10 border-accent-purple/20",
    animate: "",
  },
};

export default function ActivityItemComponent({ item }: ActivityItemProps) {
  const ActionIcon = actionIcons[item.action];
  const status = statusConfig[item.agentStatus];
  const StatusIcon = status.icon;

  return (
    <div className="glass-card p-4 animate-slide-in">
      <div className="flex items-start gap-4">
        {/* Wallet Icon */}
        <div className="text-2xl flex-shrink-0 mt-0.5">{item.walletEmoji}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Top Row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-gray-100">
              {item.walletNickname}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${actionColors[item.action]}`}
            >
              <ActionIcon className="w-4 h-4" />
              {item.action}
            </span>
            <span className="text-sm text-gray-300 font-semibold">
              {item.tokenTicker}
            </span>
            <span className="text-sm text-gray-500">
              ({item.amountSol} SOL)
            </span>
          </div>

          {/* Details Row */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
            <span>on {item.platform}</span>
            <span>·</span>
            <span>MCap {formatMcap(item.marketCap)}</span>
            <span>·</span>
            <span>Age {formatAge(item.tokenAgeMins)}</span>
            <span>·</span>
            <span>{item.solInBondingCurve.toFixed(1)} SOL in curve</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {item.uniqueBuyers} buyers
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              {item.graduated ? (
                <>
                  <GraduationCap className="w-3 h-3 text-accent-green" />
                  <span className="text-accent-green">Graduated</span>
                </>
              ) : (
                <>
                  <Rocket className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400">
                    Curve {item.bondingCurveProgress}%
                  </span>
                </>
              )}
            </span>
            {item.isKOTH && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-accent-yellow font-medium">
                  <Crown className="w-3 h-3" />
                  KOTH
                </span>
              </>
            )}
            <span>·</span>
            <span>{item.timestamp}</span>
          </div>

          {/* Agent Status & Safety & Warnings */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${status.bg} ${status.color}`}
            >
              <StatusIcon className={`w-3.5 h-3.5 ${status.animate}`} />
              {status.label}
            </div>
            <SafetyBadge score={item.safetyScore} showLabel={false} />
            {item.devSold && (
              <span className="text-[10px] px-2 py-0.5 rounded border bg-accent-red/10 text-accent-red border-accent-red/20 font-medium">
                DEV SOLD
              </span>
            )}
            {item.freezeAuthority && (
              <span className="text-[10px] px-2 py-0.5 rounded border bg-accent-red/10 text-accent-red border-accent-red/20 font-medium flex items-center gap-1">
                <Snowflake className="w-3 h-3" />
                FREEZE AUTH
              </span>
            )}
            {item.mintAuthority && (
              <span className="text-[10px] px-2 py-0.5 rounded border bg-accent-red/10 text-accent-red border-accent-red/20 font-medium flex items-center gap-1">
                <Coins className="w-3 h-3" />
                MINT AUTH
              </span>
            )}
            {item.isBundled && (
              <span className="text-[10px] px-2 py-0.5 rounded border bg-accent-red/10 text-accent-red border-accent-red/20 font-medium flex items-center gap-1">
                <Package className="w-3 h-3" />
                BUNDLED
              </span>
            )}
            {item.creatorRugCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded border bg-accent-red/10 text-accent-red border-accent-red/20 font-medium flex items-center gap-1">
                <Skull className="w-3 h-3" />
                Creator rugged {item.creatorRugCount}/{item.creatorTokenCount}
              </span>
            )}
          </div>

          {/* Agent Reason (if skipped or waiting) */}
          {item.agentReason && (
            <div className="mt-2 flex items-start gap-2 p-2.5 rounded-lg bg-dark-800/80 border border-dark-500/30">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-yellow flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.agentReason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
