import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Users, Calendar, Leaf } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const PILLARS = [
  {
    icon: MapPin,
    title: "Local guides, always",
    body: "Every tour is led by a resident expert who knows not just the sights, but the stories behind them. We never outsource to third-party agencies.",
  },
  {
    icon: Users,
    title: "Small groups only",
    body: "Maximum 12 travellers per departure — often far fewer. Smaller groups mean richer access, quieter moments, and a guide who remembers your name.",
  },
  {
    icon: Calendar,
    title: "Flexible rebooking",
    body: "Life is unpredictable. Change your travel dates up to 30 days before departure with no fees or penalties — always.",
  },
  {
    icon: Leaf,
    title: "Carbon accounted",
    body: "Every trip's footprint is calculated and offset at no extra cost. We partner with reforestation projects across Sri Lanka's highlands.",
  },
]

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative h-96 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1400&q=80" alt="Philosophy" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2">The Mayura Way</p>
          <h1 className="font-serif text-3xl md:text-5xl text-white italic leading-tight max-w-2xl">
            Crafting the unexpected through uncompromising standards.
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-4">Our Belief</p>
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-6">Travel as a way of understanding</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We believe the purpose of travel is not to check boxes, but to be genuinely changed by places
            and people. That requires slowing down, choosing depth over breadth, and trusting guides who
            know more than you could ever find on a map.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mayura Tours was built in opposition to mass tourism — the rushed itineraries, the packed buses,
            the five-minute photo stops. Every package we design is curated to give you time: time to sit,
            to talk, to wander without a schedule for an hour.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We don't just organize trips. We architect experiences for the discerning few who seek depth,
            authenticity, and environmental stewardship.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-2 text-center">Four Commitments</p>
          <h2 className="text-2xl font-bold text-[#0f3d4c] text-center mb-12">How we travel differently</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PILLARS.map(p => (
              <div key={p.title} className="border-t-2 border-[#d4a853] pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#d4a853] flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[#0f3d4c]" />
                </div>
                <h3 className="font-bold text-[#0f3d4c] text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1400&q=80" alt="Sri Lanka" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/80" />
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to travel the Mayura way?</h2>
          <p className="text-white/70 text-sm mb-8">Join a small group departure or design your own bespoke itinerary.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages" className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4a853] text-[#0f3d4c] rounded-full font-medium hover:bg-[#e5c07b] transition-colors">
              Browse Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/custom-quote" className="inline-flex items-center gap-2 px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-[#0f3d4c] transition-colors">
              Custom Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
