import { metadata } from "@/lib/seo/metadata";

// SEO metadata for payment page
export const generateMetadata = () => {
  return metadata({
    title: "نتیجه پرداخت",
    description: "نتیجه پرداخت سفارش شما",
    noindex: true,
  });
};

export default function PaymentLayout({ children }) {
    return <>
    
    {children}
    
    </>;
}
