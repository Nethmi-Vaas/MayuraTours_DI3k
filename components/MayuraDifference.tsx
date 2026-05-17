"use client"

import { Shield, Eye, Leaf, Star, Clock, Globe } from "lucide-react"
import AnimatedPeacockFeather from "./AnimatedPeacockFeather"

const PILLARS = [
  { icon: Eye,    title: "Local Insight",       desc: "Every guide is a resident expert with deep roots in the region they lead — never outsourced, never generic." },
  { icon: Shield, title: "Curated Standards",   desc: "Only the finest eco-certified properties make our portfolio. We visit every partner property personally." },
  { icon: Leaf,   title: "Carbon Neutral",      desc: "Every departure is carbon-calculated and fully offset through certified Sri Lankan reforestation projects." },
  { icon: Star,   title: "Small Groups",        desc: "A maximum of 12 travellers per departure. Often far fewer. Intimacy is non-negotiable." },
  { icon: Clock,  title: "Flexible Booking",    desc: "Reschedule up to 30 days before departure with zero fees. Life is unpredictable — your tour shouldn't punish that." },
  { icon: Globe,  title: "Authentic Culture",   desc: "Access to experiences beyond tourist trails — village stays, artisan workshops, and sacred ceremonies." },
]

export default function MayuraDifference() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#faf8f5]">

      {/* Subtle background feather decoration */}
      <div className="absolute -top-8 right-0 opacity-[0.06] pointer-events-none">
        <AnimatedPeacockFeather size={280} delay={0} rotation={-5} opacity={1} animate="float" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-[0.04] pointer-events-none">
        <AnimatedPeacockFeather size={200} delay={3} rotation={165} opacity={1} animate="sway" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[10px] tracking-[0.35em] font-semibold uppercase mb-3"
            style={{ color: "#d4a853" }}>
            The Mayura Difference
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0f3d4c] leading-tight">
            Built by Travellers,<br />
            <span className="italic font-normal">for Travellers Who Pay Attention</span>
          </h2>
          <div className="mt-4 h-0.5 w-20"
            style={{ background: "linear-gradient(90deg, #d4a853, transparent)" }} />
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="group relative p-6 rounded-2xl bg-white border border-transparent hover:border-[#d4a853]/30 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Peacock gradient accent line at top */}
              <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #d4a853, #1a6b5c, #2d8bb3)" }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.15), rgba(26,107,92,0.15))" }}>
                <p.icon className="w-5 h-5" style={{ color: "#0f3d4c" }} />
              </div>
              <h3 className="font-bold text-[#0f3d4c] mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>

              {/* Bottom feather accent dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: "#d4a853" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
