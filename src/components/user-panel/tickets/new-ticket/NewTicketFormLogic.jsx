"use client";
import React from "react";
import NewTicketForm from "./NewTicketForm";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

const NewTicketFormLogic = () => {
  // useForm hook for form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    defaultValues: {
      section: "",
      reportType: "",
      product: "",
      title: "",
      description: "",
    },
  });

  const router = useRouter();

  // useCrud hook for create ticket
  const {
    createRecord: createTicket,
    isLoading,
    error,
  } = useCrud("/user/ticket");

  // fetch orders for products selection
  const { data: ordersResponse } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/user/order",
    fetcher
  );

  // get products from orders
  const products =
    ordersResponse?.data?.flatMap((order) =>
      order.items.map((item) => item.product)
    ) || [];

  logger.debug("products", products);

  // get section and report type from watch
  const section = watch("section");
  const reportType = watch("reportType");

  // on submit function to submit the form
  const onSubmit = async (data) => {
    try {
      const response = await createTicket(data);
      if (response.ok) {
        addToast({
          description: response?.data?.message || "تیکت با موفقیت ایجاد شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/panel/tickets");
      }
    } catch (err) {
      // handle validation errors
      if (err?.errors) {
        Object.entries(err.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      }
      // handle general error
      addToast({
        description: err?.error?.message || err?.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };
  return (
    <NewTicketForm
      isLoading={isLoading}
      {...{
        control,
        handleSubmit,
        errors,
        products,
        section,
        reportType,
        onSubmit,
      }}
    />
  );
};

export default NewTicketFormLogic;
