# ModelHub

ModelHub — небольшой full-stack сервис для публикации и хранения моделей машинного обучения.
Проект состоит из React-фронтенда, Express-бэкенда, PostgreSQL для метаданных и MinIO для хранения файлов моделей.

## Что умеет проект

- регистрация и вход пользователей
- хранение сессии в HTTP-only cookie
- просмотр профиля текущего пользователя и списка его моделей
- загрузка файла модели вместе с описанием, фреймворком, тегами и README
- просмотр страницы модели и скачивание загруженного файла
- Swagger-документация для API

## Стек

### Фронтенд

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

### Бэкенд

- Node.js
- Express 5
- TypeScript
- Drizzle ORM
- PostgreSQL
- MinIO
- Zod

## Структура проекта

```text
.
├── backend/     # API, авторизация, доступ к БД, MinIO, Swagger
├── frontend/    # интерфейс, роутинг, формы, экран профиля и моделей
└── docker-compose.yaml
```

## Переменные окружения

В репозитории уже есть примеры конфигурации:

- `backend/.env.example`
- `frontend/.env.example`

Основные переменные бэкенда:

- `PORT` - порт бэкенда, по умолчанию `3000`
- `CLIENT_URL` - адрес фронтенда для CORS, по умолчанию `http://localhost:5173`
- `DB_URL` - строка подключения к PostgreSQL
- `JWT_SECRET` - секрет для подписи JWT/cookie
- `MINIO_ENDPOINT`, `MINIO_PORT`, `MINIO_USE_SSL`
- `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`
- `BUCKET_NAME`

Переменная фронтенда:

- `VITE_API_URL` - базовый URL бэкенда, по умолчанию `http://localhost:3000`

## Быстрый старт

### 1. Поднять инфраструктуру

Из корня проекта:

```bash
docker compose up -d
```

Эта команда запускает:

- PostgreSQL на `localhost:5433`
- MinIO S3 API на `localhost:9003`
- MinIO Console на `http://localhost:9004`

### 2. Подготовить локальные env-файлы

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Установить зависимости

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4. Применить миграции базы данных

SQL-миграции уже лежат в `backend/drizzle/`.
Если PostgreSQL запущен через Docker, их можно применить из корня репозитория:

```bash
for file in backend/drizzle/*.sql; do
  docker exec -i modelhub-postgres psql -U modelhub -d modelhub_db < "$file"
done
```

### 5. Запустить бэкенд

```bash
cd backend
npm run dev
```

После этого бэкенд будет доступен по адресу [http://localhost:3000](http://localhost:3000).

### 6. Запустить фронтенд

```bash
cd frontend
npm run dev
```

После этого фронтенд будет доступен по адресу [http://localhost:5173](http://localhost:5173).

## Документация API

После запуска бэкенда Swagger UI доступен по адресу:

- [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Тесты и проверки

Автоматические unit- и integration-тесты в проекте пока не реализованы.
Сейчас проект можно проверять через линтинг и сборку.

### Проверки фронтенда

```bash
cd frontend
npm run lint
npm run build
```

### Проверки бэкенда

```bash
cd backend
npm run lint
npm run build
```

Важно:

- `npm test` в `backend/` пока заглушка и не запускает реальные тесты
- следующий полезный шаг для проекта — добавить API integration tests на auth, profile, upload и delete сценарии

## Docker-инфраструктура

`docker-compose.yaml` сейчас используется как инфраструктурный слой.
Он поднимает сервисы, необходимые приложению, но пока не собирает и не запускает контейнеры самого frontend/backend.

Внутри compose уже есть:

- `postgres` - основная реляционная база
- `minio` - объектное хранилище для файлов моделей

Используемые volume:

- `postgres_data`
- `minio_data`

Если позже понадобится полностью контейнеризированный локальный запуск, логичное продолжение такое:

- `backend/Dockerfile`
- `frontend/Dockerfile`
- сервисы приложений в `docker-compose.yaml`

## Текущие ограничения

- автоматических тестов пока нет
- контейнеров приложения в Docker Compose пока нет
- миграции БД лежат в виде SQL-файлов, но отдельного npm-скрипта для их применения пока нет
