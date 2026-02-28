import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import SafetyBadge from "./SafetyBadge";
import { type ActivityItem as ActivityItemType, formatUsd } from "@/lib/mockData";

interface ActivityItemProps {
  item: ActivityItemType;
}

const actionIcons = {
  BUY: ArrowUpRight,
  SELL: ArrowDownRight,
  SWAP: ArrowLeftRight,
};

const actionColors = {
  BUY: "text-accent-green",
  SELL: "text-accent-red",
  SWAP: "text-accent-blue",
};

const statusConfig = {
  analyzing: {
    icon: Loader2,
    label: "Analyzing...",
    color: "text-accent-yellow",
    bg: "bg-accent-yellow/10 border-accent-yellow/20",
    animate: "animate-spin",
  },
  copying: {
    icon: Loader2,
    label: "Copying Trade...",
    color: "text-accent-blue",
    bg: "bg-accent-blue/10 border-accent-blue/20",
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
    label: "Awaiting Approval",
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
            <span className={`flex items-center gap-1 text-sm font-medium ${actionColors[item.action]}`}>
              <ActionIcon className="w-4 h-4" />
              {item.action}
            </span>
            <span className="text-sm text-gray-300 font-semibold">
              {item.tokenSymbol}
            </span>
            <span className="text-sm text-gray-500">
              ({formatUsd(item.amount)})
            </span>
          </div>

          {/* Details */}
          <p className="text-xs text-gray-500 mb-2">
            on {item.platform} · {item.chain} · {item.timestamp}
          </p>

          {/* Agent Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${status.bg} ${status.color}`}
            >
              <StatusIcon className={`w-3.5 h-3.5 ${status.animate}`} />
              {status.label}
            </div>
            <SafetyBadge
              score={item.safetyScore}
              verified={item.verified}
              showLabel={false}
            />
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
