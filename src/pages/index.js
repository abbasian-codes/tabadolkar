"use client"
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
import ServiceList from "@/components/ServiceList"
import ChatSheet from "@/components/ChatSheet"

export default function Home() {
  const [chatOfferId, setChatOfferId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("همه")

  return (
    <main className="min-h-screen bg-white font-vazir pt-16 ">
      {/* 🔍 سرچ */}
      <div className="m-5"></div>
      <input
        type="text"
        placeholder="جستجو..."
        className="border p-3  w-full mb-4 "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🧩 دسته‌بندی */}
      <select
        className="border p-2 mb-6"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="همه">همه</option>
        <option value="طراحی">طراحی</option>
        <option value="برنامه‌نویسی">برنامه‌نویسی</option>
        <option value="ترجمه">ترجمه</option>
        {/* 👈 بقیه دسته‌ها رو اینجا اضافه کن */}
      </select>

      {/* 🗂 لیست سرویس‌ها */}
      <ServiceList
        searchTerm={searchTerm}
        category={category}
        onRequest={() => {}}
      />

      {/* 💬 چت */}
      <ChatSheet
        offerId={chatOfferId}
        open={!!chatOfferId}
        onOpenChange={(open) => !open && setChatOfferId(null)}
      />

      {/* 🧱 بقیه بخش‌های صفحه */}
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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
