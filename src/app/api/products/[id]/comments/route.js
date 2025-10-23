import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectToDb from "@/lib/utils/db";
import Comment from "@/models/Comment";
import Product from "@/models/Product";
import { errorHandler } from "@/lib/utils/errorHandler";
import {
  createUnauthorizedError,
  createNotFoundError,
  createBadRequestError,
} from "@/lib/utils/errors";
import { createCommentValidation } from "@/lib/validations/commentValidation";
import User from "@/models/User";

// get comments for a product
const getComments = async (req, { params }) => {
  try {
    const { id } = await params;

    if (!id) {
      throw createBadRequestError("شناسه محصول الزامی است");
    }

    await connectToDb();

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      throw createNotFoundError("محصول مورد نظر یافت نشد");
    }

    // Get all approved comments for this product
    const comments = await Comment.find({
      product: id,
      isApproved: true,
    })
      .populate("user", "fullName role")
      .populate({
        path: "parentComment",
        select: "user text",
        populate: {
          path: "user",
          select: "fullName",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    // Build nested comment structure
    const commentMap = {};
    const rootComments = [];

    // First pass: create a map of all comments
    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });

    // Second pass: build the tree structure
    comments.forEach((comment) => {
      if (comment.parentComment) {
        // This is a reply
        const parentId = comment.parentComment._id || comment.parentComment;
        if (commentMap[parentId]) {
          commentMap[parentId].replies.push(commentMap[comment._id]);
        }
      } else {
        // This is a root comment
        rootComments.push(commentMap[comment._id]);
      }
    });

    return NextResponse.json({
      success: true,
      data: rootComments,
      total: comments.length,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

// create a new comment
const createComment = async (req, { params }) => {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای ثبت دیدگاه باید وارد شوید");
    }

    const { id } = await params;
    const body = await req.json();

    // Validate input
    const validation = createCommentValidation.safeParse({
      ...body,
      product: id,
    });

    if (!validation.success) {
      throw validation.error;
    }

    const { text, parentComment } = validation.data;

    await connectToDb();

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      throw createNotFoundError("محصول مورد نظر یافت نشد");
    }

    // If this is a reply, check if parent comment exists
    if (parentComment) {
      const parent = await Comment.findOne({
        _id: parentComment,
        product: id,
      });

      if (!parent) {
        throw createNotFoundError("دیدگاه مورد نظر برای پاسخ یافت نشد");
      }
    }

    // Create new comment
    const newComment = await Comment.create({
      user: session.user.id,
      product: id,
      text: text.trim(),
      parentComment: parentComment || null,
      isApproved: false, // Comments need admin approval
    });

    // Populate user info
    await newComment.populate("user", "fullName");

    return NextResponse.json(
      {
        success: true,
        message:
          "دیدگاه شما با موفقیت ثبت شد و پس از تایید مدیر نمایش داده خواهد شد",
        data: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

export { createComment as POST , getComments as GET };
