FROM node:16.14.0 as build

ENV NODE_ENV=development

WORKDIR /app

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN npx nest build

FROM node:16.14.0-alpine as prod

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g pnpm

COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .

RUN pnpm install -P

COPY --from=build /app/dist ./dist

ENTRYPOINT [ "node",  "dist/main.js" ]
