"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

// Создаем типы для значения контекста
interface WindowWidthContextProps {
  width: number | null;
}

// Создаем сам контекст
const WindowWidthContext = createContext<WindowWidthContextProps>({
  width: null,
});

// Провайдер, который использует хук useWindowSize
export const WindowWidthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);
  const { width } = useWindowSize();

  // Добавляем эффект для проверки монтирования на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Не рендерим контент, пока компонент не смонтирован на клиенте
  if (!mounted) {
    return null; // или можно вернуть заглушку/loader
  }

  return (
    <WindowWidthContext.Provider value={{ width: width ?? null }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export const useWindowWidth = () => {
  const context = useContext(WindowWidthContext);

  if (!context) {
    throw new Error(
      "useWindowWidth должен использоваться внутри WindowWidthProvider",
    );
  }

  return context.width;
};
