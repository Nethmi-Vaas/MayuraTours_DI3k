"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"



const FEATHERS = [
  { size: 115, delay: 0,   rotation: -14, opacity: 0.7,  top: "0%",  right: "4%",  anim: "drift" },
  { size: 80,  delay: 1.4, rotation: 12,  opacity: 0.5,  top: "10%", right: "22%", anim: "float" },
  { size: 95,  delay: 2.6, rotation: -28, opacity: 0.55, top: "-4%", right: "14%", anim: "sway"  },
  { size: 60,  delay: 0.7, rotation: 30,  opacity: 0.38, top: "22%", right: "8%",  anim: "drift" },
  { size: 70,  delay: 3.2, rotation: -8,  opacity: 0.42, top: "5%",  right: "32%", anim: "float" },
  { size: 50,  delay: 1.9, rotation: 20,  opacity: 0.3,  top: "28%", right: "26%", anim: "sway"  },
] as const

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "52vh", paddingTop: "72px" }}
    >
      {/* Sigiriya background image */}
      <Image
        src="/Sigiriya.jpeg"
        alt="Sigiriya"
        fill
        priority
        unoptimized
        className="object-cover object-center"
        style={{ opacity: 0.35 }}
      />

      {/* Dark overlay to maintain readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(7,24,40,0.85) 0%, rgba(15,61,76,0.75) 55%, rgba(26,58,42,0.80) 85%, rgba(7,24,40,0.85) 100%)",
        }}
      />

      {/* Animated peacock feathers — right side */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FEATHERS.map((f, i) => (
          <div key={i} className="absolute" style={{ top: f.top, right: f.right }}>
            <Image
              src="/feather.png"
              alt=""
              aria-hidden
              width={f.size}
              height={Math.round(f.size * 2.8)}
              unoptimized
              className={`animate-feather-${f.anim} animate-iridescent`}
              style={{
                "--rot":   `${f.rotation}deg`,
                "--drift": `${(f.rotation % 2 === 0 ? 1 : -1) * 15}px`,
                animationDelay: `${f.delay}s`,
                opacity:   f.opacity,
                filter:    "drop-shadow(0 0 8px rgba(45,139,179,0.5))",
              } as React.CSSProperties}
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
