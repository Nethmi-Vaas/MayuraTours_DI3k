"use client"

import Link from "next/link"

export default function CTASection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Image - Tea plantation */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-[#0f3d4c]/80" />

      {/* Peacock feather decorations */}
      <div className="absolute left-0 bottom-0 w-64 h-80 opacity-25">
        <PeacockDecor side="left" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-72 opacity-35">
        <PeacockDecor side="right" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to experience the difference?
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-8 max-w-xl mx-auto">
          Join a limited departure group and see the world with fresh eyes and a lighter footprint.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-full font-medium hover:bg-[#e5c07b] transition-colors"
          >
            Book Your Journey
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-[#0f3d4c] transition-colors"
          >
            Contact an Advisor
          </Link>
        </div>
      </div>
    </section>
  )
}

function PeacockDecor({ side }: { side: "left" | "right" }) {
  if (side === "right") {
    return (
      <svg viewBox="0 0 280 500" className="w-full h-full" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${140 + i * 30}, ${60 + i * 90}) rotate(${-15 + i * 8})`}>
            <ellipse cx="0" cy="0" rx="32" ry="45" fill="#1a6b5c" opacity="0.7" />
            <ellipse cx="0" cy="-4" rx="24" ry="34" fill="#2d8bb3" opacity="0.8" />
            <ellipse cx="0" cy="-7" rx="16" ry="23" fill="#c9a227" opacity="0.9" />
            <ellipse cx="0" cy="-9" rx="9" ry="13" fill="#0f3d4c" />
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 320" className="w-full h-full" fill="none">
      <g transform="translate(80, 240)">
        <ellipse cx="0" cy="-25" rx="35" ry="48" fill="#1a6b5c" opacity="0.6" />
        <ellipse cx="0" cy="-30" rx="26" ry="36" fill="#2d8bb3" opacity="0.7" />
        <ellipse cx="0" cy="-33" rx="17" ry="24" fill="#c9a227" opacity="0.8" />
        <ellipse cx="0" cy="-35" rx="10" ry="14" fill="#0f3d4c" />
      </g>
    </svg>
  )
}
