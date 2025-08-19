import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/lib/providers/heroProviders";
import ToastHeroProvider from "@/lib/providers/ToastHeroProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} antialiased`}>
        <HeroProviders>
          <ToastHeroProvider>{children}</ToastHeroProvider>
        </HeroProviders>
      </body>
    </html>
  );
}
