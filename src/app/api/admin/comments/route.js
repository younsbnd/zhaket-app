import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createUnauthorizedError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Comment from "@/models/Comment";
import { errorHandler } from "@/lib/utils/errorHandler";
import Product from "@/models/Product";
import User from "@/models/User";

const getComments = async (req) => {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw createUnauthorizedError("شما دسترسی به این بخش ندارید");
    }

    await connectToDb();

    // Only get main comments (no replies) - parentComment is null
    const query = { parentComment: null };

    // Get all main comments with populated fields
    const comments = await Comment.find(query)
      .populate("user", "fullName email phoneNumber role")
      .populate("product", "title slug")
      .sort({ createdAt: -1 })
      .lean();

    // Count replies for each comment
    const commentsWithRepliesCount = await Promise.all(
      comments.map(async (comment) => {
        const repliesCount = await Comment.countDocuments({
          parentComment: comment._id,
        });
        return {
          ...comment,
          repliesCount,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: commentsWithRepliesCount,
      total: commentsWithRepliesCount.length,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getComments as GET };
