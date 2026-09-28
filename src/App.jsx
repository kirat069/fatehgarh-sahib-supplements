import React from "react";

import Nav from "./components/Nav";
import Benefits from "./components/Benefits";
import Ingredients from "./components/Ingredients";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import BottleViewer from "./components/3DBottleViewer";

export default function App() {
  return (
    <div className="relative w-full bg-ink overflow-x-hidden">
      <Nav />

      {/* Hero section with the 3D bottle in the center */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
        {/* 3D bottle canvas — centered on screen */}
        <div className="relative w-full max-w-2xl h-[50vh] sm:h-[60vh] z-10">
          <BottleViewer />
        </div>

        {/* Hero text content */}
        <div className="text-center max-w-4xl mx-auto pt-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-panel rounded-full">
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
      </section>

      {/* Remaining sections — normal page flow */}
      <Benefits />
      <Ingredients />
      <Reviews />
      <Footer />
    </div>
  );
}
