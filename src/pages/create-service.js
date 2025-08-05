// import { useState } from "react"
// import { useRouter } from "next/router"
// import { supabase } from "../utils/supabase"

// export default function NewService() {
//   const router = useRouter()

//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [category, setCategory] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [errorMsg, setErrorMsg] = useState("")

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setLoading(true)
//     setErrorMsg("")

//     const user = supabase.auth.user()
//     if (!user) {
//       setErrorMsg("لطفاً ابتدا وارد شوید.")
//       setLoading(false)
//       return
//     }

//     const { data, error } = await supabase.from("services").insert([
//       {
//         title,
//         description,
//         category,
//         created_by: user.id,
//         created_at: new Date().toISOString(),
//       },
//     ])

//     setLoading(false)

//     if (error) {
//       setErrorMsg(error.message)
//     } else {
//       router.push("/")
//     }
//   }

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
//       <h1 className="text-2xl font-bold mb-6">ثبت خدمت جدید</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block">
//           <span className="text-gray-700">عنوان</span>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         <label className="block">
//           <span className="text-gray-700">توضیحات</span>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         <label className="block">
//           <span className="text-gray-700">دسته‌بندی</span>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         {errorMsg && <p className="text-red-500">{errorMsg}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "در حال ارسال..." : "ثبت خدمت"}
//         </button>
//       </form>
//     </div>
//   )
// }
import { useState } from "react"
import { useRouter } from "next/router"
import supabase from "@/utils/supabase"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { containsBadWords } from "@/textFilters/filterText"
import useRequireAuth from "@/hooks/useRequireAuth"

export default function NewService() {
  const router = useRouter()
  const { user, loading } = useRequireAuth()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const categories = ["طراحی وب", "برنامه‌نویسی", "دیجیتال مارکتینگ", "مشاوره"]
  const titles = [
    "توسعه‌دهنده فرانت‌اند",
    "طراح گرافیک",
    "مدیر پروژه",
    "مشاور کسب‌وکار",
  ]

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>در حال بررسی وضعیت ورود...</p>
      </main>
    )
  }

  if (!user) {
    return null // چون useRequireAuth خودش ریدایرکت می‌کنه
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormLoading(true)
    setErrorMsg("")
    setSuccessMsg("")

    if (containsBadWords(title) || containsBadWords(description)) {
      setErrorMsg("لطفاً از استفاده از کلمات نامناسب خودداری کنید.")
      setFormLoading(false)
      return
    }

    const { error } = await supabase.from("services").insert([
      {
        title,
        description,
        category,
        created_by: user.id,
        created_at: new Date().toISOString(),
      },
    ])

    setFormLoading(false)

    if (!error) {
      setSuccessMsg("خدمت شما با موفقیت ثبت شد.")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } else {
      setErrorMsg(error.message)
    }
  }
  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          {successMsg && (
            <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
              {errorMsg}
            </div>
          )}
          <h1 className="text-3xl font-bold mb-6 text-center">ثبت خدمت جدید</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-gray-700">عنوان</span>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب عنوان</option>
                {titles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">توضیحات</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">دسته‌بندی</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded`}
            >
              {loading ? "در حال ارسال..." : "ثبت خدمت"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
