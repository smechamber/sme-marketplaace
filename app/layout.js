import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { getCurrentUser, publicUser } from '@/lib/auth';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My SME Marketplace',
  description: 'A platform for SMEs to connect and trade',
};

export default async function RootLayout({ children }) {
  const initialAuth = { token: null, model: publicUser(await getCurrentUser()) };

  return (
    <html lang="en">
      <head>
                <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={inter.className}>
        <AuthProvider initialAuth={initialAuth}>
          <Navbar/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
