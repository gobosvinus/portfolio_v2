import { UPDATED_SERVICE_CARDS_DATA } from "@/data/static";
import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";
import ServiceCardUpdated from "../Cards/ServiceCardUpdated";

const ServiceCardsGrid = ({
  targetRef,
  hasAnimated,
  progress,
  classNames,
}: {
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  hasAnimated: boolean;
  progress: MotionValue<number>;
  classNames?: string;
}) => {
  // Логика смещения для карточек
  const x1 = useTransform(progress, [0, 0.4], ["-100%", "0%"]);
  const x2 = useTransform(progress, [0, 0.4], ["-200%", "0%"]);
  const x3 = useTransform(progress, [0, 0.4], ["-300%", "0%"]);
  const x4 = useTransform(progress, [0, 0.4], ["-400%", "0%"]);

  const cardShifts = ["-100%", "-200%", "-300%", "-400%"];

  return (
    <motion.div
      ref={targetRef}
      className={twMerge(
        `max-md:grid-cols- sticky top-40 mb-20 h-[calc(100vh*0.8)] w-full grid-cols-4 bg-transparent`,
        classNames,
      )}
    >
      {UPDATED_SERVICE_CARDS_DATA.map((card) => {
        const x =
          card.id === 1
            ? hasAnimated
              ? "0%"
              : x1
            : card.id === 2
              ? hasAnimated
                ? "0%"
                : x2
              : card.id === 3
                ? hasAnimated
                  ? "0%"
                  : x3
                : card.id === 4
                  ? hasAnimated
                    ? "0%"
                    : x4
                  : "0%";
        return (
          <motion.div
            key={card.id}
            initial={{ x: cardShifts[card.id - 1] }}
            style={{
              x,
            }}
          >
            <ServiceCardUpdated
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              url={card.url}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ServiceCardsGrid;
