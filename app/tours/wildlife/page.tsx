"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Package } from "@/lib/api"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
  "https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
]

export default function WildlifeToursPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.packages.list({ limit: 50, is_active: true })
      .then(pkgs => {
        const wildlife = pkgs.filter(p =>
          p.name.toLowerCase().includes("wildlife") ||
          p.name.toLowerCase().includes("safari") ||
          p.description?.toLowerCase().includes("wildlife") ||
          p.description?.toLowerCase().includes("safari")
        )
        setPackages(wildlife.length > 0 ? wildlife : pkgs)
      })
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative h-80 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1400&q=80" alt="Wildlife Safaris" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Into the Wild</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">Wildlife Safaris</h1>
          <p className="mt-3 text-white/80 max-w-md text-sm">
            Encounter leopards, elephants, and exotic birdlife across Sri Lanka's national parks.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#faf8f5] min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          )}

          {!loading && packages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No wildlife packages available yet.</p>
              <Link href="/custom-quote" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium">Request a Custom Safari</Link>
            </div>
          )}

          {!loading && packages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, i) => {
                const image = pkg.image_url || PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]
                const price = pkg.discount_price ?? pkg.price
                return (
                  <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-[#1a6b5c] text-white text-xs font-medium rounded">WILDLIFE</div>
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
                        <Link href={`/packages/${pkg.id}`} className="px-4 py-2 bg-[#0f3d4c] text-white text-sm font-medium rounded-lg hover:bg-[#1a5568] transition-colors">View Details</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
