import React from "react";

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="trust min-h-[80vh] min-h-[80svh] flex flex-col items-center justify-center text-center px-[6vw]"
    >
      <h2 className="font-serif font-medium text-[clamp(1.8rem,3.6vw,2.8rem)] mb-8 max-w-[16ch]">
        Made and tested in India.
      </h2>
      <div className="stats flex flex-wrap gap-[0.8rem] justify-center max-w-[640px]">
        <span className="stat">FSSAI licensed</span>
        <span className="stat">GMP-certified facility</span>
        <span className="stat">Third-party lab tested</span>
        <span className="stat">Made in India</span>
      </div>
    </section>
  );
}
