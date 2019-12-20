FROM node:10-alpine
WORKDIR /usr/src/frontend

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

CMD \
  REACT_APP_ENDPOINT='http://api.server.domain' npm run build
