"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Map of animation id (from dish frontmatter) to its lazily loaded component.
const REGISTRY: Record<string, ComponentType> = {
  baklava: dynamic(() =>
    import("./BaklavaLayers").then((m) => m.BaklavaLayers),
  ),
};

export function DishAnimation({ id }: { id?: string }) {
  if (!id) return null;
  const Component = REGISTRY[id];
  if (!Component) return null;
  return <Component />;
}
