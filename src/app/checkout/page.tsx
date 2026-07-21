import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout | Kai Fishing Co",
  description: "Secure checkout for Kai Fishing Co lead clip systems.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-[#111416] min-h-screen">
      {/* Page header */}
      <section className="bg-[#0a0c0e] border-b border-[#1e2328] py-12">
        <div className="max-w-2xl mx-auto px-6">
          <h1
            className="text-4xl font-bold text-white uppercase mb-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Secure Checkout
          </h1>
          <p className="text-[#6a737c]">Lead Clip Systems — In Stock</p>
        </div>
      </section>

      {/* Checkout form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8">
            <CheckoutForm />
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl mb-2">🔒</p>
              <p className="text-[#6a737c] text-xs">Secure Payment</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-2">📦</p>
              <p className="text-[#6a737c] text-xs">48hr Dispatch</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-2">💬</p>
              <p className="text-[#6a737c] text-xs">UK Support</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
