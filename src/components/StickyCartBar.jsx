import React, { useState } from "react";
import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useCart } from "./CartContext";

function Money({ n }) {
  return <>₹{n.toLocaleString("en-IN")}</>;
}

export default function StickyCartBar({ products, onCheckout }) {
  const { items, itemCount, dec, add } = useCart();
  const [expanded, setExpanded] = useState(false);

  if (itemCount === 0) return null;

  const cartLines = Object.entries(items)
    .map(([id, qty]) => {
      const p = products.find((p) => p.id === id);
      return p ? { product: p, qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const qtyBtn = {
    background: "var(--bg)",
    border: "1px solid var(--line)",
    color: "var(--ink)",
    cursor: "pointer",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontFamily: "'IBM Plex Mono', monospace",
  };

  return (
    <>
      {expanded && (
        <div
          style={{
            position: "fixed",
            bottom: 64,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: 420,
            background: "var(--surface)",
            border: "1px solid var(--line-light)",
            zIndex: 150,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                textTransform: "uppercase",
              }}
            >
              Your Order
            </span>
            <button
              onClick={() => setExpanded(false)}
              style={{ background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          </div>
          {cartLines.map(({ product, qty }) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{product.name}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                  {qty} × ₹{product.price.toLocaleString("en-IN")}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => dec(product.id)} style={qtyBtn} aria-label="Decrease">
                  <Minus size={12} />
                </button>
                <span className="mono" style={{ fontSize: 12 }}>{qty}</span>
                <button onClick={() => add(product.id)} style={qtyBtn} aria-label="Increase">
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--surface)",
          borderTop: "2px solid var(--amber)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 140,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShoppingBag size={18} color="var(--amber)" />
          <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          <span className="mono" style={{ fontSize: 13, color: "var(--amber)", fontWeight: 600 }}>
            <Money n={subtotal} />
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn btn-secondary"
            style={{ padding: "8px 16px", fontSize: 12 }}
          >
            {expanded ? "Hide" : "View"} Order
          </button>
          <button onClick={onCheckout} className="btn btn-primary" style={{ padding: "8px 20px", fontSize: 12 }}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
