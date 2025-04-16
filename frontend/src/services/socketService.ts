import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const connectSocket = (token: string) => {
  socket = io(process.env.VITE_SOCKET_URL || 'http://localhost:5000', {
    auth: { token },
  });
  return socket;
};

export const getSocket = (): Socket => socket;

