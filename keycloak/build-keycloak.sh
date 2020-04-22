export GIT_HASH=$(git rev-parse --short HEAD)

docker build -t notificasaude/keycloak:latest .

docker tag notificasaude/keycloak:latest 032230612239.dkr.ecr.us-east-1.amazonaws.com/notificasaude/keycloak:$GIT_HASH

$(aws ecr get-login --no-include-email --region us-east-1)

docker push 032230612239.dkr.ecr.us-east-1.amazonaws.com/notificasaude/keycloak:$GIT_HASH