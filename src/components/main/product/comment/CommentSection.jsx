"use client";
import React, { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { TfiCommentAlt } from "react-icons/tfi";
import { MdOutlineAddBox } from "react-icons/md";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";

const CommentSection = ({ productId }) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  // Fetch comments from API
  const {
    data: commentsData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    productId ? `/api/products/${productId}/comments` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const comments = commentsData?.data || [];

  // handle reply to a comment
  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setShowAddComment(true);
  };

  // handle cancel reply
  const handleCancelReply = () => {
    setReplyingTo(null);
    setShowAddComment(false);
  };

  // handle comment success
  const handleCommentSuccess = () => {
    setShowAddComment(false);
    setReplyingTo(null);
    mutate(); // Refresh comments
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-7 border-gray-100">
        {/* comment title and icon */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-11 w-11 rounded-full bg-white shadow-[0px_5px_20px_0px_rgba(219,146,78,0.3)]">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)]">
              <TfiCommentAlt className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-base font-bold text-gray-600">
            دیدگاه ها ({commentsData?.total || 0})
          </p>
        </div>
        {/* add comment button */}
        <div>
          <Button
            className="flex items-center gap-2 bg-lime-50 text-lime-500 hover:bg-lime-500 hover:text-white transition-all duration-400"
            radius="sm"
            onClick={() => setShowAddComment(!showAddComment)}
          >
            <MdOutlineAddBox className="text-[17px]" />
            <p className="text-base text-[13px]">افزودن دیدگاه</p>
          </Button>
        </div>
      </div>

      {/* Add comment form */}
      {showAddComment && (
        <div>
          <AddComment
            productId={productId}
            parentCommentId={replyingTo}
            onSuccess={handleCommentSuccess}
            onCancel={handleCancelReply}
          />
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Spinner size="lg" color="warning" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="py-8 text-center text-red-500">
          خطا در دریافت دیدگاه‌ها. لطفا دوباره تلاش کنید.
        </div>
      )}

      {/* Comments list */}
      {!isLoading && !error && comments.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              productId={productId}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && comments.length === 0 && (
        <div className="py-8 text-center text-gray-400">
          هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که دیدگاه می‌دهد!
        </div>
      )}
    </div>
  );
};

export default CommentSection;
