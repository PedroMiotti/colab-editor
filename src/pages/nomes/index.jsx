import React from "react";
import "./styles.css";
import "../backgroundEffect.css";

// Ant Design
import { Button } from 'antd';

const PaginaNome = () => {
    return(
        <div id="namePage">
            <div className="backgroundEffect">
                <div className="noise"></div>

                <div className="overlay"></div>

                <div className="terminal terminal_namePage">
                    <div className="logo">
                        <h1 className="output_errorPage"><span className="errorcode_errorPage">ALL.CO</span></h1>
                    </div>

                    <div className="caixaNome">
                        <h1>Insira seu nome</h1>

                        <input type="text" spellcheck="false" maxLength="20" aria-required></input>

                        <div id="cnfBtn">
                            <Button type="link">Confirmar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaNome;