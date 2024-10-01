import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
const ContactMeModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 z-50 grid size-full place-items-center backdrop-blur-md backdrop-brightness-75 backdrop-filter"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-[60%] min-w-[20%] max-w-[500px] max-sm:h-[90vh] max-sm:w-[90%]"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ContactMeModal;
