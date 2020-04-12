FROM nginx:1.17.9

COPY nginx/default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html/

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'