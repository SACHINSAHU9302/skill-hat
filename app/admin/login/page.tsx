"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔁 Already logged in
  useEffect(() => {
    if (!mounted) return;

    const isAdmin = sessionStorage.getItem("isAdmin");

    if (isAdmin === "true") {
      router.replace("/admin");
      return;
    }
  }, [mounted, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("All fields are required");
    }

    setLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() === "admin@gmail.com" &&
        password === "1234"
      ) {
        // ✅ FIXED (important)
        sessionStorage.setItem("isAdmin", "true");

        router.replace("/admin");
      } else {
        setError("Invalid Admin Credentials ❌");
      }

      setLoading(false);
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[380px]">

        <h2 className="text-2xl font-bold text-center mb-2">
          Admin Login 🔐
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}