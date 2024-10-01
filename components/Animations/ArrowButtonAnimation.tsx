import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const ArrowButtonAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, x: "-50%" }}
      className="grid size-6 place-items-center rounded-full bg-white p-0"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ x: "-50%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <FiArrowRight className="text-xl text-black-600" />
      </motion.div>
    </motion.div>
  );
};

export default ArrowButtonAnimation;
