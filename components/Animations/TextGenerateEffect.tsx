"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0, // Добавляем delay как пропс
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number; // Пропс для передачи задержки
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2, { startDelay: delay }), // Используем delay для всей анимации
      },
    );
  }, [scope.current, delay, filter, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-black opacity-0 dark:text-white"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="">
        <div className="font-secondary text-sm font-normal text-white mix-blend-difference lg:text-lg">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
