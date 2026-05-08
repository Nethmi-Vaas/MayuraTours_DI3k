"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import PeacockLogo from "./PeacockLogo"

export default function DestinationsSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <PeacockLogo className="w-16 h-20" />
            <div>
              <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium">
                Where To Next
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] uppercase tracking-wide">
                Destinations for Your Tours
              </h2>
            </div>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] rounded-full text-sm font-medium hover:bg-[#0f3d4c] hover:text-white transition-colors">
            All destinations
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-[#d4a853] text-sm mb-2">Discover by Essence</p>
        <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
          What draws your spirit? Filter your exploration by the textures and tones of the island.
        </p>

        {/* Destinations Grid - Matching the screenshot layout */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-4xl mx-auto">
          {/* Tea Country - Large left */}
          <div className="relative w-full md:w-72 h-80 rounded-lg overflow-hidden group cursor-pointer flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800&q=80"
              alt="Tea Country"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Tea Country</h3>
              <p className="text-sm text-white/80">Misty Slopes & Heritage Estates</p>
            </div>
          </div>

          {/* Middle Column - Highlands and Sigiriya stacked */}
          <div className="flex flex-col gap-4 flex-shrink-0">
            <div className="relative w-full md:w-44 h-36 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                alt="Highlands"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-base font-semibold">Highlands</h3>
              </div>
            </div>
            <div className="relative w-full md:w-44 h-36 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80"
                alt="Sigiriya"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-base font-semibold">Sigiriya</h3>
              </div>
            </div>
          </div>

          {/* Southern Coast - Large right */}
          <div className="relative w-full md:w-72 h-80 rounded-lg overflow-hidden group cursor-pointer flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Southern Coast"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Southern Coast</h3>
              <p className="text-sm text-white/80">Coastal Charm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
