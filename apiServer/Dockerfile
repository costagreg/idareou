FROM node:8-jessie

EXPOSE ${API_PORT}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm i

COPY . .

CMD [ "npm", "run", "server" ]