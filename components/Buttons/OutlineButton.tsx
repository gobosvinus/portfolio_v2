import React from "react";
import { twMerge } from "tailwind-merge";

const OutlineButton = ({
  children,
  className,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={twMerge(
        "z-150 group relative px-4 py-2 font-medium text-white transition-all duration-[400ms] hover:scale-105 hover:text-yellow",
        className,
      )}
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-yellow transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-yellow transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-yellow transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-yellow transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default OutlineButton;
