#!/bin/bash

echo 'Status before migration'
npx sequelize-cli db:migrate:status
echo 'Starting Migrations...'
npx sequelize-cli db:migrate
echo 'Status after migration'
npx sequelize-cli db:migrate:status

echo 'Starting seeders...'
npx sequelize-cli db:seed:all

echo 'Starting server...'
pm2-runtime start /app/src/server.js -i max --max-memory-restart 300M
