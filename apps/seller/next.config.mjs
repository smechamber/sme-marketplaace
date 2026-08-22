import path from "node:path"
import env from "@next/env"
const { loadEnvConfig } = env
loadEnvConfig(path.resolve(process.cwd(), "../.."))
export default { transpilePackages: ["@mysme/core"], async rewrites() { return [{ source: "/api/:path*", destination: "http://localhost:3003/api/:path*" }] } }
