#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."
until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "✅ PostgreSQL is up!"

echo "🚀 Running migrations..."
npm run migration:run

echo "🚀 Starting NestJS..."
node dist/main.js
