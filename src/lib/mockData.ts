// ============================================================
// PUMP.FUN DATA MODELS
// Accurate to the pump.fun ecosystem as of 2025/2026:
// - Bonding curve: 800M of 1B tokens on curve, graduates at ~$69K mcap
// - Graduation: Goes to PumpSwap (not Raydium) since March 2025
// - KOTH: King of the Hill at ~$30K mcap (~45 SOL)
// - Fees: 1% on bonding curve, 0.25% on PumpSwap
// - Only ~1-2% of tokens ever graduate
// ============================================================

export interface TrackedWallet {
  address: string;
  nickname: string;
  emoji: string;
  // Performance — total profit matters more than win rate for copy trading
  winRate: number;
  totalProfitSol: number;
  avgMultiplier: string;
  // Play style
  riskLevel: "Conservative" | "Moderate" | "Degen";
  avgEntryMcap: string;
  avgHoldTime: string;
  favoritePlay: string;
  biggestWin: { token: string; multiplier: string; profitSol: number };
  // Volume
  totalTrades: number;
  tokensAped: number;
  rugsHit: number;
  // Copy-trade density — heavily copied wallets cause slippage
  copiers: number;
  // Status
  isActive: boolean;
  lastActive: string;
  portfolioValueSol: number;
}

export interface ActivityItem {
  id: string;
  walletNickname: string;
  walletEmoji: string;
  action: "BUY" | "SELL" | "SNIPE";
  token: string;
  tokenTicker: string;
  amountSol: number;
  // Market state at time of trade
  marketCap: number;
  bondingCurveProgress: number; // 0-100, 100 = graduated
  solInBondingCurve: number;
  platform: "pump.fun" | "PumpSwap" | "Jupiter";
  timestamp: string;
  // Agent decision
  agentStatus: "analyzing" | "sniping" | "skipped" | "executed" | "waiting";
  agentReason?: string;
  // Pump.fun-specific safety signals
  safetyScore: number;
  tokenAgeMins: number;
  uniqueBuyers: number;
  devHoldingPercent: number;
  devSold: boolean;
  isBundled: boolean;
  topHolderPercent: number; // % held by top 10 wallets
  hasSocials: boolean; // whether token has Twitter/Telegram/website linked on pump.fun
  replyCount: number; // number of replies on the pump.fun token page
  creatorTokenCount: number; // how many tokens this creator has launched
  creatorRugCount: number; // how many of those rugged
  graduated: boolean;
  isKOTH: boolean; // is/was King of the Hill
}

export interface PortfolioSnapshot {
  date: string;
  valueSol: number;
  pnlSol: number;
}

export interface MirrorPosition {
  token: string;
  ticker: string;
  entryMcap: number;
  currentMcap: number;
  entrySol: number;
  currentValueSol: number;
  multiplier: string;
  pnlSol: number;
  mirroredFrom: string;
  bondingCurveProgress: number;
  graduated: boolean;
  tokenAgeMins: number;
  holdTimeMins: number;
  timestamp: string;
}

// ============================================================
// MOCK WALLETS — realistic pump.fun trader profiles
// ============================================================

export const trackedWallets: TrackedWallet[] = [
  {
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    nickname: "The Block-0 Sniper",
    emoji: "🎯",
    winRate: 42.1, // low win rate but massive multipliers on wins
    totalProfitSol: 8_420,
    avgMultiplier: "18.4x",
    riskLevel: "Degen",
    avgEntryMcap: "$4.8K",
    avgHoldTime: "6 min",
    favoritePlay: "First-block snipes, sell before KOTH",
    biggestWin: { token: "$MICHI", multiplier: "142x", profitSol: 2_200 },
    totalTrades: 1_842,
    tokensAped: 620,
    rugsHit: 89,
    copiers: 340,
    isActive: true,
    lastActive: "Just now",
    portfolioValueSol: 12_500,
  },
  {
    address: "5ZWj7a1f8tWkjBESHKgrLmU2ziW4Z6wLnoRBg2eqRFhh",
    nickname: "Graduation Whale",
    emoji: "🐋",
    winRate: 68.5,
    totalProfitSol: 24_800,
    avgMultiplier: "4.2x",
    riskLevel: "Moderate",
    avgEntryMcap: "$42K",
    avgHoldTime: "35 min",
    favoritePlay: "Pre-graduation entries, sell post-PumpSwap migration",
    biggestWin: { token: "$WIF", multiplier: "86x", profitSol: 8_900 },
    totalTrades: 945,
    tokensAped: 380,
    rugsHit: 42,
    copiers: 1_200,
    isActive: true,
    lastActive: "3 min ago",
    portfolioValueSol: 45_000,
  },
  {
    address: "3Kf9nGjSR6RkBbKzMWYqVhSWwY7BUfjz5kNGt4KPzjEo",
    nickname: "Degen Larry",
    emoji: "🧠",
    winRate: 38.4, // very low win rate, insane winners
    totalProfitSol: 5_200,
    avgMultiplier: "32.1x",
    riskLevel: "Degen",
    avgEntryMcap: "$3.2K",
    avgHoldTime: "3 min",
    favoritePlay: "Micro-cap snipes, sells fast on any 5x",
    biggestWin: { token: "$POPCAT", multiplier: "210x", profitSol: 1_800 },
    totalTrades: 3_240,
    tokensAped: 1_100,
    rugsHit: 198,
    copiers: 85,
    isActive: true,
    lastActive: "Just now",
    portfolioValueSol: 6_800,
  },
  {
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    nickname: "KOTH Hunter",
    emoji: "👑",
    winRate: 61.2,
    totalProfitSol: 15_600,
    avgMultiplier: "6.8x",
    riskLevel: "Moderate",
    avgEntryMcap: "$18K",
    avgHoldTime: "22 min",
    favoritePlay: "Buys tokens approaching KOTH (~$30K), sells on visibility pump",
    biggestWin: { token: "$BONK", multiplier: "52x", profitSol: 5_400 },
    totalTrades: 680,
    tokensAped: 290,
    rugsHit: 31,
    copiers: 520,
    isActive: true,
    lastActive: "12 min ago",
    portfolioValueSol: 22_000,
  },
  {
    address: "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz",
    nickname: "Volume King",
    emoji: "⚡",
    winRate: 35.8,
    totalProfitSol: 32_000,
    avgMultiplier: "8.2x",
    riskLevel: "Degen",
    avgEntryMcap: "$6K",
    avgHoldTime: "4 min",
    favoritePlay: "High-frequency sniping, 50+ trades/day",
    biggestWin: { token: "$SLERF", multiplier: "320x", profitSol: 12_000 },
    totalTrades: 4_800,
    tokensAped: 2_100,
    rugsHit: 480,
    copiers: 2_400,
    isActive: false,
    lastActive: "2 hours ago",
    portfolioValueSol: 55_000,
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    nickname: "Safe Ape",
    emoji: "🛡️",
    winRate: 76.4,
    totalProfitSol: 3_900,
    avgMultiplier: "3.1x",
    riskLevel: "Conservative",
    avgEntryMcap: "$55K",
    avgHoldTime: "2 hours",
    favoritePlay: "Post-graduation PumpSwap entries only, heavy filtering",
    biggestWin: { token: "$BOME", multiplier: "28x", profitSol: 1_200 },
    totalTrades: 520,
    tokensAped: 180,
    rugsHit: 12,
    copiers: 180,
    isActive: true,
    lastActive: "8 min ago",
    portfolioValueSol: 5_200,
  },
];

// ============================================================
// MOCK ACTIVITY FEED — accurate pump.fun signals
// ============================================================

export const activityFeed: ActivityItem[] = [
  {
    id: "1",
    walletNickname: "The Block-0 Sniper",
    walletEmoji: "🎯",
    action: "SNIPE",
    token: "Peanut the Squirrel",
    tokenTicker: "$PNUT",
    amountSol: 12.5,
    marketCap: 4_200,
    bondingCurveProgress: 6,
    solInBondingCurve: 5.1,
    platform: "pump.fun",
    timestamp: "Just now",
    agentStatus: "analyzing",
    safetyScore: 72,
    tokenAgeMins: 0.5,
    uniqueBuyers: 8,
    devHoldingPercent: 2.1,
    devSold: false,
    isBundled: false,
    topHolderPercent: 45,
    hasSocials: true,
    replyCount: 12,
    creatorTokenCount: 2,
    creatorRugCount: 0,
    graduated: false,
    isKOTH: false,
  },
  {
    id: "2",
    walletNickname: "Degen Larry",
    walletEmoji: "🧠",
    action: "SNIPE",
    token: "Based Cat",
    tokenTicker: "$BCAT",
    amountSol: 5.2,
    marketCap: 8_400,
    bondingCurveProgress: 12,
    solInBondingCurve: 10.2,
    platform: "pump.fun",
    timestamp: "30 sec ago",
    agentStatus: "executed",
    safetyScore: 65,
    tokenAgeMins: 2,
    uniqueBuyers: 18,
    devHoldingPercent: 4.5,
    devSold: false,
    isBundled: false,
    topHolderPercent: 52,
    hasSocials: true,
    replyCount: 24,
    creatorTokenCount: 1,
    creatorRugCount: 0,
    graduated: false,
    isKOTH: false,
  },
  {
    id: "3",
    walletNickname: "Volume King",
    walletEmoji: "⚡",
    action: "BUY",
    token: "CabalCoin",
    tokenTicker: "$CABAL",
    amountSol: 25.0,
    marketCap: 14_000,
    bondingCurveProgress: 20,
    solInBondingCurve: 17.1,
    platform: "pump.fun",
    timestamp: "2 min ago",
    agentStatus: "skipped",
    agentReason:
      "Bundled launch — deployer and first 12 buyers funded from the same wallet. Top 10 holders control 91% of supply. Creator has launched 14 tokens in the past week, 11 of which dumped within 5 minutes.",
    safetyScore: 6,
    tokenAgeMins: 4,
    uniqueBuyers: 15,
    devHoldingPercent: 0,
    devSold: true,
    isBundled: true,
    topHolderPercent: 91,
    hasSocials: false,
    replyCount: 2,
    creatorTokenCount: 14,
    creatorRugCount: 11,
    graduated: false,
    isKOTH: false,
  },
  {
    id: "4",
    walletNickname: "Graduation Whale",
    walletEmoji: "🐋",
    action: "BUY",
    token: "Moo Deng",
    tokenTicker: "$MOODENG",
    amountSol: 85.0,
    marketCap: 320_000,
    bondingCurveProgress: 100,
    solInBondingCurve: 85,
    platform: "PumpSwap",
    timestamp: "5 min ago",
    agentStatus: "executed",
    safetyScore: 92,
    tokenAgeMins: 180,
    uniqueBuyers: 2_840,
    devHoldingPercent: 0.8,
    devSold: false,
    isBundled: false,
    topHolderPercent: 18,
    hasSocials: true,
    replyCount: 340,
    creatorTokenCount: 3,
    creatorRugCount: 0,
    graduated: true,
    isKOTH: false,
  },
  {
    id: "5",
    walletNickname: "KOTH Hunter",
    walletEmoji: "👑",
    action: "BUY",
    token: "SolFighter",
    tokenTicker: "$FIGHT",
    amountSol: 42.0,
    marketCap: 28_000,
    bondingCurveProgress: 40,
    solInBondingCurve: 34.2,
    platform: "pump.fun",
    timestamp: "8 min ago",
    agentStatus: "sniping",
    safetyScore: 78,
    tokenAgeMins: 12,
    uniqueBuyers: 145,
    devHoldingPercent: 1.8,
    devSold: false,
    isBundled: false,
    topHolderPercent: 28,
    hasSocials: true,
    replyCount: 89,
    creatorTokenCount: 1,
    creatorRugCount: 0,
    graduated: false,
    isKOTH: true,
  },
  {
    id: "6",
    walletNickname: "Safe Ape",
    walletEmoji: "🛡️",
    action: "SELL",
    token: "dogwifhat",
    tokenTicker: "$WIF",
    amountSol: 220.0,
    marketCap: 1_200_000,
    bondingCurveProgress: 100,
    solInBondingCurve: 85,
    platform: "Jupiter",
    timestamp: "15 min ago",
    agentStatus: "executed",
    safetyScore: 96,
    tokenAgeMins: 14_400,
    uniqueBuyers: 45_000,
    devHoldingPercent: 0,
    devSold: false,
    isBundled: false,
    topHolderPercent: 8,
    hasSocials: true,
    replyCount: 8_200,
    creatorTokenCount: 1,
    creatorRugCount: 0,
    graduated: true,
    isKOTH: false,
  },
  {
    id: "7",
    walletNickname: "The Block-0 Sniper",
    walletEmoji: "🎯",
    action: "SNIPE",
    token: "QuickFlip",
    tokenTicker: "$QFLIP",
    amountSol: 8.0,
    marketCap: 5_200,
    bondingCurveProgress: 7,
    solInBondingCurve: 6.0,
    platform: "pump.fun",
    timestamp: "22 min ago",
    agentStatus: "skipped",
    agentReason:
      "Serial rugger detected — creator has launched 22 tokens, 18 of which dumped within 5 minutes. No socials linked. Top 10 holders control 72% of supply. Dev still holds 8.2%.",
    safetyScore: 4,
    tokenAgeMins: 1,
    uniqueBuyers: 5,
    devHoldingPercent: 8.2,
    devSold: false,
    isBundled: false,
    topHolderPercent: 72,
    hasSocials: false,
    replyCount: 0,
    creatorTokenCount: 22,
    creatorRugCount: 18,
    graduated: false,
    isKOTH: false,
  },
  {
    id: "8",
    walletNickname: "Degen Larry",
    walletEmoji: "🧠",
    action: "SNIPE",
    token: "SolanaFomo",
    tokenTicker: "$FOMO",
    amountSol: 3.0,
    marketCap: 3_100,
    bondingCurveProgress: 4,
    solInBondingCurve: 3.4,
    platform: "pump.fun",
    timestamp: "35 min ago",
    agentStatus: "waiting",
    agentReason:
      "Bundled launch detected — deployer and first 5 buyers share same funding source. 3 of these wallets are brand new (created this block). Awaiting manual review.",
    safetyScore: 18,
    tokenAgeMins: 0.3,
    uniqueBuyers: 6,
    devHoldingPercent: 0,
    devSold: false,
    isBundled: true,
    topHolderPercent: 88,
    hasSocials: false,
    replyCount: 1,
    creatorTokenCount: 8,
    creatorRugCount: 5,
    graduated: false,
    isKOTH: false,
  },
];

// ============================================================
// PORTFOLIO HISTORY
// ============================================================

export const portfolioHistory: PortfolioSnapshot[] = [
  { date: "Feb 1", valueSol: 120, pnlSol: 0 },
  { date: "Feb 3", valueSol: 135, pnlSol: 15 },
  { date: "Feb 5", valueSol: 112, pnlSol: -8 },
  { date: "Feb 7", valueSol: 168, pnlSol: 48 },
  { date: "Feb 9", valueSol: 210, pnlSol: 90 },
  { date: "Feb 11", valueSol: 185, pnlSol: 65 },
  { date: "Feb 13", valueSol: 245, pnlSol: 125 },
  { date: "Feb 15", valueSol: 310, pnlSol: 190 },
  { date: "Feb 17", valueSol: 280, pnlSol: 160 },
  { date: "Feb 19", valueSol: 365, pnlSol: 245 },
  { date: "Feb 21", valueSol: 420, pnlSol: 300 },
  { date: "Feb 23", valueSol: 388, pnlSol: 268 },
  { date: "Feb 25", valueSol: 475, pnlSol: 355 },
  { date: "Feb 27", valueSol: 520, pnlSol: 400 },
  { date: "Feb 28", valueSol: 548, pnlSol: 428 },
];

// ============================================================
// ACTIVE POSITIONS
// ============================================================

export const activePositions: MirrorPosition[] = [
  {
    token: "Peanut the Squirrel",
    ticker: "$PNUT",
    entryMcap: 4_200,
    currentMcap: 82_000,
    entrySol: 12.5,
    currentValueSol: 245.0,
    multiplier: "19.6x",
    pnlSol: 232.5,
    mirroredFrom: "The Block-0 Sniper",
    bondingCurveProgress: 95,
    graduated: false,
    tokenAgeMins: 45,
    holdTimeMins: 44,
    timestamp: "44 min ago",
  },
  {
    token: "Based Cat",
    ticker: "$BCAT",
    entryMcap: 8_400,
    currentMcap: 42_000,
    entrySol: 5.2,
    currentValueSol: 26.0,
    multiplier: "5.0x",
    pnlSol: 20.8,
    mirroredFrom: "Degen Larry",
    bondingCurveProgress: 61,
    graduated: false,
    tokenAgeMins: 32,
    holdTimeMins: 30,
    timestamp: "30 min ago",
  },
  {
    token: "Moo Deng",
    ticker: "$MOODENG",
    entryMcap: 52_000,
    currentMcap: 420_000,
    entrySol: 42.0,
    currentValueSol: 339.0,
    multiplier: "8.1x",
    pnlSol: 297.0,
    mirroredFrom: "Graduation Whale",
    bondingCurveProgress: 100,
    graduated: true,
    tokenAgeMins: 1_200,
    holdTimeMins: 960,
    timestamp: "16 hours ago",
  },
  {
    token: "SolFighter",
    ticker: "$FIGHT",
    entryMcap: 28_000,
    currentMcap: 24_000,
    entrySol: 42.0,
    currentValueSol: 36.0,
    multiplier: "0.86x",
    pnlSol: -6.0,
    mirroredFrom: "KOTH Hunter",
    bondingCurveProgress: 35,
    graduated: false,
    tokenAgeMins: 20,
    holdTimeMins: 8,
    timestamp: "8 min ago",
  },
  {
    token: "SolanaFomo",
    ticker: "$FOMO",
    entryMcap: 3_100,
    currentMcap: 18_500,
    entrySol: 3.0,
    currentValueSol: 17.9,
    multiplier: "6.0x",
    pnlSol: 14.9,
    mirroredFrom: "Degen Larry",
    bondingCurveProgress: 27,
    graduated: false,
    tokenAgeMins: 40,
    holdTimeMins: 35,
    timestamp: "35 min ago",
  },
];

// ============================================================
// UTILITIES
// ============================================================

export function formatSol(value: number): string {
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K SOL`;
  }
  if (Math.abs(value) >= 100) {
    return `${value.toFixed(0)} SOL`;
  }
  return `${value.toFixed(1)} SOL`;
}

export function formatMcap(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatAge(mins: number): string {
  if (mins < 1) return `${Math.round(mins * 60)}s`;
  if (mins < 60) return `${Math.round(mins)}m`;
  if (mins < 1440) return `${(mins / 60).toFixed(1)}h`;
  return `${(mins / 1440).toFixed(1)}d`;
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
