import React from "react";
import ReactDOM from "react-dom";

import "./assets/style/antd.css";
import "./assets/style/global.css";

// Contexts
import RoomState from "./context/room/room.state.jsx";
import { SocketContextProvider } from "./context/socket.js";
import { NamespaceContextProvider } from "./context/namespace.js";

//Router
import history from "./utils/history";
import { Router } from "react-router-dom";
import Routes from "./router";

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <NamespaceContextProvider>
        <SocketContextProvider>
          <RoomState>
            <Routes />
          </RoomState>
        </SocketContextProvider>
      </NamespaceContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
