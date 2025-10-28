import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

const getProductsSearch = async (req) => {
  try {
    await connectToDb();
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    
    // if no query provided, return empty array
    if (!query.trim()) {
      return NextResponse.json({
        data: [],
        message: "لطفا یک کلمه جستجو وارد کنید",
        success: true,
      });
    }
    
    // Search products by title
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
      status: "PUBLISHED"
    })
      .select("title slug images") 
      .limit(10) 
      .sort({ createdAt: -1 })
      .lean();
    
    // return response
    return NextResponse.json({
      data: products,
      message: "جستجو با موفقیت انجام شد",
      success: true,
      count: products.length,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export { getProductsSearch as GET };