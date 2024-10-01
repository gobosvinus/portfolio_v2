import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ArrowButtonAnimation from "../Animations/ArrowButtonAnimation";
import Loader from "../ui/Loader";

const ServiceCardUpdated = ({
  id,
  url,
  title,
  description,
}: {
  id: number;
  url: string;
  title: string;
  description: string;
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={`relative h-full overflow-hidden bg-transparent hover:cursor-pointer ${selected ? "z-50" : "z-5"}`}
      style={{ scale: selected === id ? 1.1 : 1, transition: "all 0.2s ease" }}
      onMouseEnter={() => setSelected(id)}
      onMouseLeave={() => setSelected(null)}
    >
      <Image
        src={url}
        alt="Placeholder alt"
        fill
        style={{ objectFit: "cover" }}
      />

      {id === 2 && <Loader />}

      <div className="absolute bottom-0 left-[20px] right-[20px] z-10 flex h-[25%] flex-col gap-4">
        <div className="flex items-center gap-2">
          <AnimatePresence mode="popLayout">
            {isHovered && <ArrowButtonAnimation />}
          </AnimatePresence>
          <motion.h3
            layout="position"
            transition={{ duration: 0.4 }}
            className={`${isHovered ? "flex justify-between gap-3" : "flex justify-between"} w-max items-center rounded-[4px] border border-black-600 bg-white p-1 text-xl uppercase text-black-600 hover:cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {title}
          </motion.h3>
        </div>

        <p className="font-secondary opacity-70 lg:text-xl">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 h-[30%] w-full backdrop-blur-sm backdrop-brightness-50 backdrop-filter" />
    </div>
  );
};

export default ServiceCardUpdated;
