"use client"

import { ChevronRight, MapPin, Users, Calendar, Leaf } from "lucide-react"
import Link from "next/link"
import AnimatedPeacockFeather from "./AnimatedPeacockFeather"

const features = [
  { icon: MapPin,   title: "Local guides, always",    description: "Every tour led by a resident expert – never outsourced." },
  { icon: Users,    title: "Small groups only",        description: "Maximum 12 travelers per departure. Often far fewer." },
  { icon: Calendar, title: "Flexible rebooking",       description: "Change dates up to 30 days before departure, no fees." },
  { icon: Leaf,     title: "Carbon accounted",         description: "Every trip's footprint is calculated and offset – no extra cost." },
]

export default function PhilosophySection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Deep peacock background */}
      <div className="absolute inset-0 bg-peacock-deep"
        style={{ background: "linear-gradient(145deg, #071828 0%, #0f3d4c 45%, #1a3a2a 75%, #071828 100%)" }} />

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(26,107,92,0.2) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(45,139,179,0.15) 0%, transparent 50%)" }} />

      {/* Animated feathers right side */}
      <div className="absolute right-0 top-0 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-4 right-4">
          <AnimatedPeacockFeather size={100} delay={0}   rotation={-8}  opacity={0.35} animate="drift" />
        </div>
        <div className="absolute top-20 right-28">
          <AnimatedPeacockFeather size={70}  delay={1.8} rotation={12}  opacity={0.25} animate="float" />
        </div>
        <div className="absolute bottom-8 right-10">
          <AnimatedPeacockFeather size={80}  delay={3.2} rotation={-20} opacity={0.2}  animate="sway"  />
        </div>
      </div>

      {/* Animated feather left side */}
      <div className="absolute left-0 bottom-0 pointer-events-none overflow-hidden">
        <AnimatedPeacockFeather size={90} delay={2} rotation={170} opacity={0.15} animate="float" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: headline + CTA */}
          <div>
            <p className="text-[10px] tracking-[0.35em] font-semibold uppercase mb-4"
              style={{ color: "#d4a853" }}>Our Philosophy</p>
            <h2 className="font-serif text-3xl md:text-5xl text-white italic leading-tight mb-6">
              Crafting the unexpected through{" "}
              <span className="text-shimmer not-italic font-bold">uncompromising standards.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-8">
              We don&apos;t just organise trips; we architect experiences for the discerning few who seek depth,
              authenticity, and environmental stewardship. Every itinerary is a conversation — never a catalogue.
            </p>
            <Link
              href="/philosophy"
              className="btn-peacock inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-[#d4a853]/50 text-[#d4a853] hover:bg-[#d4a853]/10 transition-all duration-300"
            >
              Explore Our Philosophy
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 hover:border-[#d4a853]/30 transition-all duration-300 group"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.25), rgba(45,139,179,0.2))" }}>
                  <feature.icon className="w-5 h-5 text-[#d4a853]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{feature.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
