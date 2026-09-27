import React from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10"
    >
      <div className="text-center max-w-4xl mx-auto pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-panel rounded-full">
          <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-ash uppercase">
            Now Shipping Worldwide
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] mb-6 animate-fade-in">
          Pure Potency.
          <br />
          <span className="text-gradient-gold">Proven Science.</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-ash max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Premium supplements crafted with clinically-dosed, science-backed
          ingredients. No fillers, no fluff — just results you can feel.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <button className="px-8 py-4 bg-gold text-ink rounded-full font-semibold text-base hover:bg-gold-bright transition-all duration-200 hover:scale-105 glow-gold">
            Shop Ojas — $48
          </button>
          <button className="px-8 py-4 border border-white/15 text-cream rounded-full font-semibold text-base hover:border-gold hover:text-gold transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono tracking-widest text-ash uppercase">
          Scroll to Explore
        </span>
        <ArrowDown
          size={18}
          className="text-gold animate-bounce"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
