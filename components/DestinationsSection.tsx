"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PeacockLogo from "./PeacockLogo"
import { api, type Place } from "@/lib/api"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
]

export default function DestinationsSection() {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.places.list({ limit: 4 })
      .then(setPlaces)
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false))
  }, [])

  const [left, mid1, mid2, right] = [places[0], places[1], places[2], places[3]]

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <PeacockLogo className="w-16 h-20" />
            <div>
              <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium">Where To Next</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] uppercase tracking-wide">
                Destinations for Your Tours
              </h2>
            </div>
          </div>
          <Link
            href="/destinations"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] rounded-full text-sm font-medium hover:bg-[#0f3d4c] hover:text-white transition-colors"
          >
            All destinations <ChevronDown className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-center text-[#d4a853] text-sm mb-2">Discover by Essence</p>
        <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
          What draws your spirit? Filter your exploration by the textures and tones of the island.
        </p>

        {loading && (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-4xl mx-auto">
            <div className="w-full md:w-72 h-80 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
            <div className="flex flex-col gap-4 flex-shrink-0">
              <div className="w-full md:w-44 h-36 rounded-lg bg-gray-200 animate-pulse" />
              <div className="w-full md:w-44 h-36 rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="w-full md:w-72 h-80 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
          </div>
        )}

        {!loading && places.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Destinations coming soon.</p>
            <Link href="/custom-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f3d4c] text-white rounded-full text-sm font-medium hover:bg-[#1a5568] transition-colors">
              Plan a Custom Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!loading && places.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-4xl mx-auto">
            {left && <DestCard place={left} imgFallback={PLACEHOLDER_IMAGES[0]} className="w-full md:w-72 h-80 flex-shrink-0" large />}

            <div className="flex flex-col gap-4 flex-shrink-0">
              {mid1 && <DestCard place={mid1} imgFallback={PLACEHOLDER_IMAGES[1]} className="w-full md:w-44 h-36" />}
              {mid2 && <DestCard place={mid2} imgFallback={PLACEHOLDER_IMAGES[2]} className="w-full md:w-44 h-36" />}
            </div>

            {right && <DestCard place={right} imgFallback={PLACEHOLDER_IMAGES[3]} className="w-full md:w-72 h-80 flex-shrink-0" large />}
          </div>
        )}
      </div>
    </section>
  )
}

function DestCard({ place, imgFallback, className, large }: { place: Place; imgFallback: string; className: string; large?: boolean }) {
  return (
    <Link href={`/destinations/${place.id}`} className={`relative ${className} rounded-lg overflow-hidden group cursor-pointer block`}>
      <Image
        src={place.image_url || imgFallback}
        alt={place.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className={`absolute ${large ? "bottom-4 left-4" : "bottom-3 left-3"} text-white`}>
        <h3 className={`${large ? "text-xl" : "text-base"} font-semibold`}>{place.name}</h3>
        {large && <p className="text-sm text-white/80">{place.city}</p>}
      </div>
    </Link>
  )
}
