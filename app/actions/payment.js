// "use server";

// import { connectDB } from "@/lib/config/db";
// import Transaction from "@/lib/models/Transaction";
// import User from "@/lib/models/User";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { revalidatePath } from "next/cache";

// export async function processSecurityDeposit(amount) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) throw new Error("Unauthorized");

//     // 1. Verify User
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     await connectDB();

//     // 2. Create the Transaction
//     const finalAmount = Math.round(amount * 100) / 100
//     const newTransaction = await Transaction.create({
//       userId: decoded.id,
//       description: "Security Deposit Payment",
//       amount: finalAmount, // Positive for deposits/payments
//       status: "completed",
//       type: "deposit",
//     });

//     // 3. Optional: Update User Status
//     // You might want to flag the user as 'deposit_paid: true'
//     await User.findByIdAndUpdate(decoded.id, {
//       $set: { "loanStatus.depositPaid": true }
//     });

//     // 4. Refresh the Dashboard Data
//     revalidatePath("/dashboard");

//     return { success: true, message: "Payment recorded successfully" };
//   } catch (error) {
//     console.error("Payment Error:", error);
//     return { success: false, message: "Failed to process payment" };
//   }
// }


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
      amount: finalAmount, 
      status: "completed",
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