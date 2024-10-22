"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const TiltCard = ({
  src,
  classNames,
}: {
  src: string;
  classNames?: string;
}) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-20deg", "20deg"]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const size = event.currentTarget.getBoundingClientRect();

    x.set((event.clientX - size.left) / size.width);
    y.set((event.clientY - size.top) / size.height);
  };
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative h-[350px] w-[250px] rounded-xl bg-gradient-to-br from-black-400 via-black-300 to-amber-300 shadow-lg md:h-[500px] md:w-[325px] lg:h-[600px] lg:w-[400px] xl:h-[650px] xl:w-[450px] 2xl:h-[700px] 2xl:w-[500px]`}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-3 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <Image
          src={src}
          fill
          quality={100}
          alt="Vlad's photo"
          priority
          sizes="50vw"
        />
      </div>
    </motion.div>
  );
};

export default TiltCard;
