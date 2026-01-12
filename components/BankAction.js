// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { X } from "lucide-react";

// // // export default function BankAction({ withdrawalId, amount, onClose }) {
// // //   const [banks, setBanks] = useState([]);
// // //   const [bank, setBank] = useState("");
// // //   const [accountNumber, setAccountNumber] = useState("");
// // //   const [accountName, setAccountName] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [verifying, setVerifying] = useState(false);

// // //   // Fetch bank list
// // //   useEffect(() => {
// // //     fetch("/api/banks")
// // //       .then(res => res.json())
// // //       .then(data => setBanks(data));
// // //   }, []);

// // //   // Verify account
// // //   async function verifyAccount() {
// // //     if (!bank || accountNumber.length !== 10) return;

// // //     setVerifying(true);

// // //     const res = await fetch("/api/verify-account", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({ bank, accountNumber })
// // //     });

// // //     const data = await res.json();

// // //     if (data.status === "success") {
// // //       setAccountName(data.account_name);
// // //     } else {
// // //       alert("Invalid account details");
// // //     }

// // //     setVerifying(false);
// // //   }

// // //   // Submit payout
// // //   async function submit() {
// // //     setLoading(true);

// // //     const res = await fetch("/api/withdraw", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         withdrawalId,
// // //         bank,
// // //         accountNumber,
// // //         accountName
// // //       })
// // //     });

// // //     const data = await res.json();

// // //     if (data.success) {
// // //       alert("Payment processing...");
// // //       onClose();
// // //       window.location.reload();
// // //     } else {
// // //       alert("Transfer failed");
// // //     }

// // //     setLoading(false);
// // //   }

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// // //       <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
// // //         <button onClick={onClose} className="absolute top-3 right-3">
// // //           <X />
// // //         </button>

// // //         <h2 className="text-xl font-bold mb-4">
// // //           Withdraw ₦{amount.toLocaleString()}
// // //         </h2>

// // //         <label className="block mb-2 text-sm">Select Bank</label>
// // //         <select
// // //           value={bank}
// // //           onChange={e => setBank(e.target.value)}
// // //           className="w-full border p-2 rounded mb-4"
// // //         >
// // //           <option value="">Select Bank</option>
// // //           {banks.map(b => (
// // //             <option key={b.code} value={b.code}>
// // //               {b.name}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <label className="block mb-2 text-sm">Account Number</label>
// // //         <input
// // //           value={accountNumber}
// // //           onChange={e => setAccountNumber(e.target.value)}
// // //           onBlur={verifyAccount}
// // //           className="w-full border p-2 rounded mb-4"
// // //           placeholder="10-digit account number"
// // //         />

// // //         {verifying && <p className="text-sm text-gray-500">Verifying...</p>}

// // //         {accountName && (
// // //           <p className="text-green-600 text-sm mb-3">
// // //             {accountName}
// // //           </p>
// // //         )}

// // //         <button
// // //           onClick={submit}
// // //           disabled={!accountName || loading}
// // //           className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
// // //         >
// // //           {loading ? "Processing..." : "Withdraw"}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { useState } from "react";
// // import { Landmark, ChevronDown, Check, X } from "lucide-react";

// // const PH_BANKS = [
// //   "BDO Unibank",
// //   "Bank of the Philippine Islands (BPI)",
// //   "Metropolitan Bank and Trust Company (Metrobank)",
// //   "Land Bank of the Philippines",
// //   "Philippine National Bank (PNB)",
// //   "Security Bank",
// //   "China Banking Corporation (China Bank)",
// //   "Union Bank of the Philippines",
// //   "GCash / GCash Padala",
// //   "Maya (formerly PayMaya)",
// // ];

// // export default function BankAction() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   const [bankDetails, setBankDetails] = useState(null);

// //   const [selectedBank, setSelectedBank] = useState("");
// //   const [form, setForm] = useState({
// //     accountName: "",
// //     accountNumber: "",
// //   });

// //   const handleSave = async () => {
// //     if (!form.accountName || !form.accountNumber) return;

// //     const payload = {
// //       bank: selectedBank,
// //       accountName: form.accountName,
// //       accountNumber: form.accountNumber,
// //     };

// //     try {
// //       await fetch("/api/bank", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       setBankDetails(payload);
// //       setShowModal(false);
// //       setForm({ accountName: "", accountNumber: "" });
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* MAIN CARD */}
// //       <div className="relative w-full">
// //         <button
// //           onClick={() => setIsOpen(!isOpen)}
// //           className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition"
// //         >
// //           <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
// //             <Landmark className="text-blue-600" />
// //           </div>

// //           <div className="flex-1">
// //             {!bankDetails ? (
// //               <>
// //                 <p className="text-sm font-bold text-slate-800">
// //                   Add Bank Account
// //                 </p>
// //                 <p className="text-xs text-slate-400">
// //                   Link your PH bank account
// //                 </p>
// //               </>
// //             ) : (
// //               <>
// //                 <p className="text-sm font-bold text-slate-800">
// //                   {bankDetails.bank}
// //                 </p>
// //                 <p className="text-xs text-slate-500">
// //                   {bankDetails.accountName} ••••
// //                   {bankDetails.accountNumber.slice(-4)}
// //                 </p>
// //               </>
// //             )}
// //           </div>

// //           <ChevronDown
// //             size={18}
// //             className={`transition-transform ${
// //               isOpen ? "rotate-180" : ""
// //             }`}
// //           />
// //         </button>

// //         {/* BANK LIST */}
// //         {isOpen && (
// //           <div className="absolute z-40 mt-2 w-full bg-white border rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
// //             {PH_BANKS.map((bank) => (
// //               <div
// //                 key={bank}
// //                 onClick={() => {
// //                   setSelectedBank(bank);
// //                   setIsOpen(false);
// //                   setShowModal(true);
// //                 }}
// //                 className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer"
// //               >
// //                 <span className="text-sm font-medium">{bank}</span>
// //                 {bankDetails?.bank === bank && (
// //                   <Check size={16} className="text-blue-600" />
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* MODAL */}
// //       {showModal && (
// //         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
// //           <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5">
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-lg font-bold text-slate-800">
// //                 {selectedBank}
// //               </h2>
// //               <button onClick={() => setShowModal(false)}>
// //                 <X className="text-slate-400" />
// //               </button>
// //             </div>

// //             <input
// //               type="text"
// //               placeholder="Account Name"
// //               className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //               value={form.accountName}
// //               onChange={(e) =>
// //                 setForm({ ...form, accountName: e.target.value })
// //               }
// //             />

// //             <input
// //               type="text"
// //               placeholder="Account Number"
// //               className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //               value={form.accountNumber}
// //               onChange={(e) =>
// //                 setForm({ ...form, accountNumber: e.target.value })
// //               }
// //             />

// //             <button
// //               onClick={handleSave}
// //               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
// //             >
// //               Save Bank Details
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// "use client";

// export default function BankAction({ withdrawalId, amount, onClose }) {
//   return (
//     <div className="fixed inset-0 z-9999 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative z-10000 bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
//         <h2 className="text-lg font-bold mb-4">Add Bank Details</h2>

//         {/* your form fields here */}

//         <button
//           onClick={onClose}
//           className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
//         >
//           Save Bank
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

export default function BankAction({ withdrawalId, amount, onClose }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-bold mb-4">Add Bank Account</h2>

        {/* form fields */}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
        >
          Save Bank
        </button>
      </div>
    </div>
  );
}
