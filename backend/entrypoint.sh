#!/bin/bash

echo 'Status before migration'
npx sequelize-cli db:migrate:status
echo 'Starting Migrations...'
npx sequelize-cli db:migrate
echo 'Status after migration'
npx sequelize-cli db:migrate:status

echo 'Starting seeders...'
npx sequelize-cli db:seed:all

echo 'Criando usuário supervisor...'
npm run create:supervisor

echo 'Starting server...'
pm2-runtime start /app/src/server.js -i max --node-args="--max_old_space_size=2048"
