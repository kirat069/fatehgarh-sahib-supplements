import React from "react";

const styles = {
  wrapper: {
    background: "var(--surface)",
    border: "1px solid var(--line)",
  },
  header: {
    background: "var(--bg)",
    borderBottom: "3px solid var(--ink)",
    padding: "10px 14px",
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "var(--ink)",
  },
  subHeader: {
    padding: "8px 14px",
    borderBottom: "1px solid var(--line)",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "var(--ink-soft)",
  },
  body: { padding: "8px 14px 14px" },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0",
    borderBottom: "1px solid var(--line)",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    color: "var(--ink)",
  },
  barOuter: {
    height: 6,
    background: "var(--bg)",
    border: "1px solid var(--line)",
    margin: "8px 14px 14px",
    overflow: "hidden",
  },
  barInner: { height: "100%", background: "var(--amber)" },
};

export default function StoreFacts({ facts, barPercent, barLabel }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>Store Facts</div>
      <div style={styles.subHeader}>
        Serving: 1 scoop · Dealer: Fatehgarh Sahib, Punjab
      </div>
      <div style={styles.body}>
        {facts.map((f, i) => (
          <div key={i} style={styles.row}>
            <span>{f.label}</span>
            <span style={{ fontWeight: 500 }}>{f.value}</span>
          </div>
        ))}
      </div>
      {barLabel && (
        <div className="mono" style={{ ...styles.subHeader, borderBottom: "none" }}>
          {barLabel}
        </div>
      )}
      {barPercent != null && (
        <div style={styles.barOuter}>
          <div
            style={{
              ...styles.barInner,
              width: `${Math.min(100, Math.max(0, barPercent))}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
