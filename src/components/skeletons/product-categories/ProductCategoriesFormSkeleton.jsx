import React from 'react';
import { Skeleton } from '@heroui/react';

const ProductCategoriesFormSkeleton = () => {
    return (
        <div className="glass rounded-2xl p-5">
            <div className="flex flex-col gap-4 w-full md:flex-row">
                {/* Name and Slug fields skeleton */}
                <div className="w-full">
                    <Skeleton className="w-32 h-4 bg-white/20 rounded mb-2" />
                    <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
                </div>
                <div className="w-full">
                    <Skeleton className="w-36 h-4 bg-white/20 rounded mb-2" />
                    <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
                </div>
            </div>

            {/* Image URL and Image Alt fields skeleton */}
            <div className="flex flex-col gap-4 w-full md:flex-row mt-4">
                <div className="w-full">
                    <Skeleton className="w-24 h-4 bg-white/20 rounded mb-2" />
                    <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
                </div>
                <div className="w-full">
                    <Skeleton className="w-32 h-4 bg-white/20 rounded mb-2" />
                    <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
                </div>
            </div>

            {/* Parent category select skeleton */}
            <div className="mt-4">
                <Skeleton className="w-28 h-4 bg-white/20 rounded mb-2" />
                <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
            </div>

            {/* Description textarea skeleton */}
            <div className="mt-4">
                <Skeleton className="w-20 h-4 bg-white/20 rounded mb-2" />
                <Skeleton className="w-full h-32 bg-slate-800 rounded-md" />
            </div>

            {/* Is Active switch skeleton */}
            <div className="mt-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-6 h-6 bg-white/20 rounded-full" />
                    <Skeleton className="w-32 h-4 bg-white/20 rounded" />
                </div>
            </div>

            {/* SEO Title field skeleton */}
            <div className="mt-4">
                <Skeleton className="w-24 h-4 bg-white/20 rounded mb-2" />
                <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
            </div>

            {/* Canonical field skeleton */}
            <div className="mt-4">
                <Skeleton className="w-28 h-4 bg-white/20 rounded mb-2" />
                <Skeleton className="w-full h-12 bg-slate-800 rounded-md" />
            </div>

            {/* Meta Description textarea skeleton */}
            <div className="mt-4">
                <Skeleton className="w-28 h-4 bg-white/20 rounded mb-2" />
                <Skeleton className="w-full h-24 bg-slate-800 rounded-md" />
            </div>

            {/* No Index switch skeleton */}
            <div className="mt-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-6 h-6 bg-white/20 rounded-full" />
                    <Skeleton className="w-28 h-4 bg-white/20 rounded" />
                </div>
            </div>

            {/* Submit button skeleton */}
            <div className="mt-6">
                <Skeleton className="w-full h-12 bg-gradient-to-l from-blue-600/50 to-indigo-700/50 rounded-xl" />
            </div>
        </div>
    );
};

export default ProductCategoriesFormSkeleton;