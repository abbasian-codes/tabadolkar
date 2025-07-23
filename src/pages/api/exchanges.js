// import { Pool } from "pg"

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// })

// export default async function handler(req, res) {
//   try {
//     const result = await pool.query("SELECT id, text FROM exchanges")
//     res.status(200).json(result.rows)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: "خطا در سرور" })
//   }
// }

export default function handler(req, res) {
  const exchanges = [
    { text: "صرافی اول" },
    { text: "صرافی دوم" },
    { text: "صرافی سوم" },
  ]

  res.status(200).json(exchanges)
}
