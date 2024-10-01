import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const Reveal = ({
  children,
  coveringBox = true,
  delay = 0.25,
}: {
  children: React.ReactNode;
  delay?: number;
  coveringBox?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: window?.innerWidth < 768 ? 0.5 : "all",
  });

  const variants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const variantBox: Variants = {
    hidden: { left: 0 },
    visible: { left: "100%" },
  };

  const variantsBoxMobile: Variants = {
    hidden: { bottom: 0 },
    visible: { bottom: "100%" },
  };

  return (
    <div ref={ref} className="relative w-fit">
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1.5, ease: "easeIn", delay: delay }}
      >
        {children}
      </motion.div>

      {coveringBox && (
        <motion.div
          variants={window?.innerWidth < 768 ? variantsBoxMobile : variantBox}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="inset-0 z-20 bg-yellow"
          style={{
            position: "absolute",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default Reveal;
