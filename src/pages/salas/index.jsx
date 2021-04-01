import React, { useState, useContext } from "react";
import "./style.css";

import CreateRoomModal from "../../components/CreateRoomModal";

import { useRoomContext } from "../../context/room/room.context";
import { NamespaceContext } from "../../context/namespace.js";

import { v4 as uuidv4 } from 'uuid';

const PaginaInicial = () => {
  const { createRoom } = useRoomContext();
  const [nspName, setNamespace] = useContext(NamespaceContext);

  const [ sessionCode, setSessionCode ] = useState('');

  const createNamespace = () => {
    const genNspId = uuidv4();
    setNamespace(genNspId);
    sessionStorage.setItem('Namespace', genNspId);
  };

  const joinNamespace = () => {
    const codeToJoin = sessionCode;
    setNamespace(codeToJoin);
    sessionStorage.setItem('Namespace', codeToJoin);
  }

  const createSession = () => {
    createRoom({ username: "Pedro", roomName: "Tech" });
  };

  const handleInput = (e) => {
    setSessionCode(e.target.value);
  }
  
  return (
    <div className="paginaSalasContainer">
      <div className="boasVindas">
        <h1>
          Olá, <strong>FShinoda</strong>!
        </h1>
      </div>

      <div className="caixas">
        <div className="criarSala">
          <h2>Criar Sala</h2>

          <a onClick={createNamespace}>&#43;</a>
        </div>

        <div className="entrarSala">
          <h2>Entrar em uma sala</h2>

          <input onChange={handleInput} type="text" spellCheck="false" />

          <a onClick={joinNamespace}>Entrar</a>
        </div>
      </div>
    </div>
  );
};

export default PaginaInicial;
