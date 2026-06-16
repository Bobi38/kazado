FROM node:24.13.0 AS dev

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./init_db/package*.json ./

COPY ./prisma ./prisma
COPY ./init_db .

RUN npm install
RUN npx prisma generate --schema=./prisma

CMD ["npm", "start"]