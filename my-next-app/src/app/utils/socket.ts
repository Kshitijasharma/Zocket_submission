import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
  withCredentials: true, // Important for CORS
});

export default socket;