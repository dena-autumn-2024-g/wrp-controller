FROM node:23

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]
