"use client";

import React from "react";
import { StatusCard, StatusItem } from "@/components/ui/StatusCard";
import { ExplorerLink } from "@/components/ui/ExplorerLink";
import { TransactionButton } from "@/components/ui/TransactionButton";

interface RestrictedWalletSummaryProps {
  restrictedWalletAddress: string;
  withdrawLocked: boolean;
  totalTokensWithBalance: number;
  totalSupportedTokens: number;
  onWithdrawAll: () => void;
  isWithdrawing: boolean;
}

export const RestrictedWalletSummary: React.FC<
  RestrictedWalletSummaryProps
> = ({
  restrictedWalletAddress,
  withdrawLocked,
  totalTokensWithBalance,
  totalSupportedTokens,
  onWithdrawAll,
  isWithdrawing,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatusCard
        title="Wallet Status"
        status={withdrawLocked ? "active" : "inactive"}>
        <StatusItem
          label="Address"
          value={
            <ExplorerLink address={restrictedWalletAddress} showIcon={false}>
              {restrictedWalletAddress.slice(0, 8)}...
              {restrictedWalletAddress.slice(-6)}
            </ExplorerLink>
          }
        />
        <StatusItem
          label="Status"
          value={
            withdrawLocked
              ? "Active Loan - Withdrawal Locked"
              : "Ready for Withdrawal"
          }
          highlight={!withdrawLocked}
        />
        <StatusItem
          label="Loan Status"
          value={
            withdrawLocked
              ? "Repay your loan to unlock withdrawals"
              : "Loan Repaid - Withdrawal Unlocked"
          }
          highlight={!withdrawLocked}
        />
      </StatusCard>

      <StatusCard title="Token Summary" status="inactive">
        <StatusItem
          label="Tokens with Balance"
          value={`${totalTokensWithBalance} of ${totalSupportedTokens}`}
        />
        <StatusItem
          label="Total Supported"
          value={`${totalSupportedTokens} tokens`}
        />
      </StatusCard>

      <StatusCard title="Quick Actions" status="inactive">
        <div className="space-y-2">
          <TransactionButton
            onClick={onWithdrawAll}
            disabled={
              withdrawLocked || totalTokensWithBalance === 0 || isWithdrawing
            }
            loading={isWithdrawing}
            variant="primary"
            size="sm"
            className="w-full">
            Withdraw All Tokens
          </TransactionButton>
          {withdrawLocked && (
            <p
              className="text-xs text-yellow-400 text-center"
              style={{ fontFamily: "Space Grotesk" }}>
              Withdrawals unlock after the active loan is repaid.
            </p>
          )}
        </div>
      </StatusCard>
    </div>
  );
};
