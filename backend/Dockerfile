FROM node:13

WORKDIR /app

COPY . .

CMD ["npx", "sequelize-cli", "db:migrate", "db:seed:all"]

ENTRYPOINT ["node", "/app/src/server.js"]
