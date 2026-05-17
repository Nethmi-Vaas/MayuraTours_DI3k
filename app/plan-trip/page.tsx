"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api } from "@/lib/api"

const TRIP_TYPES = ["Cultural Heritage", "Wildlife & Nature", "Beach & Coast", "Tea Country", "Adventure", "Honeymoon", "Family", "Photography"]
const BUDGETS = ["Under $1,000", "$1,000–$2,000", "$2,000–$3,500", "$3,500–$5,000", "$5,000+"]
const DURATIONS = ["3–5 days", "6–8 days", "9–12 days", "13–16 days", "17+ days"]

export default function PlanTripPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    number_of_people: 2,
    start_date: "",
    end_date: "",
    tripTypes: [] as string[],
    budget: "",
    duration: "",
    customer_notes: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  function toggle(arr: string[], val: string) {
    return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
  }

  async function handleSubmit() {
    if (!form.customer_name || !form.customer_email || !form.start_date || !form.end_date) {
      setError("Please complete all required fields.")
      return
    }
    setSubmitting(true)
    setError("")
    const notes = [
      form.tripTypes.length ? `Trip style: ${form.tripTypes.join(", ")}` : "",
      form.budget ? `Budget: ${form.budget}` : "",
      form.duration ? `Duration preference: ${form.duration}` : "",
      form.customer_notes,
    ].filter(Boolean).join("\n")

    try {
      await api.tours.create({
        title: "Trip Planner Request",
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
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#faf8f5]">
        <Header />
        <div className="max-w-lg mx-auto text-center py-24 px-6">
          <CheckCircle className="w-16 h-16 text-[#1a6b5c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-2">Your plan is on its way!</h2>
          <p className="text-gray-600 mb-6">Our specialist will craft a personalised itinerary and contact you within 24 hours.</p>
          <Link href="/" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">Back to Home</Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1400&q=80" alt="Plan your trip" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">Plan My Trip</h1>
          <p className="mt-2 text-white/80 text-sm">Tell us your dream — we build the rest.</p>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#faf8f5]">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? "bg-[#0f3d4c] text-white" : "bg-gray-200 text-gray-400"}`}>{s}</div>
                {s < 3 && <div className={`flex-1 h-1 rounded ${step > s ? "bg-[#0f3d4c]" : "bg-gray-200"}`} style={{ width: 40 }} />}
              </div>
            ))}
            <span className="text-sm text-gray-500 ml-2">Step {step} of 3</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Step 1: Trip style */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0f3d4c] mb-1">What kind of trip?</h2>
                  <p className="text-sm text-gray-500">Select all that interest you.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRIP_TYPES.map(t => (
                    <button key={t} onClick={() => setForm(f => ({ ...f, tripTypes: toggle(f.tripTypes, t) }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${form.tripTypes.includes(t) ? "bg-[#0f3d4c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget (per person)</label>
                    <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]">
                      <option value="">Select...</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Trip duration</label>
                    <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]">
                      <option value="">Select...</option>
                      {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors flex items-center justify-center gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Dates & group */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-[#0f3d4c]">When are you travelling?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
                    <input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date *</label>
                    <input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                      min={form.start_date || new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Travellers</label>
                  <select value={form.number_of_people} onChange={e => setForm(f => ({ ...f, number_of_people: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{n} {n===1?"person":"people"}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional notes</label>
                  <textarea rows={3} value={form.customer_notes} onChange={e => setForm(f => ({ ...f, customer_notes: e.target.value }))}
                    placeholder="Special requirements, accessibility needs, dietary preferences..."
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c] resize-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors flex items-center justify-center gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-[#0f3d4c]">Your details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input type="text" value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input type="email" value={form.customer_email} onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))}
                      placeholder="you@email.com"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" value={form.customer_phone} onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
                    placeholder="+1 234 567 8900"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">Back</button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className="flex-1 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-lg font-semibold hover:bg-[#e5c07b] transition-colors disabled:opacity-60">
                    {submitting ? "Sending..." : "Get My Plan"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Prefer to browse first?{" "}
            <Link href="/packages" className="text-[#d4a853] hover:underline">View our packages</Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
