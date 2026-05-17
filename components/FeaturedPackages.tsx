"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Users, ArrowRight, MapPin } from "lucide-react"
import { api, Package } from "@/lib/api"

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
  "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80",
]

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = pkg.image_url || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
  const price = pkg.discount_price ?? pkg.price

  return (
    <Link
      href={`/packages/${pkg.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={pkg.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Duration badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ background: "rgba(15,61,76,0.85)", backdropFilter: "blur(6px)" }}>
          <Clock className="w-3 h-3" />
          {pkg.duration_days} {pkg.duration_days === 1 ? "day" : "days"}
        </div>
        {/* Discount badge */}
        {pkg.discount_price && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: "#d4a853", color: "#071828" }}>
            OFFER
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          <MapPin className="w-3 h-3" />
          {pkg.destination}
        </div>
        <h3 className="font-bold text-[#0f3d4c] text-base leading-snug mb-2 group-hover:text-[#1a5568] transition-colors line-clamp-2">
          {pkg.name}
        </h3>
        {pkg.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {pkg.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            {pkg.discount_price && (
              <p className="text-xs text-gray-400 line-through">${pkg.price.toLocaleString()}</p>
            )}
            <p className="text-lg font-bold" style={{ color: "#0f3d4c" }}>
              ${price.toLocaleString()}
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
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  )
}

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.list({ limit: 6, is_active: true })
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] font-semibold uppercase mb-2" style={{ color: "#d4a853" }}>
              Handpicked for You
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c]">
              Featured Packages
            </h2>
          </div>
          <Link
            href="/packages"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f3d4c] hover:text-[#1a5568] transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm mb-4">No packages available right now.</p>
            <Link href="/plan-trip"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: "#0f3d4c" }}>
              Request a Custom Tour <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}

        {/* Mobile: view all */}
        {packages.length > 0 && (
          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: "#0f3d4c" }}
            >
              View All Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
