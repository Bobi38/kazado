import { create } from 'zustand'
import { io } from "socket.io-client";

const socketStore = create((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  send: (event, data) => {
    console.log("i m in socket context")
    const { socket } = get();
    if (socket) {
      console.log("socket is defined")
      console.log(socket)
      socket.emit(event, data);
    }
  },
  connect: () => {
    console.log("Connecting to socket...");
    const proto = window.location.protocol === "https:" ? "wss://" : "ws://";
    const host = window.location.host;
    console.log(`Connecting to socket at ${proto}${host}/ws`);
    let { socket } = get();
    console.log("Socket existante ?", socket?.id, socket?.connected, socket?.active);
    if (socket && (socket.connected || socket.active)) {
        return;
    }
    console.log("Creating new socket connection...");
    socket = io();
    socket.on("connect", () => {
  console.log("✅ CONNECT", socket.id);
    console.log("Connecté :", socket.id);
  console.log("Transport :", socket.io.engine.transport.name);
});

socket.on("connect_error", (err) => {
  console.error("❌ CONNECT ERROR");
  console.error(err);
});

socket.on("disconnect", (reason) => {
  console.log("❌ DISCONNECT", reason);
});

socket.on("test", (data) => {
  console.log("Received test event from context \"test\":", data);
});

socket.io.on("reconnect_attempt", () => {
  console.log("Tentative de reconnexion...");
});
    console.log("Socket created:", socket);
    set({ socket });
    console.log("Socket connected:", socket)
  }
}));

export default socketStore;
