"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiSwift,
  SiFigma,
  SiPostgresql,
  SiPython,
  SiNodedotjs,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiGithub,
  SiReact,
} from "react-icons/si";
import { SpinningLogosData } from "@/types/types.config";

interface SpinnigLogosSizesProps {
  radiusToCenterOfIcons: number;
  iconWrapperWidth: number;
  iconFontSize: number;
}

const SpinningLogos = ({
  iconWrapperWidth = 96,
  iconFontSize = 58,
  clockWise = true,
  iconDataNumber,
}: {
  iconWrapperWidth?: number;
  iconFontSize?: number;
  clockWise: boolean;
  iconDataNumber: number;
}) => {
  const ICONS_DATA = iconDataNumber === 1 ? ICONS_DATA_1 : ICONS_DATA_2;
  const spinningContainerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(spinningContainerRef, {
    once: true,
    amount: "all",
  });

  const [sizes, setSizes] = useState<SpinnigLogosSizesProps>({
    radiusToCenterOfIcons: 0,
    iconWrapperWidth: iconWrapperWidth,
    iconFontSize: iconFontSize,
  });

  const [isHovered, setIsHovered] = useState<number | null>(null);

  // getting the radius to the center of an icon
  useEffect(() => {
    if (!spinningContainerRef.current) return;

    const { width } = spinningContainerRef.current.getBoundingClientRect();

    setSizes((prev) => {
      return {
        ...prev,
        radiusToCenterOfIcons:
          window?.innerWidth < 768 ? width : width / 2 - iconWrapperWidth / 2,
      };
    });
  }, [iconWrapperWidth, iconFontSize, spinningContainerRef]);

  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  const variants: Variants = {
    initial: {
      rotate: 0,
    },
    final: {
      rotate: clockWise ? 360 : -360,
    },
  };

  return (
    <div
      ref={spinningContainerRef}
      className="grid place-items-center rounded-full"
      style={{
        transformStyle: "preserve-3d",
        height: "400px",
        width: "400px",
      }}
    >
      <motion.div
        variants={variants}
        initial="initial"
        animate={isInView ? "final" : "initial"}
        transition={TRANSITION}
        className="relative grid size-[200px] place-items-center rounded-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {ICONS_DATA.map((icon, index) => {
          const degrees: number = (360 / ICONS_DATA.length) * index;

          const variants: Variants = {
            initial: {
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            },
            final: {
              opacity: 1,
              rotate: 360,
              scale: isHovered === index ? 1.2 : 1,
              x:
                sizes.radiusToCenterOfIcons *
                Math.cos(degreesToRadiands(degrees)),
              y:
                sizes.radiusToCenterOfIcons *
                Math.sin(degreesToRadiands(degrees)),
            },
          };
          return (
            <motion.div
              variants={variants}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              initial="initial"
              animate={isInView ? "final" : "initial"}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.3, ease: "easeInOut" },
                x: { duration: 2, ease: "easeInOut" },
                y: { duration: 2, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 30, ease: "linear" },
              }}
              className={`absolute grid place-content-center rounded-full ${icon.classNames} shadow-[0_0_20px_5px_rgba(235,205,71,0.3)] hover:cursor-pointer`}
              style={{
                transformStyle: "preserve-3d",
                width: sizes.iconWrapperWidth,
                height: sizes.iconWrapperWidth,
                fontSize: `${iconFontSize}px`,
              }}
            >
              <icon.Icon className={`text-[${iconFontSize}px]`} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const ICONS_DATA_1: SpinningLogosData[] = [
  { Icon: SiTailwindcss, classNames: "bg-black-600" },
  { Icon: SiJavascript, classNames: "bg-black-600" },
  { Icon: SiTypescript, classNames: "bg-black-600" },
  { Icon: SiSwift, classNames: "bg-black-600" },
  { Icon: SiFigma, classNames: "bg-black-600" },
  { Icon: SiPostgresql, classNames: "bg-black-600" },
  { Icon: SiPython, classNames: "bg-black-600" },
];

const ICONS_DATA_2: SpinningLogosData[] = [
  { Icon: SiNodedotjs, classNames: "bg-black-600" },
  { Icon: SiNextdotjs, classNames: "bg-black-600" },
  { Icon: SiHtml5, classNames: "bg-black-600" },
  { Icon: SiCss3, classNames: "bg-black-600" },
  { Icon: SiFramer, classNames: "bg-black-600" },
  { Icon: SiGithub, classNames: "bg-black-600" },
  { Icon: SiReact, classNames: "bg-black-600" },
];

const degreesToRadiands = (degrees: number) => (degrees * Math.PI) / 180;

const TRANSITION = {
  repeat: Infinity,
  duration: 30,
  ease: "linear",
};

export default SpinningLogos;
