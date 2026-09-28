import React from "react";

export default function CTASection({ onShopClick }) {
  return (
    <footer
      id="cta"
      className="cta min-h-[90vh] min-h-[90svh] flex flex-col items-center justify-center text-center px-[6vw] pb-[calc(3rem+env(safe-area-inset-bottom,0px))]"
    >
      <h2 className="font-serif font-medium text-[clamp(2rem,4.4vw,3.4rem)] max-w-[16ch] mb-4 leading-[1.08]">
        Ready to fuel your journey?
      </h2>
      <p className="text-muted max-w-[36ch] mb-9 leading-[1.55]">
        Browse our full range of lab-tested supplements and place your order —
        shipped across India.
      </p>
      <button className="btn" type="button" onClick={onShopClick}>
        Shop Products
      </button>
      <div className="fineprint mt-[3.2rem] font-mono text-[0.68rem] text-muted tracking-[0.02em]">
        OJAS — Vital nutrition, rooted in India.
      </div>
    </footer>
  );
}
