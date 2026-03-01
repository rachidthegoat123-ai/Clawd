import { ShieldCheck, ShieldAlert } from "lucide-react";

interface SafetyBadgeProps {
  score: number;
  showLabel?: boolean;
}

export default function SafetyBadge({ score, showLabel = true }: SafetyBadgeProps) {
  const isGood = score >= 60;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
          isGood
            ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
            : "bg-accent-red/10 text-accent-red border border-accent-red/20"
        }`}
      >
        {isGood ? (
          <ShieldCheck className="w-3.5 h-3.5" />
        ) : (
          <ShieldAlert className="w-3.5 h-3.5" />
        )}
        <span>{score}/100</span>
      </div>
      {showLabel && (
        <span
          className={`text-xs ${
            isGood ? "text-accent-green" : "text-accent-red"
          }`}
        >
          {isGood ? "Safe" : "Risky"}
        </span>
      )}
    </div>
  );
}
