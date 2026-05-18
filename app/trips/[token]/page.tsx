'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function img(url?: string | null): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API}${url}`
}

interface MediaItem { id: number; url: string; media_type: string; caption: string | null }
interface Addon { id: number; addon_name: string; quantity: number; unit_price: number; notes: string | null }

interface PlaceInfo { id: number; name: string }

interface Day {
  id: number; day_number: number; date: string
  places: PlaceInfo[]
  place_id: number | null; place_name: string | null
  stay_city: string | null
  hotel_id: number | null; hotel_name: string | null; hotel_city: string | null; room_type: string | null
  guide_id: number | null; guide_name: string | null; guide_photo_url: string | null
  vehicle_id: number | null; vehicle_number: string | null; vehicle_type: string | null
  notes: string | null
  addons: Addon[]
}

interface Package {
  id: number; title: string | null; customer_name: string
  number_of_people: number; start_date: string; end_date: string
  total_price: number; currency: string | null
  payment_link: string | null; payment_method: string | null; payment_notes: string | null
  status: string; days: Day[]
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function ImageGallery({ images, label }: { images: MediaItem[]; label: string }) {
  const [active, setActive] = useState(0)
  if (!images.length) return null
  return (
    <div className="mt-3">
      <div className="relative rounded-xl overflow-hidden bg-gray-100" style={{ height: 220 }}>
        <img
          src={img(images[active].url)!}
          alt={images[active].caption || label}
          className="w-full h-full object-cover"
        />
        {images[active].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
            <p className="text-white text-xs">{images[active].caption}</p>
          </div>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive(i => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 text-lg"
            >‹</button>
            <button
              onClick={() => setActive(i => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 text-lg"
            >›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
          {images.map((m, i) => (
            <button key={m.id} onClick={() => setActive(i)}
              className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === active ? 'border-blue-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={img(m.url)!} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TripPackagePage() {
  const params = useParams()
  const token = params?.token as string

  const [pkg, setPkg] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [placeMedia, setPlaceMedia] = useState<Record<number, MediaItem[]>>({})
  const [hotelMedia, setHotelMedia] = useState<Record<number, MediaItem[]>>({})

  useEffect(() => {
    if (!token) return
    fetch(`${API}/api/tours/view/${token}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: Package) => {
        setPkg(data)
        // Fetch place and hotel images for all days
        const placeIds = [...new Set(data.days.flatMap(d => (d.places || []).map(p => p.id)))]
        const hotelIds = [...new Set(data.days.map(d => d.hotel_id).filter(Boolean) as number[])]
        placeIds.forEach(id =>
          fetch(`${API}/api/media/places/${id}`)
            .then(r => r.json())
            .then(items => setPlaceMedia(prev => ({ ...prev, [id]: items.filter((m: MediaItem) => m.media_type === 'image') })))
            .catch(() => {})
        )
        hotelIds.forEach(id =>
          fetch(`${API}/api/media/hotels/${id}`)
            .then(r => r.json())
            .then(items => setHotelMedia(prev => ({ ...prev, [id]: items.filter((m: MediaItem) => m.media_type === 'image') })))
            .catch(() => {})
        )
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading your package...</p>
        </div>
      </div>
    )
  }

  if (notFound || !pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h1>
          <p className="text-gray-500">This tour package link may have expired or is invalid. Please contact us for assistance.</p>
        </div>
      </div>
    )
  }

  const currency = pkg.currency || 'USD'
  const fmt = (n: number) => `${currency} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const nights = pkg.days.length - 1

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            🌴 Your Personal Tour Package
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {pkg.title || `Tour Package #${pkg.id}`}
          </h1>
          <p className="text-blue-200 text-lg mb-6">
            Prepared especially for <strong className="text-white">{pkg.customer_name}</strong>
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-blue-300 text-xs uppercase font-semibold">Dates</p>
                <p className="font-semibold">{pkg.start_date} → {pkg.end_date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-blue-300 text-xs uppercase font-semibold">Guests</p>
                <p className="font-semibold">{pkg.number_of_people} {pkg.number_of_people === 1 ? 'Person' : 'People'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌙</span>
              <div>
                <p className="text-blue-300 text-xs uppercase font-semibold">Duration</p>
                <p className="font-semibold">
                  {pkg.days.length} {pkg.days.length === 1 ? 'Day' : 'Days'}
                  {nights > 0 ? ` / ${nights} Night${nights > 1 ? 's' : ''}` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-blue-300 text-xs uppercase font-semibold">Total</p>
                <p className="font-bold text-lg">{fmt(pkg.total_price)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Payment CTA banner */}
        {pkg.payment_link && pkg.status !== 'completed' && (
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Ready to Confirm Your Booking?</h2>
                <p className="text-gray-500 text-sm mt-0.5">Complete your payment to secure this tour.</p>
                {pkg.payment_notes && <p className="text-sm text-gray-600 mt-1 italic">{pkg.payment_notes}</p>}
              </div>
              <a href={pkg.payment_link} target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors whitespace-nowrap text-sm">
                💳 Pay {fmt(pkg.total_price)}
              </a>
            </div>
          </div>
        )}

        {/* Day-by-day itinerary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Your Day-by-Day Itinerary</h2>
          <div className="space-y-8">
            {pkg.days.map(day => {
              const allPlaces = day.places?.length ? day.places : (day.place_id ? [{ id: day.place_id, name: day.place_name || 'Destination' }] : [])
              const hImages = day.hotel_id ? (hotelMedia[day.hotel_id] || []) : []
              const guidePhoto = img(day.guide_photo_url)
              const dayTitle = allPlaces.map(p => p.name).join(' · ') || `Day ${day.day_number}`

              return (
                <div key={day.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  {/* Day header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex items-center gap-4">
                    <div className="bg-white text-blue-700 text-sm font-bold w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
                      {day.day_number}
                    </div>
                    <div>
                      <p className="font-bold text-xl">{dayTitle}</p>
                      <p className="text-blue-200 text-sm">{formatDate(day.date)}</p>
                    </div>
                  </div>

                  {/* Place images — one section per place */}
                  {allPlaces.map(pl => {
                    const pImages = placeMedia[pl.id] || []
                    if (!pImages.length) return null
                    return (
                      <div key={pl.id} className="px-6 pt-5">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                          📍 {pl.name}
                        </p>
                        <ImageGallery images={pImages} label={pl.name} />
                      </div>
                    )
                  })}

                  <div className="p-6 space-y-6">
                    {/* Day notes */}
                    {day.notes && (
                      <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">📋 Day Programme</p>
                        <p className="text-amber-900 text-sm leading-relaxed">{day.notes}</p>
                      </div>
                    )}

                    {/* Info grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* Hotel card */}
                      {day.hotel_name && (
                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          {hImages.length > 0
                            ? <ImageGallery images={hImages} label={day.hotel_name} />
                            : (
                              <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                  <span className="text-3xl block">🏨</span>
                                  <span className="text-xs mt-1 block">Hotel</span>
                                </div>
                              </div>
                            )
                          }
                          <div className="px-4 py-3 bg-white">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">🏨 Accommodation</p>
                            <p className="font-bold text-gray-800">{day.hotel_name}</p>
                            {day.hotel_city && <p className="text-xs text-gray-500">{day.hotel_city}</p>}
                            {day.room_type && (
                              <span className="inline-block mt-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {day.room_type}
                              </span>
                            )}
                            {day.stay_city && !day.hotel_city && (
                              <p className="text-xs text-gray-500 mt-0.5">📍 {day.stay_city}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Guide card */}
                      {day.guide_name && (
                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          {guidePhoto
                            ? <img src={guidePhoto} alt={day.guide_name} className="w-full h-32 object-cover object-top" />
                            : (
                              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-32 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-2xl font-bold">
                                  {day.guide_name.charAt(0)}
                                </div>
                              </div>
                            )
                          }
                          <div className="px-4 py-3 bg-white">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">👤 Your Guide</p>
                            <p className="font-bold text-gray-800">{day.guide_name}</p>
                          </div>
                        </div>
                      )}

                      {/* Vehicle info */}
                      {day.vehicle_number && (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-4">
                          <div className="text-3xl">🚌</div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Transport</p>
                            <p className="font-bold text-gray-800">{day.vehicle_number}</p>
                            {day.vehicle_type && <p className="text-xs text-gray-500">{day.vehicle_type}</p>}
                          </div>
                        </div>
                      )}

                      {/* Places to visit list (when no images above) */}
                      {allPlaces.length > 0 && !allPlaces.some(pl => (placeMedia[pl.id] || []).length > 0) && (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-start gap-3 md:col-span-2">
                          <div className="text-2xl mt-0.5">📍</div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Places to Visit</p>
                            <div className="flex flex-wrap gap-2">
                              {allPlaces.map(pl => (
                                <span key={pl.id} className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full border border-blue-100">
                                  {pl.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stay city (only if no hotel) */}
                      {day.stay_city && !day.hotel_name && (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-4">
                          <div className="text-3xl">🏙️</div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Overnight Stay</p>
                            <p className="font-bold text-gray-800">{day.stay_city}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Addons */}
                    {day.addons.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-3">✨ Included Extras</p>
                        <div className="space-y-2">
                          {day.addons.map(a => (
                            <div key={a.id} className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm">
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="font-semibold text-gray-800">{a.addon_name}</span>
                                <span className="text-gray-500">× {a.quantity}</span>
                                {a.notes && <span className="text-gray-400 text-xs italic">({a.notes})</span>}
                              </div>
                              <span className="font-semibold text-purple-700 text-xs whitespace-nowrap ml-3">
                                {fmt(a.unit_price * a.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">💰 Price Summary</h2>
          <div className="flex items-center justify-between py-4 border-t">
            <div>
              <p className="text-gray-600">Total Package Price</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Includes all accommodation, tours, transport, guides and listed extras for {pkg.number_of_people} {pkg.number_of_people === 1 ? 'person' : 'people'}
              </p>
            </div>
            <span className="font-bold text-2xl text-gray-900 whitespace-nowrap ml-4">{fmt(pkg.total_price)}</span>
          </div>
        </div>

        {/* Bottom payment CTA */}
        {pkg.payment_link && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to Book?</h2>
            <p className="text-blue-200 text-sm mb-6">Click below to complete your payment and confirm this tour.</p>
            <a href={pkg.payment_link} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 font-bold px-10 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-base">
              Pay {fmt(pkg.total_price)} →
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pb-6">
          <p>This package was prepared exclusively for <strong>{pkg.customer_name}</strong> · Tour #{pkg.id}</p>
          <p className="mt-1">Questions? Contact us and quote your tour reference number.</p>
        </div>
      </div>
    </div>
  )
}
