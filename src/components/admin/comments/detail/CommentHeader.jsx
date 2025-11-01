"use client";

import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const CommentHeader = ({ comment, onToggleApproval, isUpdating }) => {
  return (
    <div className="p-4 md:p-6 border-b border-white/10">
      {/* comment header title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-white">جزئیات نظر</h1>
        {/* back to comments list */}
        <Button
          size="sm"
          as={Link}
          href="/admin/comments"
          variant="bordered"
          className="text-white border-white/20"
        >
          بازگشت به لیست
        </Button>
      </div>

      {/* Product Info */}
      {comment.product && (
        <div className="mb-4 flex items-center gap-2">
          <p className="text-white/60 text-sm mb-1">محصول:</p>
          <Link
            href={`/category/web/${comment.product.slug}`}
            className="text-blue-400 hover:text-blue-300 text-base font-semibold"
          >
            {comment.product.title}
          </Link>
        </div>
      )}

      {/* Approval Status and Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <Chip
          color={comment.isApproved ? "success" : "warning"}
          variant="flat"
          size="md"
          className="text-white"
        >
          {comment.isApproved ? "تایید شده" : "در انتظار تایید"}
        </Chip>

        <Chip
          color={comment.parentComment ? "primary" : "primary"}
          variant="flat"
          size="md"
        >
          {comment.parentComment ? "پاسخ به نظر دیگر" : "نظر اصلی"}
        </Chip>

        {/* approval status and actions */}
        <Button
          size="sm"
          color={comment.isApproved ? "warning" : "success"}
          variant="shadow"
          onPress={onToggleApproval}
          isLoading={isUpdating}
          startContent={
            comment.isApproved ? (
              <MdCancel size={18} />
            ) : (
              <MdCheckCircle size={18} />
            )
          }
        >
          {comment.isApproved ? "رد کردن نظر" : "تایید نظر"}
        </Button>
      </div>
    </div>
  );
};

export default CommentHeader;
