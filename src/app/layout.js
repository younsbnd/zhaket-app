import { iranYekan } from "@/lib/fonts";
import "./globals.css";
import { HeroProviders } from "@/lib/providers/heroProviders";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} antialiased`}>
        <HeroProviders>{children}</HeroProviders>
      </body>
    </html>
  );
}
