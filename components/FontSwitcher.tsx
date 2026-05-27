"use client";

import { useEffect, useState } from "react";

const FONTS = [
  { id: "poppins", label: "Poppins", var: "var(--font-poppins)" },
  { id: "nunito", label: "Nunito", var: "var(--font-nunito)" },
  { id: "outfit", label: "Outfit", var: "var(--font-outfit)" },
  { id: "fraunces", label: "Fraunces", var: "var(--font-fraunces)" },
  { id: "space-grotesk", label: "Space Grotesk", var: "var(--font-space-grotesk)" },
] as const;

export const DEFAULT_FONT = "poppins";

export function FontSwitcher() {
  const [active, setActive] = useState<string>(DEFAULT_FONT);

  useEffect(() => {
    setActive(document.documentElement.dataset.font ?? DEFAULT_FONT);
  }, []);

  function choose(id: string) {
    document.documentElement.dataset.font = id;
    try {
      localStorage.setItem("font", id);
    } catch {}
    setActive(id);
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-sand-200 bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur">
        <span className="px-2 text-xs font-medium text-stone-500">Font</span>
        {FONTS.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => choose(f.id)}
              aria-pressed={isActive}
              title={f.label}
              style={{ fontFamily: f.var }}
              className={`h-8 rounded-full px-3 text-sm transition ${
                isActive
                  ? "bg-paprika-600 font-semibold text-white"
                  : "text-stone-600 hover:bg-sand-100"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
