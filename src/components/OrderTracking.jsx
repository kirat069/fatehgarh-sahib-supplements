import React, { useState } from "react";
import { Search, Package, CheckCircle, Clock, XCircle, Truck } from "lucide-react";
import { lookupOrder } from "../lib/api";

const STATUS_CONFIG = {
  pending: { icon: Clock, color: "var(--amber)", label: "Pending" },
  confirmed: { icon: CheckCircle, color: "#5B9BD5", label: "Confirmed" },
  delivered: { icon: Truck, color: "var(--success)", label: "Delivered" },
  cancelled: { icon: XCircle, color: "var(--signal-red)", label: "Cancelled" },
};

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!orderId || !phone) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error } = await lookupOrder(orderId.trim(), phone.trim());
      if (error) throw new Error("Lookup failed");
      if (!data) {
        setError("No order found. Check your Order ID and phone number.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Couldn't reach the server. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = result ? STATUS_CONFIG[result.status] : null;

  return (
    <section id="tracking" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 8, color: "var(--ink)" }}>
        Track Your <span style={{ color: "var(--amber)" }}>Order</span>
      </h2>
      <p style={{ color: "var(--ink-soft)", marginBottom: 32, fontSize: 14 }}>
        Enter your Order ID and phone number to check your order status.
      </p>

      <div
        className="track-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
      >
        <form onSubmit={handleLookup} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="label">Order ID</label>
            <input
              className="input mono"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. a1b2c3d4-..."
            />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input
              className="input mono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !orderId || !phone}
            className="btn btn-primary"
            style={{ marginTop: 8 }}
          >
            <Search size={16} /> {loading ? "Looking up..." : "Track Order"}
          </button>
          {error && (
            <div
              style={{
                color: "var(--signal-red)",
                fontSize: 13,
                padding: "10px 14px",
                background: "rgba(193,67,46,0.1)",
                border: "1px solid var(--signal-red)",
              }}
            >
              {error}
            </div>
          )}
        </form>

        <div
          className="track-result"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: 24,
            minHeight: 200,
          }}
        >
          {result ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                {statusInfo && (
                  <>
                    <statusInfo.icon size={20} color={statusInfo.color} />
                    <span
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        textTransform: "uppercase",
                        color: statusInfo.color,
                      }}
                    >
                      {statusInfo.label}
                    </span>
                  </>
                )}
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 16 }}>
                ORDER ID: {result.id}
              </div>
              <div style={{ marginBottom: 16 }}>
                {result.items &&
                  Array.isArray(result.items) &&
                  result.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "6px 0",
                        borderBottom: "1px solid var(--line)",
                        fontSize: 13,
                      }}
                    >
                      <span>
                        {item.qty} × {item.name}
                      </span>
                      <span className="mono" style={{ color: "var(--amber)" }}>
                        ₹{(item.qty * item.unit_price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--line)",
                  paddingTop: 12,
                }}
              >
                <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>Total</span>
                <span className="mono" style={{ fontWeight: 600, fontSize: 18, color: "var(--amber)" }}>
                  ₹{result.total.toLocaleString("en-IN")}
                </span>
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--ink-soft)" }}>
                Deliver to: {result.address}
              </div>
            </>
          ) : !error ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "var(--ink-soft)",
                textAlign: "center",
              }}
            >
              <Package size={36} style={{ opacity: 0.3, marginBottom: 12 }} />
              <span style={{ fontSize: 13 }}>Your order details will appear here.</span>
            </div>
          ) : null}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .track-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
