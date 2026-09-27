import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Scene3D from "./components/Scene3D";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Products from "./components/Products";
import StickyCartBar from "./components/StickyCartBar";
import OrderTracking from "./components/OrderTracking";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import { CartProvider } from "./components/CartContext";
import { ToastProvider } from "./components/ToastContext";
import { fetchProducts } from "./lib/api";

function Storefront() {
  const [products, setProducts] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetchProducts().then(({ data, demo }) => {
      if (data) {
        setProducts(data);
        setIsDemo(false);
      } else if (demo) {
        setProducts(demo);
        setIsDemo(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <span className="mono" style={{ color: "var(--ink-soft)", fontSize: 13 }}>
          Loading store...
        </span>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Scene3D sectionRef={sectionRef} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <TrustStrip />

        <div ref={sectionRef}>
          <Hero />
          <Products products={products} isDemo={isDemo} />
          <OrderTracking />
          <Team />
          <Contact />
        </div>

        <Footer />

        <StickyCartBar
          products={products}
          onCheckout={() =>
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </ToastProvider>
  );
}
