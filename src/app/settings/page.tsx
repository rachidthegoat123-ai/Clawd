"use client";

import { useState } from "react";
import {
  Settings,
  Fuel,
  Shield,
  Bell,
  Palette,
  Key,
  Smartphone,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import Toggle from "@/components/Toggle";

type GasPreference = "slow" | "standard" | "fast";

export default function SettingsPage() {
  // Gas
  const [gasPreference, setGasPreference] = useState<GasPreference>("standard");

  // Security
  const [walletConnected, setWalletConnected] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Notifications
  const [pushNotifications, setPushNotifications] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  // Notifications - What to notify
  const [notifyExecutions, setNotifyExecutions] = useState(true);
  const [notifySkips, setNotifySkips] = useState(true);
  const [notifyProfitTarget, setNotifyProfitTarget] = useState(true);
  const [notifyStopLoss, setNotifyStopLoss] = useState(true);

  // Display
  const [compactMode, setCompactMode] = useState(false);
  const [showPnlInUsd, setShowPnlInUsd] = useState(true);

  const gasOptions: {
    key: GasPreference;
    label: string;
    speed: string;
    desc: string;
  }[] = [
    {
      key: "slow",
      label: "Eco",
      speed: "~2 min",
      desc: "Cheapest gas, slower confirmation",
    },
    {
      key: "standard",
      label: "Standard",
      speed: "~30 sec",
      desc: "Balanced speed and cost",
    },
    {
      key: "fast",
      label: "Priority",
      speed: "~10 sec",
      desc: "Fastest execution, higher gas",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure your preferences, security, and notifications
        </p>
      </div>

      {/* ========== GAS PREFERENCES ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center">
            <Fuel className="w-5 h-5 text-accent-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Gas Preferences
            </h2>
            <p className="text-xs text-gray-500">
              Choose your default transaction speed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {gasOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setGasPreference(option.key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                gasPreference === option.key
                  ? "border-accent-yellow/50 bg-accent-yellow/5"
                  : "border-dark-500/50 bg-dark-800/30 hover:border-dark-500"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-sm font-semibold ${
                    gasPreference === option.key
                      ? "text-gray-100"
                      : "text-gray-300"
                  }`}
                >
                  {option.label}
                </p>
                <span
                  className={`text-xs ${
                    gasPreference === option.key
                      ? "text-accent-yellow"
                      : "text-gray-500"
                  }`}
                >
                  {option.speed}
                </span>
              </div>
              <p className="text-xs text-gray-500">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ========== SECURITY ========== */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-green" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Security</h2>
            <p className="text-xs text-gray-500">
              Wallet connection and key management
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Wallet Connection */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Wallet Connection
                  </p>
                  <p className="text-xs text-gray-500">
                    {walletConnected
                      ? "Connected to 0x7a16...5428"
                      : "No wallet connected"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWalletConnected(!walletConnected)}
                className={
                  walletConnected
                    ? "btn-danger text-sm py-2"
                    : "btn-primary text-sm py-2"
                }
              >
                {walletConnected ? "Disconnect" : "Connect Wallet"}
              </button>
            </div>
          </div>

          {/* API Key */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Key className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Private Key / Seed Phrase
                </p>
                <p className="text-xs text-gray-500">
                  Encrypted and stored locally — never sent to any server
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                placeholder="Enter private key or seed phrase..."
                className="input-field text-sm pr-10 font-mono"
                readOnly
                value="•••••••••••••••••••••••••••••••••••"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-yellow" />
              <span className="text-xs text-accent-yellow">
                Never share your private key. Alpha Mirror stores it encrypted
                on your device only.
              </span>
            </div>
          </div>

          {/* Network */}
          <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Default Network
                </p>
                <p className="text-xs text-gray-500">
                  Auto-detect based on tracked wallet chain
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {["Ethereum", "Solana", "Base", "Arbitrum"].map((network) => (
                <span
                  key={network}
                  className="px-3 py-1.5 rounded-lg bg-dark-600 border border-dark-500 text-xs text-gray-300"
                >
                  {network}
                </span>
              ))}
            </div>
          </div>
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
                description="Get instant messages via Telegram bot"
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
                description="Daily summary of all trades and P&L"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={soundAlerts}
                onToggle={setSoundAlerts}
                label="Sound Alerts"
                description="Play a sound when a trade is detected"
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
                enabled={notifyExecutions}
                onToggle={setNotifyExecutions}
                label="Trade Executed"
                description="When the agent successfully mirrors a trade"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifySkips}
                onToggle={setNotifySkips}
                label="Trade Skipped"
                description="When the agent skips a trade due to safety filters"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifyProfitTarget}
                onToggle={setNotifyProfitTarget}
                label="Profit Target Hit"
                description="When a position reaches your take-profit level"
              />
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-500/30">
              <Toggle
                enabled={notifyStopLoss}
                onToggle={setNotifyStopLoss}
                label="Stop-Loss Triggered"
                description="When a trailing stop-loss activates"
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
              enabled={showPnlInUsd}
              onToggle={setShowPnlInUsd}
              label="Show P&L in USD"
              description="Display profit/loss in USD instead of native token"
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
