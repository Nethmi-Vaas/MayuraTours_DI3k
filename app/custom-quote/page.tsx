"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api } from "@/lib/api"

const INTERESTS = ["Cultural Heritage", "Wildlife Safari", "Beach & Coast", "Tea Country", "Adventure", "Honeymoon", "Family Trip", "Photography Tour"]

export default function CustomQuotePage() {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    number_of_people: 2,
    start_date: "",
    end_date: "",
    selectedInterests: [] as string[],
    budget: "",
    customer_notes: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function toggleInterest(interest: string) {
    setForm(f => ({
      ...f,
      selectedInterests: f.selectedInterests.includes(interest)
        ? f.selectedInterests.filter(i => i !== interest)
        : [...f.selectedInterests, interest],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.customer_name || !form.customer_email || !form.start_date || !form.end_date) {
      setError("Please fill in all required fields.")
      return
    }
    setSubmitting(true)
    setError("")

    const notes = [
      form.customer_notes,
      form.selectedInterests.length > 0 ? `Interests: ${form.selectedInterests.join(", ")}` : "",
      form.budget ? `Budget range: ${form.budget}` : "",
    ].filter(Boolean).join("\n")

    try {
      await api.tours.create({
        title: "Custom Quote Request",
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone || undefined,
        number_of_people: Number(form.number_of_people),
        start_date: form.start_date,
        end_date: form.end_date,
        customer_notes: notes || undefined,
      })
      setSuccess(true)
    } catch {
      setError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#faf8f5]">
        <Header />
        <div className="max-w-lg mx-auto text-center py-20 px-6">
          <CheckCircle className="w-16 h-16 text-[#1a6b5c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-2">Quote Request Received!</h2>
          <p className="text-gray-600 mb-6">
            Our specialist will craft a bespoke itinerary based on your preferences and reach out within 24 hours.
          </p>
          <Link href="/" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Header />

      <section className="bg-[#0f3d4c] py-16 px-6 text-center">
        <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Bespoke Travel</p>
        <h1 className="text-3xl font-bold text-white">Request a Custom Quote</h1>
        <p className="text-white/70 mt-3 max-w-md mx-auto text-sm">
          Tell us your dream — we will craft a journey that is exclusively yours.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text" name="customer_name" value={form.customer_name} onChange={handleChange}
                placeholder="Your full name" required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <input
                type="email" name="customer_email" value={form.customer_email} onChange={handleChange}
                placeholder="your@email.com" required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input
                type="tel" name="customer_phone" value={form.customer_phone} onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Travelers *</label>
              <select
                name="number_of_people" value={form.number_of_people} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
              <input
                type="date" name="start_date" value={form.start_date} onChange={handleChange} required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date *</label>
              <input
                type="date" name="end_date" value={form.end_date} onChange={handleChange} required
                min={form.start_date || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">What interests you? (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest} type="button" onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    form.selectedInterests.includes(interest)
                      ? "bg-[#0f3d4c] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Approximate Budget (per person)</label>
            <select
              name="budget" value={form.budget} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            >
              <option value="">Select a range...</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 – $2,000">$1,000 – $2,000</option>
              <option value="$2,000 – $3,500">$2,000 – $3,500</option>
              <option value="$3,500 – $5,000">$3,500 – $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us more about your ideal trip</label>
            <textarea
              name="customer_notes" value={form.customer_notes} onChange={handleChange} rows={4}
              placeholder="Dream destinations, accommodation preferences, activities you'd love, dietary needs..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c] resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit" disabled={submitting}
            className="w-full py-3 bg-[#d4a853] text-[#0f3d4c] rounded-lg font-semibold hover:bg-[#e5c07b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting Request..." : "Get My Custom Quote"}
          </button>
        </form>
      </div>

      <Footer />
    </main>
  )
}
