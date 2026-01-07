"use client";

export default function BankSelect({ value, onChange }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Bank
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select a bank --</option>

        {/* Major Banks */}
        <option value="BDO">BDO Unibank</option>
        <option value="BPI">Bank of the Philippine Islands (BPI)</option>
        <option value="Metrobank">Metropolitan Bank & Trust Company (Metrobank)</option>
        <option value="Landbank">Land Bank of the Philippines</option>
        <option value="PNB">Philippine National Bank (PNB)</option>
        <option value="Security Bank">Security Bank</option>
        <option value="China Bank">China Banking Corporation</option>
        <option value="UnionBank">UnionBank of the Philippines</option>
        <option value="EastWest">EastWest Bank</option>
        <option value="RCBC">Rizal Commercial Banking Corporation (RCBC)</option>
        <option value="PSBank">Philippine Savings Bank (PSBank)</option>
        <option value="UCPB">United Coconut Planters Bank (UCPB)</option>

        {/* Digital / New Banks */}
        <option value="Maya Bank">Maya Bank</option>
        <option value="Tonik">Tonik Digital Bank</option>
        <option value="GoTyme">GoTyme Bank</option>
        <option value="UNO">UNO Digital Bank</option>
        <option value="Komo">Komo by EastWest</option>

        {/* Rural / Savings */}
        <option value="CTBC">CTBC Bank Philippines</option>
        <option value="HSBC">HSBC Philippines</option>
        <option value="Standard Chartered">Standard Chartered Bank Philippines</option>

        {/* E-Wallets (Optional) */}
        <option value="GCash">GCash</option>
        <option value="GrabPay">GrabPay</option>
        <option value="ShopeePay">ShopeePay</option>
      </select>
    </div>
  );
}
