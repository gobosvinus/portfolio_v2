import useWindowSize from "@/hooks/useWindowSize";
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
  const { height } = useWindowSize();
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 z-[100] grid size-full place-items-center overflow-y-scroll backdrop-blur-md backdrop-brightness-75 backdrop-filter"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${height && height < 1000 ? "h-[80vh]" : "h-[60vh]"} min-w-[20%] max-w-[500px] max-sm:min-h-[90vh] max-sm:w-[90%]`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ContactMeModal;
