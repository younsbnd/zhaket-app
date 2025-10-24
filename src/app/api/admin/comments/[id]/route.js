import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import {
  createUnauthorizedError,
  createNotFoundError,
  createBadRequestError,
} from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Comment from "@/models/Comment";
import { errorHandler } from "@/lib/utils/errorHandler";
import Product from "@/models/Product";
import User from "@/models/User";

const getComment = async (req, { params }) => {
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

    const { id } = await params;

    await connectToDb();

    // Get the comment
    const comment = await Comment.findById(id)
      .populate("user", "fullName email avatar phoneNumber")
      .populate("product", "title slug")
      .populate({
        path: "parentComment",
        select: "text user",
        populate: {
          path: "user",
          select: "fullName",
        },
      })
      .lean();

    if (!comment) {
      throw createNotFoundError("نظر مورد نظر یافت نشد");
    }

    // Get all replies to this comment (nested)
    const replies = await Comment.find({ parentComment: id })
      .populate("user", "fullName email avatar")
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      comment,
      replies,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

const updateComment = async (req, { params }) => {
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

    const { id } = await params;
    const body = await req.json();
    const { isApproved } = body;

    if (typeof isApproved !== "boolean") {
      throw createBadRequestError("وضعیت تایید باید true یا false باشد");
    }

    await connectToDb();

    // Update comment approval status
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    ).populate("user", "fullName email");

    if (!updatedComment) {
      throw createNotFoundError("نظر مورد نظر یافت نشد");
    }

    return NextResponse.json({
      success: true,
      message: isApproved
        ? "نظر با موفقیت تایید شد"
        : "نظر رد شد و از نمایش عمومی حذف شد",
      data: updatedComment,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

const deleteComment = async (req, { params }) => {
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

    await connectToDb();

    // Check if comment exists
    const comment = await Comment.findById(id);
    if (!comment) {
      throw createNotFoundError("نظر مورد نظر یافت نشد");
    }

    // Delete all replies to this comment recursively
    async function deleteCommentAndReplies(commentId) {
      // Find all direct replies
      const replies = await Comment.find({ parentComment: commentId });

      // Recursively delete each reply and its children
      for (const reply of replies) {
        await deleteCommentAndReplies(reply._id);
      }

      // Delete the comment itself
      await Comment.findByIdAndDelete(commentId);
    }

    await deleteCommentAndReplies(id);

    return NextResponse.json({
      success: true,
      message: "نظر و تمام پاسخ‌های آن با موفقیت حذف شد",
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getComment as GET, updateComment as PUT, deleteComment as DELETE };
