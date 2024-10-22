import React, { useRef } from "react";
import TileBackground from "@/components/ui/TileBackground";
import TiltCard from "@/components/Cards/TiltCard";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TextGenerateEffect from "@/components/Animations/TextGenerateEffect";

const Hero = () => {
  const myPhotoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: myPhotoRef,
    offset: ["center center", "end start"],
  });

  // Превращаем MotionValue в спринг для эффетка аним
  const progress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 200,
  });

  // Анимация фотки для паралакс эффекта
  const y = useTransform(progress, [0, 1], ["0%", "-100%"]);
  // Анимация текста Я Владислав для паралакс эффекта
  const translate = useTransform(progress, [0, 1], ["0%", "30%"]);

  return (
    <div
      className="relative h-max min-h-screen w-screen overflow-hidden"
      style={{
        boxShadow: "0 50px 75px -12px rgb(0 0 0 / 0.25)",
      }}
    >
      {/* Задний фон из активных плиток с лучами (опционально)*/}
      <TileBackground
        REC_SIZE={32}
        // activeTiles={window?.innerWidth < 768 ? false : true}
      />

      {/* Градиент фоновый слой */}
      <div
        style={{
          position: "absolute", // Позиционируем на весь экран
          pointerEvents: "none",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundImage:
            "radial-gradient(100% 90% at 50% 0%, transparent 40%, black)",
          zIndex: 0,
        }}
      ></div>

      <section className="container pointer-events-none relative z-10 pt-52 md:pt-0">
        <div className="flex flex-col md:flex-row md:justify-between">
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 1.05 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            // было lg:mt-[288px]
            className="z-10 flex flex-col md:mt-[288px] lg:mt-[32vh]"
            style={{
              translateY: translate,
              position: "relative",
            }}
          >
            <p className="font-secondary text-2xl">привет,</p>
            <h1 className="mt-5 font-main text-[25px] font-medium lg:text-[36px] xl:text-[40px] 2xl:text-[48px]">
              Я Владислав Беденко
              <br />
              <span className="font-main font-extrabold text-yellow mix-blend-difference">
                Full Stack Developer
              </span>
              <br />
              из Иркутска
            </h1>

            <div className="mt-5 font-secondary text-sm text-white opacity-50 mix-blend-difference lg:text-sm xl:text-lg">
              <TextGenerateEffect
                words={full_text}
                filter={false}
                duration={2}
                className="font-secondary text-sm text-white opacity-60"
              />

              <TextGenerateEffect
                words="а сейчас пока сделаю мелким шрифтом"
                filter={false}
                duration={2}
                className="font-secondary text-sm text-white opacity-60"
                delay={1.8}
              />
            </div>
          </motion.div>

          <motion.div
            ref={myPhotoRef}
            initial={{ y: -200, scale: 1.1 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            // было lg:mt-[288px]
            className="pointer-events-auto relative block pb-20 max-sm:hidden max-sm:self-center md:mt-[238px] lg:mt-[18vh]"
            style={{
              y,
            }}
          >
            {/* Можно передатать в TiltCard classNames */}
            <TiltCard src="/assets/me.png" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const full_text = "Какое-то описание о себе, которое я потом заменю,";

export default Hero;
