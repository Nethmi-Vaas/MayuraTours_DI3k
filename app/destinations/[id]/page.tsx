"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MapPin, Star, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Place, type Package } from "@/lib/api"

export default function DestinationDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [place, setPlace] = useState<Place | null>(null)
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      api.places.get(id),
      api.packages.list({ limit: 50, is_active: true }),
    ]).then(([p, pkgs]) => {
      setPlace(p)
      // Show packages that mention this destination
      const related = pkgs.filter(pkg =>
        pkg.destination.toLowerCase().includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(pkg.destination.toLowerCase())
      )
      setPackages(related.length > 0 ? related : pkgs.slice(0, 3))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const image = place?.image_url || "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80"

  return (
    <main className="min-h-screen">
      <Header />

      {loading ? (
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-4">
          <div className="h-72 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      ) : !place ? (
        <div className="text-center py-20">
          <p className="text-gray-400">Destination not found.</p>
          <Link href="/destinations" className="mt-4 inline-block text-[#d4a853] underline">Back to Destinations</Link>
        </div>
      ) : (
        <>
          <div className="relative h-80 md:h-96">
            <Image src={image} alt={place.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-[#0f3d4c]/55" />
            <div className="absolute bottom-8 left-8 text-white">
              <Link href="/destinations" className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Destinations
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{place.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" /> {place.city}, {place.country}
                {place.rating > 0 && (
                  <><Star className="w-4 h-4 fill-[#d4a853] text-[#d4a853] ml-3" /> {place.rating.toFixed(1)}</>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
            {/* About */}
            {place.description && (
              <div>
                <h2 className="text-xl font-bold text-[#0f3d4c] mb-3">About {place.name}</h2>
                <p className="text-gray-600 leading-relaxed">{place.description}</p>
              </div>
            )}

            {place.best_time_to_visit && (
              <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-xl border border-gray-100">
                <Clock className="w-5 h-5 text-[#d4a853] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Best Time to Visit</p>
                  <p className="text-sm text-[#0f3d4c] font-medium mt-0.5">{place.best_time_to_visit}</p>
                </div>
              </div>
            )}

            {/* Related Packages */}
            {packages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0f3d4c]">Tours featuring {place.name}</h2>
                  <Link href="/packages" className="text-sm text-[#d4a853] hover:underline flex items-center gap-1">
                    All packages <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.slice(0, 3).map((pkg, i) => {
                    const img = pkg.image_url || "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80"
                    return (
                      <Link key={pkg.id} href={`/packages/${pkg.id}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group block">
                        <div className="relative h-40 overflow-hidden">
                          <Image src={img} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#0f3d4c]">{pkg.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{pkg.duration_days} Days · ${(pkg.discount_price ?? pkg.price).toLocaleString()}/person</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="text-center pt-4">
              <Link href="/custom-quote" className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-full font-medium hover:bg-[#e5c07b] transition-colors">
                Plan a Trip to {place.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </>
      )}

      <Footer />
    </main>
  )
}
