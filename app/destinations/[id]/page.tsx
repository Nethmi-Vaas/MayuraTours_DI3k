"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MapPin, Star, Clock, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api, type Place, type Package } from "@/lib/api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function resolveUrl(url: string) {
  return url.startsWith("http") ? url : `${API_BASE}${url}`
}

function PhotoGallery({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0)
  if (photos.length === 0) return null
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length)
  const next = () => setIdx(i => (i + 1) % photos.length)

  return (
    <div>
      <h2 className="text-xl font-bold text-[#0f3d4c] mb-4">Photos</h2>
      <div className="relative rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
        <Image src={photos[idx]} alt="Destination photo" fill unoptimized className="object-cover" />
        {photos.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${i === idx ? "border-[#d4a853]" : "border-transparent"}`}>
              <Image src={p} alt="" fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DestinationDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [place, setPlace] = useState<Place | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [pkgImages, setPkgImages] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      api.places.get(id),
      api.packages.list({ limit: 50, is_active: true }),
      fetch(`${API_BASE}/api/media/places/${id}`).then(r => r.json()).catch(() => []),
    ]).then(async ([p, pkgs, media]) => {
      setPlace(p)

      // Resolve all place photos
      const resolved: string[] = (media as { url: string }[]).map(m => resolveUrl(m.url))
      if (resolved.length === 0 && p.image_url) resolved.push(resolveUrl(p.image_url))
      setPhotos(resolved)

      // Related packages
      const related = pkgs.filter(pkg =>
        pkg.destination.toLowerCase().includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(pkg.destination.toLowerCase())
      )
      const shown = related.length > 0 ? related.slice(0, 3) : pkgs.slice(0, 3)
      setPackages(shown)

      // Fetch first media image for each related package
      const imgEntries = await Promise.all(
        shown.map(async (pkg) => {
          if (pkg.image_url) return [pkg.id, resolveUrl(pkg.image_url)] as [number, string]
          try {
            const res = await fetch(`${API_BASE}/api/media/packages/${pkg.id}`)
            const m: { url: string }[] = await res.json()
            if (m.length > 0) return [pkg.id, resolveUrl(m[0].url)] as [number, string]
          } catch {}
          return null
        })
      )
      const map: Record<number, string> = {}
      imgEntries.forEach(e => { if (e) map[e[0]] = e[1] })
      setPkgImages(map)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const heroImage = photos[0]

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
          {/* Hero */}
          <div className="relative h-80 md:h-96 bg-[#0f3d4c]">
            {heroImage && (
              <Image src={heroImage} alt={place.name} fill unoptimized className="object-cover" />
            )}
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

            {/* Best time */}
            {place.best_time_to_visit && (
              <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-xl border border-gray-100">
                <Clock className="w-5 h-5 text-[#d4a853] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Best Time to Visit</p>
                  <p className="text-sm text-[#0f3d4c] font-medium mt-0.5">{place.best_time_to_visit}</p>
                </div>
              </div>
            )}

            {/* Photo gallery — all uploaded photos */}
            {photos.length > 0 && <PhotoGallery photos={photos} />}

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
                  {packages.map((pkg) => {
                    const img = pkgImages[pkg.id]
                    return (
                      <Link key={pkg.id} href={`/packages/${pkg.id}`}
                        className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group block">
                        <div className="relative h-40 overflow-hidden bg-gray-100">
                          {img ? (
                            <Image src={img} alt={pkg.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#0f3d4c]">{pkg.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{pkg.duration_days} Days</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="text-center pt-4">
              <Link href="/custom-quote"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-full font-medium hover:bg-[#e5c07b] transition-colors">
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
