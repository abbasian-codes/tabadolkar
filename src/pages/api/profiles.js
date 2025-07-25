import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req, res) {
  const supabase = createServerSupabaseClient({ req, res })
  const ids = req.query.id || []

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, bio")
    .in("id", Array.isArray(ids) ? ids : [ids])

  res.status(200).json(data || [])
}
