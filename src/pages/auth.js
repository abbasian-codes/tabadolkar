// pages/auth.js
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Layout from "../components/Layout"

const supabase = createClientComponentClient()

export default function Auth() {
  const handleSignIn = async () => {
    await supabase.auth.signIn({ provider: "google" })
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In with Google
        </button>
      </div>
    </Layout>
  )
}
