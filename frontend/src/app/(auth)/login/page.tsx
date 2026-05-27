"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import CactusIllustration from "@/components/illustrations/CactusIllustration";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm px-4 py-16">
      <CactusIllustration className="w-28 h-28 mb-6" />

      <h2
        className="text-[28px] leading-tight mb-8 text-center"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B5E3C" }}
      >
        Yay, You&apos;re Back!
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-lg border border-[#D4C5B0] bg-white/70 text-[#5C3D2E] placeholder:text-[#A09387] focus:outline-none focus:ring-2 focus:ring-[#C4A882]/60 text-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B6F5C] hover:text-[#5C3D2E] transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full border-[1.5px] border-[#8B5E3C] text-[#8B5E3C] font-medium text-sm hover:bg-[#F5EFE6] transition-colors disabled:opacity-50 mt-1"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <Link
        href="/signup"
        className="mt-4 text-xs text-[#A67B5B] underline hover:text-[#5C3D2E] transition-colors"
      >
        Oops! I&apos;ve never been here before
      </Link>
    </div>
  );
}
