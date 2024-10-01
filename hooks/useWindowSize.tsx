import { useEffect, useState } from "react";

// Определяем тип для состояния размеров окна
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export default function useWindowSize() {
  // Инициализируем состояние с типизацией
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Проверяем, существует ли объект window (значит, мы в браузере)
    if (typeof window !== "undefined") {
      // Обработчик для обновления размера окна
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Вызовем его один раз для начальной установки значений
      handleResize();

      // Добавляем слушатель на изменение размера окна
      window.addEventListener("resize", handleResize);

      // Убираем слушатель при размонтировании компонента
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Эффект срабатывает один раз при монтировании

  return windowSize;
}
