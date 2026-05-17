"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Search } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Place } from "@/lib/api"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
]

export default function DestinationsPage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.places.list({ limit: 50 })
      .then(setPlaces)
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = places.filter(p =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen">
      <Header />

      <section className="bg-[#0f3d4c] py-20 px-6 text-center">
        <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Where To Next</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">Destinations</h1>
        <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm">
          Discover the textures, tones, and spirit of Sri Lanka across every corner of the island.
        </p>
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search destinations..."
            className="w-full pl-10 pr-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
          />
        </div>
      </section>

      <section className="py-12 px-6 bg-[#faf8f5] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">
                {places.length === 0 ? "No destinations added yet." : "No destinations match your search."}
              </p>
              <Link href="/custom-quote" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">
                Plan a Custom Journey
              </Link>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <>
              <p className="text-sm text-gray-500 mb-6">{filtered.length} destination{filtered.length !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((place, i) => (
                  <PlaceCard key={place.id} place={place} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function PlaceCard({ place, index }: { place: Place; index: number }) {
  const image = place.image_url || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
  return (
    <Link href={`/destinations/${place.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group block">
      <div className="relative h-48 overflow-hidden">
        <Image src={image} alt={place.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {place.is_featured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#d4a853] text-[#0f3d4c] text-xs font-semibold rounded">Featured</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#0f3d4c] text-lg">{place.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{place.city}, {place.country}</span>
        </div>
        {place.rating > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3.5 h-3.5 fill-[#d4a853] text-[#d4a853]" />
            <span className="text-sm font-medium text-[#0f3d4c]">{place.rating.toFixed(1)}</span>
          </div>
        )}
        {place.best_time_to_visit && (
          <p className="mt-2 text-xs text-gray-500">Best time: {place.best_time_to_visit}</p>
        )}
        <div className="mt-3 text-xs font-medium text-[#0f3d4c] flex items-center gap-1 group-hover:gap-2 transition-all">
          Explore destination →
        </div>
      </div>
    </Link>
  )
}
