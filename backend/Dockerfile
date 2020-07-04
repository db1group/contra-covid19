FROM node:13

WORKDIR /app

COPY . .

RUN npm install pm2 -g

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
