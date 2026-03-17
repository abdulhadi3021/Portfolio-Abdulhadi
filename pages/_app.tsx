import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // List of admin routes where you do NOT want header/footer
  const adminRoutes = ['/admin/login', '/admin/dashboard'];

  const hideLayout = adminRoutes.includes(router.pathname);

  return hideLayout ? (
    // Only render the Admin page content for login or dashboard
    <Component {...pageProps} />
  ) : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
