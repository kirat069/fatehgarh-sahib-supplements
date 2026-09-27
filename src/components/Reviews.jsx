import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Maya R.",
    role: "Marathon Runner",
    text: "I've tried every supplement stack under the sun. Ojas is the first one where I actually feel the difference — cleaner energy, better recovery, no jitters. It's the real deal.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Software Engineer",
    text: "The mental clarity is unreal. I used to hit a wall at 3pm every day. Now I'm locked in until evening. Lion's mane plus L-theanine is a game changer.",
    rating: 5,
  },
  {
    name: "Sofia L.",
    role: "Yoga Instructor",
    text: "I love that there are no fillers or artificial anything. The ingredient list is clean and the doses are real. This is what supplements should be.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative z-10 min-h-screen flex items-center py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase mb-4 block">
            What People Say
          </span>
          <h2 className="font-display text-4xl sm:text-6xl mb-4">
            12,000+
            <br />
            <span className="text-gradient-gold">Happy Customers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="glass-panel rounded-2xl p-8 flex flex-col"
            >
              <Quote size={28} className="text-gold/40 mb-4" />
              <p className="text-cream/80 text-sm leading-relaxed mb-6 flex-1">
                "{r.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-cream text-sm">{r.name}</div>
                <div className="text-ash text-xs">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
