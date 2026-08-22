import path from "node:path"
import env from "@next/env"
const { loadEnvConfig } = env
loadEnvConfig(path.resolve(process.cwd(), "../.."))

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['res.cloudinary.com','images.unsplash.com','plus.unsplash.com','media.smebusinessforum.com'],
  },
  async rewrites() { return [{ source: "/api/:path*", destination: "http://localhost:3003/api/:path*" }] },
};

export default nextConfig;
