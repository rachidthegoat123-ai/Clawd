"use client";

import { useEffect, useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Wallet,
  Copy,
  Check,
  ChevronDown,
  LogOut,
  ExternalLink,
  Power,
} from "lucide-react";
import { shortenAddress } from "@/lib/mockData";

export default function TopBar() {
  const { publicKey, connected, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();

  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sniperActive, setSniperActive] = useState(true);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !connection) return;
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch {
      setBalance(null);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setDropdownOpen(false);
    if (dropdownOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [dropdownOpen]);

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-500/50 bg-dark-900/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-14 px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Left — Bot Status Toggle */}
        <button
          onClick={() => setSniperActive(!sniperActive)}
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all text-sm ${
            sniperActive
              ? "border-accent-green/30 bg-accent-green/5 text-accent-green"
              : "border-dark-500 bg-dark-700 text-gray-500"
          }`}
        >
          <div className="relative flex items-center justify-center w-4 h-4">
            <Power className="w-3.5 h-3.5" />
            {sniperActive && (
              <div className="absolute w-4 h-4 bg-accent-green/20 rounded-full animate-ping" />
            )}
          </div>
          <span className="font-medium">
            {sniperActive ? "Sniper Active" : "Sniper Paused"}
          </span>
        </button>

        {/* Right — Wallet Connect */}
        {connected && publicKey ? (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-dark-500 bg-dark-700/50 hover:border-dark-400 transition-all"
            >
              {/* Wallet icon or adapter icon */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Wallet className="w-3 h-3 text-white" />
              </div>
              {balance !== null && (
                <span className="text-sm font-medium text-gray-200 font-mono">
                  {balance.toFixed(2)} SOL
                </span>
              )}
              <span className="text-sm text-gray-400 font-mono">
                {shortenAddress(publicKey.toBase58())}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-700 border border-dark-500 shadow-2xl animate-slide-in">
                <div className="p-3 border-b border-dark-500/50">
                  <p className="text-xs text-gray-500">
                    {wallet?.adapter.name || "Phantom"}
                  </p>
                  <p className="text-sm font-mono text-gray-300 mt-0.5">
                    {shortenAddress(publicKey.toBase58())}
                  </p>
                  {balance !== null && (
                    <p className="text-sm font-semibold text-gray-100 mt-1 font-mono">
                      {balance.toFixed(4)} SOL
                    </p>
                  )}
                </div>
                <div className="p-1.5">
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-dark-600 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-accent-green" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy Address"}
                  </button>
                  <a
                    href={`https://solscan.io/account/${publicKey.toBase58()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-dark-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Solscan
                  </a>
                  <button
                    onClick={() => {
                      disconnect();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-accent-red hover:bg-accent-red/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setVisible(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-green to-accent-cyan text-dark-900 font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
