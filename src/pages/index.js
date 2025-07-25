import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ServiceCTA from "@/components/ServiceCTA"
import CardsSection from "@/components/CardSection"
import TrustSection from "@/components/TrustSection"
import Footer from "@/components/Footer"
import HeroBanner from "@/components/HeroBanner"
import TestimonialSlider from "@/components/TestimonialSlider"
import HeadersTam from "@/components/HeaderTam"

// import UserList from "@/components/UserList"

export default function Home() {
  const myProduct = { name: "Pen", price: 1, instock: true }
  return (
    <main className="bg-white min-h-screen font-vazir">
      <Header />

      <Hero />
      <ServiceCTA />
      <HeadersTam />
      <CardsSection />
      <TestimonialSlider />
      <TrustSection />
      <HeroBanner />
      <Footer />

      {/* <UserList />  */}
      <div className="h-11 bg-neutral-300"></div>
    </main>
  )
}
