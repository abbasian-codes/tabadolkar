import formidable from "formidable"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const config = {
  api: {
    bodyParser: false, // مهم!
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // const form = new formidable.IncomingForm()
  const form = formidable()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: "خطا در پردازش فرم" })
    }

    // const { name, email, password } = fields
    const name = fields.name?.[0] || ""
    const email = fields.email?.[0] || ""
    const password = fields.password?.[0] || ""
    const avatar = files.avatar?.[0] || null
    // const avatar = files.avatar

    if (!name || !email || !password) {
      return res.status(400).json({ error: "لطفاً همه فیلدها را پر کنید" })
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return res.status(400).json({ error: "این ایمیل قبلاً ثبت شده است" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          // می‌تونی اینجا URL آواتار رو هم ذخیره کنی اگر آپلودش کنی
        },
      })

      res.status(201).json({
        message: "ثبت‌نام موفق بود",
        user: { id: newUser.id, email: newUser.email },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "خطای سرور" })
    }
  })
}
