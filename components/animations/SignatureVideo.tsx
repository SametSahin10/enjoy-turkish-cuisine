"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function SignatureVideo({
  src,
  poster,
  title,
  caption,
}: {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // Play only while in view to save battery/data; skip entirely if the user
  // prefers reduced motion (they get the poster + standard controls instead).
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <figure className="overflow-hidden rounded-2xl bg-sand-100 ring-1 ring-sand-200">
      {title && (
        <figcaption className="px-5 pt-4 font-display text-sm font-semibold text-stone-700">
          {title}
        </figcaption>
      )}
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={!!reduce}
        autoPlay={!reduce}
        className="mt-3 w-full"
      />
      {caption && (
        <p className="px-5 pb-4 pt-3 text-xs text-stone-500">{caption}</p>
      )}
    </figure>
  );
}
