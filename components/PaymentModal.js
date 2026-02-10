// "use client";

// import React, { useState } from "react";
// import { processSecurityDeposit } from "@/app/actions/payment";
// import { X, ShieldCheck, Info, Loader2, CreditCard, Wallet } from "lucide-react";
// import { toast, Toaster } from "sonner";

// export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [method, setMethod] = useState("gcash"); // Default selection

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await processSecurityDeposit(deposit);

//       if (result.success) {
//         const phoneNumber = "+639318702559"; 
//         const message = `*SECURITY DEPOSIT NOTIFICATION*\n                                  \nHello Support, I would like to proceed with the payment of my security deposit. Below are the loan details for your reference:\n\n*Details:*\n- Loan Amount: ₱${loanAmount.toLocaleString()}\n- Security Deposit Fee (${percentage}%): ₱${deposit.toLocaleString()}\n- Method: ${method.toUpperCase()}\n\nKindly provide the necessary payment instructions at your convenience.\nThank you for your assistance. I look forward to your response.\nSincerely,`;

//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//         toast.success("Transaction Logged", {
//           description: "Opening WhatsApp for verification...",
//         });

//         setTimeout(() => {
//           setIsOpen(false);
//           setLoading(false);
//           window.open(whatsappUrl, "_blank");
//         }, 1000);

//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("Process Failed", {
//         description: error.message,
//       });
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-center" richColors />
      
//       <button
//         onClick={() => setIsOpen(true)}
//         className="w-full sm:w-auto bg-[#0056ef] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-sm sm:text-base"
//       >
//         {triggerLabel}
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsOpen(false)} />

//           <div className="relative bg-white w-full max-w-lg sm:max-w-md rounded-t-4xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
            
//             {/* Header */}
//             <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shrink-0">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-xl font-bold flex items-center gap-2">
//                     <ShieldCheck size={24} />
//                     Pay Secure Deposit
//                   </h3>
//                   <p className="text-blue-100 text-xs mt-2 opacity-90">A Security Deposit is required for verification. The amount paid will be added to your loan balance upon approval</p>
//                 </div>
//                 <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full">
//                   <X size={18} />
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
//               <form onSubmit={handlePayment} className="space-y-6">
                
//                 {/* Summary Info */}
//                 <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
//                   <div className="bg-blue-100 p-2 rounded-lg">
//                     <Info className="text-blue-600" size={18} />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Amount Due</p>
//                     <p className="text-lg font-black text-slate-800">₱{deposit.toLocaleString()}</p>
//                   </div>
//                 </div>

//                 {/* Visual Method Selector */}
//                 <div>
//                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
//                     Select Payment Method
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setMethod("gcash")}
//                       className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
//                         method === "gcash" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
//                       }`}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">G</div>
//                       <span className="text-xs font-bold text-slate-700">GCash</span>
//                     </button>
                    
//                     <button
//                       type="button"
//                       onClick={() => setMethod("maya")}
//                       className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
//                         method === "maya" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
//                       }`}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">M</div>
//                       <span className="text-xs font-bold text-slate-700">Maya</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Terms Note */}
//                 <p className="text-[11px] text-slate-400 text-center leading-relaxed px-4">
//                   By clicking confirm, you will be redirected to WhatsApp to send your payment proof to our 24/7 support team.
//                 </p>

//                 {/* Actions */}
//                 <div className="flex flex-col gap-3 pt-2">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-100 flex justify-center items-center gap-3"
//                   >
//                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Payment"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsOpen(false)}
//                     className="w-full py-3 text-slate-400 font-bold text-sm"
//                   >
//                     Cancel Transaction
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

import React, { useState } from "react";
import { processSecurityDeposit } from "@/app/actions/payment";
import { X, ShieldCheck, Info, Loader2, MessageCircle } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function PaymentModal({ deposit, percentage, loanAmount, triggerLabel, userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("gcash"); // Payment method
  const [contactMethod, setContactMethod] = useState("whatsapp"); // Contact method

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await processSecurityDeposit(deposit);

      if (result.success) {
        const message = `*SECURITY DEPOSIT NOTIFICATION*\n                                  \nHello Support, I would like to proceed with the payment of my security deposit. Below are the loan details for your reference:\n\n*Details:*\n- Loan Amount: ₱${loanAmount.toLocaleString()}\n- Security Deposit Fee (${percentage}%): ₱${deposit.toLocaleString()}\n- Method: ${method.toUpperCase()}\n\nKindly provide the necessary payment instructions at your convenience.\nThank you for your assistance. I look forward to your response.\nSincerely,\n${userName}`;

        let redirectUrl;
        
        if (contactMethod === "whatsapp") {
          const phoneNumber = "+639318702559";
          redirectUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        } else {
          // Facebook Messenger redirect
          const facebookPageId = "818166081374670"; // Replace with your actual Facebook Page ID
          redirectUrl = `https://m.me/${facebookPageId}?text=${encodeURIComponent(message)}`;
        }

        toast.success("Transaction Logged", {
          description: `Opening ${contactMethod === "whatsapp" ? "WhatsApp" : "Facebook Messenger"} for verification...`,
        });

        setTimeout(() => {
          setIsOpen(false);
          setLoading(false);
          window.open(redirectUrl, "_blank");
        }, 1000);

      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Process Failed", {
        description: error.message,
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto bg-[#0056ef] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-sm sm:text-base"
      >
        {triggerLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsOpen(false)} />

          <div className="relative bg-white w-full max-w-lg sm:max-w-md rounded-t-4xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck size={24} />
                    Pay Secure Deposit
                  </h3>
                  <p className="text-blue-100 text-xs mt-2 opacity-90">A Security Deposit is required for verification. The amount paid will be added to your loan balance upon approval</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <form onSubmit={handlePayment} className="space-y-6">
                
                {/* Summary Info */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Info className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Amount Due</p>
                    <p className="text-lg font-black text-slate-800">₱{deposit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Visual Payment Method Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMethod("gcash")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        method === "gcash" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">G</div>
                      <span className="text-xs font-bold text-slate-700">GCash</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setMethod("maya")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        method === "maya" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">M</div>
                      <span className="text-xs font-bold text-slate-700">Maya</span>
                    </button>
                  </div>
                </div>

                {/* Contact Method Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
                    Contact Support Via
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setContactMethod("whatsapp")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        contactMethod === "whatsapp" ? "border-green-600 bg-green-50/50" : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                        <MessageCircle size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">WhatsApp</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setContactMethod("facebook")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        contactMethod === "facebook" ? "border-blue-700 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Facebook</span>
                    </button>
                  </div>
                </div>

                {/* Terms Note */}
                <p className="text-[11px] text-slate-400 text-center leading-relaxed px-4">
                  By clicking confirm, you will be redirected to {contactMethod === "whatsapp" ? "WhatsApp" : "Facebook Messenger"} to send your payment proof to our 24/7 support team.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-100 flex justify-center items-center gap-3"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Payment"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 text-slate-400 font-bold text-sm"
                  >
                    Cancel Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
