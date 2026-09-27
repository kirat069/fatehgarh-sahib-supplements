import React, { useState } from "react";
import { Phone, MessageCircle, MapPin, Send, Check } from "lucide-react";
import { STORE_INFO } from "../lib/supabase";
import { sendMessage } from "../lib/api";
import { useToast } from "./ToastContext";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCall = async () => {
    try {
      await navigator.clipboard.writeText(STORE_INFO.phone);
      showToast(`Number copied: ${STORE_INFO.phone}`);
    } catch {
      showToast(`Call: ${STORE_INFO.phone}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSending(true);
    try {
      const { error } = await sendMessage(form);
      if (error) throw new Error("Failed");
      setSent(true);
      setForm({ name: "", phone: "", message: "" });
    } catch {
      showToast("Couldn't send message. Please call or WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 120px" }}>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 8, color: "var(--ink)" }}>
        Get In <span style={{ color: "var(--amber)" }}>Touch</span>
      </h2>
      <p style={{ color: "var(--ink-soft)", marginBottom: 32, fontSize: 14 }}>
        Questions about a product? Want to place an order? Reach out.
      </p>

      <div
        className="contact-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              padding: 20,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Phone size={18} color="var(--amber)" />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase" }}>
                Phone
              </div>
              <a
                href={`tel:${STORE_INFO.phone}`}
                onClick={handleCall}
                style={{ color: "var(--ink)", textDecoration: "none", fontSize: 15, fontWeight: 600 }}
              >
                {STORE_INFO.phone}
              </a>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--amber)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} color="var(--amber)" />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase" }}>
                  WhatsApp
                </div>
                <div style={{ color: "var(--ink)", fontSize: 15, fontWeight: 600 }}>Chat on WhatsApp</div>
              </div>
            </div>
          </a>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              padding: 20,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapPin size={18} color="var(--amber)" />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase" }}>
                Location
              </div>
              <div style={{ color: "var(--ink)", fontSize: 15, fontWeight: 600 }}>{STORE_INFO.location}</div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(76,175,125,0.15)",
                  border: "1px solid var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Check size={24} color="var(--success)" />
              </div>
              <h3 style={{ fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>Message Sent</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 13 }}>We'll get back to you shortly.</p>
              <button
                onClick={() => setSent(false)}
                className="btn btn-secondary"
                style={{ marginTop: 20, padding: "8px 20px", fontSize: 12 }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="label">Your Name</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter your phone"
                />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  className="input"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What do you need?"
                  rows={4}
                  style={{ resize: "vertical" }}
                />
              </div>
              <button
                type="submit"
                disabled={sending || !form.name || !form.phone || !form.message}
                className="btn btn-primary"
                style={{ marginTop: 4 }}
              >
                <Send size={16} /> {sending ? "Sending..." : "Send Message"}
              </button>
            </>
          )}
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
