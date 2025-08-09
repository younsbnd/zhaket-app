import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
