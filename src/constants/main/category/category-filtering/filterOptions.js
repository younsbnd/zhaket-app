// Centralized filter options for category filtering UI
// - Medal categories icons (public SVGs)
// - Sort options for archive pages

export const MEDAL_CATEGORIES = [
  { id: "main", label: "محصولات اصلی", icon: "/images/main/category/icons/main-products-icon.svg" },
  { id: "special", label: "محصولات ویژه", icon: "/images/main/category/icons/special-products-icon.svg" },
  { id: "iranian-medal", label: "محصولات ایرانی", icon: "/images/main/category/icons/iranian-products-icon.svg" },
  { id: "licensed", label: "دارای لایسنس ژاکت گارد", icon: "/images/main/category/icons/zhaket-licenced-icon.svg" },
];

export const SORT_OPTIONS = [
  { id: "latest", label: "جدید‌ترین", sortBy: "createdAt", sortOrder: "desc" },
  { id: "bestseller", label: "پرفروش‌ترین", sortBy: "bestseller", sortOrder: "desc" },
  { id: "discount", label: "پرتخفیف‌ها", sortBy: "discount", sortOrder: "desc" },
  { id: "price-asc", label: "ارزان‌ترین", sortBy: "price", sortOrder: "asc" },
  { id: "price-desc", label: "گران‌ترین", sortBy: "price", sortOrder: "desc" },
];


