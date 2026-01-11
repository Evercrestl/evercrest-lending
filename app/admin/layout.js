import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import { LayoutDashboard, History, UserCheck, LogOut } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({ children }) {
    await connectDB();
    
    // Fetch the pending count for the bubble
    const pendingCount = await Transaction.countDocuments({ status: "pending" });

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 space-y-8 sticky top-0 h-screen">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <UserCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-800">AdminPanel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <AdminSidebarItem 
                        href="/admin" 
                        icon={<LayoutDashboard size={20} />} 
                        label="Overview" 
                    />
                    <AdminSidebarItem 
                        href="/admin/approvals" 
                        icon={<History size={20} />} 
                        label="Approvals" 
                        count={pendingCount} 
                    />
                </nav>

                <div className="pt-6 border-t border-slate-100">
                    <AdminSidebarItem href="/" icon={<LogOut size={20} />} label="Exit Admin" />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function AdminSidebarItem({ href, icon, label, count = 0 }) {
    return (
        <Link 
            href={href} 
            className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all font-medium"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm">{label}</span>
            </div>
            {count > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                    {count}
                </span>
            )}
        </Link>
    );
}