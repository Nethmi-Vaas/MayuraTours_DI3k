import Link from "next/link"
import { ArrowRight, MapPin, Heart, Users } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const OPENINGS = [
  { title: "Senior Travel Consultant", type: "Full-time", location: "Colombo, Sri Lanka", description: "Design bespoke luxury itineraries and manage high-value client relationships." },
  { title: "Destination Experience Guide", type: "Full-time", location: "Various Locations, Sri Lanka", description: "Lead small-group tours across the island with deep local knowledge and storytelling ability." },
  { title: "Digital Marketing Specialist", type: "Full-time", location: "Colombo / Remote", description: "Drive our content strategy, SEO, and paid campaigns to reach discerning global travellers." },
]

const PERKS = [
  { icon: MapPin, label: "Complimentary Familiarisation Trips", desc: "Explore Sri Lanka on us — so you can sell what you genuinely love." },
  { icon: Heart, label: "Wellness Allowance", desc: "$50/month for gym, yoga, or wellbeing of your choice." },
  { icon: Users, label: "Small, Collaborative Team", desc: "No bureaucracy. Ideas go from conversation to execution fast." },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-[#0f3d4c] py-20 px-6 text-center">
        <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">Join the Team</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">Careers</h1>
        <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm">Build your career around the island you love.</p>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-8">Open Positions</h2>
          <div className="space-y-4">
            {OPENINGS.map(job => (
              <div key={job.title} className="border border-gray-200 rounded-xl p-6 hover:border-[#0f3d4c] transition-colors group">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#0f3d4c] text-lg">{job.title}</h3>
                    <div className="flex gap-3 mt-1 text-sm text-gray-500">
                      <span>{job.type}</span><span>·</span><span>{job.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                  </div>
                  <Link href={`/contact?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f3d4c] text-white text-sm font-medium rounded-lg hover:bg-[#1a5568] transition-colors shrink-0">
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            {"Don't see a fit? Send your CV to "}
            <a href="mailto:careers@mayuratours.com" className="text-[#0f3d4c] hover:underline">careers@mayuratours.com</a>.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-8">Why Mayura Tours?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PERKS.map(p => (
              <div key={p.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#d4a853]/20 flex items-center justify-center mx-auto mb-3">
                  <p.icon className="w-5 h-5 text-[#d4a853]" />
                </div>
                <h3 className="font-semibold text-[#0f3d4c] mb-1">{p.label}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
