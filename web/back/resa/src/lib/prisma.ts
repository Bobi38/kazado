import "dotenv/config";
import { PrismaClient } from '@prisma/client'

// Prisma lit automatiquement la variable DATABASE_URL de ton fichier .env
const prisma = new PrismaClient();

export { prisma };