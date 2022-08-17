# syntax=docker/dockerfile:1

FROM node:14.17.6

ENV NODE_ENV=development

WORKDIR /home/restify/efishery-backend-test

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start" ]