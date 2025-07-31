// // import "@/styles/globals.css";

// // export default function App({ Component, pageProps }) {
// //   return <Component {...pageProps} />;
// // }
// import "@/styles/globals.css"
// import { useEffect } from "react"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// const supabase = createClientComponentClient()

// export default function App({ Component, pageProps }) {
//   useEffect(() => {
//     const supabase = createClientComponentClient()
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (event === "SIGNED_IN") {
//         // کاربر وارد شد، به صفحه‌ی داشبورد هدایت کن
//         window.location.href = "/dashboard"
//       } else if (event === "SIGNED_OUT") {
//         // کاربر خارج شد، به صفحه‌ی ورود هدایت کن
//         window.location.href = "/auth"
//       }
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [])

//   return <Component {...pageProps} />
// }
// pages/_app.js
// pages/_app.js
// import "@/styles/globals.css"
// import { useEffect } from "react"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// const supabase = createClientComponentClient()

// export default function App({ Component, pageProps }) {
//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (event === "SIGNED_IN") {
//         // کاربر وارد شد، به صفحه‌ی داشبورد هدایت کن
//         window.location.href = "/dashboard"
//       } else if (event === "SIGNED_OUT") {
//         // کاربر خارج شد، به صفحه‌ی ورود هدایت کن
//         window.location.href = "/auth"
//       }
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [])

//   return <Component {...pageProps} />
// }
// import "@/styles/globals.css"
// import { useEffect } from "react"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// const supabase = createClientComponentClient()

// export default function App({ Component, pageProps }) {
//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (event === "SIGNED_IN") {
//         // کاربر وارد شد، به صفحه‌ی داشبورد هدایت کن
//         window.location.href = "/dashboard"
//       } else if (event === "SIGNED_OUT") {
//         // کاربر خارج شد، به صفحه‌ی ورود هدایت کن
//         window.location.href = "/auth"
//       }
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [])

//   return <Component {...pageProps} />
// }
import "@/styles/globals.css"
import { useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // کاربر وارد شد، به صفحه‌ی داشبورد هدایت کن
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard"
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
