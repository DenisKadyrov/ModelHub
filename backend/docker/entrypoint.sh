#!/bin/sh
set -eu

wait_for_service() {
  host="$1"
  port="$2"
  name="$3"

  echo "Waiting for $name at $host:$port..."

  until nc -z "$host" "$port"; do
    sleep 1
  done
}

wait_for_service "${DB_HOST:-postgres}" "${DB_PORT:-5432}" "PostgreSQL"
wait_for_service "${MINIO_ENDPOINT:-minio}" "${MINIO_PORT:-9000}" "MinIO"

echo "Applying database migrations..."
npx drizzle-kit migrate --config=drizzle.config.ts

echo "Starting backend..."
exec node dist/index.js
