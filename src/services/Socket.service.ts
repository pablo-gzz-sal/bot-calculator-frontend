import { io, Socket } from "socket.io-client";

const socketUrl = "http://localhost:4000";

const socket: Socket = io(socketUrl, {
  transports: ["websocket"],
});

export default socket;
