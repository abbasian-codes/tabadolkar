/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 🚫 بیلد دیگه خطای ESLint نمیده
  },
}

export default nextConfig
