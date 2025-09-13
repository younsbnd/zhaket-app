// ====== Mobile Menu Data ======
// Note: Icons are stored as references so they are SSR-safe. No JSX here!

import { AiOutlineHeart } from "react-icons/ai";
import { BiPlug } from "react-icons/bi";
import { IoCodeSlashOutline } from "react-icons/io5";

// Main tabs for mobile menu
export const mainTabs = [
  {
    id: "most-popular",
    icon: AiOutlineHeart,
    label: "محبوب‌ترین‌ها",
    href: '/search?sort_by="top_sales"&categories=["5dcaacbfeaec37018b508a3b"]',
  },
  {
    id: "wordpress-plugins",
    icon: BiPlug,
    label: "افزونه وردپرس",
    href: "/web/category/wordpress-plugins",
  },
  {
    id: "scripts",
    icon: IoCodeSlashOutline,
    label: "اسکریپت",
    href: "/web/category/script",
  },
];

// Popular sections
export const popularThemes = [
  { label: "قالب وودمارت", href: "/web/woodmart-woocommerce-themes" },
  { label: "قالب آسترا پرو", href: "/web/astra-pro-wordpress-theme" },
];

export const popularPlugins = [
  { label: "افزونه المنتور پرو", href: "/web/elementor-pro-pagebuilder-plugin" },
  { label: "افزونه دیجیتس", href: "/web/mobile-number-signup" },
];

// Additional tab content
export const tabContent = {
  "wordpress-themes": [
    [{ label: "قالب وردپرس", href: "/web/category/wordpress-themes" }],
    [{ label: "قالب آموزشی وردپرس", href: "/web/category/education" }],

  ],
  "wordpress-plugins": [
    [{ label: "افزونه فروشگاهی", href: "/plugins/shop" }],
    [{ label: "افزونه ترجمه", href: "/plugins/translation" }],
    [{ label: "افزونه رزرواسیون", href: "/plugins/reservation" }],
  ],
  "scripts": [
    [{ label: "اسکریپت مدیریت پروژه", href: "/scripts/project-management" }],
    [{ label: "اسکریپت شبکه اجتماعی", href: "/scripts/social" }],
    [{ label: "اسکریپت چت", href: "/scripts/chat" }],
  ],
  "html-templates": [
    [{ label: "قالب تک صفحه‌ای", href: "/html/onepage" }],
  ],
  "amazing-bundles": [
    [{ label: "بسته کامل وردپرس", href: "/bundles/wp" }],
    [{ label: "بسته قالب‌ها", href: "/bundles/themes" }],
    [{ label: "بسته توسعه", href: "/bundles/development" }],
  ],
};
