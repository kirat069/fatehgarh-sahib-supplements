import React from "react";
import TiltCard from "./TiltCard";

export default function Team() {
  return (
    <section id="team" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 8, color: "var(--ink)" }}>
        The <span style={{ color: "var(--amber)" }}>Dealer</span>
      </h2>
      <p style={{ color: "var(--ink-soft)", marginBottom: 32, fontSize: 14 }}>
        Your local supplement and nutrition expert.
      </p>

      <div style={{ maxWidth: 480 }}>
        <TiltCard
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, var(--surface-light) 0%, var(--surface) 100%)",
              padding: "40px 32px",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: "var(--amber)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: "var(--bg)",
                marginBottom: 20,
              }}
            >
              DM
            </div>
            <h3 style={{ fontSize: 22, color: "var(--ink)", marginBottom: 4 }}>Divansh Mukheja</h3>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--amber)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              Dealer & Nutrition Planner
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>
              Running Fatehgarh Sahib Supplement Dealing with a simple principle:
              genuine stock, fair pricing, and batch verification on every order.
              Call before you pay — I'll walk you through exactly what you're buying
              and why. Specializing in strength, recovery, and general wellness
              supplementation.
            </p>
          </div>
          <div
            className="mono"
            style={{
              padding: "12px 32px",
              background: "var(--bg)",
              borderTop: "1px solid var(--line)",
              fontSize: 11,
              color: "var(--ink-soft)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>BASED IN FATEHGARH SAHIB</span>
            <span>PUNJAB, INDIA</span>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
