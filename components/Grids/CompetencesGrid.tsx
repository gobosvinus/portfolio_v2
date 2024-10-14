import React, { useEffect, useRef, useState } from "react";
import SpinningLogos from "../ui/SpinningLogos";
import { motion, useInView } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";
import { useWindowWidth } from "@/context/WindowWidthProvider";

const CompetencesGrid = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: "all" });

  // const { width } = useWindowSize();
  const width = useWindowWidth();

  const variantsLeft = {
    initial: {
      left: "50%",
      bottom: "50%",
      translateX: "-50%",
      translateY: "50%",
    },
    final: {
      left: width && width < 768 ? "-19%" : "-15%", // max-lg: 18%
      bottom: "-25%",
      translateX: "0",
      translateY: "0",
    },
  };

  const variantsRight = {
    initial: {
      right: "50%",
      top: "50%",
      translateX: "50%",
      translateY: "-50%",
    },
    final: {
      right: width && width < 768 ? "-19%" : "-15%", // max-lg: 18%
      top: "-25%",
      translateX: "0",
      translateY: "0",
    },
  };

  return (
    <div
      className="container relative h-full overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        backgroundImage:
          "radial-gradient(100% 100% at 50% 50%, rgb(27, 27, 24) -20%, black )",
      }}
    >
      <h2 className="font-primary pt-8 text-2xl">Компетенции</h2>
      <div className="flex min-h-full justify-center">
        <motion.div
          variants={variantsLeft}
          initial="initial" // Начальная позиция в центре
          animate={isInView ? "final" : "initial"} // Конечная позиция
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute"
        >
          <SpinningLogos iconDataNumber={1} clockWise={false} />
        </motion.div>

        <motion.div
          variants={variantsRight}
          ref={ref}
          initial="initial" // Начальная позиция в центре
          animate={isInView ? "final" : "initial"} // Конечная позиция
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute"
        >
          <SpinningLogos iconDataNumber={2} clockWise={false} />
        </motion.div>
      </div>
    </div>
  );
};

export default CompetencesGrid;
