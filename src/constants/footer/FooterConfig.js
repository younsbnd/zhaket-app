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
    // Services section
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
    // Quick access section
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
    icon: FaInstagram,
    label: "instagram",
  },
  {
    href: "https://linkedin.com/company/zhaket",
    icon: FaLinkedin,
    label: "linkedin",
  },
  {
    href: "https://t.me/s/zhaketcom",
    icon: FaTelegramPlane,
    label: "telegram",
  },
];
 export const socialLinks = [
  {
    href: "http://instagram.com/zhaketcom",
    icon: <FaInstagram size={27} className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200" />,
    label: "صفحه اینستاگرام ژاکت"
  },
  {
    href: "https://linkedin.com/company/zhaket",
    icon: <FaLinkedin size={21} className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200" />,
    label: "صفحه لینکدین ژاکت"
  },
  {
    href: "https://t.me/s/zhaketcom",
    icon: <FaTelegramPlane size={20} className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200" />,
    label: "کانال تلگرام ژاکت"
  }
];