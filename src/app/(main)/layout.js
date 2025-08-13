import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
