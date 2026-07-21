"use client";

import { useState } from "react";

interface Props {
  product?: string;
}

export default function PreOrderForm({ product = "Lead Clip Systems" }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "1", notes: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://alluring-encouragement-production.up.railway.app/public/lead_v3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          details: `Pre-order: ${product} — ${form.quantity} pack(s) @ £${(Number(form.quantity) * 3.99).toFixed(2)}. Notes: ${form.notes}`,
          knowledge_profile_id: "2d00c7ce-3905-4671-98bb-1fc6cb52c807",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#0c1f14] border border-green-700/30 rounded-xl p-10 text-center">
        <div className="text-5xl mb-4">🎣</div>
        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Pre-Order Received!
        </h3>
        <p className="text-[#6a737c] max-w-sm mx-auto">
          We'll be in touch within 24 hours to confirm your order and payment details.
          Your tackle ships as soon as stock arrives.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#6a737c] mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#6a737c] mb-2">Email Address *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="your@email.com"
            className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#6a737c] mb-2">Phone (optional)</label>
          <input
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="07xxx xxxxxx"
            className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#6a737c] mb-2">Quantity</label>
          <select
            value={form.quantity}
            onChange={set("quantity")}
            className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4a7ab5] transition-colors"
          >
            {[1, 2, 3, 4, 5, 10].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "pack" : "packs"} — £{(n * 3.99).toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#6a737c] mb-2">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={set("notes")}
          rows={3}
          placeholder="Colourway preference, questions, delivery notes..."
          className="w-full bg-[#111416] border border-[#252b31] rounded-lg px-4 py-3 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors resize-none"
        />
      </div>
      <p className="text-[#3a4048] text-sm">
        Pre-ordering is free — no charge until your order ships. We'll contact you to confirm payment before dispatch.
      </p>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#4a7ab5] hover:bg-[#5a8ac5] disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
      >
        {status === "submitting" ? "Placing Pre-Order..." : "Reserve My Order — Free to Pre-Order"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Email us at info@kaidistributionltd.co.uk
        </p>
      )}
    </form>
  );
}
