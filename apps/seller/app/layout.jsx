import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { getCurrentUser, publicUser } from "@/lib/auth"
export const metadata={title:"MySME Seller Portal"}
export default async function Layout({children}){const initialAuth={token:null,model:publicUser(await getCurrentUser())};return <html lang="en"><body><AuthProvider initialAuth={initialAuth}>{children}</AuthProvider></body></html>}
