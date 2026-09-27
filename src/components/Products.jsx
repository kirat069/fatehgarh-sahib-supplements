import React, { useState, useMemo } from "react";
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import TiltCard from "./TiltCard";
import Checkout from "./Checkout";

function Money({ n }) {
  return <>₹{n.toLocaleString("en-IN")}</>;
}

function StockBar({ stock, max = 100 }) {
  const pct = Math.min(100, (stock / max) * 100);
  const color = stock > 30 ? "var(--success)" : stock > 10 ? "var(--amber)" : "var(--signal-red)";
  return (
    <div style={{ marginTop: 8 }}>
      <div
        className="mono"
        style={{
          fontSize: 10,
          color: "var(--ink-soft)",
          marginBottom: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>STOCK</span>
        <span>{stock} units</span>
      </div>
      <div
        style={{
          height: 4,
          background: "var(--bg)",
          border: "1px solid var(--line)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

const iconBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "var(--ink)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 2,
};

function ProductCard({ product }) {
  const { items, add, dec } = useCart();
  const qty = items[product.id] || 0;

  return (
    <TiltCard
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
      }}
    >
      {product.tag && (
        <div
          style={{
            display: "inline-block",
            background: "var(--amber)",
            color: "var(--bg)",
            padding: "3px 10px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            width: "fit-content",
          }}
        >
          {product.tag}
        </div>
      )}
      <div>
        <h3 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 4 }}>{product.name}</h3>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{product.description}</p>
      </div>

      <div
        className="mono"
        style={{
          fontSize: 10,
          color: "var(--ink-soft)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "6px 0",
        }}
      >
        LOT / BATCH: {product.lot_label}
      </div>

      <StockBar stock={product.stock} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 8,
        }}
      >
        <div
          className="mono"
          style={{ fontWeight: 600, fontSize: 20, color: "var(--amber)" }}
        >
          <Money n={product.price} />
        </div>
        {qty > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--bg)",
              padding: "6px 10px",
              border: "1px solid var(--line-light)",
            }}
          >
            <button onClick={() => dec(product.id)} style={iconBtn} aria-label="Decrease">
              <Minus size={14} />
            </button>
            <span className="mono" style={{ fontSize: 14, minWidth: 16, textAlign: "center" }}>
              {qty}
            </span>
            <button onClick={() => add(product.id)} style={iconBtn} aria-label="Increase">
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => add(product.id)}
            className="btn btn-primary"
            style={{ padding: "8px 16px", fontSize: 12 }}
          >
            <Plus size={14} /> Add to Order
          </button>
        )}
      </div>
    </TiltCard>
  );
}

export default function Products({ products, isDemo }) {
  const { items, add, dec, remove, clear } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const cartLines = useMemo(
    () =>
      Object.entries(items)
        .map(([id, qty]) => {
          const p = products.find((p) => p.id === id);
          return p ? { product: p, qty } : null;
        })
        .filter(Boolean),
    [items, products]
  );

  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);

  if (showCheckout) {
    return (
      <Checkout
        products={products}
        cartLines={cartLines}
        subtotal={subtotal}
        onBack={() => setShowCheckout(false)}
        onDone={() => {
          clear();
          setShowCheckout(false);
        }}
      />
    );
  }

  return (
    <section id="products" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 8, color: "var(--ink)" }}>
        Product <span style={{ color: "var(--amber)" }}>Catalog</span>
      </h2>
      <p style={{ color: "var(--ink-soft)", marginBottom: 40, fontSize: 14 }}>
        {isDemo
          ? "Showing demo stock. Live inventory will appear when the database connection is active."
          : "Every product listed with its actual batch number. Read before you buy."}
      </p>

      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {cartLines.length > 0 && (
        <div
          className="cart-panel fade-up"
          style={{
            marginTop: 48,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <ShoppingBag size={20} color="var(--amber)" />
            <h3 style={{ fontSize: 20, color: "var(--ink)" }}>Your Order</h3>
          </div>

          {cartLines.map(({ product, qty }) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>
                  {product.name}
                </div>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                  {qty} × <Money n={product.price} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => dec(product.id)} style={iconBtn} aria-label="Decrease">
                    <Minus size={14} />
                  </button>
                  <span className="mono" style={{ fontSize: 13 }}>{qty}</span>
                  <button onClick={() => add(product.id)} style={iconBtn} aria-label="Increase">
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => remove(product.id)}
                    style={{ ...iconBtn, color: "var(--signal-red)", marginLeft: 4 }}
                    aria-label="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <span className="mono" style={{ fontWeight: 600, color: "var(--amber)", fontSize: 14 }}>
                  <Money n={product.price * qty} />
                </span>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <div>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>TOTAL</span>
              <div className="mono" style={{ fontSize: 24, fontWeight: 600, color: "var(--amber)" }}>
                <Money n={subtotal} />
              </div>
            </div>
            <button onClick={() => setShowCheckout(true)} className="btn btn-primary">
              Checkout — <Money n={subtotal} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
