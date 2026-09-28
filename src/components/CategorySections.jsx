import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../lib/cart";

const ACCENT_COLORS = {
  copper: "#c97a3e",
  forest: "#6b8f5b",
  saffron: "#e3a52b",
  steel: "#5d84a0",
  amber: "#c97a3e",
  emerald: "#6b8f5b",
};

const SECTION_META = [
  {
    id: "protein",
    side: "right",
    accent: "copper",
    title: "Protein & Mass",
    description:
      "Whey isolate, concentrate blends and mass gainers built for Indian training loads — from first-timers to competitive lifters. Every batch is lab-tested for purity before it reaches you.",
    chips: ["Whey Isolate", "Whey Concentrate", "Mass Gainer", "Plant Protein"],
    categories: ["protein", "mass"],
  },
  {
    id: "ayurveda",
    side: "left",
    accent: "forest",
    title: "Ayurvedic & Herbal",
    description:
      "The formulations India has trusted for centuries, standardised for modern dosing. Ashwagandha for calm strength, Shilajit for stamina, Brahmi for focus — sourced from Indian farms.",
    chips: ["Ashwagandha", "Shilajit", "Brahmi", "Turmeric"],
    categories: ["ayurvedic"],
  },
  {
    id: "vitamins",
    side: "right",
    accent: "saffron",
    title: "Vitamins & Minerals",
    description:
      "Multivitamins built around what Indian diets actually miss — D3 for sunlight-starved schedules, B12 for plant-forward eaters, calcium and zinc for everyday resilience.",
    chips: ["Multivitamin", "Vitamin D3", "B12", "Calcium & Zinc"],
    categories: ["vitamins", "minerals"],
  },
  {
    id: "performance",
    side: "left",
    accent: "steel",
    title: "Performance & Recovery",
    description:
      "Creatine, BCAAs, electrolytes and omega-3 for the days training meets 40-degree heat and long commutes. Formulated to recover as hard as you train.",
    chips: ["Creatine Monohydrate", "BCAA", "Electrolytes", "Omega-3"],
    categories: ["performance"],
  },
];

function ProductRow({ product, onAdd }) {
  const accent = ACCENT_COLORS[product.accent] || "#c97a3e";

  return (
    <div
      className="flex items-center justify-between py-3 border-b border-ink/8 last:border-0 group"
    >
      <div className="flex-1 min-w-0 pr-3">
        <div className="text-sm text-ink font-medium truncate">
          {product.name}
        </div>
        <div className="text-[0.7rem] text-muted font-mono mt-0.5">
          {product.tags && product.tags.join(" / ")}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="font-mono text-sm"
          style={{ color: accent }}
        >
          ₹{product.price}
        </span>
        <button
          onClick={() => onAdd(product)}
          className="font-mono text-[0.65rem] tracking-wider px-3 py-1.5 border transition-all duration-200"
          style={{
            borderColor: accent,
            color: accent,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = accent;
            e.target.style.color = "#14110f";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = accent;
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

function CategorySection({ meta }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const accent = ACCENT_COLORS[meta.accent] || "#c97a3e";

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("id, name, price, tags, accent, category, stock")
        .in("category", meta.categories)
        .order("price", { ascending: true });
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, [meta.categories]);

  return (
    <section
      id={meta.id}
      className={`cat min-h-screen min-h-[100svh] flex items-center px-[6vw] ${
        meta.side === "right"
          ? "justify-end"
          : meta.side === "left"
          ? "justify-start"
          : ""
      }`}
      data-accent={meta.accent}
      style={{ "--accent": accent }}
    >
      <div className={`panel ${meta.side === "right" ? "panel-right" : ""}`}>
        <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.6rem)] mb-4 leading-[1.08]">
          {meta.title}
        </h2>
        <p className="text-muted leading-[1.6] text-base mb-6">
          {meta.description}
        </p>

        <div className="chips flex flex-wrap gap-[0.55rem] mb-6">
          {meta.chips.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>

        <div className="border-t border-ink/10 pt-3">
          {loading ? (
            <div className="py-4 text-muted font-mono text-xs">
              Loading products…
            </div>
          ) : products.length === 0 ? (
            <div className="py-4 text-muted font-mono text-xs">
              No products in this category yet.
            </div>
          ) : (
            products.map((p) => (
              <ProductRow key={p.id} product={p} onAdd={addToCart} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default function CategorySections() {
  return (
    <>
      {SECTION_META.map((meta) => (
        <CategorySection key={meta.id} meta={meta} />
      ))}
    </>
  );
}
