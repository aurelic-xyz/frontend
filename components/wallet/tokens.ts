import { CONTRACT_CONFIGS } from "@/lib/contracts/addresses";

export interface TokenConfig {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  icon: string;
}

// Token configuration with actual contract addresses
export const COMMON_TOKENS: TokenConfig[] = [
  {
    address: CONTRACT_CONFIGS.MOCK_USDC.address,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "💵",
  },
  {
    address: CONTRACT_CONFIGS.MOCK_ETH.address,
    symbol: "ETH",
    decimals: 18,
    name: "Ethereum",
    icon: "🔷",
  },
  {
    address: CONTRACT_CONFIGS.MOCK_BTC.address,
    symbol: "BTC",
    decimals: 8,
    name: "Bitcoin",
    icon: "₿",
  },
];
