// import { useState } from "react"
// import Link from "next/link"
// import supabase from "@/utils/supabase"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   async function signInWithGoogle() {
//     if (typeof window !== "undefined") {
//       await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: { redirectTo: window.location.origin },
//       })
//     }
//   }

//   async function handleLogin(e) {
//     e.preventDefault()
//     if (typeof window !== "undefined") {
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })
//       if (error) setError(error.message)
//       else window.location.href = "/dashboard"
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-40 p-4 space-y-4">
//       <h1 className="text-2xl font-bold">ورود به حساب</h1>

//       {error && <p className="text-red-600">{error}</p>}

//       {/* دکمهٔ گوگل */}
//       <button
//         onClick={signInWithGoogle}
//         className="w-full bg-blue-600 text-white p-2 rounded"
//       >
//         ورود با گوگل
//       </button>

//       {/* فرم ایمیل و رمز */}
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="email"
//           placeholder="ایمیل"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="رمز عبور"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded"
//         >
//           ورود
//         </button>
//       </form>

//       <Link
//         href="/register"
//         className="w-full block text-center bg-green-600 text-white p-2 rounded"
//       >
//         ثبت‌نام
//       </Link>
//     </div>
//   )
// }
// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import supabase from "@/utils/supabase"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function signInWithGoogle() {
//     if (typeof window !== "undefined") {
//       try {
//         await supabase.auth.signInWithOAuth({
//           provider: "google",
//           options: { redirectTo: window.location.origin + "/dashboard" },
//         })
//       } catch (err) {
//         setError("ورود با گوگل موفق نبود.")
//       }
//     }
//   }

//   async function handleLogin(e) {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) {
//       setError("ایمیل یا رمز عبور اشتباه است.")
//     } else {
//       window.location.href = "/dashboard"
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="max-w-md mx-auto mt-40 p-4 space-y-4 border rounded shadow">
//       <h1 className="text-2xl font-bold text-center">ورود به حساب</h1>

//       {error && <p className="text-red-600 text-sm text-center">{error}</p>}

//       {/* دکمهٔ گوگل */}
//       <button
//         onClick={signInWithGoogle}
//         className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
//       >
//         ورود با گوگل
//       </button>

//       <div className="text-center text-gray-500 text-sm">یا با ایمیل:</div>

//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="email"
//           placeholder="ایمیل"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="رمز عبور"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white p-2 rounded ${
//             loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "در حال ورود..." : "ورود"}
//         </button>
//       </form>

//       <Link
//         href="/join"
//         className="block text-center text-blue-600 hover:underline text-sm"
//       >
//         هنوز حساب نداری؟ ثبت‌نام کن
//       </Link>
//     </div>
//   )
// }
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import supabase from "@/utils/supabase"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  const router = useRouter()

  // اگر کاربر از قبل لاگین کرده، ریدایرکت به داشبورد
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        router.push("/dashboard")
      } else {
        setCheckingSession(false) // فرم را نمایش بده
      }
    }
    checkSession()
  }, [])

  // هندل لاگین
  async function handleLogin(e) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsLoading(false)

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("ایمیل یا رمز عبور اشتباه است.")
      } else {
        setError(error.message)
      }
    } else {
      router.push("/")
    }
  }

  // در حال بررسی سشن: هیچ چیزی نمایش نده
  if (checkingSession) return null

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">ورود به حساب</h1>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded"
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
