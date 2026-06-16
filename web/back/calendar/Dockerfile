FROM node:24.13.0 AS dev

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./calendar/package*.json ./

COPY ./prisma ./prisma
COPY ./calendar .

RUN npm install
RUN npx prisma generate --schema=./prisma

EXPOSE 9103
CMD ["npm", "run", "dev"]