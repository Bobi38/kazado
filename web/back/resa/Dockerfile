FROM node:24.13.0 AS dev

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./resa/package*.json ./

COPY ./prisma ./prisma
COPY ./resa .

RUN npm install
RUN npx prisma generate --schema=/app/prisma

EXPOSE 9102
CMD ["npm", "run", "dev"]