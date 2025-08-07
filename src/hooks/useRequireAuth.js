// // src/hooks/useRequireAuth.js
// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import supabase from "@/utils/supabase"

// export default function useRequireAuth() {
//   const router = useRouter()
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (!router.isReady) return

//     let isMounted = true // ✅ برای جلوگیری از memory leak

//     const checkSession = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession()

//       const isLoginPage = router.pathname === "/login"

//       if (error || !session?.user) {
//         if (!isLoginPage) {
//           router.push("/login")
//         }
//         isMounted && setUser(null)
//       } else {
//         isMounted && setUser(session.user)
//       }

//       isMounted && setLoading(false)
//     }

//     checkSession()

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         const isLoginPage = router.pathname === "/login"

//         if (event === "SIGNED_OUT" || !session?.user) {
//           if (!isLoginPage) {
//             router.push("/login")
//           }
//           isMounted && setUser(null)
//         }

//         if (event === "SIGNED_IN") {
//           isMounted && setUser(session.user)
//           isMounted && setLoading(false)
//         }
//       }
//     )

//     return () => {
//       isMounted = false // ✅ در هنگام unmount شدن کامپوننت
//       authListener?.subscription?.unsubscribe?.() // ✅ جلوگیری از multiple listeners
//     }
//   }, [router.isReady, router.pathname])

//   return { user, loading }
// }
// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"

// export default function useRequireAuth() {
//   const router = useRouter()
//   const [session, setSession] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let isMounted = true

//     async function checkSession() {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession()
//       if (error) {
//         console.error("خطا در دریافت session:", error.message)
//       }

//       if (!session && isMounted) {
//         router.replace("/login") // اگر لاگین نیست، به صفحه لاگین برود
//       } else if (isMounted) {
//         setSession(session)
//       }
//       if (isMounted) setLoading(false)
//     }

//     checkSession()

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         if (!session) {
//           router.replace("/login")
//         } else {
//           setSession(session)
//         }
//         setLoading(false)
//       }
//     )

//     return () => {
//       isMounted = false
//       listener?.subscription?.unsubscribe()
//     }
//   }, [router])

//   return { session, loading }
// }
// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import supabase from "@/utils/supabase"

// export default function useRequireAuth() {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     let isMounted = true

//     const getSession = async () => {
//       const { data } = await supabase.auth.getSession()
//       if (!isMounted) return

//       if (data?.session?.user) {
//         setUser(data.session.user)
//         setLoading(false)
//       } else {
//         setUser(null)
//         setLoading(false)
//         router.replace("/login") // ریدایرکت فقط وقتی کاربر لاگین نیست
//       }
//     }

//     getSession()

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         if (!isMounted) return
//         if (session?.user) setUser(session.user)
//         else {
//           setUser(null)
//           router.replace("/login")
//         }
//       }
//     )

//     return () => {
//       isMounted = false
//       if (listener?.unsubscribe) listener.unsubscribe()
//       else if (listener?.subscription?.unsubscribe)
//         listener.subscription.unsubscribe()
//     }
//   }, [router])

//   return { user, loading }
// }
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import supabase from "@/utils/supabase"

export default function useRequireAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!isMounted) return

      if (data?.session?.user) {
        setUser(data.session.user)
      } else {
        setUser(null)
      }

      setLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      }
    )

    return () => {
      isMounted = false
      if (listener?.unsubscribe) listener.unsubscribe()
      else if (listener?.subscription?.unsubscribe)
        listener.subscription.unsubscribe()
    }
  }, [])

  // 🔁 ریدایرکت فقط وقتی loading تموم شده و user قطعاً null هست
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  return { user, loading }
}
