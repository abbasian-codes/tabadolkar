import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useRealtimeMessages(offerId) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!offerId) return

    supabase
      .from("messages")
      .select("*")
      .eq("offer_id", offerId)
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages(data ?? []))

    const channel = supabase
      .channel(`chat:${offerId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `offer_id=eq.${offerId}`,
        },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [offerId])

  return messages
}
