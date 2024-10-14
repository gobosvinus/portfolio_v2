import Image from "next/image";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ArrowButtonAnimation from "../Animations/ArrowButtonAnimation";
import Loader from "../ui/Loader";
import Link from "next/link";
import { useWindowWidth } from "@/context/WindowWidthProvider";

const ServiceCardUpdated = ({
  id,
  url,
  title,
  description,
  src,
}: {
  id: number;
  url: string;
  title: string;
  description: string;
  src: string;
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const buttonRef = useRef<HTMLHeadingElement | null>(null); // правильный тип

  const handleMouseDown = () => {
    setClicked(true); // Устанавливаем состояние "нажато"
  };

  const handleMouseUp = () => {
    setClicked(false); // Сбрасываем состояние после клика
    console.log("Mouse up, action confirmed");
  };
  const width = useWindowWidth();

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
            className={`${isHovered ? "flex justify-between gap-3" : "flex justify-between"} w-max items-center rounded-[4px] border ${clicked ? "border-black-600/90 bg-white/90" : "border-black-600 bg-white"} p-1 text-base uppercase text-black-600 hover:cursor-pointer lg:text-xl`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={buttonRef}
            onMouseDown={handleMouseDown}
          >
            <Link href={src}>
              {width && width < 1280 && id == 2 ? "ТГ-БОТЫ" : title}
            </Link>
          </motion.h3>
        </div>

        <p className="font-secondary text-base opacity-70 lg:text-xl">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-[30%] w-full backdrop-blur-sm backdrop-brightness-50 backdrop-filter" />
    </div>
  );
};

export default ServiceCardUpdated;
