"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Radio,
  Settings,
  SlidersHorizontal,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inner-circle", label: "Inner Circle", icon: Users },
  { href: "/feed", label: "Live Feed", icon: Radio },
  { href: "/trade-settings", label: "Trade Settings", icon: SlidersHorizontal },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-dark-800 border-r border-dark-500/50 flex flex-col z-50 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-dark-500/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-dark-900" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold gradient-text">Alpha Mirror</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Smart Money Tracker
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "nav-link-active" : "nav-link"}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Agent Status */}
      <div className="p-4 border-t border-dark-500/50">
        {!collapsed ? (
          <div className="glass-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              <span className="text-xs font-medium text-accent-green">
                Agent Online
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Zap className="w-3 h-3" />
              <span>Monitoring 6 wallets</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-dark-600 border border-dark-500 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-dark-500 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}
