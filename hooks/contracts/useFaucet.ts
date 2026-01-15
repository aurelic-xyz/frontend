"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  usePublicClient,
} from "wagmi";
import { CONTRACT_CONFIGS } from "@/lib/contracts/addresses";

export const useFaucet = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [isMinting, setIsMinting] = useState(false);
  const [mintHash, setMintHash] = useState<`0x${string}` | undefined>(
    undefined
  );
  const [mintError, setMintError] = useState<string | null>(null);
  const [balanceBeforeMint, setBalanceBeforeMint] = useState<bigint | null>(
    null
  );
  const [hasUpdatedBalance, setHasUpdatedBalance] = useState(false);
  const isAwaitingBalanceUpdate = !!mintHash && !hasUpdatedBalance;

  // Get USDC balance and keep it in sync
  const { data: usdcBalance, refetch: refetchBalance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
      refetchOnWindowFocus: true,
    },
  });

  const { writeContractAsync: mintAsync } = useWriteContract();

  // Wait for tx confirmation then refresh balance
  const { isLoading: isMintingTx, isSuccess: isMintingSuccess } =
    useWaitForTransactionReceipt({
      hash: mintHash,
      confirmations: 1,
    });

  // Reset minting state on success
  useEffect(() => {
    if (isMintingSuccess) {
      refetchBalance();
      setIsMinting(false);
      // allow success banner only after balance reflects change
      if (usdcBalance !== undefined && usdcBalance !== null) {
        try {
          const current = BigInt(usdcBalance as bigint);
          if (balanceBeforeMint !== null && current > balanceBeforeMint) {
            setHasUpdatedBalance(true);
          }
        } catch {
          // ignore parse errors
        }
      }
    }
  }, [isMintingSuccess, balanceBeforeMint, usdcBalance, refetchBalance]);

  // When balance changes independently (event listener), mark update
  useEffect(() => {
    if (
      mintHash &&
      !hasUpdatedBalance &&
      balanceBeforeMint !== null &&
      usdcBalance !== undefined &&
      usdcBalance !== null
    ) {
      try {
        const current = BigInt(usdcBalance as bigint);
        if (current > balanceBeforeMint) {
          setHasUpdatedBalance(true);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, [mintHash, hasUpdatedBalance, balanceBeforeMint, usdcBalance]);

  // Listen to Transfer events to refresh balance quickly, in case receipt polling lags
  useWatchContractEvent({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    eventName: "Transfer",
    args: { to: address },
    enabled: !!address,
    onLogs: () => {
      refetchBalance();
      setIsMinting(false);
    },
  });

  const handleMint = async () => {
    if (!address || !publicClient) return;
    setIsMinting(true);
    setMintError(null);
    setHasUpdatedBalance(false);
    if (usdcBalance !== undefined && usdcBalance !== null) {
      try {
        setBalanceBeforeMint(BigInt(usdcBalance as bigint));
      } catch {
        setBalanceBeforeMint(null);
      }
    } else {
      setBalanceBeforeMint(null);
    }

    try {
      // Mint 1000 USDC (1000 * 10^6 = 1,000,000,000)
      const amount = BigInt(1000 * 10 ** 6);

      // First, simulate the transaction to catch any revert reasons
      try {
        await publicClient.simulateContract({
          ...CONTRACT_CONFIGS.MOCK_USDC,
          functionName: "mint",
          args: [address, amount],
          account: address,
        });
      } catch (simError: unknown) {
        console.error("Simulation error:", simError);
        // Extract revert reason if available
        const errorMessage =
          simError instanceof Error
            ? simError.message
            : "Transaction would fail";
        if (errorMessage.includes("Cannot mint to zero address")) {
          setMintError("Cannot mint to zero address");
        } else if (errorMessage.includes("execution reverted")) {
          setMintError(
            "Transaction reverted. The contract may have restrictions."
          );
        } else {
          // Continue anyway - simulation might fail but tx could succeed
          console.warn("Simulation failed but attempting transaction anyway");
        }
      }

      const txHash = await mintAsync({
        ...CONTRACT_CONFIGS.MOCK_USDC,
        functionName: "mint",
        args: [address, amount],
      });
      setMintHash(txHash);
    } catch (error: unknown) {
      console.error("Mint error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // Parse common error messages
      if (
        errorMessage.includes("User rejected") ||
        errorMessage.includes("user rejected")
      ) {
        setMintError("Transaction was rejected by user");
      } else if (errorMessage.includes("insufficient funds")) {
        setMintError(
          "Insufficient MNT for gas fees. Please get testnet MNT first."
        );
      } else if (errorMessage.includes("Internal JSON-RPC error")) {
        setMintError(
          "RPC error. Please try again or check your network connection."
        );
      } else {
        setMintError(errorMessage.slice(0, 100)); // Truncate long errors
      }
      setIsMinting(false);
    }
  };

  const resetStates = () => {
    setIsMinting(false);
    setMintHash(undefined);
    setHasUpdatedBalance(false);
    setMintError(null);
  };

  const isBusy = isMinting || isMintingTx || isAwaitingBalanceUpdate;

  return {
    usdcBalance,
    isMinting,
    isBusy,
    handleMint,
    resetStates,
    refetchBalance,
    mintHash,
    hasUpdatedBalance,
    mintError,
  };
};
