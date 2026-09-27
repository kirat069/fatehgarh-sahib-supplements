import React, { useState } from "react";
import { ChevronLeft, Check, AlertCircle } from "lucide-react";
import { placeOrder } from "../lib/api";

function Money({ n }) {
  return <>₹{n.toLocaleString("en-IN")}</>;
}

export default function Checkout({ products, cartLines, subtotal, onBack, onDone }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setSubmitting(true);
    setError(null);

    const items = cartLines.map(({ product, qty }) => ({
      product_id: product.id,
      name: product.name,
      qty,
      unit_price: product.price,
    }));

    try {
      const { data, error } = await placeOrder({
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        items,
        total: subtotal,
      });

      if (error) throw new Error("Failed to place order");

      setSuccess({ orderId: data?.id || "unknown", total: subtotal });
      onDone();
    } catch (err) {
      setError(
        "Couldn't place your order right now. Please call or WhatsApp us directly to order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        id="products"
        className="grow-in"
        style={{ maxWidth: 560, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: "rgba(76,175,125,0.15)",
            border: "2px solid var(--success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <Check size={28} color="var(--success)" />
        </div>
        <h2 style={{ fontSize: 28, marginBottom: 12, color: "var(--ink)" }}>Order Placed</h2>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
          Your order has been submitted. Save your Order ID to track your delivery.
        </p>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: 20,
            marginBottom: 24,
            textAlign: "left",
          }}
        >
          <div
            className="mono"
            style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", marginBottom: 6 }}
          >
            Your Order ID
          </div>
          <div
            className="mono"
            style={{
              fontSize: 16,
              color: "var(--amber)",
              fontWeight: 600,
              wordBreak: "break-all",
              cursor: "pointer",
            }}
            onClick={() => navigator.clipboard?.writeText(success.orderId)}
            title="Click to copy"
          >
            {success.orderId}
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--ink-soft)", fontSize: 13 }}>Total</span>
            <span className="mono" style={{ fontWeight: 600, fontSize: 18, color: "var(--amber)" }}>
              <Money n={success.total} />
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary"
          >
            Track This Order
          </button>
          <button onClick={onBack} className="btn btn-secondary">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="products" style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px 120px" }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "var(--ink-soft)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          marginBottom: 24,
        }}
      >
        <ChevronLeft size={16} /> Back to shop
      </button>

      <h2 style={{ fontSize: 28, marginBottom: 24, color: "var(--ink)" }}>Checkout</h2>

      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: 20, marginBottom: 24 }}>
        {cartLines.map(({ product, qty }) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid var(--line)",
              fontSize: 14,
            }}
          >
            <span>
              {qty} × {product.name}
            </span>
            <span className="mono" style={{ color: "var(--amber)" }}>
              <Money n={product.price * qty} />
            </span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, marginTop: 4 }}>
          <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>Total</span>
          <span className="mono" style={{ fontWeight: 600, fontSize: 20, color: "var(--amber)" }}>
            <Money n={subtotal} />
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label className="label">Full Name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="label">Phone Number</label>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label className="label">Delivery Address</label>
          <textarea
            className="input"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Full delivery address"
            rows={3}
            style={{ resize: "vertical" }}
          />
        </div>

        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--signal-red)",
              fontSize: 13,
              padding: "12px 14px",
              background: "rgba(193,67,46,0.1)",
              border: "1px solid var(--signal-red)",
            }}
          >
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !form.name || !form.phone || !form.address}
          className="btn btn-primary"
          style={{ marginTop: 8, justifyContent: "center" }}
        >
          {submitting ? "Placing order..." : `Place Order — ₹${subtotal.toLocaleString("en-IN")}`}
        </button>
      </form>
    </section>
  );
}
