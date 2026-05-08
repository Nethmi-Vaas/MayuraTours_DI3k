import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import HandPickedTours from "@/components/HandPickedTours"
import SignaturePackages from "@/components/SignaturePackages"
import CuratedExperiences from "@/components/CuratedExperiences"
import CustomQuoteBanner from "@/components/CustomQuoteBanner"
import DestinationsSection from "@/components/DestinationsSection"
import MayuraDifference from "@/components/MayuraDifference"
import PhilosophySection from "@/components/PhilosophySection"
import CTASection from "@/components/CTASection"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HandPickedTours />
      <SignaturePackages />
      <CuratedExperiences />
      <CustomQuoteBanner />
      <DestinationsSection />
      <MayuraDifference />
      <PhilosophySection />
      <CTASection />
      <Footer />
    </main>
  )
}
