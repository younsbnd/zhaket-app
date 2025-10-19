"use client";
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/api/fetcher';
import InvoicesDesignTable from './InvoicesDesignTable';

const InvoicesContainer = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Fetch invoices data
    const { data: invoicesResponse, error: errorInvoices } = useSWR(
        "/api/user/invoices",
        fetcher,
    );

    // Handle authentication
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    // Handle view details action
    const handleViewDetails = (invoice) => {
        router.push(`/panel/invoices/${invoice._id}`);
    };

    // Format currency with Persian numbers
    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return "۰";
        return new Intl.NumberFormat('fa-IR').format(amount);
    };

    // Format date to Persian locale
    const formatDate = (dateString) => {
        if (!dateString) return 'تاریخ نامشخص';
        return new Date(dateString).toLocaleDateString('fa-IR');
    };

    // Get payment status text based on payment result
    const getPaymentStatus = (invoice) => {
        const status = invoice.paymentResult?.status;
        if (status === "PAID") return 'پرداخت شده';
        if (status === "PENDING" || status === "FAILED") return 'در انتظار پرداخت';
        return 'پرداخت نشده';
    };

    // Get badge color based on payment status
    const getStatusBadgeColor = (invoice) => {
        const status = invoice.paymentResult?.status;
        if (status === "PAID") return "bg-green-100 text-green-800";
        if (status === "PENDING" || status === "FAILED") return "bg-[#FEF3E2] text-[#E5A653] ";
        return "bg-red-100 text-red-800";
    };

    // Process invoices data with helper functions
    const processedInvoices = (invoicesResponse?.data || []).map(invoice => ({
        ...invoice,
        formattedAmount: formatCurrency(invoice.totalPrice),
        formattedDate: formatDate(invoice.paymentResult?.paidAt),
        paymentStatus: getPaymentStatus(invoice),
        statusBadgeColor: getStatusBadgeColor(invoice)
    }));

    const errorMessage = errorInvoices?.message || errorInvoices?.error?.message;

    return (
        <InvoicesDesignTable
            invoices={processedInvoices}
            error={errorMessage}
            onViewDetails={handleViewDetails}
        />
    );
};

export default InvoicesContainer;