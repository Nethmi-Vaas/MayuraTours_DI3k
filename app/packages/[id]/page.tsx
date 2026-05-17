"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Clock, Users, Star, ArrowLeft, CheckCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Package } from "@/lib/api"

export default function PackageDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [pkg, setPkg] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    api.packages.get(id)
      .then(setPkg)
      .catch(() => setPkg(null))
      .finally(() => setLoading(false))
  }, [id])

  const image = pkg?.image_url || "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80"
  const price = pkg?.discount_price ?? pkg?.price ?? 0
  const includes = pkg?.includes ? pkg.includes.split(",").map(s => s.trim()).filter(Boolean) : []

  return (
    <main className="min-h-screen">
      <Header />

      {loading ? (
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-4">
          <div className="h-72 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      ) : !pkg ? (
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-gray-500 text-lg">Package not found.</p>
          <Link href="/packages" className="mt-4 inline-block text-[#d4a853] underline">Back to Packages</Link>
        </div>
      ) : (
        <>
          {/* Hero Image */}
          <div className="relative h-72 md:h-96">
            <Image src={image} alt={pkg.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-[#0f3d4c]/50" />
            <div className="absolute bottom-8 left-8 text-white">
              <Link href="/packages" className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Packages
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{pkg.name}</h1>
              <p className="text-white/80 mt-1">{pkg.destination}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#d4a853]" /> {pkg.duration_days} Days</span>
                  {pkg.max_people && <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#d4a853]" /> Max {pkg.max_people} People</span>}
                  <span className="flex items-center gap-2"><Star className="w-4 h-4 fill-[#d4a853] text-[#d4a853]" /> 4.8 Rating</span>
                </div>

                {pkg.description && (
                  <div>
                    <h2 className="text-xl font-bold text-[#0f3d4c] mb-3">About This Package</h2>
                    <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
                  </div>
                )}

                {includes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-[#0f3d4c] mb-3">What&apos;s Included</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#1a6b5c] shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.itinerary && (
                  <div>
                    <h2 className="text-xl font-bold text-[#0f3d4c] mb-3">Itinerary</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{pkg.itinerary}</p>
                  </div>
                )}
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
                  <div className="mb-4">
                    {pkg.discount_price && (
                      <span className="text-sm text-gray-400 line-through">${pkg.price.toLocaleString()}</span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#0f3d4c]">${price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">/person</span>
                    </div>
                  </div>

                  <Link
                    href={`/contact?package=${pkg.id}&name=${encodeURIComponent(pkg.name)}`}
                    className="w-full block text-center py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors"
                  >
                    Book This Package
                  </Link>
                  <Link
                    href="/custom-quote"
                    className="w-full block text-center py-3 mt-3 border border-[#0f3d4c] text-[#0f3d4c] rounded-lg font-medium hover:bg-[#0f3d4c] hover:text-white transition-colors"
                  >
                    Request Custom Quote
                  </Link>

                  <p className="mt-4 text-xs text-gray-400 text-center">
                    Free cancellation up to 30 days before departure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </main>
  )
}
