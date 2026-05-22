"use client"

import Link from "next/link"
import { MapPin, User, Calendar, CreditCard } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { api, MyTour } from "@/lib/api"
import { useEffect, useState } from "react"

const STATUS_COLORS: Record<string, string> = {
  pending:     "bg-yellow-100 text-yellow-700",
  approved:    "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed:   "bg-green-100 text-green-700",
  cancelled:   "bg-red-100 text-red-700",
}

export default function DashboardPage() {
  const { user, token } = useAuth()
  const [tours, setTours] = useState<MyTour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    api.myTours.list(token)
      .then(setTours)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  const activeTours = tours.filter(t => !["completed", "cancelled"].includes(t.status))
  const completedTours = tours.filter(t => t.status === "completed")

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-[#0f3d4c]">Welcome back, {user?.first_name}!</h1>
        <p className="text-sm text-gray-500 mt-1">Here's an overview of your travels with Mayura Tours.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tours",    value: tours.length,          icon: MapPin,      color: "text-[#0f3d4c]" },
          { label: "Active",         value: activeTours.length,    icon: Calendar,    color: "text-blue-600" },
          { label: "Completed",      value: completedTours.length, icon: CreditCard,  color: "text-green-600" },
          { label: "Profile",        value: user?.is_verified ? "Verified" : "Unverified", icon: User, color: user?.is_verified ? "text-green-600" : "text-yellow-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-2xl font-bold text-[#0f3d4c]">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent tours */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#0f3d4c]">Recent Tours</h2>
          <Link href="/dashboard/tours" className="text-sm text-[#0f3d4c] hover:underline">View all</Link>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 py-4 text-center">Loading...</p>
        ) : tours.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-4">No tours yet. Start planning your Sri Lanka adventure!</p>
            <Link href="/plan-trip"
              className="inline-flex px-5 py-2 bg-[#0f3d4c] text-white rounded-full text-sm font-medium hover:bg-[#1a5568] transition-colors">
              Plan a Trip
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {tours.slice(0, 3).map(tour => (
              <div key={tour.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#0f3d4c]">{tour.title || `Tour #${tour.id}`}</p>
                  <p className="text-xs text-gray-400">{tour.start_date} → {tour.end_date} · {tour.number_of_people} {tour.number_of_people === 1 ? "person" : "people"}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[tour.status] || "bg-gray-100 text-gray-600"}`}>
                  {tour.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/plan-trip"
          className="flex items-center gap-4 bg-white border border-gray-100 shadow-sm rounded-2xl p-5 hover:border-[#d4a853]/50 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-[#f0f7f4] flex items-center justify-center group-hover:bg-[#d4a853]/10 transition-colors">
            <MapPin className="w-5 h-5 text-[#0f3d4c]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0f3d4c]">Plan a New Trip</p>
            <p className="text-xs text-gray-400">Tell us your dream itinerary</p>
          </div>
        </Link>
        <Link href="/dashboard/profile"
          className="flex items-center gap-4 bg-white border border-gray-100 shadow-sm rounded-2xl p-5 hover:border-[#d4a853]/50 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-[#f0f7f4] flex items-center justify-center group-hover:bg-[#d4a853]/10 transition-colors">
            <User className="w-5 h-5 text-[#0f3d4c]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0f3d4c]">Edit Profile</p>
            <p className="text-xs text-gray-400">Update your contact details</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
