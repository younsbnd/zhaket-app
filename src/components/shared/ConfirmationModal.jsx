import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React from "react";

const ConfirmationModal = ({
  title,
  description,
  onClose,
  onConfirm,
  isOpen,
  onOpenChange,
  ...rest
}) => {
  return (
    // confirmation modal
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      closeButton
      {...rest}
    >
      {/* modal content */}
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h5>{title}</h5>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm">{description}</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex gap-2">
                <Button onPress={onClose} variant="flat">
                  انصراف
                </Button>
                <Button onPress={onConfirm} color="danger" variant="flat">
                  تایید
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
