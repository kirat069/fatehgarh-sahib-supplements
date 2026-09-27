import React from "react";
import { Phone, MessageCircle, Package } from "lucide-react";
import { STORE_INFO } from "../lib/supabase";
import StoreFacts from "./StoreFacts";

export default function Hero() {
  const facts = [
    { label: "Genuine Stock", value: "100%" },
    { label: "Batch Verified", value: "Every Order" },
    { label: "Location", value: "Fatehgarh Sahib" },
    { label: "Contact", value: STORE_INFO.phone },
  ];

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="grow-in"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 24px 60px",
      }}
    >
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 56,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              color: "var(--amber)",
              fontSize: 12,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 24, height: 1, background: "var(--amber)" }} />
            LOCAL SUPPLEMENT DEALER · FATEHGARH SAHIB
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.02,
              marginBottom: 24,
              color: "var(--ink)",
            }}
          >
            Know Exactly<br />
            <span style={{ color: "var(--amber)" }}>What's In The Scoop.</span>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              maxWidth: 480,
              marginBottom: 32,
            }}
          >
            Genuine supplements, straight-up pricing. Every batch verified
            with its lot number on the label. Based in Fatehgarh Sahib, Punjab —
            call before you pay, pick up locally or get it delivered.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={`tel:${STORE_INFO.phone}`} className="btn btn-primary">
              <Phone size={16} /> Call to Order
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle size={16} /> Order on WhatsApp
            </a>
            <button onClick={scrollToProducts} className="btn btn-secondary">
              <Package size={16} /> View Stock
            </button>
          </div>
        </div>

        <div className="hero-facts">
          <StoreFacts facts={facts} barPercent={100} barLabel="Trust Level" />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-facts { max-width: 400px; }
        }
      `}</style>
    </section>
  );
}
