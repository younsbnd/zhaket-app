import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { Tag } from "@/models/Tags";
import File from "@/models/File";
import { NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

/**
 * Route Configuration
 */
export const dynamic = 'force-dynamic';
export const revalidate = 60;

/**
 * GET /api/main/products
 * Fetch all published products with pagination, filtering, and sorting
 * @param {Request} req - Next.js request object
 * @returns {Promise<NextResponse>} JSON response with products and pagination
 */
export async function GET(req) {
  try {
    await connectToDb();

    // Extract and validate query parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit')) || 12));
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const minPrice = Math.max(0, parseFloat(searchParams.get('minPrice')) || 0);
    const maxPrice = parseFloat(searchParams.get('maxPrice')) || Number.MAX_VALUE;

    // Debug: Check total products (development only)
    if (process.env.NODE_ENV === 'development') {
      const totalProducts = await Product.countDocuments({});
      const publishedProducts = await Product.countDocuments({ status: 'PUBLISHED' });
      const draftProducts = await Product.countDocuments({ status: 'DRAFT' });
      const archivedProducts = await Product.countDocuments({ status: 'ARCHIVED' });
      const withImages = await Product.countDocuments({ 
        'images.url': { $exists: true, $ne: null, $ne: '' }
      });
      const withoutImages = await Product.countDocuments({
        $or: [
          { 'images.url': { $exists: false } },
          { 'images.url': null },
          { 'images.url': '' }
        ]
      });


   
    }

    // Build product query with filters
    // TEMPORARILY REMOVED ALL FILTERS FOR DEBUGGING
    const productQuery = {
      // status: 'PUBLISHED',  // Temporarily allow all statuses
      price: { $gte: minPrice, $lte: maxPrice },
      // 'images.url': { $exists: true, $ne: '' }  // Temporarily allow without images
    };

    // Debug: Show actual query
    if (process.env.NODE_ENV === 'development') {
      logger.debug('[All Products Query]:', JSON.stringify(productQuery, null, 2));
    }

    // Calculate pagination skip value
    const skip = (page - 1) * limit;

    // Build sort object
    const sortObject = {};
    
    switch (sortBy) {
      case 'newest':
      case 'latest':
        sortObject.createdAt = sortOrder;
        break;
      case 'bestseller':
        sortObject.createdAt = -1;
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

    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      logger.debug(`[Products API] Found ${totalProducts} total products, returning ${products.length} products for page ${page}`);
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
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
    logger.error('[Products API Error]:', error);
    return errorHandler(error);
  }
}

