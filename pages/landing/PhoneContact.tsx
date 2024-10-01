import { motion } from "framer-motion";
import React, { useRef } from "react";
import FloatingPhone from "@/components/ui/FloatingPhone";
import Reveal from "@/components/Animations/Reveal";

const PhoneContact = () => {
  const ref = useRef(null);

  return (
    <section className="h-[80dvh] w-screen bg-black-500 max-sm:py-10 md:h-[70vh]">
      <div className="container grid h-full place-items-center" ref={ref}>
        <Reveal coveringBox={false} delay={0}>
          <motion.div drag dragConstraints={ref} dragSnapToOrigin>
            <FloatingPhone />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default PhoneContact;
