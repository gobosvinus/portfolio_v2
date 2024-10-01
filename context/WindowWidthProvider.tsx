import React, { createContext, useContext } from "react";
import useWindowSize from "@/hooks/useWindowSize";

// Создаем типы для значения контекста
interface WindowWidthContextProps {
  width: number | undefined;
}

// Создаем сам контекст
const WindowWidthContext = createContext<WindowWidthContextProps | undefined>(
  undefined,
);

// Провайдер, который использует хук useWindowSize
export const WindowWidthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { width } = useWindowSize();

  // Значение, которое будет доступно через контекст
  const value = {
    width,
  };

  return (
    <WindowWidthContext.Provider value={value}>
      {children}
    </WindowWidthContext.Provider>
  );
};
