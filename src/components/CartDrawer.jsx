import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../lib/cart";
import { X, Minus, Plus, Trash2, Check } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    total,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setOrderError("");

    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          ...form,
          total: total,
          status: "pending",
          items: items.map((i) => ({
            product_id: i.id,
            product_name: i.name,
            quantity: i.quantity,
            unit_price: i.price,
          })),
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((i) => ({
        order_id: order.id,
        product_id: i.id,
        product_name: i.name,
        quantity: i.quantity,
        unit_price: i.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      setOrderError("Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setCartOpen(false);
    setTimeout(() => {
      setCheckoutMode(false);
      setOrderSuccess(false);
      setOrderError("");
      setForm({
        customer_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    }, 300);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={handleClose}
      />
      <div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-bg border-l border-ink/10 z-[101] flex flex-col"
        style={{
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <h3 className="font-serif text-lg text-ink">
            {orderSuccess ? "Order Placed" : checkoutMode ? "Checkout" : "Your Cart"}
          </h3>
          <button
            onClick={handleClose}
            className="text-muted hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success state */}
        {orderSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-forest/20 flex items-center justify-center mb-6">
              <Check size={32} className="text-forest" />
            </div>
            <p className="font-serif text-xl text-ink mb-3">
              Thank you for your order!
            </p>
            <p className="text-muted text-sm leading-relaxed mb-8">
              We've received your order and will process it shortly. You'll
              receive an email confirmation with tracking details.
            </p>
            <button className="btn btn-accent" onClick={handleClose} style={{ "--accent": "#6b8f5b" }}>
              Continue Shopping
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty cart */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p className="text-muted text-sm mb-6">Your cart is empty.</p>
            <button className="btn" onClick={handleClose}>
              Browse Products
            </button>
          </div>
        ) : checkoutMode ? (
          /* Checkout form */
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <Field
                label="Full Name"
                name="customer_name"
                value={form.customer_name}
                onChange={handleFormChange}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                required
              />
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                required
              />
              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleFormChange}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleFormChange}
                  required
                />
                <Field
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <Field
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleFormChange}
                required
              />

              {/* Order summary */}
              <div className="pt-4 border-t border-ink/10">
                <p className="font-mono text-[0.7rem] text-muted tracking-wider uppercase mb-3">
                  Order Summary
                </p>
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between text-sm py-1"
                  >
                    <span className="text-ink/80">
                      {i.name} × {i.quantity}
                    </span>
                    <span className="font-mono text-muted">
                      ₹{i.price * i.quantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-3 mt-2 border-t border-ink/10">
                  <span className="text-ink font-medium">Total</span>
                  <span className="font-mono text-copper font-medium">
                    ₹{total}
                  </span>
                </div>
              </div>

              {orderError && (
                <p className="text-red-400 text-sm pt-2">{orderError}</p>
              )}
            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 border-t border-ink/10 flex gap-3">
              <button
                type="button"
                className="btn flex-1"
                onClick={() => setCheckoutMode(false)}
                disabled={submitting}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-accent flex-1"
                style={{ "--accent": "#c97a3e" }}
                disabled={submitting}
              >
                {submitting ? "Placing…" : "Place Order"}
              </button>
            </div>
          </form>
        ) : (
          /* Cart items */
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 py-4 border-b border-ink/8"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink font-medium truncate">
                      {item.name}
                    </p>
                    <p className="font-mono text-xs text-muted mt-0.5">
                      ₹{item.price} each
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 border border-ink/15 flex items-center justify-center text-ink/70 hover:border-copper hover:text-copper transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm text-ink min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 border border-ink/15 flex items-center justify-center text-ink/70 hover:border-copper hover:text-copper transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-copper shrink-0">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-ink/10">
              <div className="flex justify-between mb-4">
                <span className="text-ink font-medium">Total</span>
                <span className="font-mono text-copper font-medium text-lg">
                  ₹{total}
                </span>
              </div>
              <button
                className="btn btn-accent w-full"
                style={{ "--accent": "#c97a3e" }}
                onClick={() => setCheckoutMode(true)}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block font-mono text-[0.65rem] tracking-wider uppercase text-muted mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border border-ink/15 px-3 py-2.5 text-sm text-ink focus:border-copper focus:outline-none transition-colors"
      />
    </div>
  );
}
