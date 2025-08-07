import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import supabase from "@/utils/supabase"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const router = useRouter()
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        setCheckingSession(false)
        return
      }

      if (session?.user) {
        router.push("/dashboard")
      } else {
        setCheckingSession(false)
      }
    }
    checkSession()
  }, [router])

  if (checkingSession) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>در حال بررسی وضعیت ورود...</p>
      </main>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded shadow space-y-6">
          <h1 className="text-2xl font-bold text-center">ورود به حساب</h1>

          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* دکمه ورود با گوگل */}
          <button
            onClick={signInWithGoogle}
            className="w-full bg-red-600 hover:bg-red-700 transition text-white p-2 rounded"
          >
            ورود با گوگل
          </button>

          <div className="border-t border-gray-300"></div>

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
