// // import { connectDB } from "@/lib/config/db";
// // import Transaction from "@/lib/models/Transaction";
// // import User from "@/lib/models/User";
// // import { approveTransaction } from "@/app/actions/payment";
// // import { Clock, CheckCircle } from "lucide-react";

// // export default async function AdminPage() {
// //     await connectDB();

// //     // Fetch transactions that are pending or missing status
// //     const dbTransactions = await Transaction.find({ 
// //         $or: [
// //             { status: "pending" },
// //             { status: { $exists: false } }
// //         ] 
// //     })
// //     .populate("userId", "name")
// //     .sort({ createdAt: -1 })
// //     .lean();

// //     // Sanitize data for the frontend
// //     const pendingTransactions = dbTransactions.map((t) => ({
// //         ...t,
// //         _id: t._id.toString(),
// //         userName: t.userId?.name || "Unknown User",
// //         userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.userId?.name || 'Guest'}`,
// //         createdAt: t.createdAt?.toISOString(),
// //     }));

// //     if (pendingTransactions.length === 0) {
// //         return (
// //             <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
// //                 <Clock size={48} className="mb-4 opacity-20" />
// //                 <p className="font-bold">No pending approvals</p>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="p-8 max-w-5xl mx-auto space-y-6">
// //             <h1 className="text-2xl font-black text-slate-800 mb-8">Pending Approvals</h1>
            
// //             {pendingTransactions.map((t) => (
// //                 <div key={t._id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
// //                     <div className="flex items-center gap-4">
// //                         <img src={t.userAvatar} className="w-14 h-14 rounded-full border-2 border-slate-50 bg-white" alt="avatar" />
// //                         <div>
// //                             <p className="font-bold text-slate-900 text-lg">{t.userName}</p>
// //                             <p className="text-xs text-blue-600 font-bold uppercase tracking-tight">{t.description}</p>
// //                         </div>
// //                     </div>

// //                     <div className="flex items-center gap-8">
// //                         <div className="text-right">
// //                             <p className="text-xl font-black text-slate-900">₱{Math.abs(t.amount).toLocaleString()}</p>
// //                             <p className="text-[10px] text-slate-400 font-bold">{new Date(t.createdAt).toLocaleString()}</p>
// //                         </div>

// //                         <form action={async (formData) => {
// //                             "use server";
// //                             await approveTransaction(formData.get("id"));
// //                         }}>
// //                             <input type="hidden" name="id" value={t._id} />
// //                             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 active:scale-95">
// //                                 <CheckCircle size={18} />
// //                                 Approve
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // }


// import { connectDB } from "@/lib/config/db";
// import Transaction from "@/lib/models/Transaction";
// import User from "@/lib/models/User";
// import { approveTransaction } from "@/app/actions/payment";
// import { Clock, CheckCircle } from "lucide-react";

// export default async function AdminPage() {
//     await connectDB();

//     const dbTransactions = await Transaction.find({ 
//         $or: [
//             { status: "pending" },
//             { status: { $exists: false } }
//         ] 
//     })
//     .populate("userId", "name")
//     .sort({ createdAt: -1 })
//     .lean();

//     const pendingTransactions = dbTransactions.map((t) => ({
//         ...t,
//         _id: t._id.toString(),
//         userName: t.userId?.name || "Unknown User",
//         userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.userId?.name || 'Guest'}`,
//         createdAt: t.createdAt?.toISOString(),
//     }));

//     if (pendingTransactions.length === 0) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 px-4">
//                 <Clock size={48} className="mb-4 opacity-20" />
//                 <p className="font-bold text-center">No pending approvals</p>
//             </div>
//         );
//     }

//     return (
//         <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto space-y-6">
//             <h1 className="text-xl sm:text-2xl font-black text-slate-800">
//                 Pending Approvals
//             </h1>

//             {pendingTransactions.map((t) => (
//                 <div
//                     key={t._id}
//                     className="
//                         bg-white border border-slate-200 shadow-sm
//                         rounded-3xl p-4 sm:p-6
//                         flex flex-col sm:flex-row
//                         sm:items-center sm:justify-between
//                         gap-4
//                     "
//                 >
//                     {/* User Info */}
//                     <div className="flex items-center gap-4">
//                         <img
//                             src={t.userAvatar}
//                             alt="avatar"
//                             className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-slate-50 bg-white"
//                         />
//                         <div>
//                             <p className="font-bold text-slate-900 text-base sm:text-lg">
//                                 {t.userName}
//                             </p>
//                             <p className="text-xs text-blue-600 font-bold uppercase tracking-tight">
//                                 {t.description}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Amount + Action */}
//                     <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
//                         <div className="text-left sm:text-right">
//                             <p className="text-lg sm:text-xl font-black text-slate-900">
//                                 ₱{Math.abs(t.amount).toLocaleString()}
//                             </p>
//                             <p className="text-[10px] text-slate-400 font-bold">
//                                 {new Date(t.createdAt).toLocaleString()}
//                             </p>
//                         </div>

//                         <form
//                             action={async (formData) => {
//                                 "use server";
//                                 await approveTransaction(formData.get("id"));
//                             }}
//                             className="w-full sm:w-auto"
//                         >
//                             <input type="hidden" name="id" value={t._id} />
//                             <button
//                                 className="
//                                     w-full sm:w-auto
//                                     bg-indigo-600 hover:bg-indigo-700
//                                     text-white px-6 py-3
//                                     rounded-2xl text-sm font-bold
//                                     shadow-lg shadow-indigo-100
//                                     transition-all flex items-center justify-center gap-2
//                                     active:scale-95
//                                 "
//                             >
//                                 <CheckCircle size={18} />
//                                 Approve
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }


import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import User from "@/lib/models/User";
import { approveTransaction } from "@/app/actions/payment";
import { Clock, CheckCircle } from "lucide-react";

export default async function AdminPage() {
    await connectDB();

    const dbTransactions = await Transaction.find({ 
        $or: [{ status: "pending" }, { status: { $exists: false } }]
    })
        .populate("userId", "name")
        .sort({ createdAt: -1 })
        .lean();

    const pendingTransactions = dbTransactions.map((t) => ({
        ...t,
        _id: t._id.toString(),
        userName: t.userId?.name || "Unknown User",
        userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.userId?.name || 'Guest'}`,
        createdAt: t.createdAt?.toISOString(),
    }));

    if (pendingTransactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-slate-400">
                <Clock size={48} className="mb-4 opacity-20" />
                <p className="font-bold text-center">No pending approvals</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 max-w-5xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 mb-6">
                Pending Approvals
            </h1>

            <div className="space-y-5">
                {pendingTransactions.map((t) => (
                    <div
                        key={t._id}
                        className="
                            bg-white border border-slate-200 shadow-sm
                            rounded-3xl p-5
                            flex flex-col
                            gap-5
                        "
                    >
                        {/* USER */}
                        <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:text-left">
                            <img
                                src={t.userAvatar}
                                alt="avatar"
                                className="w-16 h-16 rounded-full border bg-white"
                            />
                            <div>
                                <p className="font-extrabold text-slate-900 text-lg">
                                    {t.userName}
                                </p>
                                <p className="text-xs text-blue-600 font-bold uppercase">
                                    {t.description}
                                </p>
                            </div>
                        </div>

                        {/* AMOUNT */}
                        <div className="text-center sm:text-left">
                            <p className="text-2xl font-black text-slate-900">
                                ₱{Math.abs(t.amount).toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-400 font-semibold">
                                {new Date(t.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* ACTION */}
                        <form
                            action={async (formData) => {
                                "use server";
                                await approveTransaction(formData.get("id"));
                            }}
                        >
                            <input type="hidden" name="id" value={t._id} />
                            <button
                                className="
                                    w-full
                                    bg-indigo-600 hover:bg-indigo-700
                                    text-white py-4
                                    rounded-2xl
                                    text-base font-bold
                                    shadow-lg shadow-indigo-100
                                    transition active:scale-95
                                    flex items-center justify-center gap-2
                                "
                            >
                                <CheckCircle size={20} />
                                Approve Transaction
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
