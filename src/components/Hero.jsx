import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero min-h-screen min-h-[100svh] flex flex-col justify-center px-[6vw]"
    >
      <h1 className="font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.03] tracking-[-0.01em] max-w-[14ch] mb-5 font-medium">
        Vital nutrition,
        <br />
        rooted in India.
      </h1>
      <p className="sub text-[clamp(1rem,1.6vw,1.22rem)] text-muted max-w-[38ch] leading-[1.55]">
        Protein, Ayurvedic herbs, vitamins and recovery — formulated and tested
        for the way India trains, works and lives.
      </p>
    </section>
  );
}
