import React from "react";
import { STORE_INFO } from "../lib/supabase";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "40px 24px 100px",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--amber)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Fatehgarh Sahib Supplement Dealing
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
            Genuine supplements. Batch verified. Local dealer.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <a href={`tel:${STORE_INFO.phone}`} style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 13 }}>
            Phone: {STORE_INFO.phone}
          </a>
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 13 }}
          >
            WhatsApp Chat
          </a>
          <span style={{ color: "var(--ink-soft)", fontSize: 13 }}>{STORE_INFO.location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <a
            href="/admin"
            className="mono"
            style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 12 }}
          >
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
}
