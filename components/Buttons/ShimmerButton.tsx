import React from "react";
import { twMerge } from "tailwind-merge";

const ShimmerButton = ({ className }: { className?: string }) => {
  return (
    <button
      className={twMerge(
        `animate-shimmer inline-flex h-10 w-max items-center justify-center rounded-md border border-white/10 bg-[linear-gradient(110deg,#171717,45%,#7A7975,55%,#171717)] bg-[length:200%_100%] p-3 font-secondary text-xs font-medium tracking-wider text-white/60 transition-all duration-300 hover:border-white/100 hover:text-white/100`,
        className,
      )}
    >
      Подробнее
    </button>
  );
};

export default ShimmerButton;
