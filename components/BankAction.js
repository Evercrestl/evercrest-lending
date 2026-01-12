"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function BankAction({ withdrawalId, amount, onClose }) {
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Fetch bank list
  useEffect(() => {
    fetch("/api/banks")
      .then(res => res.json())
      .then(data => setBanks(data));
  }, []);

  // Verify account
  async function verifyAccount() {
    if (!bank || accountNumber.length !== 10) return;

    setVerifying(true);

    const res = await fetch("/api/verify-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bank, accountNumber })
    });

    const data = await res.json();

    if (data.status === "success") {
      setAccountName(data.account_name);
    } else {
      alert("Invalid account details");
    }

    setVerifying(false);
  }

  // Submit payout
  async function submit() {
    setLoading(true);

    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        withdrawalId,
        bank,
        accountNumber,
        accountName
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Payment processing...");
      onClose();
      window.location.reload();
    } else {
      alert("Transfer failed");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">
          Withdraw ₦{amount.toLocaleString()}
        </h2>

        <label className="block mb-2 text-sm">Select Bank</label>
        <select
          value={bank}
          onChange={e => setBank(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select Bank</option>
          {banks.map(b => (
            <option key={b.code} value={b.code}>
              {b.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm">Account Number</label>
        <input
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
          onBlur={verifyAccount}
          className="w-full border p-2 rounded mb-4"
          placeholder="10-digit account number"
        />

        {verifying && <p className="text-sm text-gray-500">Verifying...</p>}

        {accountName && (
          <p className="text-green-600 text-sm mb-3">
            {accountName}
          </p>
        )}

        <button
          onClick={submit}
          disabled={!accountName || loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>
    </div>
  );
}
