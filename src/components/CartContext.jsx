import React, { createContext, useContext, useReducer, useCallback } from "react";

const CartContext = createContext(null);

const initialState = { items: {} };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const qty = (state.items[action.id] || 0) + 1;
      return { items: { ...state.items, [action.id]: qty } };
    }
    case "DEC": {
      const qty = (state.items[action.id] || 0) - 1;
      const next = { ...state.items };
      if (qty <= 0) delete next[action.id];
      else next[action.id] = qty;
      return { items: next };
    }
    case "REMOVE": {
      const next = { ...state.items };
      delete next[action.id];
      return { items: next };
    }
    case "CLEAR":
      return { items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const add = useCallback((id) => dispatch({ type: "ADD", id }), []);
  const dec = useCallback((id) => dispatch({ type: "DEC", id }), []);
  const remove = useCallback((id) => dispatch({ type: "REMOVE", id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const itemCount = Object.values(state.items).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider value={{ items: state.items, add, dec, remove, clear, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
