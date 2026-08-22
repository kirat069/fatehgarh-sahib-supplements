import React, { useState, useMemo } from "react";
import {
  ShoppingCart, X, Check, ShieldCheck, FlaskConical, Minus, Plus,
  Truck, CreditCard, ChevronLeft, BadgeCheck
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');`;

const TOKENS = {
  bg: "#F6F7F6",
  surface: "#FFFFFF",
  ink: "#14181C",
  inkSoft: "#5B6570",
  line: "#E1E4E2",
  primary: "#0B3D91",
  primaryDeep: "#082C6A",
  verify: "#2E9E7C",
  verifyBg: "#EAF6F1",
};

const SITE_TITLE = "Fatehgarh Sahib Supplement Dealing";
const CONTACT_NUMBER = "7508117344";

const PRODUCTS = [
  {
    id: "cre-01",
    name: "Creatine",
    tag: "Strength",
    flavor: "Unflavored",
    price: 550,
    servings: 60,
    serving_size: "1 scoop (5g)",
    facts: [
      { label: "Creatine", value: "5g" },
      { label: "Carbs", value: "0g" },
      { label: "Sodium", value: "0mg" },
      { label: "Calories", value: "0" },
    ],
    batch: "CR-0942-B",
    purity: "99.9%",
  },
  {
    id: "cre-02",
    name: "WellCore Creatine",
    tag: "Strength",
    flavor: "All flavours",
    price: 550,
    servings: 60,
    serving_size: "1 scoop (5g)",
    facts: [
      { label: "Creatine", value: "5g" },
      { label: "Carbs", value: "0g" },
      { label: "Sodium", value: "0mg" },
      { label: "Calories", value: "5" },
    ],
    batch: "WC-1120-A",
    purity: "99.5%",
  },
  {
    id: "pre-01",
    name: "Big Daddy Pre-Workout",
    tag: "Performance",
    flavor: "Assorted",
    price: 750,
    servings: 25,
    serving_size: "1 scoop (9g)",
    facts: [
      { label: "Caffeine", value: "200mg" },
      { label: "Citrulline", value: "6g" },
      { label: "Beta-Alanine", value: "3.2g" },
      { label: "Calories", value: "10" },
    ],
    batch: "BD-1187-A",
    purity: "N/A",
  },
  {
    id: "iso-01",
    name: "Atom Power Whey Protein",
    tag: "Protein",
    flavor: "Assorted",
    price: 1400,
    servings: 30,
    serving_size: "1 scoop (32g)",
    facts: [
      { label: "Protein", value: "24g" },
      { label: "Carbs", value: "3g" },
      { label: "Fat", value: "2g" },
      { label: "Calories", value: "130" },
    ],
    batch: "AP-2648-C",
    purity: "N/A",
  },
  {
    id: "iso-02",
    name: "MuscleBlaze Protein 2kg",
    tag: "Protein",
    flavor: "Assorted",
    price: 5500,
    servings: 66,
    serving_size: "1 scoop (30g)",
    facts: [
      { label: "Protein", value: "25g" },
      { label: "Carbs", value: "2g" },
      { label: "Fat", value: "1.5g" },
      { label: "Calories", value: "125" },
    ],
    batch: "MB-3305-A",
    purity: "N/A",
  },
];

function useCart() {
  const [items, setItems] = useState({}); // id -> qty
  const add = (id) => setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  const dec = (id) =>
    setItems((s) => {
      const next = { ...s, [id]: (s[id] || 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  const remove = (id) =>
    setItems((s) => {
      const next = { ...s };
      delete next[id];
      return next;
    });
  const clear = () => setItems({});
  return { items, add, dec, remove, clear };
}

function Money({ n }) {
  return <>₹{n.toLocaleString("en-IN")}</>;
}

function FactsPanel({ product, compact }) {
  return (
    <div
      style={{
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 10,
        overflow: "hidden",
        background: TOKENS.surface,
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          borderBottom: `2px solid ${TOKENS.ink}`,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: compact ? 13 : 15,
          letterSpacing: 0.2,
        }}
      >
        Supplement Facts
      </div>
      <div
        style={{
          padding: "8px 14px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: TOKENS.inkSoft,
          borderBottom: `1px solid ${TOKENS.line}`,
        }}
      >
        Serving size: {product.serving_size} · {product.servings} servings
      </div>
      <div style={{ padding: "6px 14px 12px" }}>
        {product.facts.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              padding: "5px 0",
              borderBottom:
                i < product.facts.length - 1 ? `1px dashed ${TOKENS.line}` : "none",
              color: TOKENS.ink,
            }}
          >
            <span>{f.label}</span>
            <span style={{ fontWeight: 500 }}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerifiedStamp({ batch, purity }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: TOKENS.verifyBg,
        color: TOKENS.verify,
        padding: "5px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 500,
        width: "fit-content",
      }}
    >
      <BadgeCheck size={13} strokeWidth={2.4} />
      Batch {batch}
      {purity !== "N/A" && ` · ${purity} purity`}
    </div>
  );
}

function Header({ cartCount, onCartClick, onLogoClick, siteTitle }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(246,247,246,0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${TOKENS.line}`,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={onLogoClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: TOKENS.ink,
            lineHeight: 1.2,
          }}
        >
          <FlaskConical size={22} color={TOKENS.primary} strokeWidth={2.2} />
          {siteTitle}
        </div>
        <button
          onClick={onCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: TOKENS.ink,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "9px 14px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 13.5,
            cursor: "pointer",
          }}
        >
          <ShoppingCart size={16} />
          Cart {cartCount > 0 && `(${cartCount})`}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 40px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: TOKENS.verify,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            <ShieldCheck size={14} />
            THIRD-PARTY TESTED · EVERY BATCH
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 44,
              lineHeight: 1.08,
              color: TOKENS.ink,
              margin: "0 0 18px",
              letterSpacing: -0.5,
            }}
          >
            Know exactly<br />what's in the scoop.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              color: TOKENS.inkSoft,
              maxWidth: 420,
              margin: "0 0 28px",
            }}
          >
            Genuine supplements, straight-up pricing, no rounding up. Every
            product listed with its actual batch number — read the panel
            before you buy. Based in Fatehgarh Sahib.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <FactsPanel product={PRODUCTS[0]} />
          <VerifiedStamp batch={PRODUCTS[0].batch} purity={PRODUCTS[0].purity} />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, qty, onAdd, onDec }) {
  return (
    <div
      style={{
        background: TOKENS.surface,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 14,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: TOKENS.primary,
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          {product.tag.toUpperCase()}
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 19,
            color: TOKENS.ink,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: TOKENS.inkSoft,
          }}
        >
          {product.flavor}
        </div>
      </div>

      <FactsPanel product={product} compact />
      <VerifiedStamp batch={product.batch} purity={product.purity} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: TOKENS.ink,
          }}
        >
          <Money n={product.price} />
        </div>
        {qty > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: TOKENS.bg,
              borderRadius: 8,
              padding: "6px 10px",
            }}
          >
            <button
              onClick={() => onDec(product.id)}
              aria-label="Decrease quantity"
              style={iconBtnStyle}
            >
              <Minus size={14} />
            </button>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 14,
                minWidth: 14,
                textAlign: "center",
              }}
            >
              {qty}
            </span>
            <button
              onClick={() => onAdd(product.id)}
              aria-label="Increase quantity"
              style={iconBtnStyle}
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(product.id)}
            style={{
              background: TOKENS.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "9px 16px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13.5,
              cursor: "pointer",
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: TOKENS.ink,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function CartDrawer({ open, onClose, cart, onCheckout }) {
  const lines = useMemo(
    () =>
      Object.entries(cart.items)
        .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
        .filter((l) => l.product),
    [cart.items]
  );
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,24,28,0.35)",
            zIndex: 30,
          }}
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: 380,
          maxWidth: "92vw",
          background: TOKENS.surface,
          zIndex: 31,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 20px",
            borderBottom: `1px solid ${TOKENS.line}`,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            Your cart
          </div>
          <button onClick={onClose} style={iconBtnStyle} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
          {lines.length === 0 ? (
            <div
              style={{
                color: TOKENS.inkSoft,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                marginTop: 24,
              }}
            >
              Nothing here yet. Add a product to see it listed.
            </div>
          ) : (
            lines.map(({ product, qty }) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: `1px solid ${TOKENS.line}`,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: TOKENS.ink,
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: TOKENS.inkSoft,
                    }}
                  >
                    {qty} × <Money n={product.price} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => cart.dec(product.id)} style={iconBtnStyle}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>
                    {qty}
                  </span>
                  <button onClick={() => cart.add(product.id)} style={iconBtnStyle}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div style={{ padding: 20, borderTop: `1px solid ${TOKENS.line}` }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                marginBottom: 14,
              }}
            >
              <span style={{ color: TOKENS.inkSoft }}>Subtotal</span>
              <span style={{ fontWeight: 700 }}>
                <Money n={subtotal} />
              </span>
            </div>
            <button
              onClick={onCheckout}
              style={{
                width: "100%",
                background: TOKENS.ink,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "13px 0",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14.5,
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Stepper({ step }) {
  const steps = ["Shipping", "Payment", "Review"];
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              background: i <= step ? TOKENS.primary : TOKENS.line,
              color: i <= step ? "#fff" : TOKENS.inkSoft,
            }}
          >
            {i < step ? <Check size={12} /> : i + 1}
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: i <= step ? TOKENS.ink : TOKENS.inkSoft,
              fontWeight: i === step ? 600 : 400,
            }}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <div style={{ width: 24, height: 1, background: TOKENS.line }} />
          )}
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${TOKENS.line}`,
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: TOKENS.ink,
  boxSizing: "border-box",
  background: "#fff",
};

const labelStyle = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: 12.5,
  color: TOKENS.inkSoft,
  marginBottom: 5,
  fontWeight: 500,
};

function Checkout({ cart, onBack, onDone }) {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", zip: "" });
  const [payment, setPayment] = useState({ card: "", exp: "", cvc: "" });

  const lines = useMemo(
    () =>
      Object.entries(cart.items)
        .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
        .filter((l) => l.product),
    [cart.items]
  );
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shippingCost = subtotal > 0 && subtotal < 2000 ? 100 : 0;
  const total = subtotal + shippingCost;

  const shippingValid = shipping.name && shipping.address && shipping.city && shipping.zip;
  const paymentValid = payment.card.length >= 12 && payment.exp && payment.cvc.length >= 3;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px" }}>
      <button
        onClick={onBack}
        style={{
          ...iconBtnStyle,
          gap: 6,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: TOKENS.inkSoft,
          marginBottom: 20,
        }}
      >
        <ChevronLeft size={16} /> Back to shop
      </button>

      <Stepper step={step} />

      {step === 0 && (
        <div>
          <h2 style={sectionTitle}>Shipping address</h2>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                style={inputStyle}
                value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                placeholder="Jordan Rivera"
              />
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <input
                style={inputStyle}
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                placeholder="123 Main St"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>City</label>
                <input
                  style={inputStyle}
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  placeholder="Austin"
                />
              </div>
              <div>
                <label style={labelStyle}>ZIP</label>
                <input
                  style={inputStyle}
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  placeholder="78701"
                />
              </div>
            </div>
          </div>
          <button
            disabled={!shippingValid}
            onClick={() => setStep(1)}
            style={primaryBtn(shippingValid)}
          >
            Continue to payment
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 style={sectionTitle}>Payment</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: TOKENS.inkSoft,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11.5,
              marginBottom: 16,
              background: TOKENS.bg,
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            <CreditCard size={13} />
            Demo form — no card data is processed or stored.
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={labelStyle}>Card number</label>
              <input
                style={inputStyle}
                value={payment.card}
                onChange={(e) => setPayment({ ...payment, card: e.target.value })}
                placeholder="4242 4242 4242 4242"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>Expiry</label>
                <input
                  style={inputStyle}
                  value={payment.exp}
                  onChange={(e) => setPayment({ ...payment, exp: e.target.value })}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label style={labelStyle}>CVC</label>
                <input
                  style={inputStyle}
                  value={payment.cvc}
                  onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                  placeholder="123"
                />
              </div>
            </div>
          </div>
          <button
            disabled={!paymentValid}
            onClick={() => setStep(2)}
            style={primaryBtn(paymentValid)}
          >
            Review order
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={sectionTitle}>Review &amp; place order</h2>
          <div
            style={{
              border: `1px solid ${TOKENS.line}`,
              borderRadius: 10,
              padding: 16,
              marginBottom: 16,
            }}
          >
            {lines.map(({ product, qty }) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  padding: "6px 0",
                }}
              >
                <span>
                  {qty} × {product.name}
                </span>
                <span><Money n={product.price * qty} /></span>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${TOKENS.line}`, marginTop: 8, paddingTop: 8 }}>
              <div style={rowStyle}><span>Subtotal</span><span><Money n={subtotal} /></span></div>
              <div style={rowStyle}>
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : <Money n={shippingCost} />}</span>
              </div>
              <div style={{ ...rowStyle, fontWeight: 700, fontSize: 15 }}>
                <span>Total</span><span><Money n={total} /></span>
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: TOKENS.inkSoft,
              marginBottom: 4,
            }}
          >
            Shipping to {shipping.name}, {shipping.address}, {shipping.city} {shipping.zip}
          </div>
          <button onClick={onDone} style={primaryBtn(true)}>
            Place order — <Money n={total} />
          </button>
        </div>
      )}
    </div>
  );
}

const sectionTitle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: 21,
  marginBottom: 18,
  color: TOKENS.ink,
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "'Inter', sans-serif",
  fontSize: 13.5,
  padding: "4px 0",
  color: TOKENS.inkSoft,
};

function primaryBtn(enabled) {
  return {
    marginTop: 22,
    width: "100%",
    background: enabled ? TOKENS.primary : TOKENS.line,
    color: enabled ? "#fff" : TOKENS.inkSoft,
    border: "none",
    borderRadius: 8,
    padding: "13px 0",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 14.5,
    cursor: enabled ? "pointer" : "not-allowed",
  };
}

function Confirmation({ onRestart }) {
  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "100px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: TOKENS.verifyBg,
          color: TOKENS.verify,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <Check size={26} strokeWidth={2.5} />
      </div>
      <h2 style={{ ...sectionTitle, marginBottom: 10 }}>Order placed</h2>
      <p style={{ fontFamily: "'Inter', sans-serif", color: TOKENS.inkSoft, fontSize: 14.5 }}>
        This is a demo confirmation — no real order was submitted. Batch
        verification codes for your items will normally arrive by email.
      </p>
      <button onClick={onRestart} style={{ ...primaryBtn(true), marginTop: 26 }}>
        Back to shop
      </button>
    </div>
  );
}

export default function App() {
  const cart = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState("shop"); // shop | checkout | done

  const cartCount = Object.values(cart.items).reduce((a, b) => a + b, 0);

  return (
    <div
      style={{
        minHeight: "100%",
        background: TOKENS.bg,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>

      {view !== "checkout" && (
        <Header
          cartCount={cartCount}
          onCartClick={() => setDrawerOpen(true)}
          onLogoClick={() => setView("shop")}
          siteTitle={SITE_TITLE}
        />
      )}

      {view === "shop" && (
        <>
          <Hero />
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 80px" }}>
            <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Catalog</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 18,
              }}
            >
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  qty={cart.items[p.id] || 0}
                  onAdd={cart.add}
                  onDec={cart.dec}
                />
              ))}
            </div>
          </div>
          <footer
            style={{
              borderTop: `1px solid ${TOKENS.line}`,
              padding: "24px 24px 40px",
            }}
          >
            <div
              style={{
                maxWidth: 1080,
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5,
                color: TOKENS.inkSoft,
              }}
            >
              <span>{SITE_TITLE}</span>
              <span>
                Contact:{" "}
                <a
                  href={`tel:${CONTACT_NUMBER}`}
                  style={{ color: TOKENS.primary, textDecoration: "none" }}
                >
                  {CONTACT_NUMBER}
                </a>
              </span>
            </div>
          </footer>
        </>
      )}

      {view === "checkout" && (
        <Checkout
          cart={cart}
          onBack={() => setView("shop")}
          onDone={() => {
            cart.clear();
            setView("done");
          }}
        />
      )}

      {view === "done" && <Confirmation onRestart={() => setView("shop")} />}

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        onCheckout={() => {
          setDrawerOpen(false);
          setView("checkout");
        }}
      />
    </div>
  );
}
