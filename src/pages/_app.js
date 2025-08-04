import "@/styles/globals.css"
import { useEffect } from "react"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"

const supabase = createPagesBrowserClient()

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // کاربر وارد شد، به صفحه‌ی داشبورد هدایت کن
        if (typeof window !== "undefined") {
          window.location.href = "/"
        }
      } else if (event === "SIGNED_OUT") {
        // کاربر خارج شد، به صفحه‌ی ورود هدایت کن
        if (typeof window !== "undefined") {
          window.location.href = "/auth"
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <Component {...pageProps} />
}
