import React, { useRef, useState, useEffect } from "react";
import Scene3D from "./components/Scene3D";
import Nav from "./components/Nav";
import ScrollCue from "./components/ScrollCue";
import Hero from "./components/Hero";
import CategorySections from "./components/CategorySections";
import TrustSection from "./components/TrustSection";
import CTASection from "./components/CTASection";
import CartDrawer from "./components/CartDrawer";
import AdminPanel from "./components/AdminPanel";
import { CartProvider } from "./lib/cart";

export default function App() {
  const scrollProgress = useRef(0);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current =
        totalScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / totalScroll))
          : 0;

      const cue = document.getElementById("scrollcue");
      if (cue) {
        cue.style.opacity = window.scrollY > 120 ? "0" : "1";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToFirstCategory = () => {
    const el = document.getElementById("protein");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CartProvider>
      {/* Fixed 3D canvas behind content */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* Navigation + cart button */}
      <Nav />

      {/* Scroll cue */}
      <ScrollCue />

      {/* Main content layered above 3D */}
      <main className="relative z-[1]">
        <Hero />
        <CategorySections />
        <TrustSection />
        <CTASection onShopClick={scrollToFirstCategory} />
      </main>

      {/* Cart drawer with checkout */}
      <CartDrawer />

      {/* Admin access — discrete button in footer area */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      {/* Hidden admin trigger: clicking the fineprint 3 times */}
      <button
        className="fixed bottom-2 right-2 z-[3] text-[0.6rem] font-mono text-muted/30 hover:text-muted/60 transition-colors"
        onClick={() => setShowAdmin(true)}
        aria-label="Admin"
      >
        admin
      </button>
    </CartProvider>
  );
}
