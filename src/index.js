import React from "react";
import ReactDOM from "react-dom";

import Editor from "./pages/editor/";
import Salas from "./pages/salas/";

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
          {/* <Editor /> */}
          <Salas />
        </RoomState>
      </SocketContextProvider>
    </NamespaceContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
