import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Users, Leaf, Award } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const STATS = [
  { label: "Years of Experience", value: "12+" },
  { label: "Happy Travellers", value: "4,800+" },
  { label: "Destinations Covered", value: "40+" },
  { label: "Expert Guides", value: "25+" },
]

const VALUES = [
  { icon: MapPin, title: "Local Expertise", desc: "Every guide is a Sri Lankan resident who knows the island's hidden soul — not an outsider with a script." },
  { icon: Users, title: "Small Groups", desc: "We cap departures at 12 travellers. Intimacy changes everything: richer access, quieter moments, deeper memories." },
  { icon: Leaf, title: "Sustainable Travel", desc: "Every trip's carbon footprint is calculated and offset. We partner only with eco-conscious properties." },
  { icon: Award, title: "Uncompromising Standards", desc: "Accommodation is handpicked. Itineraries are stress-tested. Nothing goes to guests that hasn't passed our team first." },
]

const TEAM = [
  { name: "Priya Mendis", role: "Founder & Lead Curator", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
  { name: "Roshan Silva", role: "Head of Operations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { name: "Anoma Fernando", role: "Senior Travel Specialist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1400&q=80" alt="About MayuraTours" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Our Story</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">About Mayura Tours</h1>
          <p className="mt-4 text-white/80 max-w-xl text-sm leading-relaxed">
            Born from a passion for authentic travel and a belief that Sri Lanka deserves to be seen — truly seen.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-3">Who We Are</p>
              <h2 className="text-2xl font-bold text-[#0f3d4c] mb-4">Crafted for Those Who Pay Attention</h2>
              <p className="text-gray-600 leading-relaxed text-sm mb-4">
                Mayura Tours was founded on a single conviction: the world's most beautiful places should be explored
                with reverence, not rushed. We design journeys for travellers who want more than photographs —
                they want understanding.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Every itinerary is written by someone who has walked that road, eaten at that table, and watched
                that sunrise. We don't outsource or guess. We build from experience.
              </p>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80" alt="Sri Lanka" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-[#0f3d4c]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-[#d4a853]">{s.value}</p>
              <p className="text-sm text-white/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">What Drives Us</p>
            <h2 className="text-2xl font-bold text-[#0f3d4c]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {VALUES.map(v => (
              <div key={v.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#d4a853] flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-[#0f3d4c]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0f3d4c] mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">The People Behind Your Journey</p>
            <h2 className="text-2xl font-bold text-[#0f3d4c]">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map(m => (
              <div key={m.name} className="text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-[#0f3d4c]">{m.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0f3d4c] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to plan your journey?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/packages" className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-full font-medium hover:bg-[#e5c07b] transition-colors">
            Browse Packages <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-[#0f3d4c] transition-colors">
            Talk to Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
