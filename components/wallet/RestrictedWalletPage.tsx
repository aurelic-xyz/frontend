"use client";

import React from "react";
import { useRestrictedWallet } from "@/hooks/contracts/useRestrictedWallet";
import { TransactionNotification } from "@/components/ui/TransactionNotification";
import { formatUnits } from "viem";
import { COMMON_TOKENS } from "./tokens";
import { TokenBalanceCard } from "./TokenBalanceCard";
import { RestrictedWalletHeader } from "./RestrictedWalletHeader";
import { RestrictedWalletSummary } from "./RestrictedWalletSummary";
import { LoanStatsPanel } from "./LoanStatsPanel";
import { WithdrawalHelp } from "./WithdrawalHelp";

export const RestrictedWalletPage: React.FC = () => {
  const {
    restrictedWalletAddress,
    hasRestrictedWallet,
    loanIsActive,
    withdrawToken,
    withdrawAllTokens,
    withdrawTx,
    isWithdrawing,
    resetTransactionState,
    useRestrictedWalletBalance,
    loanStats,
  } = useRestrictedWallet();

  // Calculate total balances for summary
  const usdcBalance = useRestrictedWalletBalance(COMMON_TOKENS[0].address);
  const ethBalance = useRestrictedWalletBalance(COMMON_TOKENS[1].address);
  const btcBalance = useRestrictedWalletBalance(COMMON_TOKENS[2].address);

  const tokenBalances = [
    {
      ...COMMON_TOKENS[0],
      balance: usdcBalance.data || BigInt(0),
      formatted: usdcBalance.data
        ? formatUnits(usdcBalance.data, COMMON_TOKENS[0].decimals)
        : "0",
    },
    {
      ...COMMON_TOKENS[1],
      balance: ethBalance.data || BigInt(0),
      formatted: ethBalance.data
        ? formatUnits(ethBalance.data, COMMON_TOKENS[1].decimals)
        : "0",
    },
    {
      ...COMMON_TOKENS[2],
      balance: btcBalance.data || BigInt(0),
      formatted: btcBalance.data
        ? formatUnits(btcBalance.data, COMMON_TOKENS[2].decimals)
        : "0",
    },
  ];

  const totalTokensWithBalance = tokenBalances.filter(
    (t) => t.balance > BigInt(0)
  ).length;

  const withdrawLocked = loanIsActive;

  const handleWithdrawAll = () => {
    tokenBalances
      .filter((t) => t.balance > BigInt(0))
      .forEach((token) => {
        withdrawAllTokens(token.address);
      });
  };

  if (!hasRestrictedWallet) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1E1E1E] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#A3A3A3]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2
              className="text-2xl font-normal text-white mb-2"
              style={{
                fontFamily: "Space Grotesk",
                letterSpacing: "-0.5px",
              }}>
              No Restricted Wallet
            </h2>
            <p
              className="text-[#A3A3A3] max-w-md mx-auto font-normal"
              style={{ fontFamily: "Space Grotesk" }}>
              You need to create a loan first to get a restricted wallet. Once
              you have a restricted wallet, you can manage your trading balances
              here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <RestrictedWalletHeader
        withdrawLocked={withdrawLocked}
        loanStats={loanStats}
      />

      {/* Wallet Summary */}
      <RestrictedWalletSummary
        restrictedWalletAddress={restrictedWalletAddress!}
        withdrawLocked={withdrawLocked}
        totalTokensWithBalance={totalTokensWithBalance}
        totalSupportedTokens={COMMON_TOKENS.length}
        onWithdrawAll={handleWithdrawAll}
        isWithdrawing={isWithdrawing}
      />

      {/* Token Balances and Withdrawal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-normal text-white"
            style={{
              fontFamily: "Space Grotesk",
              letterSpacing: "-0.5px",
            }}>
            Token Balances
          </h2>
          <div
            className="text-sm text-[#A3A3A3] font-normal"
            style={{ fontFamily: "Space Grotesk" }}>
            All supported tokens
          </div>
        </div>

        <div className="grid gap-4">
          {COMMON_TOKENS.map((token) => (
            <TokenBalanceCard
              key={token.address}
              token={token}
              onWithdraw={withdrawToken}
              onWithdrawAll={withdrawAllTokens}
              isWithdrawing={isWithdrawing}
              withdrawLocked={withdrawLocked}
            />
          ))}
        </div>
      </div>

      {/* Transaction Notifications */}
      {withdrawTx.status !== "idle" && (
        <TransactionNotification
          status={withdrawTx.status}
          hash={withdrawTx.hash}
          message={
            withdrawTx.status === "success"
              ? "Withdrawal completed successfully!"
              : withdrawTx.status === "pending"
              ? "Processing withdrawal..."
              : withdrawTx.error || "Withdrawal failed"
          }
          onClose={resetTransactionState}
        />
      )}

      {/* Loan Information */}
      {loanStats && <LoanStatsPanel loanStats={loanStats} />}

      {/* Help Section */}
      <WithdrawalHelp loanStats={loanStats} />
    </div>
  );
};
