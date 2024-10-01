import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { UPDATED_SERVICE_CARDS_DATA } from "@/data/static";
import { UpdatedServiceCardData } from "@/types/types.config";
import Loader from "../ui/Loader";

const TinderCards = () => {
  const [cards, setCards] = useState<UpdatedServiceCardData[]>(
    UPDATED_SERVICE_CARDS_DATA,
  );

  useEffect(() => {
    const handleEffect = () => {
      if (cards.length === 0) {
        setCards(UPDATED_SERVICE_CARDS_DATA);
      }
    };

    const timer = setTimeout(handleEffect, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [cards]);

  return (
    <div className="absolute left-1/2 top-[55%] grid h-max w-full -translate-x-1/2 -translate-y-1/2 place-items-center md:hidden">
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            cards={cards}
            setCards={setCards}
            {...card}
            title={card.title}
            description={card.description}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  id,
  url,
  setCards,
  cards,
  title,
  description,
}: {
  id: number;
  url: string;
  setCards: Dispatch<SetStateAction<UpdatedServiceCardData[]>>;
  cards: UpdatedServiceCardData[];
  title: string;
  description: string;
}) => {
  const mValue = useMotionValue(0);

  const x = useSpring(mValue, { damping: 100, stiffness: 3000 });

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 10 : -10;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 25) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.div
      className="relative h-[70%] w-[75%] origin-bottom overflow-hidden rounded-lg bg-transparent hover:cursor-grab active:cursor-grabbing"
      style={{
        zIndex: isFront ? 100 : undefined,
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      initial={{ opacity: 0 }}
      animate={{
        scale: isFront ? 1 : 0.98,
        opacity: 1,
      }}
      drag={isFront ? "x" : false}
      dragElastic={0.5}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <Image
        src={url}
        alt="Placeholder alt"
        fill
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />

      {id === 2 && <Loader />}

      <div className="absolute bottom-0 left-[20px] right-[20px] z-10 flex h-[25%] flex-col gap-4">
        <h3 className="w-max rounded-[4px] border border-black-600 bg-white p-1 text-xl uppercase text-black-600">
          {title}
        </h3>
        <p className="font-secondary opacity-70">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 h-[30%] w-full backdrop-blur-sm backdrop-brightness-50 backdrop-filter" />
    </motion.div>
  );
};

export default TinderCards;
