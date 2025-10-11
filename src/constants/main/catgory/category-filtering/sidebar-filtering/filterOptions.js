// Centralized filter options for category filtering UI
// - Medal categories icons (public SVGs)
// - Sort options for archive pages

import { AiOutlineInfoCircle } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { FaAward } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";
import { MdStars, MdVerified } from "react-icons/md";
import { RiShieldStarFill } from "react-icons/ri";

export const categories = [
  { id: "iranian", label: "محصولات ایرانی", hasSubcategories: false },
  { id: "script", label: "اسکریپت آماده", hasSubcategories: true },
  { id: "plugin", label: "افزونه وردپرس", hasSubcategories: true },
  { id: "template", label: "قالب وردپرس", hasSubcategories: true },
  { id: "html", label: "قالب HTML", hasSubcategories: true },
  { id: "bundle", label: "بسته های شگفت انگیز", hasSubcategories: false },
  { id: "website", label: "سایت آماده", hasSubcategories: false }
];

export const MEDAL_CATEGORIES = [
  { id: "main", label: "محصولات اصلی", icon: "/images/main/category/icons/main-products-icon.svg" },
  { id: "special", label: "محصولات ویژه", icon: "/images/main/category/icons/special-products-icon.svg" },
  { id: "iranian-medal", label: "محصولات ایرانی", icon: "/images/main/category/icons/iranian-products-icon.svg" },
  { id: "licensed", label: "دارای لایسنس ژاکت گارد", icon: "/images/main/category/icons/zhaket-licenced-icon.svg" },
];


export const filterItems = [
  {
    key: "sharedProducts",
    Icon: CiShop, 
    iconClassName: "text-2xl",
    label: "محصولات اشتراکی",
  },
  {
    key: "demoSearch",
    Icon: LuMonitor, 
    iconClassName: "text-xl", 
    label: "جستجوی دمو",
    showInfo: true, 
  },
  {
    key: "showUnavailable",
    Icon: CiShop,
    iconClassName: "text-2xl", 
    label: "نمایش محصولات ناموجود",
  },
];

export const SORT_OPTIONS = [
  { id: "latest", label: "جدید‌ترین", sortBy: "createdAt", sortOrder: "desc" },
  { id: "bestseller", label: "پرفروش‌ترین", sortBy: "bestseller", sortOrder: "desc" },
  { id: "discount", label: "پرتخفیف‌ها", sortBy: "discount", sortOrder: "desc" },
  { id: "price-asc", label: "ارزان‌ترین", sortBy: "price", sortOrder: "asc" },
  { id: "price-desc", label: "گران‌ترین", sortBy: "price", sortOrder: "desc" },
];

export const medalCategories = [
  { id: "main", label: "محصولات اصلی", Icon: MdVerified },
  { id: "special", label: "محصولات ویژه", Icon: MdStars },
  { id: "iranian-medal", label: "محصولات ایرانی", Icon: FaAward },
  { id: "licensed", label: "دارای لایسنس ژاکت گارد", Icon: RiShieldStarFill }
];
