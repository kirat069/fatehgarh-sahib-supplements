import React from "react";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* CTA banner */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl mb-6">
            Ready to
            <span className="text-gradient-gold"> Feel the Difference?</span>
          </h2>
          <p className="text-ash text-lg mb-8 max-w-xl mx-auto">
            Join 12,000+ people who upgraded their daily routine with Ojas.
            30-day money-back guarantee.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink rounded-full font-semibold text-base hover:bg-gold-bright transition-all duration-200 hover:scale-105 glow-gold">
            Shop Ojas — $48 <ArrowRight size={18} />
          </button>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="text-2xl font-display tracking-widest text-gradient-gold block mb-4">
              OJAS
            </span>
            <p className="text-ash text-sm leading-relaxed">
              Premium supplements with clinically-dosed, science-backed
              ingredients. Pure potency, proven results.
            </p>
          </div>

          <div>
            <h4 className="text-cream font-semibold text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#benefits" className="text-ash text-sm hover:text-gold transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#ingredients" className="text-ash text-sm hover:text-gold transition-colors">
                  Ingredients
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-ash text-sm hover:text-gold transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-ash text-sm hover:text-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-ash text-sm hover:text-gold transition-colors">
                  Lab Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-ash text-sm hover:text-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold text-sm mb-4 uppercase tracking-wider">
              Follow
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center text-ash hover:text-gold hover:border-gold/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center text-ash hover:text-gold hover:border-gold/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center text-ash hover:text-gold hover:border-gold/30 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-ash text-xs">
            © 2024 Ojas. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-ash text-xs hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ash text-xs hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
