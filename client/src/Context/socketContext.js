import React from "react";
import socketIO from "socket.io-client";

export const socket = socketIO("http://localhost:5001");
const SocketContext = React.createContext(socket);

export default SocketContext;
