import { supabase } from "@/lib/supabase"

export async function sendMessage(offerId, text) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return supabase.from("messages").insert({
    offer_id: offerId,
    sender_id: user?.id || "00000000-0000-0000-0000-000000000000",
    body: text.trim(),
    user_name: user?.user_metadata?.full_name || "کاربر",
    created_at: new Date().toISOString(),
  })
}

// hooks/useSendMessage.js
