"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://alluring-encouragement-production.up.railway.app/public/lead_v3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          details: data.get("message"),
          knowledge_profile_id: "2d00c7ce-3905-4671-98bb-1fc6cb52c807",
        }),
      });
      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#111416] min-h-screen">
      <section className="bg-[#0a0c0e] border-b border-[#1e2328] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#4a7ab5] text-xs font-semibold tracking-widest uppercase mb-3">Kai Fishing Co</p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white uppercase mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Get in Touch
          </h1>
          <p className="text-[#6a737c] text-lg">
            Questions about an order, our products, trade enquiries or anything else? Contact the Kai Fishing Co team.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#6a737c] mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#6a737c] mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#6a737c] mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Ask about orders, products, wholesale or anything else..."
                  className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#4a7ab5] hover:bg-[#5a8ac5] disabled:opacity-50 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <div className="bg-[#0c1f14] border border-green-700/30 text-green-400 px-4 py-3 rounded-lg text-sm">
                  ✓ Message sent! We'll get back to you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="bg-[#200c0c] border border-red-700/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                  Something went wrong. Email us directly at info@kaidistributionltd.co.uk
                </div>
              )}
            </form>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#161a1d] border border-[#1e2328] rounded-xl p-6">
              <p className="text-[#4a7ab5] font-semibold text-xs tracking-widest uppercase mb-3">Email</p>
              <a href="mailto:info@kaidistributionltd.co.uk" className="text-white hover:text-[#7cbae7] transition-colors text-sm">
                info@kaidistributionltd.co.uk
              </a>
            </div>
            <div className="bg-[#161a1d] border border-[#1e2328] rounded-xl p-6">
              <p className="text-[#4a7ab5] font-semibold text-xs tracking-widest uppercase mb-3">Shop</p>
              <a href="/products" className="text-white hover:text-[#7cbae7] transition-colors text-sm">
                View our products →
              </a>
            </div>
            <div className="bg-[#161a1d] border border-[#1e2328] rounded-xl p-6">
              <p className="text-[#4a7ab5] font-semibold text-xs tracking-widest uppercase mb-3">Trade</p>
              <p className="text-white text-sm">
                Wholesale & partnership enquiries welcome
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
