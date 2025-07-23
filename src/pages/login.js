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
import { useState } from "react"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem("token", data.token) // ✅ فقط در کلاینت اجرا میشه
      router.push("/dashboard") // 👈 همین‌جا
      // window.location.href = "/dashboard1"
    } else {
      setError(data.error || "خطا در ورود")
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-40 mb-20">
        <h1 className="text-2xl font-bold mb-4">ورود به حساب</h1>
        {error && <p className="text-red-600">{error}</p>}

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
          <Link href="/register">
            <button className="w-full bg-green-600 text-white mt-3 py-2 rounded hover:bg-green-700">
              سریع ثبت‌نام کن
            </button>
          </Link>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </div>
      <Footer />
    </>
  )
}
