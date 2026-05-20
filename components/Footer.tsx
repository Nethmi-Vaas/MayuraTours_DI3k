"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-peacock-deep" style={{ background: "linear-gradient(160deg, #071828 0%, #0f3d4c 50%, #071828 100%)" }}>

      {/* Decorative feathers */}
      <div className="absolute top-0 right-0 pointer-events-none">
        <Image src="/feather.png" alt="" aria-hidden width={160} height={448} unoptimized
          className="animate-feather-drift animate-iridescent"
          style={{ "--rot": "-10deg", "--drift": "-15px", opacity: 0.2, filter: "drop-shadow(0 0 10px rgba(45,139,179,0.5))" } as React.CSSProperties} />
      </div>
      <div className="absolute top-8 right-28 pointer-events-none">
        <Image src="/feather.png" alt="" aria-hidden width={90} height={252} unoptimized
          className="animate-feather-float animate-iridescent"
          style={{ "--rot": "15deg", "--drift": "15px", animationDelay: "2.5s", opacity: 0.12, filter: "drop-shadow(0 0 8px rgba(45,139,179,0.4))" } as React.CSSProperties} />
      </div>
      <div className="absolute bottom-0 left-4 pointer-events-none">
        <Image src="/feather.png" alt="" aria-hidden width={120} height={336} unoptimized
          className="animate-feather-sway animate-iridescent"
          style={{ "--rot": "175deg", "--drift": "-15px", animationDelay: "1.2s", opacity: 0.1, filter: "drop-shadow(0 0 8px rgba(45,139,179,0.4))" } as React.CSSProperties} />
      </div>

      {/* Gold divider line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #d4a853, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Mayura Tours"
                width={160}
                height={56}
                className="h-12 w-auto object-contain"
                unoptimized
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Crafting bespoke Sri Lankan journeys with a commitment to luxury, authenticity, and sustainable exploration.
            </p>
            <div className="space-y-2 text-xs text-white/40">
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#d4a853] shrink-0" /><span>Colombo, Sri Lanka</span></div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#d4a853] shrink-0" /><span>+94 11 234 5678</span></div>
              <div className="flex items-center gap-2"><Mail  className="w-3.5 h-3.5 text-[#d4a853] shrink-0" /><span>hello@mayuratours.com</span></div>
            </div>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#d4a853" }}>Expertise</h4>
            <ul className="space-y-3">
              {[
                ["Luxury Tours",      "/tours/luxury"],
                ["Wildlife Safaris",  "/tours/wildlife"],
                ["Wellness Retreats", "/tours/wellness"],
                ["Cultural Journeys", "/packages"],
                ["Honeymoon Specials","/packages"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-3.5 h-px bg-[#d4a853] opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-2 group-hover:ml-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#d4a853" }}>Company</h4>
            <ul className="space-y-3">
              {[
                ["About Us",        "/about"],
                ["Our Philosophy",  "/philosophy"],
                ["Sustainability",  "/sustainability"],
                ["Careers",         "/careers"],
                ["Contact Us",      "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-3.5 h-px bg-[#d4a853] opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-2 group-hover:ml-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#d4a853" }}>Stay Inspired</h4>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Receive curated travel stories and exclusive offers from Sri Lanka's finest journeys.
            </p>
            <div className="flex rounded-full overflow-hidden border border-white/15 focus-within:border-[#d4a853]/60 transition-colors">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 text-sm bg-transparent text-white placeholder-white/30 outline-none min-w-0"
              />
              <button
                className="px-4 py-2.5 shrink-0 transition-all duration-300 hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #d4a853, #c9a227)" }}
              >
                <ArrowRight className="w-4 h-4 text-[#071828]" />
              </button>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Mayura Tours. All rights reserved. Licensed by D3K.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms"   className="text-xs text-white/25 hover:text-white/60 transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="text-xs text-white/25 hover:text-white/60 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
