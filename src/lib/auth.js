import jwt from "jsonwebtoken"

export function verifyToken(req) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("توکن ارسال نشده یا فرمت نادرست است.")
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded // شامل userId و بقیه اطلاعات
  } catch (err) {
    throw new Error("توکن نامعتبر یا منقضی‌شده است.")
  }
}
