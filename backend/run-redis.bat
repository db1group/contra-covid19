call docker stop redis-ns
call docker run --name redis-ns --rm -d -p 6379:6379 -e ALLOW_EMPTY_PASSWORD=yes bitnami/redis:latest
