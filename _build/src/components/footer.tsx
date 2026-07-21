const LOGO = "https://eu.chat-img.sintra.ai/b601d47d-437c-4524-8d0f-4c3097ac7164/117baf80-b6c0-46fa-b71c-90b855381ab4/Generated_image-f94b4cc2.png";

export default function Footer() {
  return (
    <footer className="bg-[#0a0c0e] border-t border-[#1e2328] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO} alt="Kai Fishing Co" className="h-10 w-auto" />
              <div>
                <p className="text-white font-bold tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>KAI FISHING CO</p>
                <p className="text-[#4a7ab5] text-xs tracking-widest uppercase">Premium UK Carp Tackle</p>
              </div>
            </div>
            <p className="text-[#6a737c] text-sm leading-relaxed max-w-sm">
              Kai Fishing Co is a trading brand of Kai Distribution Ltd. Premium UK carp tackle — built for the bank, designed for anglers.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">Shop</h4>
            <ul className="space-y-3">
              {[["Home", "/"], ["Products", "/products"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[#6a737c] hover:text-white transition-colors text-sm">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">Contact</h4>
            <a href="mailto:info@kaidistributionltd.co.uk" className="text-[#6a737c] hover:text-white transition-colors text-sm block mb-3">
              info@kaidistributionltd.co.uk
            </a>
            <p className="text-[#6a737c] text-sm mb-5">UK Delivery Only</p>
            <a href="/products" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Shop Now
            </a>
          </div>
        </div>

        <div className="border-t border-[#1e2328] pt-8 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              ["Delivery Info", "#"],
              ["Returns & Refunds", "#"],
              ["Terms", "#"],
              ["Privacy", "#"],
              ["Cookies", "#"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-[#6a737c] hover:text-white transition-colors text-xs">
                {label}
              </a>
            ))}
          </div>

          <div className="text-[#6a737c] text-xs leading-relaxed mb-4 space-y-2">
            <p><strong>Kai Fishing Co</strong> is a trading brand of Kai Distribution Ltd.</p>
            <p>Kai Distribution Ltd is registered in England and Wales.<br />
            Company number: <strong>16891611</strong><br />
            Registered office: <strong>71–75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ</strong></p>
          </div>
        </div>

        <div className="border-t border-[#1e2328] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#3a4048] text-sm">© {new Date().getFullYear()} Kai Fishing Co — A Kai Distribution Ltd Brand</p>
        </div>
      </div>
    </footer>
  );
}
