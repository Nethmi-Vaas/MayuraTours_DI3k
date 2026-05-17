import Image from "next/image"
import Link from "next/link"
import { Leaf, TreePine, Heart, Sun } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const INITIATIVES = [
  { icon: Leaf, title: "Carbon Offsetting", desc: "Every departure's carbon footprint is calculated and fully offset through certified reforestation projects in Sri Lanka's central highlands. Included in all package prices — no extras." },
  { icon: TreePine, title: "Forest Partnerships", desc: "We partner with three reforestation NGOs that plant native trees across degraded land. Travellers receive a digital certificate with the impact of their specific trip." },
  { icon: Heart, title: "Community Employment", desc: "100% of our guides are residents of the areas they operate in. We prioritise minority communities and women-led cooperatives in supplier selection." },
  { icon: Sun, title: "Eco-Property Standards", desc: "Properties must pass our 12-point sustainability checklist covering energy, water, waste, and biodiversity to be listed in our portfolio." },
]

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative h-80 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1400&q=80" alt="Sustainability" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0f3d4c]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <Leaf className="w-10 h-10 text-[#d4a853] mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide">Sustainability</h1>
          <p className="mt-3 text-white/80 max-w-md text-sm">We believe exploration and stewardship are not in conflict — they are inseparable.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium mb-3">Our Commitment</p>
          <h2 className="text-2xl font-bold text-[#0f3d4c] mb-4">Travel that gives back</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Sri Lanka is one of the world's biodiversity hotspots — and one of its most fragile. We take
            seriously our responsibility to protect what makes this island extraordinary so that future
            generations of travellers can experience the same magic.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every decision we make — from the properties we list to the routes we drive — is weighed
            against its environmental and social impact. Sustainability is not a marketing promise for us;
            it is an operating standard.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f3d4c] text-center mb-10">Our Initiatives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {INITIATIVES.map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#1a6b5c]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#1a6b5c]" />
                </div>
                <h3 className="font-bold text-[#0f3d4c] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#1a6b5c] text-center">
        <p className="text-white/80 text-sm mb-2">Every Mayura Tours package includes carbon offsetting</p>
        <p className="text-2xl font-bold text-white">At no extra cost to you.</p>
      </section>

      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold text-[#0f3d4c] mb-4">Travel responsibly with us</h2>
        <Link href="/packages" className="inline-flex items-center gap-2 px-8 py-3 bg-[#0f3d4c] text-white rounded-full font-medium hover:bg-[#1a5568] transition-colors">
          Browse Our Packages
        </Link>
      </section>

      <Footer />
    </main>
  )
}
