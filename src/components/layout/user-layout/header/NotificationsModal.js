"use client";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from "@heroui/react";
import { CiBellOn } from "react-icons/ci";
import { HiX } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";

/**
 * NotificationsDrawer Component
 * 
 * A responsive drawer component for displaying user notifications
 * Uses HeroUI Drawer component with custom styling
 * 
 * @param {boolean} isOpen - Controls drawer visibility
 * @param {function} onOpenChange - Callback function for drawer state changes
 */
export default function NotificationsDrawer({ isOpen, onOpenChange }) {
    return (
        <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="left"
            size="sm"
        >
            <DrawerContent className="fixed z-50 flex h-auto flex-col border border-gray-200 rounded-none mr-24 left-0 inset-y-0 w-full md:w-[366px]">
                {(onClose) => (
                    <div className="text-right bg-transparent mx-auto w-full overflow-y-auto pb-20">
                        {/* Drawer Header Section */}
                        <div className="gap-1.5 p-4 text-center sm:text-left flex justify-between z-50 sticky bg-white top-0 left-0 items-center">
                            {/* Header Title with Icon */}
                            <div className="text-right bg-transparent flex gap-3 items-center">
                                <CiBellOn className="text-[#eb8900b5] text-2xl" />
                                <p className="!text-base font-normal text-gray-800">اعلانات</p>
                            </div>
                            
                            {/* Close Button - Fixed nested button hydration error */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center !transition-all duration-300 gap-2 rounded-md focus-visible:outline-none px-3 bg-[#f9f4f99b] hover:text-white w-[40px] h-[40px]"
                                aria-label="Close notifications drawer"
                            >
                                <HiX className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Drawer Body Section */}
                        <div className="text-right bg-transparent p-4">
                            {/* Empty State for Notifications */}
                            <div className="text-right flex justify-center items-center bg-transparent min-h-[100px]">
                                <p className="!text-base font-normal leading-relaxed text-gray-main">
                                    شما اعلان ندارید.
                                </p>
                            </div>
                        </div>

                        {/* Footer Section with Action Button */}
                        <div className="mt-auto flex flex-col gap-2 p-5 bottom-0 absolute bg-[#fcfafcd7] w-full">
                            <button 
                                className="text-gray-400 p-2 rounded-md border-1 border-gray-300 hover:bg-gray-600 hover:text-white bg-white transition-colors duration-200" 
                                type="button"
                                aria-label="View all notifications"
                            >
                                مشاهده همه
                            </button>
                        </div>
                    </div>
                )}
            </DrawerContent>
        </Drawer>
    );
}
