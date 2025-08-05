"use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import Link from "next/link"
// import supabase from "@/utils/supabase"

// export default function Dashboard() {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const router = useRouter()

//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser()

//       if (error || !user) {
//         router.push("/login")
//       } else {
//         setUser(user)
//         setLoading(false)
//       }
//     }

//     getUser()
//   }, [])

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push("/login")
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//         >
//           خروج
//         </button>
//         <Link href="/create-service">ثبت خدمت جدید</Link>
//       </header>

//       <main className="max-w-7xl mx-auto">
//         {loading && (
//           <p className="text-center text-gray-600">در حال بارگذاری...</p>
//         )}

//         {!loading && user && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white rounded shadow p-6">
//               <h2 className="text-xl font-semibold mb-4">اطلاعات کاربر</h2>
//               <p>
//                 <strong>آیدی:</strong> {user.id}
//               </p>
//               <p>
//                 <strong>ایمیل:</strong> {user.email}
//               </p>
//             </div>

//             <div className="bg-white rounded shadow p-6">
//               <h2 className="text-xl font-semibold mb-4">متا</h2>
//               <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48">
//                 {JSON.stringify(user.user_metadata, null, 2)}
//               </pre>
//             </div>

//             <div className="bg-white rounded shadow p-6">
//               <h2 className="text-xl font-semibold mb-4">توضیحات</h2>
//               <p className="text-gray-700">
//                 این داشبورد با اطلاعات Supabase کاربر احراز هویت شده نمایش داده
//                 شده است.
//               </p>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }
// "use client"

// import useRequireAuth from "@/hooks/useRequireAuth"
// import Link from "next/link"
// import { useRouter } from "next/router"
// import { useState } from "react"
// import supabase from "@/utils/supabase"

// export default function Dashboard() {
//   const { user, loading } = useRequireAuth()
//   const router = useRouter()
//   const [error, setError] = useState("")

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut()
//     if (error) {
//       setError("خطا در خروج از حساب کاربری")
//     } else {
//       router.replace("/login")
//     }
//   }

//   if (loading) {
//     return (
//       <main className="flex items-center justify-center min-h-screen">
//         <p>در حال بارگذاری...</p>
//       </main>
//     )
//   }

//   if (!user) {
//     // کاربر ریدایرکت شده است، بهتر است هیچ چیز رندر نشود
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//         >
//           خروج
//         </button>
//         <Link href="/create-service" className="text-blue-600 underline">
//           ثبت خدمت جدید
//         </Link>
//       </header>

//       <main className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">اطلاعات کاربر</h2>
//             <p>
//               <strong>آیدی:</strong> {user.id}
//             </p>
//             <p>
//               <strong>ایمیل:</strong> {user.email}
//             </p>
//           </div>

//           <div className="bg-white rounded shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">متا</h2>
//             <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48">
//               {JSON.stringify(user.user_metadata, null, 2)}
//             </pre>
//           </div>

//           <div className="bg-white rounded shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">توضیحات</h2>
//             <p className="text-gray-700">
//               این داشبورد با اطلاعات Supabase کاربر احراز هویت شده نمایش داده
//               شده است.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
// pages/dashboard.js
"use client"

import useRequireAuth from "@/hooks/useRequireAuth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import supabase from "@/utils/supabase"

export default function Dashboard() {
  const { user, loading } = useRequireAuth()
  const router = useRouter()
  const [error, setError] = useState("")

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError("خطا در خروج از حساب کاربری")
    } else {
      router.replace("/login")
    }
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>در حال بارگذاری...</p>
      </main>
    )
  }

  if (!user) {
    // کاربر ریدایرکت شده است، بهتر است هیچ چیز رندر نشود
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          خروج
        </button>
        <Link href="/create-service" className="text-blue-600 underline">
          ثبت خدمت جدید
        </Link>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">اطلاعات کاربر</h2>
            <p>
              <strong>آیدی:</strong> {user.id}
            </p>
            <p>
              <strong>ایمیل:</strong> {user.email}
            </p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">متا</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48">
              {JSON.stringify(user.user_metadata, null, 2)}
            </pre>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">توضیحات</h2>
            <p className="text-gray-700">
              این داشبورد با اطلاعات Supabase کاربر احراز هویت شده نمایش داده
              شده است.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
