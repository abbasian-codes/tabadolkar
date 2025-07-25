// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

// export default async function handler(req, res) {
//   const supabase = createServerSupabaseClient({ req, res })

//   const { q = "", category = "", page = 1 } = req.query
//   const limit = 20
//   const from = (page - 1) * limit
//   const to = from + limit - 1

//   let query = supabase
//     .from("offers")
//     .select(
//       "id, title, description, category, price, duration, tags, created_at",
//       { count: "exact" }
//     )
//     .eq("is_available", true)
//     .order("created_at", { ascending: false })
//     .range(from, to)

//   if (q) query = query.ilike("title", `%${q}%`)
//   if (category) query = query.eq("category", category)

//   const { data, error, count } = await query

//   if (error) return res.status(400).json({ error: error.message })
//   res.status(200).json({ offers: data, total: count })
// }
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req, res) {
  try {
    const supabase = createServerSupabaseClient({ req, res })
    const { page = 1, limit = 8 } = req.query
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from("offers")
      .select("*", { count: "exact" })
      .range(from, to)

    if (error) throw error
    return res.status(200).json({ offers: data, total: count })
  } catch (e) {
    console.error(e) // ← خطا در ترمینال را بخوان
    return res.status(500).json({ error: e.message })
  }
}
