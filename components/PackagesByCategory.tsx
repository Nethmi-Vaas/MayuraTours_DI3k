"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight, ChevronRight } from "lucide-react"
import { api, CategoryGroup, Package } from "@/lib/api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
  "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80",
]

function resolveImg(url?: string | null, fallback = ""): string {
  if (!url) return fallback
  if (url.startsWith("/")) return `${API_BASE}${url}`
  return url
}

const CATEGORY_ICONS: Record<string, string> = {
  cultural:  "🏛️",
  wildlife:  "🦁",
  wellness:  "🧘",
  luxury:    "✨",
  adventure: "🏔️",
  beach:     "🏖️",
  honeymoon: "💑",
}

const CATEGORY_ACCENT: Record<string, string> = {
  cultural:  "#d4a853",
  wildlife:  "#1a6b5c",
  wellness:  "#7c5cbf",
  luxury:    "#c9a227",
  adventure: "#e07a38",
  beach:     "#2d8bb3",
  honeymoon: "#d4607a",
}

function MiniCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = resolveImg(pkg.image_url) || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
  const price = pkg.discount_price ?? pkg.price

  return (
    <Link
      href={`/packages/${pkg.id}`}
      className="group flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
        <Image src={image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 truncate">{pkg.destination}</p>
        <p className="text-sm font-semibold text-[#0f3d4c] line-clamp-1 group-hover:text-[#1a5568] transition-colors">{pkg.name}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />{pkg.duration_days}d
          </div>
        </div>
      </div>
    </Link>
  )
}

function CategorySection({ group }: { group: CategoryGroup }) {
  const [showAll, setShowAll] = useState(false)
  const accent = CATEGORY_ACCENT[group.category] || "#0f3d4c"
  const icon = CATEGORY_ICONS[group.category] || "🌍"
  const visible = showAll ? group.packages : group.packages.slice(0, 4)
  const hasMore = group.packages.length > 4

  return (
    <div>
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{icon}</span>
          <div>
            <h3 className="text-lg font-bold text-[#0f3d4c]">{group.label}</h3>
            <div className="h-0.5 rounded-full mt-0.5 w-12" style={{ background: accent }} />
          </div>
        </div>
        <Link
          href={`/packages?category=${group.category}`}
          className="flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: accent }}
        >
          All {group.packages.length} <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Package mini-cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {visible.map((pkg, i) => <MiniCard key={pkg.id} pkg={pkg} index={i} />)}
      </div>

      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-3 w-full py-2 text-xs font-medium rounded-xl border border-dashed border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
        >
          +{group.packages.length - 4} more in {group.label}
        </button>
      )}
    </div>
  )
}

function SkeletonSection() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 bg-gray-200 rounded" />
        <div className="h-5 bg-gray-200 rounded w-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PackagesByCategory() {
  const [groups, setGroups] = useState<CategoryGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.byCategory()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && groups.length === 0) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] font-semibold uppercase mb-2" style={{ color: "#d4a853" }}>
              Explore by Interest
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c]">Browse by Category</h2>
          </div>
          <Link
            href="/packages"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f3d4c] hover:text-[#1a5568] transition-colors"
          >
            All packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category grid — 2 cols on large screens */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <SkeletonSection />
            <SkeletonSection />
            <SkeletonSection />
            <SkeletonSection />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {groups.map(group => (
              <CategorySection key={group.category} group={group} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
