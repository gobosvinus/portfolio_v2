"use client";

import { FOOTER_DATA } from "@/data/static";
import { FooterBlock as FooterBlockType } from "@/types/types.config";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { TiTick } from "react-icons/ti";
import { FiCopy } from "react-icons/fi";
import Link from "next/link";
import { FaAngleDoubleUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="min-h-max w-screen overflow-hidden bg-black-400 font-secondary text-white max-sm:relative">
      <div className="container flex h-full flex-col justify-between">
        <div className="flex items-start justify-between max-sm:flex-col max-sm:gap-2">
          {FOOTER_DATA.map((block, index) => {
            return <FooterBlock block={block} key={index} />;
          })}
        </div>

        <div className="flex items-center justify-between max-sm:mt-10 max-sm:self-end md:mb-5">
          <ScrollUpButton classNames="self-end size-max max-sm:absolute max-sm:top-[65%] max-sm:right-[10%]" />

          <div className="flex flex-col">
            <p className="font-secondary opacity-60">
              Copyright © 2024 Владислав Беденко
            </p>
            <Link
              href={"/policy"}
              className="self-end font-secondary text-base opacity-60 transition-opacity hover:cursor-pointer hover:opacity-100"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const ScrollUpButton = ({
  classNames,
  textSize,
}: {
  classNames: string;
  textSize?: number;
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавный скролл
    });
  };
  return (
    <button className={classNames} onClick={scrollToTop}>
      <FaAngleDoubleUp
        className={`text-5xl text-yellow opacity-60 transition-all hover:-translate-y-3 hover:scale-105 hover:opacity-100`}
      />
    </button>
  );
};

const FooterBlock = ({ block }: { block: FooterBlockType }) => {
  return (
    <div className="flex flex-col gap-4 pt-5 font-secondary text-xl md:pt-10">
      <h4>{block.title}</h4>
      <ul className="flex flex-col justify-start gap-2 text-base max-sm:-mt-2 md:mt-2 md:gap-4">
        {block.content.map((item, index) => {
          return (
            <li
              className="flex items-center gap-2 text-white opacity-60 transition-opacity hover:cursor-pointer hover:opacity-100 md:gap-4"
              key={index}
            >
              {block.title !== "Email" && "Icon" in item && item.Icon && (
                <Link href={item.href ? item.href : "/"}>
                  <item.Icon className={twMerge("text-lg", item.className)} />
                </Link>
              )}

              {block.title !== "Email" ? (
                <Link href={item.href ? item.href : "/"}>{item.name}</Link>
              ) : (
                <CopyEmail email="vlad22420@gmail.com" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CopyEmail = ({ email }: { email: string }) => {
  const [icon, setIcon] = useState("copy");

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIcon("tick");

      // Установить таймаут для сброса иконки через 2 секунды
      setTimeout(() => setIcon("copy"), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <motion.button
      whileTap={{ y: "-20%" }}
      onClick={handleClick}
      className="flex items-center gap-4"
    >
      {/* RENDER ICON CONDITIONALLY */}
      {icon === "copy" && <AnimatedIcon icon={icon} />}

      {icon === "tick" && <AnimatedIcon icon={icon} />}

      <span>{email}</span>
    </motion.button>
  );
};

const AnimatedIcon = ({ icon }: { icon: string }) => {
  return (
    <motion.div
      initial={{ y: "50%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon === "copy" ? <FiCopy /> : <TiTick />}
    </motion.div>
  );
};
