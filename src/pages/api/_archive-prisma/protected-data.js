// /pages/api/protected-data.js

import jwt from "jsonwebtoken"

export default function handler(req, res) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: "عدم دسترسی: توکن موجود نیست" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({ message: "اطلاعات امن", user: decoded })
  } catch (err) {
    res.status(401).json({ error: "توکن نامعتبر است" })
  }
}
