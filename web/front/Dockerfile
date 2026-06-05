FROM node:24.13.0 AS dev

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install --legacy-peer-deps

EXPOSE 5173
CMD ["npm", "run", "dev"]