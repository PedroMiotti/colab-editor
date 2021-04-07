import React from "react";
import ReactDOM from "react-dom";

import Routes from './Router';

import 'antd/dist/antd.css';
import "./style.css";

// Contexts
import RoomState from "./context/room/room.state.jsx";
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
