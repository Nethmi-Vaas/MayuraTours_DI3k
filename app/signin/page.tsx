"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TurnstileWidget from "@/components/TurnstileWidget"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/AuthContext"

type Tab = "password" | "otp"
type OtpStep = "email" | "code"

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const [tab, setTab] = useState<Tab>("password")
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPw, setShowPw] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // OTP tab state
  const [otpStep, setOtpStep] = useState<OtpStep>("email")
  const [otpEmail, setOtpEmail] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [otpTurnstile, setOtpTurnstile] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current) }
  }, [])

  const startCooldown = () => {
    setResendCooldown(60)
    cooldownRef.current = setInterval(() => {
      setResendCooldown(s => {
        if (s <= 1) { clearInterval(cooldownRef.current!); return 0 }
        return s - 1
      })
    }, 1000)
  }

  const redirect = searchParams.get("redirect") || "/dashboard"

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError("")
    try {
      const res = await api.auth.login({ email: form.email, password: form.password, turnstile_token: turnstileToken || undefined })
      await login(res.access_token, res.user_id)
      router.push(redirect)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("Human verification")) setError("Please complete the human verification.")
      else if (msg.includes("401") || msg.includes("Invalid")) setError("Incorrect email or password.")
      else setError("Sign-in failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError("")
    try {
      await api.auth.requestOtp({ email: otpEmail, turnstile_token: otpTurnstile || undefined })
      setOtpStep("code")
      startCooldown()
    } catch {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError("")
    try {
      const res = await api.auth.verifyOtp({ email: otpEmail, otp_code: otpCode })
      await login(res.access_token, res.user_id)
      router.push(redirect)
    } catch {
      setError("Invalid or expired verification code.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0) return
    setSubmitting(true)
    try {
      await api.auth.requestOtp({ email: otpEmail })
      setOtpCode("")
      startCooldown()
    } catch {
      setError("Failed to resend OTP.")
    } finally {
      setSubmitting(false)
    }
  }

  const onTurnstileVerify = useCallback((t: string) => setTurnstileToken(t), [])
  const onOtpTurnstileVerify = useCallback((t: string) => setOtpTurnstile(t), [])

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Header />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0f3d4c]">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage your tours and bookings.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {(["password", "otp"] as Tab[]).map(t => (
            <button key={t} onClick={() => { setTab(t); setError("") }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? "bg-white text-[#0f3d4c] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t === "password" ? "Password" : "Email OTP"}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {tab === "password" && (
            <form onSubmit={handlePasswordLogin} className="space-y-5">
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
                  <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <TurnstileWidget onVerify={onTurnstileVerify} />
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
                {submitting ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-center text-sm text-gray-500">
                {"Don't have an account?"}{" "}
                <Link href="/register" className="text-[#0f3d4c] font-medium hover:underline">Register</Link>
              </p>
            </form>
          )}

          {tab === "otp" && otpStep === "email" && (
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={otpEmail} onChange={e => setOtpEmail(e.target.value)} required placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f3d4c]" />
              </div>
              <TurnstileWidget onVerify={onOtpTurnstileVerify} />
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
                {submitting ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {tab === "otp" && otpStep === "code" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <p className="text-sm text-gray-600">
                A 6-digit code was sent to <span className="font-semibold">{otpEmail}</span>.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification Code</label>
                <input type="text" value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000" maxLength={6} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-center tracking-widest font-mono text-xl focus:outline-none focus:border-[#0f3d4c]" />
              </div>
              <button type="submit" disabled={submitting || otpCode.length < 6}
                className="w-full py-3 bg-[#0f3d4c] text-white rounded-lg font-medium hover:bg-[#1a5568] transition-colors disabled:opacity-60">
                {submitting ? "Verifying..." : "Verify & Sign In"}
              </button>
              <div className="flex items-center justify-between text-sm">
                <button type="button" onClick={() => { setOtpStep("email"); setError(""); setOtpCode("") }}
                  className="text-gray-500 hover:text-gray-700">← Change email</button>
                <button type="button" onClick={handleResendOtp} disabled={resendCooldown > 0 || submitting}
                  className="text-[#0f3d4c] hover:underline disabled:opacity-50 disabled:no-underline">
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5]" />}>
      <SignInContent />
    </Suspense>
  )
}
