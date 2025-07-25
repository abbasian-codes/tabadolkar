"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function OfferList({ onRequest }) {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false })
      .range(0, 19)
      .then(({ data }) => setOffers(data ?? []))
  }, [])

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">آخرین پیشنهادها</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.id} className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">{offer.title}</h3>
            <p className="text-sm my-2">{offer.description}</p>
            <p className="text-sky-600 font-semibold">{offer.price} تومان</p>
            <button
              onClick={() => onRequest(offer.id)}
              className="text-xs underline mt-2"
            >
              درخواست
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
