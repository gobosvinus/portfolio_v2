"use client";

import AboutMe from "@/pages/landing/AboutMe";
import Competences from "@/pages/landing/Competences";
import Hero from "@/pages/landing/Hero";
import PhoneContact from "@/pages/landing/PhoneContact";
import Services from "@/pages/landing/Services";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main className="font-main text-white">
      <ReactLenis root>
        <Hero />

        <Competences />

        <Services />

        <AboutMe />

        <PhoneContact />
      </ReactLenis>
    </main>
  );
}
