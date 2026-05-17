"use client"

import { useState, useEffect } from "react"
import { SlidersHorizontal, ArrowRight } from "lucide-react"
import Link from "next/link"
import PeacockLogo from "./PeacockLogo"
import TourCard from "./TourCard"
import { api, type Package } from "@/lib/api"

const FILTERS = ["All", "Short (1-5 days)", "Medium (6-9 days)", "Long (10+ days)"]

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
]

function pkgToCard(pkg: Package, i: number) {
  return {
    id: String(pkg.id),
    title: pkg.name,
    description: pkg.description || `Explore ${pkg.destination} on this ${pkg.duration_days}-day curated journey.`,
    image: pkg.image_url || PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
    rating: 4.8,
    duration: `${pkg.duration_days} Days`,
    groupSize: pkg.max_people ? `${pkg.max_people} Pax` : "2 Pax",
    category: pkg.destination,
    originalPrice: pkg.discount_price ? pkg.price : undefined,
    price: pkg.discount_price ?? pkg.price,
    tags: ["TOUR", pkg.destination.toUpperCase().slice(0, 8)],
    badge: pkg.discount_price ? `${Math.round((1 - pkg.discount_price / pkg.price) * 100)}% OFF` : undefined,
    badgeColor: "green" as const,
  }
}

export default function HandPickedTours() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.list({ limit: 8, is_active: true })
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = packages.filter(pkg => {
    if (activeFilter === "Short (1-5 days)") return pkg.duration_days <= 5
    if (activeFilter === "Medium (6-9 days)") return pkg.duration_days >= 6 && pkg.duration_days <= 9
    if (activeFilter === "Long (10+ days)") return pkg.duration_days >= 10
    return true
  })

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <PeacockLogo className="w-16 h-20" />
          <div>
            <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium">Explore Our Selection</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] uppercase tracking-wide">
              Hand-Picked Tours, Ready to Go
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 mb-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f ? "bg-[#0f3d4c] text-white" : "bg-gray-100 text-[#0f3d4c] hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Link href="/tours" className="flex items-center gap-2 text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            View All Tours
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-72 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-base mb-4">
              {packages.length === 0 ? "No tour packages available yet." : "No packages match this filter."}
            </p>
            <Link href="/custom-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f3d4c] text-white rounded-full text-sm font-medium hover:bg-[#1a5568] transition-colors">
              Request a Custom Tour <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.slice(0, 4).map((pkg, i) => (
              <TourCard key={pkg.id} {...pkgToCard(pkg, i)} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
