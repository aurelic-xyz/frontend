# 🎨 Frontend Architecture - Aurelio Protocol

## 🎯 Overview

**Project**: Aurelio Protocol DeFi Frontend
**Current Stack**: Next.js 15 + HeroUI + Wagmi v2 + TanStack Query
**Target**: Production-ready dApp untuk lending protocol
**Timeline**: 2 months development
**Budget**: $25K

---

# 📋 Table of Contents

1. [Tech Stack & Rationale](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Component Architecture](#component-architecture)
4. [Web3 Integration Strategy](#web3-integration)
5. [State Management](#state-management)
6. [Hooks Architecture](#hooks-architecture)
7. [UI/UX Design System](#ui-ux-design)
8. [Performance Optimization](#performance)
9. [Security Best Practices](#security)
10. [Development Roadmap](#roadmap)

---

# 🛠️ Tech Stack & Rationale

## **Current Stack (Keep & Enhance)**

```typescript
✅ Next.js 15.3.1        // App Router, SSR, optimized
✅ React 18.3.1          // Latest stable
✅ TypeScript 5.6.3      // Type safety
✅ Wagmi 2.15.2          // Web3 hooks (latest)
✅ Viem 2.29.1           // Ethereum interactions
✅ TanStack Query 5.75.5 // Data fetching & caching
✅ HeroUI v2             // Component library
✅ Tailwind CSS 3.4.16   // Styling
✅ Framer Motion 11.13.1 // Animations
```

## **Add for Aurelio Protocol**

```typescript
+ Zustand 4.5.x          // Client state management
+ React Hook Form 7.x    // Form validation
+ Zod 3.24.4 (✅ ada)    // Schema validation
+ Recharts 2.15.3 (✅)   // Data visualization
+ date-fns 3.x           // Date handling
+ Sentry (optional)      // Error tracking
+ Vercel Analytics       // Performance monitoring
```

## **Why This Stack?**

### **Next.js 15 App Router**
```
✅ Server Components = Faster initial load
✅ Streaming SSR = Progressive rendering
✅ Built-in optimization (fonts, images)
✅ API routes for backend logic
✅ SEO friendly
```

### **Wagmi v2 + Viem**
```
✅ Type-safe contract interactions
✅ Auto-refresh on block changes
✅ Multi-chain support (easy Base integration)
✅ Built-in caching & deduplication
✅ Better than ethers.js/web3.js
```

### **TanStack Query**
```
✅ Smart caching (stale-while-revalidate)
✅ Auto-refetch on window focus
✅ Optimistic updates
✅ Parallel queries
✅ Perfect for blockchain + API data
```

### **HeroUI**
```
✅ Modern design system
✅ Accessible (ARIA compliant)
✅ Dark mode built-in
✅ Customizable with Tailwind
✅ Lightweight
```

---

# 📁 Folder Structure (Enhanced)

## **Current Structure (Good Base)**

```
web/
├── app/                    # Next.js 15 App Router ✅
├── components/             # Reusable components ✅
├── hooks/                  # Custom hooks ✅
├── lib/                    # Utils & configs ✅
├── data/                   # Static data ✅
├── config/                 # App config ✅
├── graphql/                # GraphQL queries ✅
└── public/                 # Static assets ✅
```

## **Enhanced Structure for Aurelio**

```
web/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Landing pages (no auth)
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   └── docs/                # Documentation
│   │
│   ├── (app)/                    # Main dApp (auth required)
│   │   ├── layout.tsx           # App layout with navbar
│   │   ├── dashboard/           # User dashboard
│   │   │   └── page.tsx
│   │   │
│   │   ├── lend/                # Lending interface
│   │   │   ├── page.tsx         # Deposit/withdraw
│   │   │   └── _components/
│   │   │       ├── deposit-form.tsx
│   │   │       ├── withdraw-form.tsx
│   │   │       └── vault-stats.tsx
│   │   │
│   │   ├── borrow/              # Borrowing interface
│   │   │   ├── page.tsx         # Create loan
│   │   │   └── _components/
│   │   │       ├── loan-form.tsx
│   │   │       ├── collateral-calculator.tsx
│   │   │       └── health-factor.tsx
│   │   │
│   │   ├── portfolio/           # User portfolio ✅ existing
│   │   │   ├── positions/
│   │   │   └── activity/
│   │   │
│   │   └── wallet/              # Restricted wallet management
│   │       ├── page.tsx
│   │       └── _components/
│   │           ├── wallet-balance.tsx
│   │           ├── withdrawal-form.tsx
│   │           └── protocol-allocations.tsx
│   │
│   ├── api/                      # API routes (if needed)
│   │   ├── stats/route.ts       # Protocol statistics
│   │   └── health/route.ts      # Health check
│   │
│   ├── layout.tsx                # Root layout ✅
│   ├── providers.tsx             # Global providers ✅
│   └── error.tsx                 # Error boundary ✅
│
├── components/                    # Shared components
│   ├── ui/                       # UI primitives (HeroUI wrappers)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   └── toast.tsx
│   │
│   ├── web3/                     # Web3-specific components
│   │   ├── connect-button.tsx
│   │   ├── wallet-info.tsx
│   │   ├── network-selector.tsx
│   │   ├── transaction-button.tsx
│   │   └── address-display.tsx
│   │
│   ├── features/                 # Feature components
│   │   ├── vault/
│   │   │   ├── vault-card.tsx
│   │   │   ├── vault-metrics.tsx
│   │   │   └── vault-apy-chart.tsx
│   │   │
│   │   ├── loan/
│   │   │   ├── loan-card.tsx
│   │   │   ├── loan-status-badge.tsx
│   │   │   └── liquidation-warning.tsx
│   │   │
│   │   └── wallet/
│   │       ├── restricted-wallet-card.tsx
│   │       ├── balance-breakdown.tsx
│   │       └── withdrawal-limit-bar.tsx
│   │
│   ├── layout/                   # Layout components ✅
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   │
│   └── charts/                   # Data visualization
│       ├── apy-chart.tsx
│       ├── tvl-chart.tsx
│       └── collateral-pie-chart.tsx
│
├── hooks/                         # Custom hooks
│   ├── contracts/                # Smart contract hooks
│   │   ├── vault/
│   │   │   ├── use-deposit.ts
│   │   │   ├── use-withdraw.ts
│   │   │   ├── use-vault-balance.ts
│   │   │   ├── use-vault-apy.ts
│   │   │   └── use-vault-total-assets.ts
│   │   │
│   │   ├── loan/
│   │   │   ├── use-create-loan.ts
│   │   │   ├── use-repay-loan.ts
│   │   │   ├── use-user-loans.ts
│   │   │   ├── use-loan-health.ts
│   │   │   └── use-liquidate-loan.ts
│   │   │
│   │   └── wallet/
│   │       ├── use-restricted-wallet.ts
│   │       ├── use-wallet-withdraw.ts
│   │       ├── use-wallet-balance.ts
│   │       └── use-max-withdrawable.ts
│   │
│   ├── api/                      # API hooks
│   │   ├── use-protocol-stats.ts
│   │   ├── use-token-prices.ts
│   │   └── use-gas-price.ts
│   │
│   ├── blockchain/               # Blockchain utilities
│   │   ├── use-block-number.ts
│   │   ├── use-gas-estimate.ts
│   │   └── use-transaction-status.ts
│   │
│   └── ui/                       # UI utilities
│       ├── use-toast.ts
│       ├── use-modal.ts
│       └── use-clipboard.ts
│
├── lib/                           # Utilities & configs
│   ├── contracts/                # Contract ABIs & addresses ✅
│   │   ├── abis/
│   │   ├── addresses.ts
│   │   └── types.ts
│   │
│   ├── wagmi/                    # Wagmi configuration ✅
│   │   ├── config.ts
│   │   ├── chains.ts
│   │   └── connectors.ts
│   │
│   ├── utils/                    # Helper functions
│   │   ├── format.ts            # Number/date formatting
│   │   ├── validation.ts        # Form validation
│   │   ├── error.ts             # Error handling
│   │   └── constants.ts
│   │
│   └── stores/                   # Zustand stores
│       ├── ui-store.ts          # UI state (modals, theme)
│       ├── transaction-store.ts # Transaction tracking
│       └── notification-store.ts
│
├── types/                         # TypeScript types
│   ├── contracts.ts              # Smart contract types
│   ├── api.ts                    # API response types
│   ├── components.ts             # Component prop types
│   └── global.d.ts               # Global type declarations
│
├── styles/                        # Global styles
│   └── globals.css               ✅
│
├── config/                        # Configuration
│   ├── site.ts                   ✅
│   ├── chains.ts                 # Chain configs
│   └── features.ts               # Feature flags
│
└── public/                        # Static assets
    ├── images/
    ├── icons/
    └── fonts/
```

---

# 🧩 Component Architecture

## **Component Hierarchy**

```
┌────────────────────────────────────────────────────┐
│              Root Layout (app/layout.tsx)           │
│  • Providers (Wagmi, Query, Theme, Toast)          │
│  • Global styles                                   │
└────────────────┬───────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼────────────┐    ┌──────▼──────────────┐
│  Marketing     │    │  App Layout         │
│  (Public)      │    │  (Authenticated)    │
│                │    │  • Navbar           │
│  • Homepage    │    │  • Sidebar          │
│  • About       │    │  • Footer           │
│  • Docs        │    │                     │
└────────────────┘    └──────┬──────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
    │  Dashboard   │  │   Lend    │  │   Borrow    │
    │              │  │           │  │             │
    │ • Overview   │  │ • Deposit │  │ • Create    │
    │ • Stats      │  │ • Withdraw│  │ • Manage    │
    └──────────────┘  └───────────┘  └─────────────┘
```

## **Component Patterns**

### **1. Smart vs Presentational Components**

```typescript
// ❌ Bad: Mixed logic and presentation
function VaultCard() {
  const { data, isLoading } = useVaultBalance();
  const { mutate } = useDeposit();

  return (
    <Card>
      {isLoading ? <Spinner /> : <div>{data}</div>}
      <Button onClick={mutate}>Deposit</Button>
    </Card>
  );
}

// ✅ Good: Separated concerns
// Smart Component (Container)
function VaultCardContainer() {
  const { data, isLoading } = useVaultBalance();
  const { mutate, isPending } = useDeposit();

  return (
    <VaultCard
      balance={data?.balance}
      isLoading={isLoading}
      onDeposit={mutate}
      isDepositing={isPending}
    />
  );
}

// Presentational Component
interface VaultCardProps {
  balance?: string;
  isLoading: boolean;
  onDeposit: (amount: string) => void;
  isDepositing: boolean;
}

function VaultCard({ balance, isLoading, onDeposit, isDepositing }: VaultCardProps) {
  return (
    <Card>
      {isLoading ? (
        <Skeleton className="h-20" />
      ) : (
        <div className="text-2xl font-bold">{balance} USDC</div>
      )}
      <Button onClick={() => onDeposit("100")} isLoading={isDepositing}>
        Deposit
      </Button>
    </Card>
  );
}
```

### **2. Compound Components Pattern**

```typescript
// components/features/vault/vault-card.tsx
export function VaultCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-6 space-y-4">
      {children}
    </Card>
  );
}

VaultCard.Header = function VaultCardHeader({ title, apy }: { title: string; apy: string }) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Badge color="success">{apy}% APY</Badge>
    </div>
  );
};

VaultCard.Balance = function VaultCardBalance({ amount, usdValue }: { amount: string; usdValue: string }) {
  return (
    <div>
      <p className="text-3xl font-bold">{amount} USDC</p>
      <p className="text-sm text-gray-500">${usdValue} USD</p>
    </div>
  );
};

VaultCard.Actions = function VaultCardActions({ onDeposit, onWithdraw }: { onDeposit: () => void; onWithdraw: () => void }) {
  return (
    <div className="flex gap-2">
      <Button onClick={onDeposit} color="primary" className="flex-1">
        Deposit
      </Button>
      <Button onClick={onWithdraw} color="default" variant="bordered" className="flex-1">
        Withdraw
      </Button>
    </div>
  );
};

// Usage
function VaultPage() {
  return (
    <VaultCard>
      <VaultCard.Header title="USDC Vault" apy="12.5" />
      <VaultCard.Balance amount="1,234.56" usdValue="1,234.56" />
      <VaultCard.Actions onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
    </VaultCard>
  );
}
```

### **3. Custom Hook Pattern**

```typescript
// hooks/contracts/vault/use-deposit.ts
export function useDeposit() {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { writeContract, isPending, isSuccess, error, data: hash } = useWriteContract();

  const deposit = async (amount: string) => {
    if (!address) throw new Error("Wallet not connected");

    const amountBigInt = parseUnits(amount, 6); // USDC decimals

    // Approve USDC first
    await writeContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "approve",
      args: [VAULT_ADDRESS, amountBigInt],
    });

    // Then deposit
    await writeContract({
      address: VAULT_ADDRESS,
      abi: VaultABI,
      functionName: "deposit",
      args: [amountBigInt, address],
    });
  };

  // Invalidate queries on success
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["vaultBalance"] });
      queryClient.invalidateQueries({ queryKey: ["userShares"] });
    }
  }, [isSuccess, queryClient]);

  return {
    deposit,
    isPending,
    isSuccess,
    error,
    hash,
  };
}
```

---

# 🔗 Web3 Integration Strategy

## **Architecture Diagram**

```
┌─────────────────────────────────────────────────────┐
│              User Interface (React)                  │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│           Custom Hooks Layer                         │
│  • useDeposit() • useLoan() • useWallet()           │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼─────┐  ┌──▼───────┐  ┌▼──────────┐
│ Wagmi   │  │  Viem    │  │  TanStack │
│ Hooks   │  │ Actions  │  │  Query    │
└───┬─────┘  └──┬───────┘  └┬──────────┘
    │           │            │
    └───────────┼────────────┘
                │
┌───────────────▼─────────────────────────────────────┐
│              Wagmi Config                            │
│  • Chains (Base) • Connectors • Transports          │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│           Smart Contracts (Base)                     │
│  • AurelioVault • LoanManager • RestrictedWallet    │
└─────────────────────────────────────────────────────┘
```

## **Wagmi Configuration**

```typescript
// lib/wagmi/config.ts
import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'Aurelio Protocol',
    }),
    walletConnect({
      projectId,
      metadata: {
        name: 'Aurelio Protocol',
        description: 'DeFi Lending with Restricted Wallets',
        url: 'https://aurelio.finance',
        icons: ['https://aurelio.finance/logo.png'],
      },
    }),
  ],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
  },
  ssr: true,
})
```

## **Contract Addresses Management**

```typescript
// lib/contracts/addresses.ts
import { base, baseSepolia } from 'wagmi/chains'

export const CONTRACTS = {
  [base.id]: {
    VAULT: '0x...' as const,
    LOAN_MANAGER: '0x...' as const,
    WALLET_FACTORY: '0x...' as const,
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const, // Base USDC
  },
  [baseSepolia.id]: {
    VAULT: '0x...' as const,
    LOAN_MANAGER: '0x...' as const,
    WALLET_FACTORY: '0x...' as const,
    USDC: '0x...' as const, // Testnet USDC
  },
} as const

// Helper function
export function getContractAddress(
  chainId: number,
  contract: 'VAULT' | 'LOAN_MANAGER' | 'WALLET_FACTORY' | 'USDC'
) {
  return CONTRACTS[chainId as keyof typeof CONTRACTS]?.[contract]
}
```

## **Type-Safe Contract Hooks**

```typescript
// hooks/contracts/vault/use-vault-balance.ts
import { useAccount, useReadContract } from 'wagmi'
import { VaultABI } from '@/lib/contracts/abis/vault'
import { getContractAddress } from '@/lib/contracts/addresses'
import { formatUnits } from 'viem'

export function useVaultBalance() {
  const { address, chainId } = useAccount()

  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(chainId!, 'VAULT'),
    abi: VaultABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!chainId,
      refetchInterval: 10000, // Refetch every 10s
    },
  })

  const formattedBalance = data ? formatUnits(data, 6) : '0'

  return {
    balance: data,
    formattedBalance,
    isLoading,
    error,
    refetch,
  }
}
```

## **Transaction Hook Pattern**

```typescript
// hooks/contracts/vault/use-deposit.ts
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/ui/use-toast'

export function useDeposit() {
  const [steps, setSteps] = useState<TransactionStep[]>([])
  const queryClient = useQueryClient()

  const { writeContractAsync } = useWriteContract()

  const deposit = async (amount: string) => {
    try {
      setSteps([{ name: 'Approve USDC', status: 'pending' }])

      // Step 1: Approve
      const approveHash = await writeContractAsync({
        address: USDC_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [VAULT_ADDRESS, parseUnits(amount, 6)],
      })

      setSteps([
        { name: 'Approve USDC', status: 'success', hash: approveHash },
        { name: 'Deposit to Vault', status: 'pending' },
      ])

      // Step 2: Deposit
      const depositHash = await writeContractAsync({
        address: VAULT_ADDRESS,
        abi: VaultABI,
        functionName: 'deposit',
        args: [parseUnits(amount, 6), address!],
      })

      setSteps([
        { name: 'Approve USDC', status: 'success', hash: approveHash },
        { name: 'Deposit to Vault', status: 'success', hash: depositHash },
      ])

      // Invalidate queries
      await queryClient.invalidateQueries({ queryKey: ['vaultBalance'] })

      toast({
        title: 'Deposit successful!',
        description: `${amount} USDC deposited to vault`,
      })

      return depositHash
    } catch (error) {
      setSteps(prev =>
        prev.map(step =>
          step.status === 'pending' ? { ...step, status: 'error', error } : step
        )
      )
      throw error
    }
  }

  return { deposit, steps }
}

type TransactionStep = {
  name: string
  status: 'pending' | 'success' | 'error'
  hash?: `0x${string}`
  error?: unknown
}
```

---

# 🗄️ State Management Strategy

## **State Classification**

```typescript
┌─────────────────────────────────────────────────────┐
│                    STATE TYPES                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. SERVER STATE (TanStack Query)                   │
│     • Smart contract data (balances, loans)         │
│     • API data (prices, stats)                      │
│     • GraphQL data (transaction history)            │
│                                                      │
│  2. WEB3 STATE (Wagmi)                              │
│     • Wallet connection status                      │
│     • Network/chain information                     │
│     • Account address                               │
│                                                      │
│  3. CLIENT STATE (Zustand)                          │
│     • UI state (modals, theme, sidebar)             │
│     • Form state (inputs, validation)               │
│     • Transaction tracking                          │
│                                                      │
│  4. URL STATE (Next.js)                             │
│     • Route parameters                              │
│     • Query parameters                              │
│     • Search filters                                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## **Zustand Stores**

### **1. UI Store**

```typescript
// lib/stores/ui-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // Modal state
  isDepositModalOpen: boolean
  isWithdrawModalOpen: boolean
  isLoanModalOpen: boolean

  // Theme
  theme: 'light' | 'dark'

  // Sidebar
  isSidebarCollapsed: boolean

  // Actions
  openDepositModal: () => void
  closeDepositModal: () => void
  openWithdrawModal: () => void
  closeWithdrawModal: () => void
  openLoanModal: () => void
  closeLoanModal: () => void
  toggleTheme: () => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      isDepositModalOpen: false,
      isWithdrawModalOpen: false,
      isLoanModalOpen: false,
      theme: 'dark',
      isSidebarCollapsed: false,

      // Actions
      openDepositModal: () => set({ isDepositModalOpen: true }),
      closeDepositModal: () => set({ isDepositModalOpen: false }),
      openWithdrawModal: () => set({ isWithdrawModalOpen: true }),
      closeWithdrawModal: () => set({ isWithdrawModalOpen: false }),
      openLoanModal: () => set({ isLoanModalOpen: true }),
      closeLoanModal: () => set({ isLoanModalOpen: false }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: 'aurelio-ui-store',
      partialize: (state) => ({ theme: state.theme, isSidebarCollapsed: state.isSidebarCollapsed }),
    }
  )
)
```

### **2. Transaction Store**

```typescript
// lib/stores/transaction-store.ts
import { create } from 'zustand'

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw' | 'borrow' | 'repay'
  status: 'pending' | 'success' | 'error'
  hash?: `0x${string}`
  amount?: string
  timestamp: number
  error?: string
}

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  clearTransactions: () => void
  getPendingTransactions: () => Transaction[]
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],

  addTransaction: (tx) => {
    const transaction: Transaction = {
      ...tx,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    }
    set((state) => ({
      transactions: [transaction, ...state.transactions].slice(0, 50), // Keep last 50
    }))
  },

  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updates } : tx
      ),
    })),

  clearTransactions: () => set({ transactions: [] }),

  getPendingTransactions: () =>
    get().transactions.filter((tx) => tx.status === 'pending'),
}))
```

## **TanStack Query Patterns**

### **Query Key Factory**

```typescript
// lib/query-keys.ts
export const queryKeys = {
  // Vault queries
  vault: {
    all: ['vault'] as const,
    balance: (address?: string) => ['vault', 'balance', address] as const,
    totalAssets: () => ['vault', 'totalAssets'] as const,
    apy: () => ['vault', 'apy'] as const,
    userShares: (address?: string) => ['vault', 'shares', address] as const,
  },

  // Loan queries
  loan: {
    all: ['loan'] as const,
    byId: (id: string) => ['loan', id] as const,
    userLoans: (address?: string) => ['loan', 'user', address] as const,
    health: (id: string) => ['loan', 'health', id] as const,
  },

  // Wallet queries
  wallet: {
    all: ['wallet'] as const,
    balance: (address?: string) => ['wallet', 'balance', address] as const,
    maxWithdrawable: (address?: string) => ['wallet', 'max', address] as const,
  },

  // API queries
  api: {
    prices: () => ['api', 'prices'] as const,
    stats: () => ['api', 'stats'] as const,
  },
}
```

### **Custom Query Hook**

```typescript
// hooks/contracts/vault/use-vault-apy.ts
import { useQuery } from '@tanstack/react-query'
import { useReadContract } from 'wagmi'
import { queryKeys } from '@/lib/query-keys'

export function useVaultAPY() {
  const { data: totalAssets } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VaultABI,
    functionName: 'totalAssets',
  })

  const { data: totalSupply } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VaultABI,
    functionName: 'totalSupply',
  })

  // Calculate APY based on historical data
  const { data: apy, isLoading } = useQuery({
    queryKey: queryKeys.vault.apy(),
    queryFn: async () => {
      // Fetch historical data
      const response = await fetch('/api/vault/apy')
      const data = await response.json()
      return data.apy
    },
    staleTime: 60000, // 1 minute
    enabled: !!totalAssets && !!totalSupply,
  })

  return { apy, isLoading }
}
```

---

# 🎨 UI/UX Design System

## **Design Principles**

```
1. 🎯 Clarity First
   - Clear transaction flows
   - Obvious CTAs
   - Visible system status

2. 🛡️ Safety & Trust
   - Confirm before critical actions
   - Show transaction details upfront
   - Display health factors/warnings

3. ⚡ Performance
   - Instant feedback
   - Optimistic updates
   - Progressive loading

4. 📱 Responsive
   - Mobile-first design
   - Touch-friendly targets
   - Adaptive layouts
```

## **Color System**

```typescript
// tailwind.config.ts (extend HeroUI theme)
const colors = {
  // Brand colors
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9', // Primary
    600: '#0284c7',
    900: '#0c4a6e',
  },

  // Semantic colors
  success: {
    DEFAULT: '#10b981', // Green for profit/positive
    light: '#d1fae5',
    dark: '#047857',
  },
  danger: {
    DEFAULT: '#ef4444', // Red for loss/warning
    light: '#fee2e2',
    dark: '#b91c1c',
  },
  warning: {
    DEFAULT: '#f59e0b', // Orange for caution
    light: '#fef3c7',
    dark: '#b45309',
  },
  info: {
    DEFAULT: '#3b82f6', // Blue for info
    light: '#dbeafe',
    dark: '#1e40af',
  },

  // Neutral
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    500: '#6b7280',
    900: '#111827',
  },
}
```

## **Typography Scale**

```typescript
// Typography system
const typography = {
  // Display
  'display-1': 'text-6xl font-bold', // 60px
  'display-2': 'text-5xl font-bold', // 48px

  // Headings
  h1: 'text-4xl font-bold', // 36px
  h2: 'text-3xl font-semibold', // 30px
  h3: 'text-2xl font-semibold', // 24px
  h4: 'text-xl font-semibold', // 20px

  // Body
  'body-lg': 'text-lg', // 18px
  body: 'text-base', // 16px
  'body-sm': 'text-sm', // 14px

  // Utility
  caption: 'text-xs text-gray-500', // 12px
  overline: 'text-xs uppercase tracking-wide', // 12px
}
```

## **Component Examples**

### **Transaction Button with Loading States**

```typescript
// components/web3/transaction-button.tsx
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'

interface TransactionButtonProps {
  onClick: () => Promise<void>
  children: React.ReactNode
  disabled?: boolean
  variant?: 'solid' | 'bordered' | 'light'
  color?: 'primary' | 'success' | 'danger'
}

export function TransactionButton({
  onClick,
  children,
  disabled,
  variant = 'solid',
  color = 'primary',
}: TransactionButtonProps) {
  const [isPending, setIsPending] = useState(false)

  const handleClick = async () => {
    setIsPending(true)
    try {
      await onClick()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isPending}
      variant={variant}
      color={color}
      startContent={isPending ? <Spinner size="sm" /> : null}
    >
      {isPending ? 'Processing...' : children}
    </Button>
  )
}
```

### **Health Factor Indicator**

```typescript
// components/features/loan/health-factor.tsx
interface HealthFactorProps {
  ratio: number // Collateral ratio (e.g., 150 for 150%)
}

export function HealthFactor({ ratio }: HealthFactorProps) {
  const getHealthColor = () => {
    if (ratio >= 150) return 'success'
    if (ratio >= 130) return 'warning'
    return 'danger'
  }

  const getHealthLabel = () => {
    if (ratio >= 150) return 'Healthy'
    if (ratio >= 130) return 'At Risk'
    return 'Liquidation Risk'
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Health Factor</span>
        <Badge color={getHealthColor()}>{getHealthLabel()}</Badge>
      </div>

      <Progress
        value={Math.min(ratio, 200)}
        maxValue={200}
        color={getHealthColor()}
        className="h-2"
      />

      <div className="flex justify-between text-xs text-gray-500">
        <span>Liquidation at 120%</span>
        <span className="font-semibold">{ratio}%</span>
      </div>
    </div>
  )
}
```

### **Withdrawal Limit Bar**

```typescript
// components/features/wallet/withdrawal-limit-bar.tsx
interface WithdrawalLimitBarProps {
  totalBalance: string
  maxWithdrawable: string
  currentWithdrawal: string
}

export function WithdrawalLimitBar({
  totalBalance,
  maxWithdrawable,
  currentWithdrawal,
}: WithdrawalLimitBarProps) {
  const total = parseFloat(totalBalance)
  const max = parseFloat(maxWithdrawable)
  const current = parseFloat(currentWithdrawal)

  const percentage = (current / max) * 100
  const isExceeded = current > max

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Withdrawal Limit (80%)</span>
        <span className={isExceeded ? 'text-danger' : 'text-success'}>
          {current.toFixed(2)} / {max.toFixed(2)} USDC
        </span>
      </div>

      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            isExceeded ? 'bg-danger' : 'bg-success'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        {isExceeded && (
          <div
            className="absolute top-0 h-full bg-danger/50"
            style={{
              left: '100%',
              width: `${((current - max) / max) * 100}%`,
            }}
          />
        )}
      </div>

      <p className="text-xs text-gray-500">
        20% reserved for interest and protocol fees
      </p>
    </div>
  )
}
```

---

# ⚡ Performance Optimization

## **1. Code Splitting**

```typescript
// app/(app)/borrow/page.tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const LoanForm = dynamic(() => import('./_components/loan-form'), {
  loading: () => <Skeleton className="h-96" />,
  ssr: false, // Client-side only (uses wallet)
})

const HealthFactorChart = dynamic(
  () => import('./_components/health-factor-chart'),
  {
    loading: () => <Skeleton className="h-64" />,
  }
)

export default function BorrowPage() {
  return (
    <div>
      <LoanForm />
      <HealthFactorChart />
    </div>
  )
}
```

## **2. Image Optimization**

```typescript
// Use Next.js Image component
import Image from 'next/image'

export function TokenIcon({ symbol }: { symbol: string }) {
  return (
    <Image
      src={`/tokens/${symbol.toLowerCase()}.png`}
      alt={symbol}
      width={32}
      height={32}
      priority={symbol === 'USDC'} // Prioritize critical images
    />
  )
}
```

## **3. React Query Optimization**

```typescript
// Prefetch on hover
const queryClient = useQueryClient()

const handleMouseEnter = (loanId: string) => {
  queryClient.prefetchQuery({
    queryKey: queryKeys.loan.byId(loanId),
    queryFn: () => fetchLoanDetails(loanId),
  })
}

<Link
  href={`/borrow/${loanId}`}
  onMouseEnter={() => handleMouseEnter(loanId)}
>
  View Loan
</Link>
```

## **4. Memoization**

```typescript
// Memoize expensive calculations
const collateralRatio = useMemo(() => {
  if (!collateralValue || !loanAmount) return 0
  return (collateralValue / loanAmount) * 100
}, [collateralValue, loanAmount])

// Memoize callbacks
const handleDeposit = useCallback(
  (amount: string) => {
    deposit(amount)
  },
  [deposit]
)
```

---

# 🔒 Security Best Practices

## **1. Input Validation**

```typescript
// Use Zod for validation
import { z } from 'zod'

const depositSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount required')
    .refine((val) => !isNaN(Number(val)), 'Invalid number')
    .refine((val) => Number(val) > 0, 'Amount must be positive')
    .refine((val) => Number(val) <= 1000000, 'Amount too large'),
})

function DepositForm() {
  const form = useForm({
    resolver: zodResolver(depositSchema),
  })

  // ...
}
```

## **2. Transaction Confirmation**

```typescript
// Always show confirmation modal
function DepositButton({ amount }: { amount: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Deposit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirm Deposit</ModalHeader>
          <ModalBody>
            <p>You are about to deposit:</p>
            <p className="text-2xl font-bold">{amount} USDC</p>
            <p className="text-sm text-gray-500">
              This action requires 2 transactions: approve + deposit
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="primary" onClick={handleDeposit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

## **3. Error Handling**

```typescript
// lib/utils/error.ts
export function parseContractError(error: unknown): string {
  if (error instanceof Error) {
    // User rejected transaction
    if (error.message.includes('User rejected')) {
      return 'Transaction cancelled by user'
    }

    // Insufficient balance
    if (error.message.includes('insufficient')) {
      return 'Insufficient balance for this transaction'
    }

    // Contract revert
    if (error.message.includes('revert')) {
      return 'Transaction failed. Check contract conditions.'
    }
  }

  return 'Transaction failed. Please try again.'
}

// Usage in component
try {
  await deposit(amount)
} catch (error) {
  const message = parseContractError(error)
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  })
}
```

## **4. Rate Limiting**

```typescript
// Prevent spam clicks
function useRateLimitedAction(action: () => Promise<void>, delay: number = 2000) {
  const [isLimited, setIsLimited] = useState(false)

  const execute = async () => {
    if (isLimited) return

    setIsLimited(true)
    try {
      await action()
    } finally {
      setTimeout(() => setIsLimited(false), delay)
    }
  }

  return { execute, isLimited }
}
```

---

# 📅 Development Roadmap

## **Week 1-2: Core Setup & Infrastructure**

```
✅ Setup project structure
✅ Configure Wagmi + TanStack Query
✅ Create base components (Button, Card, Modal)
✅ Setup Zustand stores
✅ Create contract ABIs & addresses config
```

## **Week 3-4: Lend Page**

```
✅ Vault deposit form
✅ Vault withdraw form
✅ Balance display
✅ APY chart
✅ Transaction history
```

## **Week 5-6: Borrow Page**

```
✅ Loan creation form
✅ Collateral calculator
✅ Health factor indicator
✅ Active loans table
✅ Repayment interface
```

## **Week 7: Restricted Wallet Page**

```
✅ Wallet balance display
✅ Withdrawal form with limit
✅ Protocol allocation breakdown
✅ Transaction history
```

## **Week 8: Polish & Testing**

```
✅ Responsive design
✅ Error handling
✅ Loading states
✅ E2E testing
✅ Performance optimization
```

---

# 🎯 Success Metrics

```
Performance:
✅ Lighthouse score > 90
✅ First Contentful Paint < 1.5s
✅ Time to Interactive < 3s

UX:
✅ Transaction success rate > 95%
✅ Clear error messages
✅ Mobile responsive

Security:
✅ Input validation on all forms
✅ Transaction confirmations
✅ No XSS vulnerabilities
```

---

# 📚 Next Steps

## **Immediate Actions (This Week)**

1. **Review current codebase** ✅
2. **Plan component refactoring**
3. **Create missing hooks** (vault, loan, wallet)
4. **Design new pages** (borrow, wallet management)

## **This Month**

- Implement lend page enhancements
- Build borrow page from scratch
- Create restricted wallet interface
- Add real-time updates

## **Next Month**

- Polish UI/UX
- Add animations
- Performance optimization
- Testing & bug fixes

---

**Siap untuk mulai development?** 🚀

Mau saya buatkan:
1. ✅ Specific page components (Lend, Borrow, Wallet)?
2. ✅ Custom hooks implementation?
3. ✅ Zustand store setup?
4. ✅ Form components with validation?

Atau ada bagian lain yang ingin diprioritaskan? 💪

