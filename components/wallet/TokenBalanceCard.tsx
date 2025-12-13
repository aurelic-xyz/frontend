"use client";

import React, { useState } from "react";
import { useRestrictedWallet } from "@/hooks/contracts/useRestrictedWallet";
import { TransactionButton } from "@/components/ui/TransactionButton";
import { AmountInput } from "@/components/ui/AmountInput";
import { formatUnits } from "viem";
import { TokenConfig } from "./tokens";

interface TokenBalanceCardProps {
  token: TokenConfig;
  onWithdraw: (tokenAddress: string, amount: string, decimals: number) => void;
  onWithdrawAll: (tokenAddress: string) => void;
  isWithdrawing: boolean;
  withdrawLocked: boolean;
}

export const TokenBalanceCard: React.FC<TokenBalanceCardProps> = ({
  token,
  onWithdraw,
  onWithdrawAll,
  isWithdrawing,
  withdrawLocked,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { useRestrictedWalletBalance } = useRestrictedWallet();
  const { data: balance } = useRestrictedWalletBalance(token.address);

  const balanceFormatted = balance ? formatUnits(balance, token.decimals) : "0";
  const hasBalance = balance && balance > BigInt(0);

  const handleWithdraw = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      onWithdraw(token.address, withdrawAmount, token.decimals);
      setWithdrawAmount("");
    }
  };

  const handleWithdrawAll = () => {
    onWithdrawAll(token.address);
    setWithdrawAmount("");
  };

  // Show all tokens, but with different styling for zero balance
  const isZeroBalance = !hasBalance;

  return (
    <div
      className={`bg-[#1E1E1E] rounded-lg p-4 border transition-colors ${
        isZeroBalance
          ? "border-[rgba(163,163,163,0.1)] opacity-60"
          : "border-[rgba(6,182,212,0.15)] hover:border-[rgba(6,182,212,0.3)]"
      }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{token.icon}</div>
          <div>
            <h4
              className="text-lg font-normal text-white"
              style={{
                fontFamily: "Space Grotesk",
                letterSpacing: "-0.5px",
              }}>
              {token.symbol}
            </h4>
            <p
              className="text-sm text-[#A3A3A3] font-normal"
              style={{ fontFamily: "Space Grotesk" }}>
              {token.name}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-xl font-normal ${
              isZeroBalance ? "text-[#A3A3A3]" : "text-[#06B6D4]"
            }`}
            style={{
              fontFamily: "Space Grotesk",
              letterSpacing: "-0.5px",
            }}>
            {balanceFormatted} {token.symbol}
          </p>
          <p
            className="text-xs text-[#A3A3A3] font-normal"
            style={{ fontFamily: "Space Grotesk" }}>
            {isZeroBalance ? "No balance" : "Available to withdraw"}
          </p>
        </div>
      </div>

      {!isZeroBalance && (
        <div className="space-y-3">
          {/* Partial Withdraw */}
          <div>
            <AmountInput
              value={withdrawAmount}
              onChange={setWithdrawAmount}
              label={`Withdraw ${token.symbol}`}
              maxValue={balance || BigInt(0)}
              maxLabel="Max"
              disabled={isWithdrawing || withdrawLocked}
            />
            <TransactionButton
              onClick={handleWithdraw}
              disabled={
                withdrawLocked ||
                !withdrawAmount ||
                parseFloat(withdrawAmount) <= 0 ||
                parseFloat(withdrawAmount) > parseFloat(balanceFormatted)
              }
              loading={isWithdrawing}
              variant="secondary"
              size="sm"
              className="w-full mt-2">
              Withdraw {withdrawAmount ? `${withdrawAmount} ` : ""}
              {token.symbol}
            </TransactionButton>
          </div>

          {/* Withdraw All */}
          <TransactionButton
            onClick={handleWithdrawAll}
            disabled={!hasBalance || withdrawLocked}
            loading={isWithdrawing}
            variant="primary"
            size="sm"
            className="w-full">
            Withdraw All {token.symbol}
          </TransactionButton>
          {withdrawLocked && (
            <p
              className="text-xs text-yellow-400 text-center"
              style={{ fontFamily: "Space Grotesk" }}>
              Withdrawal locked while your loan is active.
            </p>
          )}
        </div>
      )}

      {isZeroBalance && (
        <div className="text-center py-2">
          <p
            className="text-sm text-[#A3A3A3] font-normal"
            style={{ fontFamily: "Space Grotesk" }}>
            No balance available for withdrawal
          </p>
        </div>
      )}
    </div>
  );
};
