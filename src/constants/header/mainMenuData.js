const { AiOutlineHtml5 } = require("react-icons/ai");
const { BiPlug } = require("react-icons/bi");
const { MdOutlineWeb, MdLocalOffer } = require("react-icons/md");
const { RiFileCodeLine } = require("react-icons/ri");
const { SiWordpress } = require("react-icons/si");

export const MAIN_TABS = [
  {
    id: "most-popular",
    icon: <MdOutlineWeb color="#FF9606" size={24} />,
    label: "محبوب‌ترین‌ها",
    href: '/search?sort_by="top_sales"&categories=["5dcaacbfeaec37018b508a3b"]'
  },
  {
    id: "wordpress-themes",
    icon: <SiWordpress color="#878F9B" size={24} />,
    label: "قالب وردپرس",
    href: "/category/wordpress-themes"
  },
  {
    id: "wordpress-plugins",
    icon: <BiPlug color="#878F9B" size={24} />,
    label: "افزونه وردپرس",
    href: "/category/wordpress-plugins"
  },
  {
    id: "scripts",
    icon: <RiFileCodeLine color="#878F9B" size={24} />,
    label: "اسکریپت",
    href: "/category/scripts"
  },
  {
    id: "html-templates",
    icon: <AiOutlineHtml5 color="#878F9B" size={24} />,
    label: "قالب HTML",
    href: "/category/html-site-templates"
  },
  {
    id: "amazing-bundles",
    icon: <MdLocalOffer color="#878F9B" size={24} />,
    label: "بسته‌های شگفت‌انگیز",
    href: "/category/amazing-bundles"
  },
];

export const POPULAR_THEMES = [
  { label: "قالب وودمارت", href: "/web/woodmart-woocommerce-themes" },
  { label: "قالب آسترا پرو", href: "/web/astra-pro-wordpress-theme" },
];

export const POPULAR_PLUGINS = [
  { label: "افزونه المنتور پرو", href: "/web/elementor-pro-pagebuilder-plugin" },
  { label: "افزونه دیجیتس", href: "/web/mobile-number-signup" },
  { label: "افزونه یواست سئو", href: "/web/yoast-seo-premium-wordpress-plugin" },
];

export const TAB_CONTENT = {
  "wordpress-themes": [
    [{ label: "قالب وردپرس", href: "/category/wordpress-themes" }],
    [{ label: "قالب آموزشی وردپرس", href: "/category/education" }],

  ],
  "wordpress-plugins": [
    [{ label: "افزونه فروشگاهی", href: "/category/shop-plugins" }],
    [{ label: "افزونه ترجمه", href: "/category/translation-plugins" }],
    [{ label: "افزونه رزرواسیون", href: "/category/reservation-plugins" }]
  ],
  scripts: [
    [{ label: "اسکریپت مدیریت پروژه", href: "/category/project-management-scripts" }],
    [{ label: "اسکریپت شبکه اجتماعی", href: "/category/social-scripts" }],
    [{ label: "اسکریپت چت", href: "/category/chat-scripts" }]
  ],
  "html-templates": [
    [{ label: "قالب تک صفحه‌ای", href: "/category/onepage-html" }],
    [{ label: "قالب لندینگ پیج", href: "/category/landing-html" }],
    [{ label: "قالب رستوران", href: "/category/restaurant-html" }]
  ],
  "amazing-bundles": [
    [{ label: "بسته کامل وردپرس", href: "/category/wordpress-bundles" }],
    [{ label: "بسته قالب‌ها", href: "/category/themes-bundles" }],
    [{ label: "بسته توسعه", href: "/category/development-bundles" }]
  ],
};
