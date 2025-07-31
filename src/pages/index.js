// import { useState } from "react"
// import Header from "@/components/Header"
// import Hero from "@/components/Hero"
// import ServiceCTA from "@/components/ServiceCTA"
// import CardsSection from "@/components/CardSection"
// import TrustSection from "@/components/TrustSection"
// import Footer from "@/components/Footer"
// import HeroBanner from "@/components/HeroBanner"
// import TestimonialSlider from "@/components/TestimonialSlider"
// import HeadersTam from "@/components/HeaderTam"
// import OfferList from "@/components/OfferList"

// import ChatSheet from "@/components/ChatSheet"
// // import UserList from "@/components/UserList"

// export default function Home() {
//   const [chatOfferId, setChatOfferId] = useState(null)

//   return (
//     <main className="min-h-screen bg-white font-vazir p-6">
//       <OfferList onRequest={setChatOfferId} />

//       <ChatSheet
//         offerId={chatOfferId}
//         open={!!chatOfferId}
//         onOpenChange={(open) => !open && setChatOfferId(null)}
//       />
//       <Header />

//       <Hero />
//       <ServiceCTA />
//       <HeadersTam />
//       <CardsSection />
//       <TestimonialSlider />
//       <TrustSection />
//       <HeroBanner />

//       <Footer />

//       {/* <UserList />  */}
//       <div className="h-11 bg-neutral-300"></div>
//     </main>
//   )
// }

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

export default function Home({ serverDate }) {
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

export async function getServerSideProps(context) {
  const serverDate = new Date().toISOString() // از سمت سرور تاریخ را به‌صورت ISO فرمت کن

  return {
    props: {
      serverDate,
    },
  }
}

// "use client"
// import { useState } from "react"

// export default function Home() {
//   const [open, setOpen] = useState(false)
//   return (
//     <main className="min-h-screen bg-white font-vazir p-6 flex flex-col items-center justify-center">
//       <button
//         onClick={() => setOpen(true)}
//         className="mb-4 px-4 py-2 bg-sky-600 text-white rounded"
//       >
//         باز کردن شیت
//       </button>

//       {/* شیت ساده */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//           onClick={() => setOpen(false)}
//         >
//           <div className="bg-white p-6 rounded shadow-lg text-black">
//             شیت ساده تست
//             <br />
//             <button
//               className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
//               onClick={() => setOpen(false)}
//             >
//               بستن
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   )
// }
// "use client"
// import { useState } from "react"
// import OfferList from "@/components/OfferList"
// import ChatSheet from "@/components/ChatSheet"

// export default function Home() {
//   const [chatOfferId, setChatOfferId] = useState(null)

//   return (
//     <main className="min-h-screen bg-white font-vazir p-6">
//       <h1 className="text-2xl mb-4">تست Chat</h1>
//       <OfferList onRequest={setChatOfferId} />
//       <ChatSheet
//         offerId={chatOfferId}
//         open={!!chatOfferId}
//         onOpenChange={(open) => !open && setChatOfferId(null)}
//       />
//     </main>
//   )
// }
