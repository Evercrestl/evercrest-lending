// // "use client"
// // import { cookies } from "next/headers";
// // import jwt from "jsonwebtoken";
// // import { connectDB } from "@/lib/config/db";
// // import User from "@/lib/models/User";
// // import Transaction from "@/lib/models/Transaction";
// // import { redirect } from "next/navigation";

// // import LoanSummary from "@/components/LoanSummary";
// // import PaymentBreakdown from "@/components/PaymentBreakdown";
// // import Transactions from "@/components/Transactions";
// // import Charts from "@/components/Charts";

// // import { 
// //   TrendingUp, 
// //   ArrowUpRight, 
// //   Wallet, 
// //   CreditCard, 
// //   ArrowLeftRight,
// //   LayoutDashboard,
// //   User as UserIcon,
// //   Bell
// // } from "lucide-react";
// // import { 
// //   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie 
// // } from 'recharts';


// // const mockUser = {
// //   name: "Alex Sterling",
// //   loanBalance: 12450.00,
// //   totalLoanAmount: 25000,
// //   creditScore: 742,
// //   nextPayment: "2025-01-15",
// //   interestRate: 4.5
// // };

// // const mockTransactions = [
// //   { id: 1, description: "Monthly Repayment", amount: 1200, type: "payment", date: "Dec 15, 2024" },
// //   { id: 2, description: "Late Fee Charges", amount: 25, type: "charge", date: "Dec 02, 2024" },
// //   { id: 3, description: "Monthly Repayment", amount: 1200, type: "payment", date: "Nov 15, 2024" },
// //   { id: 4, description: "Insurance Premium", amount: 150, type: "charge", date: "Nov 01, 2024" },
// // ];

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

// //     const { id } = decoded;

// //     await connectDB();
// //     const user = await User.findById(id);
// //     const transactions = await Transaction.find({ userId: id }).sort({ createdAt: -1 });

// //     const percentPaid = Math.round(((mockUser.totalLoanAmount - mockUser.loanBalance) / mockUser.totalLoanAmount) * 100);
  
// //   const pieData = [
// //     { name: 'Paid', value: percentPaid, color: '#3b82f6' },
// //     { name: 'Remaining', value: 100 - percentPaid, color: '#f1f5f9' },
// //   ];

// //     return (
// //         // <div className="p-10 space-y-10 bg-gray-50 min-h-screen">
// //         //     <LoanSummary user={user} />
// //         //     <PaymentBreakdown user={user} />
// //         //     <Transactions transactions={transactions} />
// //         //     <Charts transactions={transactions} loanBalance={user.loanBalance} />
// //         // </div>
// //     <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex">
// //       {/* 1. Sidebar - Modern Slim Version */}
// //       <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col py-8 px-4">
// //         <div className="flex items-center gap-3 px-3 mb-10">
// //           <div className="bg-blue-600 p-2 rounded-xl text-white">
// //             <TrendingUp size={24} />
// //           </div>
// //           <span className="font-bold text-xl tracking-tight hidden lg:block">Lendly</span>
// //         </div>
// //         <nav className="space-y-2">
// //           <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active />
// //           <NavItem icon={<ArrowLeftRight size={20}/>} label="Transactions" />
// //           <NavItem icon={<CreditCard size={20}/>} label="My Cards" />
// //           <NavItem icon={<UserIcon size={20}/>} label="Profile" />
// //         </nav>
// //       </aside>

// //       {/* 2. Main Content Area */}
// //       <main className="flex-1 max-h-screen overflow-y-auto">
// //         {/* Header */}
// //         <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 flex justify-between items-center">
// //           <h1 className="text-xl font-bold tracking-tight">Financial Overview</h1>
// //           <div className="flex items-center gap-4">
// //             <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
// //               <Bell size={22} />
// //               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
// //             </button>
// //             <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600" />
// //           </div>
// //         </header>

// //         <div className="p-8 max-w-7xl mx-auto space-y-8">
// //           {/* Top Hero Section */}
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* Primary Balance Card */}
// //             <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
// //               <div className="relative z-10">
// //                 <p className="text-slate-400 font-medium mb-1 uppercase tracking-widest text-xs">Total Debt Remaining</p>
// //                 <h2 className="text-5xl font-bold tracking-tighter mb-8">${mockUser.loanBalance.toLocaleString()}</h2>
// //                 <div className="flex gap-6">
// //                   <div>
// //                     <p className="text-slate-500 text-xs">Next Payment</p>
// //                     <p className="font-semibold text-sm">Jan 15, 2025</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-slate-500 text-xs">Interest Rate</p>
// //                     <p className="font-semibold text-sm text-green-400">{mockUser.interestRate}% Fixed</p>
// //                   </div>
// //                 </div>
// //               </div>
// //               {/* Decorative background element */}
// //               <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
// //             </div>

// //             {/* Quick Actions / Breakdown Card */}
// //             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center relative">
// //               <ResponsiveContainer width="100%" height={160}>
// //                 <PieChart>
// //                   <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
// //                     {pieData.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
// //                     ))}
// //                   </Pie>
// //                 </PieChart>
// //               </ResponsiveContainer>
// //               <div className="absolute flex flex-col items-center">
// //                 <span className="text-2xl font-black text-slate-800">{percentPaid}%</span>
// //                 <span className="text-[10px] text-slate-400 font-bold uppercase">Paid Off</span>
// //               </div>
// //               <button className="mt-4 w-full py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors">
// //                 Increase Payment
// //               </button>
// //             </div>
// //           </div>

// //           {/* Middle Section: Chart & Transactions */}
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {/* Payment Chart */}
// //             <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
// //               <div className="flex justify-between items-center mb-8">
// //                 <h3 className="font-bold text-lg italic">Repayment Flow</h3>
// //                 <div className="flex gap-2">
// //                   <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
// //                     <ArrowUpRight size={14}/> +2.4%
// //                   </span>
// //                 </div>
// //               </div>
// //               <div className="h-64">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <BarChart data={mockTransactions}>
// //                     <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
// //                     <Bar dataKey="amount" fill="#3b82f6" radius={[10, 10, 10, 10]} barSize={32} />
// //                     <XAxis dataKey="date" hide />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             </div>

// //             {/* Recent Activity List */}
// //             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
// //               <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
// //               <div className="space-y-6">
// //                 {mockTransactions.slice(0, 3).map((t) => (
// //                   <div key={t.id} className="flex justify-between items-center">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
// //                         <Wallet size={18} />
// //                       </div>
// //                       <div>
// //                         <p className="text-sm font-bold text-slate-800">{t.description}</p>
// //                         <p className="text-[10px] text-slate-400 uppercase font-bold">{t.date}</p>
// //                       </div>
// //                     </div>
// //                     <p className={`text-sm font-black ${t.type === 'payment' ? 'text-green-600' : 'text-slate-800'}`}>
// //                       {t.type === 'payment' ? '-' : '+'}${t.amount}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //               <button className="w-full mt-8 py-2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors uppercase tracking-widest">
// //                 Download PDF History
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // // Sub-component for Sidebar Items
// // function NavItem({ icon, label, active = false }) {
// //   return (
// //     <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
// //       active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
// //     }`}>
// //       {icon}
// //       <span className="font-bold text-sm hidden lg:block">{label}</span>
// //     </div>
// //     );
// // }


// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/config/db";
// import User from "@/lib/models/User";
// import Transaction from "@/lib/models/Transaction";
// import { redirect } from "next/navigation";
// import { 
//   TrendingUp, ArrowLeftRight, CreditCard, User as UserIcon, Bell, Wallet 
// } from "lucide-react";

// // Import our client-side wrapper (defined at the bottom)
// import { VisualCharts } from "@/components/VisualCharts"; 

// export default async function Dashboard() {
//     // 1. Auth & Data Fetching (Server Side)
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
//         .limit(10)
//         .lean();

//     // Serialize data for Client Components (converting Mongo IDs/Dates to strings)
//     const transactions = dbTransactions.map(t => ({
//         ...t,
//         _id: t._id.toString(),
//         createdAt: t.createdAt?.toISOString() || new Date().toISOString()
//     }));

//     // Logic for the Progress Circle
//     const totalLoan = user.totalLoanAmount || 1; // avoid division by zero
//     const remaining = user.loanBalance || 0;
//     const percentPaid = Math.round(((user.totalLoan - remaining) / totalLoan) * 100);

//     return (
//         <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex">
//             {/* Sidebar */}
//             <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col py-8 px-4">
//                 <div className="flex items-center gap-3 px-3 mb-10">
//                     <div className="bg-blue-600 p-2 rounded-xl text-white"><TrendingUp size={24} /></div>
//                     <span className="font-bold text-xl tracking-tight hidden lg:block">Lendly</span>
//                 </div>
//                 <nav className="space-y-2">
//                     <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active />
//                     <NavItem icon={<ArrowLeftRight size={20}/>} label="Transactions" />
//                     <NavItem icon={<CreditCard size={20}/>} label="My Cards" />
//                     <NavItem icon={<UserIcon size={20}/>} label="Profile" />
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 max-h-screen overflow-y-auto">
//                 <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 flex justify-between items-center">
//                     <h1 className="text-xl font-bold tracking-tight">Welcome, {user.name}</h1>
//                     <div className="flex items-center gap-4">
//                         <button className="relative p-2 text-slate-400 hover:text-blue-600"><Bell size={22} /></button>
//                         <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600" />
//                     </div>
//                 </header>

//                 <div className="p-8 max-w-7xl mx-auto space-y-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         {/* Database Driven Balance Card */}
//                         <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
//                             <div className="relative z-10">
//                                 <p className="text-slate-400 font-medium mb-1 uppercase tracking-widest text-xs">Total Debt Remaining</p>
//                                 <h2 className="text-5xl font-bold tracking-tighter mb-8">${user.loanBalance?.toLocaleString()}</h2>
//                                 <div className="flex gap-6">
//                                     <div>
//                                         <p className="text-slate-500 text-xs">Interest Rate</p>
//                                         <p className="font-semibold text-sm text-green-400">Fixed Rate</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-slate-500 text-xs">Account Status</p>
//                                         <p className="font-semibold text-sm uppercase">Active</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
//                         </div>

//                         {/* Interactive Progress Circle (Client Component Wrapper) */}
//                         <VisualCharts type="pie" data={percentPaid} />
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//                             <h3 className="font-bold text-lg mb-4">Repayment History</h3>
//                             <VisualCharts type="bar" data={transactions} />
//                         </div>

//                         {/* Recent Activity List from DB */}
//                         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
//                             <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
//                             <div className="space-y-6">
//                                 {transactions.slice(0, 5).map((t) => (
//                                     <div key={t._id} className="flex justify-between items-center">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
//                                                 <Wallet size={18} />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-bold text-slate-800">{t.description}</p>
//                                                 <p className="text-[10px] text-slate-400 uppercase font-bold">
//                                                     {new Date(t.createdAt).toLocaleDateString()}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <p className="text-sm font-black text-slate-800">
//                                             ${t.amount?.toLocaleString()}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// function NavItem({ icon, label, active = false }) {
//     return (
//         <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
//             active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
//         }`}>
//             {icon}
//             <span className="font-bold text-sm hidden lg:block">{label}</span>
//         </div>
//     );
// }

// function LayoutDashboard({size}) { return <TrendingUp size={size}/> }


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Transaction from "@/lib/models/Transaction";
import { redirect } from "next/navigation";
import { 
  TrendingUp, ArrowLeftRight, CreditCard, User as UserIcon, Bell, Wallet 
} from "lucide-react";

// Import the client component we just created
import VisualCharts from "@/components/VisualCharts"; 

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/login");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch { redirect("/login"); }

    await connectDB();
    const user = await User.findById(decoded.id).lean();
    const dbTransactions = await Transaction.find({ userId: decoded.id }).sort({ createdAt: -1 }).limit(10).lean();

    // Serialize data (convert Mongo objects to strings)
    const transactions = dbTransactions.map(t => ({
        ...t,
        _id: t._id.toString(),
        createdAt: t.createdAt?.toISOString()
    }));

    const percentPaid = Math.round(((user.totalLoanAmount - user.loanBalance) / user.totalLoanAmount) * 100);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-8 hidden md:block">
                <div className="flex items-center gap-3 mb-10 text-blue-600 font-bold text-xl">
                    <TrendingUp /> Evercrest Lending
                </div>
                <nav className="space-y-4 text-slate-400 font-semibold">
                    <div className="flex items-center gap-3 text-blue-600 bg-blue-50 p-3 rounded-xl"><LayoutDashboard size={20}/> Overview</div>
                    <div className="flex items-center gap-3 p-3 hover:text-slate-600"><ArrowLeftRight size={20}/> Activity</div>
                    <div className="flex items-center gap-3 p-3 hover:text-slate-600"><CreditCard size={20}/> Cards</div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold">Financial Overview</h1>
                    <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-full border">
                        <span className="text-sm font-bold">{user.name}</span>
                        <div className="w-8 h-8 rounded-full bg-blue-500" />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Hero Card */}
                    <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                        <p className="text-slate-400 text-sm uppercase tracking-widest">Loan Balance</p>
                        <h2 className="text-5xl font-bold mt-2">₱{user.loanBalance.toLocaleString()}</h2>
                        <div className="mt-10 flex gap-10 border-t border-slate-800 pt-6">
                            <div><p className="text-xs text-slate-500">Interest</p><p className="font-bold text-green-400">5% Fixed</p></div>
                            <div><p className="text-xs text-slate-500">Term</p><p className="font-bold text-white">{user.repaymentDate}</p></div>
                        </div>
                    </div>

                    {/* Use the Client Chart Component */}
                    <VisualCharts type="pie" data={percentPaid} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border">
                        <h3 className="font-bold mb-6">Payment Flow</h3>
                        <VisualCharts type="bar" data={transactions} />
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border">
                        <h3 className="font-bold mb-6">History</h3>
                        <div className="space-y-4">
                            {transactions.map(t => (
                                <div key={t._id} className="flex justify-between items-center text-sm">
                                    <span className="font-semibold">{t.description}</span>
                                    <span className="font-mono text-slate-500">${t.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function LayoutDashboard({size}) { return <TrendingUp size={size}/> } // Simplified for example