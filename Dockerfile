FROM node:23 AS build

WORKDIR /app

ENV NEXT_PUBLIC_BASE_URL=https://wrp.mazrean.com
COPY . .
RUN npm install
RUN npm run build

FROM node:23-alpine

WORKDIR /app
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

ENV NEXT_PUBLIC_BASE_URL=https://wrp.mazrean.com
ENTRYPOINT [ "npm", "run", "start" ]
