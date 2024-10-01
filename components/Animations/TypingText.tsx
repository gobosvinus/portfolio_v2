import React, { useState, useEffect } from "react";

const TypingText = ({
  text,
  speed = 50,
  delay = 5000,
}: {
  text: String;
  speed?: number;
  delay?: number;
}) => {
  const [typedText, updateTypedText] = useState("");

  useEffect(() => {
    // Задержка перед началом набора текста
    const timer = setTimeout(() => {
      let index = 0;

      const interval = setInterval(() => {
        if (index + 1 < text.length) {
          updateTypedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    // Очистка таймера задержки
    return () => clearTimeout(timer);
  }, []);

  return <span>{typedText}</span>;
};

export default TypingText;
