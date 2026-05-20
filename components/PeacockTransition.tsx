"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Speed lines radiating from center — give depth/warp feel
const SPEED_LINES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * 360) / 24
  const rad   = (angle * Math.PI) / 180
  const R1 = 18, R2 = 310
  return {
    x1: 250 + Math.cos(rad) * R1,
    y1: 250 + Math.sin(rad) * R1,
    x2: 250 + Math.cos(rad) * R2,
    y2: 250 + Math.sin(rad) * R2,
    color: i % 3 === 0 ? "#d4a853" : i % 3 === 1 ? "#2d8bb3" : "#1a7a6e",
    width: i % 5 === 0 ? 1.8 : i % 2 === 0 ? 1.1 : 0.6,
    delay: 0.04 + i * 0.022,
  }
})

// Expanding portal rings
const RINGS = [
  { r: 80,  delay: 0,    color: "#2d8bb3" },
  { r: 130, delay: 0.07, color: "#d4a853" },
  { r: 180, delay: 0.14, color: "#1a7a6e" },
  { r: 230, delay: 0.21, color: "#2d8bb3" },
]

export default function PeacockTransition() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const prevPath = useRef(pathname)
  const timer    = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    setActive(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(false), 1650)
    return () => clearTimeout(timer.current)
  }, [pathname])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
      style={{
        animation: "peacockOverlay 1.55s ease forwards",
        background: "radial-gradient(ellipse at center, #0d3344 0%, #071828 55%, #030e18 100%)",
      }}
    >
      {/* Portal rings — expand outward to sell the warp-through effect */}
      {RINGS.map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  ring.r * 2,
            height: ring.r * 2,
            border: `1px solid ${ring.color}`,
            opacity: 0.35,
            animation: `peacock3DRingExpand 1.3s ease both ${ring.delay}s`,
          }}
        />
      ))}

      {/* Speed lines — radiate outward like a warp jump */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full"
        style={{ maxWidth: 600, maxHeight: 600, margin: "auto" }}
      >
        <defs>
          <radialGradient id="pt3d-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#d4a853" stopOpacity="0.22" />
            <stop offset="50%"  stopColor="#2d8bb3" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#2d8bb3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient depth glow */}
        <circle cx="250" cy="250" r="240" fill="url(#pt3d-glow)"
          style={{ animation: "peacock3DGlow 1.55s ease forwards" }} />

        {SPEED_LINES.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.color}
            strokeWidth={l.width}
            strokeLinecap="round"
            strokeOpacity={0.75}
            style={{
              strokeDasharray: 300,
              animation: `peacock3DSpeedLine 1.0s ease both ${l.delay}s`,
            }}
          />
        ))}
      </svg>

      {/* 3D Logo — perspective container must wrap the animated child */}
      <div style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}>
        <div
          style={{
            transformStyle: "preserve-3d",
            animation: "peacock3DFlyThrough 1.55s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
          }}
        >
          {/* Fake 3D shadow layer — slightly behind, blurred */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(-30px) translateY(18px) scale(0.9)" }}
          >
            <Image
              src="/logo.png"
              alt=""
              aria-hidden
              width={280}
              height={110}
              className="w-64 h-auto object-contain"
              unoptimized
              style={{ filter: "blur(18px) brightness(0.3) opacity(0.7)" }}
            />
          </div>

          {/* Main logo */}
          <Image
            src="/logo.png"
            alt="Mayura Tours"
            width={280}
            height={110}
            className="w-64 h-auto object-contain relative"
            priority
            unoptimized
            style={{
              filter:
                "drop-shadow(0 0 28px rgba(212,168,83,0.95))" +
                " drop-shadow(0 0 70px rgba(45,139,179,0.5))" +
                " drop-shadow(0 24px 48px rgba(0,0,0,0.85))",
            }}
          />
        </div>
      </div>

      {/* Gold divider + tagline — fades in below the logo */}
      <div
        className="absolute"
        style={{
          top: "calc(50% + 72px)",
          animation: "peacockTextReveal 1.55s ease both 0.15s",
        }}
      >
        <div
          className="h-px w-36 mx-auto mb-2"
          style={{ background: "linear-gradient(90deg, transparent, #d4a853, transparent)" }}
        />
        <p className="text-center text-[9px] tracking-[0.55em] text-[#d4a853]/50 uppercase">
          Sri Lanka
        </p>
      </div>
    </div>
  )
}
