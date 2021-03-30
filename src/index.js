import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { socket, SocketContext } from "./context/socket.js";

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
