"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";
import ContactMeForm from "../Forms/ContactMeForm";
import ContactMeModal from "../Modals/ContactMeModal";

const FloatingPhone = () => {
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);

  return (
    <div
      onMouseDown={() => {
        setIsGrabbed(true);
      }}
      onMouseUp={() => {
        setIsGrabbed(false);
      }}
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className={`rounded-[24px] bg-yellow ${isGrabbed ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-[500px] w-[300px] rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px] lg:h-[600px] lg:w-[400px]"
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-4 w-32 -translate-x-[50%] rounded-md bg-neutral-900"></div>
      <div className="absolute right-3 top-2 z-10 flex gap-2">
        <FiWifi className="text-2xl text-neutral-600" />
        <FiBatteryCharging className="text-2xl text-neutral-600" />
      </div>
    </>
  );
};

const Screen = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
      <span className="text-5xl font-bold text-black-600">
        В<span className="text-5xl font-bold text-yellow">Б</span>
      </span>

      <button
        className="absolute bottom-4 left-20 right-20 z-10 w-max rounded-lg border-[1px] bg-white py-2 text-xl font-bold text-black-600 backdrop-blur max-sm:-translate-x-3 md:px-1"
        onClick={openModal}
      >
        Связаться
      </button>

      <div className="absolute -bottom-72 left-[50%] h-96 w-96 -translate-x-[50%] rounded-full bg-yellow" />
      <ContactMeModal isOpen={isModalOpen} onClose={closeModal}>
        <ContactMeForm onClose={closeModal} />
      </ContactMeModal>
    </div>
  );
};

export default FloatingPhone;