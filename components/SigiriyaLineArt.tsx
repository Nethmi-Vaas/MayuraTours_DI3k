"use client"

import React, { CSSProperties } from "react"

/* ── tiny helpers ─────────────────────────────────────────── */
const DASH = 3000

function P({
  d, delay = 0, dur = 2, sw = 1.5, op = 1, cap = "round",
}: {
  d: string; delay?: number; dur?: number; sw?: number; op?: number; cap?: string
}) {
  return (
    <path
      d={d}
      strokeWidth={sw}
      strokeLinecap={cap as "round" | "butt" | "square"}
      strokeLinejoin="round"
      strokeOpacity={op}
      fill="none"
      style={{
        strokeDasharray: DASH,
        strokeDashoffset: DASH,
        animation: `sigiriyaDraw ${dur}s ease forwards`,
        animationDelay: `${delay}s`,
      } as CSSProperties}
    />
  )
}

function Line({
  x1, y1, x2, y2, delay = 0, dur = 0.7, sw = 1, op = 0.5,
}: {
  x1: number; y1: number; x2: number; y2: number
  delay?: number; dur?: number; sw?: number; op?: number
}) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      strokeWidth={sw} strokeLinecap="round" strokeOpacity={op}
      style={{
        strokeDasharray: 400,
        strokeDashoffset: 400,
        animation: `sigiriyaDraw ${dur}s ease forwards`,
        animationDelay: `${delay}s`,
      } as CSSProperties}
    />
  )
}

/* ── contour helpers ──────────────────────────────────────── */
const CONTOURS: [number, number, number][] = [
  // [leftX, y, rightX]
  [84, 118, 165],
  [82, 152, 166],
  [80, 188, 167],
  [78, 222, 167],
  [78, 257, 165],
  [78, 292, 163],
  [78, 328, 161],
]

/* ── star positions above summit ─────────────────────────── */
const STARS = [[112, 22], [133, 15], [154, 24], [94, 36], [170, 30]] as const

/* ── component ────────────────────────────────────────────── */
export default function SigiriyaLineArt({
  className = "",
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={className} style={style}>
      <svg
        viewBox="0 0 240 500"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ animation: "sigiriyaGlow 3.5s ease-in-out 7s infinite" }}
      >

        {/* ─── Water / moat at base ─────────────────────── */}
        {[472, 482, 492].map((y, i) => (
          <Line key={y}
            x1={18 + i * 6} y1={y} x2={222 - i * 6} y2={y}
            delay={5.5 + i * 0.15} dur={0.8} sw={0.8} op={0.28} />
        ))}

        {/* ─── Trees left ───────────────────────────────── */}
        <P d="M 30 462 C 24 446 20 430 28 415 C 22 419 15 417 13 411 M 28 415 C 22 405 19 391 26 382"
          delay={4.8} dur={1.2} sw={1.1} op={0.55} />
        <P d="M 48 465 C 43 448 39 431 46 416 C 40 420 33 418 31 412 M 46 416 C 41 407 38 392 45 383"
          delay={5.0} dur={1.2} sw={1.1} op={0.5} />

        {/* ─── Trees right ──────────────────────────────── */}
        <P d="M 210 462 C 216 446 220 430 212 415 C 218 419 225 417 227 411 M 212 415 C 218 405 221 391 214 382"
          delay={4.8} dur={1.2} sw={1.1} op={0.55} />
        <P d="M 192 465 C 197 448 201 431 194 416 C 200 420 207 418 209 412 M 194 416 C 199 407 202 392 195 383"
          delay={5.0} dur={1.2} sw={1.1} op={0.5} />

        {/* ─── Left lion paw ────────────────────────────── */}
        <P d="M 62 452 C 60 464 50 470 42 467 C 33 464 31 454 37 449 C 42 445 51 447 57 451"
          delay={1.8} dur={1.4} sw={2.0} op={0.88} />
        {/* paw toes */}
        <P d="M 34 451 L 30 445 M 41 448 L 39 441 M 49 447 L 48 440"
          delay={2.8} dur={0.6} sw={1.0} op={0.6} />

        {/* ─── Right lion paw ───────────────────────────── */}
        <P d="M 178 452 C 180 464 190 470 198 467 C 207 464 209 454 203 449 C 198 445 189 447 183 451"
          delay={1.8} dur={1.4} sw={2.0} op={0.88} />
        {/* paw toes */}
        <P d="M 206 451 L 210 445 M 199 448 L 201 441 M 191 447 L 192 440"
          delay={2.8} dur={0.6} sw={1.0} op={0.6} />

        {/* ─── MAIN ROCK SILHOUETTE ─────────────────────── */}
        {/*
          Profile (clockwise from summit top-left):
          Summit → narrows at waist → gallery bulge → narrows → boulder skirt widens
        */}
        <P
          d={`
            M 88 80
            L 158 80
            C 165 92 166 114 164 138
            C 165 165 167 192 167 218
            C 166 244 164 269 162 294
            C 161 319 160 344 159 368
            C 163 386 170 406 176 428
            L 182 452
            L 185 462
            L 55 462
            L 58 452
            L 64 428
            C 70 406 76 386 80 368
            C 79 344 78 319 78 294
            C 77 269 76 244 75 218
            C 75 192 76 165 78 138
            C 76 114 78 92 88 80
            Z
          `}
          delay={0} dur={3.8} sw={2.3} op={1}
        />

        {/* ─── Contour / rock layer lines ───────────────── */}
        {CONTOURS.map(([lx, y, rx], i) => (
          <path
            key={y}
            d={`M ${lx} ${y} Q 120 ${y - 7} ${rx} ${y}`}
            strokeWidth={0.85}
            strokeLinecap="round"
            strokeOpacity={0.38}
            fill="none"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: 400,
              animation: `sigiriyaDraw 0.75s ease forwards`,
              animationDelay: `${3.4 + i * 0.2}s`,
            } as CSSProperties}
          />
        ))}

        {/* Boulder section contours */}
        <P d="M 70 395 Q 120 388 170 395" delay={3.8} dur={0.7} sw={0.85} op={0.32} />
        <P d="M 63 428 Q 120 421 177 428" delay={4.0} dur={0.7} sw={0.85} op={0.28} />

        {/* ─── Gallery shelf (fresco pocket, left face ~y=220) ── */}
        <P d="M 75 225 L 58 230 C 53 232 52 240 57 242 L 75 240"
          delay={4.3} dur={0.9} sw={1.5} op={0.7} />
        <P d="M 58 232 L 58 252 L 75 252"
          delay={4.8} dur={0.5} sw={1.0} op={0.5} />

        {/* ─── Steps on right face ──────────────────────── */}
        {[430, 414, 398, 382, 366, 350, 334, 318, 302].map((y, i) => (
          <Line key={y}
            x1={159} y1={y} x2={173} y2={y}
            delay={4.4 + i * 0.09} dur={0.45} sw={0.9} op={0.42} />
        ))}

        {/* Faint vertical line connecting steps */}
        <P d="M 166 430 L 166 302" delay={4.4} dur={0.8} sw={0.5} op={0.2} />

        {/* ─── Summit palace / battlements ──────────────── */}
        <P
          d="M 88 80 L 88 70 L 100 70 L 100 60 L 114 60 L 114 52 L 128 52 L 128 60 L 142 60 L 142 52 L 156 52 L 156 60 L 158 60 L 158 70 L 158 80"
          delay={0.6} dur={2.2} sw={1.9} op={0.95}
        />
        {/* inner palace walls */}
        <P d="M 102 70 L 102 78 M 128 60 L 128 70 L 138 70 L 138 60 M 144 70 L 144 78"
          delay={2.2} dur={0.9} sw={1.2} op={0.6} />
        {/* a small central tower */}
        <P d="M 118 52 L 118 44 L 130 44 L 130 52"
          delay={2.6} dur={0.7} sw={1.4} op={0.7} />
        <Line x1={124} y1={44} x2={124} y2={38} delay={3.0} dur={0.4} sw={1.2} op={0.7} />

        {/* ─── Rock face diagonal crack lines ───────────── */}
        <P d="M 90 170 L 98 215" delay={4.2} dur={0.5} sw={0.7} op={0.2} />
        <P d="M 148 240 L 155 290" delay={4.4} dur={0.5} sw={0.7} op={0.2} />
        <P d="M 110 310 L 118 355" delay={4.6} dur={0.5} sw={0.7} op={0.2} />

        {/* ─── Stars above summit ───────────────────────── */}
        {STARS.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={1.3}
            fill="white" stroke="none"
            style={{
              opacity: 0,
              animation: `sigiriyaDraw 0.4s ease forwards`,
              animationDelay: `${6.2 + i * 0.25}s`,
            } as CSSProperties}
          />
        ))}

        {/* ─── Subtle glow outline (behind the main path) ── */}
        <path
          d={`
            M 88 80 L 158 80
            C 165 92 166 114 164 138
            C 165 165 167 192 167 218
            C 166 244 164 269 162 294
            C 161 319 160 344 159 368
            C 163 386 170 406 176 428
            L 182 452 L 185 462
            L 55 462 L 58 452 L 64 428
            C 70 406 76 386 80 368
            C 79 344 78 319 78 294
            C 77 269 76 244 75 218
            C 75 192 76 165 78 138
            C 76 114 78 92 88 80 Z
          `}
          strokeWidth={8}
          strokeOpacity={0.08}
          fill="none"
          style={{
            strokeDasharray: DASH,
            strokeDashoffset: DASH,
            animation: `sigiriyaDraw 3.8s ease forwards`,
            animationDelay: `0.1s`,
            filter: "blur(4px)",
          } as CSSProperties}
        />
      </svg>
    </div>
  )
}
