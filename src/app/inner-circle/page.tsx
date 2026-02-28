"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  Scan,
  X,
  Loader2,
  Filter,
} from "lucide-react";
import WalletCard from "@/components/WalletCard";
import { trackedWallets } from "@/lib/mockData";

type SortOption = "winRate" | "profit" | "roi" | "trades";
type ChainFilter = "ALL" | "ETH" | "SOL" | "BASE" | "ARB";

export default function InnerCirclePage() {
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("winRate");
  const [chainFilter, setChainFilter] = useState<ChainFilter>("ALL");

  const filtered = trackedWallets
    .filter((w) => {
      const matchesSearch =
        w.nickname.toLowerCase().includes(search.toLowerCase()) ||
        w.address.toLowerCase().includes(search.toLowerCase());
      const matchesChain = chainFilter === "ALL" || w.chain === chainFilter;
      return matchesSearch && matchesChain;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "winRate":
          return b.winRate - a.winRate;
        case "profit":
          return b.totalProfitUsd - a.totalProfitUsd;
        case "roi":
          return b.totalProfitPercent - a.totalProfitPercent;
        case "trades":
          return b.totalTrades - a.totalTrades;
        default:
          return 0;
      }
    });

  const handleScan = () => {
    if (!newAddress) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowAddForm(false);
      setNewAddress("");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">The Inner Circle</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your directory of elite traders and smart money wallets
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Add Wallet
        </button>
      </div>

      {/* Add Wallet Form */}
      {showAddForm && (
        <div className="glass-card p-5 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-100">Track a New Wallet</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Paste wallet address (0x... or SOL address)"
                className="input-field font-mono text-sm"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={!newAddress || scanning}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4" />
                  Scan History
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            The agent will analyze the wallet&apos;s trading history, calculate
            win rate, and identify patterns.
          </p>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by nickname or address..."
            className="input-field pl-10 text-sm"
          />
        </div>

        {/* Chain Filter */}
        <div className="flex items-center gap-1 bg-dark-800 rounded-xl border border-dark-500 p-1">
          {(["ALL", "ETH", "SOL", "BASE", "ARB"] as ChainFilter[]).map(
            (chain) => (
              <button
                key={chain}
                onClick={() => setChainFilter(chain)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  chainFilter === chain
                    ? "bg-dark-600 text-gray-100"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {chain}
              </button>
            )
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-dark-800 border border-dark-500 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50"
          >
            <option value="winRate">Win Rate</option>
            <option value="profit">Total Profit</option>
            <option value="roi">ROI %</option>
            <option value="trades">Total Trades</option>
          </select>
        </div>
      </div>

      {/* Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((wallet) => (
          <WalletCard key={wallet.address} wallet={wallet} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">
            No wallets match your filters.
          </p>
        </div>
      )}
    </div>
  );
}
