FROM node:12

WORKDIR /usr/src/app

COPY package.json *.lock ./

RUN yarn --only=prod --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

EXPOSE 8000

VOLUME [ "/usr/src/app/logs" ]

CMD [ "npm", "run", "start:prod"]
