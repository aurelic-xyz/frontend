"use client";

import React from "react";

interface LoanStats {
  totalLoansCreated: bigint;
  totalLoansRepaid: bigint;
  activeLoans: bigint;
}

interface LoanStatsPanelProps {
  loanStats: LoanStats;
}

export const LoanStatsPanel: React.FC<LoanStatsPanelProps> = ({
  loanStats,
}) => {
  return (
    <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
      <h3 className="text-lg font-medium text-blue-400 mb-2">
        Loan Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-300">Total Loans Created</p>
          <p className="text-white font-medium">
            {String(loanStats.totalLoansCreated || 0)}
          </p>
        </div>
        <div>
          <p className="text-gray-300">Total Loans Repaid</p>
          <p className="text-white font-medium">
            {String(loanStats.totalLoansRepaid || 0)}
          </p>
        </div>
        <div>
          <p className="text-gray-300">Active Loans</p>
          <p className="text-white font-medium">
            {String(loanStats.activeLoans || 0)}
          </p>
        </div>
      </div>
      {loanStats.totalLoansRepaid > 0 && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-green-400 text-sm font-medium">
              Your loan has been successfully repaid! You can now withdraw your
              trading profits.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
