"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { SiTelegram, SiInstagram, SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactMeModal from "../Modals/ContactMeModal";
import ContactMeForm from "../Forms/ContactMeForm";
import { usePathname } from "next/navigation";
import { NavbarMobileData } from "@/types/types.config";
import { NAVBAR_MOBILE_DATA } from "@/data/static";

const NavbarMobile = ({
  classNames,
  handleShowMenu,
}: {
  classNames?: string;
  handleShowMenu: () => void;
}) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const pathName = usePathname();

  const handleSelected = (id: number) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  return (
    <motion.nav
      initial={{ x: "+100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "+100%", opacity: 0 }}
      transition={TRANSITION}
      className={twMerge(
        "pointer-events-auto block rounded-b-3xl bg-black-500 px-5 font-main text-3xl text-yellow md:hidden",
        classNames,
      )}
    >
      <ul className="flex size-full flex-col justify-between divide-y">
        <MenuTab />

        {NAVBAR_MOBILE_DATA.map((element) => {
          return (
            <motion.li
              key={element.id}
              className="flex flex-col justify-between"
              layout="position"
              transition={{
                ease: "easeOut",
                duration: 0.5,
              }}
            >
              <Tab
                element={element}
                selected={selected}
                handleSelected={handleSelected}
                currentPath={pathName}
                handleShowMenu={handleShowMenu}
              />

              <AnimatePresence>
                {selected === element.id && (
                  <InnerContent element={element} href={element.href} />
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}

        <ContactTab />
      </ul>
    </motion.nav>
  );
};

export default NavbarMobile;

// Основная вкладка меню
const Tab = ({
  element,
  selected,
  handleSelected,
  currentPath,
  handleShowMenu,
}: {
  element: NavbarMobileData;
  selected: number | null;
  handleSelected: (id: number) => void;
  currentPath: string;
  handleShowMenu: () => void;
}) => {
  return (
    <div className="flex justify-between py-10">
      <Link
        href={element.href}
        className={`${element.id === 0 ? "text-2xl" : ""} ${currentPath === element.href ? "opacity-100" : "opacity-50"}`}
        onClick={handleShowMenu}
      >
        {element.title}
      </Link>

      {/* Стрелочка с анимацией */}
      <MdOutlineArrowBackIos
        onClick={() => handleSelected(element.id)}
        className={`${selected === element.id ? "rotate-90" : "-rotate-90"} text-white transition-transform duration-700`}
      />
    </div>
  );
};

// Кнопка связаться и иконки с соц. сетями
const ContactTab = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between py-10">
      <button
        className="rounded border p-2 text-white hover:cursor-pointer"
        onClick={handleOpenModal}
      >
        Связаться
      </button>
      <div className="flex gap-4 text-3xl">
        <Link href="https://t.me/gobosvin">
          <SiTelegram />
        </Link>

        <Link href="https://www.instagram.com/vludik_i/?img_index=1">
          <SiInstagram />
        </Link>

        <Link href="https://api.whatsapp.com/send/?phone=79041527074&text&type=phone_number&app_absent=0">
          <SiWhatsapp />
        </Link>
      </div>
      {isModalOpen && (
        <ContactMeModal onClose={handleCloseModal} isOpen={isModalOpen}>
          <ContactMeForm onClose={handleCloseModal} />
        </ContactMeModal>
      )}
    </div>
  );
};

// Надпись меню
const MenuTab = () => {
  return (
    <div className="flex justify-between py-12">
      <div className="text-2xl">Меню</div>
    </div>
  );
};

// Контент Вкладыша в меню
const InnerContent = ({
  element,
  href,
}: {
  element: NavbarMobileData;
  href: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
      className="-mt-5 flex flex-wrap gap-x-8 gap-y-3 pb-5 font-secondary text-xl"
    >
      {element.content?.map((element, index) => {
        return (
          <Link href={href} className="font-thin opacity-100" key={`${index}1`}>
            {element}
          </Link>
        );
      })}
    </motion.div>
  );
};

// Параметры спринг анимации
const TRANSITION: { type: string; bounce: number; duration: number } = {
  type: "spring",
  bounce: 0,
  duration: 1,
};
