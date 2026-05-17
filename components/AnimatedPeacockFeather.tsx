"use client"

import { CSSProperties } from "react"

interface Props {
  size?: number
  delay?: number
  rotation?: number
  opacity?: number
  className?: string
  animate?: "drift" | "float" | "sway" | "none"
}

export default function AnimatedPeacockFeather({
  size = 120,
  delay = 0,
  rotation = 0,
  opacity = 1,
  className = "",
  animate = "drift",
}: Props) {
  const style: CSSProperties = {
    "--rot": `${rotation}deg`,
    "--drift": `${(rotation % 2 === 0 ? 1 : -1) * 15}px`,
    animationDelay: `${delay}s`,
    opacity,
    width: size,
    height: size * 2.8,
    display: "inline-block",
    filter: "drop-shadow(0 0 8px rgba(45,139,179,0.5))",
  } as CSSProperties

  const animClass =
    animate === "drift"
      ? "animate-feather-drift animate-iridescent"
      : animate === "float"
      ? "animate-feather-float animate-iridescent"
      : animate === "sway"
      ? "animate-feather-sway animate-iridescent"
      : ""

  const w = size
  const h = size * 2.8
  const cx = w / 2
  const stemBottom = h * 0.98
  const eyeCy = h * 0.12
  const stemTop = eyeCy

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={`${animClass} ${className}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Iridescent teal gradient for barbs */}
        <linearGradient id={`barbGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1a7a6e" stopOpacity="0.9" />
          <stop offset="40%"  stopColor="#2d8bb3" stopOpacity="0.85" />
          <stop offset="70%"  stopColor="#1a5568" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0.6" />
        </linearGradient>

        {/* Gold shimmer for rachis */
        }
        <linearGradient id={`rachisGrad-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f0d060" />
          <stop offset="50%"  stopColor="#d4a853" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>

        {/* Eye outer ring - deep teal */}
        <radialGradient id={`eyeOuter-${delay}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%"   stopColor="#2d8bb3" />
          <stop offset="60%"  stopColor="#1a5568" />
          <stop offset="100%" stopColor="#071828" />
        </radialGradient>

        {/* Eye middle - iridescent bronze */}
        <radialGradient id={`eyeMid-${delay}`} cx="40%" cy="35%" r="50%">
          <stop offset="0%"   stopColor="#e5c07b" />
          <stop offset="50%"  stopColor="#d4a853" />
          <stop offset="100%" stopColor="#c9a227" />
        </radialGradient>

        {/* Eye inner - cobalt */}
        <radialGradient id={`eyeInner-${delay}`} cx="45%" cy="40%" r="50%">
          <stop offset="0%"   stopColor="#4ab0e0" />
          <stop offset="60%"  stopColor="#1e5f8a" />
          <stop offset="100%" stopColor="#071828" />
        </radialGradient>

        {/* Highlight */}
        <radialGradient id={`eyeHighlight-${delay}`} cx="35%" cy="30%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Feather tip glow */}
        <filter id={`featherGlow-${delay}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Barb lines (radiating from rachis around the eye) ── */}
      {Array.from({ length: 28 }).map((_, i) => {
        const angle = -100 + i * 8   // spread -100° to +120°
        const rad = (angle * Math.PI) / 180
        const barbLen = i < 5 || i > 22 ? w * 0.28 : w * 0.44
        const startRadius = size * 0.11
        const sx = cx + Math.cos(rad) * startRadius
        const sy = eyeCy + Math.sin(rad) * startRadius
        const ex = cx + Math.cos(rad) * (startRadius + barbLen)
        const ey = eyeCy + Math.sin(rad) * (startRadius + barbLen)
        const alpha = 0.5 + 0.4 * Math.sin((i / 28) * Math.PI)
        return (
          <line
            key={i}
            x1={sx} y1={sy}
            x2={ex} y2={ey}
            stroke={`url(#barbGrad-${delay})`}
            strokeWidth={1.2}
            strokeOpacity={alpha}
            strokeLinecap="round"
          />
        )
      })}

      {/* ── Rachis (central stem) ── */}
      <line
        x1={cx} y1={stemBottom}
        x2={cx} y2={stemTop}
        stroke={`url(#rachisGrad-${delay})`}
        strokeWidth={size * 0.035}
        strokeLinecap="round"
        filter={`url(#featherGlow-${delay})`}
      />

      {/* ── Eye — 4 concentric ellipses ── */}
      {/* Outer dark halo */}
      <ellipse cx={cx} cy={eyeCy} rx={size * 0.22} ry={size * 0.22}
        fill={`url(#eyeOuter-${delay})`} opacity={0.95} />
      {/* Bronze ring */}
      <ellipse cx={cx} cy={eyeCy} rx={size * 0.155} ry={size * 0.155}
        fill={`url(#eyeMid-${delay})`} opacity={0.9} />
      {/* Cobalt center */}
      <ellipse cx={cx} cy={eyeCy} rx={size * 0.1} ry={size * 0.1}
        fill={`url(#eyeInner-${delay})`} opacity={0.95} />
      {/* Dark pupil */}
      <ellipse cx={cx} cy={eyeCy} rx={size * 0.04} ry={size * 0.04}
        fill="#071828" opacity={0.98} />
      {/* Specular highlight */}
      <ellipse cx={cx - size * 0.03} cy={eyeCy - size * 0.03}
        rx={size * 0.025} ry={size * 0.018}
        fill={`url(#eyeHighlight-${delay})`} />
    </svg>
  )
}
