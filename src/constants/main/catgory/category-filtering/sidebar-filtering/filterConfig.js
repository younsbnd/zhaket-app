import { MdVerified, MdStars } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { RiShieldStarFill } from "react-icons/ri";

/**
 * Product categories configuration
 * Each category can have subcategories for hierarchical filtering
 */
export const categories = [
  { id: "iranian", label: "محصولات ایرانی", hasSubcategories: false },
  { id: "script", label: "اسکریپت آماده", hasSubcategories: true },
  { id: "plugin", label: "افزونه وردپرس", hasSubcategories: true },
  { id: "template", label: "قالب وردپرس", hasSubcategories: true },
  { id: "html", label: "قالب HTML", hasSubcategories: true },
  { id: "bundle", label: "بسته های شگفت انگیز", hasSubcategories: false },
  { id: "website", label: "سایت آماده", hasSubcategories: false }
];

/**
 * Medal categories configuration for product quality badges
 * Each medal has an associated icon component from react-icons
 */
export const medalCategories = [
  { id: "main", label: "محصولات اصلی", icon: MdVerified },
  { id: "special", label: "محصولات ویژه", icon: MdStars },
  { id: "iranian-medal", label: "محصولات ایرانی", icon: FaAward },
  { id: "licensed", label: "دارای لایسنس ژاکت گارد", icon: RiShieldStarFill }
];
