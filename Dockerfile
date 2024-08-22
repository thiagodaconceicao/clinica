FROM node:22.6.0-alpine

WORKDIR /app

COPY . /app

CMD [ "npm", "run", "init" ]