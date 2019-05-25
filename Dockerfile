FROM node:lts-alpine as build
WORKDIR /app
COPY ./package-lock.json ./package.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:lts-alpine as serve
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY ./package-lock.json ./package.json ./
ENV NODE_ENV=production
RUN npm install --only=prod

EXPOSE 8080
CMD ["node", "dist/server.js"]
