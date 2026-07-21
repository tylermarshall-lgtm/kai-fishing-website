const features = [
  {
    icon: "🇬🇧",
    title: "UK-Owned and Angler-Led",
    desc: "Kai Fishing Co is a UK-owned, family-run fishing brand created by anglers who understand what is actually needed on the bank.",
  },
  {
    icon: "🎯",
    title: "Complete, Matched Systems",
    desc: "Each action pack contains the matching components required to create complete setups, removing the need to purchase individual rig components separately.",
  },
  {
    icon: "💷",
    title: "Straightforward Value",
    desc: "Five complete lead clip setups, including 2m of sinking rig tubing, for £3.99. Quality terminal tackle without unnecessary packaging or inflated pricing.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#111416]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white uppercase mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Why Kai Fishing Co?
          </h2>
          <p className="text-[#6a737c] text-lg max-w-xl mx-auto">
            We're building the tackle brand we always wanted — no compromises, no nonsense.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#161a1d] border border-[#1e2328] rounded-2xl p-8 hover:border-[#4a7ab5]/40 transition-colors"
            >
              <div className="text-4xl mb-5">{f.icon}</div>
              <h3
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-[#6a737c] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
