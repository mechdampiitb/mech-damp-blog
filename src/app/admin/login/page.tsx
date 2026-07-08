"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password");
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-24 flex flex-col gap-4">
      <input
        type="password"
        placeholder="Admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      {error && <p className="text-red-600">{error}</p>}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">Log in</button>
    </form>
  );
}