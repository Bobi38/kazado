import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, SocketData } from "../types/socket";

// 1. On étend le type de Fastify pour lui faire comprendre que "fastify.io" existe
declare module 'fastify' {
  interface FastifyInstance {
    io: Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;
  }
}

async function socketPlugin(fastify: FastifyInstance) {
  // 2. Initialisation de Socket.io sur le serveur HTTP de Fastify
  const io = new Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>(fastify.server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // 3. Gestion des événements en temps réel
  io.on("connection", (socket) => {
    fastify.log.warn(`[Socket.io] Smartphone connecté : ${socket.id}`);

    socket.on("joinCalendar", (calendarId) => {
      socket.join(calendarId);
      fastify.log.warn(`Le socket ${socket.id} a rejoint le calendrier : ${calendarId}`);
    });

    socket.on("disconnect", () => {
      fastify.log.warn(`[Socket.io] Déconnexion : ${socket.id}`);
    });
  });

  // 4. On décore l'instance Fastify pour rendre "io" disponible partout
  fastify.decorate('io', io);

  // 5. Nettoyage propre à la fermeture du serveur
  fastify.addHook('onClose', async () => {
    io.close();
  });
}

// fp() permet d'éviter que Fastify n'encapsule le plugin, rendant la décoration globale
export default fp(socketPlugin);