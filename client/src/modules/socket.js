import socketIO from "socket.io-client";

export const socket = socketIO("http://localhost:5001");
