
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
export default function RootLayout({ children }) {
    return (
        <div >
            <Header />
            {children}
            <Footer />
        </div>
    );
}
