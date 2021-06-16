import React, {useState, useContext, useEffect, useRef} from "react";
import "./style.css";
import "../../assets/style/backgroundEffect.css";

// Ant Design
import {Button, notification} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

// Context
import {useRoomContext} from "../../context/room/room.context";
import {NamespaceContext} from "../../context/namespace.js";

import {v4 as uuidv4} from "uuid";

// Components
import {customNotification} from '../../components/Notification';

const PaginaInicial = () => {
    const {createRoom, joinRoom, checkForExistingRoomAndUsername} = useRoomContext();

    const [nspName, setNamespace] = useContext(NamespaceContext);
    const [confirmCreateRoom, setConfirmCreateRoom] = useState(false);
    const [confirmJoinRoom, setConfirmJoinRoom] = useState(false);
    const [sessionCode, setSessionCode] = useState("");
    const [nameInput, setNameInput] = useState("");

    const username = localStorage.getItem('username');

    const nameInputRef = useRef();

    useEffect(() => {
        if (nspName)
            createRoom(nspName, username);

    }, [confirmCreateRoom])

    useEffect(() => {
        if (nspName && confirmJoinRoom)
            joinRoom(nspName, username);

    }, [confirmJoinRoom])

    useEffect(() => {
        nameInputRef.current.focus();
    }, [])

    const setNamespaceId = (namespaceId) => {
        sessionStorage.setItem("Namespace", namespaceId);
        setNamespace(namespaceId);
    };

    const handleNameInput = (e) => {
        setNameInput(e.target.value);
    };

    const createNamespace = () => {
        if (nameInput === "") {
            customNotification("error", "topRight", `Ops, Insira seu nome primeiro`, "copyNotification", 2.5);
        } else {
            localStorage.setItem("username", nameInput);
            setTimeout(() => {
                const genNspId = uuidv4();
                setNamespaceId(genNspId)

                notification.open({
                    message: "Sala criada com sucesso!",
                    description: "Você será redirecionado assim que esta janela for fechada!",
                    onClose: (() => setConfirmCreateRoom(true)),
                    icon: <LoadingOutlined style={{color: "#161616"}}/>,
                    className: "createRoomNotification",
                    placement: "bottomLeft",
                    bottom: 50,
                    duration: 1.5,
                    rtl: true
                });
            }, 1000)
        }
    };

    // Check if the namespace is valid && if the username is already in use
    const joinNamespace = () => {
        const codeToJoin = sessionCode;

        if (nameInput === "") {
            customNotification("error", "topRight", `Ops, Insira seu nome primeiro`, "copyNotification", 2.5);
        } else {
            localStorage.setItem("username", nameInput);

            setTimeout(() => {
                checkForExistingRoomAndUsername(codeToJoin, username)
                    .then(() => {
                        setNamespaceId(codeToJoin);

                        notification.open({
                            message: "Entrando na sala !",
                            description: "Você será redirecionado assim que esta janela for fechada!",
                            onClose: (() => setConfirmJoinRoom(true)),
                            icon: <LoadingOutlined style={{color: "#111c30"}}/>,
                            className: "createRoomNotification",
                            placement: "bottomRight",
                            bottom: 50,
                            duration: 1.5,
                            rtl: true
                        });
                    })
                    .catch((e) => {
                        customNotification("error", "topRight", `${e} ☹️ `, "copyNotification", 2.5);
                    });
            }, 1000)

        }
    };

    const handleInput = (e) => {
        setSessionCode(e.target.value);
    };

    return (
        <>
            <div id="roomPage">
                <div className="backgroundEffect">
                    <div className="noise"></div>

                    <div className="overlay"></div>

                    <div className="terminal terminal_roomPage">
                        <div className="boasVindas">
                            <h1>
                                Olá,<input ref={nameInputRef} onChange={handleNameInput} className="roomPage-nameInput"
                                           placeholder="Seu nome aqui" maxlength="10"/>
                            </h1>
                        </div>

                        <div className="caixas">
                            <div className="card">
                                <div className="face face1">
                                    <div className="contentHeader">
                                        <h2>Criar Sala</h2>
                                    </div>
                                </div>

                                <div className="face face2">
                                    <div className="content">
                                        <Button id="but-criar" type="link" onClick={createNamespace}>
                                            &#43;
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="face face1">
                                    <div className="contentHeader">
                                        <h2>Encontrar Sala</h2>
                                    </div>
                                </div>

                                <div className="face face2">
                                    <div className="content">
                                        <input onChange={handleInput} type="text" spellCheck="false"/>

                                        <a id="but-entrar" onClick={joinNamespace}>
                                            Entrar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaginaInicial;
