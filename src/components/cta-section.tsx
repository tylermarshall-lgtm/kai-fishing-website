"use client";

import { useState } from "react";

export default function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://alluring-encouragement-production.up.railway.app/public/lead_v3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          details: "Launch notification signup — Kai Fishing Co website",
          knowledge_profile_id: "2d00c7ce-3905-4671-98bb-1fc6cb52c807",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-24 bg-[#0a0c0e] border-t border-[#1e2328]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-5xl mb-6">🎣</div>
        <h2
          className="text-4xl md:text-5xl font-bold text-white uppercase mb-4"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Don't Miss the Launch
        </h2>
        <p className="text-[#6a737c] text-lg mb-12">
          Sign up for early access pricing and be first to know when new products drop.
        </p>

        {status === "success" ? (
          <div className="bg-[#0c1f14] border border-green-700/30 rounded-2xl p-10">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
              You're on the list!
            </h3>
            <p className="text-[#6a737c]">We'll be in touch when new products launch and pre-orders open.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="flex-1 bg-[#161a1d] border border-[#1e2328] rounded-lg px-4 py-3.5 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-[#161a1d] border border-[#1e2328] rounded-lg px-4 py-3.5 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#4a7ab5] hover:bg-[#5a8ac5] disabled:opacity-50 text-white px-6 py-3.5 rounded-lg font-semibold whitespace-nowrap transition-colors"
            >
              {status === "loading" ? "Joining..." : "Join List"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-4">
            Something went wrong — email us at info@kaidistributionltd.co.uk
          </p>
        )}
      </div>
    </section>
  );
}
