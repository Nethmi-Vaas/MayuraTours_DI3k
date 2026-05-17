"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import AnimatedPeacockFeather from "./AnimatedPeacockFeather"

const FEATHERS = [
  { size: 115, delay: 0,   rotation: -14, opacity: 0.7,  top: "0%",  right: "4%"  },
  { size: 80,  delay: 1.4, rotation: 12,  opacity: 0.5,  top: "10%", right: "22%" },
  { size: 95,  delay: 2.6, rotation: -28, opacity: 0.55, top: "-4%", right: "14%" },
  { size: 60,  delay: 0.7, rotation: 30,  opacity: 0.38, top: "22%", right: "8%"  },
  { size: 70,  delay: 3.2, rotation: -8,  opacity: 0.42, top: "5%",  right: "32%" },
  { size: 50,  delay: 1.9, rotation: 20,  opacity: 0.3,  top: "28%", right: "26%" },
] as const

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "52vh",
        background: "linear-gradient(135deg, #071828 0%, #0f3d4c 55%, #1a3a2a 85%, #071828 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 65%, rgba(45,139,179,0.15) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 72% 30%, rgba(26,107,92,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Animated peacock feathers — right side */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FEATHERS.map((f, i) => (
          <div
            key={i}
            className="absolute"
            style={{ top: f.top, right: f.right }}
          >
            <AnimatedPeacockFeather
              size={f.size}
              delay={f.delay}
              rotation={f.rotation}
              opacity={f.opacity}
              animate={i % 3 === 0 ? "drift" : i % 3 === 1 ? "float" : "sway"}
            />
          </div>
        ))}
      </div>

      {/* Rising particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-rise"
            style={{
              width: 2,
              height: 2,
              left: `${6 + i * 10}%`,
              bottom: `${12 + (i % 3) * 14}%`,
              background: i % 2 === 0 ? "#d4a853" : "#2d8bb3",
              animationDelay: `${i * 0.45}s`,
              animationDuration: `${3.2 + (i % 3) * 0.6}s`,
              "--drift": `${(i % 2 === 0 ? 1 : -1) * 10}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.38em] font-semibold uppercase mb-4" style={{ color: "#d4a853" }}>
            Sri Lanka's Premier Tour Operator
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-1">
            Discover the
          </h1>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 text-shimmer">
            Jewel of Asia
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-md mb-9 leading-relaxed">
            Handcrafted journeys through Sri Lanka's ancient temples, misty highlands,
            and pristine shores — guided by locals who call this paradise home.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan-trip"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-[#071828] hover:brightness-110 transition-all"
              style={{ background: "linear-gradient(135deg, #d4a853, #f0d060)" }}
            >
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-sm text-white border border-white/20 glass-card hover:border-[#d4a853]/50 transition-all"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05))" }}
      />
    </section>
  )
}
