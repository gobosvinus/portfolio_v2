import React, { useEffect, useRef, useState } from "react";
import SpinningLogos from "../ui/SpinningLogos";
import { motion, useInView, AnimatePresence } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";
import { useWindowWidth } from "@/context/WindowWidthProvider";
import ShimmerButton from "../Buttons/ShimmerButton";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { RxCross1 } from "react-icons/rx";

const CompetencesGrid = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: "all" });
  const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false);

  // const { width } = useWindowSize();
  const width = useWindowWidth();

  if (width === null) {
    return null; // или показать loader/заглушку
  }

  const variantsLeft = {
    initial: {
      left: "50%",
      bottom: "50%",
      translateX: "-50%",
      translateY: "50%",
    },
    final: {
      left: width && width < 768 ? "-19%" : "-15%", // max-lg: 18%
      bottom: "-25%",
      translateX: "0",
      translateY: "0",
    },
  };

  const variantsRight = {
    initial: {
      right: "50%",
      top: "50%",
      translateX: "50%",
      translateY: "-50%",
    },
    final: {
      right: width && width < 768 ? "-19%" : "-15%", // max-lg: 18%
      top: "-25%",
      translateX: "0",
      translateY: "0",
    },
  };

  const handleShowOverlay = () => {
    setIsOverlayShown(!isOverlayShown);
  };

  return (
    <div
      className="container relative h-full overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        backgroundImage:
          "radial-gradient(100% 100% at 50% 50%, rgb(27, 27, 24) -20%, black )",
      }}
    >
      <h2 className="font-primary pt-8 text-2xl">Компетенции</h2>
      {/* Первое колесо с компетенциями */}
      <div className="flex min-h-full justify-center">
        <motion.div
          variants={variantsLeft}
          initial="initial" // Начальная позиция в центре
          animate={isInView ? "final" : "initial"} // Конечная позиция
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute"
        >
          <SpinningLogos iconDataNumber={1} clockWise={false} />
        </motion.div>

        {/* Кнопка подробнее */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
          onClick={handleShowOverlay}
        >
          <ShimmerButton className="absolute left-1/2 top-1/2 z-[55] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Условно ренедерим экраны с подробной информацией */}
        <AnimatePresence>
          {isOverlayShown && (
            <OverlayScreen handleShowOverlay={handleShowOverlay} />
          )}
        </AnimatePresence>

        {/* Второе колесо с компетенциями */}
        <motion.div
          variants={variantsRight}
          ref={ref}
          initial="initial" // Начальная позиция в центре
          animate={isInView ? "final" : "initial"} // Конечная позиция
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute"
        >
          <SpinningLogos iconDataNumber={2} clockWise={false} />
        </motion.div>
      </div>
    </div>
  );
};

export default CompetencesGrid;

const OverlayScreen = ({
  children,
  handleShowOverlay,
}: {
  children?: React.ReactNode;
  handleShowOverlay: () => void;
}) => {
  const [slides, setSlides] = useState([Slides[0]]);
  const [activeSlide, setIsActiveSlide] = useState(1);

  const handleMoveCard = (direction: string) => {
    if (direction === "right" && activeSlide + 1 < 5 + 1) {
      setIsActiveSlide((p) => p + 1);
      setSlides((prev) => {
        return Slides.slice(0, activeSlide + 1);
      });
    } else if (direction === "left" && activeSlide > 1) {
      setIsActiveSlide((p) => p - 1);
      setSlides((prev) => {
        return prev.slice(0, -1);
      });
    } else {
      return;
    }
  };

  return (
    <motion.div
      initial={{ x: "200%" }}
      animate={{ x: "0%" }}
      exit={{ x: "200%" }}
      transition={{ duration: 1, stiffness: 200, damping: 50 }}
      className="absolute inset-0 z-50 bg-black-600"
    >
      {/* Крестик закрытия */}
      <motion.div
        onClick={handleShowOverlay}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.005 }}
        className="absolute right-2 top-2 z-50 opacity-50 transition-all duration-300 hover:cursor-pointer hover:opacity-100"
      >
        <RxCross1 className="text-2xl text-white" />
      </motion.div>

      {/* Стрелка влево */}
      <div
        className="group absolute left-[1%] top-1/2 z-[55] grid size-max -translate-y-1/2 place-items-center hover:cursor-pointer"
        onClick={() => handleMoveCard("left")}
      >
        <motion.div
          initial={{ x: 0 }}
          whileTap={{ x: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            zIndex: 5,
            gridRow: 1,
            gridColumn: 1,
          }}
        >
          <PiArrowLeft className="text-4xl text-white" />
        </motion.div>
        <div
          className="size-[50px] rounded-full bg-white/0 transition-all duration-300 group-hover:bg-white/10"
          style={{
            zIndex: 4,
            gridRow: 1,
            gridColumn: 1,
          }}
        />
      </div>

      <AnimatePresence>
        {slides.map((slide, index) => {
          return <div key={index}>{slide}</div>;
        })}
      </AnimatePresence>

      {/* Стрелка вправо */}
      <div
        className="group absolute right-[1%] top-1/2 z-[55] grid size-max -translate-y-1/2 place-items-center hover:cursor-pointer"
        onClick={() => handleMoveCard("right")}
      >
        <motion.div
          initial={{ x: 0 }}
          whileTap={{ x: 4 }}
          transition={{ duration: 0.2 }}
          style={{
            zIndex: 5,
            gridRow: 1,
            gridColumn: 1,
          }}
        >
          <PiArrowRight className="text-4xl text-white" />
        </motion.div>
        <div
          className="size-[50px] rounded-full bg-white/0 transition-all duration-300 group-hover:bg-white/10"
          style={{
            zIndex: 4,
            gridRow: 1,
            gridColumn: 1,
          }}
        />
      </div>

      {/* Нумерация снизу */}
      <Numbering
        amount={5}
        className="bottom-[2%] left-1/2 -translate-x-1/2"
        active={activeSlide}
      />
    </motion.div>
  );
};

const Numbering = ({
  amount,
  className,
  active,
}: {
  amount: number;
  className?: string;
  active: number;
}) => {
  return (
    <div className={twMerge("absolute flex gap-1", className)}>
      {Array.from({ length: amount }).map((_, index) => {
        console.log(index + 1);
        return <BulletPoint id={index + 1} active={active} />;
      })}
    </div>
  );
};

const BulletPoint = ({ id, active }: { id: number; active: number | null }) => {
  console.log(id, active);
  return (
    <div
      className={`size-1 rounded-full bg-white transition-all duration-300 ${active === id ? "scale-[1.75]" : "opacity-50"}`}
      key={id}
    />
  );
};

const Slide = ({
  className,
  active,
}: {
  className?: string;
  active?: boolean;
}) => {
  return (
    <motion.div
      initial={{ x: "200%" }}
      animate={{ x: "0%" }}
      exit={{ x: "-200%" }}
      transition={{
        duration: 0.5,
        stiffness: 200,
        damping: 50,
      }}
      className={twMerge(
        "absolute inset-0 bg-blue-400 transition-all duration-1000 ease-out",
        className,
      )}
    ></motion.div>
  );
};

const Slides = [
  <Slide className="bg-slate-600" />,
  <Slide className="bg-slate-200" />,
  <Slide className="bg-slate-600" />,
  <Slide className="bg-slate-200" />,
  <Slide className="bg-slate-600" />,
];

// const Slides = [
//   (props: { active: boolean }) => <Slide {...props} className="bg-slate-200" />,
//   (props: { active: boolean }) => <Slide {...props} className="bg-red-500" />,
//   (props: { active: boolean }) => (
//     <Slide {...props} className="bg-neutral-400" />
//   ),
//   (props: { active: boolean }) => <Slide {...props} className="bg-blue-500" />,
//   (props: { active: boolean }) => (
//     <Slide {...props} className="bg-purple-600" />
//   ),
// ];
