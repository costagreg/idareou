FROM node:8-jessie

EXPOSE ${SSR_PORT}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY . .

CMD [ "npm", "run", "start" ]
