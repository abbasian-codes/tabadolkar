// import { useState } from "react"
// import Link from "next/link"
// import Footer from "@/components/Footer"
// import Header from "@/components/Header"
// export default function RegisterPage() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [message, setMessage] = useState("")
//   const [avatarFile, setAvatarFile] = useState(null)

//   const handleFileChange = (e) => {
//     setAvatarFile(e.target.files[0])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("فرم ارسال شد")
//     const formData = new FormData()
//     formData.append("name", name)
//     formData.append("email", email)
//     formData.append("password", password)
//     if (avatarFile) {
//       formData.append("avatar", avatarFile)
//     }

//     const res = await fetch("/api/register", {
//       method: "POST",
//       body: formData,
//     })

//     const data = await res.json()

//     if (res.ok) {
//       setMessage("ثبت‌نام موفق بود! حالا وارد شوید.")
//     } else {
//       setMessage(data.error || "خطا در ثبت‌نام")
//     }
//   }

//   return (
//     <>
//       <Header />
//       <div className="max-w-md mx-auto mt-40 mb-20">
//         <h1 className="text-2xl font-bold mb-4">ثبت‌نام</h1>

//         {message && <p className="mb-4 text-red-600">{message}</p>}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//           encType="multipart/form-data"
//         >
//           <input
//             type="text"
//             placeholder="نام"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             placeholder="ایمیل"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="رمز عبور"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded"
//           >
//             ثبت‌نام
//           </button>
//         </form>

//         <Link
//           href="/login"
//           className="w-full block bg-green-600 text-white p-2 rounded mt-4 text-center"
//         >
//           ورود به حساب
//         </Link>
//       </div>
//       <Footer />
//     </>
//   )
// }
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // async function handleRegister(e) {
  //   e.preventDefault()
  //   const { data, error } = await supabase.auth.signUp({ email, password })
  //   if (error) alert(error.message)
  //   else alert("ثبت‌نام شد! ایمیل تأیید را چک کن.")
  // }
  // داخل Register / join component
  async function handleRegister(e) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      // خطای تکراری یا هر مشکل دیگر
      const msg =
        error.message.includes("already registered") ||
        error.message.includes("User already") ||
        error.message.includes("User with this email already exists")
          ? "این ایمیل قبلاً ثبت شده است."
          : error.message
      alert(msg)
    } else {
      alert("ثبت‌نام شد! ایمیل تأیید را چک کن.")
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
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
      <button className="w-full bg-blue-600 text-white p-2 rounded">
        ثبت‌نام
      </button>
    </form>
  )
}
