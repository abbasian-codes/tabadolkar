// "use client"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import Logo from "./Logo"
// import { Search, Menu, X } from "lucide-react"
// import supabase from "@/utils/supabase"

// export default function Header({ alwaysWhite = false }) {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const getUser = async () => {
//         const {
//           data: { user },
//         } = await supabase.auth.getUser()
//         setUser(user)
//       }

//       getUser()
//     }
//   }, [])

//   useEffect(() => {
//     if (alwaysWhite) return
//     const onScroll = () => setScrolled(window.scrollY > 10)
//     window.addEventListener("scroll", onScroll)
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [alwaysWhite])

//   return (
//     <header
//       className={`fixed top-0 w-full min-h-16 z-50 transition-all duration-300 ${
//         alwaysWhite || scrolled
//           ? "bg-white text-black shadow"
//           : "bg-[#0094d5] text-white border-b-1 border-[#c7c6cc]"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between">
//         {/* لوگو */}
//         <Link href="/">
//           <div className="flex items-center space-x-2 rtl:space-x-reverse">
//             {alwaysWhite || scrolled ? (
//               <Logo color="#0094d5" textColor="#1E3A8A" />
//             ) : (
//               <Logo color="#ffffff" textColor="#ffffff" />
//             )}
//             {user ? (
//               <div className="flex items-center">
//                 <img
//                   src={user.user_metadata.avatar_url || "/default-avatar.png"}
//                   alt="User Avatar"
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <span>{user.email}</span>
//               </div>
//             ) : (
//               <Link href="/auth" className="text-blue-500">
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </Link>

//         {/* منو در دسکتاپ */}
//         <nav className="hidden md:flex flex-row-reverse items-center gap-2 md:gap-4 h-full">
//           <Link href="/how-it-works" className="px-3 py-1">
//             چطور کار می‌کند
//           </Link>

//           <div
//             className={`h-full w-px md:block hidden ${
//               scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
//             }`}
//           ></div>

//           <Link href="/login" className="px-3 py-1 ">
//             ورود
//           </Link>

//           <div
//             className={`h-full w-px md:block hidden ${
//               scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
//             }`}
//           ></div>

//           <Link href="/join" className="px-3 py-1 ">
//             ثبت‌نام
//           </Link>

//           <div
//             className={`h-full w-px md:block hidden ${
//               scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
//             }`}
//           ></div>

//           {/* جستجو */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="جستجو"
//               className={`pl-8 pr-3 py-1 rounded-md border bg-transparent outline-none text-sm placeholder:opacity-70 ${
//                 alwaysWhite || scrolled
//                   ? "placeholder:text-blue-700 text-black border-blue-200"
//                   : "placeholder:text-white text-white border-white/50"
//               }`}
//             />
//             <Search
//               className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                 scrolled ? "text-blue-700" : "text-white"
//               }`}
//             />
//           </div>
//         </nav>

//         {/* دکمه موبایل منو */}
//         <div className="md:hidden">
//           <button
//             onClick={() => {
//               console.log("کلیک شد")
//               setMenuOpen(!menuOpen)
//             }}
//             className="relative z-50"
//           >
//             {menuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* منو در موبایل */}
//       {menuOpen && (
//         <div className="bg-gray-100 md:hidden z-40 relative" dir="rtl">
//           <div className="p-4 flex flex-col">
//             <Link href="/join" className="w-full">
//               <div className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition">
//                 ثبت‌نام
//               </div>
//             </Link>
//             <hr className="my-2 border-gray-300" />
//             <Link
//               href="/login"
//               className="block py-2 px-4 text-gray-800 text-right"
//             >
//               ورود
//             </Link>
//             <hr className="my-2 border-gray-300" />
//             <Link
//               href="/how-it-works"
//               className="block py-2 px-4 text-gray-800 text-right"
//             >
//               چطور کار می‌کند
//             </Link>
//             <hr className="my-2 border-gray-300" />
//             <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
//               <input
//                 type="text"
//                 placeholder="جستجو..."
//                 className="flex-1 px-3 py-2 text-right focus:outline-none"
//               />
//               <button className="px-3">
//                 <Search className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }
// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import Logo from "./Logo"
// import { Search, Menu, X } from "lucide-react"
// import supabase from "@/utils/supabase"

// export default function Header({ alwaysWhite = false }) {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const [isClient, setIsClient] = useState(false)

//   // شناسایی اینکه در کلاینت هستیم
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   // دریافت کاربر بعد از لود شدن کلاینت
//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser()
//       setUser(data.user)
//     }

//     if (isClient) getUser()
//   }, [isClient])

//   // هندل کردن اسکرول
//   useEffect(() => {
//     if (alwaysWhite) return
//     const onScroll = () => setScrolled(window.scrollY > 10)
//     window.addEventListener("scroll", onScroll)
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [alwaysWhite])

//   return (
//     <header
//       className={`fixed top-0 w-full min-h-16 z-50 transition-all duration-300 ${
//         alwaysWhite || scrolled
//           ? "bg-white text-black shadow"
//           : "bg-[#0094d5] text-white border-b-1 border-[#c7c6cc]"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between">
//         {/* لوگو */}
//         <Link href="/">
//           <div className="flex items-center space-x-2 rtl:space-x-reverse">
//             {alwaysWhite || scrolled ? (
//               <Logo color="#0094d5" textColor="#1E3A8A" />
//             ) : (
//               <Logo color="#ffffff" textColor="#ffffff" />
//             )}
//             {isClient &&
//               (user ? (
//                 <div className="flex items-center">
//                   <img
//                     src={
//                       user.user_metadata?.avatar_url || "/default-avatar.png"
//                     }
//                     alt="User Avatar"
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   <span>{user.email}</span>
//                 </div>
//               ) : (
//                 <Link href="/auth" className="text-blue-500">
//                   Sign In
//                 </Link>
//               ))}
//           </div>
//         </Link>

//         {/* منو در دسکتاپ */}
//         <nav className="hidden md:flex flex-row-reverse items-center gap-2 md:gap-4 h-full">
//           <Link href="/how-it-works" className="px-3 py-1">
//             چطور کار می‌کند
//           </Link>
//           <div
//             className={`h-full w-px ${
//               scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
//             }`}
//           />
//           <Link href="/login" className="px-3 py-1">
//             ورود
//           </Link>
//           <div
//             className={`h-full w-px ${
//               scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
//             }`}
//           />
//           <Link href="/join" className="px-3 py-1">
//             ثبت‌نام
//           </Link>
//           <div
//             className={`h-full w-px ${
//               scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
//             }`}
//           />
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="جستجو"
//               className={`pl-8 pr-3 py-1 rounded-md border bg-transparent outline-none text-sm placeholder:opacity-70 ${
//                 alwaysWhite || scrolled
//                   ? "placeholder:text-blue-700 text-black border-blue-200"
//                   : "placeholder:text-white text-white border-white/50"
//               }`}
//             />
//             <Search
//               className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                 scrolled ? "text-blue-700" : "text-white"
//               }`}
//             />
//           </div>
//         </nav>

//         {/* دکمه موبایل منو */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="relative z-50"
//           >
//             {menuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* منو موبایل */}
//       {menuOpen && (
//         <div className="bg-gray-100 md:hidden z-40 relative" dir="rtl">
//           <div className="p-4 flex flex-col">
//             <Link href="/join" className="w-full">
//               <div className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition">
//                 ثبت‌نام
//               </div>
//             </Link>
//             <hr className="my-2 border-gray-300" />
//             <Link
//               href="/login"
//               className="block py-2 px-4 text-gray-800 text-right"
//             >
//               ورود
//             </Link>
//             <hr className="my-2 border-gray-300" />
//             <Link
//               href="/how-it-works"
//               className="block py-2 px-4 text-gray-800 text-right"
//             >
//               چطور کار می‌کند
//             </Link>
//             <hr className="my-2 border-gray-300" />
//             <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
//               <input
//                 type="text"
//                 placeholder="جستجو..."
//                 className="flex-1 px-3 py-2 text-right focus:outline-none"
//               />
//               <button className="px-3">
//                 <Search className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Logo from "./Logo"
import { Search, Menu, X } from "lucide-react"
import supabase from "@/utils/supabase"

export default function Header({ alwaysWhite = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (alwaysWhite) return
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [alwaysWhite])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  return (
    <header
      className={`fixed top-0 w-full min-h-16 z-50 transition-all duration-300 ${
        alwaysWhite || scrolled
          ? "bg-white text-black shadow"
          : "bg-[#0094d5] text-white border-b-1 border-[#c7c6cc]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          {alwaysWhite || scrolled ? (
            <Logo color="#0094d5" textColor="#1E3A8A" />
          ) : (
            <Logo color="#ffffff" textColor="#ffffff" />
          )}
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="User Avatar"
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png"
                  }}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{user.email}</span>
                <Link
                  href="/dashboard"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  داشبورد
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  خروج
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1">
                ورود
              </Link>
              <Link href="/join" className="px-3 py-1">
                ثبت‌نام
              </Link>
            </>
          )}

          <div
            className={`h-full w-px ${
              scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
            }`}
          />

          <div className="relative">
            <input
              type="text"
              placeholder="جستجو"
              className={`pl-8 pr-3 py-1 rounded-md border bg-transparent outline-none text-sm placeholder:opacity-70 ${
                alwaysWhite || scrolled
                  ? "placeholder:text-blue-700 text-black border-blue-200"
                  : "placeholder:text-white text-white border-white/50"
              }`}
            />
            <Search
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                scrolled ? "text-blue-700" : "text-white"
              }`}
            />
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-gray-100 md:hidden z-40 relative" dir="rtl">
          <div className="p-4 flex flex-col gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.user_metadata?.avatar_url || "/default-avatar.png"
                    }
                    alt="User Avatar"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.png"
                    }}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.email}</span>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  داشبورد
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/join"
                  className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  ثبت‌نام
                </Link>
                <hr className="my-2 border-gray-300" />
                <Link href="/login" className="block py-2 px-4 text-gray-800">
                  ورود
                </Link>
              </>
            )}
            <hr className="my-2 border-gray-300" />
            <Link
              href="/how-it-works"
              className="block py-2 px-4 text-gray-800"
            >
              چطور کار می‌کند
            </Link>
            <hr className="my-2 border-gray-300" />
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="جستجو..."
                className="flex-1 px-3 py-2 text-right focus:outline-none"
              />
              <button className="px-3">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
