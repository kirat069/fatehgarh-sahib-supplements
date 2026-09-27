import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const STORE_INFO = {
  name: "Fatehgarh Sahib Supplement Dealing",
  phone: "7508117344",
  whatsapp: "917508117344",
  location: "Fatehgarh Sahib, Punjab, India",
};
