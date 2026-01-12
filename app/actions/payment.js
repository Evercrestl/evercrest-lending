"use server";

import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import User from "@/lib/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export async function processSecurityDeposit(amount) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    // 1. Create the Transaction record
    const finalAmount = Math.round(amount * 100) / 100;
    await Transaction.create({
      userId: decoded.id,
      description: "Security Deposit Payment (7%)",
      amount: +finalAmount,
      status: "pending", // MUST BE LOWERCASE 'pending'
      type: "deposit",
    });

    // 2. Update User's loan status to reflect deposit paid
    await User.findByIdAndUpdate(decoded.id, {
      $set: { "loanStatus.depositPaid": true }
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Payment recorded successfully" };
  } catch (error) {
    console.error("Payment Error:", error);
    return { success: false, message: "Failed to process payment" };
  }
}

// Add this to your @/app/actions/payment.js
// export async function approveTransaction(transactionId) {
//   try {
//     await connectDB();

//     // Find transaction and update status
//     const updatedTransaction = await Transaction.findByIdAndUpdate(
//       transactionId,
//       { status: "completed" },
//       { new: true }
//     );

//     // If it was a deposit, we can also update the user's loan status here
//     if (updatedTransaction.type === "deposit") {
//       await User.findByIdAndUpdate(updatedTransaction.userId, {
//         $set: { "loanStatus.depositPaid": true }
//       });
//     }

//     revalidatePath("/admin");
//     revalidatePath("/dashboard");
//     return { success: true };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }

// @/app/actions/payment.js
// export async function approveTransaction(transactionId) {
//     try {
//         await connectDB();
        
//         // We use $set to ensure the field is created if it didn't exist
//         const updatedTransaction = await Transaction.findByIdAndUpdate(
//             transactionId,
//             { $set: { status: "completed" } }, 
//             { new: true }
//         );

//         if (updatedTransaction.type === "deposit") {
//             await User.findByIdAndUpdate(updatedTransaction.userId, {
//                 $set: { "loanStatus.depositPaid": true }
//             });
//         }

//         revalidatePath("/admin");
//         revalidatePath("/dashboard");
//         return { success: true };
//     } catch (error) {
//         return { success: false, message: error.message };
//     }
// }

// export async function approveTransaction(transactionId) {
//   try {
//     await connectDB();

//     // 1. Find & complete the transaction
//     const tx = await Transaction.findByIdAndUpdate(
//       transactionId,
//       { $set: { status: "completed" } },
//       { new: true }
//     );

//     if (!tx) throw new Error("Transaction not found");

//     // 2. If it's a security deposit → add to loan balance
//     if (tx.type === "deposit") {
//       await User.findByIdAndUpdate(tx.userId, {
//         $inc: { loanBalance: tx.amount },          // 🔥 ADD deposit to loan
//         $set: { "loanStatus.depositPaid": true }
//       });
//     }

//     revalidatePath("/admin");
//     revalidatePath("/dashboard");

//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false, message: error.message };
//   }
// }

// export async function approveTransaction(transactionId) {
//   try {
//     await connectDB();

//     // 1. Approve the deposit
//     const deposit = await Transaction.findByIdAndUpdate(
//       transactionId,
//       { $set: { status: "approved" } },
//       { new: true }
//     );

//     if (!deposit) throw new Error("Transaction not found");

//     // 2. Add deposit to loan balance
//     if (deposit.type === "deposit") {
//       await User.findByIdAndUpdate(deposit.userId, {
//         $inc: { loanBalance: deposit.amount },
//         $set: { "loanStatus.depositPaid": true }
//       });

//       // 3. Create withdrawal request
//       await Transaction.create({
//         userId: deposit.userId,
//         amount: deposit.amount,
//         description: "Loan Disbursement",
//         type: "withdrawal",
//         status: "awaiting_bank"
//       });
//     }

//     revalidatePath("/admin");
//     revalidatePath("/dashboard");

//     return { success: true };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }

export async function approveTransaction(transactionId) {
  await connectDB();

  const deposit = await Transaction.findByIdAndUpdate(
    transactionId,
    { $set: { status: "approved" } },
    { new: true }
  );

  if (!deposit) throw new Error("Not found");

  // Add deposit to loan
  await User.findByIdAndUpdate(deposit.userId, {
    $inc: { loanBalance: deposit.amount },
    $set: { "loanStatus.depositPaid": true }
  });

  // Create withdrawal
  await Transaction.create({
    userId: deposit.userId,
    amount: deposit.amount,
    type: "withdrawal",
    description: "Loan Disbursement",
    status: "awaiting_bank"
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
}


