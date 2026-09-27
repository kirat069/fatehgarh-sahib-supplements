import React from "react";
import { ShieldCheck, BadgeCheck, Phone, MapPin } from "lucide-react";

const guarantees = [
  { icon: ShieldCheck, text: "100% Genuine Stock" },
  { icon: BadgeCheck, text: "Batch Verified On Every Order" },
  { icon: Phone, text: "Call Before You Pay" },
  { icon: MapPin, text: "Local Fatehgarh Sahib Dealer" },
];

export default function TrustStrip() {
  return (
    <section style={{ background: "var(--amber)", padding: "16px 0" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {guarantees.map((g, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--bg)",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            <g.icon size={18} strokeWidth={2.5} />
            {g.text}
          </div>
        ))}
      </div>
    </section>
  );
}
