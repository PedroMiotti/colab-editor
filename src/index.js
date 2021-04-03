import React from "react";
import ReactDOM from "react-dom";

import Routes from './Router';

import "./style.css";

// Contexts
import RoomState from "./context/room/room.state.jsx";
// import { socket, SocketContext } from "./context/socket.js";
import { SocketContextProvider } from "./context/socket.js";
import { NamespaceContextProvider } from "./context/namespace.js";

ReactDOM.render(
  <React.StrictMode>
    <NamespaceContextProvider>
      <SocketContextProvider>
        <RoomState>
          
          <Routes/>
          
        </RoomState>
      </SocketContextProvider>
    </NamespaceContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
