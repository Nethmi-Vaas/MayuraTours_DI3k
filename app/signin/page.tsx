"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { api } from "@/lib/api"

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError("")
    try {
      const res = await api.auth.login({ email: form.email, password: form.password })
      localStorage.setItem("user_token", res.access_token)
      localStorage.setItem("user_id", String(res.user_id))
      window.location.href = "/packages"
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("401") || msg.includes("Invalid")) setError("Incorrect email or password.")
      else setError("Sign-in failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Header />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0f3d4c]">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage your tours and bookings.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required placeholder="Your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c] pr-10" />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {"Don't have an account?"}{" "}
            <Link href="/register" className="text-[#0f3d4c] font-medium hover:underline">Register</Link>
          </p>
        </form>
      </div>
      <Footer />
    </main>
  )
}
