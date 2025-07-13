import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupSocketHandlers } from "./socket";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./socket/types";

export function createServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData
  >(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    setupSocketHandlers(socket, io);
  });

  return httpServer;
}
