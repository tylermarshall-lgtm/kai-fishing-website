"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const firstName = searchParams.get("firstName");
  const email = searchParams.get("email");
  const total = searchParams.get("total");

  return (
    <main className="bg-[#111416] min-h-screen">
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1
            className="text-4xl font-bold text-emerald-400 mb-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Order Confirmed
          </h1>

          {orderNumber && (
            <p className="text-emerald-400 font-mono text-sm mb-6 bg-[#0a0c0e] py-2 px-4 rounded inline-block">
              Order #{orderNumber}
            </p>
          )}

          <p className="text-[#6a737c] text-lg mb-8">
            {firstName && `Thank you ${firstName}! `}
            Payment received and your order is being packed now.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-8 mb-8">
            <p className="text-emerald-400 font-semibold mb-2">✓ Payment Confirmed</p>
            {total && <p className="text-white font-bold text-lg">£{total}</p>}
            {email && (
              <p className="text-[#6a737c] text-sm mt-3">
                Confirmation email sent to <span className="text-white">{email}</span>
              </p>
            )}
          </div>

          <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8 mb-8">
            <h2 className="text-white font-semibold mb-4">What Happens Next?</h2>
            <ul className="space-y-3 text-left text-[#6a737c]">
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>We're packing your order right now</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>Dispatch within 24 hours (normally next working day)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>Tracking details sent to your email</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[#6a737c] mb-6">
              Questions? Contact us at{" "}
              <a
                href="mailto:info@kaidistributionltd.co.uk"
                className="text-emerald-400 hover:text-emerald-300"
              >
                info@kaidistributionltd.co.uk
              </a>
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<div className="bg-[#111416] min-h-screen" />}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
