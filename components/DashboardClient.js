// "use client";

// import { useState } from "react";
// import PaymentModal from "@/components/PaymentModal";
// import BankAction from "@/components/BankSelect";

// export default function DashboardClient({
//   totalLoan,
//   securityDeposit,
//   depositPercentage,
//   depositTx,
//   withdrawalTx
// }) {
//   const [showBank, setShowBank] = useState(false);

//   return (
//     <>
//       {!depositTx && (
//         <PaymentModal
//           triggerLabel="Pay Security Deposit"
//           loanAmount={totalLoan}
//           deposit={securityDeposit}
//           percentage={depositPercentage}
//         />
//       )}

//       {depositTx?.status === "pending" && (
//         <button className="bg-gray-300 px-6 py-3 rounded-xl font-bold">
//           Waiting for approval
//         </button>
//       )}

//       {withdrawalTx && (
//         <>
//           <button
//             onClick={() => setShowBank(true)}
//             className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
//           >
//             Withdraw to Bank
//           </button>

//           {showBank && (
//             <BankAction
//               withdrawalId={withdrawalTx._id}
//               amount={withdrawalTx.amount}
//               onClose={() => setShowBank(false)}
//             />
//           )}
//         </>
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import BankAction from "@/components/BankSelect";

export default function DashboardClient({
  totalLoan,
  securityDeposit,
  depositPercentage,
  depositTx,
  withdrawalTx,
}) {
  const [showBank, setShowBank] = useState(false);

  return (
    <>
      {/* Buttons can live anywhere */}
      {!depositTx && (
        <PaymentModal
          triggerLabel="Pay Security Deposit"
          loanAmount={totalLoan}
          deposit={securityDeposit}
          percentage={depositPercentage}
        />
      )}

      {withdrawalTx && (
        <button
          onClick={() => setShowBank(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          Withdraw to Bank
        </button>
      )}

      {/* ✅ Modal rendered at page root */}
      {showBank && (
        <BankAction
          withdrawalId={withdrawalTx._id}
          amount={withdrawalTx.amount}
          onClose={() => setShowBank(false)}
        />
      )}
    </>
  );
}
