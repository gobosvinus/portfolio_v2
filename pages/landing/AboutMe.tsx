import React, { useState, useEffect, useRef, use } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "../../components/Animations/Reveal";
import { TracingBeam } from "../../components/ui/TracingBeam";

import { useWindowWidth } from "@/context/WindowWidthProvider";

const AboutMe = () => {
  const [position, setPosition] = useState("");

  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: "all" });

  useEffect(() => {
    if (isInView) {
      setPosition("justify-between");
    }

    return () => {};
  }, [isInView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const width = useWindowWidth();

  return (
    <section className="h-max w-screen overflow-hidden bg-black-500 max-sm:pb-10">
      <div className="container h-full">
        {width && width < 768 ? (
          <TracingBeam>
            <div className="">
              <motion.h2
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, ease: "easeIn" }}
                className="pt-20 font-main text-4xl text-white"
                style={{
                  position: "relative",
                  zIndex: "100",
                }}
              >
                Обо мне
              </motion.h2>

              {/* Я студент мобильная версия */}
              <div className="md:hidden">
                <Reveal
                  coveringBox={width && width < 768 ? false : true}
                  width={width}
                >
                  <p className="mt-20 font-secondary text-2xl">
                    Меня зовут Владислав, я студент Иркутского Политехнического
                    Университета, где обучаюсь на англоязычной программе <br />
                    <span className="font-main text-xl font-bold text-yellow sm:text-base">
                      Искусственный интеллект и компьютерные науки
                    </span>
                  </p>
                </Reveal>
              </div>

              <div className="mt-20 flex flex-col gap-11 font-secondary text-2xl font-normal max-sm:mt-16">
                <Reveal
                  coveringBox={width && width < 768 ? false : true}
                  width={width}
                >
                  <p>
                    Моя страсть — создавать{" "}
                    <span className="font-main text-yellow">
                      интуитивные и<br /> высокопроизводительные приложения
                    </span>
                  </p>
                </Reveal>
                <Reveal
                  coveringBox={width && width < 768 ? false : true}
                  width={width}
                >
                  <p>
                    Я обладаю глубоким пониманием таких фреймворков и
                    инструментов, как
                    <br />{" "}
                    <span className="font-main text-yellow">
                      {" "}
                      React, React Native, Next.js, Tailwind CSS.
                    </span>{" "}
                  </p>
                </Reveal>
                <Reveal
                  coveringBox={width && width < 768 ? false : true}
                  width={width}
                >
                  <p className="md:ml-20">
                    Мои знания и навыки не ограничиваются техническими
                    аспектами.
                    <br />
                    <span className="font-main text-yellow">
                      Свободно владея английским языком
                    </span>{" "}
                    и обладая{" "}
                    <span className="font-main text-yellow">
                      высоким уровнем софт-скиллов,
                    </span>
                    <br />я умею эффективно работать в команде, общаться с
                    заказчиками и
                    <br />
                    быстро адаптироваться к новым задачам.
                  </p>
                </Reveal>
                <Reveal
                  coveringBox={width && width < 768 ? false : true}
                  width={width}
                >
                  <p className="md:ml-40">
                    Я открыт к новым вызовам и готов вкладывать все свои знания
                    <br /> и опыт в проекты, чтобы создавать{" "}
                    <span className="font-main text-yellow">
                      качественные и востребованные решения.
                    </span>{" "}
                  </p>
                </Reveal>
              </div>
            </div>
          </TracingBeam>
        ) : (
          <div className="">
            <motion.h2
              variants={variants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 1, ease: "easeIn" }}
              ref={ref}
              className="pt-20 text-4xl text-white"
            >
              Обо мне
            </motion.h2>

            {/* Я студент на мд и выше */}
            <div className={`mt-20 hidden ${position} md:flex`}>
              <div>
                <svg
                  width="162"
                  height="182"
                  // width="62"
                  // height="82"
                  viewBox="0 0 162 182"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M162 180C24.4811 180 2 175.479 2 93.9674C2 12.4554 24.4811 2 162 2"
                    stroke="#EBCD47"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {position === "justify-between" && (
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="mt-2 text-center font-secondary md:text-sm lg:text-xl xl:text-2xl"
                  >
                    Меня зовут Владислав, я студент Иркутского Политехнического
                    Университета, где обучаюсь на англоязычной программе <br />
                    <span className="font-main text-xl font-bold text-yellow max-sm:text-base">
                      Искусственный интеллект и компьютерные науки
                    </span>
                    <br /> В данный момент я на 2 курсе и активно изучаю
                    современные технологии разработки, с особым акцентом на
                    React и TypeScript.
                  </motion.p>
                </div>
              )}

              <motion.div
                layout
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <svg
                  width="162"
                  height="182"
                  viewBox="0 0 162 182"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 180C137.519 180 160 175.479 160 93.9674C160 12.4554 137.519 2 0 2"
                    stroke="#EBCD47"
                    strokeWidth="3"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Я студент мобильная версия */}

            <div className="md:hidden">
              <Reveal coveringBox={width < 768 ? false : true} width={width}>
                <p className="mt-20 font-secondary text-2xl">
                  Меня зовут Владислав, я студент Иркутского Политехнического
                  Университета, где обучаюсь на англоязычной программе <br />
                  <span className="font-main text-xl font-bold text-yellow sm:text-base">
                    Искусственный интеллект и компьютерные науки
                  </span>
                </p>
              </Reveal>
            </div>

            <div className="mt-20 flex flex-col gap-11 font-secondary text-2xl font-normal max-sm:mt-16">
              <Reveal
                coveringBox={width && width < 768 ? false : true}
                width={width}
              >
                <p>
                  Моя страсть — создавать{" "}
                  <span className="font-main text-yellow">
                    интуитивные и<br /> высокопроизводительные приложения
                  </span>
                </p>
              </Reveal>
              <Reveal
                coveringBox={width && width < 768 ? false : true}
                width={width}
              >
                <p>
                  Я обладаю глубоким пониманием таких фреймворков и<br />{" "}
                  инструментов, как
                  <span className="font-main text-yellow">
                    {" "}
                    React, React Native, Next.js, Tailwind CSS.
                  </span>
                </p>
              </Reveal>
              <Reveal
                coveringBox={width && width < 768 ? false : true}
                width={width}
              >
                <p className="md:ml-20">
                  Мои знания и навыки не ограничиваются техническими аспектами.
                  <br />
                  <span className="font-main text-yellow">
                    Свободно владея английским языком
                  </span>{" "}
                  и обладая{" "}
                  <span className="font-main text-yellow">
                    высоким уровнем софт-скиллов,
                  </span>
                  <br />я умею эффективно работать в команде, общаться с
                  заказчиками и
                  <br />
                  быстро адаптироваться к новым задачам.
                </p>
              </Reveal>
              <Reveal
                coveringBox={width && width < 768 ? false : true}
                width={width}
              >
                <p className="md:ml-40">
                  Я открыт к новым вызовам и готов вкладывать все свои знания
                  <br /> и опыт в проекты, чтобы создавать{" "}
                  <span className="font-main text-yellow">
                    качественные и востребованные решения.
                    <br />
                  </span>{" "}
                  Буду рад внести свой вклад в вашу команду или проект!
                </p>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
