FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/shared

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "start"]