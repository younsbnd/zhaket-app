"use client";

import React, { useState } from "react";
import { Divider, Button } from "@heroui/react";
import { FiUser } from "react-icons/fi";
import { formatDate } from "@/lib/utils/formatDate";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

const RepliesSection = ({ replies, onDeleteReply, isDeleting }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);

  // handle delete click
  const handleDeleteClick = (replyId) => {
    setSelectedReplyId(replyId);
    setIsModalOpen(true);
  };

  // handle confirm delete
  const handleConfirmDelete = () => {
    if (selectedReplyId) {
      onDeleteReply(selectedReplyId);
      setIsModalOpen(false);
      setSelectedReplyId(null);
    }
  };

  // handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReplyId(null);
  };

  // if there are no replies, return null
  if (replies.length === 0) {
    return null;
  }

  return (
    <>
      <Divider className="bg-white/10" />
      <div className="p-4 md:p-6 bg-black/10">
        <h2 className="text-lg font-bold text-white mb-4 text-start">
          پاسخ‌ها ({replies.length})
        </h2>
        <div className="space-y-4">
          {/* replies */}
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10">
                    <FiUser className="w-4 h-4 text-white/60" />
                  </div>
                  {/* user info */}
                  <div>
                    <p className="text-white text-sm font-semibold text-start">
                      {reply.user?.fullName || "کاربر"}
                    </p>
                    <p className="text-white/60 text-xs text-start">
                      {formatDate(reply.createdAt)}
                    </p>
                  </div>
                </div>
                {/* delete button */}
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onPress={() => handleDeleteClick(reply._id)}
                  isLoading={isDeleting}
                  isDisabled={isDeleting}
                  className="text-white"
                >
                  حذف
                </Button>
              </div>
              <p className="text-white/80 text-sm text-start mt-5">{reply.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* confirmation modal for deleting a reply */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="حذف پاسخ"
        description="آیا مطمئنید که می‌خواهید این پاسخ را حذف کنید؟ این عمل قابل بازگشت نیست."
        onConfirm={handleConfirmDelete}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default RepliesSection;
