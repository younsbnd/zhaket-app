import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import {
  createUnauthorizedError,
  createNotFoundError,
} from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Comment from "@/models/Comment";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createCommentValidation } from "@/lib/validations/commentValidation";
import Product from "@/models/Product";
import User from "@/models/User";

// create a new reply to a comment
const createReply = async (req, { params }) => {
  try {
    // check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw createUnauthorizedError("شما دسترسی به این بخش ندارید");
    }

    const { id } = await params;
    const body = await req.json();

    await connectToDb();

    // Check if parent comment exists
    const parentComment = await Comment.findById(id);
    if (!parentComment) {
      throw createNotFoundError("نظر مورد نظر برای پاسخ یافت نشد");
    }

    // Validate input
    const validation = createCommentValidation.safeParse({
      text: body.text,
      product: parentComment.product.toString(),
      parentComment: id,
    });

    if (!validation.success) {
      throw validation.error;
    }

    const { text } = validation.data;

    // Create reply comment
    const replyComment = await Comment.create({
      user: session.user.id,
      product: parentComment.product,
      text: text.trim(),
      parentComment: id,
      isApproved: true, 
    });

    // Populate user info
    await replyComment.populate("user", "fullName email avatar");

    return NextResponse.json(
      {
        success: true,
        message: "پاسخ شما با موفقیت ثبت شد",
        data: replyComment,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export { createReply as POST };