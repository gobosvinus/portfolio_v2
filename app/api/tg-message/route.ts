import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Получаем данные из тела запроса
    const formData = await request.json();
    const {
      last_name,
      first_name,
      phone_number,
      email,
      description,
      consent_to_data_processing,
    } = formData;

    // Формируем сообщение для отправки в Telegram
    const message = `
Новый пользователь добавлен:
Имя: ${first_name} ${last_name}
Телефон: ${phone_number}
Email: ${email}
Описание: ${description || "Не указано"}
Согласие на обработку данных: ${consent_to_data_processing ? "Да" : "Нет"}
    `;

    // Получаем переменные окружения
    const TELEGRAM_BOT_TOKEN = process.env.TG_ASSISTANT_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    // Проверка наличия переменных окружения
    if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
      throw new Error("Не установлены переменные окружения для Telegram.");
    }

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      },
    );

    // Проверка успешности отправки сообщения
    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      throw new Error(
        `Ошибка при отправке сообщения в Telegram: ${JSON.stringify(errorData)}`,
      );
    }

    // Возвращаем успешный ответ
    return NextResponse.json(
      { message: "Сообщение успешно отправлено в Telegram" },
      { status: 200 },
    );
  } catch (error: any) {
    // Обработка ошибок
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
