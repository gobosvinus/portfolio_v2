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
    <footer className="min-h-max w-screen bg-black-400 font-main text-white max-sm:relative">
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

// import { useRef } from "react";
// import { useInView } from "framer-motion";
// import {
//   SiTailwindcss,
//   SiJavascript,
//   SiTypescript,
//   SiSwift,
//   SiFigma,
//   SiPostgresql,
//   SiPython,
//   SiNodedotjs,
//   SiNextdotjs,
//   SiHtml5,
//   SiCss3,
//   SiFramer,
//   SiGithub,
//   SiReact,
// } from "react-icons/si";
// import { SpinningLogosData } from "@/types/types.config";

// const SpinningLogos = ({
//   iconWrapperWidth = window?.innerWidth < 1024
//     ? 72
//     : window?.innerWidth < 767
//       ? 56
//       : 96,
//   iconFontSize = window?.innerWidth < 1024
//     ? 42
//     : window?.innerWidth < 767
//       ? 32
//       : 58,
//   clockWise = true,
//   iconDataNumber,
// }: {
//   iconWrapperWidth?: number;
//   iconFontSize?: number;
//   clockWise: boolean;
//   iconDataNumber: number;
// }) => {
//   const ICONS_DATA = iconDataNumber === 1 ? ICONS_DATA_1 : ICONS_DATA_2;
//   const spinningContainerRef = useRef(null);
//   const isInView = useInView(spinningContainerRef, {
//     once: true,
//     amount: "all",
//   });

//   const [sizes, setSizes] = useState({
//     radiusToCenterOfIcons: 0,
//     iconWrapperWidth: iconWrapperWidth,
//     iconFontSize: iconFontSize,
//   });

//   const [isHovered, setIsHovered] = useState<number | null>(null);

//   // getting the radius to the center of an icon
//   useEffect(() => {
//     const handleFindRadius = () => {
//       if (!spinningContainerRef.current) return;

//       const { width } = spinningContainerRef.current.getBoundingClientRect();

//       console.log(width);

//       setSizes((prev) => {
//         return {
//           ...prev,
//           radiusToCenterOfIcons: width / 2,
//         };
//       });
//     };

//     handleFindRadius();

//     // window.addEventListener("resize", handleFindRadius);

//     // return () => window.removeEventListener("resize", handleFindRadius);
//   }, [iconWrapperWidth, iconFontSize]);

//   const handleMouseEnter = (index: number) => {
//     setIsHovered(index);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(null);
//   };

//   const variants = {
//     initial: {
//       rotate: 0,
//     },
//     final: {
//       rotate: clockWise ? 360 : -360,
//     },
//   };

//   return (
//     <motion.div
//       ref={spinningContainerRef}
//       variants={variants}
//       initial="initial"
//       animate={isInView ? "final" : "initial"}
//       transition={TRANSITION}
//       className="relative grid size-[400px] place-items-center rounded-full bg-yellow/50"
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//     >
//       {ICONS_DATA.map((icon, index) => {
//         const degrees = (360 / ICONS_DATA.length) * index;

//         const variants = {
//           initial: {
//             opacity: 0,
//             scale: 0,
//             x: 0,
//             y: 0,
//           },
//           final: {
//             opacity: 1,
//             rotate: 360,
//             scale: isHovered === index ? 1.2 : 1,
//             x:
//               sizes.radiusToCenterOfIcons *
//               Math.cos(degreesToRadiands(degrees)),
//             y:
//               sizes.radiusToCenterOfIcons *
//               Math.sin(degreesToRadiands(degrees)),
//           },
//         };
//         return (
//           <motion.div
//             variants={variants}
//             key={index}
//             onMouseEnter={() => handleMouseEnter(index)}
//             onMouseLeave={() => handleMouseLeave()}
//             initial="initial"
//             animate={isInView ? "final" : "initial"}
//             transition={{
//               opacity: { duration: 0.5 },
//               scale: { duration: 0.3, ease: "easeInOut" },
//               x: { duration: 2, ease: "easeInOut" },
//               y: { duration: 2, ease: "easeInOut" },
//               rotate: { repeat: Infinity, duration: 30, ease: "linear" },
//             }}
//             className={`absolute grid place-content-center rounded-full ${icon.classNames} shadow-[0_0_20px_5px_rgba(235,205,71,0.3)] hover:cursor-pointer`}
//             style={{
//               transformStyle: "preserve-3d",
//               width: sizes.iconWrapperWidth,
//               height: sizes.iconWrapperWidth,
//             }}
//           >
//             <icon.Icon className={`text-[${iconFontSize}px]`} />
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   );
// };

// const ICONS_DATA_1: SpinningLogosData[] = [
//   { Icon: SiTailwindcss, classNames: "bg-black-600" },
//   { Icon: SiJavascript, classNames: "bg-black-600" },
//   { Icon: SiTypescript, classNames: "bg-black-600" },
//   { Icon: SiSwift, classNames: "bg-black-600" },
//   { Icon: SiFigma, classNames: "bg-black-600" },
//   { Icon: SiPostgresql, classNames: "bg-black-600" },
//   { Icon: SiPython, classNames: "bg-black-600" },
// ];

// const ICONS_DATA_2: SpinningLogosData[] = [
//   { Icon: SiNodedotjs, classNames: "bg-black-600" },
//   { Icon: SiNextdotjs, classNames: "bg-black-600" },
//   { Icon: SiHtml5, classNames: "bg-black-600" },
//   { Icon: SiCss3, classNames: "bg-black-600" },
//   { Icon: SiFramer, classNames: "bg-black-600" },
//   { Icon: SiGithub, classNames: "bg-black-600" },
//   { Icon: SiReact, classNames: "bg-black-600" },
// ];

// const degreesToRadiands = (degrees: number) => (degrees * Math.PI) / 180;

// const TRANSITION = {
//   repeat: Infinity,
//   duration: 30,
//   ease: "linear",
// };
