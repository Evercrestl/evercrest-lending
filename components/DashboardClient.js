// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import PaymentModal from "@/components/PaymentModal";
// // // import BankAction from "@/components/BankSelect";

// // // export default function DashboardClient({
// // //   user,
// // //   totalLoan,
// // //   securityDeposit,
// // //   depositPercentage,
// // //   depositTx,
// // //   withdrawalTx,
// // //   bank,
// // // }) {
// // //   const [showBank, setShowBank] = useState(false);
// // //   const isActivelyProcessing = withdrawalTx?.status === "awaiting_bank";
// // //   const isProcessing = Boolean(bank || withdrawalTx);

// // //   const [spinning, setSpinning] = useState(true);

// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       setSpinning(false);
// // //     }, 40000); // 40 seconds

// // //     return () => clearTimeout(timer);
// // //   }, []);
// // //   if (!spinning) return <h1>Your Transfer is currently Processing</h1>;

// // //   return (
// // //     <>
// // //       {/* Security Deposit */}
// // //       {!depositTx && (
// // //         <PaymentModal
// // //           triggerLabel="Pay Security Deposit"
// // //           loanAmount={totalLoan}
// // //           deposit={securityDeposit}
// // //           percentage={depositPercentage}
// // //         />
// // //       )}

// // //       {/* Withdraw Button */}
// // //       <button
// // //         disabled={isProcessing}
// // //         onClick={() => !isProcessing && setShowBank(true)}
// // //         className={`px-6 py-3 rounded-xl font-bold transition
// // //           ${
// // //             isProcessing
// // //               ? "bg-gray-300 text-gray-600 cursor-not-allowed"
// // //               : "bg-green-600 text-white hover:bg-green-700"
// // //           }`}
// // //       >
// // //         {isProcessing ? "Processing..." : "Withdraw to Bank"}
// // //       </button>

// // //       {/* Processing Overlay */}
// // //       {isProcessing && (
// // //         <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
// // //           <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-sm w-full">
// // //             <h3 className="text-lg font-bold text-slate-800">
// // //               Withdrawal Processing
// // //             </h3>
// // //             <p className="text-sm text-slate-500 mt-2">
// // //               Your bank details have been received.
// // //               <br />
// // //               Please wait while we process your withdrawal.
// // //             </p>

// // //             <div className="mt-4 flex justify-center">
// // //               <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {isActivelyProcessing && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center">
// // //           <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-sm w-full">
// // //             <h3 className="text-lg font-bold text-slate-800">Withdrawal Processing</h3>
// // //             <p className="text-sm text-slate-500 mt-2">
// // //               Your bank details have been received. Please wait while we process your withdrawal.
// // //             </p>
// // //             <div className="mt-4 flex justify-center">
// // //               <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Bank Modal */}
// // //       {showBank && !isProcessing && (
// // //         <BankAction
// // //           withdrawalId={withdrawalTx?._id}
// // //           amount={withdrawalTx?.amount}
// // //           onClose={() => setShowBank(false)}
// // //         />
// // //       )}
// // //     </>
// // //   );
// // // }


// // "use client";

// // import { useEffect, useState } from "react";
// // import PaymentModal from "@/components/PaymentModal";
// // import BankAction from "@/components/BankSelect";

// // export default function DashboardClient({
// //   user,
// //   totalLoan,
// //   securityDeposit,
// //   depositPercentage,
// //   depositTx,
// //   withdrawalTx,
// //   bank,
// // }) {
// //   const [showBankModal, setShowBankModal] = useState(false);
// //   const [spinning, setSpinning] = useState(true);

// //   // Logic for the 40-second processing simulation
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setSpinning(false);
// //     }, 40000); 
// //     return () => clearTimeout(timer);
// //   }, []);

// //   // 1. Check if deposit is completed
// //   const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
  
// //   // 2. Check if bank details exist
// //   const hasBankDetails = Boolean(bank);

// //   // 3. Check if withdrawal is in progress (after bank details are added)
// //   const isWithdrawalProcessing = withdrawalTx?.status === "processing" || withdrawalTx?.status === "pending";

// //   // If the 40s timer is active and we are in a final processing state
// //   if (!spinning && isWithdrawalProcessing) {
// //     return (
// //       <div className="text-center mt-20">
// //         <h1 className="text-2xl font-bold">Your Transfer is currently Processing</h1>
// //         <p className="text-gray-500">Please check back later.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
      
// //       {/* STEP 1: Pay Security Deposit */}
// //       {!isDepositPaid ? (
// //         <PaymentModal
// //           triggerLabel="Pay Security Deposit"
// //           loanAmount={totalLoan}
// //           deposit={securityDeposit}
// //           percentage={depositPercentage}
// //         />
// //       ) : 
      
// //       /* STEP 2: Add Bank Details (Only shows if Deposit is Paid but no Bank) */
// //       !hasBankDetails ? (
// //         <button
// //           onClick={() => setShowBankModal(true)}
// //           className="px-6 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
// //         >
// //           Add Bank Details
// //         </button>
// //       ) : 
      
// //       /* STEP 3: Make Withdrawal (Only shows if Bank exists and withdrawal is awaiting) */
// //       withdrawalTx?.status === "awaiting_bank" ? (
// //         <button
// //           onClick={() => setShowBankModal(true)} // Or your specific withdrawal logic
// //           className="px-6 py-3 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition"
// //         >
// //           Make Withdrawal
// //         </button>
// //       ) : (
// //         /* FINAL STEP: Processing State */
// //         <div className="text-center">
// //            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //            <p className="font-medium text-slate-700">Withdrawal is being processed...</p>
// //         </div>
// //       )}

// //       {/* Modals */}
// //       {showBankModal && (
// //         <BankAction
// //           withdrawalId={withdrawalTx?._id}
// //           amount={withdrawalTx?.amount}
// //           onClose={() => setShowBankModal(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

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
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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

  // --- PERSISTENCE LOGIC (Driven by your MongoDB Schema) ---
  
  // 1. Deposit is "Paid" only if the transaction status is 'approved' or 'completed'
  const isDepositPaid = depositTx && (depositTx.status === "approved" || depositTx.status === "completed");
  
  // 2. Bank is added if the bank object exists
  const hasBankDetails = Boolean(bank);

  // 3. Withdrawal Statuses
  const isAwaitingWithdrawal = withdrawalTx?.status === "awaiting_bank";
  const isProcessing = withdrawalTx?.status === "pending"; // Stage where timer runs
  const isCompleted = withdrawalTx?.status === "completed";

  // Simulation timer for the 40s "Finalizing" stage
  useEffect(() => {
    if (isFinalizing || (isProcessing && !isCompleted)) {
      setSpinning(true);
      const timer = setTimeout(() => {
        setSpinning(false);
        // After 40s, we assume the UI should move to 'Processing' text
      }, 40000);
      return () => clearTimeout(timer);
    }
  }, [isFinalizing, isProcessing, isCompleted]);

  // --- VIEW LAYERS ---

  // STAGE 4: Final Success (Persistent)
  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-black text-slate-800">Transfer Successful</h1>
        <p className="text-slate-500 mt-2 max-w-xs">Your loan of ₱{totalLoan?.toLocaleString()} has been successfully disbursed to your bank account.</p>
      </div>
    );
  }

  // STAGE 3.5: The 40s "Processing" Overlay
  if ((isFinalizing || isProcessing) && spinning) {
    return (
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl text-center max-w-sm w-full animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Finalizing Transfer</h3>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            We are securing your disbursement. <br/> Please <b>do not refresh</b> or close this page.
          </p>
        </div>
      </div>
    );
  }

  // STAGE 3.6: Post-Timer State (Wait for Admin)
  if (isProcessing && !spinning) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-2xl font-bold text-blue-600">Disbursement Processing</h1>
        <p className="text-slate-500 mt-2">Your funds are being queued for bank transfer. This usually takes 1-2 hours.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* STEP 1: DEPOSIT (Disappears forever once depositTx is 'approved') */}
      {!isDepositPaid ? (
        <div className="w-full flex flex-col items-center gap-4">
           <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Step 1: Security Verification</p>
           <PaymentModal
            triggerLabel="Pay Security Deposit"
            loanAmount={totalLoan}
            deposit={securityDeposit}
            percentage={depositPercentage}
          />
        </div>
      ) : 

      /* STEP 2: BANK DETAILS (Only shows if Step 1 is cleared) */
      !hasBankDetails ? (
        <div className="w-full flex flex-col items-center gap-4">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Step 2: Destination Account</p>
          <button
            onClick={() => setShowBankModal(true)}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
          >
            Add Bank Details
          </button>
        </div>
      ) : 

      /* STEP 3: WITHDRAWAL (Only shows if Step 1 & 2 are cleared) */
      isAwaitingWithdrawal ? (
        <div className="w-full flex flex-col items-center gap-4">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Step 3: Final Release</p>
          <button
            onClick={() => setIsFinalizing(true)} 
            className="w-full sm:w-auto px-12 py-5 rounded-2xl font-bold bg-green-600 text-white shadow-xl hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
          >
            Request Withdrawal
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-slate-300" size={32} />
          <p className="text-slate-500 italic">Verifying your records...</p>
        </div>
      )}

      {/* --- MODALS --- */}
      {showBankModal && (
        <BankAction
          withdrawalId={withdrawalTx?._id}
          amount={withdrawalTx?.amount}
          onClose={() => setShowBankModal(false)}
        />
      )}
    </div>
  );
}