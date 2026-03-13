'use client';

import { useState, useEffect } from 'react';

/* ─── 2-frame walking legs (tripod gait) ────────────────────────────────── */
type Leg = [number, number, number, number];

const WALK: [Leg[], Leg[]] = [
  [
    [26, 13, 34, 17], [26,  9, 34,  5],
    [23, 14, 15, 20], [23,  8, 15,  2],
    [18, 14, 24, 20], [18,  8, 24,  2],
  ],
  [
    [26, 13, 28, 21], [26,  9, 28,  1],
    [23, 14, 31, 18], [23,  8, 31,  4],
    [18, 14, 12, 21], [18,  8, 12,  1],
  ],
];

function AntSVG({ frame }: { frame: 0 | 1 }) {
  return (
    <svg
      viewBox="0 0 44 22"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <line x1="36" y1="7" x2="42" y2="1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="36" y1="7" x2="44" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="33" cy="11" r="4.5" />
      <ellipse cx="24" cy="11" rx="4.5" ry="3.5" />
      <ellipse cx="12" cy="11" rx="8" ry="6" />
      {WALK[frame].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ─── Wavy path keyframes ────────────────────────────────────────────────────
  Desktop (≥1024px):
    Base diagonal (0,0)→(44vw,-112vh). Wave ±3vw, 4 oscillations.
    Rotation matches direction of travel at each inflection.

  Mobile (<1024px):
    Screen is narrow so 44vw is much smaller in px — path is nearly vertical.
    Recalculated rotation (~-78°) to match the actual movement angle on mobile.
    Reduced wave amplitude (±2vw) and starting position shifted right (72%).

  .ant-item handles the left anchor, overriding the inline left via the class.
  (CSS class wins over inline only when !important is not needed — we remove
   left from inline style and let the class handle it per breakpoint.)
────────────────────────────────────────────────────────────────────────────── */
const KEYFRAMES = `
  /* ── Desktop ── */
  @media (min-width: 1024px) {
    .ant-item { left: 54%; }

    @keyframes antMarch {
      0%     { transform: translate(  0vw,    0vh) rotate(-52deg) scale(1.00); opacity: 0;    }
      4%     {                                                                  opacity: 0.60; }
      12.5%  { transform: translate(8.5vw,  -14vh) rotate(-40deg) scale(0.95); opacity: 0.56; }
      25%    { transform: translate( 11vw,  -28vh) rotate(-49deg) scale(0.90); opacity: 0.50; }
      37.5%  { transform: translate(13.5vw, -42vh) rotate(-57deg) scale(0.85); opacity: 0.44; }
      50%    { transform: translate( 22vw,  -56vh) rotate(-45deg) scale(0.80); opacity: 0.38; }
      62.5%  { transform: translate(30.5vw, -70vh) rotate(-33deg) scale(0.75); opacity: 0.32; }
      75%    { transform: translate( 33vw,  -84vh) rotate(-42deg) scale(0.70); opacity: 0.26; }
      87.5%  { transform: translate(35.5vw, -98vh) rotate(-50deg) scale(0.65); opacity: 0.18; }
      96%    {                                                                  opacity: 0.10; }
      100%   { transform: translate( 44vw, -112vh) rotate(-38deg) scale(0.60); opacity: 0;    }
    }
  }

  /* ── Mobile & tablet ── */
  @media (max-width: 1023px) {
    .ant-item { left: 72%; }

    @keyframes antMarch {
      0%     { transform: translate(  0vw,    0vh) rotate(-78deg) scale(1.00); opacity: 0;    }
      4%     {                                                                  opacity: 0.60; }
      12.5%  { transform: translate( 2vw,  -14vh) rotate(-68deg) scale(0.95); opacity: 0.56; }
      25%    { transform: translate( 0vw,  -28vh) rotate(-78deg) scale(0.90); opacity: 0.50; }
      37.5%  { transform: translate(-2vw,  -42vh) rotate(-88deg) scale(0.85); opacity: 0.44; }
      50%    { transform: translate( 0vw,  -56vh) rotate(-78deg) scale(0.80); opacity: 0.38; }
      62.5%  { transform: translate( 2vw,  -70vh) rotate(-68deg) scale(0.75); opacity: 0.32; }
      75%    { transform: translate( 0vw,  -84vh) rotate(-78deg) scale(0.70); opacity: 0.26; }
      87.5%  { transform: translate(-2vw,  -98vh) rotate(-88deg) scale(0.65); opacity: 0.18; }
      96%    {                                                                  opacity: 0.10; }
      100%   { transform: translate( 0vw, -112vh) rotate(-78deg) scale(0.60); opacity: 0;    }
    }
  }
`;

/* ─── Component ─────────────────────────────────────────────────────────── */

const NUM_ANTS = 20;
const DURATION = 12; // seconds per full loop

export default function AntTrail() {
  const [frame, setFrame] = useState<0 | 1>(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (1 - f) as 0 | 1), 120);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:          0,
          pointerEvents: 'none',
          zIndex:         5,
        }}
      >
        {Array.from({ length: NUM_ANTS }, (_, i) => (
          <div
            key={i}
            className="ant-item"
            style={{
              position: 'absolute',
              // left is intentionally omitted — .ant-item CSS sets it per breakpoint
              top:      '105%',
              width:     42,
              color:    '#86efac',
              animationName:           'antMarch',
              animationDuration:       `${DURATION}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay:          `${-(i / NUM_ANTS) * DURATION}s`,
            }}
          >
            <AntSVG frame={frame} />
          </div>
        ))}
      </div>
    </>
  );
}
