// src/hooks/useRequireAuth.js
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import supabase from "@/utils/supabase"

export default function useRequireAuth() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!router.isReady) return

    let isMounted = true // ✅ برای جلوگیری از memory leak

    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      const isLoginPage = router.pathname === "/login"

      if (error || !session?.user) {
        if (!isLoginPage) {
          router.push("/login")
        }
        isMounted && setUser(null)
      } else {
        isMounted && setUser(session.user)
      }

      isMounted && setLoading(false)
    }

    checkSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const isLoginPage = router.pathname === "/login"

        if (event === "SIGNED_OUT" || !session?.user) {
          if (!isLoginPage) {
            router.push("/login")
          }
          isMounted && setUser(null)
        }

        if (event === "SIGNED_IN") {
          isMounted && setUser(session.user)
          isMounted && setLoading(false)
        }
      }
    )

    return () => {
      isMounted = false // ✅ در هنگام unmount شدن کامپوننت
      authListener?.subscription?.unsubscribe?.() // ✅ جلوگیری از multiple listeners
    }
  }, [router.isReady, router.pathname])

  return { user, loading }
}
