import { useEffect, useState } from "react"
import ServiceCard from "@/components/ServiceCard0"

export default function ServicesPage() {
  const [services, setservices] = useState([])
  const [profiles, setProfiles] = useState({})
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loadMore = () => {
    const nextPage = page + 1
    fetch(`/api/services?page=${nextPage}&limit=8`)
      .then((r) => r.json())
      .then((d) => {
        setservices((prev) => [...prev, ...d.services])
        setPage(nextPage)
        setHasMore(d.services.length === 8)
      })
  }
  useEffect(() => {
    fetch(`/api/services?page=1&limit=8`)
      .then((r) => {
        if (!r.ok) throw new Error("API Error")
        return r.json()
      })
      .then((d) => {
        console.log("API response", d) // خروجی را اینجا ببین
        setservices(d?.services || [])
      })
      .catch(console.error)
  }, [])
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">همه خدمات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((o) => (
          <ServiceCard key={o.id} service={o} profile={profiles[o.user_id]} />
        ))}
      </div>
      {/* اگر هنوز ۸ تایی هست و بیشتر داریم */}
      {services.length % 8 === 0 && services.length > 0 && (
        <div className="text-center mt-8 col-span-full">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            بارگذاری بیشتر
          </button>
        </div>
      )}
    </main>
  )
}
