import React from "react";
import { Zap, Shield, Leaf, Activity, Heart, Brain } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Explosive Energy",
    description:
      "Clean, sustained energy without the crash. Adaptogens and B-vitamins keep you sharp all day.",
    color: "gold",
  },
  {
    icon: Shield,
    title: "Immune Armor",
    description:
      "Clinically-dosed zinc, vitamin C, and elderberry build a fortress your immune system deserves.",
    color: "coral",
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    description:
      "Lion's mane and L-theanine cut through brain fog. Think faster, focus longer, perform better.",
    color: "gold",
  },
  {
    icon: Activity,
    title: "Recovery Boost",
    description:
      "Tart cherry and turmeric reduce inflammation so you bounce back faster after every session.",
    color: "coral",
  },
  {
    icon: Heart,
    title: "Heart Health",
    description:
      "Omega-3 EPA/DHA and CoQ10 support cardiovascular health at the cellular level.",
    color: "gold",
  },
  {
    icon: Leaf,
    title: "Clean Formula",
    description:
      "Zero fillers, zero artificial dyes, zero BS. Third-party tested for purity and potency.",
    color: "coral",
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative z-10 min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase mb-4 block">
            Why Ojas
          </span>
          <h2 className="font-display text-4xl sm:text-6xl mb-4">
            Six Reasons
            <br />
            <span className="text-gradient-coral">It Just Works</span>
          </h2>
          <p className="text-ash text-lg max-w-xl mx-auto">
            Every ingredient earns its place. No proprietary blends, no
            underdosed window dressing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="glass-panel rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 group"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  b.color === "gold"
                    ? "bg-gold/10 text-gold"
                    : "bg-coral/10 text-coral"
                }`}
              >
                <b.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-3 text-cream">
                {b.title}
              </h3>
              <p className="text-ash text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
