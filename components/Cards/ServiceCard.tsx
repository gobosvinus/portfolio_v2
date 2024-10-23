// "use client";

// import { ServiceCardData } from "@/types/types.config";
// import Image from "next/image";
// import React, { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiArrowRight } from "react-icons/fi";
// import Link from "next/link";
// import useWindowSize from "@/hooks/useWindowSize";

// const borderStyles: Record<number, string> = {
//   2: "border border-black-600 bg-white text-black-600",
//   3: "border border-black-600 bg-white text-black-600",
//   1: "border border-black-600 bg-white text-black-600",
//   4: "border border-black-600 bg-white text-black-600",
// };

// const defaultStyle = "border-2 border-white text-white";

// const ServiceCard = ({ data }: { data: ServiceCardData }) => {
//   const [selected, setSelected] = useState<number | null>(null);
//   const [isHovered, setIsHovered] = useState<boolean>(false);

//   const ref = useRef<HTMLDivElement | null>();

//   const { width } = useWindowSize();

//   const className = selected
//     ? borderStyles[selected] || defaultStyle
//     : defaultStyle;

//   if (!width) return;
//   return (
//     <div
//       onMouseEnter={() => setSelected(data.id)}
//       onMouseLeave={() => setSelected(null)}
//       className={`relative flex h-full flex-col items-center justify-between bg-white ${selected ? "z-50" : "z-5"}`}
//     >
//       <motion.span
//         className={` ${selected === data.id && data.id === 2 ? "text-yellow" : selected === data.id ? "text-white" : "text-black-600"} z-10 mt-[200px] font-secondary text-[128px] font-medium leading-[74px]`}
//         style={{
//           scale: selected === data.id ? 1.2 : 1,
//           transition: "all 0.2s ease",
//         }}
//       >
//         {data.id}
//       </motion.span>

//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             className="absolute inset-0 z-0 cursor-pointer"
//             initial={{ scale: 1 }}
//             animate={{ scale: 1.05, scaleX: width <= 1024 ? 1.2 : 1 }}
//             exit={{ scale: 1, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Image src={data.src} fill alt="Service Image" />

//             <Link href={"/services"}>
//               <motion.h3
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 layout="size"
//                 transition={{ duration: 0.4 }}
//                 className={`${isHovered ? "flex justify-between gap-3 pl-2" : "flex"} z-100 button absolute left-5 w-max items-center justify-between rounded-[4px] border p-1 text-xl uppercase lg:text-2xl ${className}`}
//                 style={{
//                   bottom: `calc(288px - ${width <= 1024 ? "28" : "32"}px)`,
//                 }}
//               >
//                 <AnimatePresence mode="popLayout">
//                   {isHovered && (
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       exit={{ scale: 0, x: "-50%" }}
//                       className="rounded-full bg-black-600"
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                     >
//                       <motion.div
//                         initial={{ x: "-50%" }}
//                         animate={{ x: 0 }}
//                         exit={{ x: "-50%" }}
//                         transition={{
//                           duration: 0.3,
//                           ease: "easeInOut",
//                         }}
//                       >
//                         <FiArrowRight className="text-white" />
//                       </motion.div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {data.title === "ТЕЛЕГРАМ БОТЫ" && width <= 1280 ? (
//                   <span>ТГ-БОТЫ</span>
//                 ) : (
//                   data.title
//                 )}
//               </motion.h3>
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!selected && (
//         <>
//           <motion.div
//             initial={{ opacity: 0, scale: 1.05 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.2 }}
//             className="h-72"
//           >
//             <div
//               className={`mb-16 mr-8 flex flex-col gap-6 text-black-600 ${data.id === 4 && width <= 1024 ? "ml-10" : "ml-5"}`}
//             >
//               <h3
//                 ref={ref}
//                 className={`w-max rounded-[4px] border border-black-600 p-1 text-xl uppercase text-black-600 lg:text-2xl`}
//               >
//                 {data.title === "ТЕЛЕГРАМ БОТЫ" && width <= 1280 ? (
//                   <span>ТГ-БОТЫ</span>
//                 ) : (
//                   data.title
//                 )}
//               </h3>
//               <p className="font-secondary text-xl font-medium opacity-50 lg:text-xl xl:text-2xl">
//                 {data.description}
//               </p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ServiceCard;
