FROM nginx:1.17.9

WORKDIR /usr/share/nginx/html/

COPY nginx/default.conf /etc/nginx/conf.d/
COPY dist/ .

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/entrypoint.sh && nginx -g \"daemon off;\""]
