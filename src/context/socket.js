import React from "react";
import io from "socket.io-client";
// import { SOCKET_URL } from 'config';
import { NamespaceContext } from "./namespace.js";
import { SOCKET_URL } from "../enviroment";

export const SocketContextProvider = ({ children }) => {
  const [nspName, setNamespace] = React.useContext(NamespaceContext);
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    if (nspName !== null) {
      setSocket(io.connect(`${SOCKET_URL}${nspName}`));
    }
  }, [nspName]);

  return (
    <SocketContext.Provider value={[socket]}>{children}</SocketContext.Provider>
  );
};

export const SocketContext = React.createContext();
