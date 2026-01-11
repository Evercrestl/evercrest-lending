import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Transaction from "@/lib/models/Transaction";
import PaymentModal from "@/components/PaymentModal";
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

// import VisualCharts from "@/components/VisualCharts";

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

    // ==================
    // LOAN CALCULATIONS
    // ==================

    const totalLoan = Number(user?.loanAmount) || 0;
    const currentBalance = Number(user?.loanBalance) || 0;

    const depositPercentage = 7;

    // Security deposit (7% of total loan)
    const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);

    // Total amount required upfront
    const totalRequired = totalLoan + securityDeposit;

    // Percentage paid
    const percentPaid =
        totalLoan > 0
            ? Math.round(((totalLoan - currentBalance) / totalLoan) * 100)
            : 0;

    // const [bank, setBank] = useState("");


    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 space-y-8">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Wallet className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-800 tracking-tight">LoanApp</span>
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
                        <h1 className="text-xl font-bold text-slate-800">Financial Overview</h1>
                        <p className="text-xs text-slate-500 font-medium">Welcome back, {user.name}</p>
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
                        <div className="xl:col-span-2 bg-linear-to-br from-[#1E60E9] to-[#1249C1] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between min-h-75">
                            <div className="relative z-10">
                                <p className="text-sm opacity-80 font-semibold uppercase tracking-[0.2em]">Current Loan Balance</p>
                                <h2 className="text-6xl font-black mt-4">₱ {currentBalance.toLocaleString()}</h2>
                            </div>
                            <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/20">
                                <div className="flex gap-12">
                                    <div>
                                        <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Next Payment</p>
                                        <p className="text-lg font-bold">Aug 15, 2024</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Interest Rate</p>
                                        <p className="text-lg font-bold">5.5% Fixed</p>
                                    </div>
                                </div>
                                {/* Passing calculated fee to the modal */}

                                <PaymentModal
                                    triggerLabel="Withdraw"
                                    loanAmount={totalLoan}       // Passes the full loan amount (e.g., 50000)
                                    deposit={securityDeposit}    // Passes the 7% (e.g., 3500)
                                    percentage={depositPercentage} // Passes 7
                                />
                            </div>
                            <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Payment Progress</h3>
                            <div className="h-40 w-full flex items-center justify-center scale-125">
                                {/* <VisualCharts type="pie" data={percentPaid} /> */}
                            </div>
                            <p className="mt-8 text-slate-800 font-bold text-lg">{percentPaid}% Paid</p>
                            <p className="text-sm text-slate-400">₱ {(totalLoan - currentBalance).toLocaleString()} out of ₱ {totalLoan.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-1 space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 ml-2">Quick Actions</h3>
                            <ActionBtn icon={<CreditCard className="text-blue-600" />} label="Make Payment" sub="Pay using Card or Bank" />
                            {/* <ActionBtn icon={<Landmark className="text-blue-600" />} label="Add Bank" sub="Bank Account Details" /> */}
                            <BankAction />
                            <ActionBtn icon={<FileText className="text-blue-600" />} label="Download Statement" sub="Check for better rates" />
                        </div>

                        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                                <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {transactions.map((t) => (
                                    <div key={t._id} className="py-4 flex justify-between items-center hover:bg-slate-50 px-4 -mx-4 rounded-xl transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.amount < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                                                {t.amount < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{t.description}</p>
                                                <p className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${t.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                                {t.amount < 0 ? '-' : '+'} ₱{Math.abs(t.amount).toLocaleString()}
                                            </p>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Success</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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

function ActionBtn({ icon, label, sub }) {
    return (
        <button className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">{icon}</div>
            <div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{sub}</p>
            </div>
        </button>
    );
}

const ArrowUpIcon = () => <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
const ArrowDownIcon = () => <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;