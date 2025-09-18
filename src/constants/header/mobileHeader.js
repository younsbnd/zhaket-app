// src/constants/mainMenu.config.js
// ---------------------------------------
// Configuration data for main navigation menu in the desktop header
// Replace icon component names with actual imports in the component.
// ---------------------------------------

// Main tabs in the category dropdown
export const MAIN_TABS = [
  {
    id: "most-popular",
    icon: "MdOutlineWeb", // Will be rendered from react-icons
    color: "#FF9606",
    label: "محبوب‌ترین‌ها",
    href: '/search?sort_by="top_sales"&categories=["5dcaacbfeaec37018b508a3b"]'
  },
  {
    id: "wordpress-themes",
    icon: "SiWordpress",
    color: "#878F9B",
    label: "قالب وردپرس",
    href: "/web/category/wordpress-themes"
  },
  {
    id: "wordpress-plugins",
    icon: "BiPlug",
    color: "#878F9B",
    label: "افزونه وردپرس",
    href: "/web/category/wordpress-plugins"
  },
  {
    id: "scripts",
    icon: "RiFileCodeLine",
    color: "#878F9B",
    label: "اسکریپت",
    href: "/web/category/script"
  },
  {
    id: "html-templates",
    icon: "AiOutlineHtml5",
    color: "#878F9B",
    label: "قالب HTML",
    href: "/web/category/html-site-templates"
  },
  {
    id: "amazing-bundles",
    icon: "MdLocalOffer",
    color: "#878F9B",
    label: "بسته‌های شگفت‌انگیز",
    href: "/web/category/amazing-bundles"
  }
];

// Popular WordPress themes for "most popular" section
export const POPULAR_THEMES = [
  { label: "قالب وودمارت", href: "/web/woodmart-woocommerce-themes" },
  { label: "قالب آسترا پرو", href: "/web/astra-pro-wordpress-theme" },
  { label: "قالب استادیار", href: "/web/studiare-education-wordpress-theme" },
  { label: "قالب انفولد", href: "/web/enfold" },
  { label: "قالب فلت سام", href: "/web/flatsome-theme" }
];

// Popular WordPress plugins for "most popular" section
export const POPULAR_PLUGINS = [
  { label: "افزونه المنتور پرو", href: "/web/elementor-pro-pagebuilder-plugin" },
  { label: "افزونه دیجیتس", href: "/web/mobile-number-signup" },
  { label: "افزونه یواست سئو", href: "/web/yoast-seo-premium-wordpress-plugin" },
  { label: "افزونه رنک مث", href: "/web/rank-math-pro" },
  { label: "افزونه وردفنس", href: "/web/wordfence-wordpress-security-plugin" }
];

// Category tab content mapping with sub-items
export const TAB_CONTENT = {
  "wordpress-themes": [
    [{ label: "قالب وردپرس", href: "/web/category/wordpress-themes" }],
    [{ label: "قالب آموزشی وردپرس", href: "/web/category/education" }],

  ],
  "wordpress-plugins": [
    [{ label: "افزونه فروشگاهی", href: "/plugins/shop" }],
    [{ label: "افزونه ترجمه", href: "/plugins/translation" }],
    [{ label: "افزونه رزرواسیون", href: "/plugins/reservation" }]
  ],
  scripts: [
    [{ label: "اسکریپت مدیریت پروژه", href: "/scripts/project-management" }],
    [{ label: "اسکریپت شبکه اجتماعی", href: "/scripts/social" }],
    [{ label: "اسکریپت چت", href: "/scripts/chat" }]
  ],
  "html-templates": [
    [{ label: "قالب تک صفحه‌ای", href: "/html/onepage" }],
    [{ label: "قالب لندینگ پیج", href: "/html/landing" }],
    [{ label: "قالب رستوران", href: "/html/restaurant" }]
  ],
  "amazing-bundles": [
    [{ label: "بسته کامل وردپرس", href: "/bundles/wp" }],
    [{ label: "بسته قالب‌ها", href: "/bundles/themes" }],
    [{ label: "بسته توسعه", href: "/bundles/development" }]
  ]
};
