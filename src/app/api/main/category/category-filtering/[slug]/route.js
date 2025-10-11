import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createNotFoundError, createBadRequestError } from "@/lib/utils/errors";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60;

/**
 * GET /api/main/category/category-filtering/[slug]
 * Fetch products from given category (and subcategories)
 * Apply optional price filter, sorting, and pagination
 */
export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    await connectToDb();

    /** -----------------------
     * 1. Validate category slug
     * ---------------------- */
    const { slug } = await params;
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      throw createBadRequestError("Invalid category slug");
    }

    /** -----------------------
     * 2. Find main category by slug
     * ---------------------- */
    const mainCategory = await ProductCategory.findOne({ slug: slug.trim() });
    if (!mainCategory) {
      throw createNotFoundError("Category not found");
    }

    /** -----------------------
     * 3. Build category IDs array (main + subcategories)
     * ---------------------- */
    const subCategoryDocs = await ProductCategory.find({
      parent: mainCategory._id
    }).select("_id").lean();

    const categoryIds = [mainCategory._id, ...subCategoryDocs.map(c => c._id)];

    /** -----------------------
     * 4. Parse query parameters
     * ---------------------- */
    const { searchParams } = new URL(req.url);
    const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
    const itemsPerPage = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 5));
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
    const minPrice = Math.max(0, parseFloat(searchParams.get("minPrice")) || 0);
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Number.MAX_VALUE;

    /** -----------------------
     * 5. Build MongoDB filter query
     * ---------------------- */
    const filterQuery = {
      category: { $in: categoryIds },
      price: { $gte: minPrice, $lte: maxPrice }
    };

    /** -----------------------
     * 6. Calculate pagination values
     * ---------------------- */
    const skipItems = (currentPage - 1) * itemsPerPage;

    /** -----------------------
     * 7. Build sort object
     * ---------------------- */
    const sortOptions = (() => {
      switch (sortBy) {
        case "bestseller":
          return { salesCount: -1, createdAt: -1 };
        case "price":
          return { price: sortOrder };
        case "title":
          return { title: sortOrder };
        case "rating":
          return { "rating.average": -1 };
        default:
          return { createdAt: sortOrder };
      }
    })();

    /** -----------------------
     * 8. Fetch products and count in parallel
     * ---------------------- */
    const [productList, totalItems] = await Promise.all([
      Product.find(filterQuery)
        .populate("category", "name slug description")
        .select("-__v")
        .sort(sortOptions)
        .skip(skipItems)
        .limit(itemsPerPage)
        .lean(),
      Product.countDocuments(filterQuery)
    ]);

    /** -----------------------
     * 9. Calculate total pages
     * ---------------------- */
    const totalPages = totalItems > 0
      ? Math.ceil(totalItems / itemsPerPage)
      : 0;

    /** -----------------------
     * 10. Return JSON response
     * ---------------------- */
    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      data: productList,
      category: {
        _id: mainCategory._id,
        name: mainCategory.name,
        slug: mainCategory.slug,
        description: mainCategory.description
      },
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    });
  } catch (error) {
    return errorHandler(error);
  }
};
