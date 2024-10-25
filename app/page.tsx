"use client";

import { ReactLenis } from "lenis/react";
import { WindowWidthProvider } from "@/context/WindowWidthProvider";

// Импортируем компоненты напрямую
import AboutMe from "@/pages/landing/AboutMe";
import Competences from "@/pages/landing/Competences";
import Hero from "@/pages/landing/Hero";
import PhoneContact from "@/pages/landing/PhoneContact";
import Services from "@/pages/landing/Services";
import React, { useEffect } from "react";
import Preloader from "@/components/Preloaders/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <main className="font-main text-white">
      <ReactLenis root>
        <WindowWidthProvider>
          <Hero />
          <Competences />
          <Services />
          <AboutMe />
          <PhoneContact />
        </WindowWidthProvider>
      </ReactLenis>
    </main>
  );
}
