"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TurnstileWidget from "@/components/TurnstileWidget"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/AuthContext"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", password: "", confirm: "" })
  const [showPw, setShowPw] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onTurnstileVerify = useCallback((t: string) => setTurnstileToken(t), [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirm) { setError("Passwords do not match."); return }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return }
    setSubmitting(true); setError("")
    try {
      const res = await api.auth.register({
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        turnstile_token: turnstileToken || undefined,
      })
      if (res.access_token) {
        await login(res.access_token, res.user_id)
      }
      setSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("Human verification")) setError("Please complete the human verification.")
      else if (msg.includes("409") || msg.includes("already")) setError("This email is already registered.")
      else setError("Registration failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#faf8f5]">
        <Header />
        <div className="max-w-md mx-auto text-center py-24 px-6">
          <CheckCircle className="w-16 h-16 text-[#1a6b5c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-2">Welcome to Mayura Tours!</h2>
          <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
          <Link href="/dashboard" className="px-6 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">
            Go to Dashboard
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Header />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0f3d4c]">Create an Account</h1>
          <p className="text-sm text-gray-500 mt-2">Join Mayura Tours and plan your Sri Lanka journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} required placeholder="John"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Smith"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required placeholder="Min. 6 characters"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c] pr-10" />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required placeholder="Repeat password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
          </div>

          <TurnstileWidget onVerify={onTurnstileVerify} />

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
            {submitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#0f3d4c] font-medium hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
      <Footer />
    </main>
  )
}
