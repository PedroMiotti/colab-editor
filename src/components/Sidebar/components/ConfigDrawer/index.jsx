import React, { useState } from "react";
import "./style.css";

// Icons
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Popover } from 'antd';

// Context
import { useRoomContext } from '../../../../context/room/room.context'

const ConfigDrawer = () => {

    const [ showConfirmPopover, setShowConfirmPopover ] = useState(false);

    const { leaveRoom } = useRoomContext();

    const confirmLeave = () => {
        setShowConfirmPopover(false);
        leaveRoom();

    }


    return (
        <>
            <div className="config-drawer-component">

                <div className="config-drawer-header">
                    <div className="config-drawer-title">
                        <h6>Configurações</h6>
                    </div>

                    <div className="config-drawer-content">
                        <p>Tema</p>
                    </div>
                </div>

                <div className="config-drawer-footer">
                    <Popover
                        content={<><a className="leave-button-cancel" onClick={() => setShowConfirmPopover(false)}>[x] Cancelar</a> <a className="leave-button-confirm" onClick={confirmLeave}>[x] Sim</a></>}
                        title="Tem certeza que deseja sair ? "
                        trigger="click"
                        placement="top"
                        visible={showConfirmPopover}
                    >
                        <button onClick={() => setShowConfirmPopover(true)}>Sair</button>
                    </Popover >
                </div>
            </div>
        </>
    );
};

export default ConfigDrawer;
