// import { PrismaClient } from '@prisma/client'


// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// // On vérifie si une instance existe déjà sur l'objet global
// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['warn', 'error'],
//   })

// // En développement, on stocke l'instance sur l'objet global pour la retrouver au prochain reload
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export default prisma

import "dotenv/config";
import { PrismaClient } from '@prisma/client'

// Prisma lit automatiquement la variable DATABASE_URL de ton fichier .env
const prisma = new PrismaClient();

export { prisma };