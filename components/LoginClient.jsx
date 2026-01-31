"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginClient({ searchParams }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (loading) return;

        if (!form.email || !form.password) {
            toast.error("Email and password are required");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Login failed");
                return;
            }

            toast.success("Login successful");
            // Use replace instead of href - this removes login page from browser history
            // So when user presses back button from dashboard, they go to home page
            window.location.replace("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchParams?.verified === "1") {
            toast.success("Email verified! You can now log in.");
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Login to your Evercrest Account
                </h1>

                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="example@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    submit();
                                }
                            }}
                        />
                    </div>
                </div>
                
                <div className="flex">
                    <p className="px-1">Don't have an account? </p>
                    <Link className="text-blue-700" href="/register">register</Link>
                </div>

                {/* Submit */}
                <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
                     hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}
