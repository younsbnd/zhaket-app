"use client";
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/api/fetcher';
import InvoicesDesignTable from './InvoicesDesignTable';
import InvoicesDesignTableSkeleton from '@/components/skeletons/user-panel/invoices/InvoicesDesignTableSkeleton';
import { addToast } from '@heroui/react';

const InvoicesContainer = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Fetch invoices data from API
    const { data: invoicesResponse, isLoading: isLoadingInvoices, error: errorInvoices } = useSWR(
        "/api/user/invoices",
        fetcher
    );

    // Check user authentication
    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/login");
    }, [session, status, router]);

    // Navigate to order details page
    const handleViewDetails = (invoice) => router.push(`/panel/invoices/${invoice._id}`);

    // Process and format invoices data
    const processedInvoices = (invoicesResponse?.data || [])
        .map(invoice => {
            const status = invoice.paymentResult?.status;
            return {
                ...invoice,
                formattedAmount: invoice.totalPrice ? new Intl.NumberFormat('fa-IR').format(invoice.totalPrice) : "۰",
                formattedDate: invoice.paymentResult?.paidAt || invoice.createdAt ?
                    new Date(invoice.paymentResult?.paidAt || invoice.createdAt).toLocaleDateString('fa-IR') : 'تاریخ نامشخص',
                paymentStatus: status === "PAID" ? 'پرداخت شده' :
                    status === "PENDING" || status === "FAILED" ? 'در انتظار پرداخت' : 'پرداخت نشده',
                statusBadgeColor: status === "PAID" ? "bg-green-100 text-green-800" :
                    status === "PENDING" || status === "FAILED" ? "bg-[#FEF3E2] text-[#E5A653]" :
                        "bg-red-100 text-red-800"
            };
        })
        .sort((a, b) => {
            // Get payment status for both invoices
            const statusA = a.paymentResult?.status || 'UNPAID';
            const statusB = b.paymentResult?.status || 'UNPAID';

            // Priority order: PAID first, then PENDING, then others
            const getStatusPriority = (status) => {
                if (status === 'PAID') return 1;
                if (status === 'PENDING') return 2;
                if (status === 'FAILED') return 3;
                return 4; // UNPAID or unknown
            };

            // Compare by status priority first
            const priorityA = getStatusPriority(statusA);
            const priorityB = getStatusPriority(statusB);

            if (priorityA !== priorityB) {
                return priorityA - priorityB; // Lower number = higher priority
            }

            // If same status, sort by date (newest first)
            const dateA = new Date(a.paymentResult?.paidAt || a.createdAt);
            const dateB = new Date(b.paymentResult?.paidAt || b.createdAt);
            return dateB - dateA;
        });

    // Handle API errors with toast
    useEffect(() => {
        if (errorInvoices) {
            addToast({
                description: errorInvoices?.message || errorInvoices?.error?.message || 'خطا در بارگذاری فاکتورها',
                color: "danger",
                shouldShowTimeoutProgress: true,
            });
        }
    }, [errorInvoices]);

    if (isLoadingInvoices || (!invoicesResponse && !errorInvoices)) return <InvoicesDesignTableSkeleton />;

    return (
        <InvoicesDesignTable
            invoices={processedInvoices}
            error={errorInvoices?.message || errorInvoices?.error?.message}
            onViewDetails={handleViewDetails}
        />
    );
};

export default InvoicesContainer;