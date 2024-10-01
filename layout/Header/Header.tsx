"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavbarFinal from "../../components/Navbar/NavbarFinal";
import ContactMeModal from "../../components/Modals/ContactMeModal";
import ContactMeForm from "../../components/Forms/ContactMeForm";
import OutlineButton from "../../components/Buttons/OutlineButton";
import { PiPhoneIncomingLight } from "react-icons/pi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import NavbarMobile from "../../components/Navbar/NavbarMobile";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isMobileMenueShown, setIsMobileMenueShown] = useState<boolean>(false);
  const handleShowMenu = () => {
    setIsMobileMenueShown((p) => !p);
  };

  return (
    <motion.header
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      className="container pointer-events-none absolute left-0 right-0 top-10 z-50 grid grid-cols-3 items-center py-0 text-xl text-white max-sm:grid-cols-2"
    >
      <Logo />

      <NavbarFinal classNames="fixed z-50" />

      <AnimatePresence>
        {isMobileMenueShown && (
          <NavbarMobile
            classNames="fixed z-50 top-0 left-0 w-full min-h-max"
            handleShowMenu={handleShowMenu}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-auto fixed z-50 place-self-end self-center max-sm:right-[20px]">
        <MobileMenuButton
          showMenu={handleShowMenu}
          isMenueShown={isMobileMenueShown}
        />

        <OutlineButton
          className="hidden font-secondary text-[16px] font-normal md:block lg:text-xl xl:text-2xl"
          onClick={openModal}
        >
          <span className="flex items-center justify-between gap-2">
            <PiPhoneIncomingLight />
            Связаться
          </span>
        </OutlineButton>
        <ContactMeModal isOpen={isModalOpen} onClose={closeModal}>
          <ContactMeForm onClose={closeModal} />
        </ContactMeModal>
      </div>
    </motion.header>
  );
};

export default Header;

export const Logo = () => {
  return (
    <Link href={""} className="">
      <p className="pointer-events-auto font-main text-lg font-bold md:text-xs lg:text-[18px] xl:text-2xl">
        <span className="text-white">Владислав </span>
        <span className="text-yellow mix-blend-difference">Беденко</span>
      </p>
    </Link>
  );
};

const MobileMenuButton = ({
  showMenu,
  isMenueShown,
}: {
  showMenu: () => void;
  isMenueShown: boolean;
}) => {
  return (
    <motion.button
      className="col-span-2 block size-12 rounded-full border-2 border-yellow p-0 text-center transition-transform duration-200 md:hidden"
      onClick={showMenu}
      style={{
        scaleX: isMenueShown ? -1 : 1,
      }}
    >
      <MdKeyboardDoubleArrowLeft className="text-[42px] text-yellow" />
    </motion.button>
  );
};
