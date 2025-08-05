// import { useState, useEffect } from "react"
// import { useRouter } from "next/router"
// import supabase from "@/utils/supabase"

// export default function useRequireAuth() {
//   const router = useRouter()
//   const [user, setUser] = useState(null)
//   const [authChecked, setAuthChecked] = useState(false)

//   useEffect(() => {
//     let isMounted = true

//     supabase.auth.getUser().then(({ data: { user } }) => {
//       if (!isMounted) return
//       if (user) {
//         setUser(user)
//       } else {
//         router.replace("/")
//       }
//       setAuthChecked(true)
//     })

//     return () => {
//       isMounted = false
//     }
//   }, [router])

//   return { user, authChecked }
// }

// // hooks/useRequireAuth.js
// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import supabase from "@/utils/supabase"

// export default function useRequireAuth() {
//   const router = useRouter()
//   const [user, setUser] = useState(null)
//   const [checkingAuth, setCheckingAuth] = useState(true)

//   useEffect(() => {
//     const getInitialUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()
//       setUser(user || null)
//       setCheckingAuth(false)
//     }

//     getInitialUser()

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         setUser(session?.user || null)
//         if (!session?.user) {
//           router.replace("/login")
//         }
//       }
//     )

//     return () => {
//       listener?.subscription.unsubscribe()
//     }
//   }, [router])

//   return { user, loading: checkingAuth }
// }
// src/hooks/useRequireAuth.js
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import supabase from "@/utils/supabase"

export default function useRequireAuth() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session?.user) {
        router.push("/login")
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }

    checkSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session?.user) {
          setUser(null)
          router.push("/login")
        }
        if (event === "SIGNED_IN") {
          setUser(session.user)
          setLoading(false)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  return { user, loading }
}
