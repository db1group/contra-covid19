FROM node:13

WORKDIR /app

COPY . .

CMD ["node_modules/.bin/cross-env", \
  "NODE_ENV=$NODE_ENV", \
  "DATABASE_URL=$DATABASE_URL", \
  "DATABASE_USERNAME=$DATABASE_USERNAME", \
  "DATABASE_PASSWORD=$DATABASE_PASSWORD", \
  "npx sequelize-cli db:migrate"

ENTRYPOINT ["node_modules/.bin/cross-env", \
  "NODE_ENV=$NODE_ENV", \
  "DATABASE_URL=$DATABASE_URL", \
  "DATABASE_USERNAME=$DATABASE_USERNAME", \
  "DATABASE_PASSWORD=$DATABASE_PASSWORD", \
  "node", \
  "/app/src/server.js"]
