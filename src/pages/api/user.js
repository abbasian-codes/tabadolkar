import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  try {
    // فرض کن userId را از کوکی یا توکن استخراج کردی
    const userId = 1 // نمونه (باید واقعی جایگزین شود)

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true, // فرض می‌کنیم ستون avatarUrl در مدل دیتابیس داری
      },
    })

    if (!user) {
      return res.status(404).json({ error: "کاربر پیدا نشد" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "خطای سرور" })
  }
}
