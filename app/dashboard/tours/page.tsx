"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Upload, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { api, MyTour } from "@/lib/api"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const STATUS_COLORS: Record<string, string> = {
  pending:     "bg-yellow-100 text-yellow-700",
  approved:    "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed:   "bg-green-100 text-green-700",
  cancelled:   "bg-red-100 text-red-700",
}

const PAYMENT_COLORS: Record<string, string> = {
  unpaid: "text-red-500",
  partial: "text-yellow-500",
  paid: "text-green-600",
}

export default function MyToursPage() {
  const { token } = useAuth()
  const [tours, setTours] = useState<MyTour[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [uploading, setUploading] = useState<number | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadTourIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!token) return
    api.myTours.list(token)
      .then(setTours)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  function triggerUpload(tourId: number) {
    uploadTourIdRef.current = tourId
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    const tourId = uploadTourIdRef.current
    if (!file || !tourId) return
    e.target.value = ""

    setUploading(tourId)
    setUploadError("")
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${API_URL}/api/payment-slips/upload/${tourId}`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error(await res.text())
      setUploadSuccess(tourId)
      setTimeout(() => setUploadSuccess(null), 4000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ""
      setUploadError(msg.includes("too large") ? "File too large (max 10 MB)" : "Upload failed. Try again.")
    } finally {
      setUploading(null)
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-400 text-center py-16">Loading your tours...</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f3d4c]">My Tours</h1>
        <p className="text-sm text-gray-500 mt-1">All your tour bookings and trip requests.</p>
      </div>

      <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf,.webp" className="hidden" onChange={handleFileChange} />

      {uploadError && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" /> {uploadError}
          <button onClick={() => setUploadError("")} className="ml-auto text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {tours.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">You haven't booked any tours yet.</p>
          <a href="/plan-trip"
            className="inline-flex px-6 py-2.5 bg-[#0f3d4c] text-white rounded-full text-sm font-medium hover:bg-[#1a5568] transition-colors">
            Plan Your First Trip
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {tours.map(tour => {
            const isExpanded = expandedId === tour.id
            const canUploadSlip = ["approved", "in_progress"].includes(tour.status) && tour.payment_status !== "paid"

            return (
              <div key={tour.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Tour header */}
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[tour.status] || "bg-gray-100 text-gray-600"}`}>
                        {tour.status.replace("_", " ")}
                      </span>
                      <span className={`text-xs font-medium ${PAYMENT_COLORS[tour.payment_status] || "text-gray-500"}`}>
                        {tour.payment_status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#0f3d4c] truncate">{tour.title || `Tour #${tour.id}`}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {tour.start_date} → {tour.end_date} · {tour.number_of_people} {tour.number_of_people === 1 ? "traveller" : "travellers"}
                    </p>
                    {tour.total_price > 0 && (
                      <p className="text-sm font-medium text-[#0f3d4c] mt-1">
                        {tour.currency || "USD"} {tour.total_price.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {uploadSuccess === tour.id && (
                      <span className="flex items-center gap-1 text-green-600 text-xs">
                        <CheckCircle className="w-3.5 h-3.5" /> Uploaded!
                      </span>
                    )}
                    {canUploadSlip && (
                      <button
                        onClick={() => triggerUpload(tour.id)}
                        disabled={uploading === tour.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f3d4c] text-white rounded-lg text-xs font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
                        <Upload className="w-3.5 h-3.5" />
                        {uploading === tour.id ? "Uploading..." : "Upload Slip"}
                      </button>
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : tour.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded: itinerary */}
                {isExpanded && tour.days.length > 0 && (
                  <div className="border-t border-gray-50 px-5 py-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Itinerary</p>
                    <div className="space-y-2">
                      {tour.days.map(day => (
                        <div key={day.id} className="flex gap-3 text-sm">
                          <span className="w-16 shrink-0 text-xs text-gray-400 pt-0.5">Day {day.day_number}</span>
                          <div>
                            {day.place_name && <span className="font-medium text-[#0f3d4c]">{day.place_name}</span>}
                            {day.hotel_name && <span className="text-gray-500"> · {day.hotel_name}</span>}
                            {day.stay_city && !day.hotel_name && <span className="text-gray-500"> · {day.stay_city}</span>}
                            {day.notes && <p className="text-xs text-gray-400 mt-0.5">{day.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isExpanded && tour.customer_notes && (
                  <div className="border-t border-gray-50 px-5 py-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Notes</p>
                    <p className="text-sm text-gray-600">{tour.customer_notes}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
