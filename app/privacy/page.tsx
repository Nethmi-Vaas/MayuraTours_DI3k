import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-[#0f3d4c] py-16 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="text-white/70 mt-2 text-sm">Last updated: January 2025</p>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto prose prose-sm text-gray-600 space-y-8">
          {[
            ["1. Information We Collect", "We collect information you provide directly — such as your name, email address, phone number, and travel preferences — when you make a booking or enquiry. We also collect usage data through cookies and analytics tools to improve our website."],
            ["2. How We Use Your Information", "Your information is used to: process bookings and communicate about your tour; send relevant travel updates and promotional offers (you may opt out at any time); improve our services and website experience; comply with legal obligations."],
            ["3. Data Sharing", "We share your personal data with accommodation providers, transport operators, and guides as necessary to fulfil your booking. We do not sell your personal data to third parties. We may share data with service providers who process it on our behalf under strict confidentiality agreements."],
            ["4. Data Retention", "We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Booking records are typically retained for 7 years for accounting purposes."],
            ["5. Your Rights", "You have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data (subject to legal retention requirements); opt out of marketing communications at any time by contacting us or clicking 'unsubscribe'."],
            ["6. Cookies", "Our website uses cookies to enhance your browsing experience. You may disable cookies in your browser settings, but some features of the website may not function correctly as a result."],
            ["7. Contact Us", "For any privacy-related questions or to exercise your rights, please contact our Data Protection Officer at privacy@mayuratours.com."],
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
