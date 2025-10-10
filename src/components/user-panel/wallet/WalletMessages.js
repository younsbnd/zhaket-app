"use client";
import { logger } from "@/lib/utils/logger";
import { addToast } from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const TOAST_MESSAGES = {
  PAID: {
    message: "پرداخت با موفقیت انجام شد و موجودی شما شارژ شد",
    color: "success",
  },
  FAILED: {
    message: "پرداخت ناموفق بود. لطفا دوباره تلاش کنید",
    color: "danger",
  },
};

const WalletMessages = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { update } = useSession();

  //  for prevent multiple toast
  const hasShownToast = useRef(false);

  const type = searchParams.get("type");
  const message = searchParams.get("message");

  useEffect(() => {
    // if type is not exists or toast has already been shown, return
    if (!type || hasShownToast.current) {
      return;
    }

    // find the settings related to type
    const toastConfig = TOAST_MESSAGES[type];

    // if type is not valid, return
    if (!toastConfig) {
      logger.debug(`toast type is not valid: ${type}`);
      return;
    }

    // Update session if payment was successful to refresh balance
    if (type === "PAID") {
      update();
    }

    // show toast with custom message or default message
    addToast({
      description: message || toastConfig.message,
      color: toastConfig.color,
      shouldShowTimeoutProgress: true,
      timeout: 5000,
    });

    // mark that toast has been shown
    hasShownToast.current = true;

    // remove query parameters from URL immediately
    router.replace("/panel/wallet", { scroll: false });
  }, [type, message, router, update]);

  return null;
};

export default WalletMessages;
