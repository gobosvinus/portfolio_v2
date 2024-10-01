"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { NAVBAR_DATA } from "@/data/static";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface PositionState {
  left: number;
  width: number;
  opacity: number;
}

const NavbarFinal = ({ classNames }: { classNames?: string }) => {
  const [position, setPosition] = useState<PositionState>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav
      className={twMerge(
        "hidden place-self-center rounded-full border border-black-400 bg-black-500 px-2 py-1 font-normal md:block",
        classNames,
      )}
    >
      <ul
        onMouseLeave={() =>
          setPosition((prev) => {
            return { ...prev, opacity: 0 };
          })
        }
        className="pointer-events-auto relative flex gap-5 font-secondary"
      >
        {NAVBAR_DATA.map((element) => {
          return (
            <Tab
              setPosition={setPosition}
              key={element.id}
              id={element.id}
              href={element.href}
            >
              {element.title}
            </Tab>
          );
        })}

        <Cursor position={position} />
      </ul>
    </nav>
  );
};

export default NavbarFinal;

const Tab = ({
  children,
  setPosition,
  id,
  href,
}: {
  children: string;
  setPosition: React.Dispatch<React.SetStateAction<PositionState>>;
  id: number;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement | null>(null);
  return (
    <li
      id={`tab-${id}`}
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width: width,
          opacity: 1,
        });
      }}
      className="relative z-10 cursor-pointer rounded-full px-3 py-1 text-base opacity-50 transition-opacity duration-300 hover:opacity-100 md:text-xs lg:text-base xl:text-xl"
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

const Cursor = ({ position }: { position: PositionState }) => {
  return (
    <motion.div
      animate={position}
      className="absolute z-0 h-[35px] rounded-full bg-black-400 md:h-[25px] lg:h-[30px] xl:h-[35px]"
    />
  );
};
