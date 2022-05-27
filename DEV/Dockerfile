# FROM node:16.13.2-alpine as build-stage
# WORKDIR /app
# COPY ../package*.json ./
# RUN npm install
# COPY .. ./
# RUN npm run build

# FROM nginx:1.22.0-alpine as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY DEV/nginx.conf /etc/nginx/nginx.conf
# # COPY DEV/nginx/conf.d /etc/nginx/conf.d
# CMD ["nginx", "-g", "daemon off;"]

FROM node:16.13.2-alpine as build-stage
WORKDIR /app
COPY ../package*.json ./
RUN npm install
COPY .. ./
CMD [ "npm", "run", "dev", "--host"]
EXPOSE 3000