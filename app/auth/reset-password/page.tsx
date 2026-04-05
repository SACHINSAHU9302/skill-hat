"use client";

import React, { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
    Loader2,
    ArrowLeft,
    ChevronRight,
} from "lucide-react";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!newPassword.trim() || !confirmPassword.trim()) {
            setError("Please fill both password fields");
            setLoading(false);
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Pure frontend mock (no backend)
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 1000);
    };

    // 🔥 Auto redirect to login after success screen
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                router.push("/login");
            }, 1800); // 1.8 seconds delay so user can see success message
            return () => clearTimeout(timer);
        }
    }, [success, router]);

    // Success screen (briefly shown before auto-redirect)
    if (success) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-slate-950 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f630_1px,transparent_1px)] bg-[length:40px_40px] opacity-30 pointer-events-none dark:opacity-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-slate-200/70 dark:shadow-black/40 border border-slate-100 dark:border-zinc-700 p-12 text-center"
                >
                    <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        Password Reset Successful!
                    </h2>
                    <p className="mt-3 text-slate-500 dark:text-slate-400">
                        Your new password has been set.
                    </p>
                    <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">
                        go to login...
                    </p>

                    {/* Small spinner for better UX */}
                    <div className="mt-8 flex justify-center">
                        <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-slate-950 transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f630_1px,transparent_1px)] bg-[length:40px_40px] opacity-30 pointer-events-none dark:opacity-10" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-slate-200/70 dark:shadow-black/40 border border-slate-100 dark:border-zinc-700 p-8 md:p-12 backdrop-blur-xl"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-3xl font-bold shadow-inner">
                        N
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        Reset password
                    </h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Create a new strong password
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-100 dark:border-red-900 p-4 text-sm text-red-700 dark:text-red-400"
                    >
                        <AlertCircle size={20} className="shrink-0" />
                        <span className="font-medium">{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* New Password */}
                    <div className="space-y-2">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            New password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                            <input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-12 py-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Confirm new password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-12 py-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 text-white" />
                                <span>Resetting password...</span>
                            </>
                        ) : (
                            <>
                                Reset password
                                <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-10 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}