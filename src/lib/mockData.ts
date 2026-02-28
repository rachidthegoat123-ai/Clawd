export interface TrackedWallet {
  address: string;
  nickname: string;
  emoji: string;
  winRate: number;
  totalProfitUsd: number;
  totalProfitPercent: number;
  riskLevel: "Conservative" | "Moderate" | "Aggressive";
  chain: "ETH" | "SOL" | "BASE" | "ARB";
  favoriteTokens: string[];
  biggestWin: { token: string; profit: number };
  totalTrades: number;
  isActive: boolean;
  lastActive: string;
  portfolioValue: number;
}

export interface ActivityItem {
  id: string;
  walletNickname: string;
  walletEmoji: string;
  action: "BUY" | "SELL" | "SWAP";
  token: string;
  tokenSymbol: string;
  amount: number;
  chain: string;
  platform: string;
  timestamp: string;
  agentStatus: "analyzing" | "copying" | "skipped" | "executed" | "waiting";
  agentReason?: string;
  safetyScore: number;
  verified: boolean;
}

export interface PortfolioSnapshot {
  date: string;
  value: number;
  pnl: number;
}

export interface MirrorPosition {
  token: string;
  symbol: string;
  entryPrice: number;
  currentPrice: number;
  amount: number;
  pnlPercent: number;
  pnlUsd: number;
  mirroredFrom: string;
  chain: string;
  timestamp: string;
}

export const trackedWallets: TrackedWallet[] = [
  {
    address: "0x7a16fF8270133F063aAb6C9977183D9e72835428",
    nickname: "The Solana Sniper",
    emoji: "🎯",
    winRate: 78.4,
    totalProfitUsd: 2_450_000,
    totalProfitPercent: 1240,
    riskLevel: "Aggressive",
    chain: "SOL",
    favoriteTokens: ["SOL", "JUP", "WIF", "BONK"],
    biggestWin: { token: "WIF", profit: 890_000 },
    totalTrades: 342,
    isActive: true,
    lastActive: "2 min ago",
    portfolioValue: 4_200_000,
  },
  {
    address: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    nickname: "The ETH Whale",
    emoji: "🐋",
    winRate: 72.1,
    totalProfitUsd: 8_900_000,
    totalProfitPercent: 680,
    riskLevel: "Conservative",
    chain: "ETH",
    favoriteTokens: ["ETH", "LINK", "AAVE", "UNI"],
    biggestWin: { token: "LINK", profit: 2_100_000 },
    totalTrades: 187,
    isActive: true,
    lastActive: "15 min ago",
    portfolioValue: 22_500_000,
  },
  {
    address: "0x8894E0a0c962CB723c1ef8a1Bc6e4367A2e1C6d0",
    nickname: "Alpha-1",
    emoji: "🧠",
    winRate: 85.2,
    totalProfitUsd: 1_200_000,
    totalProfitPercent: 3200,
    riskLevel: "Moderate",
    chain: "BASE",
    favoriteTokens: ["BRETT", "DEGEN", "AERO", "TOSHI"],
    biggestWin: { token: "BRETT", profit: 540_000 },
    totalTrades: 520,
    isActive: true,
    lastActive: "Just now",
    portfolioValue: 1_800_000,
  },
  {
    address: "0xDef1C0ded9bec7F1a1670819833240F027b25EfF",
    nickname: "The Degen King",
    emoji: "👑",
    winRate: 61.8,
    totalProfitUsd: 5_600_000,
    totalProfitPercent: 920,
    riskLevel: "Aggressive",
    chain: "ETH",
    favoriteTokens: ["PEPE", "SHIB", "FLOKI", "TURBO"],
    biggestWin: { token: "PEPE", profit: 3_200_000 },
    totalTrades: 892,
    isActive: false,
    lastActive: "3 hours ago",
    portfolioValue: 8_100_000,
  },
  {
    address: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
    nickname: "The VC Insider",
    emoji: "🏦",
    winRate: 89.5,
    totalProfitUsd: 15_400_000,
    totalProfitPercent: 450,
    riskLevel: "Conservative",
    chain: "ETH",
    favoriteTokens: ["ETH", "ARB", "OP", "MATIC"],
    biggestWin: { token: "ARB", profit: 4_800_000 },
    totalTrades: 95,
    isActive: true,
    lastActive: "45 min ago",
    portfolioValue: 42_000_000,
  },
  {
    address: "0x28C6c06298d514Db089934071355E5743bf21d60",
    nickname: "The Base Builder",
    emoji: "🔨",
    winRate: 74.3,
    totalProfitUsd: 980_000,
    totalProfitPercent: 1800,
    riskLevel: "Moderate",
    chain: "BASE",
    favoriteTokens: ["BRETT", "DEGEN", "WELL", "cbETH"],
    biggestWin: { token: "DEGEN", profit: 320_000 },
    totalTrades: 410,
    isActive: true,
    lastActive: "8 min ago",
    portfolioValue: 1_250_000,
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "1",
    walletNickname: "Alpha-1",
    walletEmoji: "🧠",
    action: "BUY",
    token: "Chainlink",
    tokenSymbol: "LINK",
    amount: 52_000,
    chain: "ETH",
    platform: "Uniswap V3",
    timestamp: "Just now",
    agentStatus: "analyzing",
    safetyScore: 95,
    verified: true,
  },
  {
    id: "2",
    walletNickname: "The Solana Sniper",
    walletEmoji: "🎯",
    action: "BUY",
    token: "Jupiter",
    tokenSymbol: "JUP",
    amount: 125_000,
    chain: "SOL",
    platform: "Jupiter",
    timestamp: "2 min ago",
    agentStatus: "executed",
    safetyScore: 92,
    verified: true,
  },
  {
    id: "3",
    walletNickname: "The Degen King",
    walletEmoji: "👑",
    action: "BUY",
    token: "SuspiciousCoin",
    tokenSymbol: "SCAM",
    amount: 15_000,
    chain: "ETH",
    platform: "Uniswap V2",
    timestamp: "5 min ago",
    agentStatus: "skipped",
    agentReason: "Token flagged as potential rug-pull. Low liquidity ($12k pool). Not verified on Etherscan.",
    safetyScore: 12,
    verified: false,
  },
  {
    id: "4",
    walletNickname: "The ETH Whale",
    walletEmoji: "🐋",
    action: "SELL",
    token: "Aave",
    tokenSymbol: "AAVE",
    amount: 340_000,
    chain: "ETH",
    platform: "Uniswap V3",
    timestamp: "12 min ago",
    agentStatus: "executed",
    safetyScore: 98,
    verified: true,
  },
  {
    id: "5",
    walletNickname: "The Base Builder",
    walletEmoji: "🔨",
    action: "BUY",
    token: "Aerodrome",
    tokenSymbol: "AERO",
    amount: 28_000,
    chain: "BASE",
    platform: "Aerodrome",
    timestamp: "18 min ago",
    agentStatus: "executed",
    safetyScore: 88,
    verified: true,
  },
  {
    id: "6",
    walletNickname: "The VC Insider",
    walletEmoji: "🏦",
    action: "BUY",
    token: "Optimism",
    tokenSymbol: "OP",
    amount: 750_000,
    chain: "ETH",
    platform: "1inch",
    timestamp: "32 min ago",
    agentStatus: "waiting",
    agentReason: "Trade exceeds your configured maximum ($500k). Awaiting manual approval.",
    safetyScore: 96,
    verified: true,
  },
  {
    id: "7",
    walletNickname: "Alpha-1",
    walletEmoji: "🧠",
    action: "SWAP",
    token: "Brett",
    tokenSymbol: "BRETT",
    amount: 18_500,
    chain: "BASE",
    platform: "Aerodrome",
    timestamp: "45 min ago",
    agentStatus: "executed",
    safetyScore: 82,
    verified: true,
  },
  {
    id: "8",
    walletNickname: "The Solana Sniper",
    walletEmoji: "🎯",
    action: "BUY",
    token: "dogwifhat",
    tokenSymbol: "WIF",
    amount: 88_000,
    chain: "SOL",
    platform: "Raydium",
    timestamp: "1 hour ago",
    agentStatus: "executed",
    safetyScore: 76,
    verified: true,
  },
];

export const portfolioHistory: PortfolioSnapshot[] = [
  { date: "Feb 1", value: 50000, pnl: 0 },
  { date: "Feb 3", value: 51200, pnl: 1200 },
  { date: "Feb 5", value: 49800, pnl: -200 },
  { date: "Feb 7", value: 53400, pnl: 3400 },
  { date: "Feb 9", value: 56100, pnl: 6100 },
  { date: "Feb 11", value: 54800, pnl: 4800 },
  { date: "Feb 13", value: 58200, pnl: 8200 },
  { date: "Feb 15", value: 61500, pnl: 11500 },
  { date: "Feb 17", value: 59800, pnl: 9800 },
  { date: "Feb 19", value: 63200, pnl: 13200 },
  { date: "Feb 21", value: 67800, pnl: 17800 },
  { date: "Feb 23", value: 65400, pnl: 15400 },
  { date: "Feb 25", value: 71200, pnl: 21200 },
  { date: "Feb 27", value: 74500, pnl: 24500 },
  { date: "Feb 28", value: 78200, pnl: 28200 },
];

export const activePositions: MirrorPosition[] = [
  {
    token: "Chainlink",
    symbol: "LINK",
    entryPrice: 18.42,
    currentPrice: 22.87,
    amount: 2800,
    pnlPercent: 24.16,
    pnlUsd: 12_460,
    mirroredFrom: "Alpha-1",
    chain: "ETH",
    timestamp: "2 days ago",
  },
  {
    token: "Jupiter",
    symbol: "JUP",
    entryPrice: 1.12,
    currentPrice: 1.48,
    amount: 45000,
    pnlPercent: 32.14,
    pnlUsd: 16_200,
    mirroredFrom: "The Solana Sniper",
    chain: "SOL",
    timestamp: "5 days ago",
  },
  {
    token: "Aerodrome",
    symbol: "AERO",
    entryPrice: 1.85,
    currentPrice: 1.72,
    amount: 12000,
    pnlPercent: -7.03,
    pnlUsd: -1_560,
    mirroredFrom: "The Base Builder",
    chain: "BASE",
    timestamp: "1 day ago",
  },
  {
    token: "Optimism",
    symbol: "OP",
    entryPrice: 3.24,
    currentPrice: 3.89,
    amount: 8500,
    pnlPercent: 20.06,
    pnlUsd: 5_525,
    mirroredFrom: "The VC Insider",
    chain: "ETH",
    timestamp: "3 days ago",
  },
  {
    token: "Brett",
    symbol: "BRETT",
    entryPrice: 0.142,
    currentPrice: 0.168,
    amount: 120000,
    pnlPercent: 18.31,
    pnlUsd: 3_120,
    mirroredFrom: "Alpha-1",
    chain: "BASE",
    timestamp: "4 days ago",
  },
];

export function formatUsd(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
