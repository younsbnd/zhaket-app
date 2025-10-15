import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="pt-0 md:pt-24">{children}</main>
      <Footer />
    </div>
  );
}
