import { motion, useWillChange } from "framer-motion";
import React, { useRef } from "react";
import FloatingPhone from "@/components/ui/FloatingPhone";
import Reveal from "@/components/Animations/Reveal";
import { useWindowWidth } from "@/context/WindowWidthProvider";

const PhoneContact = () => {
  const ref = useRef(null);
  const width = useWindowWidth();

  return (
    <section className="min-h-[80vh] w-screen overflow-y-hidden bg-black-500 max-sm:py-10 lg:h-max lg:py-40">
      <div className="container grid h-full place-items-center" ref={ref}>
        <Reveal coveringBox={false} delay={0} width={width}>
          <motion.div drag dragConstraints={ref} dragSnapToOrigin>
            <FloatingPhone />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default PhoneContact;
