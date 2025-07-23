"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function Hero() {
  const [exchanges, setExchanges] = useState([])
  const [currentExchange, setCurrentExchange] = useState("")

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const res = await axios.get("/api/exchanges")
        const texts = res.data.map((item) => item.text)
        setExchanges(texts)
        setCurrentExchange(texts[0] || "")
      } catch (err) {
        console.error("❌ خطا در دریافت تبادل‌ها:", err)
      }
    }

    getExchanges()
  }, [])

  useEffect(() => {
    if (!exchanges.length) return

    const interval = setInterval(() => {
      const next = exchanges[Math.floor(Math.random() * exchanges.length)]
      setCurrentExchange(next)
    }, 4000)

    return () => clearInterval(interval)
  }, [exchanges])

  return (
    <section className="relative bg-[#0094d5] text-white py-22 px-4 text-center overflow-hidden">
      <h1 className="!text-5xl md:text-4xl font-bold mb-8 mt-15">
        تبادل خدمات، بدون پول
      </h1>

      <div className="text-2xl m-8 bg-white/20 px-14 py-2 rounded-full inline-block animate-pulse">
        {currentExchange || "در حال بارگذاری..."}
      </div>

      <p className="!text-2xl md:text-lg mb-6 max-w-2xl mx-auto">
        در تبادل‌کارا مهارت‌هات رو با دیگران معاوضه کن؛ بدون واسطه و با شفافیت
        کامل.
      </p>

      <button className="bg-white text-xl mt-15 text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition">
        شما هم به تبادل‌کارها بپیوندید
      </button>
    </section>
  )
}
