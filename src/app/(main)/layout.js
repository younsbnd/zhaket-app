
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/header";
export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
            <body className={`${iranYekan.variable} antialiased`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
