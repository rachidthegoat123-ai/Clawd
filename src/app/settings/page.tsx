"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Shield,
  Bell,
  Palette,
  CheckCircle2,
  Wallet,
  Globe,
  Zap,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import Toggle from "@/components/Toggle";
import { shortenAddress } from "@/lib/mockData";

type PriorityFee = "low" | "standard" | "turbo";

export default function SettingsPage() {
  const { publicKey, connected, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();

  // Wallet balance
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Priority Fees
  const [priorityFee, setPriorityFee] = useState<PriorityFee>("standard");

  // RPC
  const [selectedRpc, setSelectedRpc] = useState("Helius");

  // Notifications
  const [pushNotifications, setPushNotifications] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  // Notifications - What to notify
  const [notifySnipes, setNotifySnipes] = useState(true);
  const [notifySkips, setNotifySkips] = useState(true);
  const [notifyGraduations, setNotifyGraduations] = useState(true);
  const [notifyStopLoss, setNotifyStopLoss] = useState(true);

  // Display
  const [compactMode, setCompactMode] = useState(false);
  const [showPnlInSol, setShowPnlInSol] = useState(true);

  // Fetch balance when wallet connects
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

  const handleCopyAddress = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const feeOptions: {
    key: PriorityFee;
    label: string;
    fee: string;
    desc: string;
  }[] = [
    {
      key: "low",
      label: "Economy",
      fee: "0.0001 SOL",
      desc: "Low priority fee, may miss fast pumps",
    },
    {
      key: "standard",
      label: "Standard",
      fee: "0.001 SOL",
      desc: "Balanced speed and cost",
    },
    {
      key: "turbo",
      label: "Turbo",
      fee: "0.01 SOL",
      desc: "Maximum speed for sniping, uses Jito bundles",
    },
  ];

  const rpcOptions = ["Helius", "QuickNode", "Triton", "Custom"];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure your Solana preferences, security, and notifications
        </p>
      </div>

      {/* ========== WALLET CONNECTION ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-green" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Wallet Connection
            </h2>
            <p className="text-xs text-gray-500">
              Connect your Phantom wallet to enable trading
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Wallet Status */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {wallet?.adapter.name || "Phantom"} Wallet
                  </p>
                  {connected && publicKey ? (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 font-mono">
                        {shortenAddress(publicKey.toBase58())}
                      </span>
                      <button
                        onClick={handleCopyAddress}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-accent-green" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <a
                        href={`https://solscan.io/account/${publicKey.toBase58()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">
                      No wallet connected
                    </p>
                  )}
                </div>
              </div>
              {connected ? (
                <button
                  onClick={() => disconnect()}
                  className="btn-danger text-sm py-2"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => setVisible(true)}
                  className="btn-primary text-sm py-2"
                >
                  Connect Wallet
                </button>
              )}
            </div>

            {/* Balance Display */}
            {connected && balance !== null && (
              <div className="mt-3 pt-3 border-t border-dark-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Balance</span>
                  <span className="text-sm font-semibold text-gray-100 font-mono">
                    {balance.toFixed(4)} SOL
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RPC */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Solana RPC Endpoint
                </p>
                <p className="text-xs text-gray-500">
                  Use a fast RPC for better snipe execution
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {rpcOptions.map((rpc) => (
                <button
                  key={rpc}
                  onClick={() => setSelectedRpc(rpc)}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    rpc === selectedRpc
                      ? "bg-accent-green/10 border-accent-green/20 text-accent-green"
                      : "bg-dark-600 border-dark-500 text-gray-300 hover:border-gray-400"
                  }`}
                >
                  {rpc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== PRIORITY FEES ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-accent-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Solana Priority Fees
            </h2>
            <p className="text-xs text-gray-500">
              Higher fees = faster transaction landing on Solana
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {feeOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setPriorityFee(option.key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                priorityFee === option.key
                  ? "border-accent-yellow/50 bg-accent-yellow/5"
                  : "border-dark-500/50 bg-dark-800/30 hover:border-dark-500"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-sm font-semibold ${
                    priorityFee === option.key
                      ? "text-gray-100"
                      : "text-gray-300"
                  }`}
                >
                  {option.label}
                </p>
                <span
                  className={`text-xs font-mono ${
                    priorityFee === option.key
                      ? "text-accent-yellow"
                      : "text-gray-500"
                  }`}
                >
                  {option.fee}
                </span>
              </div>
              <p className="text-xs text-gray-500">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ========== NOTIFICATIONS ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-accent-purple" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Notifications
            </h2>
            <p className="text-xs text-gray-500">
              How and when you want to be alerted
            </p>
          </div>
        </div>

        {/* Channels */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Notification Channels
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={pushNotifications}
                onToggle={setPushNotifications}
                label="Push Notifications"
                description="Browser and mobile push alerts"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={telegramAlerts}
                onToggle={setTelegramAlerts}
                label="Telegram Alerts"
                description="Get instant snipe alerts via Telegram bot"
              />
              {telegramAlerts && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter your Telegram chat ID..."
                    className="input-field text-sm"
                  />
                </div>
              )}
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={emailDigest}
                onToggle={setEmailDigest}
                label="Email Digest"
                description="Daily summary of all snipes and P&L"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={soundAlerts}
                onToggle={setSoundAlerts}
                label="Sound Alerts"
                description="Play a sound when a snipe opportunity is detected"
              />
            </div>
          </div>
        </div>

        {/* Events */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Alert Events
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifySnipes}
                onToggle={setNotifySnipes}
                label="Snipe Executed"
                description="When the agent successfully mirrors a pump.fun buy"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifySkips}
                onToggle={setNotifySkips}
                label="Token Skipped"
                description="When the agent skips a token due to safety filters"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifyGraduations}
                onToggle={setNotifyGraduations}
                label="Token Graduated"
                description="When a held token graduates from pump.fun to PumpSwap"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifyStopLoss}
                onToggle={setNotifyStopLoss}
                label="Stop-Loss Triggered"
                description="When a trailing stop-loss activates on a position"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========== DISPLAY ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <Palette className="w-5 h-5 text-accent-cyan" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Display</h2>
            <p className="text-xs text-gray-500">
              Customize your dashboard appearance
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={compactMode}
              onToggle={setCompactMode}
              label="Compact Mode"
              description="Reduce spacing for denser information display"
            />
          </div>
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <Toggle
              enabled={showPnlInSol}
              onToggle={setShowPnlInSol}
              label="Show P&L in SOL"
              description="Display profit/loss in SOL instead of USD"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <button className="btn-secondary">Reset to Defaults</button>
        <button className="btn-primary">
          <CheckCircle2 className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
