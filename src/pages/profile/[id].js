import Image from "next/image"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default function ProfilePage({ profile, offers }) {
  if (!profile) return <p>کاربر یافت نشد.</p>

  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* هدر پروفایل */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <Image
          src={profile.avatar_url}
          alt={profile.full_name}
          width={120}
          height={120}
          className="rounded-full border-4 border-white shadow"
        />
        <div>
          <h1 className="text-3xl font-bold">{profile.full_name}</h1>
          <p className="text-gray-600 mt-1">{profile.slogan}</p>

          {/* رتبه و بَج‌ها */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-yellow-500">⭐ {profile.rating}</span>
            <span className="text-gray-500">({profile.review_count} نظر)</span>
          </div>

          <div className="flex gap-1 mt-2">
            {profile.badges?.map((b, i) => (
              <img
                key={i}
                src={`/images/badge${i + 1}.svg`}
                alt={b}
                width={28}
                height={28}
              />
            ))}
          </div>
        </div>
      </div>

      {/* خدمات کاربر */}
      <h2 className="text-2xl font-bold mb-4">خدمات ارائه‌شده</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((o) => (
          <div key={o.id} className="border rounded p-4">
            <h3 className="font-semibold">{o.title}</h3>
            <p className="text-sm text-gray-500">{o.category}</p>
            <p className="text-sm font-semibold text-green-600">
              {o.price?.toLocaleString()} تومان
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export async function getServerSideProps(ctx) {
  const { res, params } = ctx
  const supabase = createServerSupabaseClient(ctx)
  const { id } = params

  // هدرهای کش برای جلوگیری از کش شدن داده‌ها
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  )
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Expires", "0")
  res.setHeader("Surrogate-Control", "no-store")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()

  const { data: offers } = await supabase
    .from("offers")
    .select("*")
    .eq("user_id", id)
    .eq("is_available", true)
    .order("created_at", { ascending: false })

  return { props: { profile, offers } }
}

// import Image from "next/image"
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

// export default function ProfilePage({ profile, offers }) {
//   if (!profile) return <p>کاربر یافت نشد.</p>

//   return (
//     <main className="max-w-4xl mx-auto p-4">
//       {/* هدر پروفایل */}
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//         <Image
//           src={profile.avatar_url}
//           alt={profile.full_name}
//           width={120}
//           height={120}
//           className="rounded-full border-4 border-white shadow"
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{profile.full_name}</h1>
//           <p className="text-gray-600 mt-1">{profile.slogan}</p>

//           {/* رتبه و بَج‌ها */}
//           <div className="flex items-center gap-2 mt-2 text-sm">
//             <span className="text-yellow-500">⭐ {profile.rating}</span>
//             <span className="text-gray-500">({profile.review_count} نظر)</span>
//           </div>

//           <div className="flex gap-1 mt-2">
//             {profile.badges?.map((b, i) => (
//               <img
//                 key={i}
//                 src={`/images/badge${i + 1}.svg`}
//                 alt={b}
//                 width={28}
//                 height={28}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* خدمات کاربر */}
//       <h2 className="text-2xl font-bold mb-4">خدمات ارائه‌شده</h2>
//       <div className="grid gap-4 md:grid-cols-2">
//         {offers.map((o) => (
//           <div key={o.id} className="border rounded p-4">
//             <h3 className="font-semibold">{o.title}</h3>
//             <p className="text-sm text-gray-500">{o.category}</p>
//             <p className="text-sm font-semibold text-green-600">
//               {o.price?.toLocaleString()} تومان
//             </p>
//           </div>
//         ))}
//       </div>
//     </main>
//   )
// }

// export async function getServerSideProps(ctx) {
//   const supabase = createServerSupabaseClient(ctx)
//   const { id } = ctx.params
//   // تنظیم هدرهای Cache-Control برای جلوگیری از کش
//   res.setHeader(
//     "Cache-Control",
//     "no-store, no-cache, must-revalidate, proxy-revalidate"
//   )
//   res.setHeader("Pragma", "no-cache")
//   res.setHeader("Expires", "0")
//   res.setHeader("Surrogate-Control", "no-store")

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", id)
//     .single()

//   const { data: offers } = await supabase
//     .from("offers")
//     .select("*")
//     .eq("user_id", id)
//     .eq("is_available", true)
//     .order("created_at", { ascending: false })

//   return { props: { profile, offers } }
// }
