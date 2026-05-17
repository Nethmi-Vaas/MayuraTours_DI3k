"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Packages",     href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "About",        href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(7,24,40,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(212,168,83,0.2)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
            }
          : {
              background: "linear-gradient(to bottom, rgba(7,24,40,0.7) 0%, transparent 100%)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            {/* Peacock eye logo mark */}
            <svg viewBox="0 0 36 36" width={36} height={36} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="logoOuter" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#2d8bb3" />
                  <stop offset="100%" stopColor="#0f3d4c" />
                </radialGradient>
                <radialGradient id="logoGold" cx="40%" cy="35%" r="50%">
                  <stop offset="0%" stopColor="#f0d060" />
                  <stop offset="100%" stopColor="#c9a227" />
                </radialGradient>
                <radialGradient id="logoInner" cx="45%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#4ab0e0" />
                  <stop offset="100%" stopColor="#1a5568" />
                </radialGradient>
              </defs>
              {/* Outer teal ring */}
              <circle cx="18" cy="13" r="12" fill="url(#logoOuter)" />
              {/* Gold ring */}
              <circle cx="18" cy="13" r="8"  fill="url(#logoGold)" />
              {/* Cobalt center */}
              <circle cx="18" cy="13" r="5"  fill="url(#logoInner)" />
              {/* Dark pupil */}
              <circle cx="18" cy="13" r="2"  fill="#071828" />
              {/* Highlight */}
              <ellipse cx="16" cy="11.5" rx="1.2" ry="0.9" fill="rgba(255,255,255,0.75)" />
              {/* Stem */}
              <line x1="18" y1="25" x2="18" y2="36" stroke="#d4a853" strokeWidth="2" strokeLinecap="round" />
              {/* Barbs hint */}
              {[-8,-5,-2,2,5,8].map((a, i) => {
                const rad = ((a - 90) * Math.PI) / 180
                const sx = 18 + Math.cos(rad) * 5
                const sy = 13 + Math.sin(rad) * 5
                const ex = 18 + Math.cos(rad) * 13
                const ey = 13 + Math.sin(rad) * 13
                return <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
                  stroke="#2d8bb3" strokeWidth="0.9" strokeOpacity="0.7" strokeLinecap="round" />
              })}
            </svg>
          </div>
          <div>
            <span
              className="font-serif text-xl font-bold tracking-wide leading-none block text-shimmer"
              style={{ fontStyle: "italic" }}
            >
              Mayura
            </span>
            <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase block -mt-0.5">
              Tours
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-white/75 hover:text-white rounded-lg transition-colors duration-200 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="hidden sm:inline-flex px-5 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 rounded-full glass-card hover:border-[#d4a853]/50 transition-all duration-300"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="hidden sm:inline-flex px-5 py-2 text-sm font-semibold text-[#071828] rounded-full transition-all duration-300 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #d4a853, #f0d060)" }}
          >
            Register
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-white/10"
          style={{ background: "rgba(7,24,40,0.97)", backdropFilter: "blur(20px)" }}
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm text-white/75 hover:text-white border-b border-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4">
              <Link href="/signin" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-medium text-white/80 border border-white/20 rounded-full glass-card">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold text-[#071828] rounded-full"
                style={{ background: "linear-gradient(135deg, #d4a853, #f0d060)" }}>
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
