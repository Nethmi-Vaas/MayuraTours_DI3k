"use client"

import { ChevronDown, MapPin, Users, Calendar, Leaf } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: MapPin,
    title: "Local guides, always",
    description: "Every tour led by a resident expert – never outsourced.",
  },
  {
    icon: Users,
    title: "Small groups only",
    description: "Maximum 12 travelers per departure. Often far fewer.",
  },
  {
    icon: Calendar,
    title: "Flexible rebooking",
    description: "Change dates up to 30 days before departure, no fees.",
  },
  {
    icon: Leaf,
    title: "Carbon accounted",
    description: "Every trip's footprint is calculated and offset – no extra cost.",
  },
]

export default function PhilosophySection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Image - Tea plantation with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-[#0f3d4c]/85" />

      {/* Peacock feather decorations - Left side */}
      <div className="absolute left-0 bottom-0 w-64 h-96 opacity-30">
        <PeacockFeatherDecoration position="left" />
      </div>

      {/* Peacock feather decorations - Right side */}
      <div className="absolute right-0 top-0 bottom-0 w-80 opacity-40">
        <PeacockFeatherDecoration position="right" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#d4a853] italic leading-tight">
              Crafting the unexpected through uncompromising standards.
            </h2>
            <Link
              href="/philosophy"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-[#d4a853] text-[#d4a853] rounded-full text-sm font-medium hover:bg-[#d4a853] hover:text-[#0f3d4c] transition-colors"
            >
              Explore Our Philosophy
              <ChevronDown className="w-4 h-4" />
            </Link>
            <p className="mt-8 text-white/70 text-sm leading-relaxed max-w-md">
              We don&apos;t just organize trips; we architect experiences for the discerning few who seek depth, authenticity, and environmental stewardship.
            </p>
          </div>

          {/* Right Content - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="border-t border-white/20 pt-4">
                <div className="w-8 h-8 rounded bg-[#d4a853] flex items-center justify-center mb-3">
                  <feature.icon className="w-4 h-4 text-[#0f3d4c]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PeacockFeatherDecoration({ position }: { position: "left" | "right" }) {
  if (position === "right") {
    return (
      <svg viewBox="0 0 300 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Multiple peacock feathers arranged */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${150 + i * 25}, ${80 + i * 80}) rotate(${-10 + i * 5})`}>
            <ellipse cx="0" cy="0" rx="35" ry="50" fill="#1a6b5c" opacity="0.7" />
            <ellipse cx="0" cy="-5" rx="26" ry="38" fill="#2d8bb3" opacity="0.8" />
            <ellipse cx="0" cy="-8" rx="18" ry="26" fill="#c9a227" opacity="0.9" />
            <ellipse cx="0" cy="-10" rx="10" ry="15" fill="#0f3d4c" />
            <path d={`M0 50 Q0 100 ${-10 + i * 4} 150`} stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.6" />
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(100, 300)">
        <ellipse cx="0" cy="-30" rx="40" ry="55" fill="#1a6b5c" opacity="0.6" />
        <ellipse cx="0" cy="-35" rx="30" ry="42" fill="#2d8bb3" opacity="0.7" />
        <ellipse cx="0" cy="-38" rx="20" ry="28" fill="#c9a227" opacity="0.8" />
        <ellipse cx="0" cy="-40" rx="12" ry="16" fill="#0f3d4c" />
        <path d="M0 25 Q0 80 -20 130" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.5" />
      </g>
    </svg>
  )
}
