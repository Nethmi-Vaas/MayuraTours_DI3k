import Link from "next/link"
import { MapPin, Users, Leaf, Award, ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import SpecialOffers from "@/components/SpecialOffers"
import PackagesByCategory from "@/components/PackagesByCategory"
import Footer from "@/components/Footer"

const WHY_US = [
  { icon: MapPin,  title: "Local Experts",  desc: "Every guide is a Sri Lankan resident with deep knowledge of the island." },
  { icon: Users,   title: "Small Groups",   desc: "Max 12 travellers per departure — intimate and personal, always." },
  { icon: Leaf,    title: "Carbon Neutral", desc: "Every trip is fully carbon offset through certified reforestation." },
  { icon: Award,   title: "Curated Quality",desc: "Handpicked properties that meet our strict sustainability standard." },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── Dark animated hero (~1/4 page) ── */}
      <HeroSection />

      {/* ── Special Offers (cream tint) ── */}
      <SpecialOffers />

      {/* ── Packages by Category (white) ── */}
      <PackagesByCategory />

      {/* ── Thin divider ── */}
      <div className="h-px mx-6" style={{ background: "linear-gradient(90deg, transparent, #e5e7eb, transparent)" }} />

      {/* ── Why Us ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] font-semibold uppercase mb-2" style={{ color: "#d4a853" }}>
              Why Mayura Tours
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c]">
              The difference is in the details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(item => (
              <div key={item.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#d4a853]/30 hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(26,107,92,0.12))" }}>
                  <item.icon className="w-5 h-5 text-[#0f3d4c]" />
                </div>
                <h3 className="font-bold text-[#0f3d4c] text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-14 px-6" style={{ background: "#faf8f5", borderTop: "1px solid #f0e8d0" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] mb-3">
            Can't find the perfect trip?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Our travel specialists will design a bespoke itinerary just for you — tailored to your pace, preferences, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/plan-trip"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white hover:brightness-110 transition-all"
              style={{ background: "#0f3d4c" }}>
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm text-[#0f3d4c] border border-[#0f3d4c]/25 hover:bg-[#0f3d4c]/5 transition-all">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
