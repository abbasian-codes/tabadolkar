"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ServiceList({ onRequest }) {
  const [service, setService] = useState([])

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false })
      .range(0, 19)
      .then(({ data }) => setService(data ?? []))
  }, [])

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">آخرین پیشنهادها</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {service.map((service) => (
          <div key={service.id} className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg">{service.title}</h3>
            <p className="text-sm my-2">{service.description}</p>
            <p className="text-sky-600 font-semibold">{service.price} تومان</p>
            <button
              onClick={() => {
                console.log("service.id =", service.id)
                onRequest(service.id)
              }}
              className="text-xs underline mt-2 cursor-pointer hover:text-sky-800"
            >
              درخواست
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
