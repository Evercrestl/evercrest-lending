// "use client";

// import { useState } from "react";
// import { Landmark, ChevronDown, Check } from "lucide-react";

// const PH_BANKS = [
//     "BDO Unibank",
//     "Bank of the Philippine Islands (BPI)",
//     "Metropolitan Bank and Trust Company (Metrobank)",
//     "Land Bank of the Philippines",
//     "Philippine National Bank (PNB)",
//     "Security Bank",
//     "China Banking Corporation (China Bank)",
//     "Union Bank of the Philippines",
//     "GCash / GCash Padala",
//     "Maya (formerly PayMaya)"
// ];

// export default function BankAction() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedBank, setSelectedBank] = useState("");

//     return (
//         <div className="relative w-full">
//             <button 
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.98]"
//             >
//                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                     <Landmark className="text-blue-600" />
//                 </div>
//                 <div className="flex-1">
//                     <p className="text-sm font-bold text-slate-800">
//                         {selectedBank || "Add Bank Account"}
//                     </p>
//                     <p className="text-xs text-slate-400">
//                         {selectedBank ? "Change your linked bank" : "Link your PH bank account"}
//                     </p>
//                 </div>
//                 <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {isOpen && (
//                 <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
//                     {PH_BANKS.map((bank) => (
//                         <div
//                             key={bank}
//                             onClick={() => {
//                                 setSelectedBank(bank);
//                                 setIsOpen(false);
//                             }}
//                             className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors"
//                         >
//                             <span className="text-sm text-slate-700 font-medium">{bank}</span>
//                             {selectedBank === bank && <Check size={16} className="text-blue-600" />}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { Landmark, ChevronDown, Check, X } from "lucide-react";

const PH_BANKS = [
  "BDO Unibank",
  "Bank of the Philippine Islands (BPI)",
  "Metropolitan Bank and Trust Company (Metrobank)",
  "Land Bank of the Philippines",
  "Philippine National Bank (PNB)",
  "Security Bank",
  "China Banking Corporation (China Bank)",
  "Union Bank of the Philippines",
  "GCash / GCash Padala",
  "Maya (formerly PayMaya)",
];

export default function BankAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const [form, setForm] = useState({
    accountName: "",
    accountNumber: "",
  });

  const handleSave = async () => {
    if (!form.accountName || !form.accountNumber) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bank: selectedBank,
          ...form,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setShowModal(false);
      alert("Bank details saved successfully");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* BANK SELECT */}
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Landmark className="text-blue-600" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800">
              {selectedBank || "Add Bank Account"}
            </p>
            <p className="text-xs text-slate-400">
              {selectedBank
                ? "Change your linked bank"
                : "Link your PH bank account"}
            </p>
          </div>

          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-40 mt-2 w-full bg-white border rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
            {PH_BANKS.map((bank) => (
              <div
                key={bank}
                onClick={() => {
                  setSelectedBank(bank);
                  setIsOpen(false);
                  setShowModal(true);
                }}
                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer"
              >
                <span className="text-sm font-medium">{bank}</span>
                {selectedBank === bank && (
                  <Check size={16} className="text-blue-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5 animate-in fade-in zoom-in">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">
                {selectedBank}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Account Name"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.accountName}
                onChange={(e) =>
                  setForm({ ...form, accountName: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Account Number"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.accountNumber}
                onChange={(e) =>
                  setForm({ ...form, accountNumber: e.target.value })
                }
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Save Bank Details
            </button>
          </div>
        </div>
      )}
    </>
  );
}
