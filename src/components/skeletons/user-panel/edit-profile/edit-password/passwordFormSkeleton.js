import React from "react";
import { Skeleton } from "@heroui/react";
import { FiLock } from "react-icons/fi";

const PasswordFormSkeleton = () => {
    return (
        <div className="w-full min-h-screen mt-[200px] p-4 flex justify-center">
            <div className="w-full max-w-md">

                {/* Page Header Skeleton */}
                <div className="flex items-center gap-3 mb-6">
                    {/* Lock icon - static as it's always the same */}
                    <FiLock className="text-gray-300 text-xl" />
                    {/* Page title skeleton */}
                    <Skeleton className="rounded-lg">
                        <div className="h-6 w-28 bg-gray-200"></div>
                    </Skeleton>
                </div>

                {/* Form Container */}
                <div className="flex flex-col gap-4">

                    {/* New Password Field Skeleton */}
                    <div className="relative">
                        <Skeleton className="rounded-lg">
                            {/* Input field skeleton matching the lg size and bordered variant */}
                            <div className="h-14 w-full bg-gray-200 border border-gray-300 rounded-lg"></div>
                        </Skeleton>

                        {/* Start content (Lock icon) skeleton */}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Skeleton className="rounded">
                                <div className="w-4 h-4 bg-gray-300"></div>
                            </Skeleton>
                        </div>

                        {/* End content (Eye icon) skeleton */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Skeleton className="rounded">
                                <div className="w-4 h-4 bg-gray-300"></div>
                            </Skeleton>
                        </div>
                    </div>

                    {/* Confirm Password Field Skeleton */}
                    <div className="relative">
                        <Skeleton className="rounded-lg">
                            {/* Input field skeleton matching the lg size and bordered variant */}
                            <div className="h-14 w-full bg-gray-200 border border-gray-300 rounded-lg"></div>
                        </Skeleton>

                        {/* Start content (Lock icon) skeleton */}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Skeleton className="rounded">
                                <div className="w-4 h-4 bg-gray-300"></div>
                            </Skeleton>
                        </div>

                        {/* End content (Eye icon) skeleton */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Skeleton className="rounded">
                                <div className="w-4 h-4 bg-gray-300"></div>
                            </Skeleton>
                        </div>
                    </div>

                    {/* Submit Button Skeleton */}
                    <Skeleton className="rounded-sm mt-3">
                        {/* Button skeleton matching the py-6 height and warning color theme */}
                        <div className="h-12 w-full bg-yellow-300 rounded-sm"></div>
                    </Skeleton>

                </div>
            </div>
        </div>
    );
};

export default PasswordFormSkeleton;
