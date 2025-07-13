import { Socket, Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

export function setupSocketHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  // ... add more handlers here
}
