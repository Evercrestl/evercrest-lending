"use client"
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const LoanModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);

  const interestRate = 0.05; // 5% Fixed

  useEffect(() => {
    const totalToPay = amount + (amount * interestRate);
    const monthly = totalToPay / months;
    setMonthlyRepayment(monthly);
  }, [amount, months]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-16">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative p-6 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Loan Calculator</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <p className="text-blue-600 font-semibold mb-6">5% Fixed Interest</p>

        {/* Loan Amount Slider */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <label className="text-gray-700 font-medium">Loan Amount (₱)</label>
          </div>
          <input 
            type="range" 
            min="1000" 
            max="100000" 
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xl font-bold text-gray-900">₦{amount.toLocaleString()}</p>
        </div>

        {/* Repayment Period Slider */}
        <div className="space-y-4 mb-8">
          <label className="text-gray-700 font-medium">Repayment Period (Months)</label>
          <input 
            type="range" 
            min="1" 
            max="24" 
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xl font-bold text-gray-900">{months} months</p>
        </div>

        {/* Repayment Display Box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-8 text-center mb-6">
          <p className="text-gray-600 mb-2">Monthly Repayment</p>
          <p className="text-3xl font-black text-gray-900">
            ₦{monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LoanModal;