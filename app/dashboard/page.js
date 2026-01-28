// // import { cookies } from "next/headers";
// // import Link from "next/link"
// // import Image from "next/image"
// // import jwt from "jsonwebtoken";
// // import { connectDB } from "@/lib/config/db";
// // import User from "@/lib/models/User";
// // import Transaction from "@/lib/models/Transaction";
// // import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
// // import Bank from "@/lib/models/Bank";
// // import DashboardClient from "@/components/DashboardClient";
// // import BankAction from "@/components/BankSelect";
// // import { redirect } from "next/navigation";
// // import {
// //     Bell,
// //     CreditCard,
// //     FileText,
// //     LayoutDashboard,
// //     Wallet,
// //     History,
// //     Settings,
// //     LogOut,
// //     Landmark
// // } from "lucide-react";
// // import QuickActions from "@/components/QuickActions";


// // export default async function Dashboard() {
// //     const cookieStore = await cookies();
// //     const token = cookieStore.get("token")?.value;
// //     if (!token) redirect("/login");

// //     let decoded;
// //     try {
// //         decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     } catch {
// //         redirect("/login");
// //     }

// //     await connectDB();
// //     const user = await User.findById(decoded.id).lean();
// //     const dbTransactions = await Transaction.find({ userId: decoded.id })
// //         .sort({ createdAt: -1 })
// //         .limit(8)
// //         .lean();

// //     const transactions = dbTransactions.map((t) => ({
// //         ...t,
// //         _id: t._id.toString(),
// //         createdAt: t.createdAt?.toISOString(),
// //     }));

// //     const bank = await Bank.findOne({ userId: decoded.id }).lean();


// //     // ==================
// //     // LOAN CALCULATIONS
// //     // ==================

// //     const totalLoan = Number(user?.loanAmount) || 0;
// //     const currentBalance = Number(user?.loanBalance) || 0;
// //     // if (withdrawalTx) {
// //     //     currentBalance = 0;
// //     // }
// //     const repaymentMonths = Number(user?.repaymentMonths) || 0;


// //     const depositPercentage = 7;

// //     // Security deposit (7% of total loan)
// //     const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);

// //     // Total amount required upfront
// //     const totalRequired = totalLoan + securityDeposit;

// //     // Percentage paid
// //     const percentPaid =
// //         totalLoan > 0
// //             ? Math.round((-1 * (totalLoan - currentBalance) / totalLoan) * 100)
// //             : 0;

// //     // const [bank, setBank] = useState("");
// //     const pendingWithdrawal = await Transaction.findOne({
// //         userId: decoded.id,
// //         type: "withdrawal",
// //         status: "awaiting_bank"
// //     }).lean();

// //     const depositTx = await Transaction.findOne({
// //         userId: decoded.id,
// //         type: "deposit"
// //     }).sort({ createdAt: -1 }).lean();

// //     // const withdrawalTx = bank ? await Transaction.findOne({
// //     //     userId: decoded.id,
// //     //     type: "withdrawal",
// //     //     status: { $in: ["awaiting_bank", "approved", "completed"] }
// //     // }).lean() : null;
// //     // Withdrawal exists ONLY after user clicks "Make Withdrawal"
// //     const withdrawalTx = await Transaction.findOne({
// //         userId: decoded.id,
// //         type: "withdrawal",
// //     }).sort({ createdAt: -1 }).lean();

// //     // const displayBalance = (withdrawalTx || bank ) ? 0 : (Number(user?.loanBalance) || 0);

// //     let displayBalance = totalLoan;

// //     const wdt = (totalLoan + totalLoan * 0.07)

// //     // Stage 2 & 3 → Deposit completed (bank does NOT zero it anymore)
// //     if (depositTx?.status === "completed") {
// //         displayBalance = totalLoan + securityDeposit;
// //     }


// //     // Stage 4 → Withdrawal started or completed
// //     if (withdrawalTx) {
// //         displayBalance = 0;
// //     }

// //     // if (withdrawalTx || bank) {
// //     //     // Stage 3: Bank linked or Withdrawal started
// //     //     displayBalance = 0;
// //     // } else if (depositTx?.status === "completed") {
// //     //     // Stage 2: Deposit paid AND Admin approved it
// //     //     displayBalance = totalLoan + securityDeposit;
// //     // } else {
// //     //     // Stage 1: Initial state (even if deposit is 'pending')
// //     //     displayBalance = totalLoan;
// //     // }
// //     let nextPaymentDate = null;

// //     if (user?.createdAt) {
// //         const registrationDate = new Date(user.createdAt);
// //         nextPaymentDate = new Date(registrationDate);
// //         nextPaymentDate.setMonth(registrationDate.getMonth() + 1);
// //     }

// //     const formattedNextPayment = nextPaymentDate
// //         ? nextPaymentDate.toLocaleDateString("en-US", {
// //             month: "short",
// //             day: "numeric",
// //             year: "numeric"
// //         })
// //         : "—";


// //     let interestRate = 0;

// //     if (repaymentMonths <= 5) {
// //         interestRate = 5;
// //     } else {
// //         interestRate = 5;
// //     }

// //     const totalInterest =
// //         (totalLoan * interestRate * repaymentMonths) / (100 * 12);

// //     const totalLoanWithInterest = Math.round(totalLoan + totalInterest);


// //     const monthlyPayment =
// //         repaymentMonths > 0
// //             ? Math.round(totalLoanWithInterest / repaymentMonths)
// //             : 0;


// //     let processingTransaction = null;

// //     if (withdrawalTx) {
// //         processingTransaction = {
// //             _id: "processing-withdrawal",
// //             description: "Withdrawal to Bank",
// //             amount: -wdt,
// //             status: "processing",
// //             createdAt: new Date().toISOString(),
// //         };
// //     }


// //     return (
// //         <div className="min-h-screen bg-[#F8FAFC] flex">
// //             {/* Sidebar */}
// //             <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 space-y-8">
// //                 <div className="flex items-center gap-2 px-2">
// //                     <Link href="/">
// //                         <img src="/logo.png" />
// //                     </Link>

// //                 </div>
// //                 <nav className="flex-1 space-y-2">
// //                     <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
// //                     <SidebarItem icon={<Wallet size={20} />} label="My Loans" />
// //                     <SidebarItem icon={<History size={20} />} label="Transactions" />
// //                     <SidebarItem icon={<Settings size={20} />} label="Settings" />
// //                 </nav>
// //                 <div className="pt-6 border-t border-slate-100">
// //                     <SidebarItem icon={<LogOut size={20} />} label="Logout" />
// //                 </div>
// //             </aside>

// //             <main className="flex-1 overflow-y-auto">
// //                 {/* Top Navbar */}
// //                 <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 flex items-center justify-between">
// //                     <div>
// //                         <h1 className="hidden md:block text-xl font-bold text-slate-800">Financial Overview</h1>
// //                         <div className="flex">

// //                             <img src="/logo.png" className="md:hidden" />
// //                             <p className="hidden md:block text-lg text-black font-medium">Welcome, {user.name} </p>
// //                         </div>
// //                     </div>
// //                     <div className="flex items-center gap-6">
// //                         <div className="relative p-2 text-slate-400 hover:text-blue-600 cursor-pointer">
// //                             <Bell size={22} />
// //                             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
// //                         </div>
// //                         <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
// //                             <div className="text-right">
// //                                 <p className="text-sm font-bold text-slate-800">{user.name}</p>
// //                                 <p className="text-[10px] text-slate-500 font-bold uppercase">Premium Member</p>
// //                             </div>
// //                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" alt="avatar" />
// //                         </div>
// //                     </div>
// //                 </header>

// //                 <div className="p-8 max-w-7xl mx-auto space-y-8">
// //                     <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
// //                         {/* Hero Card */}


// //                         <div className="xl:col-span-2 bg-[#0296e0]
// //   rounded-3xl
// //   p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between min-h-72 max-w-full
// // ">
// //                             {/* Top */}
// //                             <div className="relative z-10">
// //                                 <p className="text-xs sm:text-sm opacity-80 font-semibold uppercase tracking-widest">
// //                                     Current Loan Balance
// //                                 </p>

// //                                 <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-4 break-all">
// //                                     ₱ {displayBalance.toLocaleString()}
// //                                 </h2>
// //                             </div>

// //                             {/* Bottom */}
// //                             <div className="
// //     relative z-10
// //     pt-6
// //     border-t border-white/20
// //     flex flex-col gap-6
// //   ">
// //                                 <div className="
// //       grid grid-cols-1
// //       sm:grid-cols-2
// //       lg:grid-cols-4
// //       gap-6
// //     ">
// //                                     <div>
// //                                         <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
// //                                             Next Payment
// //                                         </p>
// //                                         <p className="text-sm sm:text-md font-bold mt-2">
// //                                             {formattedNextPayment}
// //                                         </p>
// //                                     </div>

// //                                     <div>
// //                                         <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
// //                                             Interest Rate
// //                                         </p>
// //                                         <p className="text-base sm:text-lg font-bold">
// //                                             {interestRate}%
// //                                         </p>
// //                                     </div>

// //                                     <div>
// //                                         <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
// //                                             Monthly Payment
// //                                         </p>
// //                                         <p className="text-base sm:text-lg font-bold break-all">
// //                                             ₱ {monthlyPayment.toLocaleString()}
// //                                         </p>
// //                                     </div>

// //                                     {bank && (
// //                                         <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-slate-800">
// //                                             <p className="text-xs text-slate-400 font-bold uppercase">
// //                                                 Linked Bank
// //                                             </p>
// //                                             <p className="text-sm font-bold mt-1">
// //                                                 {bank.bank}
// //                                             </p>
// //                                             <p className="text-xs text-slate-500">
// //                                                 {bank.accountName}
// //                                             </p>
// //                                             <p className="text-xs text-slate-500 break-all">
// //                                                 **** {bank.accountNumber.slice(-4)}
// //                                             </p>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         </div>



// //                         {/* Progress Card */}
// //                         <div className="p-2 flex flex-col items-center justify-center text-center">

// //                             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Payment Progress</h3>
// //                             <div className="h-80 w-full flex items-center justify-center">
// //                                 <DashboardClient
// //                                     user={user}
// //                                     totalLoan={totalLoan}
// //                                     securityDeposit={securityDeposit}
// //                                     depositPercentage={depositPercentage}
// //                                     depositTx={depositTx}
// //                                     withdrawalTx={withdrawalTx}
// //                                     bank={bank}
// //                                 />
// //                             </div>
// //                             <p className="mt-4 text-slate-800 font-bold text-lg">Security Deposit Paid</p>
// //                             <p className="text-sm text-black">₱ {(currentBalance - totalLoan).toLocaleString()} </p>
// //                         </div>
// //                     </div>

// //                     {/* Bottom Row */}
// //                     <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
// //                         <div className="xl:col-span-1 space-y-4">
// //                             <h3 className="text-sm font-bold text-slate-800 ml-2">Quick Actions</h3>
// //                             <QuickActions />
// //                         </div>

// //                         <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
// //                             <div className="flex justify-between items-center mb-8">
// //                                 <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
// //                                 <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
// //                             </div>
// //                             {/* <div className="divide-y divide-slate-100">
// //                                 {[processingTransaction, ...transactions].filter(Boolean).map((t) => (
// //                                     <div key={t._id} className="py-4 flex justify-between items-center hover:bg-slate-50 px-4 -mx-4 rounded-xl transition-colors">
// //                                         <div className="flex items-center gap-4">
// //                                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.amount < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
// //                                                 {t.amount < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
// //                                             </div>
// //                                             <div>
// //                                                 <p className="text-sm font-bold text-slate-800">{t.description}</p>
// //                                                 <p className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleDateString()}</p>
// //                                             </div>
// //                                         </div>

// //                                         {/* --- UPDATED SECTION START --- */}
// //                             {/* <div className="text-right flex flex-col items-end gap-1">
// //                                             <p className={`font-bold ${t.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
// //                                                 {t.amount < 0 ? '-' : '+'} ₱{Math.abs(t.amount).toLocaleString()}
// //                                             </p>

// //                                             {/* Helper component we created earlier */}
// //                             {/* <StatusBadge status={t.status} />
// //                                         </div> */}
// //                             {/* --- UPDATED SECTION END --- */}
// //                             {/* </div> */}
// //                             {/* ))} */}
// //                             {/* </div> */}

// //                             {/* <div className="divide-y divide-slate-100">
// //                                 {(() => {
// //                                     const displayList = [];

// //                                     // 1. SECURITY DEPOSIT (Shown if it exists in DB)
// //                                     if (depositTx) {
// //                                         displayList.push({
// //                                             _id: depositTx._id.toString(),
// //                                             description: "Security Deposit Paid",
// //                                             amount: depositTx.amount,
// //                                             status: depositTx.status,
// //                                             createdAt: depositTx.createdAt
// //                                         });
// //                                     }

// //                                     // 2. LOAN WITHDRAWAL (Strictly shown ONLY if withdrawalTx exists)
// //                                     // This won't show just because the deposit is 'completed'
// //                                     if (withdrawalTx) {
// //                                         displayList.push({
// //                                             _id: "withdrawal-" + withdrawalTx._id.toString(),
// //                                             description: "Loan Withdrawal to Bank",
// //                                             amount: -wdt, // Use your calculated withdrawal total
// //                                             status: withdrawalTx.status === "awaiting_bank" ? "processing" : withdrawalTx.status,
// //                                             createdAt: withdrawalTx.createdAt
// //                                         });
// //                                     }

// //                                     return displayList.length > 0 ? (
// //                                         displayList.map((t) => (
// //                                             <div key={t._id} className="py-4 flex justify-between items-center hover:bg-slate-50 px-4 -mx-4 rounded-xl transition-colors">
// //                                                 <div className="flex items-center gap-4">
// //                                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.amount < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
// //                                                         {t.amount < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
// //                                                     </div>
// //                                                     <div>
// //                                                         <p className="text-sm font-bold text-slate-800">{t.description}</p>
// //                                                         <p className="text-xs text-slate-400">
// //                                                             {new Date(t.createdAt).toLocaleDateString()}
// //                                                         </p>
// //                                                     </div>
// //                                                 </div>

// //                                                 <div className="text-right flex flex-col items-end gap-1">
// //                                                     <p className={`font-bold ${t.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
// //                                                         {t.amount < 0 ? '-' : '+'} ₱{Math.abs(t.amount).toLocaleString()}
// //                                                     </p>
// //                                                     <StatusBadge status={t.status} />
// //                                                 </div>
// //                                             </div>
// //                                         ))
// //                                     ) : (
// //                                         <div className="py-8 text-center text-slate-400 text-sm">
// //                                             No recent activity.
// //                                         </div>
// //                                     );
// //                                 })()}
// //                             </div> */}

// //                             <div className="divide-y divide-slate-100">
// //                                 {(() => {
// //                                     const displayList = [];

// //                                     // SECURITY DEPOSIT (only when completed)
// //                                     if (depositTx?.status === "completed") {
// //                                         displayList.push({
// //                                             _id: depositTx._id.toString(),
// //                                             description: "Security Deposit Paid",
// //                                             amount: depositTx.amount,
// //                                             status: depositTx.status,
// //                                             createdAt: depositTx.createdAt,
// //                                         });
// //                                     }

// //                                     // WITHDRAWAL (ONLY after Make Withdrawal)
// //                                     if (withdrawalTx) {
// //                                         displayList.push({
// //                                             _id: withdrawalTx._id.toString(),
// //                                             description: "Loan Withdrawal to Bank",
// //                                             amount: -wdt,
// //                                             status:
// //                                                 withdrawalTx.status === "awaiting_bank"
// //                                                     ? "processing"
// //                                                     : withdrawalTx.status,
// //                                             createdAt: withdrawalTx.createdAt,
// //                                         });

// //                                     }

// //                                     return displayList.length ? (
// //                                         displayList.map((t) => (
// //                                             <div
// //                                                 key={t._id}
// //                                                 className="py-4 flex justify-between items-center hover:bg-slate-50 px-4 -mx-4 rounded-xl transition-colors"
// //                                             >
// //                                                 <div className="flex items-center gap-4">
// //                                                     <div
// //                                                         className={`w-10 h-10 rounded-full flex items-center justify-center ${t.amount < 0 ? "bg-red-50" : "bg-green-50"
// //                                                             }`}
// //                                                     >
// //                                                         {t.amount < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
// //                                                     </div>
// //                                                     <div>
// //                                                         <p className="text-sm font-bold text-slate-800">
// //                                                             {t.description}
// //                                                         </p>
// //                                                         <p className="text-xs text-slate-400">
// //                                                             {new Date(t.createdAt).toLocaleDateString()}
// //                                                         </p>
// //                                                     </div>
// //                                                 </div>

// //                                                 <div className="text-right flex flex-col items-end gap-1">
// //                                                     <p
// //                                                         className={`font-bold ${t.amount < 0 ? "text-red-500" : "text-green-600"
// //                                                             }`}
// //                                                     >
// //                                                         {t.amount < 0 ? "-" : "+"} ₱
// //                                                         {Math.abs(t.amount).toLocaleString()}
// //                                                     </p>
// //                                                     <StatusBadge status={t.status} />
// //                                                 </div>
// //                                             </div>
// //                                         ))
// //                                     ) : (
// //                                         <div className="py-8 text-center text-slate-400 text-sm">
// //                                             No recent activity.
// //                                         </div>
// //                                     );
// //                                 })()}
// //                             </div>


// //                         </div>
// //                     </div>
// //                 </div>
// //             </main>
// //             <FloatingWhatsAppButton />
// //         </div>
// //     );
// // }

// // function SidebarItem({ icon, label, active = false }) {
// //     return (
// //         <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'}`}>
// //             {icon}
// //             <span className="text-sm">{label}</span>
// //         </div>
// //     );
// // }


// // function StatusBadge({ status }) {
// //     const styles = {
// //         completed: "bg-green-100 text-green-700 border-green-200",
// //         pending: "bg-amber-100 text-amber-700 border-amber-200", // Yellow for pending
// //         failed: "bg-red-100 text-red-700 border-red-200",
// //     };

// //     const normalizedStatus = status?.toLowerCase() || "pending";
// //     const currentStyle = styles[normalizedStatus] || "bg-slate-100 text-slate-600 border-slate-200";

// //     return (
// //         <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${currentStyle}`}>
// //             {status || "Pending"}
// //         </span>
// //     );
// // }



// // const ArrowUpIcon = () => <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
// // const ArrowDownIcon = () => <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;


// import { cookies } from "next/headers";
// import Link from "next/link"
// import Image from "next/image"
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/config/db";
// import User from "@/lib/models/User";
// import Transaction from "@/lib/models/Transaction";
// import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
// import Bank from "@/lib/models/Bank";
// import DashboardClient from "@/components/DashboardClient";
// import BankAction from "@/components/BankSelect";
// import { redirect } from "next/navigation";
// import {
//     Bell,
//     CreditCard,
//     FileText,
//     LayoutDashboard,
//     Wallet,
//     History,
//     Settings,
//     LogOut,
//     Landmark
// } from "lucide-react";
// import QuickActions from "@/components/QuickActions";


// export default async function Dashboard() {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//     if (!token) redirect("/login");

//     let decoded;
//     try {
//         decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//         redirect("/login");
//     }

//     await connectDB();
//     const user = await User.findById(decoded.id).lean();
//     const dbTransactions = await Transaction.find({ userId: decoded.id })
//         .sort({ createdAt: -1 })
//         .limit(8)
//         .lean();

//     const transactions = dbTransactions.map((t) => ({
//         ...t,
//         _id: t._id.toString(),
//         createdAt: t.createdAt?.toISOString(),
//     }));

//     const bank = await Bank.findOne({ userId: decoded.id }).lean();


//     // ==================
//     // LOAN CALCULATIONS
//     // ==================

//     const totalLoan = Number(user?.loanAmount) || 0;
//     const currentBalance = Number(user?.loanBalance) || 0;
//     const repaymentMonths = Number(user?.repaymentMonths) || 0;

//     const depositPercentage = 7;

//     // Security deposit (7% of total loan)
//     const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);

//     // Total amount required upfront
//     const totalRequired = totalLoan + securityDeposit;

//     // Total withdrawal amount (loan + security deposit)
//     const wdt = totalLoan + securityDeposit;

//     // Percentage paid
//     const percentPaid =
//         totalLoan > 0
//             ? Math.round((-1 * (totalLoan - currentBalance) / totalLoan) * 100)
//             : 0;

//     // Find the latest deposit transaction
//     const depositTx = await Transaction.findOne({
//         userId: decoded.id,
//         type: "deposit"
//     }).sort({ createdAt: -1 }).lean();

//     // Find withdrawal transaction that is NOT in awaiting_bank status
//     // awaiting_bank means the system created it but user hasn't clicked "Make Withdrawal" yet
//     const withdrawalTx = await Transaction.findOne({
//         userId: decoded.id,
//         type: "withdrawal",
//         status: { $ne: "awaiting_bank" } // Only get withdrawal if it's NOT awaiting_bank
//     }).sort({ createdAt: -1 }).lean();

//     // ==================
//     // BALANCE CALCULATION LOGIC
//     // ==================
//     let displayBalance = 0;

//     // Stage 1: Initial state or deposit pending - show loan amount only
//     if (!depositTx || depositTx.status === "pending") {
//         displayBalance = totalLoan;
//     }
//     // Stage 2 & 3: Deposit completed - show loan + security deposit
//     // This stays the same even after bank details are added
//     else if (depositTx.status === "completed" && !withdrawalTx) {
//         displayBalance = totalLoan + securityDeposit;
//     }
//     // Stage 4: Withdrawal initiated (user clicked Make Withdrawal)
//     else if (withdrawalTx) {
//         // If withdrawal is still processing/pending, gradually reduce
//         if (withdrawalTx.status === "pending" || withdrawalTx.status === "processing") {
//             // Keep showing full amount while processing
//             displayBalance = totalLoan + securityDeposit;
//         }
//         // If withdrawal is approved/completed, show zero
//         else if (withdrawalTx.status === "approved" || withdrawalTx.status === "completed") {
//             displayBalance = 0;
//         }
//     }

//     let nextPaymentDate = null;

//     if (user?.createdAt) {
//         const registrationDate = new Date(user.createdAt);
//         nextPaymentDate = new Date(registrationDate);
//         nextPaymentDate.setMonth(registrationDate.getMonth() + 1);
//     }

//     const formattedNextPayment = nextPaymentDate
//         ? nextPaymentDate.toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric"
//         })
//         : "—";


//     let interestRate = 0;

//     if (repaymentMonths <= 5) {
//         interestRate = 5;
//     } else {
//         interestRate = 5;
//     }

//     const totalInterest =
//         (totalLoan * interestRate * repaymentMonths) / (100 * 12);

//     const totalLoanWithInterest = Math.round(totalLoan + totalInterest);

//     const monthlyPayment =
//         repaymentMonths > 0
//             ? Math.round(totalLoanWithInterest / repaymentMonths)
//             : 0;


//     return (
//         <div className="min-h-screen bg-[#F8FAFC] flex">
//             {/* Sidebar */}
//             <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 space-y-8">
//                 <div className="flex items-center gap-2 px-2">
//                     <Link href="/">
//                         <img src="/logo.png" />
//                     </Link>
//                 </div>
//                 <nav className="flex-1 space-y-2">
//                     <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
//                     <SidebarItem icon={<Wallet size={20} />} label="My Loans" />
//                     <SidebarItem icon={<History size={20} />} label="Transactions" />
//                     <SidebarItem icon={<Settings size={20} />} label="Settings" />
//                 </nav>
//                 <div className="pt-6 border-t border-slate-100">
//                     <SidebarItem icon={<LogOut size={20} />} label="Logout" />
//                 </div>
//             </aside>

//             <main className="flex-1 overflow-y-auto">
//                 {/* Top Navbar */}
//                 <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 flex items-center justify-between">
//                     <div>
//                         <h1 className="hidden md:block text-xl font-bold text-slate-800">Financial Overview</h1>
//                         <div className="flex">
//                             <img src="/logo.png" className="md:hidden" />
//                             <p className="hidden md:block text-lg text-black font-medium">Welcome, {user.name} </p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-6">
//                         <div className="relative p-2 text-slate-400 hover:text-blue-600 cursor-pointer">
//                             <Bell size={22} />
//                             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
//                         </div>
//                         <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
//                             <div className="text-right">
//                                 <p className="text-sm font-bold text-slate-800">{user.name}</p>
//                                 <p className="text-[10px] text-slate-500 font-bold uppercase">Premium Member</p>
//                             </div>
//                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" alt="avatar" />
//                         </div>
//                     </div>
//                 </header>

//                 <div className="p-8 max-w-7xl mx-auto space-y-8">
//                     <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//                         {/* Hero Card */}
//                         <div className="xl:col-span-2 bg-[#0296e0] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between min-h-72 max-w-full">
//                             {/* Top */}
//                             <div className="relative z-10">
//                                 <p className="text-xs sm:text-sm opacity-80 font-semibold uppercase tracking-widest">
//                                     Current Loan Balance
//                                 </p>

//                                 <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-4 break-all">
//                                     ₱ {displayBalance.toLocaleString()}
//                                 </h2>
//                             </div>

//                             {/* Bottom */}
//                             <div className="relative z-10 pt-6 border-t border-white/20 flex flex-col gap-6">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                                     <div>
//                                         <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
//                                             Next Payment
//                                         </p>
//                                         <p className="text-sm sm:text-md font-bold mt-2">
//                                             {formattedNextPayment}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
//                                             Interest Rate
//                                         </p>
//                                         <p className="text-base sm:text-lg font-bold">
//                                             {interestRate}%
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
//                                             Monthly Payment
//                                         </p>
//                                         <p className="text-base sm:text-lg font-bold break-all">
//                                             ₱ {monthlyPayment.toLocaleString()}
//                                         </p>
//                                     </div>

//                                     {bank && (
//                                         <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-slate-800">
//                                             <p className="text-xs text-slate-400 font-bold uppercase">
//                                                 Linked Bank
//                                             </p>
//                                             <p className="text-sm font-bold mt-1">
//                                                 {bank.bank}
//                                             </p>
//                                             <p className="text-xs text-slate-500">
//                                                 {bank.accountName}
//                                             </p>
//                                             <p className="text-xs text-slate-500 break-all">
//                                                 **** {bank.accountNumber.slice(-4)}
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Progress Card */}
//                         <div className="p-2 flex flex-col items-center justify-center text-center">
//                             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Payment Progress</h3>
//                             <div className="h-80 w-full flex items-center justify-center">
//                                 <DashboardClient
//                                     user={user}
//                                     totalLoan={totalLoan}
//                                     securityDeposit={securityDeposit}
//                                     depositPercentage={depositPercentage}
//                                     depositTx={depositTx}
//                                     withdrawalTx={withdrawalTx}
//                                     bank={bank}
//                                 />
//                             </div>
//                             <p className="mt-4 text-slate-800 font-bold text-lg">Security Deposit Paid</p>
//                             <p className="text-sm text-black">
//                                 ₱ {depositTx?.status === "completed" ? securityDeposit.toLocaleString() : "0"}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Bottom Row */}
//                     <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//                         <div className="xl:col-span-1 space-y-4">
//                             <h3 className="text-sm font-bold text-slate-800 ml-2">Quick Actions</h3>
//                             <QuickActions />
//                         </div>

//                         <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
//                             <div className="flex justify-between items-center mb-8">
//                                 <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
//                                 <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
//                             </div>

//                             <div className="divide-y divide-slate-100">
//                                 {(() => {
//                                     const displayList = [];

//                                     // ONLY show Security Deposit when admin has approved it (status = "completed")
//                                     if (depositTx?.status === "completed") {
//                                         displayList.push({
//                                             _id: depositTx._id.toString(),
//                                             description: "Security Deposit Paid",
//                                             amount: securityDeposit,
//                                             status: depositTx.status,
//                                             createdAt: depositTx.createdAt,
//                                         });
//                                     }

//                                     // ONLY show Withdrawal when user has clicked "Make Withdrawal"
//                                     // withdrawalTx will only exist if status is NOT "awaiting_bank"
//                                     if (withdrawalTx) {
//                                         displayList.push({
//                                             _id: withdrawalTx._id.toString(),
//                                             description: "Loan Disbursement to Bank",
//                                             amount: -wdt,
//                                             status: withdrawalTx.status,
//                                             createdAt: withdrawalTx.createdAt,
//                                         });
//                                     }

//                                     return displayList.length ? (
//                                         displayList.map((t) => (
//                                             <div
//                                                 key={t._id}
//                                                 className="py-4 flex justify-between items-center hover:bg-slate-50 px-4 -mx-4 rounded-xl transition-colors"
//                                             >
//                                                 <div className="flex items-center gap-4">
//                                                     <div
//                                                         className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                                                             t.amount < 0 ? "bg-red-50" : "bg-green-50"
//                                                         }`}
//                                                     >
//                                                         {t.amount < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
//                                                     </div>
//                                                     <div>
//                                                         <p className="text-sm font-bold text-slate-800">
//                                                             {t.description}
//                                                         </p>
//                                                         <p className="text-xs text-slate-400">
//                                                             {new Date(t.createdAt).toLocaleDateString()}
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 <div className="text-right flex flex-col items-end gap-1">
//                                                     <p
//                                                         className={`font-bold ${
//                                                             t.amount < 0 ? "text-red-500" : "text-green-600"
//                                                         }`}
//                                                     >
//                                                         {t.amount < 0 ? "-" : "+"} ₱
//                                                         {Math.abs(t.amount).toLocaleString()}
//                                                     </p>
//                                                     <StatusBadge status={t.status} />
//                                                 </div>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <div className="py-8 text-center text-slate-400 text-sm">
//                                             No recent activity.
//                                         </div>
//                                     );
//                                 })()}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <FloatingWhatsAppButton />
//         </div>
//     );
// }

// function SidebarItem({ icon, label, active = false }) {
//     return (
//         <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'}`}>
//             {icon}
//             <span className="text-sm">{label}</span>
//         </div>
//     );
// }


// function StatusBadge({ status }) {
//     const styles = {
//         completed: "bg-green-100 text-green-700 border-green-200",
//         pending: "bg-amber-100 text-amber-700 border-amber-200",
//         awaiting_bank: "bg-blue-100 text-blue-700 border-blue-200",
//         processing: "bg-blue-100 text-blue-700 border-blue-200",
//         approved: "bg-green-100 text-green-700 border-green-200",
//         failed: "bg-red-100 text-red-700 border-red-200",
//     };

//     const displayText = {
//         awaiting_bank: "Processing",
//         processing: "Processing",
//         completed: "Completed",
//         pending: "Pending",
//         approved: "Approved",
//         failed: "Failed"
//     };

//     const normalizedStatus = status?.toLowerCase() || "pending";
//     const currentStyle = styles[normalizedStatus] || "bg-slate-100 text-slate-600 border-slate-200";
//     const displayLabel = displayText[normalizedStatus] || status || "Pending";

//     return (
//         <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${currentStyle}`}>
//             {displayLabel}
//         </span>
//     );
// }


// const ArrowUpIcon = () => <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
// const ArrowDownIcon = () => <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;


import { cookies } from "next/headers";
import Link from "next/link"
import Image from "next/image"
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Transaction from "@/lib/models/Transaction";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Bank from "@/lib/models/Bank";
import DashboardClient from "@/components/DashboardClient";
import BankAction from "@/components/BankSelect";
import { redirect } from "next/navigation";
import {
    Bell,
    CreditCard,
    FileText,
    LayoutDashboard,
    Wallet,
    History,
    Settings,
    LogOut,
    Landmark
} from "lucide-react";
import QuickActions from "@/components/QuickActions";


export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/login");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect("/login");
    }

    await connectDB();
    const user = await User.findById(decoded.id).lean();
    const dbTransactions = await Transaction.find({ userId: decoded.id })
        .sort({ createdAt: -1 })
        .limit(8)
        .lean();

    const transactions = dbTransactions.map((t) => ({
        ...t,
        _id: t._id.toString(),
        createdAt: t.createdAt?.toISOString(),
    }));

    const bank = await Bank.findOne({ userId: decoded.id }).lean();


    // ==================
    // LOAN CALCULATIONS
    // ==================

    const totalLoan = Number(user?.loanAmount) || 0;
    const currentBalance = Number(user?.loanBalance) || 0;
    const repaymentMonths = Number(user?.repaymentMonths) || 0;

    const depositPercentage = 7;

    // Security deposit (7% of total loan)
    const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);

    // Total amount required upfront
    const totalRequired = totalLoan + securityDeposit;

    // Total withdrawal amount (loan + security deposit)
    const wdt = totalLoan + securityDeposit;

    // Percentage paid
    const percentPaid =
        totalLoan > 0
            ? Math.round((-1 * (totalLoan - currentBalance) / totalLoan) * 100)
            : 0;

    // Find the latest deposit transaction
    const depositTx = await Transaction.findOne({
        userId: decoded.id,
        type: "deposit"
    }).sort({ createdAt: -1 }).lean();

    // Find ANY withdrawal transaction (including awaiting_bank) for button logic
    const anyWithdrawalTx = await Transaction.findOne({
        userId: decoded.id,
        type: "withdrawal",
    }).sort({ createdAt: -1 }).lean();

    // Find withdrawal transaction that is NOT in awaiting_bank status for display
    // awaiting_bank means the system created it but user hasn't clicked "Make Withdrawal" yet
    const withdrawalTx = await Transaction.findOne({
        userId: decoded.id,
        type: "withdrawal",
        status: { $ne: "awaiting_bank" } // Only get withdrawal if it's NOT awaiting_bank
    }).sort({ createdAt: -1 }).lean();

    // ==================
    // BALANCE CALCULATION LOGIC
    // ==================
    let displayBalance = 0;

    // Stage 1: Initial state or deposit pending - show loan amount only
    if (!depositTx || depositTx.status === "pending") {
        displayBalance = totalLoan;
    }
    // Stage 2 & 3: Deposit completed - show loan + security deposit
    // This stays the same even after bank details are added
    else if (depositTx.status === "completed" && !withdrawalTx) {
        displayBalance = totalLoan + securityDeposit;
    }
    // Stage 4: Withdrawal initiated (user clicked Make Withdrawal)
    else if (withdrawalTx) {
        // If withdrawal is still processing/pending, gradually reduce
        if (withdrawalTx.status === "pending" || withdrawalTx.status === "processing") {
            // Keep showing full amount while processing
            displayBalance = totalLoan + securityDeposit;
        }
        // If withdrawal is approved/completed, show zero
        else if (withdrawalTx.status === "approved" || withdrawalTx.status === "completed") {
            displayBalance = 0;
        }
    }

    let nextPaymentDate = null;

    if (user?.createdAt) {
        const registrationDate = new Date(user.createdAt);
        nextPaymentDate = new Date(registrationDate);
        nextPaymentDate.setMonth(registrationDate.getMonth() + 1);
    }

    const formattedNextPayment = nextPaymentDate
        ? nextPaymentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
        : "—";


    let interestRate = 0;

    if (repaymentMonths <= 5) {
        interestRate = 5;
    } else {
        interestRate = 5;
    }

    const totalInterest =
        (totalLoan * interestRate * repaymentMonths) / (100 * 12);

    const totalLoanWithInterest = Math.round(totalLoan + totalInterest);

    const monthlyPayment =
        repaymentMonths > 0
            ? Math.round(totalLoanWithInterest / repaymentMonths)
            : 0;


    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 space-y-8">
                <div className="flex items-center gap-2 px-2">
                    <Link href="/">
                        <img src="/logo.png" />
                    </Link>
                </div>
                <nav className="flex-1 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <SidebarItem icon={<Wallet size={20} />} label="My Loans" />
                    <SidebarItem icon={<History size={20} />} label="Transactions" />
                    <SidebarItem icon={<Settings size={20} />} label="Settings" />
                </nav>
                <div className="pt-6 border-t border-slate-100">
                    <SidebarItem icon={<LogOut size={20} />} label="Logout" />
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
                {/* Top Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 flex items-center justify-between">
                    <div>
                        <h1 className="hidden md:block text-xl font-bold text-slate-800">Financial Overview</h1>
                        <div className="flex">
                            <img src="/logo.png" className="md:hidden" />
                            <p className="hidden md:block text-lg text-black font-medium">Welcome, {user.name} </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative p-2 text-slate-400 hover:text-blue-600 cursor-pointer">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Premium Member</p>
                            </div>
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" alt="avatar" />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Hero Card */}
                        <div className="xl:col-span-2 bg-[#0296e0] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between min-h-72 max-w-full">
                            {/* Top */}
                            <div className="relative z-10">
                                <p className="text-xs sm:text-sm opacity-80 font-semibold uppercase tracking-widest">
                                    Current Loan Balance
                                </p>

                                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-4 break-all">
                                    ₱ {displayBalance.toLocaleString()}
                                </h2>
                            </div>

                            {/* Bottom */}
                            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                            Next Payment
                                        </p>
                                        <p className="text-sm sm:text-md font-bold mt-2">
                                            {formattedNextPayment}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                            Interest Rate
                                        </p>
                                        <p className="text-base sm:text-lg font-bold">
                                            {interestRate}%
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                            Monthly Payment
                                        </p>
                                        <p className="text-base sm:text-lg font-bold break-all">
                                            ₱ {monthlyPayment.toLocaleString()}
                                        </p>
                                    </div>

                                    {bank && (
                                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-slate-800">
                                            <p className="text-xs text-slate-400 font-bold uppercase">
                                                Linked Bank
                                            </p>
                                            <p className="text-sm font-bold mt-1">
                                                {bank.bank}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {bank.accountName}
                                            </p>
                                            <p className="text-xs text-slate-500 break-all">
                                                **** {bank.accountNumber.slice(-4)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="p-2 flex flex-col items-center justify-center text-center">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Payment Progress</h3>
                            <div className="h-80 w-full flex items-center justify-center">
                                <DashboardClient
                                    user={user}
                                    totalLoan={totalLoan}
                                    securityDeposit={securityDeposit}
                                    depositPercentage={depositPercentage}
                                    depositTx={depositTx}
                                    withdrawalTx={withdrawalTx}
                                    bank={bank}
                                />
                            </div>
                            <p className="mt-4 text-slate-800 font-bold text-lg">Security Deposit Paid</p>
                            <p className="text-sm text-black">
                                ₱ {depositTx?.status === "completed" ? securityDeposit.toLocaleString() : "0"}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-1 space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 ml-2">Quick Actions</h3>
                            {/* Pass withdrawalTx (not anyWithdrawalTx) to QuickActions so it knows the actual state */}
                            <QuickActions 
                                depositCompleted={depositTx?.status === "completed"}
                                bankLinked={!!bank}
                                withdrawalStarted={!!withdrawalTx}
                            />
                        </div>

                        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                                <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {(() => {
                                    const displayList = [];

                                    // ONLY show Security Deposit when admin has approved it (status = "completed")
                                    if (depositTx?.status === "completed") {
                                        displayList.push({
                                            _id: depositTx._id.toString(),
                                            description: "Security Deposit Paid",
                                            amount: securityDeposit,
                                            status: depositTx.status,
                                            createdAt: depositTx.createdAt,
                                        });
                                    }

                                    // ONLY show Withdrawal when user has clicked "Make Withdrawal"
                                    // withdrawalTx will only exist if status is NOT "awaiting_bank"
                                    if (withdrawalTx) {
                                        displayList.push({
                                            _id: withdrawalTx._id.toString(),
                                            description: "Loan Disbursement to Bank",
                                            amount: -wdt,
                                            status: withdrawalTx.status,
                                            createdAt: withdrawalTx.createdAt,
                                        });
                                    }

                                    return displayList.length ? (
                                        displayList.map((t) => (
                                            <div
                                                key={t._id}
                                                className="py-4 flex justify-between items-center hover:bg-slate-50 px-4 -mx-4 rounded-xl transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                            t.amount < 0 ? "bg-red-50" : "bg-green-50"
                                                        }`}
                                                    >
                                                        {t.amount < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800">
                                                            {t.description}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {new Date(t.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right flex flex-col items-end gap-1">
                                                    <p
                                                        className={`font-bold ${
                                                            t.amount < 0 ? "text-red-500" : "text-green-600"
                                                        }`}
                                                    >
                                                        {t.amount < 0 ? "-" : "+"} ₱
                                                        {Math.abs(t.amount).toLocaleString()}
                                                    </p>
                                                    <StatusBadge status={t.status} />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-slate-400 text-sm">
                                            No recent activity.
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FloatingWhatsAppButton />
        </div>
    );
}

function SidebarItem({ icon, label, active = false }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'}`}>
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
}


function StatusBadge({ status }) {
    const styles = {
        completed: "bg-green-100 text-green-700 border-green-200",
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        awaiting_bank: "bg-blue-100 text-blue-700 border-blue-200",
        processing: "bg-blue-100 text-blue-700 border-blue-200",
        approved: "bg-green-100 text-green-700 border-green-200",
        failed: "bg-red-100 text-red-700 border-red-200",
    };

    const displayText = {
        awaiting_bank: "Processing",
        processing: "Processing",
        completed: "Completed",
        pending: "Pending",
        approved: "Approved",
        failed: "Failed"
    };

    const normalizedStatus = status?.toLowerCase() || "pending";
    const currentStyle = styles[normalizedStatus] || "bg-slate-100 text-slate-600 border-slate-200";
    const displayLabel = displayText[normalizedStatus] || status || "Pending";

    return (
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${currentStyle}`}>
            {displayLabel}
        </span>
    );
}


const ArrowUpIcon = () => <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
const ArrowDownIcon = () => <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
