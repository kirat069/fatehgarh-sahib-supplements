import React, { useState, useEffect } from "react";
import { Lock, LogOut, Package, ShoppingCart, DollarSign, TrendingUp, Plus, Trash2, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import {
  fetchAllOrders, updateOrderStatus, fetchAllMessages,
  addProduct, deleteProduct, fetchProducts,
} from "../lib/api";

const STATUSES = ["pending", "confirmed", "delivered", "cancelled"];
const STATUS_COLORS = {
  pending: "var(--amber)",
  confirmed: "#5B9BD5",
  delivered: "var(--success)",
  cancelled: "var(--signal-red)",
};

function Money({ n }) {
  return <>₹{n.toLocaleString("en-IN")}</>;
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Icon size={20} color={color} />
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 28, color: "var(--ink)" }}>
        {value}
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", lot_label: "", tag: "", stock: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    setDataLoading(true);
    Promise.all([fetchAllOrders(), fetchProducts(), fetchAllMessages()]).then(([o, p, m]) => {
      if (o.data) setOrders(o.data);
      if (p.data) setProducts(p.data);
      if (m.data) setMessages(m.data);
      setDataLoading(false);
    });
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    else setSession(data.session);
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleStatusChange = async (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await updateOrderStatus(id, status);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const product = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseInt(newProduct.price) || 0,
      lot_label: newProduct.lot_label,
      tag: newProduct.tag,
      stock: parseInt(newProduct.stock) || 0,
    };
    const { data } = await addProduct(product);
    if (data) {
      setProducts((prev) => [...prev, data]);
      setNewProduct({ name: "", description: "", price: "", lot_label: "", tag: "", stock: "" });
    }
  };

  const handleDeleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await deleteProduct(id);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <span className="mono" style={{ color: "var(--ink-soft)", fontSize: 13 }}>Loading...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
        <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: "var(--surface)",
                border: "1px solid var(--line)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Lock size={22} color="var(--amber)" />
            </div>
            <h1 style={{ fontSize: 24, color: "var(--ink)", marginBottom: 6 }}>Admin Login</h1>
            <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Fatehgarh Sahib Supplement Dealing</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@email.com" />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            {authError && (
              <div style={{ color: "var(--signal-red)", fontSize: 13, padding: "10px 14px", background: "rgba(193,67,46,0.1)", border: "1px solid var(--signal-red)" }}>
                {authError}
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", marginTop: 4 }}>
              Login
            </button>
            <a href="/" className="mono" style={{ textAlign: "center", color: "var(--ink-soft)", textDecoration: "none", fontSize: 12 }}>
              ← Back to store
            </a>
          </div>
        </form>
      </div>
    );
  }

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);

  const thStyle = {
    textAlign: "left",
    padding: "10px 12px",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "var(--ink-soft)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "10px 12px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: "var(--ink)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div
        style={{
          borderBottom: "1px solid var(--line)",
          background: "rgba(20,24,28,0.9)",
          backdropFilter: "blur(8px)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--amber)",
              textTransform: "uppercase",
            }}
          >
            Admin Dashboard
          </span>
          <a href="/" style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
            <ArrowLeft size={12} /> Store
          </a>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: 12 }}>
          <LogOut size={14} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <div
          className="admin-stats"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}
        >
          <StatCard icon={ShoppingCart} label="Total Orders" value={orders.length} color="var(--amber)" />
          <StatCard icon={TrendingUp} label="Pending" value={pendingCount} color="#5B9BD5" />
          <StatCard icon={DollarSign} label="Revenue" value={<Money n={revenue} />} color="var(--success)" />
          <StatCard icon={Package} label="Products" value={products.length} color="var(--amber)" />
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid var(--line)" }}>
          {["orders", "products", "messages"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                borderBottom: tab === t ? "2px solid var(--amber)" : "2px solid transparent",
                color: tab === t ? "var(--amber)" : "var(--ink-soft)",
                cursor: "pointer",
                padding: "10px 20px",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="mono" style={{ color: "var(--ink-soft)", textAlign: "center", padding: 60, fontSize: 13 }}>
            Loading data...
          </div>
        ) : (
          <>
            {tab === "orders" && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--line)" }}>
                      <th style={thStyle}>Order ID</th>
                      <th style={thStyle}>Customer</th>
                      <th style={thStyle}>Phone</th>
                      <th style={thStyle}>Items</th>
                      <th style={thStyle}>Total</th>
                      <th style={thStyle}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: "1px solid var(--line)" }}>
                        <td className="mono" style={tdStyle}>{o.id.slice(0, 8)}...</td>
                        <td style={tdStyle}>{o.customer_name}</td>
                        <td className="mono" style={tdStyle}>{o.phone}</td>
                        <td style={tdStyle}>{Array.isArray(o.items) ? o.items.length : 0} items</td>
                        <td className="mono" style={{ ...tdStyle, color: "var(--amber)" }}>
                          <Money n={o.total} />
                        </td>
                        <td style={tdStyle}>
                          <select
                            value={o.status}
                            onChange={(e) => handleStatusChange(o.id, e.target.value)}
                            style={{
                              background: "var(--bg)",
                              border: `1px solid ${STATUS_COLORS[o.status] || "var(--line)"}`,
                              color: STATUS_COLORS[o.status] || "var(--ink)",
                              padding: "4px 8px",
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: 11,
                              cursor: "pointer",
                            }}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ ...tdStyle, textAlign: "center", color: "var(--ink-soft)" }}>
                          No orders yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "products" && (
              <div>
                <form
                  onSubmit={handleAddProduct}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 12,
                    marginBottom: 24,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    padding: 20,
                  }}
                >
                  <div>
                    <label className="label">Name</label>
                    <input className="input" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product name" />
                  </div>
                  <div>
                    <label className="label">Price (₹)</label>
                    <input className="input" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="999" />
                  </div>
                  <div>
                    <label className="label">Lot Label</label>
                    <input className="input" value={newProduct.lot_label} onChange={(e) => setNewProduct({ ...newProduct, lot_label: e.target.value })} placeholder="LOT-XXX" />
                  </div>
                  <div>
                    <label className="label">Tag</label>
                    <input className="input" value={newProduct.tag} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} placeholder="Best Seller" />
                  </div>
                  <div>
                    <label className="label">Stock</label>
                    <input className="input" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="50" />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label className="label">Description</label>
                    <input className="input" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Short product description" />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ justifySelf: "start", padding: "10px 20px", fontSize: 12 }}>
                    <Plus size={14} /> Add Product
                  </button>
                </form>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--line)" }}>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Price</th>
                      <th style={thStyle}>Lot</th>
                      <th style={thStyle}>Stock</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
                        <td style={tdStyle}>{p.name}</td>
                        <td className="mono" style={{ ...tdStyle, color: "var(--amber)" }}>
                          <Money n={p.price} />
                        </td>
                        <td className="mono" style={tdStyle}>{p.lot_label}</td>
                        <td className="mono" style={tdStyle}>{p.stock}</td>
                        <td style={tdStyle}>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            style={{
                              background: "none",
                              border: "1px solid var(--signal-red)",
                              color: "var(--signal-red)",
                              cursor: "pointer",
                              padding: "4px 8px",
                              fontSize: 11,
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ ...tdStyle, textAlign: "center", color: "var(--ink-soft)" }}>
                          No products.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "messages" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((m) => (
                  <div key={m.id} style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{m.name}</span>
                      <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                        {new Date(m.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="mono" style={{ fontSize: 12, color: "var(--amber)", marginBottom: 8 }}>{m.phone}</div>
                    <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{m.message}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="mono" style={{ color: "var(--ink-soft)", textAlign: "center", padding: 40, fontSize: 13 }}>
                    No messages yet.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
