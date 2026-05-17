"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Users, ArrowRight, Tag } from "lucide-react"
import { api, Package } from "@/lib/api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&q=80",
  "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=700&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80",
]

function resolveImg(url?: string | null, fallback = ""): string {
  if (!url) return fallback
  if (url.startsWith("/")) return `${API_BASE}${url}`
  return url
}

function OfferCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = resolveImg(pkg.image_url) || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
  const finalPrice = pkg.discount_price ?? pkg.price
  const saving = pkg.discount_price ? Math.round(((pkg.price - pkg.discount_price) / pkg.price) * 100) : 0

  return (
    <Link
      href={`/packages/${pkg.id}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={pkg.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Offer badge */}
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #d4a853, #c9a227)" }}>
            <Tag className="w-3 h-3" />
            SPECIAL OFFER
          </div>
          {saving > 0 && (
            <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
              -{saving}%
            </div>
          )}
        </div>
        {/* Duration */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ background: "rgba(7,24,40,0.8)", backdropFilter: "blur(6px)" }}>
          <Clock className="w-3 h-3" />
          {pkg.duration_days} {pkg.duration_days === 1 ? "day" : "days"}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-gray-400 mb-1">{pkg.destination}</p>
        <h3 className="font-bold text-[#0f3d4c] text-base leading-snug mb-3 group-hover:text-[#1a5568] transition-colors line-clamp-2">
          {pkg.name}
        </h3>

        <div className="mt-auto flex items-end justify-between">
          <div>
            {pkg.discount_price && (
              <p className="text-xs text-gray-400 line-through">${pkg.price.toLocaleString()}</p>
            )}
            <p className="text-xl font-bold text-[#0f3d4c]">
              ${finalPrice.toLocaleString()}
              <span className="text-xs font-normal text-gray-400 ml-1">/ person</span>
            </p>
          </div>
          {pkg.max_people && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Users className="w-3 h-3" />
              Max {pkg.max_people}
            </div>
          )}
        </div>
      </div>

      {/* Gold bottom accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #d4a853, #1a6b5c)" }} />
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export default function SpecialOffers() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.specialOffers(8)
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && packages.length === 0) return null

  return (
    <section className="py-16 px-6" style={{ background: "#fffbf3" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4" style={{ color: "#d4a853" }} />
              <p className="text-[10px] tracking-[0.3em] font-semibold uppercase" style={{ color: "#d4a853" }}>
                Limited Time
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c]">Special Offers</h2>
          </div>
          <Link
            href="/packages?filter=special_offer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f3d4c] hover:text-[#1a5568] transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : packages.map((pkg, i) => <OfferCard key={pkg.id} pkg={pkg} index={i} />)
          }
        </div>
      </div>
    </section>
  )
}
