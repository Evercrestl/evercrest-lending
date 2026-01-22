// // // // "use client";

// // // // import React, { useState } from "react";
// // // // import { processSecurityDeposit } from "@/app/actions/payment";
// // // // import { X, ShieldCheck, Info, Loader2 } from "lucide-react";
// // // // import { toast, Toaster } from "sonner";

// // // // export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(false);

// // // //   // const handlePayment = async (e) => {
// // // //   //   e.preventDefault();
// // // //   //   setLoading(true);

// // // //   //   const result = await processSecurityDeposit(deposit);

// // // //   //   if (result.success) {
// // // //   //     setLoading(false);
// // // //   //     setIsOpen(false);
// // // //   //     toast.success("Deposit Confirmed", {
// // // //   //       description: `₱${deposit.toLocaleString()} has been processed successfully.`,
// // // //   //     });
// // // //   //   } else {
// // // //   //     setLoading(false);
// // // //   //     toast.error("Payment Failed", {
// // // //   //       description: result.message,
// // // //   //     });
// // // //   //   }
// // // //   // };

// // // //   //   const handlePayment = (e) => {
// // // //   //     e.preventDefault();
// // // //   //     setLoading(true);

// // // //   //     // 1. Prepare the data for the message
// // // //   //     const phoneNumber = "+601169615778"; // Replace with your actual WhatsApp number (include country code)
// // // //   //     const message = `Hello, I would like to confirm my security deposit:

// // // //   // *Loan Details:*
// // // //   // - Total Loan: ₱${loanAmount.toLocaleString()}
// // // //   // - Deposit Amount (${percentage}%): ₱${deposit.toLocaleString()}
// // // //   // - Payment Method: GCash / Maya

// // // //   // Please provide the payment instructions. Thank you!`;

// // // //   //     // 2. Encode the message for URL safety
// // // //   //     const encodedMessage = encodeURIComponent(message);
// // // //   //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

// // // //   //     // 3. Simulate a brief loading state for UX, then redirect
// // // //   //     setTimeout(() => {
// // // //   //       setLoading(false);
// // // //   //       setIsOpen(false);
// // // //   //       window.open(whatsappUrl, "_blank"); // Opens WhatsApp in a new tab

// // // //   //       toast.success("Redirecting to WhatsApp...", {
// // // //   //         description: "Please send the pre-filled message to our support team.",
// // // //   //       });
// // // //   //     }, 800);
// // // //   //   };
// // // // //   const handlePayment = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       // 1. Record the transaction in the database first
// // // // //       // We pass the amount as negative because it's a deposit/payment
// // // // //       const result = await processSecurityDeposit({
// // // // //         amount: -deposit,
// // // // //         description: `Security Deposit for ₱${loanAmount.toLocaleString()} Loan`,
// // // // //         status: "pending" // Ensure your server action handles a 'pending' status
// // // // //       });

// // // // //       if (result.success) {
// // // // //         // 2. Prepare WhatsApp Data
// // // // //         const phoneNumber = "639123456789";
// // // // //         const message = `Hello! I just initiated a security deposit.

// // // // // *Transaction ID:* ${result.transactionId || 'NEW'}
// // // // // *Loan:* ₱${loanAmount.toLocaleString()}
// // // // // *Deposit:* ₱${deposit.toLocaleString()}

// // // // // Please verify my payment.`;

// // // // //         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

// // // // //         // 3. UI Feedback and Redirect
// // // // //         toast.success("Transaction Recorded", {
// // // // //           description: "Redirecting to WhatsApp for verification...",
// // // // //         });

// // // // //         setTimeout(() => {
// // // // //           setIsOpen(false);
// // // // //           setLoading(false);
// // // // //           window.open(whatsappUrl, "_blank");
// // // // //         }, 1000);

// // // // //       } else {
// // // // //         throw new Error(result.message || "Failed to log transaction");
// // // // //       }
// // // // //     } catch (error) {
// // // // //       setLoading(false);
// // // // //       toast.error("Error", {
// // // // //         description: error.message,
// // // // //       });
// // // // //     }
// // // // //   };


// // // //   const handlePayment = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     try {
// // // //       // 1. Call your Server Action (payment.js) to save to MongoDB
// // // //       // We pass the deposit amount (e.g., 3500)
// // // //       const result = await processSecurityDeposit(deposit);

// // // //       if (result.success) {
// // // //         // 2. Prepare WhatsApp Data
// // // //         const phoneNumber = "+601169615778"; // YOUR GCASH/SUPPORT NUMBER
// // // //         const message = `*LOAN DEPOSIT NOTIFICATION* 🏦
// // // // --------------------------------
// // // // Hello Support, I have just initiated my security deposit payment.

// // // // *Details:*
// // // // - Loan Amount: ₱${loanAmount.toLocaleString()}
// // // // - Security Deposit Fee (7%): ₱ ${deposit.toLocaleString()}
// // // // - User: ${triggerLabel === 'Withdraw' ? 'Customer' : triggerLabel}

// // // // Please verify my payment so I can proceed with the withdrawal.`;

// // // //         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

// // // //         // 3. Success Feedback
// // // //         toast.success("Transaction Logged", {
// // // //           description: "Opening WhatsApp for verification...",
// // // //         });

// // // //         // 4. Redirect to WhatsApp
// // // //         setTimeout(() => {
// // // //           setIsOpen(false);
// // // //           setLoading(false);
// // // //           window.open(whatsappUrl, "_blank");
// // // //         }, 1000);

// // // //       } else {
// // // //         throw new Error(result.message);
// // // //       }
// // // //     } catch (error) {
// // // //       setLoading(false);
// // // //       toast.error("Process Failed", {
// // // //         description: error.message || "Could not connect to server",
// // // //       });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Toaster position="top-center" richColors />
// // // //       <button
// // // //         onClick={() => setIsOpen(true)}
// // // //         className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95"
// // // //       >
// // // //         {triggerLabel}
// // // //       </button>

// // // //       {isOpen && (
// // // //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //           <div
// // // //             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
// // // //             onClick={() => setIsOpen(false)}
// // // //           />

// // // //           <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

// // // //             {/* Header */}
// // // //             <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white">
// // // //               <div className="flex justify-between items-center">
// // // //                 <h3 className="text-xl font-bold flex items-center gap-2">
// // // //                   <ShieldCheck size={24} />
// // // //                   Security Deposit
// // // //                 </h3>
// // // //                 <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
// // // //                   <X size={20} />
// // // //                 </button>
// // // //               </div>
// // // //               <p className="text-blue-100 text-xs mt-2 opacity-80">
// // // //                 Finalize your ₱{loanAmount.toLocaleString()} loan disbursement.
// // // //               </p>
// // // //             </div>

// // // //             <form onSubmit={handlePayment} className="p-8 space-y-5">
// // // //               {/* Calculation Summary Box */}
// // // //               <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
// // // //                 <div className="flex gap-3 mb-2">
// // // //                   <Info className="text-blue-600 shrink-0" size={18} />
// // // //                   <p className="text-[11px] text-blue-800 font-semibold uppercase tracking-wider">
// // // //                     Deposit Requirement ({percentage}%)
// // // //                   </p>
// // // //                 </div>
// // // //                 <p className="text-xs text-blue-700 leading-relaxed">
// // // //                   To withdraw your loan of <b>₱{loanAmount.toLocaleString()}</b>, a refundable security deposit of <b>₱{deposit.toLocaleString()}</b> is required.
// // // //                 </p>
// // // //               </div>

// // // //               {/* Read-only Total Loan Amount Field */}
// // // //               <div>
// // // //                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
// // // //                   Total Loan Amount
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <span className="absolute left-4 top-3 text-slate-900 font-bold">₱</span>
// // // //                   <input
// // // //                     type="text"
// // // //                     readOnly
// // // //                     value={loanAmount.toLocaleString()}
// // // //                     className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 font-black text-slate-800 outline-none"
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               {/* Payment Method Selector */}
// // // //               <div>
// // // //                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
// // // //                   Pay Deposit Via
// // // //                 </label>
// // // //                 <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
// // // //                   <option>GCash / Maya</option>
// // // //                   <option>Online Bank Transfer</option>
// // // //                 </select>
// // // //               </div>

// // // //               {/* Action Buttons */}
// // // //               <div className="flex gap-3 pt-4">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setIsOpen(false)}
// // // //                   className="flex-1 px-4 py-3 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 transition"
// // // //                 >
// // // //                   Back
// // // //                 </button>
// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={loading}
// // // //                   className="flex-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-100 flex justify-center items-center gap-2"
// // // //                 >
// // // //                   {loading ? (
// // // //                     <Loader2 className="w-5 h-5 animate-spin" />
// // // //                   ) : (
// // // //                     <>Confirm ₱ {deposit.toLocaleString()}</>
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // }


// // // "use client";

// // // import React, { useState } from "react";
// // // import { processSecurityDeposit } from "@/app/actions/payment";
// // // import { X, ShieldCheck, Info, Loader2 } from "lucide-react";
// // // import { toast, Toaster } from "sonner";

// // // export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [loading, setLoading] = useState(false);

// // //   const handlePayment = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       const result = await processSecurityDeposit(deposit);

// // //       if (result.success) {
// // //         const phoneNumber = "+601169615778"; 
// // //         const message = `*LOAN DEPOSIT NOTIFICATION* 🏦\n--------------------------------\nHello Support, I have just initiated my security deposit payment.\n\n*Details:*\n- Loan Amount: ₱${loanAmount.toLocaleString()}\n- Security Deposit Fee (${percentage}%): ₱${deposit.toLocaleString()}\n\nPlease verify my payment so I can proceed with the withdrawal.`;

// // //         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

// // //         toast.success("Transaction Logged", {
// // //           description: "Opening WhatsApp for verification...",
// // //         });

// // //         setTimeout(() => {
// // //           setIsOpen(false);
// // //           setLoading(false);
// // //           window.open(whatsappUrl, "_blank");
// // //         }, 1000);

// // //       } else {
// // //         throw new Error(result.message);
// // //       }
// // //     } catch (error) {
// // //       setLoading(false);
// // //       toast.error("Process Failed", {
// // //         description: error.message || "Could not connect to server",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Toaster position="top-center" richColors />

// // //       {/* Trigger Button */}
// // //       <button
// // //         onClick={() => setIsOpen(true)}
// // //         className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-sm sm:text-base"
// // //       >
// // //         {triggerLabel}
// // //       </button>

// // //       {isOpen && (
// // //         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
// // //           {/* Backdrop */}
// // //           <div
// // //             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
// // //             onClick={() => setIsOpen(false)}
// // //           />

// // //           {/* Modal Container */}
// // //           <div className="relative bg-white w-full max-w-lg sm:max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">

// // //             {/* Header - Compact on mobile */}
// // //             <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shrink-0">
// // //               <div className="flex justify-between items-center">
// // //                 <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
// // //                   <ShieldCheck size={22} className="shrink-0" />
// // //                   Security Deposit
// // //                 </h3>
// // //                 <button 
// // //                   onClick={() => setIsOpen(false)} 
// // //                   className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
// // //                 >
// // //                   <X size={18} />
// // //                 </button>
// // //               </div>
// // //               <p className="text-blue-100 text-[11px] sm:text-xs mt-1.5 opacity-90">
// // //                 Loan ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
// // //               </p>
// // //             </div>

// // //             {/* Content Body - Scrollable on short screens */}
// // //             <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
// // //               <form onSubmit={handlePayment} className="space-y-5">

// // //                 {/* Information Box */}
// // //                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl sm:rounded-2xl">
// // //                   <div className="flex gap-2.5 mb-1.5">
// // //                     <Info className="text-blue-600 shrink-0" size={16} />
// // //                     <p className="text-[10px] sm:text-[11px] text-blue-800 font-bold uppercase tracking-wider">
// // //                       Required Action ({percentage}%)
// // //                     </p>
// // //                   </div>
// // //                   <p className="text-[12px] sm:text-xs text-blue-700 leading-relaxed">
// // //                     To withdraw <b>₱{loanAmount.toLocaleString()}</b>, please process the refundable security deposit of <b>₱{deposit.toLocaleString()}</b>.
// // //                   </p>
// // //                 </div>

// // //                 {/* Amount Field */}
// // //                 <div>
// // //                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
// // //                     Disbursement Amount
// // //                   </label>
// // //                   <div className="relative">
// // //                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₱</span>
// // //                     <input
// // //                       type="text"
// // //                       readOnly
// // //                       value={loanAmount.toLocaleString()}
// // //                       className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm sm:text-base font-bold text-slate-700 outline-none"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 {/* Payment Method Selector */}
// // //                 <div>
// // //                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
// // //                     Preferred Method
// // //                   </label>
// // //                   <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
// // //                     <option>GCash / Maya</option>
// // //                     <option>Online Bank Transfer</option>
// // //                   </select>
// // //                 </div>

// // //                 {/* Action Buttons - Stack on tiny screens, side-by-side on larger */}
// // //                 <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setIsOpen(false)}
// // //                     className="flex-1 px-4 py-3.5 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     type="submit"
// // //                     disabled={loading}
// // //                     className="flex-[2] px-4 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-100 flex justify-center items-center gap-2"
// // //                   >
// // //                     {loading ? (
// // //                       <Loader2 className="w-5 h-5 animate-spin" />
// // //                     ) : (
// // //                       <>Pay ₱{deposit.toLocaleString()}</>
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // "use client";

// // import React, { useState } from "react";
// // import { processSecurityDeposit } from "@/app/actions/payment";
// // import { X, ShieldCheck, Info, Loader2, CreditCard, Wallet } from "lucide-react";
// // import { toast, Toaster } from "sonner";

// // export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [method, setMethod] = useState("gcash"); // Default selection

// //   const handlePayment = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const result = await processSecurityDeposit(deposit);

// //       if (result.success) {
// //         const phoneNumber = "+601169615778"; 
// //         const message = `*LOAN DEPOSIT NOTIFICATION* 🏦\n--------------------------------\nHello Support, I have just initiated my security deposit payment.\n\n*Details:*\n- Loan Amount: ₱${loanAmount.toLocaleString()}\n- Security Deposit Fee (${percentage}%): ₱${deposit.toLocaleString()}\n- Method: ${method.toUpperCase()}\n\nPlease verify my payment.`;

// //         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

// //         toast.success("Transaction Logged", {
// //           description: "Opening WhatsApp for verification...",
// //         });

// //         setTimeout(() => {
// //           setIsOpen(false);
// //           setLoading(false);
// //           window.open(whatsappUrl, "_blank");
// //         }, 1000);

// //       } else {
// //         throw new Error(result.message);
// //       }
// //     } catch (error) {
// //       setLoading(false);
// //       toast.error("Process Failed", {
// //         description: error.message,
// //       });
// //     }
// //   };

// //   return (
// //     <>
// //       <Toaster position="top-center" richColors />

// //       <button
// //         onClick={() => setIsOpen(true)}
// //         className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-sm sm:text-base"
// //       >
// //         {triggerLabel}
// //       </button>

// //       {isOpen && (
// //         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
// //           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsOpen(false)} />

// //           <div className="relative bg-white w-full max-w-lg sm:max-w-md rounded-t-4xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[95vh] flex flex-col">

// //             {/* Header */}
// //             <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shrink-0">
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <h3 className="text-xl font-bold flex items-center gap-2">
// //                     <ShieldCheck size={24} />
// //                     Secure Deposit
// //                   </h3>
// //                   <p className="text-blue-100 text-xs mt-1 opacity-90">Verify your identity via security fee</p>
// //                 </div>
// //                 <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full">
// //                   <X size={18} />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
// //               <form onSubmit={handlePayment} className="space-y-6">

// //                 {/* Summary Info */}
// //                 <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
// //                   <div className="bg-blue-100 p-2 rounded-lg">
// //                     <Info className="text-blue-600" size={18} />
// //                   </div>
// //                   <div>
// //                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Amount Due</p>
// //                     <p className="text-lg font-black text-slate-800">₱{deposit.toLocaleString()}</p>
// //                   </div>
// //                 </div>

// //                 {/* Visual Method Selector */}
// //                 <div>
// //                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
// //                     Select Payment Method
// //                   </label>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <button
// //                       type="button"
// //                       onClick={() => setMethod("gcash")}
// //                       className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
// //                         method === "gcash" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
// //                       }`}
// //                     >
// //                       <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">G</div>
// //                       <span className="text-xs font-bold text-slate-700">GCash</span>
// //                     </button>

// //                     <button
// //                       type="button"
// //                       onClick={() => setMethod("maya")}
// //                       className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
// //                         method === "maya" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
// //                       }`}
// //                     >
// //                       <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">M</div>
// //                       <span className="text-xs font-bold text-slate-700">Maya</span>
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Terms Note */}
// //                 <p className="text-[11px] text-slate-400 text-center leading-relaxed px-4">
// //                   By clicking confirm, you will be redirected to WhatsApp to send your payment proof to our 24/7 support team.
// //                 </p>

// //                 {/* Actions */}
// //                 <div className="flex flex-col gap-3 pt-2">
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-100 flex justify-center items-center gap-3"
// //                   >
// //                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Payment"}
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={() => setIsOpen(false)}
// //                     className="w-full py-3 text-slate-400 font-bold text-sm"
// //                   >
// //                     Cancel Transaction
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { processSecurityDeposit } from "@/app/actions/payment";
// import { X, ShieldCheck, Info, Loader2 } from "lucide-react";
// import { toast, Toaster } from "sonner";

// export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [method, setMethod] = useState("gcash");

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => { document.body.style.overflow = "unset"; };
//   }, [isOpen]);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const result = await processSecurityDeposit(deposit);
//       if (result.success) {
//         const phoneNumber = "+601169615778";
//         const message = `*LOAN DEPOSIT NOTIFICATION* 🏦\n\nHello Support, I have just initiated my security deposit.\n\n*Details:*\n- Amount: ₱${loanAmount.toLocaleString()}\n- Deposit: ₱${deposit.toLocaleString()}\n- Method: ${method.toUpperCase()}`;
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//         toast.success("Redirecting...");
//         setTimeout(() => {
//           setIsOpen(false);
//           setLoading(false);
//           window.open(whatsappUrl, "_blank");
//         }, 1000);
//       } else { throw new Error(result.message); }
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-center" richColors />

//       <button
//         onClick={() => setIsOpen(true)}
//         className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
//       >
//         {triggerLabel}
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 z-1 flex items-end sm:items-center justify-center">
//           {/* Faded Backdrop */}
//           <div
//             className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
//             onClick={() => setIsOpen(false)}
//           />

//           {/* Modal Content */}
//           <div className="relative bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-4 duration-300 max-h-[92vh] flex flex-col">

//             {/* Header */}
//             <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shrink-0">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-xl font-bold flex items-center gap-2">
//                     <ShieldCheck className="text-blue-200" size={24} />
//                     Secure Deposit
//                   </h3>
//                   <p className="text-blue-100 text-xs mt-1 opacity-80">Action required to release funds</p>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="overflow-y-auto p-6 sm:p-8">
//               <form onSubmit={handlePayment} className="space-y-6">

//                 <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Info size={14} className="text-blue-600" />
//                     <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Payment Amount</span>
//                   </div>
//                   <p className="text-2xl font-black text-slate-800">₱{deposit.toLocaleString()}</p>
//                 </div>

//                 <div>
//                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Payment Method</label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setMethod("gcash")}
//                       className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${method === "gcash" ? "border-blue-600 bg-blue-50" : "border-slate-100 bg-white"
//                         }`}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">G</div>
//                       <span className="text-xs font-bold text-slate-700">GCash</span>
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setMethod("maya")}
//                       className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${method === "maya" ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-white"
//                         }`}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">M</div>
//                       <span className="text-xs font-bold text-slate-700">Maya</span>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="pt-2">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-200 flex justify-center items-center gap-3 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="animate-spin" /> : "Verify & Process"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsOpen(false)}
//                     className="w-full py-4 text-slate-400 font-bold text-sm"
//                   >
//                     Go Back
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { processSecurityDeposit } from "@/app/actions/payment";
import { X, ShieldCheck, Info, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("gcash");

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await processSecurityDeposit(deposit);
      if (result.success) {
        const phoneNumber = "+601169615778"; 
        const message = `*LOAN DEPOSIT NOTIFICATION* 🏦\n\nHello Support, I have just initiated my security deposit payment.\n\n*Details:*\n- Loan Amount: ₱${loanAmount.toLocaleString()}\n- Deposit: ₱${deposit.toLocaleString()}\n- Method: ${method.toUpperCase()}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        toast.success("Transaction Logged");
        setTimeout(() => {
          setIsOpen(false);
          setLoading(false);
          window.open(whatsappUrl, "_blank");
        }, 1000);
      } else { throw new Error(result.message); }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
      >
        {triggerLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center">
          {/* Faded Background Layer */}
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsOpen(false)} />

          {/* Modal Page */}
          <div className="relative bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2"><ShieldCheck size={24}/> Secure Payment</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto">
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount to Pay</p>
                  <p className="text-3xl font-black text-slate-800">₱{deposit.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setMethod("gcash")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${method === "gcash" ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}>
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">G</div>
                    <span className="text-xs font-bold">GCash</span>
                  </button>
                  <button type="button" onClick={() => setMethod("maya")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${method === "maya" ? "border-indigo-600 bg-indigo-50" : "border-slate-100"}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">M</div>
                    <span className="text-xs font-bold">Maya</span>
                  </button>
                </div>

                <button type="submit" disabled={loading} className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex justify-center items-center gap-2">
                  {loading ? <Loader2 className="animate-spin"/> : "Confirm & Open WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}