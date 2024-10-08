import { NextResponse } from "next/server";
// Импорт Prisma Client
import prisma from "@/lib/prisma";

// маршрут для добавления юзера и инфы о нем в базу данных
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
    if (
      !last_name ||
      !first_name ||
      !phone_number ||
      !email ||
      !consent_to_data_processing
    ) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    // Вставляем данные в базу данных через Prisma
    const newUser = await prisma.user.create({
      data: {
        last_name,
        first_name,
        phone_number,
        email,
        description: description || null, // Если описание не указано, сохраняем null
        consent_to_data_processing: consent_to_data_processing || false, // По умолчанию false, если не указано
      },
    });

    // Возвращаем успешный ответ
    return NextResponse.json(
      { message: "Пользователь успешно добавлен", user: newUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Очищаем ресурсы Prisma Client
    await prisma.$disconnect();
  }
}
