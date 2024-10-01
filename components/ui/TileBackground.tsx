"use client";

import React, { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { motion } from "framer-motion";

// Размер плитки
// const REC_SIZE = 50;

const TileBackground = ({
  REC_SIZE = 50,
  beams = true,
  activeTiles = true,
}: {
  REC_SIZE: number;
  beams?: boolean;
  activeTiles?: boolean;
}) => {
  // Use custom Hook to get up-to-date sizes of the viewport
  const { width, height } = useWindowSize();

  // get number of cols and rows and then the amount of recs
  const cols = width ? Math.floor(width / REC_SIZE) : 0;
  const rows = height ? Math.floor(height / REC_SIZE) : 0;
  const totalTiles = cols * rows;

  // make the array to iterate through to build the background.
  // It will be updated automatically because of the hooks
  const tiles = Array.from({ length: totalTiles });

  if (!width || !height) return null;
  return (
    <div
      // ref={gridRef}
      id="tile-background"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${REC_SIZE}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${REC_SIZE}px, 1fr))`,
        width: "100dvw",
        height: "100dvh",
        position: "absolute",
        zIndex: "0",
      }}
    >
      {tiles.map((_, index) => (
        <Tile key={index} id={index} activeTiles={activeTiles} />
      ))}

      {/* Опционально лучи */}
      {beams && (
        <Beams BOX_SIZE={REC_SIZE} columnNumber={cols} rowNumber={rows} />
      )}
    </div>
  );
};

export default TileBackground;

const Tile = ({ id, activeTiles }: { id: number; activeTiles: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`tile-${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border border-[#1F2025] ${isHovered && activeTiles ? "border-none bg-slate-500 transition-all duration-[0.08s]" : "bg-[#171717] transition-all duration-[2s] ease-in-out"}`}
    ></div>
  );
};

const Beams = ({
  BOX_SIZE,
  columnNumber,
  rowNumber,
}: {
  BOX_SIZE: number;
  columnNumber: number;
  rowNumber: number;
}) => {
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
