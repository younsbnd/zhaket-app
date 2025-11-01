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
  { label: "قالب وودمارت", href: "/category/web/woodmart" },
  { label: "قالب آسترا پرو", href: "/category/web/astra-pro" },
];

export const POPULAR_PLUGINS = [
  { label: "افزونه المنتور پرو", href: "/category/web/elementor-pro" },
  { label: "افزونه دیجیتس", href: "/category/web/digits" },
  { label: "افزونه یواست سئو", href: "/category/web/yoast-seo" },
];

export const TAB_CONTENT = {
  "wordpress-themes": [
    [{ label: "قالب وردپرس", href: "/category/wordpress-themes" }],
    [{ label: "قالب آموزشی وردپرس", href: "/category/education" }],

  ],
  "wordpress-plugins": [
    [{ label: "افزونه فروشگاهی", href: "#" }],
    [{ label: "افزونه ترجمه", href: "#" }],
    [{ label: "افزونه رزرواسیون", href: "#" }]
  ],
  scripts: [
    [{ label: "اسکریپت مدیریت پروژه", href: "#" }],
    [{ label: "اسکریپت شبکه اجتماعی", href: "#" }],
    [{ label: "اسکریپت چت", href: "#" }]
  ],
  "html-templates": [
    [{ label: "قالب تک صفحه‌ای", href: "#" }],
    [{ label: "قالب لندینگ پیج", href: "#" }],
    [{ label: "قالب رستوران", href: "#" }]
  ],
  "amazing-bundles": [
    [{ label: "بسته کامل وردپرس", href: "#" }],
    [{ label: "بسته قالب‌ها", href: "#" }],
    [{ label: "بسته توسعه", href: "#" }]
  ],
};
