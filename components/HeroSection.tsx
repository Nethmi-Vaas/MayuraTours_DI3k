"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] bg-[#0f3d4c] overflow-hidden">
      {/* Peacock feather decorations */}
      <div className="absolute top-0 right-0 w-96 h-full">
        <div className="absolute top-4 right-4">
          <PeacockFeather className="w-16 h-24 transform rotate-12" />
        </div>
        <div className="absolute top-20 right-24">
          <PeacockFeather className="w-14 h-20 transform -rotate-6" />
        </div>
        <div className="absolute top-8 right-44">
          <PeacockFeather className="w-12 h-18 transform rotate-3" />
        </div>
        <div className="absolute top-32 right-8">
          <PeacockFeather className="w-10 h-16 transform rotate-20" />
        </div>
        <div className="absolute top-40 right-36">
          <PeacockFeather className="w-8 h-14 transform -rotate-12" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white italic max-w-3xl leading-tight">
          Welcome to Sri Lanka – Explore Paradise Like Never Before
        </h1>
        <p className="mt-4 text-white/80 text-sm md:text-base">
          Turn Your Dream Destinations Into Real Journeys
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            href="/plan-trip"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e07a38] text-white rounded-full font-medium hover:bg-[#c96a2d] transition-colors"
          >
            Plan my trip
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center px-6 py-3 bg-[#e07a38] text-white rounded-full font-medium hover:bg-[#c96a2d] transition-colors"
          >
            Browse tours
          </Link>
        </div>
      </div>
    </section>
  )
}

function PeacockFeather({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Feather stem */}
      <path
        d="M30 100 Q30 60 30 20"
        stroke="#8B7355"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Outer feather shape */}
      <ellipse
        cx="30"
        cy="30"
        rx="22"
        ry="28"
        fill="#1a6b5c"
        opacity="0.9"
      />
      {/* Middle ring - blue */}
      <ellipse
        cx="30"
        cy="28"
        rx="16"
        ry="20"
        fill="#2d8bb3"
        opacity="0.9"
      />
      {/* Inner ring - gold */}
      <ellipse
        cx="30"
        cy="26"
        rx="10"
        ry="12"
        fill="#c9a227"
        opacity="0.95"
      />
      {/* Center eye - dark blue */}
      <ellipse
        cx="30"
        cy="24"
        rx="6"
        ry="7"
        fill="#0f3d4c"
      />
      {/* Highlight */}
      <ellipse
        cx="32"
        cy="22"
        rx="2"
        ry="2.5"
        fill="#ffffff"
        opacity="0.4"
      />
    </svg>
  )
}
