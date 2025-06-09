import { io } from 'socket.io-client';

let socket;

export const connectSocket = (userEmail) => {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return;
  }

  socket = io('https://chat-appln-jzc5.onrender.com', {
    path: '/api/socket.io',
  });

  
};

export const getSocket = () => socket;
