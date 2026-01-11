"use client";

import { useState } from "react";
import { Landmark, ChevronDown, Check } from "lucide-react";

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
    "Maya (formerly PayMaya)"
];

export default function BankAction() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");

    return (
        <div className="relative w-full">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.98]"
            >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Landmark className="text-blue-600" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                        {selectedBank || "Add Bank Account"}
                    </p>
                    <p className="text-xs text-slate-400">
                        {selectedBank ? "Change your linked bank" : "Link your PH bank account"}
                    </p>
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
                    {PH_BANKS.map((bank) => (
                        <div
                            key={bank}
                            onClick={() => {
                                setSelectedBank(bank);
                                setIsOpen(false);
                            }}
                            className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors"
                        >
                            <span className="text-sm text-slate-700 font-medium">{bank}</span>
                            {selectedBank === bank && <Check size={16} className="text-blue-600" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}