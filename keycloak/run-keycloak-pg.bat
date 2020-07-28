call docker stop notificasaude
call docker rm notificasaude
call docker build --no-cache -t key-notifica .
call docker run --name notificasaude -d -p 8080:8080 --net postgres-ns -e DB_ADDR=127.0.0.1,postgres-ns,localhost -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DATABASE_URL=postgres-ns -e DATABASE_USERNAME=postgres -e DATABASE_PASSWORD=postgres key-notifica:latest