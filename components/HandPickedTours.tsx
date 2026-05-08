"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import PeacockLogo from "./PeacockLogo"
import TourCard from "./TourCard"

const filters = ["All Offers", "Natural", "Beach", "Cultural", "Wildlife"]

const tours = [
  {
    id: "cultural-triangle-1",
    title: "Cultural Triangle Heritage",
    description: "Experience the ancient wonders of Sigiriya, Polonnaruwa, and the Dambulla Cave Temple in...",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
    rating: 4.9,
    duration: "7 Days",
    groupSize: "2 Pax",
    category: "Luxury",
    originalPrice: 2490,
    price: 1890,
    tags: ["HERITAGE", "LUXURY"],
    badge: "20% OFF",
    badgeColor: "green" as const,
  },
  {
    id: "southern-coastal-1",
    title: "Southern Coastal Escape",
    description: "Relax on the sun-kissed beaches of Galle and Mirissa with curated whale watching and spa...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    rating: 4.8,
    duration: "5 Days",
    groupSize: "2 Pax",
    category: "Boutique",
    price: 1450,
    tags: ["BEACH", "WELLNESS"],
    badge: "LIMITED OFFER",
    badgeColor: "orange" as const,
  },
  {
    id: "cultural-triangle-2",
    title: "Cultural Triangle Heritage",
    description: "Experience the ancient wonders of Sigiriya, Polonnaruwa, and the Dambulla Cave Temple in...",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
    rating: 4.9,
    duration: "7 Days",
    groupSize: "2 Pax",
    category: "Luxury",
    originalPrice: 2490,
    price: 1890,
    tags: ["HERITAGE", "LUXURY"],
    badge: "20% OFF",
    badgeColor: "green" as const,
  },
  {
    id: "southern-coastal-2",
    title: "Southern Coastal Escape",
    description: "Relax on the sun-kissed beaches of Galle and Mirissa with curated whale watching and spa...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    rating: 4.8,
    duration: "10 Days",
    groupSize: "2 Pax",
    category: "Beach/Coast",
    price: 1450,
    tags: ["BEACH", "WELLNESS"],
    badge: "LIMITED OFFER",
    badgeColor: "orange" as const,
  },
]

export default function HandPickedTours() {
  const [activeFilter, setActiveFilter] = useState("All Offers")

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <PeacockLogo className="w-16 h-20" />
          <div>
            <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium">
              Explore Our Selection
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] uppercase tracking-wide">
              Hand-Picked Tours, Ready to Go
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-[#0f3d4c] text-white"
                    : "bg-gray-100 text-[#0f3d4c] hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
