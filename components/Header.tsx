"use client"

import Link from "next/link"
import Image from "next/image"
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
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Mayura Tours"
            width={160}
            height={56}
            className="h-14 w-auto object-contain"
            priority
            unoptimized
          />
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
