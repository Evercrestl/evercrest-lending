// import ResetPasswordClient from "@/components/ResetPasswordClient";

// export default function ResetPasswordPage({ searchParams }) {
//     const token = searchParams?.token || null;
    
//     return <ResetPasswordClient token={token} />;
// }


// app/reset-password/page.js
import { Suspense } from "react";
import ResetPasswordClient from "@/components/ResetPasswordClient";

function ResetPasswordContent() {
    return <ResetPasswordClient />;
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 mt-4">Loading...</p>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
