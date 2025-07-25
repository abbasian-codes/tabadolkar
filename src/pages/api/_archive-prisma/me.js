import { verifyToken } from "@/lib/auth"
import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req) // توکن رو بررسی می‌کنه

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, email: true },
    })

    if (!user) return res.status(404).json({ message: "کاربر پیدا نشد" })

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}
