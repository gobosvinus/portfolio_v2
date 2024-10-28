# Базовый образ
FROM node:20.10-alpine AS base

# Устанавливаем необходимые зависимости
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Устанавливаем зависимости через npm
COPY package.json package-lock.json* ./
# Копируем Prisma схему для работы команды prisma generate
COPY prisma/schema.prisma prisma/schema.prisma
RUN npm ci

# Dev image для разработки
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерация Prisma файлов (если нужно для разработки)
RUN npx prisma generate

# Включение горячей перезагрузки
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Сборка проекта для продакшн
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерация Prisma файлов для продакшн
RUN npx prisma generate

# Сборка Next.js проекта
RUN npm run build

# Финальный образ для запуска приложения
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Копируем скомпилированные файлы для Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Даем права nextjs пользователю на кэш директорию
# RUN mkdir .next
RUN chown nextjs:nodejs .next

# Используем пользователя nextjs
USER nextjs

# Экспортируем порт
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Команда для запуска приложения
CMD ["npm", "run", "start:migrate:prod"]