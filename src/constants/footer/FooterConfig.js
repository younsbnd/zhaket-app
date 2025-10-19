// Footer configuration: links and social media
import { FaTelegramPlane, FaLinkedin, FaInstagram } from "react-icons/fa";

// Navigation links grouped by section
export const footerLinks = [
  {
    // Contact information & corporate links
    title: "ارتباط با ژاکت",
    titleEn: "Contact with Zhaket",
    links: [
      { href: "/content/terms", label: "قوانین ژاکت" },
      { href: "/logo", label: "لوگو" },
      { href: "/content/about", label: "درباره ما" },
      { href: "/content/contact", label: "تماس با ما" },
    ],
  },
  {
    // Services offered by the platform
    title: "خدمات",
    titleEn: "Services",
    links: [
      { href: "/landing/become-seller/", label: "فروشنده شوید" },
      { href: "/landing/zhaket-affiliate/", label: "همکاری در فروش ژاکت" },
      { href: "/web/zhaket-smart-updater", label: "بروزرسان هوشمند" },
      { href: "https://zhaket.com/landing/career/", label: "فرصت‌های شغلی" },
    ],
  },
  {
    // Quick navigation to popular categories
    title: "دسترسی سریع",
    titleEn: "Quick Access",
    links: [
      { href: "/web/category/wordpress-themes", label: "قالب وردپرس" },
      { href: "/web/category/wordpress-plugins", label: "افزونه وردپرس" },
      { href: "/web/category/ecommerce-woocommerce", label: "قالب فروشگاهی" },
      { href: "/web/category/corporate", label: "قالب شرکتی" },
    ],
  },
];

// Social media accounts for marketing and support
export const socials = [
  {
    href: "http://instagram.com/zhaketcom",
    icon: <FaInstagram className="w-[27px] h-[27px]" />,
    label: "instagram",
  },
  {
    href: "https://linkedin.com/company/zhaket",
    icon: <FaLinkedin className="w-[21px] h-[21px]" />,
    label: "linkedin",
  },
  {
    href: "https://t.me/s/zhaketcom",
    icon: <FaTelegramPlane className="w-[20px] h-[20px]" />,
    label: "telegram",
  },
];
