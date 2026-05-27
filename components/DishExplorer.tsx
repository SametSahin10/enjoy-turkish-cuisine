"use client";

import { useState } from "react";
import type { Dish } from "@/lib/schema";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/schema";
import { DishCard } from "./DishCard";

type Filter = "all" | (typeof CATEGORIES)[number];

export function DishExplorer({ dishes }: { dishes: Dish[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? dishes : dishes.filter((d) => d.category === filter);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.value
                ? "bg-paprika-600 text-white"
                : "bg-white text-stone-600 ring-1 ring-sand-200 hover:bg-sand-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dish) => (
          <DishCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </div>
  );
}
