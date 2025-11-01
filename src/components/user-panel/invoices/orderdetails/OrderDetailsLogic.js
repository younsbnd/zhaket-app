"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/api/fetcher';
import ProductShow from './ProductShow';
import PaymentInformation from './sidebar/PaymentInformation';
import OrderDetailsSkeletons from '@/components/skeletons/user-panel/invoices/orderdetails/OrderDetailsSkeletons';
import { addToast } from '@heroui/react';

const OrderDetailsContainer = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const orderId = params?.id;
    const [order, setOrder] = useState(null);

    // Fetch order details data from API
    const { data: orderResponse, error: errorOrder } = useSWR(
        orderId ? `/api/user/invoices/${orderId}` : null,
        fetcher
    );

    // Check user authentication
    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/login");
    }, [session, status, router]);

    // Process order data when response changes
    useEffect(() => {
        if (orderResponse?.data) {
            const data = orderResponse.data;
            const status = data.paymentResult?.status;

            setOrder({
                ...data,
                formattedAmount: data.totalPrice ? new Intl.NumberFormat('fa-IR').format(data.totalPrice) : "۰",
                formattedDate: data.paymentResult?.paidAt || data.createdAt ?
                    new Date(data.paymentResult?.paidAt || data.createdAt).toLocaleDateString('fa-IR') : 'تاریخ نامشخص',
                paymentStatus: status === "PAID" ? 'پرداخت شده' :
                    status === "PENDING" || status === "FAILED" ? 'در انتظار پرداخت' : 'پرداخت نشده',
                statusBadgeColor: status === "PAID" ? "bg-green-100 text-green-800" :
                    status === "PENDING" || status === "FAILED" ? "bg-[#FEF3E2] text-[#E5A653]" :
                        "bg-red-100 text-red-800"
            });
        }
    }, [orderResponse]);

    // Handle API errors with toast
    useEffect(() => {
        if (errorOrder) {
            addToast({
                description: errorOrder?.message || errorOrder?.error?.message || 'خطا در بارگذاری جزئیات سفارش',
                color: "danger",
                shouldShowTimeoutProgress: true,
            });
        }
    }, [errorOrder]);

    if (!orderResponse && !errorOrder) return <OrderDetailsSkeletons />;

    return (
        <div className="grid lg:grid-cols-[2fr_1fr] md:gap-1 gap-3 md:p-2 md:pl-1 p-2.5 !z-1 relative bg-white mt-4">
            <ProductShow error={errorOrder?.message || errorOrder?.error?.message} order={order} />
            <PaymentInformation error={errorOrder?.message || errorOrder?.error?.message} order={order} />
        </div>
    );
};

export default OrderDetailsContainer;