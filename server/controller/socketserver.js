// socketServer.js
import { Server } from "socket.io";

export default function initSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // OR your frontend: 'http://localhost:5173'
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    socket.on('send-message', (msg) => {
      io.emit('receive-message', msg);
    });
  });

  return io; 
}
