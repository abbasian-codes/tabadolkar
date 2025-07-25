// src/pages/api/supabase-register.js
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const { email, password } = req.body
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json({ user: data.user })
}
