import React, { useRef, useState } from "react";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import TinderCards from "@/components/Cards/TinderCards";
import ServiceCardsGrid from "@/components/Grids/ServiceCardsGrid";
import { useWindowWidth } from "@/context/WindowWidthProvider";

const Services = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  // реф на секции с карточками
  const targetRef = useRef(null);

  // Получаем прогресс скролла в пределах секции "Услуги"
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // отслеживает скролл от начала появления секции до её конца
  });

  // Настройка параметров useSpring для плавной анимации
  const springConfig = { damping: 150, stiffness: 300 };

  const progress = useSpring(scrollYProgress, springConfig);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.6) {
      setHasAnimated(true);
    }
  });

  const y = useTransform(progress, [0.5, 1], ["0", "-50%"]);
  const width = useWindowWidth();

  if (width === null) {
    return null; // или показать loader/заглушку
  }

  return (
    <section className="min-h-[110vh] w-screen overflow-hidden bg-black-400">
      <motion.div
        className="container relative h-full w-full"
        style={{
          translateY: width && width >= 768 ? y : undefined,
        }}
      >
        <h2 className="top-0 pb-20 pt-20 text-4xl">Услуги</h2>

        <ServiceCardsGrid
          hasAnimated={hasAnimated}
          targetRef={targetRef}
          progress={progress}
          classNames="md:grid hidden"
        />

        {/* На мобильных устройствах */}
        <TinderCards />
      </motion.div>
    </section>
  );
};

export default Services;

// Логика смещения для карточек (вырезал из компонента Services)

// const x1 = useTransform(progress, [0, 0.4], ["-100%", "0%"]);
// const x2 = useTransform(progress, [0, 0.4], ["-200%", "0%"]);
// const x3 = useTransform(progress, [0, 0.4], ["-300%", "0%"]);
// const x4 = useTransform(progress, [0, 0.4], ["-400%", "0%"]);

// const cardShifts = ["-100%", "-200%", "-300%", "-400%"];

// логика для смещения грида
