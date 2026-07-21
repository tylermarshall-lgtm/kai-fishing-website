"use client";

import { useState } from "react";

const LOGO = "https://eu.chat-img.sintra.ai/b601d47d-437c-4524-8d0f-4c3097ac7164/117baf80-b6c0-46fa-b71c-90b855381ab4/Generated_image-f94b4cc2.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0a0c0e] border-b border-[#1e2328] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO} alt="Kai Fishing Co" className="h-10 w-auto" />
            <div>
              <p className="text-white font-bold leading-none tracking-wider text-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>
                KAI FISHING CO
              </p>
              <p className="text-[#4a7ab5] text-xs tracking-widest uppercase">Premium UK Carp Tackle</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[["HOME", "/"], ["PRODUCTS", "/products"], ["CONTACT", "/contact"]].map(([label, href]) => (
              <a key={label} href={href} className="text-[#6a737c] hover:text-white transition-colors text-sm font-medium tracking-wide">
                {label}
              </a>
            ))}
            <a
              href="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              Buy Now
            </a>
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${open ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-white transition-all origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {open && (
          <nav className="md:hidden pt-4 pb-2 border-t border-[#1e2328] mt-4 flex flex-col gap-4">
            {[["Home", "/"], ["Products", "/products"], ["Contact", "/contact"]].map(([label, href]) => (
              <a key={label} href={href} className="text-[#6a737c] hover:text-white text-sm font-medium">
                {label}
              </a>
            ))}
            <a href="/products" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm text-center">
              Buy Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
