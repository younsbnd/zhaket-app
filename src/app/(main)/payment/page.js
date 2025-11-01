"use client";

import SuccessMessage from '@/components/main/payment/success-message/SuccessMessage';
import FailureMessage from '@/components/main/payment/failure-message/FailureMessage';
import { useSearchParams, redirect } from 'next/navigation';
import React, { Suspense } from "react";

// Payment content component with useSearchParams
function PaymentContent() {
    // Get URL search parameters
    const searchParams = useSearchParams();

    // Extract payment status from query string (?status=success or ?status=failed)
    const status = searchParams.get('status');

    // Render page based on payment status
    if (status === 'success') {
        // Show success page component
        return <SuccessMessage />;
    } else if (status === 'failed') {
        // Show failure page component
        return <FailureMessage />;
    } else {
        // Redirect to homepage if status is invalid or missing
        redirect('/');
    }
}

// Loading fallback component
function PaymentLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}

const PaymentPage = () => {
    return (
        <Suspense fallback={<PaymentLoading />}>
            <PaymentContent />
        </Suspense>
    );
};

export default PaymentPage;
