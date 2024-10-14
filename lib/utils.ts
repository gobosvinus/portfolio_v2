import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// send message to tg
export const sendMessageToTelegram = async (formData: any) => {
  try {
    const response = await fetch("/api/tg-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // "Сообщение успешно отправлено"
    } else {
      const errorData = await response.json();
      console.error("Ошибка при отправке сообщения в Telegram:", errorData);
    }
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error);
  }
};
