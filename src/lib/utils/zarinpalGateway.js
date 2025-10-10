import { createInternalServerError } from "./errors";

// create payment request with zarinpal
export const zarinpalCreatePayment = async (
  amountInRial,
  description,
  callbackUrl
) => {
  try {
    // Check if required environment variables are set
    if (!process.env.ZARINPAL_API_BASE_URL) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_API_BASE_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    if (!process.env.ZARINPAL_PAYMENT_MERCHENT_ID) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_PAYMENT_MERCHENT_ID تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    const url = process.env.ZARINPAL_API_BASE_URL + "/request.json";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount: amountInRial,
        description,
        callback_url: callbackUrl,
        merchant_id: process.env.ZARINPAL_PAYMENT_MERCHENT_ID,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return {
      data: result,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    throw error;
  }
};

// verify payment with zarinpal
export const zarinpalVerifyPayment = async (authority, amount) => {
  try {
    // Check if required environment variables are set
    if (!process.env.ZARINPAL_API_BASE_URL) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_API_BASE_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    if (!process.env.ZARINPAL_PAYMENT_MERCHENT_ID) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_PAYMENT_MERCHENT_ID تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    const url = process.env.ZARINPAL_API_BASE_URL + "/verify.json";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        authority,
        amount,
        merchant_id: process.env.ZARINPAL_PAYMENT_MERCHENT_ID,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
