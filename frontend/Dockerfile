FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /usr/share/nginx/html

COPY ./dist/bundle.js bundle.js
COPY ./dist/index.html index.html
COPY ./public public

# /usr/local/bin/entrypoint.sh