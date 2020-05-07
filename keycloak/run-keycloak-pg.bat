call docker stop notificasaude
call docker rm notificasaude
call docker build --no-cache -t key-notifica .
call docker run --name notificasaude -d -p 8080:8080  --net postgres_postgres -e DB_ADDR=127.0.0.1,postgres,localhost -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DATABASE_URL=postgres -e DATABASE_USERNAME=db1nlp -e DATABASE_PASSWORD=db1nlp key-notifica:latest