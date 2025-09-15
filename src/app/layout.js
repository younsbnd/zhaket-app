
import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/components/providers/heroProviders";
import ToastHeroProvider from "@/components/providers/ToastHeroProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
 

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} antialiased`}>
        <AuthProvider>
          <HeroProviders>
            <ToastHeroProvider>
              <Header />
              {children}
              <Footer />
            </ToastHeroProvider>
          </HeroProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
