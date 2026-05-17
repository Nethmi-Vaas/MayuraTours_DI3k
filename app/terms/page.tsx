import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-[#0f3d4c] py-16 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
        <p className="text-white/70 mt-2 text-sm">Last updated: January 2025</p>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto prose prose-sm text-gray-600 space-y-8">
          {[
            ["1. Booking & Confirmation", "All bookings are confirmed only upon receipt of a written confirmation from Mayura Tours. A deposit of 30% of the total tour cost is required to secure your booking. The balance is due 30 days prior to departure."],
            ["2. Cancellation Policy", "Cancellations made 30+ days before departure: full deposit refunded minus processing fees. Cancellations 15–29 days before departure: 50% of total tour cost charged. Cancellations within 14 days: no refund. Mayura Tours reserves the right to cancel any tour due to unforeseen circumstances; in such cases, a full refund will be issued."],
            ["3. Travel Insurance", "We strongly recommend all travellers obtain comprehensive travel insurance covering trip cancellation, medical emergencies, and personal liability. Mayura Tours is not liable for any losses arising from failure to hold appropriate insurance."],
            ["4. Pricing & Currency", "All prices are quoted in USD. Prices are subject to change without notice until a booking is confirmed. Once confirmed, the price is guaranteed unless there are extraordinary increases in government taxes or airline surcharges."],
            ["5. Itinerary Changes", "Mayura Tours reserves the right to modify itineraries where necessary due to weather, safety concerns, local conditions, or force majeure events. Substitute arrangements of equal or greater value will be provided where possible."],
            ["6. Liability", "Mayura Tours acts as an agent for transport and accommodation providers. We are not liable for injury, loss, delay, or damage arising from the services of third-party providers. Our maximum liability shall not exceed the total price paid for the tour."],
            ["7. Governing Law", "These terms are governed by the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Sri Lanka."],
          ].map(([title, body]) => (
            <div key={String(title)}>
              <h2 className="text-lg font-bold text-[#0f3d4c] mb-2">{title}</h2>
              <p className="leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
