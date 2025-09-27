"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import ControlledInput from "@/components/shared/forms/ControlledInput";

const EditPasswordForm = ({
    handleSubmit,
    onSubmit,
    errors,
    isLoading = false,
    serverError,
    control,
    watch,
}) => {
    // State for toggling password visibility
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Watch new password to validate confirmation
    const watchedNewPassword = watch("newPassword");
    return (
        <div className="w-full  mt-[170px]  flex justify-center">
            <div className="w-full max-w-md">
                {/* Server Error Display */}
                {serverError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-red-800 text-sm">{serverError}</span>
                        </div>
                    </div>
                )}

                {/* Page Header */}
                <div className="flex items-center gap-3 mb-6">
                    <FiLock className="text-gray-800 text-xl" />
                    <span className="text-gray-800 font-medium">تغییر رمز عبور</span>
                </div>

                {/* Password Change Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* New Password Input Field */}
                    <ControlledInput
                        name="newPassword"
                        control={control}
                        placeholder="رمز عبور جدید"
                        variant="bordered"
                        color="warning"
                        size="lg"
                        type={showNewPassword ? "text" : "password"}
                        errors={errors}
                        rules={{
                            required: "وارد کردن رمز عبور جدید الزامی است",
                            minLength: {
                                value: 3,
                                message: "رمز عبور باید حداقل ۳ کاراکتر باشد"
                            },
                            validate: {
                                // Validate uppercase letter requirement
                                hasUppercase: (value) =>
                                    /[A-Z]/.test(value) || "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد"
                            }
                        }}
                        // Password visibility toggle button
                        endContent={
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                                aria-label="Toggle password visibility"
                            >
                                {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        }
                        // Lock icon
                        startContent={<FiLock className="text-gray-400 text-[16px]" />}
                        classNames={{
                            input: "placeholder:text-gray-500/85 placeholder:text-[12px] placeholder:font-semibold text-[12px] text-gray-500",
                            inputWrapper: "border-gray-300 hover:border-amber-300 focus-within:!border-amber-400 transition-all duration-200 focus-within:shadow-lg focus-within:shadow-amber-200/30"
                        }}
                        autoComplete="new-password"
                    />

                    {/* Confirm Password Input Field */}
                    <ControlledInput
                        name="confirmPassword"
                        control={control}
                        placeholder="تکرار رمز عبور جدید"
                        variant="bordered"
                        color="warning"
                        size="lg"
                        type={showConfirmPassword ? "text" : "password"}
                        errors={errors}
                        rules={{
                            required: "تکرار رمز عبور الزامی است",
                            validate: {
                                // Validate password confirmation match
                                passwordsMatch: (value) =>
                                    value === watchedNewPassword || "رمز عبور و تکرار آن یکسان نیستند"
                            }
                        }}
                        // Password visibility toggle button
                        endContent={
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        }
                        // Lock icon
                        startContent={<FiLock className="text-gray-400 text-[16px]" />}
                        classNames={{
                            input: "placeholder:text-gray-500/85 placeholder:text-[12px] placeholder:font-semibold text-[12px] text-gray-500",
                            inputWrapper: "border-gray-300 hover:border-amber-300 focus-within:!border-amber-400 transition-all duration-200 focus-within:shadow-lg focus-within:shadow-amber-200/30"
                        }}
                        autoComplete="new-password"
                    />

                    {/* Submit Button */}
                    <Button
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        radius="sm"
                        type="submit"
                        color="warning"
                        className="w-full text-white text-[12px] mt-3 py-6 font-semibold"
                    >
                        {isLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default EditPasswordForm;
