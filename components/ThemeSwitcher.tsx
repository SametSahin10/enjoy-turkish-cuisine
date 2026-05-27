"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "anatolia", label: "Anatolia", swatch: "#b83f1f" },
  { id: "bosphorus", label: "Bosphorus", swatch: "#1f5590" },
  { id: "pistachio", label: "Pistachio", swatch: "#588726" },
  { id: "pomegranate", label: "Pomegranate", swatch: "#a51d2e" },
  { id: "saffron", label: "Saffron", swatch: "#c9870c" },
] as const;

export const THEME_IDS = THEMES.map((t) => t.id);
export const DEFAULT_THEME = "anatolia";

export function ThemeSwitcher() {
  const [active, setActive] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    setActive(document.documentElement.dataset.theme ?? DEFAULT_THEME);
  }, []);

  function choose(id: string) {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem("theme", id);
    } catch {}
    setActive(id);
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-sand-200 bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur">
        <span className="px-2 text-xs font-medium text-stone-500">Theme</span>
        {THEMES.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => choose(t.id)}
              aria-pressed={isActive}
              title={t.label}
              className={`flex h-8 items-center gap-1.5 rounded-full px-2 transition ${
                isActive ? "bg-sand-100 ring-1 ring-sand-200" : "hover:bg-sand-50"
              }`}
            >
              <span
                className="h-4 w-4 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: t.swatch }}
              />
              <span
                className={`hidden text-xs sm:inline ${
                  isActive ? "font-semibold text-stone-800" : "text-stone-500"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
