import { io } from "socket.io-client";

const socket = io("http://localhost:3000");  // Connect to backend server

socket.on("connect", () => {
  console.log("Connected with id:", socket.id);
});
