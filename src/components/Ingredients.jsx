import React from "react";
import { Check } from "lucide-react";

const ingredients = [
  { name: "Ashwagandha KSM-66", dose: "600mg", benefit: "Stress & cortisol support" },
  { name: "Lion's Mane 8:1", dose: "500mg", benefit: "Cognitive enhancement" },
  { name: "Vitamin D3", dose: "5000IU", benefit: "Bone & immune health" },
  { name: "Magnesium Glycinate", dose: "200mg", benefit: "Sleep & muscle recovery" },
  { name: "Zinc Picolinate", dose: "15mg", benefit: "Immune function" },
  { name: "Omega-3 EPA/DHA", dose: "1000mg", benefit: "Heart & brain health" },
  { name: "L-Theanine", dose: "200mg", benefit: "Calm focus" },
  { name: "CoQ10", dose: "100mg", benefit: "Cellular energy" },
];

export default function Ingredients() {
  return (
    <section
      id="ingredients"
      className="relative z-10 min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading and copy */}
          <div className="lg:sticky lg:top-32">
            <span className="text-xs font-mono tracking-widest text-coral uppercase mb-4 block">
              Full Transparency
            </span>
            <h2 className="font-display text-4xl sm:text-6xl mb-6">
              Every
              <br />
              <span className="text-gradient-gold">Milligram</span>
              <br />
              Matters
            </h2>
            <p className="text-ash text-lg leading-relaxed mb-8">
              We list every ingredient at its clinically effective dose. No
              proprietary blends hiding underdosed filler. What's on the label
              is exactly what's in the bottle — third-party lab verified.
            </p>
            <div className="flex items-center gap-3 mb-3">
              <Check size={20} className="text-gold" />
              <span className="text-cream/90 text-sm">
                NSF Certified for Sport
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Check size={20} className="text-gold" />
              <span className="text-cream/90 text-sm">
                Vegan & non-GMO
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check size={20} className="text-gold" />
              <span className="text-cream/90 text-sm">
                Made in FDA-registered facility
              </span>
            </div>
          </div>

          {/* Right: ingredient list */}
          <div className="space-y-3">
            {ingredients.map((ing, i) => (
              <div
                key={ing.name}
                className="glass-panel rounded-xl p-5 flex items-center justify-between hover:border-gold/20 transition-all duration-200"
                style={{
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div className="flex-1">
                  <div className="font-semibold text-cream text-base mb-1">
                    {ing.name}
                  </div>
                  <div className="text-ash text-xs">{ing.benefit}</div>
                </div>
                <div className="text-right ml-4">
                  <div className="font-mono text-gold text-sm font-semibold">
                    {ing.dose}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
