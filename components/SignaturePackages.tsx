"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PeacockLogo from "./PeacockLogo"
import { api, type Package } from "@/lib/api"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=600&q=80",
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
]

export default function SignaturePackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.list({ limit: 10, is_active: true })
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  const row1 = packages.slice(0, 5)
  const row2 = packages.slice(5, 10)

  return (
    <section className="py-16 px-6 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <PeacockLogo className="w-16 h-20" />
            <div>
              <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium">Popular This Season</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] uppercase tracking-wide">
                Signature Tour Packages
              </h2>
            </div>
          </div>
          <Link
            href="/packages"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] rounded-full text-sm font-medium hover:bg-[#0f3d4c] hover:text-white transition-colors"
          >
            All Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[1,2,3,4,5].map(i => <div key={i} className="bg-gray-200 rounded-lg h-52 animate-pulse" />)}
            </div>
          </div>
        )}

        {!loading && packages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No packages available yet — check back soon.</p>
            <Link href="/custom-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f3d4c] text-white rounded-full text-sm font-medium hover:bg-[#1a5568] transition-colors">
              Request a Bespoke Package <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!loading && packages.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-5">
              {row1.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} index={i} />)}
            </div>
            {row2.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {row2.map((pkg, i) => <PackageCard key={`${pkg.id}-b`} pkg={pkg} index={i + 5} />)}
              </div>
            )}
          </>
        )}

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/packages" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] rounded-full text-sm font-medium">
            All Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = pkg.image_url || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
  const price = pkg.discount_price ?? pkg.price
  const originalPrice = pkg.discount_price ? pkg.price : undefined
  const discount = pkg.discount_price ? Math.round((1 - pkg.discount_price / pkg.price) * 100) : 0

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-[#1a6b5c] text-white">
            {discount}% OFF
          </div>
        )}
        <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-3 h-3 text-[#0f3d4c]" />
        </button>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#0f3d4c] text-white">TOUR</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#d4a853] text-[#0f3d4c]">{pkg.destination.toUpperCase().slice(0, 10)}</span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-semibold text-[#0f3d4c] text-xs leading-tight">{pkg.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3 fill-[#d4a853] text-[#d4a853]" />
            <span className="text-[10px] font-medium text-[#0f3d4c]">4.8</span>
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-500">
          <span>{pkg.duration_days} Days</span>
          <span>•</span>
          <span>{pkg.max_people ? `Max ${pkg.max_people}` : "2 Pax"}</span>
          <span>•</span>
          <span className="truncate max-w-[60px]">{pkg.destination}</span>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div>
            {originalPrice && <span className="text-[10px] text-gray-400 line-through">${originalPrice.toLocaleString()}</span>}
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-[#0f3d4c]">${price.toLocaleString()}</span>
              <span className="text-[9px] text-gray-500">/person</span>
            </div>
          </div>
          <Link
            href={`/packages/${pkg.id}`}
            className="px-2.5 py-1.5 bg-[#0f3d4c] text-white text-[10px] font-medium rounded hover:bg-[#1a5568] transition-colors uppercase tracking-wide"
          >
            View Journey
          </Link>
        </div>
      </div>
    </div>
  )
}
