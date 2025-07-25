import prisma from "../../lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "فقط درخواست POST مجازه" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "ایمیل و رمز عبور الزامی است" })
  }

  try {
    const user = await prisma.User.findUnique({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: "کاربری با این ایمیل یافت نشد" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "رمز عبور نادرست است" })
    }

    // ✅ تولید توکن:
    const token = jwt.sign(
      { id: user.id, email: user.email }, // اطلاعات داخل توکن
      process.env.JWT_SECRET, // کلید مخفی از .env.local
      { expiresIn: "1h" } // مدت زمان اعتبار توکن
    )

    // ✅ ارسال توکن در پاسخ:
    return res.status(200).json({
      message: "ورود موفقیت‌آمیز بود",
      token, // توکن در پاسخ
      user: { id: user.id, email: user.email }, // اطلاعات کاربر
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "خطا در سرور" })
  }
}
