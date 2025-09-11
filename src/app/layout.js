import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/components/providers/heroProviders";
import ToastHeroProvider from "@/components/providers/ToastHeroProvider";
import AuthProvider from "@/components/providers/AuthProvider";
<<<<<<< HEAD
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
=======
import Header from "./(main)/layout/header/header";
import Footer from "./(main)/layout/footer/footer";
>>>>>>> develop

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} antialiased`}>
        <AuthProvider>
          <HeroProviders>
            <ToastHeroProvider>
<<<<<<< HEAD
              <Header />
              {children}
<Footer/>
=======
              <Header/>
              {children}
              <Footer/>
>>>>>>> develop
              </ToastHeroProvider>
          </HeroProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
