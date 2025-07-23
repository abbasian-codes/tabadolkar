import { useEffect, useState } from "react"

export default function Dashboard() {
  const [token, setToken] = useState("")
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) {
      window.location.href = "/login"
    } else {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    const fetchProtectedData = async () => {
      if (!token) return

      try {
        const res = await fetch("/api/protected-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها")

        const data = await res.json()
        setUserData(data.user)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProtectedData()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          خروج
        </button>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading && (
          <p className="text-center text-gray-600">در حال بارگذاری...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {!loading && !error && userData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">اطلاعات کاربر</h2>
              <p>
                <strong>آیدی:</strong> {userData.id}
              </p>
              <p>
                <strong>ایمیل:</strong> {userData.email}
              </p>
              {/* اینجا می‌توانی اطلاعات بیشتری اضافه کنی */}
            </div>

            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">اطلاعات توکن</h2>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48">
                {token}
              </pre>
            </div>

            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">توضیحات</h2>
              <p className="text-gray-700">
                این یک داشبورد نمونه است که داده‌های کاربر و توکن JWT را نمایش
                می‌دهد.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
