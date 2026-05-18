"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Package } from "@/lib/api"

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=600&q=80",
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
]

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.packages.list({ limit: 50, is_active: true })
      .then(setPackages)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-[#0f3d4c] py-20 px-6 text-center">
        <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Explore Sri Lanka</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">
          Tour Packages
        </h1>
        <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm">
          Carefully curated journeys across the pearl of the Indian Ocean — from misty highlands to pristine shores.
        </p>
      </section>

      <section className="py-16 px-6 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="h-52 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Unable to load packages right now.</p>
              <Link href="/contact" className="mt-4 inline-block text-[#d4a853] underline">Contact us for a custom quote</Link>
            </div>
          )}

          {!loading && !error && packages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No packages available at the moment.</p>
              <Link href="/custom-quote" className="mt-4 inline-block px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium">
                Request a Custom Package
              </Link>
            </div>
          )}

          {!loading && !error && packages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <PackageCard key={pkg.id} pkg={pkg} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0f3d4c] text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{"Can't find your perfect trip?"}</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto text-sm">
          Our specialists design bespoke itineraries tailored exclusively to your preferences.
        </p>
        <Link
          href="/custom-quote"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-full font-medium hover:bg-[#e5c07b] transition-colors"
        >
          Request Custom Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer />
    </main>
  )
}

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = pkg.image_url || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
  const price = pkg.discount_price ?? pkg.price
  const originalPrice = pkg.discount_price ? pkg.price : undefined
  const discount = pkg.discount_price ? Math.round((1 - pkg.discount_price / pkg.price) * 100) : 0

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={pkg.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {discount > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#1a6b5c] text-white text-xs font-medium rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-[#0f3d4c] text-lg leading-tight">{pkg.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{pkg.destination}</p>

        {pkg.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{pkg.description}</p>
        )}

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {pkg.duration_days} Days
          </span>
          {pkg.max_people && (
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Max {pkg.max_people}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-[#d4a853] text-[#d4a853]" /> 4.8
          </span>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={`/packages/${pkg.id}`}
            className="px-4 py-2 bg-[#0f3d4c] text-white text-sm font-medium rounded-lg hover:bg-[#1a5568] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
