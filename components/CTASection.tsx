"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import AnimatedPeacockFeather from "./AnimatedPeacockFeather"

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1920&q=80')` }}
      />
      {/* Deep overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(7,24,40,0.92) 0%, rgba(15,61,76,0.88) 50%, rgba(7,24,40,0.92) 100%)" }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 65%)" }} />

      {/* Animated feathers */}
      <div className="absolute left-0 top-0 pointer-events-none">
        <AnimatedPeacockFeather size={140} delay={0}   rotation={10}  opacity={0.3}  animate="drift" />
      </div>
      <div className="absolute left-16 bottom-0 pointer-events-none">
        <AnimatedPeacockFeather size={90}  delay={2.1} rotation={-5}  opacity={0.2}  animate="float" />
      </div>
      <div className="absolute right-0 top-0 pointer-events-none">
        <AnimatedPeacockFeather size={130} delay={1.3} rotation={175} opacity={0.3}  animate="drift" />
      </div>
      <div className="absolute right-20 bottom-4 pointer-events-none">
        <AnimatedPeacockFeather size={80}  delay={3.5} rotation={160} opacity={0.18} animate="sway"  />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Peacock eye icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center glow-peacock"
            style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.2), rgba(45,139,179,0.2))", border: "1px solid rgba(212,168,83,0.3)" }}>
            <Sparkles className="w-6 h-6 text-[#d4a853]" />
          </div>
        </div>

        <p className="text-[10px] tracking-[0.35em] font-semibold uppercase mb-4"
          style={{ color: "#d4a853" }}>Start Your Journey</p>

        <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
          Ready to experience<br />
          <span className="text-shimmer italic">the difference?</span>
        </h2>

        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Join a limited departure group and see Sri Lanka with fresh eyes — guided by locals who love
          this island as much as you will.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/plan-trip"
            className="btn-peacock inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-semibold text-sm text-[#071828] transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #d4a853, #f0d060, #c9a227)" }}
          >
            Plan My Journey
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-sm text-white border border-white/25 glass-card hover:border-[#d4a853]/50 transition-all duration-300"
          >
            Speak with an Advisor
          </Link>
        </div>
      </div>
    </section>
  )
}
