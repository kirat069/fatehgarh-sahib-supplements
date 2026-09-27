import React, { useState } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { STORE_INFO } from "../lib/supabase";
import { useToast } from "./ToastContext";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "products", label: "Products" },
  { id: "tracking", label: "Track Order" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { showToast } = useToast();

  const handleCall = async () => {
    try {
      await navigator.clipboard.writeText(STORE_INFO.phone);
      showToast(`Number copied: ${STORE_INFO.phone}`);
    } catch {
      showToast(`Call: ${STORE_INFO.phone}`);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(20, 24, 28, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => scrollTo("hero")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
        >
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: "var(--amber)",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            FSSD
          </span>
          <span
            className="mono nav-subtitle"
            style={{ fontSize: 10, color: "var(--ink-soft)" }}
          >
            Fatehgarh Sahib
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div className="nav-desktop" style={{ display: "flex", gap: 20 }}>
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--ink-soft)",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--amber)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--ink-soft)")}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a
            href={`tel:${STORE_INFO.phone}`}
            onClick={handleCall}
            className="btn btn-secondary nav-call-btn"
            style={{ padding: "8px 16px", fontSize: 12 }}
          >
            <Phone size={14} /> Call
          </a>
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-wa-btn"
            style={{ padding: "8px 16px", fontSize: 12 }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--line)",
            padding: "12px 24px",
          }}
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                color: "var(--ink)",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 0",
                textAlign: "left",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-call-btn, .nav-wa-btn { display: none !important; }
          .nav-subtitle { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
