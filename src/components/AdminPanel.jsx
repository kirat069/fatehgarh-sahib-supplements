import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { X, Package, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "#e3a52b", icon: Clock },
  processing: { label: "Processing", color: "#5d84a0", icon: Package },
  shipped: { label: "Shipped", color: "#c97a3e", icon: Truck },
  delivered: { label: "Delivered", color: "#6b8f5b", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "#e85d5d", icon: AlertCircle },
};

const STATUS_ORDER = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminPanel({ onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const stats = STATUS_ORDER.map((s) => ({
    status: s,
    count: orders.filter((o) => o.status === s).length,
  }));

  return (
    <div className="fixed inset-0 z-[200] bg-bg overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-bg/95 backdrop-blur-lg border-b border-ink/10 px-6 py-4 flex items-center justify-between z-10">
        <div>
          <h2 className="font-serif text-xl text-ink">Order Management</h2>
          <p className="font-mono text-[0.7rem] text-muted mt-0.5">
            {orders.length} total orders
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-ink transition-colors"
        >
          <X size={22} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {stats.map((s) => {
            const config = STATUS_CONFIG[s.status];
            const Icon = config.icon;
            return (
              <button
                key={s.status}
                onClick={() => setFilter(s.status)}
                className={`border px-4 py-3 text-left transition-all ${
                  filter === s.status
                    ? "border-ink/30 bg-ink/5"
                    : "border-ink/10 hover:border-ink/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} style={{ color: config.color }} />
                  <span className="font-mono text-[0.65rem] text-muted tracking-wider uppercase">
                    {config.label}
                  </span>
                </div>
                <span className="font-serif text-2xl text-ink">{s.count}</span>
              </button>
            );
          })}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`font-mono text-[0.7rem] px-3 py-1.5 border transition-all ${
              filter === "all"
                ? "border-ink/30 text-ink bg-ink/5"
                : "border-ink/10 text-muted hover:text-ink"
            }`}
          >
            ALL
          </button>
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-mono text-[0.7rem] px-3 py-1.5 border transition-all uppercase ${
                filter === s
                  ? "border-ink/30 text-ink bg-ink/5"
                  : "border-ink/10 text-muted hover:text-ink"
              }`}
            >
              {STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {loading ? (
          <p className="text-muted font-mono text-sm py-8">Loading orders…</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-muted font-mono text-sm py-8">
            No orders {filter !== "all" ? `with status "${filter}"` : ""} yet.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const Icon = config.icon;
              const isExpanded = expandedId === order.id;
              const orderItems =
                typeof order.items === "string"
                  ? JSON.parse(order.items)
                  : order.items || [];

              return (
                <div
                  key={order.id}
                  className="border border-ink/10 bg-ink/[0.02]"
                >
                  {/* Order header */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : order.id)
                    }
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-ink/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: config.color + "20" }}
                      >
                        <Icon size={16} style={{ color: config.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-ink font-medium truncate">
                          {order.customer_name}
                        </p>
                        <p className="font-mono text-[0.7rem] text-muted">
                          {new Date(order.created_at).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" — "}
                          ₹{order.total}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="font-mono text-[0.65rem] px-2.5 py-1 border uppercase tracking-wider"
                        style={{
                          color: config.color,
                          borderColor: config.color + "40",
                        }}
                      >
                        {config.label}
                      </span>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-ink/8 pt-4">
                      {/* Customer info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div>
                          <p className="font-mono text-[0.65rem] text-muted tracking-wider uppercase mb-2">
                            Customer
                          </p>
                          <p className="text-sm text-ink">{order.customer_name}</p>
                          <p className="text-sm text-muted">{order.email}</p>
                          <p className="text-sm text-muted">{order.phone}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[0.65rem] text-muted tracking-wider uppercase mb-2">
                            Shipping Address
                          </p>
                          <p className="text-sm text-ink">{order.address}</p>
                          <p className="text-sm text-muted">
                            {order.city}, {order.state} {order.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="mb-5">
                        <p className="font-mono text-[0.65rem] text-muted tracking-wider uppercase mb-2">
                          Items
                        </p>
                        {orderItems.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm py-1.5 border-b border-ink/5 last:border-0"
                          >
                            <span className="text-ink/80">
                              {item.product_name} × {item.quantity}
                            </span>
                            <span className="font-mono text-muted">
                              ₹{item.unit_price * item.quantity}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm pt-2.5 mt-1">
                          <span className="text-ink font-medium">Total</span>
                          <span className="font-mono text-copper font-medium">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>

                      {/* Status update */}
                      <div>
                        <p className="font-mono text-[0.65rem] text-muted tracking-wider uppercase mb-2">
                          Update Status
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {STATUS_ORDER.map((s) => {
                            const sc = STATUS_CONFIG[s];
                            const isActive = order.status === s;
                            return (
                              <button
                                key={s}
                                onClick={() => updateStatus(order.id, s)}
                                className={`font-mono text-[0.65rem] px-3 py-1.5 border uppercase tracking-wider transition-all ${
                                  isActive
                                    ? "text-bg"
                                    : "hover:opacity-80"
                                }`}
                                style={{
                                  color: isActive ? "#14110f" : sc.color,
                                  borderColor: sc.color + (isActive ? "" : "40"),
                                  background: isActive ? sc.color : "transparent",
                                }}
                              >
                                {sc.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
