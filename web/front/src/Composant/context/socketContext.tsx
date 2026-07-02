import { create } from 'zustand'
import { io } from "socket.io-client";

const socketStore = create((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  send: (event, data) => {
    const { socket } = get();
    if (socket) {
      socket.emit(event, data);
    }
  },
  connect: () => {
    const proto = window.location.protocol === "https:" ? "wss://" : "ws://";
    const host = window.location.host;
    let { socket } = get();
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING))
        return
    socket = io(`${proto}${window.location.host}/ws`);
    set({ socket });
  }
}));

export default socketStore;
