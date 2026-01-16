"use client";

import { useEffect, useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import BankAction from "@/components/BankSelect";

export default function DashboardClient({
  totalLoan,
  securityDeposit,
  depositPercentage,
  depositTx,
  withdrawalTx,
  bank,
}) {
  const [showBank, setShowBank] = useState(false);
  const isActivelyProcessing = withdrawalTx?.status === "awaiting_bank";
  const isProcessing = Boolean(bank || withdrawalTx);

  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinning(false);
    }, 40000); // 40 seconds

    return () => clearTimeout(timer);
  }, []);
  if (!spinning) return <h1>Your Transfer is currently Processing</h1>;

  return (
    <>
      {/* Security Deposit */}
      {!depositTx && (
        <PaymentModal
          triggerLabel="Pay Security Deposit"
          loanAmount={totalLoan}
          deposit={securityDeposit}
          percentage={depositPercentage}
        />
      )}

      {/* Withdraw Button */}
      <button
        disabled={isProcessing}
        onClick={() => !isProcessing && setShowBank(true)}
        className={`px-6 py-3 rounded-xl font-bold transition
          ${
            isProcessing
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
      >
        {isProcessing ? "Processing..." : "Withdraw to Bank"}
      </button>

      {/* Processing Overlay */}
      {/* {isProcessing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800">
              Withdrawal Processing
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Your bank details have been received.
              <br />
              Please wait while we process your withdrawal.
            </p>

            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )} */}

      {isActivelyProcessing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800">Withdrawal Processing</h3>
            <p className="text-sm text-slate-500 mt-2">
              Your bank details have been received. Please wait while we process your withdrawal.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Modal */}
      {showBank && !isProcessing && (
        <BankAction
          withdrawalId={withdrawalTx?._id}
          amount={withdrawalTx?.amount}
          onClose={() => setShowBank(false)}
        />
      )}
    </>
  );
}
