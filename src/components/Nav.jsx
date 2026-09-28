import React, { useState, useEffect } from "react";
import { useCart } from "../lib/cart";

export default function Nav() {
  const { totalItems, setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="brandmark fixed top-[calc(1.6rem+env(safe-area-inset-top,0px))] left-7 z-[5] font-serif text-[1.05rem] tracking-[0.03em] text-ink pointer-events-none"
      >
        OJAS
      </nav>

      <button
        onClick={() => setCartOpen(true)}
        className={`fixed top-[calc(1.4rem+env(safe-area-inset-top,0px))] right-7 z-[5] flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] text-muted hover:text-ink transition-colors duration-200 ${
          scrolled ? "opacity-100" : "opacity-60"
        }`}
      >
        <span>CART</span>
        {totalItems > 0 && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-copper text-bg rounded-full text-[0.65rem] font-bold">
            {totalItems}
          </span>
        )}
      </button>
    </>
  );
}
