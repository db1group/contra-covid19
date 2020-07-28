call docker stop postgres-ns
call docker volume create pgdata
call docker network create -d bridge postgres-ns
call docker build -t postgres-ns:latest .
call docker run --name postgres-ns --rm -d -p 5432:5432 --net postgres-ns -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e PGDATA=/tmp -v pgdata:/var/lib/postgresql/data postgres-ns:latest
