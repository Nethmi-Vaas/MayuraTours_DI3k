"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, Search } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Package } from "@/lib/api"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=600&q=80",
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
]

const DURATIONS = ["All", "1–5 days", "6–9 days", "10+ days"]

export default function ToursPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [duration, setDuration] = useState("All")

  useEffect(() => {
    api.packages.list({ limit: 50, is_active: true })
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = packages.filter(pkg => {
    const matchSearch = !search || pkg.name.toLowerCase().includes(search.toLowerCase()) || pkg.destination.toLowerCase().includes(search.toLowerCase())
    const matchDur = duration === "All" ||
      (duration === "1–5 days" && pkg.duration_days <= 5) ||
      (duration === "6–9 days" && pkg.duration_days >= 6 && pkg.duration_days <= 9) ||
      (duration === "10+ days" && pkg.duration_days >= 10)
    return matchSearch && matchDur
  })

  return (
    <main className="min-h-screen">
      <Header />

      <section className="bg-[#0f3d4c] py-20 px-6 text-center">
        <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Explore Sri Lanka</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">All Tours</h1>
        <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm">
          Every journey hand-crafted across Sri Lanka's most breathtaking landscapes.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search tours or destinations..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {DURATIONS.map(d => (
              <button key={d} onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${duration === d ? "bg-[#0f3d4c] text-white" : "bg-gray-100 text-[#0f3d4c] hover:bg-gray-200"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#faf8f5] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="h-52 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">{packages.length === 0 ? "No tours available yet." : "No tours match your search."}</p>
              <Link href="/custom-quote" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">
                Request a Custom Tour
              </Link>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <>
              <p className="text-sm text-gray-500 mb-6">{filtered.length} tour{filtered.length !== 1 ? "s" : ""} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((pkg, i) => <TourCard key={pkg.id} pkg={pkg} index={i} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function TourCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = pkg.image_url || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
  const price = pkg.discount_price ?? pkg.price
  const discount = pkg.discount_price ? Math.round((1 - pkg.discount_price / pkg.price) * 100) : 0

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {discount > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#1a6b5c] text-white text-xs font-medium rounded">{discount}% OFF</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#0f3d4c] text-lg leading-tight">{pkg.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{pkg.destination}</p>
        {pkg.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{pkg.description}</p>}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pkg.duration_days} Days</span>
          {pkg.max_people && <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Max {pkg.max_people}</span>}
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-[#d4a853] text-[#d4a853]" /> 4.8</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            {pkg.discount_price && <span className="text-sm text-gray-400 line-through">${pkg.price.toLocaleString()}</span>}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0f3d4c]">${price.toLocaleString()}</span>
              <span className="text-xs text-gray-500">/person</span>
            </div>
          </div>
          <Link href={`/packages/${pkg.id}`} className="px-4 py-2 bg-[#0f3d4c] text-white text-sm font-medium rounded-lg hover:bg-[#1a5568] transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
