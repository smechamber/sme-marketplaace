import { Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { getCurrentUser, publicUser } from '@/lib/auth';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata = {
  title: 'MySME Marketplace — Source. Connect. Grow.',
  description: 'Discover verified Indian SMEs, compare quotes and grow your business with trusted suppliers.',
};

export default async function RootLayout({ children }) {
  const initialAuth = { token: null, model: publicUser(await getCurrentUser()) };

  return (
    <html lang="en">
      <head>
                <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={manrope.className}>
        <AuthProvider initialAuth={initialAuth}>
          <Navbar/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
