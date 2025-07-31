// // "use client"

// // import { useState } from "react"

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [error, setError] = useState("")
// //   const [success, setSuccess] = useState("")

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setError("")
// //     setSuccess("")

// //     try {
// //       const res = await fetch("/api/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       })

// //       const data = await res.json()

// //       if (!res.ok) {
// //         setError(data.error || "ورود ناموفق بود")
// //         return
// //       }

// //       setSuccess("ورود موفقیت‌آمیز بود")
// //       // اینجا می‌تونی redirect کنی مثلاً:
// //       // router.push("/dashboard")
// //     } catch (err) {
// //       setError("خطا در ارتباط با سرور")
// //     }
// //   }

// //   return (
// //     <div className="max-w-md mx-auto mt-32 px-4">
// //       <h2 className="text-2xl font-bold text-center mb-6">ورود</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="email"
// //           placeholder="ایمیل"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full border px-4 py-2 rounded-md"
// //         />
// //         <input
// //           type="password"
// //           placeholder="رمز عبور"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full border px-4 py-2 rounded-md"
// //         />
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
// //         >
// //           ورود
// //         </button>
// //         {error && <p className="text-red-500 text-sm">{error}</p>}
// //         {success && <p className="text-green-600 text-sm">{success}</p>}
// //       </form>
// //     </div>
// //   )
// // }

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation" // برای ریدایرکت در Next.js 13 app dir

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setSuccess("")

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()
//       console.log("داده دریافتی:", data)
//       console.log("توکن:", data.token)

//       if (!res.ok) {
//         setError(data.error || "ورود ناموفق بود")
//         return
//       }

//       try {
//         localStorage.setItem("token", data.token)
//         console.log("توکن با موفقیت در localStorage ذخیره شد.")
//       } catch (storageError) {
//         console.error("خطا در ذخیره توکن:", storageError)
//         setError("خطا در ذخیره اطلاعات ورود")
//         return
//       }

//       setSuccess("ورود موفقیت‌آمیز بود")
//       // ریدایرکت به صفحه داشبورد یا صفحه دلخواه:
//       router.push("/dashboard")
//     } catch (err) {
//       console.error("خطا در ارتباط با سرور:", err)
//       setError("خطا در ارتباط با سرور")
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-32 px-4">
//       <h2 className="text-2xl font-bold text-center mb-6">ورود</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="ایمیل"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border px-4 py-2 rounded-md"
//           required
//         />
//         <input
//           type="password"
//           placeholder="رمز عبور"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border px-4 py-2 rounded-md"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//         >
//           ورود
//         </button>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         {success && <p className="text-green-600 text-sm">{success}</p>}
//       </form>
//     </div>
//   )
// }
// src/pages/login.js
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function signInWithGoogle() {
    if (typeof window !== "undefined") {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      })
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    if (typeof window !== "undefined") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) setError(error.message)
      else window.location.href = "/dashboard"
    }
  }

  return (
    <div className="max-w-md mx-auto mt-40 p-4 space-y-4">
      <h1 className="text-2xl font-bold">ورود به حساب</h1>

      {error && <p className="text-red-600">{error}</p>}

      {/* دکمهٔ گوگل */}
      <button
        onClick={signInWithGoogle}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        ورود با گوگل
      </button>

      {/* فرم ایمیل و رمز */}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          ورود
        </button>
      </form>

      <Link
        href="/register"
        className="w-full block text-center bg-green-600 text-white p-2 rounded"
      >
        ثبت‌نام
      </Link>
    </div>
  )
}
