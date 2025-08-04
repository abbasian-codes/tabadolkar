import { useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ServiceCTA from "@/components/ServiceCTA"
import CardsSection from "@/components/CardSection"
import TrustSection from "@/components/TrustSection"
import Footer from "@/components/Footer"
import HeroBanner from "@/components/HeroBanner"
import TestimonialSlider from "@/components/TestimonialSlider"
import HeadersTam from "@/components/HeaderTam"
import OfferList from "@/components/OfferList"

import ChatSheet from "@/components/ChatSheet"

export default function Home() {
  const [chatOfferId, setChatOfferId] = useState(null)

  return (
    <main className="min-h-screen bg-white font-vazir p-6">
      <OfferList onRequest={setChatOfferId} />

      <ChatSheet
        offerId={chatOfferId}
        open={!!chatOfferId}
        onOpenChange={(open) => !open && setChatOfferId(null)}
      />
      <Header />

      <Hero />
      <ServiceCTA />
      <HeadersTam />
      <CardsSection />
      <TestimonialSlider />
      <TrustSection />
      <HeroBanner />

      <Footer />

      <div className="h-11 bg-neutral-300"></div>
    </main>
  )
}

// export async function getServerSideProps(context) {
//   const serverDate = new Date().toISOString() // از سمت سرور تاریخ را به‌صورت ISO فرمت کن

//   return {
//     props: {
//       serverDate,
//     },
//   }
// }

// import { useEffect } from "react"
// import supabase from "../utils/supabase"

// export default function HomePage() {
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data, error }) => {
//       console.log("SESSION DATA:", data)
//       console.log("SESSION ERROR:", error)
//     })
//   }, [])

//   return <div>سلام هستی 👋</div>
// }
