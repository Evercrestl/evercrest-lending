"use client";

import React, { useState } from "react";
import { processSecurityDeposit } from "@/app/actions/payment";
import { X, ShieldCheck, Info, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const result = await processSecurityDeposit(deposit);

  //   if (result.success) {
  //     setLoading(false);
  //     setIsOpen(false);
  //     toast.success("Deposit Confirmed", {
  //       description: `₱${deposit.toLocaleString()} has been processed successfully.`,
  //     });
  //   } else {
  //     setLoading(false);
  //     toast.error("Payment Failed", {
  //       description: result.message,
  //     });
  //   }
  // };

  //   const handlePayment = (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     // 1. Prepare the data for the message
  //     const phoneNumber = "+601169615778"; // Replace with your actual WhatsApp number (include country code)
  //     const message = `Hello, I would like to confirm my security deposit:

  // *Loan Details:*
  // - Total Loan: ₱${loanAmount.toLocaleString()}
  // - Deposit Amount (${percentage}%): ₱${deposit.toLocaleString()}
  // - Payment Method: GCash / Maya

  // Please provide the payment instructions. Thank you!`;

  //     // 2. Encode the message for URL safety
  //     const encodedMessage = encodeURIComponent(message);
  //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  //     // 3. Simulate a brief loading state for UX, then redirect
  //     setTimeout(() => {
  //       setLoading(false);
  //       setIsOpen(false);
  //       window.open(whatsappUrl, "_blank"); // Opens WhatsApp in a new tab

  //       toast.success("Redirecting to WhatsApp...", {
  //         description: "Please send the pre-filled message to our support team.",
  //       });
  //     }, 800);
  //   };
//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Record the transaction in the database first
//       // We pass the amount as negative because it's a deposit/payment
//       const result = await processSecurityDeposit({
//         amount: -deposit,
//         description: `Security Deposit for ₱${loanAmount.toLocaleString()} Loan`,
//         status: "pending" // Ensure your server action handles a 'pending' status
//       });

//       if (result.success) {
//         // 2. Prepare WhatsApp Data
//         const phoneNumber = "639123456789";
//         const message = `Hello! I just initiated a security deposit.
        
// *Transaction ID:* ${result.transactionId || 'NEW'}
// *Loan:* ₱${loanAmount.toLocaleString()}
// *Deposit:* ₱${deposit.toLocaleString()}

// Please verify my payment.`;

//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//         // 3. UI Feedback and Redirect
//         toast.success("Transaction Recorded", {
//           description: "Redirecting to WhatsApp for verification...",
//         });

//         setTimeout(() => {
//           setIsOpen(false);
//           setLoading(false);
//           window.open(whatsappUrl, "_blank");
//         }, 1000);

//       } else {
//         throw new Error(result.message || "Failed to log transaction");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("Error", {
//         description: error.message,
//       });
//     }
//   };


  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Call your Server Action (payment.js) to save to MongoDB
      // We pass the deposit amount (e.g., 3500)
      const result = await processSecurityDeposit(deposit);

      if (result.success) {
        // 2. Prepare WhatsApp Data
        const phoneNumber = "+601169615778"; // YOUR GCASH/SUPPORT NUMBER
        const message = `*LOAN DEPOSIT NOTIFICATION* 🏦
--------------------------------
Hello Support, I have just initiated my security deposit payment.

*Details:*
- Loan Amount: ₱${loanAmount.toLocaleString()}
- Security Deposit Fee (7%): ₱ ${deposit.toLocaleString()}
- User: ${triggerLabel === 'Withdraw' ? 'Customer' : triggerLabel}

Please verify my payment so I can proceed with the withdrawal.`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // 3. Success Feedback
        toast.success("Transaction Logged", {
          description: "Opening WhatsApp for verification...",
        });

        // 4. Redirect to WhatsApp
        setTimeout(() => {
          setIsOpen(false);
          setLoading(false);
          window.open(whatsappUrl, "_blank");
        }, 1000);

      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Process Failed", {
        description: error.message || "Could not connect to server",
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95"
      >
        {triggerLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck size={24} />
                  Security Deposit
                </h3>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                  <X size={20} />
                </button>
              </div>
              <p className="text-blue-100 text-xs mt-2 opacity-80">
                Finalize your ₱{loanAmount.toLocaleString()} loan disbursement.
              </p>
            </div>

            <form onSubmit={handlePayment} className="p-8 space-y-5">
              {/* Calculation Summary Box */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                <div className="flex gap-3 mb-2">
                  <Info className="text-blue-600 shrink-0" size={18} />
                  <p className="text-[11px] text-blue-800 font-semibold uppercase tracking-wider">
                    Deposit Requirement ({percentage}%)
                  </p>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  To withdraw your loan of <b>₱{loanAmount.toLocaleString()}</b>, a refundable security deposit of <b>₱{deposit.toLocaleString()}</b> is required.
                </p>
              </div>

              {/* Read-only Total Loan Amount Field */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Total Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-900 font-bold">₱</span>
                  <input
                    type="text"
                    readOnly
                    value={loanAmount.toLocaleString()}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 font-black text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Pay Deposit Via
                </label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>GCash / Maya</option>
                  <option>Online Bank Transfer</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-100 flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Confirm ₱ {deposit.toLocaleString()}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
