export interface TrackedWallet {
  address: string;
  nickname: string;
  emoji: string;
  winRate: number;
  totalProfitSol: number;
  totalProfitPercent: number;
  riskLevel: "Conservative" | "Moderate" | "Degen";
  avgEntryMcap: string;
  favoritePlay: string;
  biggestWin: { token: string; profitSol: number; multiplier: string };
  totalTrades: number;
  tokensAped: number;
  rugsPulled: number;
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
  tokenImage?: string;
  amountSol: number;
  marketCap: number;
  bondingCurvePercent: number;
  platform: "pump.fun" | "Raydium" | "Jupiter";
  timestamp: string;
  agentStatus: "analyzing" | "copying" | "skipped" | "executed" | "waiting";
  agentReason?: string;
  safetyScore: number;
  holderCount: number;
  devSold: boolean;
  graduated: boolean;
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
  pnlPercent: number;
  pnlSol: number;
  mirroredFrom: string;
  bondingCurvePercent: number;
  graduated: boolean;
  timestamp: string;
}

export const trackedWallets: TrackedWallet[] = [
  {
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    nickname: "The Pump Sniper",
    emoji: "🎯",
    winRate: 74.2,
    totalProfitSol: 8_420,
    totalProfitPercent: 2_840,
    riskLevel: "Degen",
    avgEntryMcap: "$5K",
    favoritePlay: "First-block snipes",
    biggestWin: { token: "$MICHI", profitSol: 2_200, multiplier: "142x" },
    totalTrades: 1_842,
    tokensAped: 620,
    rugsPulled: 89,
    isActive: true,
    lastActive: "Just now",
    portfolioValueSol: 12_500,
  },
  {
    address: "5ZWj7a1f8tWkjBESHKgrLmU2ziW4Z6wLnoRBg2eqRFhh",
    nickname: "Pump Whale",
    emoji: "🐋",
    winRate: 68.5,
    totalProfitSol: 24_800,
    totalProfitPercent: 1_650,
    riskLevel: "Moderate",
    avgEntryMcap: "$25K",
    favoritePlay: "Bonding curve completions",
    biggestWin: { token: "$WIF", profitSol: 8_900, multiplier: "86x" },
    totalTrades: 945,
    tokensAped: 380,
    rugsPulled: 42,
    isActive: true,
    lastActive: "3 min ago",
    portfolioValueSol: 45_000,
  },
  {
    address: "3Kf9nGjSR6RkBbKzMWYqVhSWwY7BUfjz5kNGt4KPzjEo",
    nickname: "Degen Larry",
    emoji: "🧠",
    winRate: 82.1,
    totalProfitSol: 5_200,
    totalProfitPercent: 4_100,
    riskLevel: "Degen",
    avgEntryMcap: "$3K",
    favoritePlay: "Micro-cap sniping",
    biggestWin: { token: "$POPCAT", profitSol: 1_800, multiplier: "210x" },
    totalTrades: 3_240,
    tokensAped: 1_100,
    rugsPulled: 198,
    isActive: true,
    lastActive: "Just now",
    portfolioValueSol: 6_800,
  },
  {
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    nickname: "The Graduation Hunter",
    emoji: "🎓",
    winRate: 71.8,
    totalProfitSol: 15_600,
    totalProfitPercent: 2_200,
    riskLevel: "Moderate",
    avgEntryMcap: "$40K",
    favoritePlay: "Pre-graduation plays",
    biggestWin: { token: "$BONK", profitSol: 5_400, multiplier: "52x" },
    totalTrades: 680,
    tokensAped: 290,
    rugsPulled: 31,
    isActive: true,
    lastActive: "12 min ago",
    portfolioValueSol: 22_000,
  },
  {
    address: "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz",
    nickname: "Sol Chad",
    emoji: "👑",
    winRate: 58.9,
    totalProfitSol: 32_000,
    totalProfitPercent: 980,
    riskLevel: "Degen",
    avgEntryMcap: "$8K",
    favoritePlay: "High volume meme plays",
    biggestWin: { token: "$SLERF", profitSol: 12_000, multiplier: "320x" },
    totalTrades: 4_800,
    tokensAped: 2_100,
    rugsPulled: 480,
    isActive: false,
    lastActive: "2 hours ago",
    portfolioValueSol: 55_000,
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    nickname: "The Smart Aper",
    emoji: "🦍",
    winRate: 76.4,
    totalProfitSol: 3_900,
    totalProfitPercent: 3_500,
    riskLevel: "Conservative",
    avgEntryMcap: "$50K",
    favoritePlay: "Post-graduation entries",
    biggestWin: { token: "$BOME", profitSol: 1_200, multiplier: "28x" },
    totalTrades: 520,
    tokensAped: 180,
    rugsPulled: 12,
    isActive: true,
    lastActive: "8 min ago",
    portfolioValueSol: 5_200,
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "1",
    walletNickname: "The Pump Sniper",
    walletEmoji: "🎯",
    action: "SNIPE",
    token: "Peanut the Squirrel",
    tokenTicker: "$PNUT",
    amountSol: 12.5,
    marketCap: 4_200,
    bondingCurvePercent: 8,
    platform: "pump.fun",
    timestamp: "Just now",
    agentStatus: "analyzing",
    safetyScore: 72,
    holderCount: 14,
    devSold: false,
    graduated: false,
  },
  {
    id: "2",
    walletNickname: "Degen Larry",
    walletEmoji: "🧠",
    action: "SNIPE",
    token: "Based Cat",
    tokenTicker: "$BCAT",
    amountSol: 5.2,
    marketCap: 6_800,
    bondingCurvePercent: 15,
    platform: "pump.fun",
    timestamp: "30 sec ago",
    agentStatus: "executed",
    safetyScore: 68,
    holderCount: 23,
    devSold: false,
    graduated: false,
  },
  {
    id: "3",
    walletNickname: "Sol Chad",
    walletEmoji: "👑",
    action: "BUY",
    token: "RugPullInu",
    tokenTicker: "$RUG",
    amountSol: 25.0,
    marketCap: 12_000,
    bondingCurvePercent: 42,
    platform: "pump.fun",
    timestamp: "2 min ago",
    agentStatus: "skipped",
    agentReason:
      "Dev wallet sold 80% of supply. Honeypot pattern detected. Only 8 unique holders — likely wash trading.",
    safetyScore: 8,
    holderCount: 8,
    devSold: true,
    graduated: false,
  },
  {
    id: "4",
    walletNickname: "Pump Whale",
    walletEmoji: "🐋",
    action: "BUY",
    token: "Solana Monkey Business",
    tokenTicker: "$SMB",
    amountSol: 85.0,
    marketCap: 320_000,
    bondingCurvePercent: 100,
    platform: "Raydium",
    timestamp: "5 min ago",
    agentStatus: "executed",
    safetyScore: 91,
    holderCount: 2_840,
    devSold: false,
    graduated: true,
  },
  {
    id: "5",
    walletNickname: "The Graduation Hunter",
    walletEmoji: "🎓",
    action: "BUY",
    token: "Moo Deng",
    tokenTicker: "$MOODENG",
    amountSol: 42.0,
    marketCap: 68_000,
    bondingCurvePercent: 92,
    platform: "pump.fun",
    timestamp: "8 min ago",
    agentStatus: "copying",
    safetyScore: 85,
    holderCount: 890,
    devSold: false,
    graduated: false,
  },
  {
    id: "6",
    walletNickname: "The Smart Aper",
    walletEmoji: "🦍",
    action: "SELL",
    token: "dogwifhat",
    tokenTicker: "$WIF",
    amountSol: 220.0,
    marketCap: 1_200_000,
    bondingCurvePercent: 100,
    platform: "Jupiter",
    timestamp: "15 min ago",
    agentStatus: "executed",
    safetyScore: 95,
    holderCount: 45_000,
    devSold: false,
    graduated: true,
  },
  {
    id: "7",
    walletNickname: "The Pump Sniper",
    walletEmoji: "🎯",
    action: "SELL",
    token: "Cat in a Dogs World",
    tokenTicker: "$MEW",
    amountSol: 180.0,
    marketCap: 890_000,
    bondingCurvePercent: 100,
    platform: "Jupiter",
    timestamp: "22 min ago",
    agentStatus: "executed",
    safetyScore: 88,
    holderCount: 18_200,
    devSold: false,
    graduated: true,
  },
  {
    id: "8",
    walletNickname: "Degen Larry",
    walletEmoji: "🧠",
    action: "SNIPE",
    token: "SolanaFomo",
    tokenTicker: "$FOMO",
    amountSol: 3.0,
    marketCap: 2_100,
    bondingCurvePercent: 3,
    platform: "pump.fun",
    timestamp: "35 min ago",
    agentStatus: "waiting",
    agentReason:
      "Bundled launch detected — deployer and first 5 buyers share same funding source. Awaiting manual review.",
    safetyScore: 22,
    holderCount: 6,
    devSold: false,
    graduated: false,
  },
];

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

export const activePositions: MirrorPosition[] = [
  {
    token: "Peanut the Squirrel",
    ticker: "$PNUT",
    entryMcap: 4_200,
    currentMcap: 82_000,
    entrySol: 12.5,
    currentValueSol: 245.0,
    pnlPercent: 1_860,
    pnlSol: 232.5,
    mirroredFrom: "The Pump Sniper",
    bondingCurvePercent: 88,
    graduated: false,
    timestamp: "2 hours ago",
  },
  {
    token: "Based Cat",
    ticker: "$BCAT",
    entryMcap: 6_800,
    currentMcap: 42_000,
    entrySol: 5.2,
    currentValueSol: 32.1,
    pnlPercent: 517,
    pnlSol: 26.9,
    mirroredFrom: "Degen Larry",
    bondingCurvePercent: 65,
    graduated: false,
    timestamp: "45 min ago",
  },
  {
    token: "Moo Deng",
    ticker: "$MOODENG",
    entryMcap: 68_000,
    currentMcap: 420_000,
    entrySol: 42.0,
    currentValueSol: 259.0,
    pnlPercent: 516,
    pnlSol: 217.0,
    mirroredFrom: "The Graduation Hunter",
    bondingCurvePercent: 100,
    graduated: true,
    timestamp: "1 day ago",
  },
  {
    token: "Solana Monkey Business",
    ticker: "$SMB",
    entryMcap: 320_000,
    currentMcap: 280_000,
    entrySol: 85.0,
    currentValueSol: 74.4,
    pnlPercent: -12.5,
    pnlSol: -10.6,
    mirroredFrom: "Pump Whale",
    bondingCurvePercent: 100,
    graduated: true,
    timestamp: "5 hours ago",
  },
  {
    token: "SolanaFomo",
    ticker: "$FOMO",
    entryMcap: 2_100,
    currentMcap: 18_500,
    entrySol: 3.0,
    currentValueSol: 26.4,
    pnlPercent: 780,
    pnlSol: 23.4,
    mirroredFrom: "Degen Larry",
    bondingCurvePercent: 38,
    graduated: false,
    timestamp: "35 min ago",
  },
];

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
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
