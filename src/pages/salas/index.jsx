import React, { useState, useContext, useEffect } from "react";
import ReactDOM from 'react-dom';
import "./style.css";

// Ant Design
import { Button, notification, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Back-End
import CreateRoomModal from "../../components/CreateRoomModal";
import { useRoomContext } from "../../context/room/room.context";
import { NamespaceContext } from "../../context/namespace.js";
import { v4 as uuidv4 } from "uuid";

const PaginaInicial = () => {
  const { createOrJoinRoom, joinRoom } = useRoomContext();
  const [nspName, setNamespace] = useContext(NamespaceContext);
  const [ confirmCreateRoom, setConfirmCreateRoom ] = useState(false);
  const [ confirmJoinRoom, setConfirmJoinRoom ] = useState(false);

  const [sessionCode, setSessionCode] = useState("");

  useEffect(() => {

    if(nspName)
      confirmCreateNamespace();

  }, [confirmCreateRoom])

  useEffect(() => {

    if(nspName && confirmJoinRoom)
      confirmJoinNamespace();

  }, [confirmJoinRoom])

  const setNamespaceId = (namespaceId) => {
    sessionStorage.setItem("Namespace", namespaceId);
    setNamespace(namespaceId);
  };

  const createNamespace = () => {
    const genNspId = uuidv4();
    setNamespaceId(genNspId)

    // Ant Design - Notification
    notification.open({
      message : "Sala criada com sucesso!",
      description : "Você será redirecionado assim que esta janela for fechada!",
      onClose: (() => setConfirmCreateRoom(true)),
      icon : <LoadingOutlined style={{ color: "#111c30" }} />,
      className : "createRoomNotification",      
      placement : "bottomLeft",
      bottom : 50,
      duration : 1.5,
      rtl : true
    });

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

        // Ant Design - Notification
        notification.open({
          message : "Entrando na sala !",
          description : "Você será redirecionado assim que esta janela for fechada!",
          onClose: (() => setConfirmJoinRoom(true)),
          icon : <LoadingOutlined style={{ color: "#111c30" }} />,
          className : "createRoomNotification",      
          placement : "bottomLeft",
          bottom : 50,
          duration : 1.5,
          rtl : true
        });

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
      <div id="paginaSalasContainer">
        <div className="noise_roomPage"></div>

        <div className="overlay_roomPage"></div>

        <div className="terminal_roomPage">
          <div className="boasVindas">
            <h1>
              Olá, <strong>FShinoda</strong>!
            </h1>
          </div>

          <div className="caixas">
            <div className="card">
              <div className="face face1">
                <div id="contentHeader">
                  <h2>Criar Sala</h2>
                </div>
              </div>
              <div className="face face2">
                {/* <div className="content">
                  <a id="but-criar" onClick={createNamespace}>
                    &#43;
                  </a>
                  <button onClick={confirmCreateNamespace}>confirm</button>
                </div> */}

                <div className="content">
                  <Button id="but-criar" type="link" onClick={createNamespace}>
                    &#43;
                  </Button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="face face1">
                <div id="contentHeader">
                  <h2>Encontrar Sala</h2>
                </div>
              </div>
            </div>
            <div className="face face2">
              {/* <div className="content">
                <input onChange={handleInput} type="text" spellCheck="false" />
                <a id="but-entrar" onClick={joinNamespace}>
                  Entrar
                </a>
                <button onClick={confirmJoinNamespace}>confirm</button>
              </div> */}

              <div className="content">
                <input onChange={handleInput} type="text" spellCheck="false" />

                <a id="but-entrar" onClick={joinNamespace}>
                  Entrar
                </a>

                {/* <button onClick={confirmJoinNamespace}>confirm</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginaInicial;
