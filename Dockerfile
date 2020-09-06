FROM node:12.16.3 as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/

RUN npm run build --prod--aot true
EXPOSE 4040 80

####Stage 1, Build Nginx backend
FROM nginx:alpine

RUN mkdir -p /var/www/html/bip
COPY --from=node nginix.conf /etc/nginx/conf.d/default.conf
COPY --from=node /dist /usr/share/nginx/html



#FROM nginx:latest
#!/bin/sh
#COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*
# Copy from the stahg 1
#COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]