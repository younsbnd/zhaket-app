"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { Card, CardBody, addToast } from "@heroui/react";
import { useParams } from "next/navigation";
import AdminTicketDetailSkeleton from "@/components/skeletons/admin/AdminTicketDetailSkeleton";
import { useCrud } from "@/hooks/useCrud";
import EmptyComment from "./EmptyComment";
import CommentHeader from "./detail/CommentHeader";
import CommentContent from "./detail/CommentContent";
import RepliesSection from "./detail/RepliesSection";
import ReplyFormSection from "./detail/ReplyFormSection";

const CommentDetailLogic = () => {
  const params = useParams();
  const { id: commentId } = params;
  const { updateRecord, isLoading: isUpdating } = useCrud("/admin/comments");
  const { deleteRecord, isLoading: isDeleting } = useCrud("/admin/comments");

  // Fetch comment data
  const { data, isLoading, error, mutate } = useSWR(
    commentId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/comments/${commentId}`
      : null,
    fetcher
  );

  const comment = data?.comment;
  const replies = data?.replies || [];

  // Toggle approval handler
  const toggleApprovalHandler = async () => {
    try {
      const response = await updateRecord(commentId, {
        isApproved: !comment.isApproved,
      });
      if (response.ok) {
        addToast({
          description: !comment.isApproved
            ? "نظر با موفقیت تایید شد"
            : "نظر رد شد و از نمایش عمومی حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        mutate(); 
      }
    } catch (error) {
      addToast({
        description: error.message || "خطا در تغییر وضعیت نظر",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // Delete reply handler
  const deleteReplyHandler = async (replyId) => {
    try {
      const response = await deleteRecord(replyId);
      if (response.ok) {
        addToast({
          description: "پاسخ با موفقیت حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        mutate();
      }
    } catch (error) {
      addToast({
        description: error.message || "خطا در حذف پاسخ",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // If loading, show a skeleton
  if (isLoading) {
    return <AdminTicketDetailSkeleton />;
  }

  // If error or comment not found, show a message
  if (error || !comment) {
    return <EmptyComment />;
  }

  // if comment is found, show the comment detail
  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <Card className="glass">
          <CardBody className="p-0">
            {/* comment header */}
            <CommentHeader
              comment={comment}
              onToggleApproval={toggleApprovalHandler}
              isUpdating={isUpdating}
            />

            {/* comment content */}
            <CommentContent comment={comment} />

            {/* replies section */}
            <RepliesSection
              replies={replies}
              onDeleteReply={deleteReplyHandler}
              isDeleting={isDeleting}
            />

            {/* reply form section */}
            <ReplyFormSection commentId={commentId} onSuccess={mutate} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CommentDetailLogic;
