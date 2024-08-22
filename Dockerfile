FROM node:22.6.0-alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD [ "npm", "run", "init" ]
