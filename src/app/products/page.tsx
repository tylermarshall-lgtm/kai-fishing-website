import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Products | Kai Fishing Co",
  description: "Kai Lead Clip Action Pack — UK in stock and ready to dispatch within 24 hours.",
};

const comingSoon = [
  { name: "Zig Aligner Action Pack", desc: "Precision zig aligners with matching components for surface and mid-water presentations.", icon: "🪝" },
  { name: "Terminal Tackle Refill Packs", desc: "Individual replacement components to complement existing action packs.", icon: "🔧" },
  { name: "Lead Systems", desc: "Complete lead arrangements with matched components.", icon: "⚓" },
];

export default function ProductsPage() {
  return (
    <main className="bg-[#111416] min-h-screen">
      {/* Page header */}
      <section className="bg-[#0a0c0e] border-b border-[#1e2328] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#4a7ab5] text-xs font-semibold tracking-widest uppercase mb-3">Kai Fishing Co</p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white uppercase mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Our Range
          </h1>
          <p className="text-[#6a737c] text-lg max-w-2xl">
            The Kai Lead Clip Action Pack is now in stock and available for UK delivery. Orders are normally dispatched within 24 hours.
          </p>
        </div>
      </section>

      {/* Lead Clip Systems */}
      <section className="py-24" id="buy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product info */}
            <div>
              <div className="inline-block bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
                In Stock — Ready to Dispatch
              </div>
              <h2
                className="text-5xl font-bold text-white uppercase mb-3"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Lead Clip<br />Action Pack
              </h2>
              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>£3.99</p>
                <p className="text-[#6a737c]">Pack of five complete setups</p>
              </div>
              <p className="text-[#6a737c] leading-relaxed mb-8">
                A complete lead clip action pack containing the matched components needed to create five lead clip arrangements. Each pack includes five lead clips, five tail rubbers, five matching swivels and 2m of sinking rig tubing.
              </p>

              <div className="mb-10">
                <p className="text-white font-semibold text-sm mb-4">What is included</p>
                <div className="space-y-3">
                  {[
                    "5 × lead clips",
                    "5 × tail rubbers",
                    "5 × matching swivels",
                    "2m × sinking rig tubing",
                    "Choice of natural or hi-viz colourway",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-[#4a7ab5] mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-[#6a737c] text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <p className="text-white font-semibold text-sm mb-4">Product benefits</p>
                <div className="space-y-3">
                  {[
                    "Creates five complete lead clip setups",
                    "Matching components supplied together",
                    "Suitable for use with standard swivel leads",
                    "Tubing helps protect the main line and provides a tidy presentation",
                    "Designed to allow the lead to release when correctly assembled and required",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-[#4a7ab5] mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-[#6a737c] text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/25 rounded-xl p-5 mb-10">
                <p className="text-blue-400 font-semibold text-sm mb-2">⚠ Setup Information</p>
                <p className="text-[#6a737c] text-sm leading-relaxed">
                  Lead-release performance depends on correct assembly and how firmly the tail rubber is fitted. Always check the system before casting and follow the included setup instructions.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-5">
                <p className="text-emerald-400 font-semibold text-sm mb-2">📦 Delivery</p>
                <p className="text-[#6a737c] text-sm leading-relaxed">
                  <span className="block font-semibold text-white">In stock and normally dispatched within 24 hours.</span>
                  <span className="block text-emerald-400 font-semibold mt-2">Free UK shipping when purchasing two or more packs.</span>
                </p>
              </div>
            </div>

            {/* Checkout form */}
            <div>
              <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8 sticky top-8">
                <h3
                  className="text-2xl font-bold text-white uppercase mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Secure Checkout
                </h3>
                <p className="text-[#6a737c] text-sm mb-8">
                  Stock available now. Ships within 24 hours.
                </p>

                <CheckoutForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currently in Development */}
      <section className="py-24 border-t border-[#1e2328]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2
              className="text-4xl font-bold text-white uppercase mb-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Currently in Development
            </h2>
            <p className="text-[#6a737c] text-lg">
              These products are currently being tested and sampled.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
            {comingSoon.map((p) => (
              <div key={p.name} className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-7">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3
                  className="text-lg font-bold text-white mb-2 uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {p.name}
                </h3>
                <p className="text-[#4a5058] text-sm leading-relaxed mb-5">{p.desc}</p>
                <span className="inline-block bg-[#1e2328] text-[#6a737c] px-3 py-1 rounded-full text-xs">
                  Currently Testing
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
