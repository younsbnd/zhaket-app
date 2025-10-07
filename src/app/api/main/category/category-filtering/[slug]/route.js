import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createNotFoundError, createBadRequestError } from "@/lib/utils/errors";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { Tag } from "@/models/Tags";
import File from "@/models/File";
import { NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
 
/**
 * Route Configuration for Next.js App Router
 * - dynamic: Force dynamic rendering for real-time data
 * - revalidate: Cache revalidation interval in seconds
 */
export const dynamic = 'force-dynamic';
export const revalidate = 60;

/**
 * GET /api/main/category/category-filtering/[slug]
 * Fetch products by category slug with filtering, sorting, and pagination
 * @param {Request} req - Next.js request object
 * @param {Object} params - Route parameters
 * @returns {Promise<NextResponse>} JSON response with products and category info
 */
const getProductsByCategory = async (req, { params }) => {
  try {
    const { slug } = await params;
    await connectToDb();

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      throw createBadRequestError("Invalid category slug");
    }

    // Find category by slug (check isActive status)
    const category = await ProductCategory.findOne({ 
      slug: slug.trim()
      // Temporarily allow inactive categories for debugging
      // isActive: true 
    });

    if (!category) {
      throw createNotFoundError("Category not found");
    }

    // Debug: Check category status
  

    // Extract and validate query parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit')) || 12));
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const minPrice = Math.max(0, parseFloat(searchParams.get('minPrice')) || 0);
    const maxPrice = parseFloat(searchParams.get('maxPrice')) || Number.MAX_VALUE;

    // Find all subcategories (temporarily allow inactive for debugging)
    const subcategories = await ProductCategory.find({
      parent: category._id
      // Temporarily allow inactive subcategories for debugging
      // isActive: true
    }).select('_id').lean();

    // Build category IDs array (current category + subcategories)
    const categoryIds = [category._id, ...subcategories.map(sub => sub._id)];

    // Debug: Check products in category without filters (development only)
    if (process.env.NODE_ENV === 'development') {
      const totalInCategory = await Product.countDocuments({ category: { $in: categoryIds } });
      const publishedInCategory = await Product.countDocuments({ 
        category: { $in: categoryIds }, 
        status: 'PUBLISHED' 
      });
      const draftInCategory = await Product.countDocuments({ 
        category: { $in: categoryIds }, 
        status: 'DRAFT' 
      });
      const withImages = await Product.countDocuments({ 
        category: { $in: categoryIds }, 
        status: 'PUBLISHED',
        'images.url': { $exists: true, $ne: null, $ne: '' }
      });
      const withoutImages = await Product.countDocuments({ 
        category: { $in: categoryIds }, 
        status: 'PUBLISHED',
        $or: [
          { 'images.url': { $exists: false } },
          { 'images.url': null },
          { 'images.url': '' }
        ]
      });
      
      logger.warn(`\n[Category Debug] ${category.name} (${category.slug}):`);
    }

    // Build product query with filters
    // TEMPORARILY REMOVED ALL FILTERS FOR DEBUGGING
    const productQuery = {
      category: { $in: categoryIds },
      // status: 'PUBLISHED',  // Temporarily allow all statuses
      price: { $gte: minPrice, $lte: maxPrice },
      // Uncomment the line below to hide products without images
      // 'images.url': { $exists: true, $ne: null, $ne: '' }
    };

  

    // Calculate pagination skip value
    const skip = (page - 1) * limit;

    // Build sort object based on sort parameter
    const sortObject = {};
    
    switch (sortBy) {
      case 'newest':
      case 'latest':
        sortObject.createdAt = sortOrder;
        break;
      case 'bestseller':
        sortObject.salesCount = -1;
        sortObject.createdAt = -1; // Secondary sort
        break;
      case 'discount':
        sortObject.discount = -1;
        break;
      case 'price':
        sortObject.price = sortOrder;
        break;
      case 'title':
        sortObject.title = sortOrder;
        break;
      case 'rating':
        sortObject['rating.average'] = -1;
        break;
      default:
        sortObject.createdAt = sortOrder;
    }

    // Fetch products and total count in parallel
    const [products, totalProducts] = await Promise.all([
      Product.find(productQuery)
        .populate('category', 'name slug description')
        .populate('tags', 'name slug')
        .populate('files', 'fileName fileType fileSize')
        .select('-__v')
        .sort(sortObject)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(productQuery)
    ]);

    // Log for warn (only in development)
    if (process.env.NODE_ENV === 'development') {
      logger.warn(`[Category API] Category: ${category.name}, Found ${totalProducts} total products, returning ${products.length} products for page ${page}`);
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        description: category.description
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    logger.error('[Category API Error]:', error);
    return errorHandler(error);
  }
};

/**
 * Export GET handler
 */
export { getProductsByCategory as GET };