import { Logo } from "@/layout/Header/Header";
import React from "react";

const Preloader = () => {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-black-500">
      <Logo />
    </div>
  );
};

export default Preloader;
