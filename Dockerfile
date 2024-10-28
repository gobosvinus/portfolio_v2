# Базовый образ
FROM node:20.10-alpine AS base

# Установка зависимости
RUN apk add --no-cache libc6-compat

# Рабочая директория
WORKDIR /app

# Этап зависимостей
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Этап разработки
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate  # генерируем Prisma файлы для разработки
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Этап сборки
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate  # генерируем Prisma файлы для продакшн
RUN npm run build

# Финальный образ для запуска
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir .next && chown nextjs:nodejs .next

# Переход на пользователя nextjs
USER nextjs

# Экспорт порта
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запуск приложения с миграцией
CMD ["npm", "run", "start:migrate:prod"]
