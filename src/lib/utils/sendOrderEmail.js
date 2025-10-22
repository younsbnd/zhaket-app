import connectToDb from "./db";
import { logger } from "./logger";
import { createBadRequestError, createNotFoundError } from "./errors";
import Order from "@/models/Order";
import { Resend } from "resend";
import StatusOrderEmail from "@/components/emails/statusOrderEmail";

/**
 * Send order completion email to user
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Email result
 */
export const sendOrderCompletionEmail = async (orderId) => {
  await connectToDb();

  // Get order with user details
  const order = await Order.findById(orderId).populate('user');

  if (!order) {
    throw createNotFoundError("محصول خریداری شده یافت نشد");
  }
  
  // Check if user has email
  if (!order.user) {
    throw createBadRequestError("کاربر یافت نشد");
  } 
  
  if (!order.user.email) {
    throw createBadRequestError("ایمیل کاربر یافت نشد");
  }

  // Check if order is completed
  if (order.status !== "COMPLETED") {
    throw createBadRequestError("سفارش پرداخت نشده است");
  }

  // Check if RESEND_API_KEY is available
  if (!process.env.RESEND_API_KEY) {
    throw createBadRequestError("متغیر محیطی RESEND_API_KEY تعریف نشده است");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: "younes@nikgem.ir",
    to: order.user.email,
    subject: ` با موفقیت انجام شد سفارش شما با شماره ${order.orderNumber} `,
    react: <StatusOrderEmail order={order} />,
  });
  
 
  return result;
};
