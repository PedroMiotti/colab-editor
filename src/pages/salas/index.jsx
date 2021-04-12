import React, { useState, useContext } from "react";
import "./style.css";

import CreateRoomModal from "../../components/CreateRoomModal";

import { useRoomContext } from "../../context/room/room.context";
import { NamespaceContext } from "../../context/namespace.js";

import { v4 as uuidv4 } from "uuid";

import { message } from "antd";

const PaginaInicial = () => {
  const { createOrJoinRoom, joinRoom } = useRoomContext();
  const [nspName, setNamespace] = useContext(NamespaceContext);

  const [sessionCode, setSessionCode] = useState("");

  const setNamespaceId = (namespaceId) => {
    sessionStorage.setItem("Namespace", namespaceId);
    setNamespace(namespaceId);
  };

  const createNamespace = () => {
    const genNspId = uuidv4();
    setNamespaceId(genNspId);
  };

  const confirmCreateNamespace = () => {
    createOrJoinRoom(nspName, "Pedro");
  };
  
  // Remove this after there is a way to set the name
  const confirmJoinNamespace = () => {
    createOrJoinRoom(nspName, "Thiago");
  };

  // Check if the namespace is valid && if the username is already in use
  const joinNamespace = () => {
    const codeToJoin = sessionCode;

    joinRoom(codeToJoin, "Thiago")
      .then(() => {
        setNamespaceId(codeToJoin);
      })
      .catch((e) => {
        message.error(e);
      });
  };

  const handleInput = (e) => {
    setSessionCode(e.target.value);
  };

  return (
    <>
      <div className="paginaSalasContainer">
        <div className="boasVindas">
          <h1>
            Olá, <strong>FShinoda</strong>!
          </h1>
        </div>

        <div className="caixas">
          <div className="card">
            <div className="face face1">
              <div className="content">
                <h2>Criar Sala</h2>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <a id="but-criar" onClick={createNamespace}>
                  &#43;
                </a>
                <button onClick={confirmCreateNamespace}>confirm</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="face face1">
              <div className="content">
                <h2>Encontrar Sala</h2>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <input onChange={handleInput} type="text" spellCheck="false" />
                <a id="but-entrar" onClick={joinNamespace}>
                  Entrar
                </a>
                <button onClick={confirmJoinNamespace}>confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginaInicial;
