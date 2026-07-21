import Hero from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import CTASection from "@/components/cta-section";

const LOGO = "https://eu.chat-img.sintra.ai/b601d47d-437c-4524-8d0f-4c3097ac7164/117baf80-b6c0-46fa-b71c-90b855381ab4/Generated_image-f94b4cc2.png";

const comingSoon = [
  { name: "Zig Aligner Action Pack", desc: "Precision zig aligners with matching components for surface and mid-water presentations.", icon: "🪝" },
  { name: "Terminal Tackle Refill Packs", desc: "Individual replacement components to complement existing action packs.", icon: "🔧" },
  { name: "Lead Systems", desc: "Complete lead arrangements with matched components.", icon: "⚓" },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesSection />

      {/* Featured Product */}
      <section className="py-24 bg-[#0d0f11]" id="product">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-8">
            In Stock — Ships Within 48 Hours
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-6xl font-bold text-white uppercase mb-4 leading-none"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Lead Clip<br />Action Pack
              </h2>
              <p className="text-[#6a737c] text-lg mb-8 leading-relaxed">
                Everything required to create five complete lead clip setups in one pack. Each pack includes five lead clips, five tail rubbers, five matching swivels and 2m of sinking rig tubing. Designed to provide a straightforward lead-release arrangement when assembled and used correctly.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "5 lead clips",
                  "5 matching tail rubbers",
                  "5 matching swivels",
                  "2m of sinking rig tubing",
                  "Creates five complete lead clip setups",
                  "Available in natural and hi-viz colourways",
                  "Suitable for standard swivel leads",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#6a737c]">
                    <span className="text-[#4a7ab5] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-6 mb-10">
                <div>
                  <p className="text-sm text-[#6a737c] mb-1">Launch Price</p>
                  <p className="text-5xl font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>£3.99</p>
                  <p className="text-sm text-[#6a737c]">per pack of 5</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-5 py-3">
                    <p className="text-xs text-emerald-400 font-semibold tracking-widest uppercase mb-1">In Stock</p>
                    <p className="text-sm text-[#6a737c]">Order Today</p>
                  </div>
                  <div className="bg-[#1e2328] border border-emerald-500/25 rounded-xl px-5 py-2">
                    <p className="text-xs text-emerald-400 font-semibold">FREE SHIPPING on 2+</p>
                  </div>
                </div>
              </div>
              <a
                href="/products"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Buy Now →
              </a>
            </div>

            <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-12 flex items-center justify-center min-h-[380px]">
              <div className="text-center">
                <img src={LOGO} alt="Kai Fishing Co" className="h-28 w-auto mx-auto opacity-40 mb-6" />
                <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">Stock Arrived</p>
                <p className="text-[#6a737c] text-sm mt-2">Limited quantities available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 bg-[#111416]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl md:text-5xl font-bold text-white uppercase mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Currently in Development
            </h2>
            <p className="text-[#6a737c] text-lg max-w-xl mx-auto">
              These products are currently being tested and sampled.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
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

      {/* Message from the MD */}
      <section className="py-24 bg-[#0d0f11] border-t border-[#1e2328]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#4a7ab5] text-xs font-semibold tracking-widest uppercase mb-4">
                A Message from the Managing Director
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white uppercase mb-8 leading-tight"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Built from Passion.<br />Driven by Purpose.
              </h2>
              <div className="space-y-5 text-[#6a737c] leading-relaxed text-lg">
                <p>
                  I picked up my first rod at the age of eight and honestly, I've never been able to put it down since.
                  Fishing gave me something I didn't find anywhere else — patience, focus, and a connection to the
                  outdoors that's hard to put into words.
                </p>
                <p>
                  Kai Fishing Co was born out of frustration. My dad and I have spent years on the bank together,
                  and we know exactly what a carp angler actually needs — and what fair value looks like.
                  We were tired of paying over the odds for gear from brands that had forgotten what it feels like
                  to sit on the bank.
                </p>
                <p>
                  This is a family-run, angler-owned brand. Every product we bring out is something we'd use on our
                  own sessions. And if I'm honest, one of the biggest reasons I started this is because I want to
                  see more people — especially younger anglers — pick up a rod and get out there.
                  Fishing changed my life. I'd love for it to do the same for others.
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-[#1e2328]">
                <p className="text-white font-bold text-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>Tyler Marshall</p>
                <p className="text-[#4a7ab5] text-sm mt-1">Managing Director — Kai Fishing Co</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-full bg-[#1e2328] flex items-center justify-center text-2xl flex-shrink-0">
                    🎣
                  </div>
                  <div>
                    <p className="text-white font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>ANGLER OWNED</p>
                    <p className="text-[#6a737c] text-sm">Family run from day one</p>
                  </div>
                </div>
                {[
                  { label: "Fishing since", value: "Age 8" },
                  { label: "Founded", value: "2025" },
                  { label: "Based in", value: "United Kingdom" },
                  { label: "The team", value: "Tyler & his Dad" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-[#1e2328] last:border-0">
                    <span className="text-[#6a737c] text-sm">{label}</span>
                    <span className="text-white font-medium text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8">
                <p className="text-[#4a7ab5] text-xs font-semibold tracking-widest uppercase mb-3">Our Mission</p>
                <p className="text-[#6a737c] leading-relaxed">
                  Bringing quality carp tackle to anglers at prices that actually make sense —
                  and inspiring the next generation to fall in love with fishing the way we did.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
