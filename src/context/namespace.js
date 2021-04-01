import React from "react";

let nsp = null;

export const NamespaceContext = React.createContext();

export const NamespaceContextProvider = ({ children }) => {
  const [nspName, setNspName] = React.useState(null);

  const setNamespace = (nsp) => {
    setNspName(nsp);
  };

  return (
    <NamespaceContext.Provider value={[nspName, setNamespace]}>
      {children}
    </NamespaceContext.Provider>
  );
};


