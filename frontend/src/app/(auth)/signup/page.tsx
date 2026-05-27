"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import CatIllustration from "@/components/illustrations/CatIllustration";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-sm px-4 pt-6">
        <CatIllustration className="w-28 h-28 mb-6" />

        <h2
          className="text-[28px] leading-tight mb-8 text-center"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B5E3C" }}
        >
          Yay, New Friend!
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#D4C5B0] bg-white/70 text-[#5C3D2E] placeholder:text-[#A09387] focus:outline-none focus:ring-2 focus:ring-[#C4A882]/60 text-sm"
            required
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#D4C5B0] bg-white/70 text-[#5C3D2E] placeholder:text-[#A09387] focus:outline-none focus:ring-2 focus:ring-[#C4A882]/60 text-sm"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full border-[1.5px] border-[#8B5E3C] text-[#8B5E3C] font-medium text-sm hover:bg-[#F5EFE6] transition-colors disabled:opacity-50 mt-1"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-4 text-xs text-[#A67B5B] underline hover:text-[#5C3D2E] transition-colors"
        >
          We&apos;re already friends!
        </Link>
      </div>
    </div>
  );
}
