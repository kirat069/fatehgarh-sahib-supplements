import { supabase } from "./supabase";

export const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "Whey Protein Concentrate",
    description: "24g protein per scoop. Supports muscle recovery and growth. Rich chocolate flavour.",
    price: 1899,
    lot_label: "LOT-WPC-2401",
    tag: "Best Seller",
    stock: 40,
  },
  {
    id: "demo-2",
    name: "Creatine Monohydrate",
    description: "Micronized creatine, 5g per serving. Boosts strength and power output. Unflavoured.",
    price: 649,
    lot_label: "LOT-CRE-1198",
    tag: "Best Seller",
    stock: 75,
  },
  {
    id: "demo-3",
    name: "Mass Gainer XL",
    description: "High-calorie gainer with 50g protein and 250g carbs per serving. For serious bulking.",
    price: 2899,
    lot_label: "LOT-MSG-0902",
    tag: "New",
    stock: 25,
  },
  {
    id: "demo-4",
    name: "Daily Multivitamins",
    description: "Complete daily multivitamin and mineral complex. 60 tablets for 2-month supply.",
    price: 499,
    lot_label: "LOT-MVT-0567",
    tag: "",
    stock: 100,
  },
];

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) return { data: null, error, demo: DEMO_PRODUCTS };
  return { data, error: null, demo: null };
}

export async function placeOrder({ customer_name, phone, address, items, total }) {
  const { data, error } = await supabase
    .from("orders")
    .insert({ customer_name, phone, address, items, total })
    .select()
    .maybeSingle();
  return { data, error };
}

export async function lookupOrder(orderId, phone) {
  const { data, error } = await supabase
    .rpc("lookup_order", { p_order_id: orderId, p_phone: phone });
  return { data, error };
}

export async function sendMessage({ name, phone, message }) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ name, phone, message });
  return { data, error };
}

export async function fetchAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .maybeSingle();
  return { data, error };
}

export async function fetchAllMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .maybeSingle();
  return { data, error };
}

export async function deleteProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  return { data, error };
}
