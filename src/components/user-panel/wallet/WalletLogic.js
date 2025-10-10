"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Wallet from "./Wallet";
import { addToast } from "@heroui/react";
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";

export default function WalletLogic() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  // Use useCrud hook for deposit
  const { createRecord: depositToWallet, isLoading: isSubmitting } = useCrud(
    "/user/wallet/deposit"
  );

  // Fetch transactions using SWR
  const {
    data: transactionsData,
    error: fetchError,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useSWR(session?.user?.id ? "/api/user/transactions" : null, fetcher);

  // React Hook Form setup
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    control,
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  // Show error toast if transactions fetch fails
  useEffect(() => {
    if (fetchError) {
      addToast({
        description: fetchError.message || "خطا در دریافت تراکنش‌ها",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  }, [fetchError]);

  // Handle form submission for deposit
  const onSubmit = async (formData) => {
    try {
      // Use useCrud to deposit to wallet
      const result = await depositToWallet({
        amount: Number(formData.amount),
      });

      logger.debug("result :", result);
      console.log("result :", result);

      if (result.data.success) {
        router.push(result.data.data.paymentUrl);
      } else {
        addToast({
          description: result.data.message || "خطا در انجام عملیات پرداخت",
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      }

      reset();
    } catch (err) {
      // Show error message
      const errorMessage =
        err?.message || (typeof err === "string" ? err : "خطا در شارژ کیف پول");
      addToast({
        description: errorMessage,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // Show loading while session is loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    return null;
  }

  // Render wallet form
  return (
    <Wallet
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={isSubmitting}
      control={control}
      balance={session?.user?.balance || 0}
      transactions={transactionsData?.data || []}
      isLoadingTransactions={isLoadingTransactions}
    />
  );
}
