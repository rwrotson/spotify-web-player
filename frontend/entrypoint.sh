#!/bin/bash

sed -i "s/listen xxxx;/listen ${FRONTEND_PORT};/" /etc/nginx/nginx.conf

exec nginx -g "daemon off;"