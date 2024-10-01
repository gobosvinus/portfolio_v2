import React from "react";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";

const BeamedBackground = ({ BOX_SIZE = 32 }: { BOX_SIZE: number }) => {
  return (
    <section className="relative z-0 h-screen overflow-hidden">
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${BOX_SIZE}' height='${BOX_SIZE}' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M0.5 0.5H31.5V31.5H0.5V0.5Z' fill='%23171717' stroke='%231F2025'/%3E%3C/svg%3E")`,
        }}
        className="-z-1 absolute inset-0"
      />

      <Beams BOX_SIZE={BOX_SIZE} />
    </section>
  );
};

//
export default BeamedBackground;

const Beams = ({ BOX_SIZE }: { BOX_SIZE: number }) => {
  const { width, height } = useWindowSize();
  if (!width || !height) return null;

  const columnNumber = Math.floor(width / BOX_SIZE);
  const rowNumber = Math.floor(height / BOX_SIZE);

  const positions = [
    {
      top: rowNumber * BOX_SIZE * 0.1,
      left: BOX_SIZE * Math.floor(columnNumber * 0.25),
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
        delay: 0.5,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.3,
      left: BOX_SIZE * Math.floor(columnNumber * 0.65),
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.2,
        delay: 0.7,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.5,
      left: BOX_SIZE * Math.floor(columnNumber * 0.45),
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.8,
        delay: 1,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.7,
      left: BOX_SIZE * Math.floor(columnNumber * 0.15),
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.5,
        delay: 0.5, // перекликается с первым
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.9,
      left: BOX_SIZE * Math.floor(columnNumber * 0.75),
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.3,
        delay: 1.2,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 1.1,
      left: BOX_SIZE * Math.floor(columnNumber * 0.35),
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
        delay: 0.7, // перекликается с вторым
      },
    },
    {
      top: rowNumber * BOX_SIZE * 1.3,
      left: BOX_SIZE * Math.floor(columnNumber * 0.85),
      transition: {
        duration: 2.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.7,
        delay: 1.5,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 1.5,
      left: BOX_SIZE * Math.floor(columnNumber * 0.5),
      transition: {
        duration: 3.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
        delay: 1.2, // перекликается с пятым
      },
    },
    {
      top: rowNumber * BOX_SIZE * 1.7,
      left: BOX_SIZE * Math.floor(columnNumber * 0.95),
      transition: {
        duration: 2.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.8,
        delay: 0.9,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.1,
      left: BOX_SIZE * Math.floor(columnNumber * 0.75),
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
        delay: 0.6, // уникальный
      },
    },
    {
      top: rowNumber * BOX_SIZE * 5,
      left: BOX_SIZE * Math.floor(columnNumber * 0.25),
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
        delay: 0.6, // уникальный
      },
    },
    {
      top: rowNumber * BOX_SIZE * 3,
      left: BOX_SIZE * Math.floor(columnNumber * 0.75),
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
        delay: 0.6, // уникальный
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.3,
      left: BOX_SIZE * Math.floor(columnNumber * 0.85),
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.2,
        delay: 1.3,
      },
    },
    {
      top: rowNumber * BOX_SIZE * 0.5,
      left: BOX_SIZE * Math.floor(columnNumber * 0.95),
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.8,
        delay: 1, // перекликается с третьим
      },
    },
  ];

  return (
    <>
      {positions.map((element, index) => {
        return (
          <Beam
            left={element.left}
            top={element.top}
            transition={element.transition}
            key={index}
          />
        );
      })}
    </>
  );
};

const Beam = ({ left, top, transition }: BeamProps) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 32 * 8, opacity: [0, 1, 0] }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        left: left,
        top: top,
      }}
      className="absolute left-8 top-8 h-[200px] w-[1.5px] bg-gradient-to-b from-slate-500/0 to-slate-500/100"
    ></motion.div>
  );
};

interface BeamProps {
  left: number;
  top: number;
  transition?: {};
}
