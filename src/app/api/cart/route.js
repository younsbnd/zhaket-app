import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { errorHandler } from "@/lib/utils/errorHandler";
import connectToDb from "@/lib/utils/db";

// GET: Get cart for current user
const getCart = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      throw createBadRequestError(" شما اجازه دسترسی به این صفحه را ندارید");

    await connectToDb();
    const cart = await Cart.findOne({ userId: session.user.id }).populate(
      "items"
    );
    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    return errorHandler(error);
  }
};

// POST: Add an item to the cart
const addItem = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      throw createBadRequestError(" شما اجازه دسترسی به این صفحه را ندارید");

    const { productId } = await req.json();

    if (!productId) return createBadRequestError("شناسه محصول الزامی است");

    await connectToDb();

    // check if user and product exists
    const userExists = await User.findById(session.user.id);
    const productExists = await Product.findById(productId);
    if (!userExists || !productExists)
      throw createNotFoundError("کاربر یا محصول یافت نشد");

    // Find or create cart for user and add new item
    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $addToSet: { items: productId } },
      { upsert: true, new: true }
    ).populate("items");

    return NextResponse.json(cart);
  } catch (error) {
    return errorHandler(error);
  }
};

// DELETE: Delete an item from the cart
const deleteItem = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      throw createBadRequestError(" شما اجازه دسترسی به این صفحه را ندارید");

    const { productId } = await req.json();
    await connectToDb();

    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $pull: { items: productId } },
      { new: true }
    ).populate("items");

    return NextResponse.json(cart);
  } catch (error) {
    return errorHandler(error);
  }
};

export { getCart as GET, addItem as POST, deleteItem as DELETE };
