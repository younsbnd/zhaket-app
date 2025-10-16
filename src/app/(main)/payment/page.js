"use client";

import SuccessMessage from '@/components/main/payment/success-message/SuccessMessage';
import FailureMessage from '@/components/main/payment/failure-message/FailureMessage';
import { useSearchParams, redirect } from 'next/navigation';
import React from 'react';

const PaymentPage = () => {
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

    // Default fallback (empty)
    return (
        <div></div>
    );
};

export default PaymentPage;
