"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const W = 340;
const H = 244;
const LAYERS = 11;
const STEP = 13.5;
const LAYER_H = 13;
const BASE_TOP = 184;
const X = 30;
const WIDTH = 280;
const FILLING_INDEX = 5;

const GOLD_A = "#ecc77d";
const GOLD_B = "#ddb158";
const GOLD_EDGE = "#c6912f";
const GREEN = "#8aab43";
const GREEN_NUT = "#5e7c27";
const SYRUP = "#b9821f";

// Bottom layer first so the stagger builds the stack upward.
const layers = Array.from({ length: LAYERS }, (_, i) => {
  const y = BASE_TOP - i * STEP;
  const isFilling = i === FILLING_INDEX;
  const inset = i % 2 === 0 ? 0 : 2;
  return { i, y, isFilling, x: X + inset, width: WIDTH - inset * 2 };
});

const sprinkle = [
  [70, 0], [95, 4], [120, -2], [150, 3], [180, -3],
  [205, 2], [235, -1], [262, 4], [288, 0], [55, 3],
].map(([cx, dy]) => ({ cx, cy: BASE_TOP - (LAYERS - 1) * STEP + dy }));

const cuts = [
  { x1: 70, x2: 130 }, { x1: 130, x2: 190 },
  { x1: 190, x2: 250 }, { x1: 250, x2: 310 },
];

export function BaklavaLayers() {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);

  const stackTop = BASE_TOP - (LAYERS - 1) * STEP;
  const finishDelay = reduce ? 0 : LAYERS * 0.09 + 0.25;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09 },
    },
  };
  const layerV: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : -22 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { type: "spring", stiffness: 210, damping: 17 },
    },
  };

  return (
    <figure className="overflow-hidden rounded-2xl bg-gradient-to-b from-sand-50 to-sand-100 ring-1 ring-sand-200">
      <div className="flex items-center justify-between px-5 pt-4">
        <figcaption className="font-display text-sm font-semibold text-stone-700">
          How baklava is built
        </figcaption>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="rounded-full bg-paprika-600 px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90"
        >
          Replay
        </button>
      </div>

      <svg
        key={run}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Animation of baklava being assembled from many thin layers of filo pastry, a layer of ground pistachio, syrup, and a pistachio garnish."
      >
        {/* tray */}
        <rect
          x={20}
          y={BASE_TOP + 6}
          width={WIDTH + 20}
          height={20}
          rx={6}
          fill="#8a5a22"
        />

        <motion.g variants={container} initial="hidden" animate="show">
          {layers.map((l) => (
            <motion.g key={l.i} variants={layerV}>
              <rect
                x={l.x}
                y={l.y}
                width={l.width}
                height={LAYER_H}
                rx={4}
                fill={l.isFilling ? GREEN : l.i % 2 === 0 ? GOLD_A : GOLD_B}
                stroke={l.isFilling ? GREEN_NUT : GOLD_EDGE}
                strokeWidth={0.75}
              />
              {l.isFilling &&
                [60, 95, 130, 165, 200, 235, 270].map((cx) => (
                  <circle
                    key={cx}
                    cx={cx}
                    cy={l.y + LAYER_H / 2}
                    r={2.1}
                    fill={GREEN_NUT}
                  />
                ))}
            </motion.g>
          ))}
        </motion.g>

        {/* finishing flourishes: syrup glaze, diamond cuts, pistachio garnish */}
        <motion.rect
          x={X}
          y={stackTop}
          width={WIDTH}
          height={(LAYERS - 1) * STEP + LAYER_H}
          rx={5}
          fill={SYRUP}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ delay: finishDelay, duration: reduce ? 0 : 0.6 }}
        />

        {cuts.map((c, idx) => (
          <g key={idx}>
            <motion.line
              x1={c.x1}
              y1={BASE_TOP + LAYER_H}
              x2={c.x2}
              y2={stackTop}
              stroke={GOLD_EDGE}
              strokeWidth={1.25}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{
                delay: finishDelay + (reduce ? 0 : 0.15 + idx * 0.06),
                duration: reduce ? 0 : 0.45,
              }}
            />
            <motion.line
              x1={c.x2}
              y1={BASE_TOP + LAYER_H}
              x2={c.x1}
              y2={stackTop}
              stroke={GOLD_EDGE}
              strokeWidth={1.25}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{
                delay: finishDelay + (reduce ? 0 : 0.15 + idx * 0.06),
                duration: reduce ? 0 : 0.45,
              }}
            />
          </g>
        ))}

        {sprinkle.map((s, idx) => (
          <motion.circle
            key={idx}
            cx={s.cx}
            cy={s.cy}
            r={2.6}
            fill={GREEN_NUT}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: finishDelay + (reduce ? 0 : 0.4 + idx * 0.05),
              type: reduce ? "tween" : "spring",
              stiffness: 400,
              damping: 14,
              duration: reduce ? 0 : undefined,
            }}
            style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
          />
        ))}
      </svg>

      <p className="px-5 pb-4 text-xs text-stone-500">
        Dozens of paper-thin filo sheets, a layer of ground pistachio, then
        syrup and a final pistachio garnish.
      </p>
    </figure>
  );
}
