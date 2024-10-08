import { sql } from "@vercel/postgres";
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

    // Проверка на наличие обязательных полей
    if (!last_name || !first_name || !phone_number || !email) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    // Вставляем данные в базу данных
    await sql`
      INSERT INTO Users (
        last_name,
        first_name,
        phone_number,
        email,
        description,
        consent_to_data_processing
      ) VALUES (
        ${last_name},
        ${first_name},
        ${phone_number},
        ${email},
        ${description || null},  -- Если описание не указано, сохраняем null
        ${consent_to_data_processing || false}  -- По умолчанию значение false, если не указано
      );
    `;

    // Возвращаем успешный ответ
    return NextResponse.json(
      { message: "Пользователь успешно добавлен" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
