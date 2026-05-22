"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { api } from "@/lib/api"

const COUNTRIES = [
  "Australia", "Canada", "China", "France", "Germany", "India", "Japan", "Netherlands",
  "New Zealand", "Norway", "Singapore", "South Korea", "Sri Lanka", "Sweden",
  "United Kingdom", "United States", "Other",
]

export default function ProfilePage() {
  const { user, token, refreshUser } = useAuth()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    country: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        address: user.address || "",
        country: user.country || "",
      })
    }
  }, [user])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setSuccess(false)
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setSubmitting(true); setError(""); setSuccess(false)
    try {
      await api.auth.updateMe(token, {
        first_name: form.first_name || undefined,
        last_name: form.last_name || undefined,
        phone: form.phone || undefined,
        address: form.address || undefined,
        country: form.country || undefined,
      })
      await refreshUser()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch {
      setError("Failed to update profile. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f3d4c]">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Update your personal information and contact details.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Account info (read-only) */}
        <div className="mb-6 p-4 bg-[#f0f7f4] rounded-xl">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>
          <p className="text-sm text-[#0f3d4c]"><span className="font-medium">Email:</span> {user?.email}</p>
          <p className="text-sm text-[#0f3d4c] mt-1">
            <span className="font-medium">Status:</span>{" "}
            {user?.is_verified ? (
              <span className="text-green-600 font-medium">Verified</span>
            ) : (
              <span className="text-yellow-600 font-medium">Unverified</span>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input name="first_name" value={form.first_name} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input name="last_name" value={form.last_name} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2}
              placeholder="Street address..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c] resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
            <select name="country" value={form.country} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]">
              <option value="">Select country...</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {success && (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-4 py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 shrink-0" /> Profile updated successfully.
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full sm:w-auto px-8 py-2.5 bg-[#0f3d4c] text-white rounded-lg text-sm font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}
