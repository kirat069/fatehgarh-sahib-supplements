import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Benefits", href: "#benefits" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Reviews", href: "#reviews" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <a href="#hero" className="flex items-center gap-2">
          <span className="text-2xl font-display tracking-widest text-gradient-gold">
            OJAS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ash hover:text-gold transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <button className="px-5 py-2.5 bg-gold text-ink rounded-full text-sm font-semibold hover:bg-gold-bright transition-all duration-200 hover:scale-105">
            Shop Now
          </button>
        </div>

        <button
          className="md:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-ink/95 backdrop-blur-xl border-t border-white/5">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-cream/80 hover:text-gold transition-colors text-sm font-medium border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <button className="mt-4 px-5 py-3 bg-gold text-ink rounded-full text-sm font-semibold">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
