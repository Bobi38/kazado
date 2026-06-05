FROM node:24.13.0 AS dev

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./user/package*.json ./

COPY ./prisma ./prisma
COPY ./user .

RUN npm install
RUN npx prisma generate --schema=/app/prisma

EXPOSE 9101
CMD ["npm", "run", "dev"]