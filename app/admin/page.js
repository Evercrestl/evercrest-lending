// // // import { connectDB } from "@/lib/config/db";
// // // import User from "@/lib/models/User";

// // // export default async function Admin() {
// // //   await connectDB();
// // //   const users = await User.find({ approved: false });

// // //   return (
// // //     <div className="p-10">
// // //       <h1>Pending Loans</h1>
// // //       {users.map(u => (
// // //         <form key={u._id} action="/api/admin/approve" method="POST">
// // //           <input type="hidden" name="id" value={u._id} />
// // //           {u.name} - ₦{u.loanAmount}
// // //           <button>Approve</button>
// // //         </form>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // import { connectDB } from "@/lib/config/db";
// // import Transaction from "@/lib/models/Transaction";
// // import User from "@/lib/models/User";
// // import { approveTransaction } from "@/app/actions/payment";
// // import { CheckCircle, Clock, User as UserIcon } from "lucide-react";

// // export default async function AdminPage() {
// //   // Inside AdminPage()
// //   // Inside your Admin Page function
// //   await connectDB();

// //   const dbTransactions = await Transaction.find({ status: "pending" })
// //     .populate('userId', 'name') // Optional: get the user's name too
// //     .sort({ createdAt: -1 })
// //     .lean();

// //   // Convert to plain objects so Next.js doesn't complain
// //   const pendingTransactions = dbTransactions.map(t => ({
// //     ...t,
// //     _id: t._id.toString(),
// //     userId: t.userId?._id?.toString() || t.userId?.toString(),
// //     userName: t.userId?.name || "Unknown User",
// //     createdAt: t.createdAt?.toISOString(),
// //   }));

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-8">
// //       <div className="max-w-4xl mx-auto">
// //         <header className="mb-8">
// //           <h1 className="text-3xl font-black text-slate-800">Admin Approval</h1>
// //           <p className="text-slate-500 font-medium">Manage pending deposits and loan requests</p>
// //         </header>

// //         <div className="space-y-4">
// //           {pendingTransactions.length === 0 ? (
// //             <div className="bg-white p-12 rounded-4xl text-center border border-dashed border-slate-300">
// //               <Clock className="mx-auto text-slate-300 mb-4" size={48} />
// //               <p className="text-slate-400 font-bold">No pending transactions to review.</p>
// //             </div>
// //           ) : (
// //             pendingTransactions.map((t) => (
// //               <AdminTransactionCard key={t._id.toString()} transaction={JSON.parse(JSON.stringify(t))} />
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Client Component for the Approve Button
// // async function AdminTransactionCard({ transaction }) {
// //   return (
// //     <div className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm flex items-center justify-between">
// //       <div className="flex items-center gap-4">
// //         <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
// //           <Clock className="text-amber-600" size={24} />
// //         </div>
// //         <div>
// //           <p className="font-bold text-slate-800">{transaction.description}</p>
// //           <p className="text-xs text-slate-400">ID: {transaction._id}</p>
// //         </div>
// //       </div>

// //       <div className="flex items-center gap-8">
// //         <div className="text-right">
// //           <p className="text-lg font-black text-slate-800">₱{Math.abs(transaction.amount).toLocaleString()}</p>
// //           <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase">Pending</span>
// //         </div>

// //         <form action={async () => {
// //           "use server";
// //           await approveTransaction(transaction._id);
// //         }}>
// //           <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
// //             <CheckCircle size={18} />
// //             Approve
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// // app/admin/page.js
// import { connectDB } from "@/lib/config/db";
// import Transaction from "@/lib/models/Transaction";
// import { approveTransaction } from "@/app/actions/payment";
// import { revalidatePath } from "next/cache";
// import User from "@/lib/models/User"; // Ensure User model is imported for population

// export default async function AdminPage() {
//   await connectDB();

//   // 1. Fetch transactions AND the associated user data
//   // const dbTransactions = await Transaction.find({ status: "pending" })
//   //     .populate("userId", "name email") // Fetch only name and email from User model
//   //     .sort({ createdAt: -1 })
//   //     .lean();

//   const dbTransactions = await Transaction.find({
//     $or: [
//       { status: "pending" },
//       { status: { $exists: false } }
//     ]
//   })
//     .populate("userId", "name")
//     .sort({ createdAt: -1 })
//     .lean();

//   const pendingTransactions = dbTransactions.map((t) => ({
//     ...t,
//     _id: t._id.toString(),
//     userName: t.userId?.name || "Unknown User",
//     userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.userId?.name || 'Guest'}`,
//     createdAt: t.createdAt?.toISOString(),
//   }));

//   return (
//     <div className="space-y-6 p-8">
//       {pendingTransactions.map((t) => (
//         <div key={t._id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {/* User Avatar & Name */}
//             <img src={t.userAvatar} className="w-12 h-12 rounded-full border bg-slate-50" alt="avatar" />
//             <div>
//               <p className="font-bold text-slate-800">{t.userName}</p>
//               <p className="text-xs text-blue-600 font-semibold">{t.description}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="text-right">
//               <p className="text-lg font-black text-slate-800">₱{Math.abs(t.amount).toLocaleString()}</p>
//               <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(t.createdAt).toLocaleDateString()}</p>
//             </div>

//             {/* Your Approve Form/Button here */}
//             {/* <form action={approveAction}>
//               <input type="hidden" name="id" value={t._id} />
//               <button className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold">
//                 Approve
//               </button>
//             </form> */}
//             <form action={async (formData) => {
//               "use server";
//               const id = formData.get("id");
//               await approveTransaction(id);
//             }}>
//               <input type="hidden" name="id" value={t._id} />
//               <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
//                 Approve
//               </button>
//             </form>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import User from "@/lib/models/User";
import { approveTransaction } from "@/app/actions/payment";
import { Clock, CheckCircle } from "lucide-react";

export default async function AdminPage() {
    await connectDB();

    // Fetch transactions that are pending or missing status
    const dbTransactions = await Transaction.find({ 
        $or: [
            { status: "pending" },
            { status: { $exists: false } }
        ] 
    })
    .populate("userId", "name")
    .sort({ createdAt: -1 })
    .lean();

    // Sanitize data for the frontend
    const pendingTransactions = dbTransactions.map((t) => ({
        ...t,
        _id: t._id.toString(),
        userName: t.userId?.name || "Unknown User",
        userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.userId?.name || 'Guest'}`,
        createdAt: t.createdAt?.toISOString(),
    }));

    if (pendingTransactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                <Clock size={48} className="mb-4 opacity-20" />
                <p className="font-bold">No pending approvals</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-black text-slate-800 mb-8">Pending Approvals</h1>
            
            {pendingTransactions.map((t) => (
                <div key={t._id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={t.userAvatar} className="w-14 h-14 rounded-full border-2 border-slate-50 bg-white" alt="avatar" />
                        <div>
                            <p className="font-bold text-slate-900 text-lg">{t.userName}</p>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-tight">{t.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-xl font-black text-slate-900">₱{Math.abs(t.amount).toLocaleString()}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{new Date(t.createdAt).toLocaleString()}</p>
                        </div>

                        <form action={async (formData) => {
                            "use server";
                            await approveTransaction(formData.get("id"));
                        }}>
                            <input type="hidden" name="id" value={t._id} />
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 active:scale-95">
                                <CheckCircle size={18} />
                                Approve
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}