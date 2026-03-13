'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────
   Cockroach SVG — head points RIGHT at 0° rotation
   ───────────────────────────────────────────────────────────────────────── */

// 2-frame walking cycle — tripod gait
// [x1, y1, x2, y2] per leg
type Leg = [number, number, number, number];

const FRAMES: [Leg[], Leg[]] = [
  // Frame A — group I forward, group II planted
  [
    [30, 17, 38, 22],  // front-right → forward-down
    [30,  7, 38,  2],  // front-left  → forward-up
    [22, 19, 13, 24],  // mid-right   → planted back
    [22,  5, 13,  0],  // mid-left    → planted back
    [12, 18, 18, 23],  // back-right  → forward
    [12,  6, 18,  1],  // back-left   → forward
  ],
  // Frame B — group I planted, group II swings forward
  [
    [30, 17, 33, 24],  // front-right → planted
    [30,  7, 33,  0],  // front-left  → planted
    [22, 19, 30, 22],  // mid-right   → swings forward
    [22,  5, 30,  2],  // mid-left    → swings forward
    [12, 18,  5, 23],  // back-right  → planted back
    [12,  6,  5,  1],  // back-left   → planted back
  ],
];

function CockroachSVG({ frame }: { frame: 0 | 1 }) {
  return (
    <svg
      viewBox="0 0 52 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* antennae */}
      <path d="M43 9 Q48 4 51 1"  stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M43 9 Q50 8 52 11" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* head */}
      <ellipse cx="40" cy="12" rx="5.5" ry="4.5" />
      {/* pronotum */}
      <ellipse cx="29" cy="12" rx="7.5" ry="6.5" />
      {/* body */}
      <ellipse cx="16" cy="12" rx="11" ry="8" />
      {/* legs — alternate frames for walking cycle */}
      {FRAMES[frame].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Splat mark
   ───────────────────────────────────────────────────────────────────────── */

function SplatMark({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: x - 30,
        top:  y - 30,
        width: 60,
        height: 60,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      initial={{ scale: 0.2, opacity: 0.9 }}
      animate={{ scale: 2.5, opacity: 0   }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0, 0.2, 1] }}
    >
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="13" fill="#166534" opacity="0.65" />
        <circle cx="9"  cy="14" r="4"  fill="#166534" opacity="0.50" />
        <circle cx="51" cy="20" r="3"  fill="#166534" opacity="0.45" />
        <circle cx="47" cy="49" r="5"  fill="#166534" opacity="0.50" />
        <circle cx="14" cy="47" r="3"  fill="#166534" opacity="0.45" />
        <circle cx="4"  cy="31" r="2"  fill="#166534" opacity="0.35" />
        <circle cx="56" cy="37" r="2"  fill="#166534" opacity="0.35" />
        <circle cx="30" cy="4"  r="3"  fill="#166534" opacity="0.45" />
        <circle cx="29" cy="56" r="2"  fill="#166534" opacity="0.35" />
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Wavy path keyframes

   The cockroach descends the right edge in a sinusoidal S-curve.
   3 complete oscillations across the full scroll range (0 → 1).

   x oscillates between 93vw (leftward peak) and 97vw (rightward peak).
   y advances linearly from 9vh to 90vh.

   Rotation follows the direction of travel:
     - at midpoints moving LEFT  → ~103° (slightly past straight-down)
     - at midpoints moving RIGHT → ~77°  (slightly before straight-down)
     - at the turning peaks      → 90°   (momentarily straight-down)
   ───────────────────────────────────────────────────────────────────────── */

// 3 full S-waves = 7 keyframe nodes for x/y
const WAVE_S = [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1] as const;

const X_WAVE    = [97, 93, 97, 93, 97, 93, 97] as const;  // vw
const Y_WAVE    = [9,  23, 36, 50, 63, 77, 90] as const;  // vh

// 13 rotation keyframes — double the density to capture mid-wave direction
const ROT_S = [
  0, 0.083, 0.167, 0.25, 0.333, 0.417,
  0.5, 0.583, 0.667, 0.75, 0.833, 0.917, 1,
] as const;

const ROT_WAVE = [
  90, 103, 90, 77, 90, 103,
  90, 77, 90, 103, 90, 77, 90,
] as const;

/* ─────────────────────────────────────────────────────────────────────────
   Cockroach component
   ───────────────────────────────────────────────────────────────────────── */

function Cockroach({
  scrollYProgress,
  onSquash,
  squashed,
}: {
  scrollYProgress: MotionValue<number>;
  onSquash: (x: number, y: number) => void;
  squashed: boolean;
}) {
  const [frame, setFrame] = useState<0 | 1>(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => (1 - f) as 0 | 1), 130);
    return () => clearInterval(timer);
  }, []);

  const xNum  = useTransform(scrollYProgress, [...WAVE_S], [...X_WAVE]);
  const yNum  = useTransform(scrollYProgress, [...WAVE_S], [...Y_WAVE]);
  const rot   = useTransform(scrollYProgress, [...ROT_S],  [...ROT_WAVE]);

  const leftCSS = useTransform(xNum, v => `${v}vw`);
  const topCSS  = useTransform(yNum, v => `${v}vh`);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    onSquash(r.left + r.width / 2, r.top + r.height / 2);
  }

  return (
    <AnimatePresence>
      {!squashed && (
        <motion.div
          // Outer: scroll-driven position + wavy rotation tracking direction of travel
          style={{
            position:      'fixed',
            left:           leftCSS,
            top:            topCSS,
            rotate:         rot,
            width:          44,
            marginLeft:    -22,
            marginTop:     -11,
            zIndex:         9998,
            willChange:    'transform',
            pointerEvents: 'auto',
            cursor:        'crosshair',
          }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
          whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}
          onClick={handleClick}
        >
          {/*
            Inner: continuous walking animation, independent of scroll.
            rotate oscillates ±4° → body sway during stride.
            y oscillates ±1.5px  → weight-shift bob.
          */}
          <motion.div
            animate={{ rotate: [-4, 4, -4], y: [0, -1.5, 0] }}
            transition={{ duration: 0.36, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#86efac', opacity: 0.65 }}
          >
            <CockroachSVG frame={frame} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   InsectTrail — main export
   ───────────────────────────────────────────────────────────────────────── */

interface Splat { id: number; x: number; y: number }

export default function InsectTrail() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [squashed,  setSquashed]  = useState(false);
  const [splats,    setSplats]    = useState<Splat[]>([]);
  const splatCounter              = useRef(0);
  const { scrollYProgress }       = useScroll();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  function handleSquash(x: number, y: number) {
    const sid = ++splatCounter.current;
    setSquashed(true);
    setSplats(prev => [...prev, { id: sid, x, y }]);
    setTimeout(() => setSplats(prev => prev.filter(s => s.id !== sid)), 700);
  }

  if (!isDesktop) return null;

  return (
    <>
      {/* Insect layer — transparent to all pointer events except the insect itself */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }}
      >
        <Cockroach
          scrollYProgress={scrollYProgress}
          onSquash={handleSquash}
          squashed={squashed}
        />
      </div>

      {/* Splat marks */}
      <AnimatePresence>
        {splats.map(s => <SplatMark key={s.id} x={s.x} y={s.y} />)}
      </AnimatePresence>
    </>
  );
}
