import React from "react";
import io from "socket.io-client";
// import { SOCKET_URL } from 'config';
import { NamespaceContext } from "./namespace.js";

export const SocketContextProvider = ({ children }) => {
  const [nspName, setNamespace] = React.useContext(NamespaceContext);
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    if (nspName !== null) {
      setSocket(io.connect(`http://localhost:3001/${nspName}`));
    }
  }, [nspName]);

  return (
    <SocketContext.Provider value={[socket]}>{children}</SocketContext.Provider>
  );
};

export const SocketContext = React.createContext();
