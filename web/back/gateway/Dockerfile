FROM node:24.13.0 AS dev

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./gateway/package*.json ./

COPY ./gateway .

RUN npm install

EXPOSE 9100
CMD ["npm", "run", "dev"]