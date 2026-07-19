"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid credentials — please try again.");
      }
    } catch (err) {
      setError("Network error — check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-6 animate-fade-in transition-all duration-300">
      <div className="apple-card max-w-sm w-full p-8 flex flex-col gap-6 shadow-sm relative">
        <div className="flex flex-col gap-1.5 text-center">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Security Desk</span>
          <h2 className="text-xl font-bold text-[var(--text)] font-display">Admin Portal</h2>
          <p className="text-xs text-[var(--text-muted)] font-light">Sign in to moderate reviews & logs.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full apple-input px-4 py-3 text-sm text-center tracking-widest"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full apple-btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && <div className="w-4 h-4 border-2 border-[var(--bg)] border-t-transparent rounded-full animate-spin" />}
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}