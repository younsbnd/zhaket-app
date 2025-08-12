import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/lib/providers/heroProviders";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${iranYekan.variable} antialiased`}>
        <HeroProviders>
          <Header />
          {children}
          <Footer />
        </HeroProviders>
      </body>
    </html>
  );
}
