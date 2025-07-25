// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"

// export default function ServicesPage() {
//   const router = useRouter()
//   const { q = "", category = "" } = router.query
//   const [offers, setOffers] = useState([])

//   useEffect(() => {
//     const params = new URLSearchParams({ q, category })
//     fetch(`/api/offers?${params}`)
//       .then((r) => r.json())
//       .then((d) => setOffers(d.offers || []))
//   }, [q, category])

//   const setParam = (key, value) => {
//     const params = new URLSearchParams(router.query)
//     if (value) params.set(key, value)
//     else params.delete(key)
//     router.replace(
//       { pathname: "/services", query: Object.fromEntries(params) },
//       undefined,
//       { shallow: true }
//     )
//   }

//   return (
//     <main className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">همه خدمات</h1>

//       {/* سرچ و فیلتر */}
//       <div className="flex gap-4 mb-6">
//         <input
//           className="border rounded px-3 py-2 flex-1"
//           placeholder="جستجو در عنوان خدمت..."
//           value={q}
//           onChange={(e) => setParam("q", e.target.value)}
//         />
//         <select
//           className="border rounded px-3 py-2"
//           value={category}
//           onChange={(e) => setParam("category", e.target.value)}
//         >
//           <option value="">همه دسته‌ها</option>
//           <option value="آموزش">آموزش</option>
//           <option value="طراحی">طراحی</option>
//           <option value="برنامه‌نویسی">برنامه‌نویسی</option>
//           <option value="ترجمه">ترجمه</option>
//           <option value="DevOps">DevOps</option>
//         </select>
//       </div>

//       {/* گرید کارت‌ها */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {offers.map((o) => (
//           <div
//             key={o.id}
//             className="border rounded p-4 shadow hover:shadow-lg transition"
//           >
//             <h3 className="font-semibold mb-1">{o.title}</h3>
//             <p className="text-sm text-gray-600 mb-1">{o.category}</p>
//             <p className="text-sm text-gray-800 font-medium">
//               {o.price?.toLocaleString()} تومان
//             </p>
//             <p className="text-xs text-gray-400 mt-2">
//               {new Date(o.created_at).toLocaleDateString("fa-IR")}
//             </p>
//           </div>
//         ))}
//       </div>
//     </main>
//   )
// }
import { useEffect, useState } from "react"
import ServiceCard from "@/components/ServiceCard"

export default function ServicesPage() {
  const [offers, setOffers] = useState([])
  const [profiles, setProfiles] = useState({})

  //   useEffect(() => {
  //     // fetch("/api/offers")
  //     fetch(`/api/offers?page=1&limit=8`)
  //       .then((r) => r.json())
  //       .then(console.log)
  //       .then(async (data) => {
  //         console.log("offers", offers)
  //         console.log("profiles", profiles)
  //         setOffers(data.offers || [])
  //         // برای هر کاربر پروفایلش را می‌گیریم (یا در API ترکیبش کن)
  //         const ids = [...new Set(data.offers.map((o) => o.user_id))]
  //         const res = await fetch(
  //           "/api/profiles?" + ids.map((id) => `id=${id}`).join("&")
  //         )
  //         const pMap = Object.fromEntries(
  //           (await res.json()).map((p) => [p.id, p])
  //         )
  //         setProfiles(pMap)
  //       })
  //   }, [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loadMore = () => {
    const nextPage = page + 1
    fetch(`/api/offers?page=${nextPage}&limit=8`)
      .then((r) => r.json())
      .then((d) => {
        setOffers((prev) => [...prev, ...d.offers])
        setPage(nextPage)
        setHasMore(d.offers.length === 8)
      })
  }
  useEffect(() => {
    fetch(`/api/offers?page=1&limit=8`)
      .then((r) => {
        if (!r.ok) throw new Error("API Error")
        return r.json()
      })
      .then((d) => {
        console.log("API response", d) // خروجی را اینجا ببین
        setOffers(d?.offers || [])
      })
      .catch(console.error)
  }, [])
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">همه خدمات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {offers.map((o) => (
          <ServiceCard key={o.id} offer={o} profile={profiles[o.user_id]} />
        ))}
      </div>
      {/* اگر هنوز ۸ تایی هست و بیشتر داریم */}
      {offers.length % 8 === 0 && offers.length > 0 && (
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
