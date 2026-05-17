"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, CheckCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Package } from "@/lib/api"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=600&q=80",
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
]

const LUXURY_FEATURES = [
  "5-star handpicked accommodations",
  "Private chauffeur & vehicle",
  "24/7 personal concierge",
  "Gourmet dining experiences",
  "Exclusive cultural access",
  "Spa & wellness inclusions",
]

export default function LuxuryToursPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.list({ limit: 50, is_active: true })
      .then(pkgs => setPackages(pkgs.filter(p => p.price >= 1500)))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative h-80 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=1400&q=80" alt="Luxury Tours" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Elevated Experiences</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">Luxury Tours</h1>
          <p className="mt-3 text-white/80 max-w-md text-sm">Five-star journeys through Sri Lanka's finest landscapes, stays, and flavours.</p>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#faf8f5] py-10 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {LUXURY_FEATURES.map(f => (
            <div key={f} className="flex items-center gap-2 text-sm text-[#0f3d4c]">
              <CheckCircle className="w-4 h-4 text-[#1a6b5c] shrink-0" /> {f}
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="h-72 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          )}

          {!loading && packages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No luxury packages available yet.</p>
              <Link href="/custom-quote" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium">Request a Bespoke Luxury Package</Link>
            </div>
          )}

          {!loading && packages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} index={i} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = pkg.image_url || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
  const price = pkg.discount_price ?? pkg.price
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3 px-2 py-1 bg-[#d4a853] text-[#0f3d4c] text-xs font-semibold rounded">LUXURY</div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#0f3d4c] text-lg">{pkg.name}</h3>
        <p className="text-sm text-gray-500">{pkg.destination}</p>
        <div className="mt-3 flex gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{pkg.duration_days}d</span>
          {pkg.max_people && <span className="flex items-center gap-1"><Users className="w-4 h-4" />Max {pkg.max_people}</span>}
          <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#d4a853] text-[#d4a853]" />4.9</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#0f3d4c]">${price.toLocaleString()}</span>
            <span className="text-xs text-gray-500">/person</span>
          </div>
          <Link href={`/packages/${pkg.id}`} className="px-4 py-2 bg-[#d4a853] text-[#0f3d4c] text-sm font-semibold rounded-lg hover:bg-[#e5c07b] transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
