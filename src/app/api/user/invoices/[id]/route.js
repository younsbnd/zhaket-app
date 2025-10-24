import connectToDb from "@/lib/utils/db";
import Order from "@/models/Order";
import { createUnauthorizedError, createNotFoundError } from "@/lib/utils/errors";
import { errorHandler } from "@/lib/utils/errorHandler";
import { NextResponse } from "next/server";
import Product from "@/models/Product";





const GetOrderDetails = async (req, { params }) => {
    try {
        await connectToDb();

        const { id } = await params;
        const orderDetails = await Order.findById(id).select('+createdAt ').populate('user   items.product', 'fullName phoneNumber email title images developer');
        
        return NextResponse.json({
            success: true,
            data: orderDetails,
        });
    } catch (error) {
        return errorHandler(error);
    }
};

export { GetOrderDetails as GET };      