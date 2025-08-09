import { iranYekan } from "@/lib/fonts";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} antialiased`}>{children}</body>
    </html>
  );
}
