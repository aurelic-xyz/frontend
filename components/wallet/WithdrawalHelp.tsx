"use client";

import React from "react";

interface LoanStats {
  totalLoansCreated: bigint;
  totalLoansRepaid: bigint;
  activeLoans: bigint;
}

interface WithdrawalHelpProps {
  loanStats: LoanStats | null;
}

export const WithdrawalHelp: React.FC<WithdrawalHelpProps> = ({
  loanStats,
}) => {
  return (
    <div className="bg-teal-900/20 border border-teal-600/30 rounded-lg p-4">
      <h3 className="text-lg font-medium text-teal-400 mb-2">
        How Withdrawal Works
      </h3>
      <ul className="text-sm text-gray-300 space-y-2">
        <li>• You can only withdraw when no active loan exists</li>
        <li>
          • Withdrawals transfer tokens from restricted wallet to your main
          wallet
        </li>
        <li>• You can withdraw partial amounts or all tokens at once</li>
        <li>• Each withdrawal requires a separate transaction and gas fee</li>
        <li>• Loan must be fully repaid before withdrawal is unlocked</li>
      </ul>

      {loanStats && loanStats.totalLoansRepaid > 0 && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
          <h4 className="text-green-400 font-medium mb-2">
            ✅ Loan Repayment Status
          </h4>
          <p className="text-sm text-green-300">
            Your loan has been successfully repaid! This means you can now
            withdraw any trading profits that accumulated in your restricted
            wallet during the loan period.
          </p>
        </div>
      )}
    </div>
  );
};
