import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const AnimatedTip = ({ isInView }: { isInView: boolean }) => {
  return (
    <div className="absolute -bottom-[170%] left-[50%] flex -translate-x-1/2 flex-col items-center justify-center">
      <motion.svg
        initial={{ opacity: 1 }}
        animate={{ opacity: isInView ? [1, 1, 0] : 1 }}
        transition={{
          duration: 5,
          ease: "easeOut",
        }}
        width="110"
        height="54"
        viewBox="0 0 171 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
          d="M1 24.0002C65.4082 -7.71389 100.478 -3.99001 162 24.0002"
          stroke="#EBCD3F"
          stroke-width="5"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? [0, 0, 1] : 0 }}
          transition={{
            opacity: { duration: 3, ease: "easeOut" },
          }}
          d="M169.261 29.1393C170.054 28.898 170.501 28.0599 170.259 27.2674L166.326 14.353C166.085 13.5605 165.247 13.1137 164.454 13.355C163.662 13.5964 163.215 14.4344 163.457 15.2269L166.952 26.7064L155.473 30.2023C154.68 30.4437 154.234 31.2817 154.475 32.0742C154.716 32.8667 155.554 33.3135 156.347 33.0722L169.261 29.1393ZM159.294 24.3236L168.119 29.028L169.53 26.3807L160.706 21.6764L159.294 24.3236Z"
          fill="#EBCD3F"
        />
      </motion.svg>

      <motion.div
        initial={{ rotate: "-35deg", opacity: 0 }}
        animate={{
          rotate: isInView ? ["-35deg", "35deg"] : "-35deg",
          opacity: isInView ? [0, 1, 0] : 0,
        }}
        transition={{
          opacity: { duration: 5, ease: "easeOut" },
          rotate: { duration: 3, ease: "easeOut" },
        }}
      >
        <Image
          src="/assets/pointer.png"
          width={100}
          height={200}
          alt="pointer"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedTip;
