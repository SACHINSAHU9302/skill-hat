"use client";

import React, { useState, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Mail,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  
  // Step 1: Email
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 2: OTP
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Email Submit → Send OTP (mock)
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setOtp(Array(6).fill("")); // reset OTP
    }, 900);
  };

  // Handle OTP change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // only one digit
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Submit OTP
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter full 6-digit OTP");
      setLoading(false);
      return;
    }

    // Mock correct OTP = 123456
    if (enteredOtp === "123456") {
      setTimeout(() => {
        setLoading(false);
        setStep("success");
      }, 800);
    } else {
      setError("Invalid OTP. Please try again.");
      setLoading(false);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  // Auto redirect after success
  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        router.push("/auth/reset-password");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  // Success screen (before auto redirect)
  if (step === "success") {
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
            OTP Verified!
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Your email has been successfully verified.
          </p>
          <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
            Redirecting to reset password page...
          </p>

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
          {step === "email" ? (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                We&apos;ll send you a 6-digit OTP
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Enter OTP
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                We sent a code to <span className="font-medium">{email}</span>
              </p>
            </>
          )}
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

        {/* ==================== EMAIL STEP ==================== */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-12 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none"
                  placeholder="you@company.com"
                />
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
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  Send OTP
                  <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>
          </form>
        )}

        {/* ==================== OTP STEP ==================== */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-6" noValidate>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
                Enter 6-digit OTP
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-12 text-center text-2xl font-semibold border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                  />
                ))}
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
                  <span>Verifying OTP...</span>
                </>
              ) : (
                <>
                  Verify OTP
                  <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setOtp(Array(6).fill(""));
                  inputRefs.current[0]?.focus();
                  // Mock resend
                  alert("New OTP sent! (Demo: 123456)");
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Back to Login */}
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