FROM node:lts-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

FROM deps AS build
WORKDIR /app
COPY . .
ARG VITE_API_URL
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 
ENTRYPOINT ["nginx", "-g", "daemon off;"]