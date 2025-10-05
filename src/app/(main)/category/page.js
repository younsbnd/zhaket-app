import CategoryLogic from "@/components/main/category/catgoryLogic";

/**
 * Metadata for All Products Page
 */
export const metadata = {
  title: "همه محصولات | ژاکت",
  description: "مشاهده همه محصولات دیجیتال ژاکت - قالب، افزونه، اسکریپت و بیشتر",
};

/**
 * All Products Page Component
 * Displays all published products with filtering and sorting capabilities
 * @returns {JSX.Element} Category page with product listing
 */
export default function CategoryPage() {
  return <CategoryLogic />;
}
