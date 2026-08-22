import path from "node:path"
import env from "@next/env"
const { loadEnvConfig } = env
loadEnvConfig(path.resolve(process.cwd(), "../.."))
export default { transpilePackages: ["@mysme/core"] }
