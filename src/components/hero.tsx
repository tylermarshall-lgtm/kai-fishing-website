export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0a0c0e]">
      {/* Background photo */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src="https://eu.chat-img.sintra.ai/b601d47d-437c-4524-8d0f-4c3097ac7164/b9a68472-67dc-401a-a28b-2104818a9476/IMG_2246.jpeg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Gradient overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0e] via-[#0a0c0e]/90 to-[#0a0c0e]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-transparent to-[#0a0c0e]/40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4a7ab5]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-10">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
          In Stock Now — Ships Within 48 Hours
        </div>

        <h1
          className="text-7xl md:text-9xl font-bold text-white leading-none mb-6 uppercase"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Built for<br />
          <span className="text-[#4a7ab5]">the Bank.</span>
        </h1>

        <p className="text-xl md:text-2xl text-[#6a737c] mb-8 max-w-2xl leading-relaxed">
          Complete terminal tackle systems, built for straightforward and dependable use on the bank. Our Lead Clip Action Pack creates five complete setups and includes 2m of sinking rig tubing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/products"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
          >
            Shop the Lead Clip Action Pack — £3.99
          </a>
          <a
            href="/products"
            className="inline-block border border-[#1e2328] hover:border-[#4a7ab5] text-[#6a737c] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
          >
            Explore Range
          </a>
        </div>

        <div className="mt-20 pt-8 border-t border-[#1e2328] grid grid-cols-3 gap-8 max-w-md">
          {[["UK-Owned", "Brand"], ["5", "Complete Setups"], ["2m", "Tubing Included"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{val}</p>
              <p className="text-xs text-[#6a737c] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
