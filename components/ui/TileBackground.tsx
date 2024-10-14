"use client";

import React, { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { motion } from "framer-motion";
import { useWindowWidth } from "@/context/WindowWidthProvider";

// Размер плитки
// const REC_SIZE = 50;

const TileBackground = ({
  REC_SIZE = 50,
  beams = true,
}: {
  REC_SIZE: number;
  beams?: boolean;
}) => {
  // Use custom Hook to get up-to-date sizes of the viewport
  // const { width, height } = useWindowSize();
  const { height } = useWindowSize();
  const width = useWindowWidth();

  // get number of cols and rows and then the amount of recs
  const cols = width ? Math.floor(width / REC_SIZE) : 0;
  const rows = height ? Math.floor(height / REC_SIZE) : 0;

  // Рассчитываем фактический размер клетки на основе ширины экрана
  const actualRecSize = width ? width / cols : REC_SIZE;

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
        // gridTemplateColumns: `repeat(${cols}, ${REC_SIZE}px)`,
        // gridTemplateRows: `repeat(${rows}, ${REC_SIZE}px)`,
        width: "100dvw",
        height: "100dvh",
        position: "absolute",
        zIndex: "0",
        overflow: "hidden",
      }}
    >
      {tiles.map((_, index) => (
        <Tile
          key={index}
          id={index}
          activeTiles={window?.innerWidth < 768 ? false : true}
        />
      ))}

      {/* Опционально лучи */}
      {beams && (
        <Beams BOX_SIZE={actualRecSize} columnNumber={cols} rowNumber={rows} />
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
      top: BOX_SIZE * 0.15, // верхняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.2),
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 6, // увеличена пауза
        delay: 1,
      },
    },
    {
      top: BOX_SIZE * 0.35, // верхняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.65),
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 8, // увеличена пауза
        delay: 3, // изменено
      },
    },
    {
      top: BOX_SIZE * 0.5, // верхняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.45),
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 7,
        delay: 2,
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.7), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.1),
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 9,
        delay: 4, // изменено
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.45), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.75),
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 10,
        delay: 5, // изменено
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.77), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.35),
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 11,
        delay: 6, // изменено
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.8), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.85),
      transition: {
        duration: 2.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 12,
        delay: 7, // изменено
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.45), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.5),
      transition: {
        duration: 3.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 13,
        delay: 8, // изменено
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.55), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.95),
      transition: {
        duration: 2.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 9, // увеличена пауза
        delay: 3.5,
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.4), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.25),
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 12,
        delay: 6.5,
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.5), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.75),
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 13,
        delay: 7.5,
      },
    },
    {
      top: BOX_SIZE * Math.floor(rowNumber * 0.6), // нижняя часть
      left: BOX_SIZE * Math.floor(columnNumber * 0.95),
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 11,
        delay: 5.5,
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
