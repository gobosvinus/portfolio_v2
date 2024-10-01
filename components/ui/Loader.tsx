import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F2F3F] px-4 py-4">
      <div className="flex gap-2">
        <motion.div
          animate={{ opacity: [1, 0.5, 1], y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2 / 2,
            ease: "linear",
            delay: 0,
          }}
          className="size-2 rounded-full bg-blue-400"
        ></motion.div>
        <motion.div
          animate={{ opacity: [1, 0.5, 1], y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2 / 2,
            delay: 1 / 2,
          }}
          className="size-2 rounded-full bg-blue-400"
        ></motion.div>
        <motion.div
          className="size-2 rounded-full bg-blue-400"
          animate={{ opacity: [1, 0.5, 1], y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2 / 2,
            delay: 2 / 2,
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Loader;
