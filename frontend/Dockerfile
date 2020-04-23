FROM nginx:1.17.9

WORKDIR /usr/share/nginx/html/

COPY nginx/default.conf /etc/nginx/conf.d/
COPY dist/ .
COPY env.sh .
COPY .env .

RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
