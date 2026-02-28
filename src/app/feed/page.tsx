"use client";

import { useState } from "react";
import { Radio, Filter } from "lucide-react";
import ActivityItemComponent from "@/components/ActivityItem";
import { activityFeed } from "@/lib/mockData";

type StatusFilter = "all" | "executed" | "analyzing" | "skipped" | "waiting" | "copying";

export default function FeedPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered =
    statusFilter === "all"
      ? activityFeed
      : activityFeed.filter((item) => item.agentStatus === statusFilter);

  const counts = {
    all: activityFeed.length,
    executed: activityFeed.filter((i) => i.agentStatus === "executed").length,
    analyzing: activityFeed.filter((i) => i.agentStatus === "analyzing").length,
    copying: activityFeed.filter((i) => i.agentStatus === "copying").length,
    skipped: activityFeed.filter((i) => i.agentStatus === "skipped").length,
    waiting: activityFeed.filter((i) => i.agentStatus === "waiting").length,
  };

  const statusFilters: { key: StatusFilter; label: string; color: string }[] = [
    { key: "all", label: "All", color: "text-gray-300" },
    { key: "executed", label: "Executed", color: "text-accent-green" },
    { key: "analyzing", label: "Analyzing", color: "text-accent-yellow" },
    { key: "copying", label: "Sniping", color: "text-accent-cyan" },
    { key: "skipped", label: "Skipped", color: "text-accent-red" },
    { key: "waiting", label: "Pending", color: "text-accent-purple" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-100">Live Feed</h1>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              <span className="text-xs font-medium text-accent-green">
                Real-time
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Watch pump.fun snipes, sells, and the agent&apos;s decisions in real time
          </p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-500 mr-1" />
        {statusFilters.map((sf) => (
          <button
            key={sf.key}
            onClick={() => setStatusFilter(sf.key)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
              statusFilter === sf.key
                ? `bg-dark-600 ${sf.color} border-dark-500`
                : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-dark-700"
            }`}
          >
            {sf.label}
            <span className="ml-1.5 text-gray-600">({counts[sf.key]})</span>
          </button>
        ))}
      </div>

      {/* Feed Items */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <ActivityItemComponent key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Radio className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No activity matching this filter.
          </p>
        </div>
      )}
    </div>
  );
}
