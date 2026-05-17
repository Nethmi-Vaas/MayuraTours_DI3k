"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api } from "@/lib/api"

function ContactForm() {
  const searchParams = useSearchParams()
  const packageName = searchParams.get("name") || ""
  const packageId = searchParams.get("package") || ""

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    number_of_people: 2,
    start_date: "",
    end_date: "",
    customer_notes: packageName ? `Interested in: ${packageName}` : "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.customer_name || !form.customer_email || !form.start_date || !form.end_date) {
      setError("Please fill in all required fields.")
      return
    }
    setSubmitting(true)
    setError("")
    try {
      await api.tours.create({
        title: packageName ? `Enquiry: ${packageName}` : "General Enquiry",
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone || undefined,
        number_of_people: Number(form.number_of_people),
        start_date: form.start_date,
        end_date: form.end_date,
        customer_notes: form.customer_notes || undefined,
      })
      setSuccess(true)
    } catch {
      setError("Something went wrong. Please try again or email us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-6">
        <CheckCircle className="w-16 h-16 text-[#1a6b5c] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#0f3d4c] mb-2">Request Received!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. Our team will contact you within 24 hours to discuss your journey.
        </p>
        <Link href="/packages" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">
          Browse More Packages
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Get In Touch</p>
        <h1 className="text-3xl font-bold text-[#0f3d4c]">Book Your Journey</h1>
        <p className="text-gray-500 mt-2 text-sm">Fill in the form below and our team will be in touch within 24 hours.</p>
        {packageName && (
          <div className="mt-4 inline-block px-4 py-2 bg-[#0f3d4c]/10 text-[#0f3d4c] rounded-full text-sm font-medium">
            Package: {packageName}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <input
              type="text" name="customer_name" value={form.customer_name} onChange={handleChange}
              placeholder="John Smith" required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
            <input
              type="email" name="customer_email" value={form.customer_email} onChange={handleChange}
              placeholder="john@example.com" required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
            <input
              type="tel" name="customer_phone" value={form.customer_phone} onChange={handleChange}
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Travelers *</label>
            <select
              name="number_of_people" value={form.number_of_people} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Start Date *</label>
            <input
              type="date" name="start_date" value={form.start_date} onChange={handleChange} required
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred End Date *</label>
            <input
              type="date" name="end_date" value={form.end_date} onChange={handleChange} required
              min={form.start_date || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Requests / Notes</label>
          <textarea
            name="customer_notes" value={form.customer_notes} onChange={handleChange} rows={4}
            placeholder="Tell us about your preferences, special requirements, or any questions..."
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
          className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending Request..." : "Send Booking Request"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to be contacted by our team regarding your enquiry.
        </p>
      </form>
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Header />
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
        <ContactForm />
      </Suspense>
      <Footer />
    </main>
  )
}
